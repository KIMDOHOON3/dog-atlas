import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { breeds, getBreed } from "../breeds/data";
import { breedFeatureSets, getBreedFeatures } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

function readVp8Dimensions(bytes: Buffer) {
  expect(bytes.subarray(12, 16).toString("ascii")).toBe("VP8 ");
  return {
    width: bytes.readUInt16LE(26) & 0x3fff,
    height: bytes.readUInt16LE(28) & 0x3fff,
  };
}

describe("breed-specific feature cards", () => {
  it("publishes exactly three unique cards for each completed feature breed", () => {
    expect(breedFeatureSets.map((featureSet) => featureSet.slug)).toEqual(["japanese-spitz", "maltese", "border-collie"]);

    for (const featureSet of breedFeatureSets) {
      expect(getBreed(featureSet.slug)).toBeDefined();
      expect(featureSet.cards).toHaveLength(3);
      expect(new Set(featureSet.cards.map((card) => card.title)).size).toBe(3);
      expect(new Set(featureSet.cards.map((card) => card.description)).size).toBe(3);
      expect(getBreedFeatures(featureSet.slug)).toBe(featureSet);
    }
  });

  it("keeps each card image as an optimized 1200 by 900 WebP", () => {
    for (const featureSet of breedFeatureSets) {
      for (const card of featureSet.cards) {
        const filePath = publicFile(card.image);
        expect(card.image.endsWith(".webp"), card.image).toBe(true);
        expect(existsSync(filePath), card.image).toBe(true);
        expect(statSync(filePath).size, card.image).toBeLessThanOrEqual(700_000);

        const bytes = readFileSync(filePath);
        expect(bytes.subarray(8, 12).toString("ascii"), card.image).toBe("WEBP");
        expect(readVp8Dimensions(bytes), card.image).toEqual({ width: 1200, height: 900 });
      }
    }
  });

  it("links every editorial source to the corresponding breed source list", () => {
    for (const featureSet of breedFeatureSets) {
      const sourceUrls = new Set(getBreed(featureSet.slug)!.sources.map((source) => source.url));
      for (const card of featureSet.cards) {
        expect(card.sourceUrls.length, card.title).toBeGreaterThan(0);
        expect(card.sourceUrls.every((url) => sourceUrls.has(url)), card.title).toBe(true);
      }
    }
  });

  it("does not repeat existing history, tendency, or care copy exactly", () => {
    for (const featureSet of breedFeatureSets) {
      const breed = getBreed(featureSet.slug)!;
      const existingCopy = new Set([
        ...Object.values(breed.story),
        ...Object.values(breed.tendencies).map((tendency) => tendency.note),
        ...breed.careNotes,
      ]);
      expect(featureSet.cards.every((card) => !existingCopy.has(card.description)), featureSet.slug).toBe(true);
    }
  });

  it("keeps feature coverage separate from the catalog used by discovery", () => {
    expect(breeds).toHaveLength(376);
    expect(breedFeatureSets).toHaveLength(3);
    expect(getBreedFeatures("greyhound")).toBeUndefined();
  });
});
