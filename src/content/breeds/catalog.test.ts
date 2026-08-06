import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { catalogGoal, catalogGroups, getCatalogProgress } from "./catalog";

describe("breed catalog", () => {
  it("groups every published breed exactly once", () => {
    const groupedSlugs = catalogGroups.flatMap((group) => group.breeds.map((breed) => breed.slug));
    expect(groupedSlugs).toHaveLength(breeds.length);
    expect(new Set(groupedSlugs).size).toBe(breeds.length);
  });

  it("keeps the expansion target separate from published content", () => {
    expect(getCatalogProgress()).toEqual({ published: 300, target: catalogGoal, remaining: 0 });
  });
});
