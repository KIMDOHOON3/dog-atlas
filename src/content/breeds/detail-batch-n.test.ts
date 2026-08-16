import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import { breeds } from "./data";
import { detailBatchN, detailBatchNSlugs } from "./detail-batch-n";
import { getMasterBreed } from "./master-catalog";

const expectedBatchNSlugs = [
  "berger-picard", "pumi", "pyrenean-sheepdog", "lancashire-heeler", "saarloos-wolfdog",
  "aidi", "caucasian-shepherd-dog", "presa-canario", "black-russian-terrier", "austrian-pinscher",
  "danish-swedish-farmdog", "estrela-mountain-dog", "welsh-terrier", "brazilian-terrier", "english-toy-terrier",
  "pharaoh-hound", "ibizan-hound", "lapponian-herder", "swedish-lapphund", "podenco-canario",
  "austrian-black-and-tan-hound", "styrian-coarse-haired-hound", "slovakian-hound", "posavac-hound",
  "bosnian-broken-haired-hound", "serbian-hound", "montenegrin-mountain-hound", "greek-harehound", "italian-segugio",
  "spanish-hound", "grand-bleu-de-gascogne", "basset-bleu-de-gascogne", "basset-fauve-de-bretagne", "basset-artesien-normand",
  "poitevin", "hamiltonstovare", "schillerstovare", "smaland-hound", "drever", "old-danish-pointer",
  "slovakian-wirehaired-pointer", "burgos-pointer", "picardy-spaniel", "pont-audemer-spaniel", "stabyhoun",
  "welsh-springer-spaniel", "affenpinscher", "kromfohrlander", "biewer-terrier", "polish-greyhound",
];

describe("detail batch N mapping", () => {
  it("adds exactly fifty unique, previously unpublished official breeds", () => {
    expect(detailBatchNSlugs).toEqual(expectedBatchNSlugs);
    expect(new Set(detailBatchNSlugs).size).toBe(50);
    expect(detailBatchN).toHaveLength(50);
    for (const slug of expectedBatchNSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves all related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchN) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps every card and history scene to a real WebP file", () => {
    for (const breed of detailBatchN) {
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
