import Image from "next/image";
import type { Breed } from "@/content/breeds/schema";
import styles from "./breed-visual.module.css";

type Variant = "hero" | "card" | "landscape" | "portrait" | "tile" | "detail" | "compare" | "history";
type Props = { breed: Breed; variant: Variant; label?: string; priority?: boolean };

const cardImages: Record<string, string> = {
  "japanese-spitz": "/illustrations/v2/japanese-spitz-card.webp",
  maltese: "/illustrations/v2/maltese-card.webp",
  "border-collie": "/illustrations/v2/border-collie-card.webp",
  greyhound: "/illustrations/v2/greyhound-card.webp",
  samoyed: "/illustrations/v2/samoyed-card.webp",
};

const altText: Record<string, string> = {
  "japanese-spitz": "직립한 귀와 풍성한 흰 이중모, 등 위로 말린 꼬리가 보이는 재패니즈 스피츠 전신 일러스트",
  maltese: "길고 곧게 흐르는 흰 피모를 가진 몰티즈 전신 일러스트",
  "border-collie": "운동성 있는 중형 체형과 흑백 피모가 보이는 보더콜리 전신 일러스트",
  greyhound: "깊은 가슴과 잘록한 허리, 긴 다리가 보이는 그레이하운드 전신 일러스트",
  samoyed: "풍성한 흰 이중모와 중대형 체격이 보이는 사모예드 전신 일러스트",
};

export function BreedVisual({ breed, variant, label, priority = false }: Props) {
  if (variant === "history" && !breed.historyVisual) return null;

  const isHistory = variant === "history";
  const src = isHistory
    ? breed.historyVisual!.src
    : variant === "hero" && breed.slug === "japanese-spitz"
      ? "/illustrations/v2/japanese-spitz-hero.webp"
      : cardImages[breed.slug];
  const alt = isHistory ? breed.historyVisual!.alt : altText[breed.slug] ?? `${breed.nameKo} 전신 일러스트`;

  return (
    <figure className={`${styles.visual} ${styles[variant]}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={variant === "tile" || variant === "card" ? "(max-width: 767px) 50vw, 240px" : "(max-width: 767px) 100vw, 600px"}
        className={styles.image}
      />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
