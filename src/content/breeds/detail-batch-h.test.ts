import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchH, detailBatchHSlugs } from "./detail-batch-h";
import { getMasterBreed } from "./master-catalog";

const expectedBatchHSlugs = [
  "beauceron", "bullmastiff", "border-terrier", "icelandic-sheepdog", "rhodesian-ridgeback",
  "english-setter", "chesapeake-bay-retriever", "portuguese-water-dog", "chinese-crested-dog", "saluki",
];

describe("detail batch H mapping", () => {
  it("adds exactly ten unique, previously inventoried breeds", () => {
    expect(detailBatchHSlugs).toEqual(expectedBatchHSlugs);
    expect(new Set(detailBatchHSlugs).size).toBe(10);
    expect(detailBatchH).toHaveLength(10);
    for (const slug of expectedBatchHSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes every breed through data and the master catalog", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const slug of expectedBatchHSlugs) {
      expect(publishedSlugs.has(slug)).toBe(true);
      expect(getMasterBreed(slug)?.detailStatus).toBe("published");
    }
  });

  it("keeps individual copy and at least two official sources", () => {
    expect(new Set(detailBatchH.map((breed) => breed.tagline)).size).toBe(10);
    expect(new Set(detailBatchH.map((breed) => breed.story.reality)).size).toBe(10);
    for (const breed of detailBatchH) {
      expect(breed.sources.length).toBeGreaterThanOrEqual(2);
      expect(breed.sources[0].organization).toBe("Fédération Cynologique Internationale");
      expect(breed.sources[1].organization).toBe("American Kennel Club");
    }
  });

  it("maps every card and history scene to a real WebP file", () => {
    for (const breed of detailBatchH) {
      expect(breed.illustration).toBe(getBreedCardImage(breed.slug));
      const paths = [breed.illustration, breed.historyVisual!.src];
      for (const assetPath of paths) {
        expect(assetPath).toMatch(/\.webp$/);
        const filePath = join(process.cwd(), "public", assetPath.slice(1));
        expect(existsSync(filePath)).toBe(true);
        expect(readFileSync(filePath).subarray(8, 12).toString("ascii")).toBe("WEBP");
      }
    }
  });
});
