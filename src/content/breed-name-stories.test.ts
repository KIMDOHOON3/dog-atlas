import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { breedNameStories, getBreedNameStoryBreeds } from "@/content/breed-name-stories";

describe("breed name stories", () => {
  it("keeps six distinct, source-backed name stories", () => {
    expect(breedNameStories).toHaveLength(6);
    expect(new Set(breedNameStories.map((story) => story.key)).size).toBe(6);
    expect(breedNameStories.every((story) => story.sources.every((source) => source.url.startsWith("https://")))).toBe(true);
  });

  it("shows four existing representative breeds for every story", () => {
    const slugs = new Set(breeds.map((breed) => breed.slug));
    const exampleSlugs = breedNameStories.flatMap((story) => story.examples.map((example) => example.slug));

    expect(breedNameStories.every((story) => story.examples.length === 4)).toBe(true);
    expect(exampleSlugs.every((slug) => slugs.has(slug))).toBe(true);
  });

  it("builds every full collection from existing breed fields", () => {
    for (const story of breedNameStories) {
      const matchedSlugs = new Set(getBreedNameStoryBreeds(story.key, breeds).map((breed) => breed.slug));

      expect(matchedSlugs.size).toBeGreaterThanOrEqual(4);
      expect(story.examples.every((example) => matchedSlugs.has(example.slug))).toBe(true);
    }
  });
});
