import type { Breed } from "@/content/breeds/schema";

export type TendencyLevel = "low" | "medium" | "high" | "unknown";
export type BreedSize = "small" | "medium" | "large" | "giant";
export type TendencyFilterKey = "activity" | "mentalStimulation" | "socialConnection" | "independence" | "alerting" | "grooming";

export type BreedFilters = {
  size: BreedSize[];
} & Record<TendencyFilterKey, TendencyLevel[]>;

export const tendencyFilterKeys: TendencyFilterKey[] = [
  "activity",
  "mentalStimulation",
  "socialConnection",
  "independence",
  "alerting",
  "grooming",
];

export const emptyBreedFilters = (): BreedFilters => ({
  size: [],
  activity: [],
  mentalStimulation: [],
  socialConnection: [],
  independence: [],
  alerting: [],
  grooming: [],
});

const tendencyLabelMap: Record<string, TendencyLevel> = {
  "낮은 편": "low",
  중간: "medium",
  "높은 편": "high",
  "개체별 확인 필요": "unknown",
};

export function normalizeTendencyLabel(label: string): TendencyLevel {
  return tendencyLabelMap[label] ?? "unknown";
}

export function getBreedSizeCategory(size: string): BreedSize | undefined {
  const normalized = size.replace(/\s+/g, "");

  // These entries cover multiple registered varieties. Their discovery card
  // uses the named representative variety, so the filter follows that one
  // instead of placing a single catalog entry in several size groups.
  if (normalized.includes("대표이미지는미니어처")) return "small";
  if (normalized.includes("미니어처와스탠더드")) return "small";
  if (normalized.includes("초소형부터중형이상")) return "small";

  // Discovery size is intentionally exclusive. When editorial copy describes
  // a boundary or range, use its upper category so living-space and handling
  // demands are not understated.
  if (normalized.includes("초대형")) return "giant";
  if (normalized.includes("대형")) return "large";
  if (normalized.includes("중형") || normalized.includes("중소형") || normalized.includes("소중형")) return "medium";
  if (normalized.includes("초소형") || normalized.includes("소형") || normalized.includes("토이") || normalized.includes("미니어처")) return "small";
  return undefined;
}

export function getBreedFilterValue(breed: Breed, key: "size"): BreedSize | undefined;
export function getBreedFilterValue(breed: Breed, key: TendencyFilterKey): TendencyLevel;
export function getBreedFilterValue(breed: Breed, key: "size" | TendencyFilterKey): BreedSize | TendencyLevel | undefined {
  if (key === "size") return getBreedSizeCategory(breed.identity.size);
  return normalizeTendencyLabel(breed.tendencies[key].label);
}

export function filterBreeds(breeds: readonly Breed[], filters: BreedFilters): Breed[] {
  return breeds.filter((breed) => {
    const size = getBreedFilterValue(breed, "size");
    if (filters.size.length > 0 && (!size || !filters.size.includes(size))) return false;

    return tendencyFilterKeys.every((key) => {
      const selected = filters[key];
      return selected.length === 0 || selected.includes(getBreedFilterValue(breed, key));
    });
  });
}

const queryKeyByFilter: Record<"size" | TendencyFilterKey, string> = {
  size: "size",
  activity: "activity",
  mentalStimulation: "mental",
  socialConnection: "social",
  independence: "independence",
  alerting: "alerting",
  grooming: "grooming",
};

const filterKeyByQuery = Object.fromEntries(Object.entries(queryKeyByFilter).map(([key, query]) => [query, key])) as Record<string, "size" | TendencyFilterKey>;
const validSizes = new Set<BreedSize>(["small", "medium", "large", "giant"]);
const validLevels = new Set<TendencyLevel>(["low", "medium", "high"]);

export function parseBreedFilters(searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>): BreedFilters {
  const filters = emptyBreedFilters();
  const read = (query: string) => searchParams instanceof URLSearchParams ? searchParams.get(query) : searchParams[query];

  for (const [query, key] of Object.entries(filterKeyByQuery)) {
    const raw = read(query);
    const values = Array.isArray(raw) ? raw : raw?.split(",");
    if (!values) continue;
    if (key === "size") filters.size = [...new Set(values.filter((value): value is BreedSize => validSizes.has(value as BreedSize)))];
    else filters[key] = [...new Set(values.filter((value): value is TendencyLevel => validLevels.has(value as TendencyLevel)))];
  }
  return filters;
}

export function filtersToSearchParams(filters: BreedFilters): URLSearchParams {
  const params = new URLSearchParams();
  const entries: Array<["size" | TendencyFilterKey, string[]]> = [["size", filters.size], ...tendencyFilterKeys.map((key) => [key, filters[key]] as [TendencyFilterKey, string[]])];
  for (const [key, values] of entries) {
    if (values.length > 0) params.set(queryKeyByFilter[key], values.join(","));
  }
  return params;
}

export type BreedFilterPreset = { key: string; label: string; filters: Partial<BreedFilters> };

export const breedFilterPresets: BreedFilterPreset[] = [
  { key: "calm", label: "느긋한 활동", filters: { activity: ["low"] } },
  { key: "active", label: "많이 움직이기", filters: { activity: ["high"] } },
  { key: "social", label: "사람과 교감", filters: { socialConnection: ["high"] } },
  { key: "independent", label: "독립적인 성향", filters: { independence: ["high"] } },
  { key: "grooming-light", label: "털 관리 적게", filters: { grooming: ["low"] } },
  { key: "all", label: "아직 잘 모르겠어요", filters: {} },
];

export function applyBreedFilterPreset(preset: BreedFilterPreset): BreedFilters {
  const filters = emptyBreedFilters();
  for (const key of ["size", ...tendencyFilterKeys] as Array<"size" | TendencyFilterKey>) {
    const values = preset.filters[key];
    if (values) filters[key] = [...values] as never;
  }
  return filters;
}
