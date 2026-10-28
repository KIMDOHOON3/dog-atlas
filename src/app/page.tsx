import { FoilCard } from "@/features/cards/foil-card";
import { createPageMetadata, SITE_NAME } from "@/lib/site-metadata";
import { getBreedSearchOptions } from "@/lib/breeds/breed-search-options";
import { getHomeCardGroups } from "@/lib/breeds/home-card-data";

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description:
    "49종의 수채화 카드와 376종 검색으로 만나는 견종도감. 크기와 수명, 역사와 함께 사는 생활을 살펴보세요.",
  path: "/",
  image: "/illustrations/card-studies/great-pyrenees-alpine-v1.webp",
  imageAlt: "눈 덮인 피레네산맥 앞에 서 있는 그레이트 피레니즈 수채화",
});

export default function Home() {
  return <FoilCard cardGroups={getHomeCardGroups()} searchBreeds={getBreedSearchOptions()} />;
}
