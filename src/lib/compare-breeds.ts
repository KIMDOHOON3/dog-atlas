import { breeds, getBreed } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";

export const DEFAULT_COMPARISON_SLUGS = ["japanese-spitz", "samoyed"] as const;

export type ComparisonSelection = {
  breeds: Breed[];
  usedFallback: boolean;
};

function defaultPair() {
  return DEFAULT_COMPARISON_SLUGS.map((slug) => getBreed(slug)!);
}

export function resolveComparisonSelection(raw: string | string[] | undefined): ComparisonSelection {
  if (raw === undefined || raw === "") return { breeds: [], usedFallback: false };

  const requested = (Array.isArray(raw) ? raw : raw.split(","))
    .map((slug) => slug.trim())
    .filter(Boolean);
  const unique = [...new Set(requested)];
  const valid = unique.flatMap((slug) => {
    const breed = getBreed(slug);
    return breed ? [breed] : [];
  });
  const containedInvalidValue = requested.some((slug) => !breeds.some((breed) => breed.slug === slug));

  if (containedInvalidValue || unique.length > 3) {
    return { breeds: defaultPair(), usedFallback: true };
  }

  return { breeds: valid, usedFallback: false };
}
