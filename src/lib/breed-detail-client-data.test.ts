import { describe, expect, it } from "vitest";
import { getAllAuthoredStandardBreedDetails } from "@/content/standard-breed-detail/data";
import { toReadinessClientData, toRealityClientData, toStoryClientData } from "./breed-detail-client-data";

describe("detail client boundary projections", () => {
  it("sends only interaction fields, retaining every authored story, question and visual", () => {
    for (const detail of getAllAuthoredStandardBreedDetails()) {
      const story = toStoryClientData(detail);
      const readiness = toReadinessClientData(detail);
      const reality = toRealityClientData(detail);
      expect(Object.keys(story).sort()).toEqual(["nameKo", "slug", "story"]);
      expect(Object.keys(story.story)).toEqual(["steps"]);
      expect(Object.keys(readiness).sort()).toEqual(["nameKo", "readinessQuestions", "slug"]);
      expect(Object.keys(reality).sort()).toEqual(["nameKo", "realities", "sizeVarieties"]);
      expect(story.story.steps).toBe(detail.story.steps);
      expect(readiness.readinessQuestions).toBe(detail.readinessQuestions);
      expect(reality.realities).toBe(detail.realities);
      expect(reality.sizeVarieties).toBe(detail.sizeVarieties);
    }
  });
});
