import { FoilCard } from "@/components/foil-card/foil-card";
import { createPageMetadata, SITE_NAME } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description:
    "빛에 따라 달라지는 수채화 카드로 만나는 견종도감. 초대형견 8종의 크기와 수명, 과거 역할을 살펴보세요.",
  path: "/",
  image: "/illustrations/card-studies/great-pyrenees-alpine-v1.webp",
  imageAlt: "눈 덮인 피레네산맥 앞에 서 있는 그레이트 피레니즈 수채화",
});

export default function Home() {
  return <FoilCard />;
}
