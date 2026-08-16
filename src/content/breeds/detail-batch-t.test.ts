import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchT } from "./detail-batch-t";
import { getMasterBreed } from "./master-catalog";
import { getBreedSizeCategories } from "@/lib/breed-filters";

describe("detail batch T", () => {
  it("publishes the AKC-registered Anatolian Shepherd separately from the FCI Kangal", () => {
    expect(detailBatchT.map((breed) => breed.slug)).toEqual(["anatolian-shepherd-dog"]);
    expect(breeds).toHaveLength(375);
    expect(getMasterBreed("anatolian-shepherd-dog")).toMatchObject({
      nameKo: "아나톨리안 셰퍼드",
      registryStatus: "non-fci",
      inclusionType: "international-registered",
      detailStatus: "published",
    });
    expect(getBreedSizeCategories(detailBatchT[0].identity.size)).toEqual(["giant"]);
    expect(detailBatchT[0].related[0].slug).toBe("kangal-shepherd-dog");
  });

  it("supports common Korean search spellings without aliasing the Kangal entry", () => {
    expect(getMasterBreed("anatolian-shepherd-dog")?.aliasesKo).toEqual(
      expect.arrayContaining(["아나톨리안 셰퍼드 독", "아나톨리아 셰퍼드"]),
    );
    expect(getMasterBreed("kangal-shepherd-dog")?.aliasesKo).not.toContain("아나톨리안 셰퍼드");
  });
});
