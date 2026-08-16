import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchR } from "./detail-batch-r";
import { getMasterBreed } from "./master-catalog";
import { getBreedSizeCategories } from "@/lib/breed-filters";

describe("detail batch R designer crosses", () => {
  it("publishes Goldendoodle and Maltipoo without presenting them as registered breeds", () => {
    expect(detailBatchR.map((breed) => breed.slug)).toEqual(["goldendoodle", "maltipoo"]);
    expect(breeds).toHaveLength(373);

    for (const breed of detailBatchR) {
      expect(getMasterBreed(breed.slug)).toMatchObject({
        registryStatus: "non-fci",
        inclusionType: "designer-cross",
        detailStatus: "published",
      });
      expect(breed.identity.lineage).toContain("디자이너 교배견");
      expect(breed.story.reality).not.toContain("저알레르기성입니다");
    }
  });

  it("makes parentage, variability, grooming and health-record checks explicit", () => {
    for (const breed of detailBatchR) {
      const copy = JSON.stringify(breed);
      expect(copy).toMatch(/교배/);
      expect(copy).toMatch(/개체/);
      expect(copy).toMatch(/빗질|미용/);
      expect(copy).toMatch(/건강검사|검사 기록/);
      expect(breed.tendencies.grooming.label).toBe("높은 편");
    }
  });

  it("uses the existing size filters without adding a designer-cross filter", () => {
    expect(getBreedSizeCategories(detailBatchR[0].identity.size)).toEqual(["small", "medium", "large"]);
    expect(getBreedSizeCategories(detailBatchR[1].identity.size)).toEqual(["small"]);
  });
});
