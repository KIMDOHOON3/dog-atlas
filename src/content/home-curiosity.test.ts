import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { getHomeCuriosityBreeds, getHomeCuriosityTheme, homeCuriosityThemes } from "./home-curiosity";

describe("home curiosity themes", () => {
  it("defines six unique themes with six unique breeds each", () => {
    expect(homeCuriosityThemes).toHaveLength(6);
    expect(new Set(homeCuriosityThemes.map((theme) => theme.key)).size).toBe(6);

    for (const theme of homeCuriosityThemes) {
      expect(theme.items).toHaveLength(6);
      expect(new Set(theme.items.map((item) => item.slug)).size).toBe(6);
      expect(theme.items.some((item) => item.slug === theme.thumbnailSlug)).toBe(true);
    }
  });

  it("resolves every curated slug to a published breed", () => {
    for (const theme of homeCuriosityThemes) {
      expect(getHomeCuriosityBreeds(theme, breeds)).toHaveLength(theme.items.length);
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
