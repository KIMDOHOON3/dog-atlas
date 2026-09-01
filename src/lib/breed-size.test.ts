import { describe, expect, it } from "vitest";
import type { BreedSizeProfile } from "@/content/breed-sizes/schema";
import {
  classifyHeight,
  classifyWeight,
  getRepresentativeValue,
  resolveBreedSize,
} from "./breed-size";

const baseProfile: Pick<BreedSizeProfile, "slug" | "nameKo" | "reviewFlags" | "evidence"> = {
  slug: "test-breed",
  nameKo: "테스트 견종",
  reviewFlags: [],
  evidence: [],
};

describe("Dog Atlas size classification", () => {
  it.each([
    [24.99, "extra-small"], [25, "small"], [39.99, "small"], [40, "medium"],
    [54.99, "medium"], [55, "large"], [69.99, "large"], [70, "giant"],
  ] as const)("classifies %scm height at the documented boundary", (value, expected) => {
    expect(classifyHeight(value)).toBe(expected);
  });

  it.each([
    [3.99, "extra-small"], [4, "small"], [9.99, "small"], [10, "medium"],
    [24.99, "medium"], [25, "large"], [49.99, "large"], [50, "giant"],
  ] as const)("classifies %skg weight at the documented boundary", (value, expected) => {
    expect(classifyWeight(value)).toBe(expected);
  });

  it("uses the midpoint of complete ranges, including decimals", () => {
    expect(getRepresentativeValue({ kind: "range", min: 65, max: 78 })).toBe(71.5);
    expect(getRepresentativeValue({ kind: "range", min: 10.2, max: 10.9 })).toBe(10.55);
  });

  it("uses the higher of the height and weight classes", () => {
    const profile: BreedSizeProfile = {
      ...baseProfile,
      status: "confirmed",
      heightCm: { kind: "range", min: 60, max: 68 },
      weightKg: { kind: "range", min: 18, max: 24 },
    };
    expect(resolveBreedSize(profile)).toMatchObject({
      status: "confirmed",
      heightClass: "large",
      weightClass: "medium",
      finalClass: "large",
    });
  });

  it("does not confirm a two-class height/weight gap", () => {
    const profile: BreedSizeProfile = {
      ...baseProfile,
      status: "provisional",
      heightCm: { kind: "range", min: 70, max: 76 },
      weightKg: { kind: "range", min: 12, max: 18 },
      reviewFlags: ["height-weight-gap"],
    };
    expect(resolveBreedSize(profile)).toMatchObject({
      status: "provisional",
      heightClass: "giant",
      weightClass: "medium",
      reviewFlags: expect.arrayContaining(["height-weight-gap"]),
    });
    expect(resolveBreedSize(profile)).not.toHaveProperty("finalClass");
  });

  it("does not turn an incomplete bound into a representative value", () => {
    const profile: BreedSizeProfile = {
      ...baseProfile,
      status: "provisional",
      heightCm: { kind: "lower-bound", value: 70 },
      weightKg: { kind: "range", min: 40, max: 55 },
    };
    expect(resolveBreedSize(profile)).toMatchObject({ status: "provisional", reviewFlags: expect.arrayContaining(["incomplete-height"]) });
    expect(resolveBreedSize(profile)).not.toHaveProperty("finalClass");
  });

  it("resolves varieties independently instead of merging their ranges", () => {
    const profile: BreedSizeProfile = {
      ...baseProfile,
      status: "varieties",
      varieties: [
        { id: "small", label: "작은형", heightCm: { kind: "range", min: 20, max: 30 }, weightKg: { kind: "range", min: 4, max: 6 } },
        { id: "large", label: "큰형", heightCm: { kind: "range", min: 55, max: 70 }, weightKg: { kind: "range", min: 20, max: 30 } },
      ],
    };
    const result = resolveBreedSize(profile);
    expect(result.status).toBe("varieties");
    if (result.status === "varieties") {
      expect(result.varieties).toHaveLength(2);
      expect(result.varieties[0].result.heightRepresentative).toBe(25);
      expect(result.varieties[1].result.heightRepresentative).toBe(62.5);
    }
    expect(result).not.toHaveProperty("finalClass");
  });
});
