import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { getStandardBreedDetail } from "@/content/standard-breed-detail/data";
import { emptyBreedFilters, filterBreeds } from "./breed-filters";
import { filterCoreEditorialReviewBreeds, toDiscoverBreed } from "./discover-breeds";

describe("discover breed DTO", () => {
  it("keeps only the fields used by discovery cards and filters", () => {
    const source = breeds[0];
    const result = toDiscoverBreed(source);

    expect(Object.keys(result)).toEqual(["slug", "nameKo", "nameEn", "tagline", "isCoreEditorialReviewComplete", "identity", "tendencies"]);
    expect(Object.keys(result.identity)).toEqual(["origin", "size"]);
    expect(Object.values(result.tendencies).every((tendency) => Object.keys(tendency).join() === "label")).toBe(true);
    expect(result).not.toHaveProperty("story");
    expect(result).not.toHaveProperty("sources");
    expect(result).not.toHaveProperty("careNotes");
  });

  it("marks every detail that completed the production gate", () => {
    const projected = breeds.map((breed) => toDiscoverBreed(breed, breed.slug === "poodle" || Boolean(getStandardBreedDetail(breed.slug))));
    const reviewed = filterCoreEditorialReviewBreeds(projected, true);

    expect(reviewed).toHaveLength(194);
    expect(reviewed.some((breed) => breed.slug === "poodle")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "american-cocker-spaniel")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "mongolian-bankhar")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "kooikerhondje")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "puli")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "tibetan-spaniel")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "dogo-argentino")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "miniature-bull-terrier")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "canaan-dog")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "english-pointer")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "bergamasco-shepherd")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "sealyham-terrier")).toBe(true);
    expect(reviewed.some((breed) => breed.slug === "grand-basset-griffon-vendeen")).toBe(true);
    expect(filterCoreEditorialReviewBreeds(projected, false)).toHaveLength(376);
  });

  it("preserves filtering results after projection", () => {
    const filters = emptyBreedFilters();
    filters.size = ["medium"];
    filters.activity = ["high"];
    const projected = breeds.map((breed) => toDiscoverBreed(breed));

    expect(filterBreeds(projected, filters).map((breed) => breed.slug)).toEqual(
      filterBreeds(breeds, filters).map((breed) => breed.slug),
    );
  });
});
