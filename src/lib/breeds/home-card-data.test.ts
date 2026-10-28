import { expect, it } from "vitest";
import { getHomeCardFacts, getHomeCardGroups } from "./home-card-data";
import { getBreedSizePresentation } from "./breed-size-presentation";
import { getBreedCardVariety } from "./breed-card-variety";
import { getBreedSearchOptions } from "./breed-search-options";
import { getBreedCardImage } from "./breed-image-assets";

it("serves all 49 cards from the same measurement data as breed details", () => {
  const cards = Object.values(getHomeCardGroups()).flat();
  expect(cards).toHaveLength(49);
  for (const card of cards) {
    const size = getBreedSizePresentation(card.slug);
    const focus = getBreedCardVariety(card.slug);
    const primary = size.varieties?.find((item) => item.id === focus?.id);
    const values = primary ?? size;
    const rows = card.facts!.rows.map((row) => row.value);
    expect(rows).toEqual(
      [values.height, values.weight, primary?.otherMeasurement].filter(Boolean),
    );
  }
  expect(getHomeCardFacts("chihuahua").rows.map((row) => row.value)).toEqual([
    "13~20cm",
    "2.7kg 이하",
  ]);
});

it("keeps subtype measurements distinct and does not invent absent weight or lifespan", () => {
  expect(getHomeCardFacts("poodle").rows).toEqual([
    { label: "어깨까지 높이", value: "23~28cm" },
  ]);
  expect(getHomeCardFacts("german-spitz").rows.map((row) => row.value)).toEqual(
    ["18~24cm", "1.4~3.2kg"],
  );
  expect(getHomeCardFacts("dachshund").rows).toEqual([
    { label: "유형 구분 기준", value: "가슴둘레 30~37cm" },
  ]);
  expect(getHomeCardFacts("maltipoo").lifespan).toBeUndefined();
  expect(getHomeCardFacts("maltipoo").rows).toEqual([]);
});

it("offers all 376 breeds with consistent search thumbnails and catalog aliases", () => {
  const options = getBreedSearchOptions();
  expect(options).toHaveLength(376);
  expect(new Set(options.map((option) => option.slug)).size).toBe(376);
  for (const option of options)
    expect(option.imageSrc).toBe(getBreedCardImage(option.slug));
  expect(
    options.find((option) => option.slug === "chihuahua")?.imageSrc,
  ).toContain("card-studies/");
  expect(
    options.find((option) => option.slug === "ariegeois")?.imageSrc,
  ).toContain("/v2/");
});
