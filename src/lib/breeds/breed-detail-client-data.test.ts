import { describe, expect, it } from "vitest";
import { getAllAuthoredStandardBreedDetails } from "@/content/standard-breed-detail/data";
import { toRealityClientData, toStoryClientData } from "./breed-detail-client-data";

describe("detail client boundary projections", () => {
  it("sends only interaction fields, retaining every authored story and visual", () => {
    for (const detail of getAllAuthoredStandardBreedDetails()) {
      const story = toStoryClientData(detail);
      const reality = toRealityClientData(detail);
      expect(Object.keys(story).sort()).toEqual(["nameKo", "slug", "story"]);
      expect(Object.keys(story.story)).toEqual(["steps"]);
      expect(Object.keys(reality).sort()).toEqual(["nameKo", "realities", "sizeVarieties"]);
      expect(story.story.steps).toBe(detail.story.steps);
      expect(reality.realities).toBe(detail.realities);
      expect(reality.sizeVarieties).toBe(detail.sizeVarieties);
    }
  });
});
