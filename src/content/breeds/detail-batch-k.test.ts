import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchK, detailBatchKSlugs } from "./detail-batch-k";
import { getMasterBreed } from "./master-catalog";

const expectedBatchKSlugs = [
  "australian-silky-terrier", "finnish-lapponian-dog", "swedish-vallhund", "italian-volpino", "eurasier",
  "american-akita", "hokkaido", "kai", "kishu", "shikoku", "canaan-dog", "yakutian-laika",
  "harrier", "english-foxhound", "petit-basset-griffon-vendeen", "finnish-hound", "alpine-dachsbracke",
  "bavarian-mountain-scent-hound", "german-wire-haired-pointing-dog", "italian-pointing-dog", "small-munsterlander",
  "wire-haired-pointing-griffon-korthals", "english-pointer", "curly-coated-retriever", "clumber-spaniel",
  "american-cocker-spaniel", "barbet", "irish-water-spaniel", "spanish-water-dog", "american-water-spaniel",
];

describe("detail batch K mapping", () => {
  it("adds exactly thirty unique, previously unpublished breeds", () => {
    expect(detailBatchKSlugs).toEqual(expectedBatchKSlugs);
    expect(new Set(detailBatchKSlugs).size).toBe(30);
    expect(detailBatchK).toHaveLength(30);
    for (const slug of expectedBatchKSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves all related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchK) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps each card and history scene to a real WebP file", () => {
    for (const breed of detailBatchK) {
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
