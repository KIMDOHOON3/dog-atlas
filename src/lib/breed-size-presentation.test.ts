import { describe, expect, it } from "vitest";
import { breedSizeAudit } from "@/content/breed-sizes/data";
import { breeds } from "@/content/breeds/data";
import { emptyBreedFilters, filterBreeds } from "@/lib/breed-filters";
import { toDiscoverBreed } from "@/lib/discover-breeds";
import { getBreedSizePresentation } from "@/lib/breed-size-presentation";

describe("breed size service presentation", () => {
  const discoverBreeds = breeds.map((breed) => toDiscoverBreed(breed));
  it("accounts for all 376 profiles including parentage and missing states", () => {
    expect(breedSizeAudit.total).toBe(376);
    expect(breedSizeAudit.statusCounts).toEqual({
      confirmed: 312,
      provisional: 53,
      varieties: 8,
      "variable-parentage": 2,
      conflict: 0,
      missing: 1,
    });
  });

  it.each([
    ["kangal-shepherd-dog", "giant"],
    ["greyhound", "large"],
    ["black-russian-terrier", "giant"],
    ["polish-greyhound", "large"],
    ["rafeiro-do-alentejo", "giant"],
    ["maremma-sheepdog", "giant"],
    ["macedonian-shepherd-dog-karaman", "giant"],
    ["saluki", "large"],
    ["bernese-mountain-dog", "large"],
    ["rottweiler", "large"],
    ["cane-corso", "large"],
    ["newfoundland", "giant"],
    ["welsh-corgi-cardigan", "medium"],
    ["bulldog", "medium"],
  ] as const)("uses the normalized regression class for %s", (slug, expected) => {
    expect(getBreedSizePresentation(slug).filterClasses).toEqual([expected]);
  });

  it("does not force the lower-bound-only Scottish Deerhound profile into a filter", () => {
    expect(getBreedSizePresentation("scottish-deerhound")).toMatchObject({ status: "provisional", filterClasses: [] });
  });

  it("keeps incomplete, variable-parentage, and missing profiles out of fixed filters", () => {
    expect(getBreedSizePresentation("goldendoodle")).toMatchObject({ status: "variable-parentage", filterClasses: [] });
    expect(getBreedSizePresentation("maltipoo")).toMatchObject({ status: "variable-parentage", filterClasses: [] });
    expect(getBreedSizePresentation("bulgae")).toEqual({ status: "missing", filterClasses: [] });
    expect(getBreedSizePresentation("poodle")).toMatchObject({ status: "varieties", filterClasses: [] });
    expect(getBreedSizePresentation("dachshund")).toMatchObject({ status: "varieties", filterClasses: [] });

    expect(filterBreeds(discoverBreeds, emptyBreedFilters())).toHaveLength(376);
    const everySize = emptyBreedFilters();
    everySize.size = ["extra-small", "small", "medium", "large", "giant"];
    const filteredSlugs = new Set(filterBreeds(discoverBreeds, everySize).map((breed) => breed.slug));
    for (const breed of breeds) {
      const size = getBreedSizePresentation(breed.slug);
      if (["provisional", "variable-parentage", "missing"].includes(size.status)) {
        expect(filteredSlugs.has(breed.slug), breed.slug).toBe(false);
      }
    }
  });

  it("matches complete varieties in every applicable filter without duplicating a breed", () => {
    expect(getBreedSizePresentation("portuguese-podengo").filterClasses).toEqual(["small", "medium", "large"]);
    expect(getBreedSizePresentation("peruvian-hairless-dog").filterClasses).toEqual(["small", "medium", "large"]);
    expect(getBreedSizePresentation("german-spitz").filterClasses).toEqual(["extra-small"]);

    const filters = emptyBreedFilters();
    filters.size = ["small", "medium", "large"];
    const result = filterBreeds(discoverBreeds, filters);
    expect(result.filter((breed) => breed.slug === "portuguese-podengo")).toHaveLength(1);
    expect(result.filter((breed) => breed.slug === "peruvian-hairless-dog")).toHaveLength(1);
  });

  it("reports the actual five filter result counts", () => {
    const counts = Object.fromEntries(["extra-small", "small", "medium", "large", "giant"].map((size) => {
      const filters = emptyBreedFilters();
      filters.size = [size as (typeof filters.size)[number]];
      return [size, filterBreeds(discoverBreeds, filters).length];
    }));
    expect(counts).toEqual({ "extra-small": 4, small: 48, medium: 114, large: 126, giant: 27 });
  });

  it("presents source ranges rather than internal midpoint values", () => {
    expect(getBreedSizePresentation("newfoundland")).toMatchObject({
      displayLabel: "초대형",
      height: "66~71cm",
      weight: "50~68kg",
    });
    expect(getBreedSizePresentation("portuguese-podengo").displayLabel).toBe("유형별 · 소형~대형");
  });
});
