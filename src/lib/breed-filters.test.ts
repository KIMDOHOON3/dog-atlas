import { describe, expect, it } from "vitest";
import { breeds } from "@/content/breeds/data";
import {
  emptyBreedFilters,
  filterBreeds,
  filtersToSearchParams,
  getBreedSizeCategories,
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

  it("maps known size phrases and leaves unknown phrases empty", () => {
    expect(getBreedSizeCategories("초소형")).toEqual(["small"]);
    expect(getBreedSizeCategories("소형~중소형")).toEqual(["small", "medium"]);
    expect(getBreedSizeCategories("중대형")).toEqual(["medium", "large"]);
    expect(getBreedSizeCategories("초대형 · 약 65~80cm")).toEqual(["giant"]);
    expect(getBreedSizeCategories("미니어처와 스탠더드, 세 가지 피모 유형")).toEqual([]);
    expect(getBreedSizeCategories("크기 정보 확인 중")).toEqual([]);
  });
});

describe("breed filters", () => {
  it("uses OR within a category and AND across categories", () => {
    const filters = emptyBreedFilters();
    filters.size = ["small", "medium"];
    filters.activity = ["high"];
    const result = filterBreeds(breeds, filters);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((breed) => getBreedSizeCategories(breed.identity.size).some((size) => filters.size.includes(size)))).toBe(true);
  });

  it("round-trips comma-separated URL values", () => {
    const filters = emptyBreedFilters();
    filters.size = ["small", "medium"];
    filters.socialConnection = ["high"];
    const parsed = parseBreedFilters(filtersToSearchParams(filters));
    expect(parsed).toEqual(filters);
  });
});
