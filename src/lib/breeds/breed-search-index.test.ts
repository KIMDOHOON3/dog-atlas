import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import { createBreedSearchIndex, findExactBreed, normalizeBreedQuery, searchBreedIndex } from "./breed-search-index";

const options = breeds.map(({ slug, nameKo, nameEn, illustration }) => {
  const master = getMasterBreed(slug);
  return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
});
const index = createBreedSearchIndex(options);

describe("precomputed breed search index", () => {
  it("preserves exact results for every current Korean/English name and alias", () => {
    for (const breed of options) {
      for (const term of [breed.nameKo, breed.nameEn, ...breed.aliases]) {
        const query = normalizeBreedQuery(term);
        const original = options.find((item) => [item.nameKo, item.nameEn, ...item.aliases].some((name) => normalizeBreedQuery(name) === query));
        expect(findExactBreed(index, query)).toBe(original);
      }
    }
  });

  it("preserves exact/prefix/Korean ordering and partial-alias labels", () => {
    for (const input of ["스피츠", "웰시 코기", "불독", "mastiff", "Terrier", "잉글리시", "retriever", "한국", "없는 견종"]) {
      const query = normalizeBreedQuery(input);
      const original = options.map((breed) => {
        const terms = [breed.nameKo, breed.nameEn, ...breed.aliases].map(normalizeBreedQuery);
        return { ...breed, matchingAlias: breed.aliases.find((alias) => normalizeBreedQuery(alias).includes(query)), exact: terms.includes(query), startsWith: terms.some((term) => term.startsWith(query)), matches: terms.some((term) => term.includes(query)) };
      }).filter((breed) => breed.matches)
        .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.startsWith) - Number(a.startsWith) || a.nameKo.localeCompare(b.nameKo, "ko"))
        .slice(0, 6).map(({ slug, matchingAlias }) => ({ slug, matchingAlias }));
      expect(searchBreedIndex(index, query).map(({ slug, matchingAlias }) => ({ slug, matchingAlias }))).toEqual(original);
    }
  });

  it("ignores spaces, hyphens and case; leaves empty suggestions empty", () => {
    expect(normalizeBreedQuery("  Golden- RETRIEVER ")).toBe("goldenretriever");
    expect(searchBreedIndex(index, "")).toEqual([]);
    expect(findExactBreed(index, "not-a-breed")).toBeUndefined();
  });

  it("rebuilds terms from a replacement breed list without mutating input", () => {
    const replacement = [{ ...options[0], aliases: ["새로운별명"] }];
    const nextIndex = createBreedSearchIndex(replacement);
    expect(findExactBreed(nextIndex, "새로운별명")).toBe(replacement[0]);
    expect(replacement[0].aliases).toEqual(["새로운별명"]);
  });
});
