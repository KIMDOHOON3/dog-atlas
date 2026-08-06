import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { getMasterBreed, getMasterCatalogStats, masterCatalog } from "./master-catalog";
import { getMasterSource, masterSources } from "./master-sources";

describe("master breed catalog", () => {
  it("contains unique slugs", () => {
    const slugs = masterCatalog.map((breed) => breed.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains the 160-breed discovery inventory and the seventy detailed breeds", () => {
    expect(masterCatalog).toHaveLength(302);
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
      total: 302,
      byFciGroup: { 1: 40, 2: 45, 3: 34, 4: 1, 5: 43, 6: 45, 7: 29, 8: 22, 9: 28, 10: 13 },
      registryStatus: { definitive: 296, provisional: 4, nonFci: 2, verificationNeeded: 0 },
      detailPriority: { core: 5, next: 295, later: 2 },
      detailStatus: { published: 300, planned: 0, none: 2 },
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
