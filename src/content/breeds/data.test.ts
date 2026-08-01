import { describe, expect, it } from "vitest";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "./data";

describe("breed content", () => {
  it("loads exactly five schema-validated MVP breeds", () => {
    expect(breeds).toHaveLength(5);
    expect(breeds.every((breed) => breed.contentStatus === "mvp-editorial-draft")).toBe(true);
  });

  it("resolves every related breed", () => {
    for (const breed of breeds) {
      expect(getRelatedBreeds(breed)).toHaveLength(breed.related.length);
    }
  });

  it("provides a dedicated history illustration for every breed", () => {
    for (const breed of breeds) {
      expect(breed.historyVisual?.src).toBe(`/illustrations/v3/${breed.slug}-history.webp`);
      expect(breed.historyVisual?.alt).toContain("편집 삽화");
    }
  });

  it("provides role-to-present behavior context without individual guarantees", () => {
    for (const breed of breeds) {
      expect(breed.behaviorClues.originalRole.length).toBeGreaterThan(20);
      expect(breed.behaviorClues.today.length).toBeGreaterThan(20);
      expect(breed.behaviorClues.guardianContext.length).toBeGreaterThan(20);
    }
    expect(behaviorContextSources).toHaveLength(4);
  });

  it("finds the Japanese Spitz detail entry", () => {
    expect(getBreed("japanese-spitz")?.nameKo).toBe("재패니즈 스피츠");
  });
});
