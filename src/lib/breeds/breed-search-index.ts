export type BreedSearchOption = {
  slug: string;
  nameKo: string;
  nameEn: string;
  imageSrc: string;
  aliases?: string[];
};

export function normalizeBreedQuery(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[\s-]/g, "");
}

export function createBreedSearchIndex(breeds: BreedSearchOption[]) {
  return breeds.map((breed) => ({
    breed,
    terms: [breed.nameKo, breed.nameEn, ...(breed.aliases ?? [])].map(normalizeBreedQuery),
    aliases: (breed.aliases ?? []).map((label) => ({ label, normalized: normalizeBreedQuery(label) })),
  }));
}

type BreedSearchIndex = ReturnType<typeof createBreedSearchIndex>;

export function searchBreedIndex(index: BreedSearchIndex, normalizedQuery: string) {
  if (!normalizedQuery) return [];
  return index
    .filter(({ terms }) => terms.some((term) => term.includes(normalizedQuery)))
    .map(({ breed, terms, aliases }) => ({
      ...breed,
      matchingAlias: aliases.find((alias) => alias.normalized.includes(normalizedQuery))?.label,
      exact: terms.includes(normalizedQuery),
      startsWith: terms.some((term) => term.startsWith(normalizedQuery)),
    }))
    .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.startsWith) - Number(a.startsWith) || a.nameKo.localeCompare(b.nameKo, "ko"))
    .slice(0, 6);
}

export function findExactBreed(index: BreedSearchIndex, normalizedQuery: string) {
  return index.find(({ terms }) => terms.includes(normalizedQuery))?.breed;
}
