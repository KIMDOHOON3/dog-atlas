import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { familiarKoreaBreeds } from "./familiar-korea-breeds";

describe("Korea-familiar breed starting set", () => {
  it("keeps a focused 32-breed set with 12 first choices", () => {
    expect(familiarKoreaBreeds).toHaveLength(32);
    expect(familiarKoreaBreeds.filter((entry) => entry.priority === "first")).toHaveLength(12);
  });

  it("uses unique slugs that exist in the published catalog", () => {
    const slugs = familiarKoreaBreeds.map((entry) => entry.slug);
    const catalogSlugs = new Set(breeds.map((breed) => breed.slug));

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.filter((slug) => !catalogSlugs.has(slug))).toEqual([]);
  });
});
