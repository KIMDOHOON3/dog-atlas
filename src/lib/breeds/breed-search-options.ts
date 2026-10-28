import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import { getBreedCardImage } from "./breed-image-assets";
import type { BreedSearchOption } from "./breed-search-index";

export function getBreedSearchOptions(): BreedSearchOption[] {
  return breeds.map(({ slug, nameKo, nameEn }) => {
    const master = getMasterBreed(slug);
    return {
      slug,
      nameKo,
      nameEn,
      imageSrc: getBreedCardImage(slug),
      aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])],
    };
  });
}
