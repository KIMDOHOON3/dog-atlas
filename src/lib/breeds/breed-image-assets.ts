import { cardFrontArt } from "@/content/card-front-art";

const frontGazeCardImages: Record<string, string> = {
  shiba: "/illustrations/v2/shiba-card-front.webp",
  akita: "/illustrations/v2/akita-card-front.webp",
  "bichon-frise": "/illustrations/v2/bichon-frise-card-front.webp",
  "cavalier-king-charles-spaniel":
    "/illustrations/v2/cavalier-king-charles-spaniel-card-front.webp",
  pug: "/illustrations/v2/pug-card-front.webp",
  "bernese-mountain-dog":
    "/illustrations/v2/bernese-mountain-dog-card-front.webp",
  dobermann: "/illustrations/v2/dobermann-card-front.webp",
};

export function getBreedCardImage(slug: string) {
  return (
    cardFrontArt[slug]?.src ??
    frontGazeCardImages[slug] ??
    `/illustrations/v2/${slug}-card.webp`
  );
}

export function getBreedCardImageAlt(slug: string, nameKo: string) {
  return (
    cardFrontArt[slug]?.alt ??
    `${nameKo}의 대표적인 체형과 피모가 보이는 전신 일러스트`
  );
}
