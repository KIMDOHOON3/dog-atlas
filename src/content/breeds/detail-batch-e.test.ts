import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchE, detailBatchESlugs } from "./detail-batch-e";
import { getMasterBreed } from "./master-catalog";

const existingFortySlugs = new Set([
  "japanese-spitz", "maltese", "border-collie", "greyhound", "samoyed",
  "chihuahua", "shih-tzu", "poodle", "dachshund", "beagle", "english-cocker-spaniel",
  "labrador-retriever", "golden-retriever", "german-shepherd-dog", "korea-jindo-dog",
  "siberian-husky", "whippet", "pyrenean-mountain-dog", "french-bulldog", "basenji",
  "welsh-corgi-pembroke", "miniature-schnauzer", "yorkshire-terrier", "shiba", "akita",
  "bichon-frise", "cavalier-king-charles-spaniel", "pug", "bernese-mountain-dog", "dobermann",
  "german-spitz", "shetland-sheepdog", "australian-shepherd", "rottweiler", "boxer",
  "great-dane", "alaskan-malamute", "jack-russell-terrier", "boston-terrier", "newfoundland",
]);

const expectedBatchESlugs = [
  "dalmatian",
  "italian-sighthound",
  "continental-toy-spaniel",
  "chow-chow",
  "saint-bernard",
  "weimaraner",
  "nova-scotia-duck-tolling-retriever",
  "old-english-sheepdog",
  "cane-corso",
  "bull-terrier",
];

describe("detail batch E", () => {
  it("adds exactly ten unique breeds outside the existing forty", () => {
    expect(existingFortySlugs.size).toBe(40);
    expect(detailBatchESlugs).toEqual(expectedBatchESlugs);
    expect(new Set(detailBatchESlugs).size).toBe(10);
    expect(detailBatchESlugs.every((slug) => !existingFortySlugs.has(slug))).toBe(true);
    expect(detailBatchE).toHaveLength(10);
  });

  it("publishes every Batch E breed through data and the master catalog", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const slug of expectedBatchESlugs) {
      expect(publishedSlugs.has(slug)).toBe(true);
      expect(getMasterBreed(slug)?.detailStatus).toBe("published");
    }
  });

  it("keeps individual editorial copy and two official source records", () => {
    expect(new Set(detailBatchE.map((breed) => breed.tagline)).size).toBe(10);
    expect(new Set(detailBatchE.map((breed) => breed.story.reality)).size).toBe(10);
    for (const breed of detailBatchE) {
      expect(breed.sources).toHaveLength(2);
      expect(breed.sources[0].organization).toBe("Fédération Cynologique Internationale");
      expect(breed.sources[1].organization).toBe("American Kennel Club");
    }
  });
});
