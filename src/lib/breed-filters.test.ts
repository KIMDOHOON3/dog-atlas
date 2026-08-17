import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import {
  emptyBreedFilters,
  applyBreedFilterPreset,
  breedFilterPresets,
  filterBreeds,
  filtersToSearchParams,
  getBreedSizeCategory,
  normalizeTendencyLabel,
  parseBreedFilters,
} from "./breed-filters";

describe("breed filter normalization", () => {
  it("normalizes tendency labels without changing source content", () => {
    expect(normalizeTendencyLabel("낮은 편")).toBe("low");
    expect(normalizeTendencyLabel("중간")).toBe("medium");
    expect(normalizeTendencyLabel("높은 편")).toBe("high");
    expect(normalizeTendencyLabel("개체별 확인 필요")).toBe("unknown");
  });

  it("maps every known size phrase to one exclusive discovery category", () => {
    expect(getBreedSizeCategory("초소형")).toBe("small");
    expect(getBreedSizeCategory("소형~중소형")).toBe("medium");
    expect(getBreedSizeCategory("중대형")).toBe("large");
    expect(getBreedSizeCategory("중형~대형")).toBe("large");
    expect(getBreedSizeCategory("대형~초대형 · 약 65~80cm")).toBe("giant");
    expect(getBreedSizeCategory("미니어처와 스탠더드, 세 가지 피모 유형")).toBe("small");
    expect(getBreedSizeCategory("크기 정보 확인 중")).toBeUndefined();
  });

  it("assigns every published breed to exactly one size category", () => {
    const categories = breeds.map((breed) => getBreedSizeCategory(breed.identity.size));
    expect(categories).not.toContain(undefined);
    expect(getBreedSizeCategory(breeds.find((breed) => breed.slug === "samoyed")!.identity.size)).toBe("large");
  });
});

describe("breed filters", () => {
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
    const result = filterBreeds(breeds, filters);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((breed) => filters.size.includes(getBreedSizeCategory(breed.identity.size)!))).toBe(true);
  });

  it("round-trips comma-separated URL values", () => {
    const filters = emptyBreedFilters();
    filters.size = ["small", "medium"];
    filters.socialConnection = ["high"];
    const parsed = parseBreedFilters(filtersToSearchParams(filters));
    expect(parsed).toEqual(filters);
  });
});
