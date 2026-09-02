import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes, getHomeCuriosityBreeds } from "@/content/home-curiosity";
import { toCuriosityBreedCard } from "./curiosity-breed-data";

describe("curiosity card payload", () => {
  it("preserves every theme's order, links, copy and names but excludes unused content", () => {
    for (const theme of homeCuriosityThemes) {
      const original = getHomeCuriosityBreeds(theme, breeds);
      const cards = original.map(toCuriosityBreedCard);
      expect(cards.map(({ breed }) => breed.slug)).toEqual(original.map(({ breed }) => breed.slug));
      for (const [index, card] of cards.entries()) {
        expect(card).toEqual({ breed: { slug: original[index].breed.slug, nameKo: original[index].breed.nameKo, nameEn: original[index].breed.nameEn, identity: { origin: original[index].breed.identity.origin } }, fact: original[index].fact });
      }
      expect(JSON.stringify(cards).length).toBeLessThan(JSON.stringify(original).length / 10);
    }
  });
});
