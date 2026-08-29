import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchG, detailBatchGSlugs } from "./detail-batch-g";
import { getMasterBreed } from "./master-catalog";

const expectedBatchGSlugs = [
  "australian-cattle-dog", "giant-schnauzer", "scottish-terrier", "norwegian-elkhound-grey", "bloodhound",
  "vizsla", "flat-coated-retriever", "coton-de-tulear", "afghan-hound", "lhasa-apso",
];

describe("detail batch G", () => {
  it("adds exactly ten unique breeds", () => {
    expect(detailBatchGSlugs).toEqual(expectedBatchGSlugs);
    expect(new Set(detailBatchGSlugs).size).toBe(10);
    expect(detailBatchG).toHaveLength(10);
  });

  it("publishes every breed through data and the master catalog", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const slug of expectedBatchGSlugs) {
      expect(publishedSlugs.has(slug)).toBe(true);
      expect(getMasterBreed(slug)?.detailStatus).toBe("published");
    }
  });

  it("keeps individual editorial copy and at least two official sources", () => {
    expect(new Set(detailBatchG.map((breed) => breed.tagline)).size).toBe(10);
    expect(new Set(detailBatchG.map((breed) => breed.story.reality)).size).toBe(10);
    for (const breed of detailBatchG) {
      expect(breed.sources.length).toBeGreaterThanOrEqual(2);
      expect(breed.sources[0].organization).toBe("Fédération Cynologique Internationale");
      expect(breed.sources[1].organization).toBe("American Kennel Club");
    }
  });

  it("links every card and history scene to an existing WebP asset", () => {
    for (const breed of detailBatchG) {
      expect(breed.illustration).toBe(getBreedCardImage(breed.slug));
      expect(breed.illustration).toMatch(/\.webp$/);
      expect(breed.historyVisual?.src).toMatch(/\.webp$/);
      expect(existsSync(join(process.cwd(), "public", breed.illustration.slice(1)))).toBe(true);
      expect(existsSync(join(process.cwd(), "public", breed.historyVisual!.src.slice(1)))).toBe(true);
    }
  });
});
