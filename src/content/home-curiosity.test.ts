import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { getHomeCuriosityBreeds, getHomeCuriosityTheme, homeCuriosityThemes } from "./home-curiosity";
import { getBreedSizePresentation } from "@/lib/breed-size-presentation";

describe("home curiosity themes", () => {
  it("defines six unique themes and resolves every collection from the catalog", () => {
    expect(homeCuriosityThemes).toHaveLength(6);
    expect(new Set(homeCuriosityThemes.map((theme) => theme.key)).size).toBe(6);

    for (const theme of homeCuriosityThemes) {
      const resolved = getHomeCuriosityBreeds(theme, breeds);
      expect(resolved.length).toBeGreaterThanOrEqual(6);
      if (theme.key !== "westminster-stories") {
        expect(new Set(resolved.map(({ breed }) => breed.slug)).size).toBe(resolved.length);
      }
      expect(resolved.some(({ breed }) => breed.slug === theme.thumbnailSlug)).toBe(true);
    }
  });

  it("resolves every curated slug to a published breed", () => {
    for (const theme of homeCuriosityThemes) {
      const resolved = getHomeCuriosityBreeds(theme, breeds);
      expect(resolved.length).toBe(theme.catalogRule ? resolved.length : theme.items.length);
    }
  });

  it("includes every matching large and small catalog entry", () => {
    const largeTheme = getHomeCuriosityTheme("giant-build")!;
    const smallTheme = getHomeCuriosityTheme("small-build")!;
    const largeSlugs = new Set(getHomeCuriosityBreeds(largeTheme, breeds).map(({ breed }) => breed.slug));
    const smallSlugs = new Set(getHomeCuriosityBreeds(smallTheme, breeds).map(({ breed }) => breed.slug));

    for (const breed of breeds) {
      const sizes = getBreedSizePresentation(breed.slug).filterClasses;
      if (sizes.includes("large") || sizes.includes("giant")) expect(largeSlugs.has(breed.slug)).toBe(true);
      if (sizes.includes("extra-small") || sizes.includes("small") || breed.catalog.group === "companion") {
        expect(smallSlugs.has(breed.slug)).toBe(true);
      }
    }
  });

  it("keeps source and selection context attached to every theme", () => {
    for (const theme of homeCuriosityThemes) {
      expect(theme.selectionNote.length).toBeGreaterThan(20);
      expect(theme.sources.length).toBeGreaterThan(0);
      expect(theme.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
  });

  it("returns undefined for an unknown theme key", () => {
    expect(getHomeCuriosityTheme("unknown-theme")).toBeUndefined();
  });
});
