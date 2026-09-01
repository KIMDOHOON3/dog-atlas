import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import { toDiscoverBreed } from "@/lib/discover-breeds";
import {
  emptyBreedFilters,
  applyBreedFilterPreset,
  breedFilterPresets,
  filterBreeds,
  filtersToSearchParams,
  getBreedSizeClasses,
  normalizeTendencyLabel,
  parseBreedFilters,
} from "./breed-filters";

describe("breed filter normalization", () => {
  const projected = breeds.map((breed) => toDiscoverBreed(breed));
  it("normalizes tendency labels without changing source content", () => {
    expect(normalizeTendencyLabel("낮은 편")).toBe("low");
    expect(normalizeTendencyLabel("중간")).toBe("medium");
    expect(normalizeTendencyLabel("높은 편")).toBe("high");
    expect(normalizeTendencyLabel("개체별 확인 필요")).toBe("unknown");
  });

  it("uses normalized profile classes instead of editorial size strings", () => {
    expect(getBreedSizeClasses(projected.find((breed) => breed.slug === "samoyed")!)).toEqual(["medium"]);
    expect(getBreedSizeClasses(projected.find((breed) => breed.slug === "shiba")!)).toEqual(["small"]);
    expect(getBreedSizeClasses(projected.find((breed) => breed.slug === "kangal-shepherd-dog")!)).toEqual(["giant"]);
    expect(getBreedSizeClasses(projected.find((breed) => breed.slug === "bulgae")!)).toEqual([]);
  });
});

describe("breed filters", () => {
  const projected = breeds.map((breed) => toDiscoverBreed(breed));
  it("keeps the home and discover quick exploration options in one six-item set", () => {
    expect(breedFilterPresets.map((preset) => preset.label)).toEqual([
      "느긋한 활동",
      "많이 움직이기",
      "사람과 교감",
      "독립적인 성향",
      "털 관리 적게",
      "아직 잘 모르겠어요",
    ]);
    expect(filtersToSearchParams(applyBreedFilterPreset(breedFilterPresets[0])).toString()).toBe("activity=low");
    expect(filtersToSearchParams(applyBreedFilterPreset(breedFilterPresets[5])).toString()).toBe("");
  });

  it("uses OR within a category and AND across categories", () => {
    const filters = emptyBreedFilters();
    filters.size = ["small", "medium"];
    filters.activity = ["high"];
    const result = filterBreeds(projected, filters);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((breed) => filters.size.some((size) => getBreedSizeClasses(breed).includes(size)))).toBe(true);
  });

  it("round-trips comma-separated URL values", () => {
    const filters = emptyBreedFilters();
    filters.size = ["small", "medium"];
    filters.socialConnection = ["high"];
    const parsed = parseBreedFilters(filtersToSearchParams(filters));
    expect(parsed).toEqual(filters);
  });

  it("supports the extra-small URL value without changing existing values", () => {
    expect(parseBreedFilters(new URLSearchParams("size=extra-small,small"))).toMatchObject({ size: ["extra-small", "small"] });
    expect(parseBreedFilters(new URLSearchParams("size=small"))).toMatchObject({ size: ["small"] });
  });
});
