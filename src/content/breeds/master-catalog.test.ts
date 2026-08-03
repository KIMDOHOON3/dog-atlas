import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { getMasterBreed, getMasterCatalogStats, masterCatalog } from "./master-catalog";
import { getMasterSource, masterSources } from "./master-sources";

describe("master breed catalog", () => {
  it("contains unique slugs", () => {
    const slugs = masterCatalog.map((breed) => breed.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains the 160-breed discovery inventory and the twenty detailed breeds", () => {
    expect(masterCatalog).toHaveLength(160);
    for (const breed of breeds) {
      expect(getMasterBreed(breed.slug)?.nameKo).toBe(breed.nameKo);
    }
  });

  it("keeps every FCI group number within 1 through 10", () => {
    for (const breed of masterCatalog) {
      if (breed.fciGroup) {
        expect(breed.fciGroup.number).toBeGreaterThanOrEqual(1);
        expect(breed.fciGroup.number).toBeLessThanOrEqual(10);
      }
    }
  });

  it("has at least one source for every starter entry", () => {
    expect(masterCatalog.every((breed) => breed.sourceIds.length >= 1)).toBe(true);
  });

  it("resolves every source ID through the master source registry", () => {
    const registeredSourceIds = new Set(masterSources.map((source) => source.id));
    for (const breed of masterCatalog) {
      for (const sourceId of breed.sourceIds) {
        expect(registeredSourceIds.has(sourceId)).toBe(true);
        expect(getMasterSource(sourceId)?.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("matches published detail slugs to the existing detail collection", () => {
    const publishedMasterSlugs = masterCatalog
      .filter((breed) => breed.detailStatus === "published")
      .map((breed) => breed.slug)
      .sort();
    const existingDetailSlugs = breeds.map((breed) => breed.slug).sort();
    expect(publishedMasterSlugs).toEqual(existingDetailSlugs);
  });

  it("reports catalog status without depending on UI data", () => {
    expect(getMasterCatalogStats()).toEqual({
      total: 160,
      byFciGroup: { 1: 20, 2: 23, 3: 18, 4: 1, 5: 27, 6: 12, 7: 11, 8: 16, 9: 20, 10: 10 },
      registryStatus: { definitive: 154, provisional: 4, nonFci: 2, verificationNeeded: 0 },
      detailPriority: { core: 5, next: 15, later: 140 },
      detailStatus: { published: 20, planned: 0, none: 140 },
    });
  });

  it("resolves Korean search aliases for common varieties and spelling variants", () => {
    expect(getMasterBreed("german-spitz")?.aliasesKo).toContain("포메라니안");
    expect(getMasterBreed("belgian-shepherd-dog")?.aliasesKo).toContain("말리노이즈");
    expect(getMasterBreed("poodle")?.aliasesKo).toContain("토이 푸들");
    expect(getMasterBreed("maltese")?.aliasesKo).toContain("말티즈");
  });

  it("keeps FCI varieties under one breed identity without losing discovery names", () => {
    expect(getMasterBreed("belgian-shepherd-dog")?.varieties).toHaveLength(4);
    expect(getMasterBreed("dachshund")?.varieties).toHaveLength(9);
    expect(getMasterBreed("german-spitz")?.varieties.map((variety) => variety.nameKo)).toContain("포메라니안");
    expect(getMasterBreed("poodle")?.varieties.map((variety) => variety.nameKo)).toContain("토이 푸들");
    expect(getMasterBreed("continental-toy-spaniel")?.varieties).toHaveLength(2);
  });
});
