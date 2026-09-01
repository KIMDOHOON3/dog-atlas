import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { emptyBreedFilters, filterBreeds } from "./breed-filters";
import { toDiscoverBreed } from "./discover-breeds";

describe("discover breed DTO", () => {
  it("keeps only the fields used by discovery cards and filters", () => {
    const source = breeds[0];
    const result = toDiscoverBreed(source);

    expect(Object.keys(result)).toEqual(["slug", "nameKo", "nameEn", "tagline", "sizeClasses", "sizeDisplay", "identity", "tendencies"]);
    expect(Object.keys(result.identity)).toEqual(["origin"]);
    expect(Object.values(result.tendencies).every((tendency) => Object.keys(tendency).join() === "label")).toBe(true);
    expect(result).not.toHaveProperty("story");
    expect(result).not.toHaveProperty("sources");
    expect(result).not.toHaveProperty("careNotes");
  });

  it("preserves filtering results after projection", () => {
    const filters = emptyBreedFilters();
    filters.size = ["medium"];
    filters.activity = ["high"];
    const projected = breeds.map((breed) => toDiscoverBreed(breed));

    expect(filterBreeds(projected, filters).every((breed) => breed.sizeClasses.includes("medium"))).toBe(true);
  });
});
