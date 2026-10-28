import { extraSmallCards } from "@/content/extra-small-cards";
import { mediumCards } from "@/content/medium-cards";
import { largeCards } from "@/content/large-cards";
import { giantCards, type GiantCard } from "@/content/giant-cards";
import { getBreed } from "@/content/breeds/data";
import { getBreedSizePresentation } from "./breed-size-presentation";
import { getBreedLifespanDisplay } from "./breed-fact-presentation";
import { getBreedCardVariety } from "./breed-card-variety";

export type HomeCardGroups = Record<
  "소형견" | "중형견" | "대형견" | "초대형견",
  GiantCard[]
>;

export function getHomeCardFacts(
  slug: string,
): NonNullable<GiantCard["facts"]> {
  const breed = getBreed(slug);
  if (!breed) throw new Error(`Missing breed for homepage card: ${slug}`);
  const size = getBreedSizePresentation(slug);
  const focus = getBreedCardVariety(slug);
  const variety = size.varieties?.find((item) => item.id === focus?.id);
  const values = variety ?? size;
  return {
    rows: [
      ...(values.height
        ? [{ label: "어깨까지 높이", value: values.height }]
        : []),
      ...(values.weight ? [{ label: "몸무게", value: values.weight }] : []),
      ...(variety?.otherMeasurement
        ? [{ label: "유형 구분 기준", value: variety.otherMeasurement }]
        : []),
    ],
    lifespan: getBreedLifespanDisplay(breed),
    note: size.status === "variable-parentage" ? size.displayLabel : undefined,
    variety: focus?.label,
  };
}

// Resolve on the server; the client receives only the 49 cards' display values.
export function getHomeCardGroups(): HomeCardGroups {
  const withFacts = (cards: GiantCard[]) =>
    cards.map((card) => ({ ...card, facts: getHomeCardFacts(card.slug) }));
  return {
    소형견: withFacts(extraSmallCards),
    중형견: withFacts(mediumCards),
    대형견: withFacts(largeCards),
    초대형견: withFacts(giantCards),
  };
}
