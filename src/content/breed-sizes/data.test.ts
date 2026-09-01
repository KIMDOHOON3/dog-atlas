import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { resolveBreedSize } from "@/lib/breed-size";
import { breedSizeAudit, breedSizeProfiles, getBreedSizeProfile, parseLegacyMeasurement } from "./data";

describe("breed size migration registry", () => {
  it("maps every one of the 376 catalog breeds exactly once", () => {
    expect(breeds).toHaveLength(376);
    expect(breedSizeProfiles).toHaveLength(breeds.length);
    expect(new Set(breedSizeProfiles.map((profile) => profile.slug)).size).toBe(breeds.length);
    expect(breeds.filter((breed) => !getBreedSizeProfile(breed.slug))).toEqual([]);
  });

  it("keeps incomplete and variable data out of confirmed status", () => {
    for (const profile of breedSizeProfiles.filter((item) => item.status === "confirmed")) {
      expect(profile.heightCm?.kind === "range" || profile.heightCm?.kind === "representative").toBe(true);
      expect(profile.weightKg?.kind === "range" || profile.weightKg?.kind === "representative").toBe(true);
      expect(resolveBreedSize(profile).status).toBe("confirmed");
    }
    expect(getBreedSizeProfile("goldendoodle")?.status).toBe("variable-parentage");
    expect(getBreedSizeProfile("maltipoo")?.status).toBe("variable-parentage");
  });

  it("keeps official size varieties separate", () => {
    for (const slug of ["poodle", "dachshund", "german-spitz", "xoloitzcuintle", "portuguese-podengo", "peruvian-hairless-dog", "gascon-saintongeois", "american-bully"]) {
      expect(getBreedSizeProfile(slug)?.status).toBe("varieties");
      expect(getBreedSizeProfile(slug)?.varieties?.length).toBeGreaterThan(1);
    }
  });

  it("preserves the audited completeness of every size-variety breed", () => {
    expect(getBreedSizeProfile("poodle")?.varieties?.every((variety) => Boolean(variety.heightCm) && !variety.weightKg)).toBe(true);
    expect(getBreedSizeProfile("dachshund")?.varieties?.every((variety) => !variety.heightCm && !variety.weightKg)).toBe(true);
    expect(getBreedSizeProfile("german-spitz")?.varieties?.filter((variety) => variety.heightCm && variety.weightKg).map((variety) => variety.id)).toEqual(["pomeranian"]);
    expect(getBreedSizeProfile("xoloitzcuintle")?.varieties?.every((variety) => Boolean(variety.heightCm) && !variety.weightKg)).toBe(true);
    for (const slug of ["portuguese-podengo", "peruvian-hairless-dog"]) {
      expect(getBreedSizeProfile(slug)?.varieties?.every((variety) => Boolean(variety.heightCm) && Boolean(variety.weightKg))).toBe(true);
    }
    for (const slug of ["gascon-saintongeois", "american-bully"]) {
      expect(getBreedSizeProfile(slug)?.varieties?.every((variety) => Boolean(variety.heightCm) && !variety.weightKg)).toBe(true);
    }
    expect(getBreedSizeProfile("german-spitz")?.varieties?.map((variety) => variety.heightCm)).toEqual([
      { kind: "range", min: 43, max: 55 },
      { kind: "range", min: 40, max: 50 },
      { kind: "range", min: 30, max: 40 },
      { kind: "range", min: 24, max: 30 },
      { kind: "range", min: 18, max: 24 },
    ]);
  });

  it("keeps every external supplement traceable and resolves the seven reviewed conflicts", () => {
    expect(breedSizeAudit.externalSupplements).toHaveLength(44);
    expect(new Set(breedSizeAudit.externalSupplements.map((item) => item.slug)).size).toBe(44);
    for (const supplement of breedSizeAudit.externalSupplements) {
      for (const dimension of [supplement.height, supplement.weight].filter(Boolean)) {
        expect(dimension?.source).toMatchObject({ checkedAt: "2026-09-01" });
        expect(dimension?.source.url).toMatch(/^https:\/\//u);
        expect(dimension?.source.rawValue.length).toBeGreaterThan(0);
      }
    }
    for (const slug of ["swedish-vallhund", "italian-volpino", "kai", "wire-haired-pointing-griffon-korthals", "japanese-chin", "greater-swiss-mountain-dog", "boerboel"]) {
      expect(getBreedSizeProfile(slug)?.status).toBe("confirmed");
    }
    expect(getBreedSizeProfile("bulgae")?.status).toBe("missing");
  });

  it("preserves minimum and maximum-only values as incomplete measurements", () => {
    expect(parseLegacyMeasurement("암컷 71cm 이상 · 수컷 76cm 이상", "height")).toEqual({ kind: "lower-bound", value: 71 });
    expect(parseLegacyMeasurement("3.2kg 이하", "weight")).toEqual({ kind: "upper-bound", value: 3.2 });
    expect(parseLegacyMeasurement("암컷 61cm · 수컷 69cm", "height")).toEqual({ kind: "range", min: 61, max: 69 });
    expect(parseLegacyMeasurement("암컷 이상적 42cm(±2cm) · 수컷 이상적 45cm(±2cm)", "height")).toEqual({ kind: "range", min: 42, max: 45 });
  });

  it("locks the internal integration audit counts", () => {
    expect(breedSizeAudit.total).toBe(376);
    expect(breedSizeAudit.statusCounts).toEqual({
      confirmed: 312,
      provisional: 53,
      varieties: 8,
      "variable-parentage": 2,
      conflict: 0,
      missing: 1,
    });
    expect(breedSizeAudit.confirmedDistribution).toEqual({
      "extra-small": 3,
      small: 46,
      medium: 112,
      large: 125,
      giant: 26,
    });
    expect(breedSizeAudit.missingHeight).toHaveLength(4);
    expect(breedSizeAudit.missingWeight).toHaveLength(26);
    expect(breedSizeAudit.missingBoth.map((profile) => profile.slug)).toEqual(["bulgae"]);
    expect(breedSizeAudit.incompleteBounds).toHaveLength(24);
    expect(breedSizeAudit.conflicts).toHaveLength(0);
    expect(breedSizeAudit.conflictReviews).toHaveLength(43);
    expect(breedSizeAudit.conflictReviewCounts).toEqual({
      rounding: 7,
      minor: 12,
      "meaning-difference": 18,
      "true-conflict": 6,
    });
    expect(breedSizeAudit.conflictReviews.filter((review) => review.outcome === "confirmed")).toHaveLength(29);
    expect(breedSizeAudit.conflictReviews.filter((review) => review.outcome === "provisional")).toHaveLength(7);
    expect(breedSizeAudit.conflictReviews.filter((review) => review.outcome === "conflict")).toHaveLength(7);
    expect(breedSizeAudit.conflicts.map((profile) => profile.slug)).toEqual([]);
    expect(breedSizeAudit.externalRequiredSingle).toHaveLength(54);
    expect(breedSizeAudit.provisionalReasons.heightOnly).toHaveLength(25);
    expect(breedSizeAudit.provisionalReasons.weightOnly).toHaveLength(3);
    expect(breedSizeAudit.provisionalReasons.minimumOnly).toHaveLength(11);
    expect(breedSizeAudit.provisionalReasons.maximumOnly).toHaveLength(1);
    expect(breedSizeAudit.provisionalReasons.lowerBound).toHaveLength(13);
    expect(breedSizeAudit.provisionalReasons.upperBound).toHaveLength(11);
    expect(breedSizeAudit.provisionalReasons.includesIisang).toHaveLength(10);
    expect(breedSizeAudit.provisionalReasons.includesIha).toHaveLength(11);
    expect(breedSizeAudit.provisionalReasons.oneSexIncomplete).toHaveLength(5);
    expect(breedSizeAudit.provisionalReasons.other).toHaveLength(0);
  });

  it.each([
    ["kangal-shepherd-dog", "confirmed", 71.5, 50, "giant"],
    ["greyhound", "confirmed", 72.5, 29.5, "giant"],
    ["saluki", "confirmed", 64.5, 23.5, "large"],
    ["scottish-deerhound", "provisional", undefined, 41, undefined],
    ["bernese-mountain-dog", "confirmed", 64, 45, "large"],
    ["rottweiler", "confirmed", 62.5, 48.5, "large"],
    ["cane-corso", "confirmed", 64, 45, "large"],
    ["newfoundland", "confirmed", 68.5, 59, "giant"],
    ["welsh-corgi-cardigan", "confirmed", 29.5, 14, "medium"],
    ["bulldog", "confirmed", 35.5, 21.5, "medium"],
  ] as const)("keeps the %s regression result", (slug, status, heightRepresentative, weightRepresentative, finalClass) => {
    const profile = getBreedSizeProfile(slug);
    expect(profile).toBeDefined();
    expect(profile?.status).toBe(status);
    const result = resolveBreedSize(profile!);
    expect(result).toMatchObject({ status, ...(heightRepresentative === undefined ? {} : { heightRepresentative }), ...(weightRepresentative === undefined ? {} : { weightRepresentative }) });
    if (finalClass) expect(result).toMatchObject({ finalClass });
    else expect(result).not.toHaveProperty("finalClass");
  });
});
