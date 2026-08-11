import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { breedNameStories } from "@/content/breed-name-stories";

describe("breed name stories", () => {
  it("keeps six distinct, source-backed name stories", () => {
    expect(breedNameStories).toHaveLength(6);
    expect(new Set(breedNameStories.map((story) => story.key)).size).toBe(6);
    expect(breedNameStories.every((story) => story.sources.every((source) => source.url.startsWith("https://")))).toBe(true);
  });

  it("links every example to an existing detailed breed", () => {
    const slugs = new Set(breeds.map((breed) => breed.slug));
    const exampleSlugs = breedNameStories.flatMap((story) => story.examples.map((example) => example.slug));

    expect(exampleSlugs.every((slug) => slugs.has(slug))).toBe(true);
  });
});
