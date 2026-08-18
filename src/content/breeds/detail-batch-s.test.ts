import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchS } from "./detail-batch-s";
import { getMasterBreed } from "./master-catalog";
import { getBreedSizeCategory } from "@/lib/breed-filters";

describe("detail batch S", () => {
  it("publishes the source-backed Boerboel entry", () => {
    expect(detailBatchS.map((breed) => breed.slug)).toEqual(["boerboel"]);
    expect(breeds).toHaveLength(376);
    expect(getMasterBreed("boerboel")).toMatchObject({
      nameKo: "보어보엘",
      registryStatus: "non-fci",
      inclusionType: "international-registered",
      detailStatus: "published",
    });
    expect(getBreedSizeCategory(detailBatchS[0].identity.size)).toBe("giant");
  });

  it("supports the spelling used in the request as a search alias", () => {
    expect(getMasterBreed("boerboel")?.aliasesKo).toEqual(expect.arrayContaining(["보어보벨", "보어보얼"]));
  });
});
