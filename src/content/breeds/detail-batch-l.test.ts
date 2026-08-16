import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchL, detailBatchLSlugs } from "./detail-batch-l";
import { getMasterBreed } from "./master-catalog";

const expectedBatchLSlugs = [
  "bolognese", "tibetan-spaniel", "tibetan-terrier", "japanese-chin", "prague-ratter", "azawakh", "sloughi", "galgo-espanol",
  "bergamasco-shepherd", "mudi", "schipperke", "slovakian-cuvac", "polish-lowland-sheepdog",
  "appenzeller-cattle-dog", "entlebucher-mountain-dog", "greater-swiss-mountain-dog", "german-pinscher", "kangal-shepherd-dog",
  "bedlington-terrier", "parson-russell-terrier", "sealyham-terrier", "manchester-terrier", "cesky-terrier",
  "thai-ridgeback", "portuguese-podengo", "greenland-dog", "peruvian-hairless-dog", "cirneco-dell-etna",
  "gascon-saintongeois", "grand-basset-griffon-vendeen", "schweizer-laufhund", "porcelaine", "petit-bleu-de-gascogne",
  "gordon-setter", "german-long-haired-pointer", "french-spaniel", "braque-saint-germain", "blue-picardy-spaniel",
  "field-spaniel", "sussex-spaniel", "wetterhoun", "kooikerhondje", "drentsche-patrijshond",
  "griffon-bruxellois", "petit-brabancon", "russian-toy", "lowchen", "english-toy-spaniel",
  "scottish-deerhound", "hungarian-greyhound",
];

describe("detail batch L mapping", () => {
  it("adds exactly fifty unique, previously unpublished official breeds", () => {
    expect(detailBatchLSlugs).toEqual(expectedBatchLSlugs);
    expect(new Set(detailBatchLSlugs).size).toBe(50);
    expect(detailBatchL).toHaveLength(50);
    for (const slug of expectedBatchLSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves all related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchL) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps every card and history scene to a real WebP file", () => {
    for (const breed of detailBatchL) {
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
