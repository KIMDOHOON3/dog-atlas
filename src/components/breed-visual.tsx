import Image from "next/image";
import type { Breed } from "@/content/breeds/schema";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import styles from "./breed-visual.module.css";

type Variant = "hero" | "card" | "landscape" | "portrait" | "tile" | "detail" | "compare" | "history";
type Props = { breed: Breed; variant: Variant; label?: string; priority?: boolean };

export function BreedVisual({ breed, variant, label, priority = false }: Props) {
  if (variant === "history" && !breed.historyVisual) return null;

  const isHistory = variant === "history";
  const src = isHistory
    ? breed.historyVisual!.src
    : getBreedCardImage(breed.slug);
  const alt = isHistory ? breed.historyVisual!.alt : `${breed.nameKo}의 대표적인 체형과 피모가 보이는 전신 일러스트`;

  return (
    <figure className={`${styles.visual} ${styles[variant]}`}>
      {variant === "tile" && (
        <Image
          src={src}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 390px) 50vw, 1px"
          className={styles.imageBackdrop}
          aria-hidden="true"
        />
      )}
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
