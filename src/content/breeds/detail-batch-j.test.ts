import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchJ, detailBatchJSlugs } from "./detail-batch-j";
import { getMasterBreed } from "./master-catalog";

const expectedBatchJSlugs = [
  "belgian-shepherd-dog", "czechoslovakian-wolfdog", "bearded-collie", "white-swiss-shepherd-dog", "bouvier-des-flandres",
  "miniature-american-shepherd", "dogo-argentino", "dogue-de-bordeaux", "bulldog", "neapolitan-mastiff",
  "tibetan-mastiff", "continental-bulldog", "smooth-fox-terrier", "wire-fox-terrier", "kerry-blue-terrier",
  "cairn-terrier", "norfolk-terrier", "norwich-terrier", "miniature-bull-terrier", "american-staffordshire-terrier",
];

describe("detail batch J mapping", () => {
  it("adds exactly twenty unique, previously unpublished breeds", () => {
    expect(detailBatchJSlugs).toEqual(expectedBatchJSlugs);
    expect(new Set(detailBatchJSlugs).size).toBe(20);
    expect(detailBatchJ).toHaveLength(20);
    for (const slug of expectedBatchJSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves all related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchJ) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps each card and history scene to a real WebP file", () => {
    for (const breed of detailBatchJ) {
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
