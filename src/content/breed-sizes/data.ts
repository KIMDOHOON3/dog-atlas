import { breeds } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";
import { poodleDetail } from "@/content/poodle-detail/data";
import { getAllAuthoredStandardBreedDetails } from "@/content/standard-breed-detail/data";
import { getBreedFactOverrideForSizeAudit } from "@/lib/breed-fact-presentation";
import { DOG_ATLAS_SIZE_ORDER, getSizeClassGap, resolveBreedSize } from "@/lib/breed-size";
import { sizeConflictReviewBySlug, sizeConflictReviews } from "./conflict-reviews";
import { externalBreedSizeSupplementBySlug, externalBreedSizeSupplements } from "./external-data";
import {
  breedSizeCollectionSchema,
  type BreedSizeProfile,
  type BreedSizeVariety,
  type Measurement,
  type SizeEvidence,
} from "./schema";

type Dimension = "height" | "weight";
type Candidate = { measurement?: Measurement; evidence: SizeEvidence };

const completeKinds = new Set<Measurement["kind"]>(["range", "representative"]);
const germanSpitzStandardSource = {
  organization: "Fédération Cynologique Internationale",
  documentTitle: "FCI Standard No. 97 — German Spitz",
  url: "https://www.fci.be/Nomenclature/Standards/097g05-en.pdf",
  checkedAt: "2026-09-01",
  rawValue: "variety height with stated tolerance; weight corresponding to size",
  meaning: "official-ideal-with-tolerance" as const,
};
const xoloStandardSource = {
  organization: "Fédération Cynologique Internationale",
  documentTitle: "FCI Standard No. 234 — Xoloitzcuintle",
  url: "https://www.fci.be/Nomenclature/Standards/234g05-en.pdf",
  checkedAt: "2026-09-01",
  rawValue: "standard 46–60cm; intermediate 36–45cm; miniature 25–35cm; no weight specification",
  meaning: "official-standard-range" as const,
};

function numbersForUnit(raw: string, unit: "cm" | "kg") {
  const normalized = raw.replace(/\([^)]*±[^)]*\)/gu, "").replace(/[–—-]/gu, "~");
  const ranges = [...normalized.matchAll(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*~\\s*(\\d+(?:\\.\\d+)?)\\s*${unit}`, "gu"))]
    .map((match) => ({ min: Number(match[1]), max: Number(match[2]) }));
  if (ranges.length > 0) return { normalized, ranges };
  return { normalized, ranges: [] as Array<{ min: number; max: number }> };
}

export function parseLegacyMeasurement(raw: string, dimension: Dimension): Measurement | undefined {
  const unit = dimension === "height" ? "cm" : "kg";
  if (!raw.includes(unit) || /(고정 기준 없음|수치 없음|체격에 비례|부모 크기에 따라 다름)/u.test(raw)) return undefined;

  const { normalized, ranges } = numbersForUnit(raw, unit);
  if (ranges.length > 0) {
    return {
      kind: "range",
      min: Math.min(...ranges.map((range) => range.min)),
      max: Math.max(...ranges.map((range) => range.max)),
    };
  }

  const values = [...normalized.matchAll(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${unit}`, "gu"))]
    .map((match) => Number(match[1]));
  if (values.length === 0) return undefined;
  const lowerBoundPattern = new RegExp(`(?:최소(?:\\s*권장)?\\s*)?\\d+(?:\\.\\d+)?\\s*${unit}\\s*(?:이상|초과)|최소(?:\\s*권장)?\\s*\\d+(?:\\.\\d+)?\\s*${unit}`, "gu");
  const upperBoundPattern = new RegExp(`(?:최대\\s*)?\\d+(?:\\.\\d+)?\\s*${unit}\\s*이하|최대\\s*\\d+(?:\\.\\d+)?\\s*${unit}`, "gu");
  if ([...normalized.matchAll(lowerBoundPattern)].length === values.length) return { kind: "lower-bound", value: Math.min(...values) };
  if ([...normalized.matchAll(upperBoundPattern)].length === values.length) return { kind: "upper-bound", value: Math.max(...values) };
  if (/(암컷은|수컷은).*(작|가벼)/u.test(normalized)) return undefined;
  if (values.length > 1) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? { kind: "representative", value: min } : { kind: "range", min, max };
  }
  return { kind: "representative", value: values.reduce((sum, value) => sum + value, 0) / values.length };
}

function evidence(breed: Breed, location: SizeEvidence["location"], raw: string): SizeEvidence {
  return { location, raw, sourceUrls: breed.sources.map((source) => source.url) };
}

function addCandidate(
  candidates: Record<Dimension, Candidate[]>,
  breed: Breed,
  location: SizeEvidence["location"],
  raw: string | undefined,
) {
  if (!raw) return;
  const itemEvidence = evidence(breed, location, raw);
  candidates.height.push({ measurement: parseLegacyMeasurement(raw, "height"), evidence: itemEvidence });
  candidates.weight.push({ measurement: parseLegacyMeasurement(raw, "weight"), evidence: itemEvidence });
}

function measurementSignature(measurement: Measurement) {
  if (measurement.kind === "range") return `${measurement.kind}:${measurement.min}:${measurement.max}`;
  return `${measurement.kind}:${measurement.value}`;
}

function chooseMeasurement(candidates: Candidate[], selectedLocation?: SizeEvidence["location"]): Measurement | undefined {
  const priority: SizeEvidence["location"][] = [
    "dedicated-detail",
    "sizeVarieties",
    "heroSizeDetails",
    "breedFactOverrides",
    "identity.size",
  ];
  const sorted = [...candidates]
    .sort((a, b) => priority.indexOf(a.evidence.location) - priority.indexOf(b.evidence.location))
  if (selectedLocation) {
    const selected = sorted.find((candidate) => candidate.evidence.location === selectedLocation && candidate.measurement);
    if (selected?.measurement) return selected.measurement;
  }
  return sorted.find((candidate) => candidate.measurement)?.measurement;
}

function hasConflict(candidates: Candidate[]) {
  const complete = candidates
    .map((candidate) => candidate.measurement)
    .filter((measurement): measurement is Measurement => Boolean(measurement && completeKinds.has(measurement.kind)));
  return new Set(complete.map(measurementSignature)).size > 1;
}

const authoredDetails = new Map(getAllAuthoredStandardBreedDetails().map((detail) => [detail.slug, detail]));

function buildCandidates(breed: Breed) {
  const candidates: Record<Dimension, Candidate[]> = { height: [], weight: [] };
  addCandidate(candidates, breed, "identity.size", breed.identity.size);

  const override = getBreedFactOverrideForSizeAudit(breed.slug);
  if (override?.height) addCandidate(candidates, breed, "breedFactOverrides", override.height);
  if (override?.weight) addCandidate(candidates, breed, "breedFactOverrides", override.weight);

  const detail = authoredDetails.get(breed.slug);
  if (detail?.heroSizeDetails) {
    const raw = [
      ...detail.heroSizeDetails.summaryRows.map((row) => `${row.label} ${row.value}`),
      ...detail.heroSizeDetails.items.map((item) => `${item.label} ${item.value}`),
    ].join(" · ");
    addCandidate(candidates, breed, "heroSizeDetails", raw);
  }
  if (detail?.sizeVarieties) {
    const raw = detail.sizeVarieties.items.map((item) => `${item.label} ${item.range}`).join(" · ");
    addCandidate(candidates, breed, "sizeVarieties", raw);
  }
  return candidates;
}

const varietyDefinitions: Record<string, { varieties: BreedSizeVariety[]; note: string; location: SizeEvidence["location"] }> = {
  poodle: {
    location: "dedicated-detail",
    note: "FCI의 네 체고 유형을 각각 유지하며 몸무게는 현재 내부 데이터에 고정 범위가 없습니다.",
    varieties: poodleDetail.sizes.map((size) => {
      const heightCm = parseLegacyMeasurement(size.range, "height");
      return { id: size.id, label: size.label, ...(heightCm ? { heightCm } : {}) };
    }),
  },
  dachshund: {
    location: "sizeVarieties",
    note: "공식 유형 구분값이 체고가 아니라 성견 가슴둘레이므로 Dog Atlas 체고 분류에 대입하지 않습니다.",
    varieties: [
      { id: "rabbit", label: "래빗", otherMeasurement: "가슴둘레 25~32cm" },
      { id: "miniature", label: "미니어처", otherMeasurement: "가슴둘레 30~37cm" },
      { id: "standard", label: "스탠더드", otherMeasurement: "가슴둘레 35~47cm" },
    ],
  },
  "german-spitz": {
    location: "breedFactOverrides",
    note: "카탈로그 slug는 다섯 저먼 스피츠 유형을 가리키지만 현재 이름·대표 수치는 포메라니안에만 맞춰져 있어 다음 단계에서 범위를 재검수해야 합니다.",
    varieties: [
      { id: "wolfspitz", label: "울프스피츠", heightCm: { kind: "range", min: 43, max: 55 }, note: "FCI 49±6cm. 체중은 크기에 비례한다고만 규정합니다.", sources: [germanSpitzStandardSource] },
      { id: "giant", label: "자이언트 스피츠", heightCm: { kind: "range", min: 40, max: 50 }, note: "FCI 45±5cm. 체중은 크기에 비례한다고만 규정합니다.", sources: [germanSpitzStandardSource] },
      { id: "medium", label: "미디엄 스피츠", heightCm: { kind: "range", min: 30, max: 40 }, note: "FCI 35±5cm. 체중은 크기에 비례한다고만 규정합니다.", sources: [germanSpitzStandardSource] },
      { id: "miniature", label: "미니어처 스피츠", heightCm: { kind: "range", min: 24, max: 30 }, note: "FCI 27±3cm. 체중은 크기에 비례한다고만 규정합니다.", sources: [germanSpitzStandardSource] },
      { id: "pomeranian", label: "포메라니안", heightCm: { kind: "range", min: 18, max: 24 }, weightKg: { kind: "range", min: 1.4, max: 3.2 } },
    ],
  },
  xoloitzcuintle: {
    location: "identity.size",
    note: "세 크기 유형은 확인되지만 현재 내부 원고에는 유형별 범위가 구조화되어 있지 않습니다.",
    varieties: [
      { id: "miniature", label: "미니어처", heightCm: { kind: "range", min: 25, max: 35 }, note: "FCI 표준에 유형별 체중 규정 없음", sources: [xoloStandardSource] },
      { id: "intermediate", label: "미디엄", heightCm: { kind: "range", min: 36, max: 45 }, note: "FCI 표준에 유형별 체중 규정 없음", sources: [xoloStandardSource] },
      { id: "standard", label: "스탠더드", heightCm: { kind: "range", min: 46, max: 60 }, note: "FCI 표준에 유형별 체중 규정 없음", sources: [xoloStandardSource] },
    ],
  },
  "portuguese-podengo": {
    location: "heroSizeDetails",
    note: "공식 세 크기 유형을 상세 원고의 출처 연결 수치로 분리했습니다.",
    varieties: [
      { id: "small", label: "작은형", heightCm: { kind: "range", min: 20, max: 30 }, weightKg: { kind: "range", min: 4, max: 6 } },
      { id: "medium", label: "중간형", heightCm: { kind: "range", min: 40, max: 54 }, weightKg: { kind: "range", min: 16, max: 20 } },
      { id: "large", label: "큰형", heightCm: { kind: "range", min: 55, max: 70 }, weightKg: { kind: "range", min: 20, max: 30 } },
    ],
  },
  "peruvian-hairless-dog": {
    location: "heroSizeDetails",
    note: "공식 세 크기 유형을 상세 원고의 출처 연결 수치로 분리했습니다.",
    varieties: [
      { id: "small", label: "작은형", heightCm: { kind: "range", min: 25, max: 40 }, weightKg: { kind: "range", min: 4, max: 8 } },
      { id: "medium", label: "중간형", heightCm: { kind: "range", min: 41, max: 50 }, weightKg: { kind: "range", min: 8, max: 12 } },
      { id: "large", label: "큰형", heightCm: { kind: "range", min: 51, max: 65 }, weightKg: { kind: "range", min: 12, max: 30 } },
    ],
  },
  "gascon-saintongeois": {
    location: "heroSizeDetails",
    note: "큰형과 작은형의 체고는 분리했으며 공식 고정 몸무게는 없습니다.",
    varieties: [
      { id: "great", label: "큰형", heightCm: { kind: "range", min: 62, max: 72 } },
      { id: "small", label: "작은형", heightCm: { kind: "range", min: 54, max: 62 } },
    ],
  },
  "american-bully": {
    location: "heroSizeDetails",
    note: "UKC 체고 유형은 분리했으며 공식 고정 몸무게는 없습니다. 클래식은 별도 체고 유형이 아니라 스탠더드 체고 안의 체형 구분입니다.",
    varieties: [
      { id: "pocket", label: "포켓", heightCm: { kind: "range", min: 33, max: 43 } },
      { id: "standard-classic", label: "스탠더드·클래식", heightCm: { kind: "range", min: 41, max: 51 } },
      { id: "xl", label: "XL", heightCm: { kind: "range", min: 48, max: 58 } },
    ],
  },
};

const variableParentage = new Set(["goldendoodle", "maltipoo"]);

function buildProfile(breed: Breed): BreedSizeProfile {
  const candidates = buildCandidates(breed);
  const allEvidence = [...candidates.height, ...candidates.weight]
    .map((candidate) => candidate.evidence)
    .filter((item, index, items) => items.findIndex((other) => other.location === item.location && other.raw === item.raw) === index);

  if (variableParentage.has(breed.slug)) {
    return {
      slug: breed.slug,
      nameKo: breed.nameKo,
      status: "variable-parentage",
      note: "부모 조합과 사용된 푸들 크기에 따라 성견 크기 편차가 커 단일 자동 분류를 만들지 않습니다.",
      reviewFlags: ["parent-dependent-size"],
      evidence: allEvidence,
    };
  }

  const varietyDefinition = varietyDefinitions[breed.slug];
  if (varietyDefinition) {
    return {
      slug: breed.slug,
      nameKo: breed.nameKo,
      status: "varieties",
      varieties: varietyDefinition.varieties,
      note: varietyDefinition.note,
      reviewFlags: varietyDefinition.varieties.some((variety) => !variety.heightCm || !variety.weightKg)
        ? ["incomplete-variety-measurements"]
        : [],
      evidence: allEvidence,
    };
  }

  const conflictReview = sizeConflictReviewBySlug.get(breed.slug);
  const externalSupplement = externalBreedSizeSupplementBySlug.get(breed.slug);
  const heightCm = externalSupplement?.height?.measurement ?? chooseMeasurement(candidates.height, conflictReview?.selectedLocation);
  const weightKg = externalSupplement?.weight?.measurement ?? chooseMeasurement(candidates.weight, conflictReview?.selectedLocation);
  const heightConflict = hasConflict(candidates.height);
  const weightConflict = hasConflict(candidates.weight);
  const unresolvedConflict = !externalSupplement?.resolvesConflict && (conflictReview?.outcome === "conflict" || (!conflictReview && (heightConflict || weightConflict)));
  const externalEvidence: SizeEvidence[] = [externalSupplement?.height, externalSupplement?.weight]
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({ location: "external-official", raw: `${item.source.organization} · ${item.source.documentTitle} · ${item.source.rawValue} · ${item.source.meaning} · ${item.source.checkedAt}`, sourceUrls: [item.source.url] }));
  const profileEvidence = [...allEvidence, ...externalEvidence];
  const reviewFlags = [
    ...(unresolvedConflict && heightConflict ? ["height-conflict"] : []),
    ...(unresolvedConflict && weightConflict ? ["weight-conflict"] : []),
    ...(conflictReview ? [`conflict-review-${conflictReview.kind}`, `conflict-review-outcome-${conflictReview.outcome}`] : []),
    ...(!heightCm ? ["missing-height"] : completeKinds.has(heightCm.kind) ? [] : ["incomplete-height"]),
    ...(!weightKg ? ["missing-weight"] : completeKinds.has(weightKg.kind) ? [] : ["incomplete-weight"]),
  ];

  if (unresolvedConflict) {
    return { slug: breed.slug, nameKo: breed.nameKo, status: "conflict", heightCm, weightKg, note: conflictReview?.note, reviewFlags, evidence: profileEvidence };
  }
  if (!heightCm && !weightKg) {
    return { slug: breed.slug, nameKo: breed.nameKo, status: "missing", reviewFlags, evidence: profileEvidence };
  }

  const heightComplete = Boolean(heightCm && completeKinds.has(heightCm.kind));
  const weightComplete = Boolean(weightKg && completeKinds.has(weightKg.kind));
  if (!heightComplete || !weightComplete || (conflictReview?.outcome === "provisional" && !externalSupplement)) {
    return { slug: breed.slug, nameKo: breed.nameKo, status: "provisional", heightCm, weightKg, note: externalSupplement?.note ?? conflictReview?.note, reviewFlags, evidence: profileEvidence };
  }

  const candidateProfile: BreedSizeProfile = {
    slug: breed.slug,
    nameKo: breed.nameKo,
    status: "confirmed",
    heightCm,
    weightKg,
    reviewFlags,
    evidence: profileEvidence,
    ...(externalSupplement ? { note: externalSupplement.note } : conflictReview ? { note: conflictReview.note } : {}),
  };
  const resolved = resolveBreedSize(candidateProfile);
  if (resolved.status === "confirmed" && resolved.heightClass && resolved.weightClass && getSizeClassGap(resolved.heightClass, resolved.weightClass) < 2) {
    return candidateProfile;
  }
  return {
    ...candidateProfile,
    status: "provisional",
    reviewFlags: [...new Set([...reviewFlags, "height-weight-gap"])],
  };
}

export const breedSizeProfiles = breedSizeCollectionSchema.parse(breeds.map(buildProfile));
export const breedSizeBySlug = new Map(breedSizeProfiles.map((profile) => [profile.slug, profile]));

export function getBreedSizeProfile(slug: string) {
  return breedSizeBySlug.get(slug);
}

function hasLowerBound(profile: BreedSizeProfile) {
  return profile.heightCm?.kind === "lower-bound" || profile.weightKg?.kind === "lower-bound";
}

function hasUpperBound(profile: BreedSizeProfile) {
  return profile.heightCm?.kind === "upper-bound" || profile.weightKg?.kind === "upper-bound";
}

function hasOneSexIncompleteEvidence(profile: BreedSizeProfile) {
  return profile.evidence.some((item) => /(암컷은|수컷은).*(작|가벼)|수컷 기준|암컷 기준/u.test(item.raw));
}

function hasEvidencePattern(profile: BreedSizeProfile, pattern: RegExp) {
  return profile.evidence.some((item) => pattern.test(item.raw));
}

const provisionalProfiles = breedSizeProfiles.filter((profile) => profile.status === "provisional");
const provisionalHeightOnly = provisionalProfiles.filter((profile) => Boolean(profile.heightCm) && !profile.weightKg);
const provisionalWeightOnly = provisionalProfiles.filter((profile) => !profile.heightCm && Boolean(profile.weightKg));
const provisionalLowerBound = provisionalProfiles.filter(hasLowerBound);
const provisionalUpperBound = provisionalProfiles.filter(hasUpperBound);
const provisionalOneSexIncomplete = provisionalProfiles.filter(hasOneSexIncompleteEvidence);
const knownProvisionalReasonSlugs = new Set([
  ...provisionalHeightOnly,
  ...provisionalWeightOnly,
  ...provisionalLowerBound,
  ...provisionalUpperBound,
  ...provisionalOneSexIncomplete,
].map((profile) => profile.slug));

export const breedSizeAudit = {
  total: breedSizeProfiles.length,
  statusCounts: {
    confirmed: breedSizeProfiles.filter((profile) => profile.status === "confirmed").length,
    provisional: breedSizeProfiles.filter((profile) => profile.status === "provisional").length,
    varieties: breedSizeProfiles.filter((profile) => profile.status === "varieties").length,
    "variable-parentage": breedSizeProfiles.filter((profile) => profile.status === "variable-parentage").length,
    conflict: breedSizeProfiles.filter((profile) => profile.status === "conflict").length,
    missing: breedSizeProfiles.filter((profile) => profile.status === "missing").length,
  },
  confirmedDistribution: Object.fromEntries(DOG_ATLAS_SIZE_ORDER.map((sizeClass) => [
    sizeClass,
    breedSizeProfiles.filter((profile) => {
      const result = resolveBreedSize(profile);
      return result.status === "confirmed" && result.finalClass === sizeClass;
    }).length,
  ])) as Record<(typeof DOG_ATLAS_SIZE_ORDER)[number], number>,
  missingHeight: breedSizeProfiles.filter((profile) => profile.reviewFlags.includes("missing-height")),
  missingWeight: breedSizeProfiles.filter((profile) => profile.reviewFlags.includes("missing-weight")),
  missingBoth: breedSizeProfiles.filter((profile) => profile.reviewFlags.includes("missing-height") && profile.reviewFlags.includes("missing-weight")),
  incompleteBounds: breedSizeProfiles.filter((profile) =>
    profile.heightCm?.kind === "lower-bound" || profile.heightCm?.kind === "upper-bound" ||
    profile.weightKg?.kind === "lower-bound" || profile.weightKg?.kind === "upper-bound"),
  conflicts: breedSizeProfiles.filter((profile) => profile.status === "conflict"),
  varieties: breedSizeProfiles.filter((profile) => profile.status === "varieties"),
  conflictReviews: sizeConflictReviews,
  conflictReviewCounts: {
    rounding: sizeConflictReviews.filter((review) => review.kind === "rounding").length,
    minor: sizeConflictReviews.filter((review) => review.kind === "minor").length,
    "meaning-difference": sizeConflictReviews.filter((review) => review.kind === "meaning-difference").length,
    "true-conflict": sizeConflictReviews.filter((review) => review.kind === "true-conflict").length,
  },
  provisionalReasons: {
    heightOnly: provisionalHeightOnly,
    weightOnly: provisionalWeightOnly,
    minimumOnly: provisionalProfiles.filter((profile) => hasLowerBound(profile) && hasEvidencePattern(profile, /최소|minimum/iu)),
    maximumOnly: provisionalProfiles.filter((profile) => hasUpperBound(profile) && hasEvidencePattern(profile, /최대|maximum/iu)),
    lowerBound: provisionalLowerBound,
    upperBound: provisionalUpperBound,
    includesIisang: provisionalProfiles.filter((profile) => hasLowerBound(profile) && hasEvidencePattern(profile, /(?:cm|kg)\s*이상(?!적)/u)),
    includesIha: provisionalProfiles.filter((profile) => hasUpperBound(profile) && hasEvidencePattern(profile, /(?:cm|kg)\s*이하/u)),
    oneSexIncomplete: provisionalOneSexIncomplete,
    other: provisionalProfiles.filter((profile) => !knownProvisionalReasonSlugs.has(profile.slug)),
  },
  externalRequiredSingle: breedSizeProfiles.filter((profile) => ["provisional", "conflict", "missing"].includes(profile.status)),
  externalSupplements: externalBreedSizeSupplements,
};
