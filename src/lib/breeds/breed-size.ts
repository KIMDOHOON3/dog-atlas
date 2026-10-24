import type {
  BreedSizeProfile,
  BreedSizeVariety,
  DogAtlasSizeClass,
  Measurement,
} from "@/content/breed-sizes/schema";

export const DOG_ATLAS_SIZE_THRESHOLDS = {
  heightCm: [25, 40, 55, 70],
  weightKg: [4, 10, 25, 50],
} as const;

export const DOG_ATLAS_SIZE_ORDER: readonly DogAtlasSizeClass[] = [
  "extra-small",
  "small",
  "medium",
  "large",
  "giant",
];

export function getRepresentativeValue(measurement: Measurement): number | undefined {
  if (measurement.kind === "range") return (measurement.min + measurement.max) / 2;
  if (measurement.kind === "representative") return measurement.value;
  return undefined;
}

function classify(value: number, thresholds: readonly number[]): DogAtlasSizeClass {
  if (value < thresholds[0]) return "extra-small";
  if (value < thresholds[1]) return "small";
  if (value < thresholds[2]) return "medium";
  if (value < thresholds[3]) return "large";
  return "giant";
}

export function classifyHeight(heightCm: number): DogAtlasSizeClass {
  return classify(heightCm, DOG_ATLAS_SIZE_THRESHOLDS.heightCm);
}

export function classifyWeight(weightKg: number): DogAtlasSizeClass {
  return classify(weightKg, DOG_ATLAS_SIZE_THRESHOLDS.weightKg);
}

export function getHigherSizeClass(a: DogAtlasSizeClass, b: DogAtlasSizeClass): DogAtlasSizeClass {
  return DOG_ATLAS_SIZE_ORDER.indexOf(a) >= DOG_ATLAS_SIZE_ORDER.indexOf(b) ? a : b;
}

export function getSizeClassGap(a: DogAtlasSizeClass, b: DogAtlasSizeClass): number {
  return Math.abs(DOG_ATLAS_SIZE_ORDER.indexOf(a) - DOG_ATLAS_SIZE_ORDER.indexOf(b));
}

export type ResolvedSingleSize = {
  status: "confirmed" | "provisional" | "conflict" | "missing";
  heightRepresentative?: number;
  weightRepresentative?: number;
  heightClass?: DogAtlasSizeClass;
  weightClass?: DogAtlasSizeClass;
  finalClass?: DogAtlasSizeClass;
  reviewFlags: string[];
};

function resolveMeasurements(
  heightCm: Measurement | undefined,
  weightKg: Measurement | undefined,
  requestedStatus: ResolvedSingleSize["status"],
  inheritedFlags: readonly string[] = [],
): ResolvedSingleSize {
  const heightRepresentative = heightCm ? getRepresentativeValue(heightCm) : undefined;
  const weightRepresentative = weightKg ? getRepresentativeValue(weightKg) : undefined;
  const heightClass = heightRepresentative === undefined ? undefined : classifyHeight(heightRepresentative);
  const weightClass = weightRepresentative === undefined ? undefined : classifyWeight(weightRepresentative);
  const reviewFlags = [...inheritedFlags];

  if (!heightCm) reviewFlags.push("missing-height");
  else if (heightRepresentative === undefined) reviewFlags.push("incomplete-height");
  if (!weightKg) reviewFlags.push("missing-weight");
  else if (weightRepresentative === undefined) reviewFlags.push("incomplete-weight");

  const gap = heightClass && weightClass ? getSizeClassGap(heightClass, weightClass) : undefined;
  if (gap !== undefined && gap >= 2) reviewFlags.push("height-weight-gap");

  const canConfirm = requestedStatus === "confirmed" && heightClass && weightClass && (gap ?? 0) < 2;
  return {
    status: canConfirm ? "confirmed" : requestedStatus === "confirmed" ? "provisional" : requestedStatus,
    ...(heightRepresentative === undefined ? {} : { heightRepresentative }),
    ...(weightRepresentative === undefined ? {} : { weightRepresentative }),
    ...(heightClass ? { heightClass } : {}),
    ...(weightClass ? { weightClass } : {}),
    ...(canConfirm ? { finalClass: getHigherSizeClass(heightClass, weightClass) } : {}),
    reviewFlags: [...new Set(reviewFlags)],
  };
}

export function resolveVarietySize(variety: BreedSizeVariety): ResolvedSingleSize {
  return resolveMeasurements(variety.heightCm, variety.weightKg, "confirmed");
}

export type ResolvedBreedSize =
  | ResolvedSingleSize
  | {
      status: "varieties";
      varieties: Array<BreedSizeVariety & { result: ResolvedSingleSize }>;
      reviewFlags: string[];
    }
  | { status: "variable-parentage"; reviewFlags: string[] };

export function resolveBreedSize(profile: BreedSizeProfile): ResolvedBreedSize {
  if (profile.status === "varieties") {
    return {
      status: "varieties",
      varieties: (profile.varieties ?? []).map((variety) => ({ ...variety, result: resolveVarietySize(variety) })),
      reviewFlags: [...profile.reviewFlags],
    };
  }
  if (profile.status === "variable-parentage") {
    return { status: "variable-parentage", reviewFlags: [...profile.reviewFlags] };
  }
  return resolveMeasurements(profile.heightCm, profile.weightKg, profile.status, profile.reviewFlags);
}
