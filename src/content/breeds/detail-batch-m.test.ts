import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchM, detailBatchMSlugs } from "./detail-batch-m";
import { getMasterBreed } from "./master-catalog";

const expectedBatchMSlugs = [
  "catalan-sheepdog", "croatian-sheepdog", "komondor", "kuvasz", "schapendoes", "portuguese-sheepdog",
  "maremma-sheepdog", "polish-tatra-sheepdog", "romanian-mioritic-shepherd-dog", "romanian-carpathian-shepherd-dog",
  "broholmer", "fila-brasileiro", "hovawart", "landseer", "pyrenean-mastiff", "sarplaninac", "tosa", "tornjak",
  "central-asian-shepherd-dog", "spanish-mastiff", "australian-terrier", "irish-terrier", "lakeland-terrier", "skye-terrier",
  "dandie-dinmont-terrier", "glen-of-imaal-terrier", "japanese-terrier", "german-hunting-terrier", "norwegian-buhund",
  "russian-european-laika", "east-siberian-laika", "west-siberian-laika", "norrbottenspets", "jamthund", "ariegeois",
  "anglo-francais-de-petite-venerie", "billy", "briquet-griffon-vendeen", "dunker", "halden-hound", "hygen-hound",
  "transylvanian-hound", "tyrolean-hound", "braque-francais-type-gascogne", "braque-d-auvergne", "german-stichelhaar",
  "spinone-italiano", "large-munsterlander", "irish-red-and-white-setter", "hungarian-wirehaired-vizsla",
];

describe("detail batch M mapping", () => {
  it("adds exactly fifty unique, previously unpublished official breeds", () => {
    expect(detailBatchMSlugs).toEqual(expectedBatchMSlugs);
    expect(new Set(detailBatchMSlugs).size).toBe(50);
    expect(detailBatchM).toHaveLength(50);
    for (const slug of expectedBatchMSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves all related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchM) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps every card and history scene to a real WebP file", () => {
    for (const breed of detailBatchM) {
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
