import Image from "next/image";
import type { Breed } from "@/content/breeds/schema";
import styles from "./breed-visual.module.css";

type Variant = "hero" | "card" | "landscape" | "portrait" | "tile" | "detail" | "compare" | "history";
type Props = { breed: Breed; variant: Variant; label?: string; priority?: boolean };

export function getBreedCardImage(slug: string) {
  const frontGazeCards: Record<string, string> = {
    shiba: "/illustrations/v2/shiba-card-front.webp",
    akita: "/illustrations/v2/akita-card-front.webp",
    "bichon-frise": "/illustrations/v2/bichon-frise-card-front.webp",
    "cavalier-king-charles-spaniel": "/illustrations/v2/cavalier-king-charles-spaniel-card-front.webp",
    pug: "/illustrations/v2/pug-card-front.webp",
    "bernese-mountain-dog": "/illustrations/v2/bernese-mountain-dog-card-front.webp",
    dobermann: "/illustrations/v2/dobermann-card-front.webp",
  };

  if (frontGazeCards[slug]) return frontGazeCards[slug];
  return `/illustrations/v2/${slug}-card.webp`;
}

export function BreedVisual({ breed, variant, label, priority = false }: Props) {
  if (variant === "history" && !breed.historyVisual) return null;

  const isHistory = variant === "history";
  const src = isHistory
    ? breed.historyVisual!.src
    : variant === "hero" && breed.slug === "japanese-spitz"
      ? "/illustrations/v2/japanese-spitz-hero.webp"
      : getBreedCardImage(breed.slug);
  const alt = isHistory ? breed.historyVisual!.alt : `${breed.nameKo}의 대표적인 체형과 피모가 보이는 전신 일러스트`;

  return (
    <figure className={`${styles.visual} ${styles[variant]}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={variant === "tile" || variant === "card" ? "(max-width: 767px) 50vw, 240px" : "(max-width: 767px) 100vw, 600px"}
        className={styles.image}
      />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
