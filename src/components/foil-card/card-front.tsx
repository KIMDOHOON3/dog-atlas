import Image from "next/image";
import type { GiantCard } from "@/content/giant-cards";
import styles from "./foil-card.module.css";

export function CardFront({
  breed,
  priority = false,
}: {
  breed: GiantCard;
  priority?: boolean;
}) {
  return (
    <div className={styles.inner}>
      <div className={styles.artwork}>
        <Image
          src={breed.front.src}
          alt={breed.front.alt}
          width={breed.front.width}
          height={breed.front.height}
          priority={priority}
          unoptimized
          draggable={false}
        />
      </div>
      <div className={styles.copy}>
        <div className={styles.cardLabel}>
          <span>{breed.nameEn}</span>
          <span>{breed.role}</span>
        </div>
        <h2>{breed.name}</h2>
        <p>{breed.tagline}</p>
        <div className={styles.cardFoot}>
          <span>{breed.region}</span>
          <span>
            BREED PORTRAIT <b>✧</b>
          </span>
        </div>
      </div>
      <div className={styles.rim} />
    </div>
  );
}
