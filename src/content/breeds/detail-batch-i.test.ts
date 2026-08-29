import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchI, detailBatchISlugs } from "./detail-batch-i";
import { getMasterBreed } from "./master-catalog";

const expectedBatchISlugs = [
  "dutch-shepherd-dog", "briard", "collie-rough", "puli", "schnauzer",
  "shar-pei", "mastiff", "leonberger", "west-highland-white-terrier", "staffordshire-bull-terrier",
  "soft-coated-wheaten-terrier", "karelian-bear-dog", "norwegian-lundehund", "xoloitzcuintle", "otterhound",
  "brittany-spaniel", "irish-red-setter", "lagotto-romagnolo", "pekingese", "irish-wolfhound",
];

describe("detail batch I mapping", () => {
  it("adds exactly twenty unique, inventoried breeds", () => {
    expect(detailBatchISlugs).toEqual(expectedBatchISlugs);
    expect(new Set(detailBatchISlugs).size).toBe(20);
    expect(detailBatchI).toHaveLength(20);
    for (const slug of expectedBatchISlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes every breed and resolves every related link", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchI) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("keeps individual copy and at least two official sources", () => {
    expect(new Set(detailBatchI.map((breed) => breed.tagline)).size).toBe(20);
    expect(new Set(detailBatchI.map((breed) => breed.story.reality)).size).toBe(20);
    for (const breed of detailBatchI) {
      expect(breed.sources.length).toBeGreaterThanOrEqual(2);
      expect(breed.sources[0].organization).toBe("Fédération Cynologique Internationale");
      expect(breed.sources[1].organization).toBe("American Kennel Club");
    }
  });

  it("maps every card and history scene to a real WebP file", () => {
    for (const breed of detailBatchI) {
      expect(breed.illustration).toBe(getBreedCardImage(breed.slug));
      for (const assetPath of [breed.illustration, breed.historyVisual!.src]) {
        expect(assetPath).toMatch(/\.webp$/);
        const filePath = join(process.cwd(), "public", assetPath.slice(1));
        expect(existsSync(filePath)).toBe(true);
        expect(readFileSync(filePath).subarray(8, 12).toString("ascii")).toBe("WEBP");
      }
    }
  });
});
