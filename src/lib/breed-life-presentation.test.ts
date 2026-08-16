import { describe, expect, it } from "vitest";
import { breeds, getBreed } from "@/content/breeds/data";
import {
  getBreedDayIcons,
  getBreedLifePoints,
  getBreedLifePresentation,
  lifestyleIconIds,
} from "./breed-life-presentation";

describe("breed life presentation", () => {
  it("creates three breed-aware life points for every catalog entry", () => {
    for (const breed of breeds) {
      const points = getBreedLifePoints(breed);
      expect(points, breed.slug).toHaveLength(3);
      expect(new Set(points.map((point) => point.icon)).size, breed.slug).toBe(3);
      points.forEach((point) => {
        expect(lifestyleIconIds).toContain(point.icon);
        expect(point.label.length).toBeGreaterThan(0);
        expect(point.description.length).toBeGreaterThan(9);
      });
    }
  });

  it("maps each daily snapshot to a registered icon", () => {
    for (const breed of breeds) {
      const icons = getBreedDayIcons(breed);
      expect(icons, breed.slug).toHaveLength(breed.daySnapshot.length);
      icons.forEach((icon) => expect(lifestyleIconIds).toContain(icon));
    }
  });

  it("uses six distinct and semantically assigned icons on every detail page", () => {
    for (const breed of breeds) {
      const presentation = getBreedLifePresentation(breed);
      const icons = [
        ...presentation.lifePoints.map((point) => point.icon),
        ...presentation.dayIcons,
      ];

      expect(icons, breed.slug).toHaveLength(6);
      expect(new Set(icons).size, breed.slug).toBe(6);
      expect(icons, breed.slug).not.toContain("health-check");
    }
  });

  it("uses every normalized concept across the full catalog", () => {
    const usedIcons = new Set(breeds.flatMap((breed) => [
      ...getBreedLifePoints(breed).map((point) => point.icon),
      ...getBreedDayIcons(breed),
    ]));

    expect(usedIcons).toEqual(new Set(lifestyleIconIds));
  });

  it("keeps representative breeds meaningfully distinct", () => {
    expect(getBreedLifePoints(getBreed("maltese")!).map((point) => point.icon)).toEqual(["safety", "rest", "grooming"]);
    expect(getBreedLifePoints(getBreed("border-collie")!).map((point) => point.icon)).toContain("enrichment");
    expect(getBreedLifePoints(getBreed("greyhound")!).map((point) => point.icon)).toContain("climate");
    expect(getBreedLifePoints(getBreed("samoyed")!).map((point) => point.icon)).toEqual(expect.arrayContaining(["climate", "grooming"]));
  });

  it("matches greyhound daily copy without repeating its life-card icons", () => {
    const presentation = getBreedLifePresentation(getBreed("greyhound")!);

    expect(presentation.lifePoints.map((point) => point.icon)).toEqual(["safety", "climate", "rest"]);
    expect(presentation.dayIcons).toEqual(["walk", "sofa-rest", "enrichment"]);
    expect(presentation.dayPoints[2].title).toBe("머리를 쓰는 활동 마련하기");
  });
});
