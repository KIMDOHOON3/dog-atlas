import { existsSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { extraSmallCards } from "@/content/extra-small-cards";
import { mediumCards } from "@/content/medium-cards";
import { largeCards } from "@/content/large-cards";
import { giantCards } from "@/content/giant-cards";
import { getBreedCardImage } from "@/lib/breeds/breed-image-assets";
import { BreedVisual } from "./breed-visual";

function imageSource(image: HTMLElement) {
  const url = new URL(image.getAttribute("src")!, "http://localhost");
  return url.searchParams.get("url") ?? url.pathname;
}

it("uses the actual homepage card front and description in discovery and detail for all 49 cards", () => {
  const cards = [
    ...extraSmallCards,
    ...mediumCards,
    ...largeCards,
    ...giantCards,
  ];
  expect(cards).toHaveLength(49);
  expect(new Set(cards.map((card) => card.slug)).size).toBe(49);
  for (const card of cards) {
    expect(existsSync(join(process.cwd(), "public", card.front.src))).toBe(
      true,
    );
    expect(getBreedCardImage(card.slug)).toBe(card.front.src);
    for (const variant of ["tile", "detail"] as const) {
      const view = render(
        <BreedVisual
          breed={{ slug: card.slug, nameKo: card.name }}
          variant={variant}
        />,
      );
      const image = view.getByRole("img", { name: card.front.alt });
      expect(imageSource(image)).toBe(card.front.src);
      view.unmount();
    }
  }
});

it("preserves the existing artwork for breeds without a homepage card and for history scenes", () => {
  expect(getBreedCardImage("ariegeois")).toBe(
    "/illustrations/v2/ariegeois-card.webp",
  );
  const breed = {
    slug: "chihuahua",
    nameKo: "치와와",
    historyVisual: {
      src: "/illustrations/v2/chihuahua-history.webp",
      alt: "치와와 역사 장면",
    },
  };
  const view = render(<BreedVisual breed={breed} variant="history" />);
  expect(imageSource(view.getByRole("img", { name: "치와와 역사 장면" }))).toBe(breed.historyVisual.src);
});
