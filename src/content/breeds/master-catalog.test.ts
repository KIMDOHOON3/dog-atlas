import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { getMasterBreed, getMasterCatalogStats, masterCatalog } from "./master-catalog";
import { getMasterSource, masterSources } from "./master-sources";

describe("master breed catalog", () => {
  it("contains unique slugs", () => {
    const slugs = masterCatalog.map((breed) => breed.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains the discovery inventory and all 375 detailed entries", () => {
    expect(masterCatalog).toHaveLength(375);
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
      total: 375,
      byFciGroup: { 1: 49, 2: 56, 3: 36, 4: 1, 5: 48, 6: 72, 7: 35, 8: 23, 9: 30, 10: 14 },
      registryStatus: { definitive: 347, provisional: 17, nonFci: 11, verificationNeeded: 0 },
      inclusionType: {
        internationalRegistered: 368,
        nationalHeritage: 2,
        nationalRegistered: 0,
        verifiedLandrace: 1,
        documentedPopulation: 2,
        designerCross: 2,
        unverifiedName: 0,
      },
      detailPriority: { core: 5, next: 370, later: 0 },
      detailStatus: { published: 375, planned: 0, none: 0 },
    });
  });

  it("resolves Korean search aliases for common varieties and spelling variants", () => {
    expect(getMasterBreed("german-spitz")?.aliasesKo).toContain("포메라니안");
    expect(getMasterBreed("belgian-malinois")?.aliasesKo).toContain("말리누아");
    expect(getMasterBreed("poodle")?.aliasesKo).toContain("토이 푸들");
    expect(getMasterBreed("maltese")?.nameKo).toBe("말티즈");
    expect(getMasterBreed("maltese")?.aliasesKo).toContain("몰티즈");
    expect(getMasterBreed("donggyeongi")?.aliasesKo).toContain("동경이");
    expect(getMasterBreed("central-asian-shepherd-dog")?.aliasesKo).toContain("알라바이");
    expect(getMasterBreed("central-asian-shepherd-dog")?.aliasesEn).toContain("Alabai");
    expect(getMasterBreed("welsh-corgi-pembroke")?.aliasesKo).toContain("웰시코기");
  });

  it("separates registry status from the evidence-based inclusion type", () => {
    expect(getMasterBreed("american-bully")).toMatchObject({
      registryStatus: "non-fci",
      inclusionType: "international-registered",
      evidenceAuthority: "United Kennel Club (UKC)",
    });
    expect(getMasterBreed("sapsaree")).toMatchObject({
      inclusionType: "national-heritage",
      sourceIds: expect.arrayContaining(["heritage-sapsaree"]),
    });
    expect(getMasterBreed("donggyeongi")).toMatchObject({
      nameKo: "경주개 동경이",
      inclusionType: "national-heritage",
      sourceIds: expect.arrayContaining(["heritage-donggyeongi"]),
    });
    expect(getMasterBreed("mongolian-bankhar")?.inclusionType).toBe("verified-landrace");
    expect(getMasterBreed("pungsan-dog")?.inclusionType).toBe("documented-population");
    expect(getMasterBreed("goldendoodle")?.inclusionType).toBe("designer-cross");
    expect(getMasterBreed("maltipoo")?.inclusionType).toBe("designer-cross");
  });

  it("supports separately browsable Belgian Shepherd varieties and nested varieties elsewhere", () => {
    expect([
      "belgian-groenendael",
      "belgian-laekenois",
      "belgian-malinois",
      "belgian-tervueren",
    ].every((slug) => getMasterBreed(slug)?.verificationNotes.some((note) => note.includes("바라이어티")))).toBe(true);
    expect(getMasterBreed("dachshund")?.varieties).toHaveLength(9);
    expect(getMasterBreed("german-spitz")?.varieties.map((variety) => variety.nameKo)).toContain("포메라이언");
    expect(getMasterBreed("poodle")?.varieties.map((variety) => variety.nameKo)).toContain("토이 푸들");
    expect(getMasterBreed("continental-toy-spaniel")?.varieties).toHaveLength(2);
  });
});
