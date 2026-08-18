import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchU } from "./detail-batch-u";
import { getMasterBreed } from "./master-catalog";

describe("detail batch U", () => {
  it("publishes Bulgae as a documented Yeongju population without inventing a registered standard", () => {
    expect(detailBatchU.map((breed) => breed.slug)).toEqual(["bulgae"]);
    expect(breeds).toHaveLength(376);
    expect(getMasterBreed("bulgae")).toMatchObject({
      nameKo: "불개",
      registryStatus: "non-fci",
      inclusionType: "documented-population",
      detailStatus: "published",
    });
    expect(detailBatchU[0].identity.size).toContain("공인 품종 표준 수치 없음");
    expect(detailBatchU[0].identity.lifespan).toContain("표시하지 않음");
  });

  it("keeps regional and English search aliases", () => {
    expect(getMasterBreed("bulgae")?.aliasesKo).toEqual(expect.arrayContaining(["영주 불개", "영주불개"]));
    expect(getMasterBreed("bulgae")?.aliasesEn).toEqual(expect.arrayContaining(["Yeongju Bulgae", "Bul-Gae"]));
  });
});
