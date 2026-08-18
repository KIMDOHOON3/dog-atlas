import { describe, expect, it } from "vitest";
import { breeds, getBreed } from "@/content/breeds/data";
import {
  getBreedDayIcons,
  getBreedLifePoints,
  getBreedLifePresentation,
  lifestyleIconIds,
  scoreLifestyleConcept,
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

      const visibleCopy = [
        ...presentation.lifePoints.flatMap((point) => [point.title, point.description]),
        ...presentation.dayPoints.flatMap((point) => [point.title, point.description]),
        breed.story.opening,
        breed.story.roleToHome,
        ...Object.values(breed.tendencies).map((tendency) => tendency.note),
      ].map((copy) => copy.replace(/[^\p{L}\p{N}]/gu, "").toLocaleLowerCase("ko-KR"));
      expect(new Set(visibleCopy).size, breed.slug).toBe(visibleCopy.length);

      [...presentation.lifePoints, ...presentation.dayPoints].forEach((point) => {
        const assignedScore = scoreLifestyleConcept(point.title, point.icon) * 4
          + scoreLifestyleConcept(point.description, point.icon);
        const scores = lifestyleIconIds.map((icon) => ({
          icon,
          score: scoreLifestyleConcept(point.title, icon) * 4
            + scoreLifestyleConcept(point.description, icon),
        }));
        const bestScore = Math.max(...scores.map(({ score }) => score));
        const semanticFamily = (icon: (typeof lifestyleIconIds)[number]) => (
          icon === "sofa-rest" ? "rest" : icon
        );
        const hasMatchingBestConcept = scores.some(({ icon, score }) => (
          score === bestScore && semanticFamily(icon) === semanticFamily(point.icon)
        ));
        expect(hasMatchingBestConcept || assignedScore === bestScore, `${breed.slug}: ${point.title}`).toBe(true);
      });
    }
  });

  it("keeps Japanese Spitz grooming and alone-time copy under matching card titles", () => {
    const points = getBreedLifePoints(getBreed("japanese-spitz")!);

    expect(points).toEqual(expect.arrayContaining([
      expect.objectContaining({
        icon: "grooming",
        title: "피모 관리 시간을 생활에 넣기",
        description: "이중모를 짧게 미는 방식보다 정기적인 빗질과 피부 상태 확인이 우선입니다.",
      }),
      expect.objectContaining({
        icon: "rest",
        title: "편안히 쉬는 연습 만들기",
        description: expect.stringContaining("혼자 쉬기"),
      }),
    ]));
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

  it("keeps greyhound daily cards distinct from its priority cards", () => {
    const presentation = getBreedLifePresentation(getBreed("greyhound")!);

    expect(presentation.lifePoints.map((point) => point.icon)).toEqual(["safety", "climate", "rest"]);
    expect(presentation.dayIcons).toHaveLength(3);
    expect(new Set([
      ...presentation.lifePoints.map((point) => point.icon),
      ...presentation.dayIcons,
    ]).size).toBe(6);
  });
});
