import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchF, detailBatchFSlugs } from "./detail-batch-f";
import { getMasterBreed } from "./master-catalog";

const expectedBatchFSlugs = [
  "australian-kelpie", "miniature-pinscher", "airedale-terrier", "welsh-corgi-cardigan", "finnish-spitz",
  "basset-hound", "german-short-haired-pointing-dog", "english-springer-spaniel", "havanese", "borzoi",
];

describe("detail batch F", () => {
  it("adds exactly ten unique breeds", () => {
    expect(detailBatchFSlugs).toEqual(expectedBatchFSlugs);
    expect(new Set(detailBatchFSlugs).size).toBe(10);
    expect(detailBatchF).toHaveLength(10);
  });

  it("publishes every breed through data and the master catalog", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const slug of expectedBatchFSlugs) {
      expect(publishedSlugs.has(slug)).toBe(true);
      expect(getMasterBreed(slug)?.detailStatus).toBe("published");
    }
  });

  it("keeps individual editorial copy and at least two official sources", () => {
    expect(new Set(detailBatchF.map((breed) => breed.tagline)).size).toBe(10);
    expect(new Set(detailBatchF.map((breed) => breed.story.reality)).size).toBe(10);
    for (const breed of detailBatchF) {
      expect(breed.sources.length).toBeGreaterThanOrEqual(2);
      expect(breed.sources[0].organization).toBe("Fédération Cynologique Internationale");
      expect(breed.sources[1].organization).toBe("American Kennel Club");
    }
  });

  it("links every card and history scene to an existing WebP asset", () => {
    for (const breed of detailBatchF) {
      expect(breed.illustration).toBe(getBreedCardImage(breed.slug));
      expect(breed.illustration).toMatch(/\.webp$/);
      expect(breed.historyVisual?.src).toMatch(/\.webp$/);
      expect(existsSync(join(process.cwd(), "public", breed.illustration.slice(1)))).toBe(true);
      expect(existsSync(join(process.cwd(), "public", breed.historyVisual!.src.slice(1)))).toBe(true);
    }
  });
});
