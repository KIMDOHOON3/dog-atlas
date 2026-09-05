import Image from "next/image";
import type { GiantCard } from "@/content/giant-cards";
import styles from "./foil-card.module.css";
import { BreedFlag } from "./breed-flag";

export function CardBack({ breed }: { breed: GiantCard }) {
  return (
    <div className={styles.backPaper}>
      <Image
        className={styles.backArtwork}
        src={breed.back.src}
        alt={breed.back.alt}
        width={breed.back.width}
        height={breed.back.height}
        unoptimized
        loading="eager"
        decoding="async"
        draggable={false}
      />
      {Number(breed.number) >= 4 && (
        <div className={styles.backScrim} aria-hidden="true" />
      )}
      <div className={styles.origin}>
        <BreedFlag country={breed.flag} />
        <div>
          <span className={styles.originLabel}>{breed.originEn}</span>
          <p>{breed.origin}</p>
        </div>
        <span className={styles.backNumber}>{breed.number}</span>
      </div>
      <h2 className={styles.backTitle}>{breed.name}</h2>
      <div className={styles.backFacts}>
        <section className={styles.sizeSection} aria-label="성견 크기">
          <div className={styles.sizeNumbers}>
            <div>
              <span className={styles.factLabel}>
                {breed.heightLabel ?? "어깨까지 높이"}
              </span>
              <p>
                <strong data-compact={breed.height.includes("/")}>
                  {breed.height}
                </strong>{" "}
                cm
              </p>
            </div>
            <div>
              <span className={styles.factLabel}>
                {breed.weightLabel ?? "몸무게 · 약"}
              </span>
              <p>
                <strong data-compact={breed.weight.includes("/")}>
                  {breed.weight}
                </strong>{" "}
                kg
              </p>
            </div>
          </div>
        </section>
        <div className={styles.lifespan}>
          <span className={styles.factLabel}>
            {breed.lifespan ? "수명 · 참고" : "수명"}
          </span>
          <p>
            <strong data-compact={!breed.lifespan}>
              {breed.lifespan ?? "자료 부족"}
            </strong>
            {breed.lifespan && " 년"}
          </p>
        </div>
      </div>
      <div className={styles.backCaption}>
        <section className={styles.roleSection} aria-label="과거 역할">
          <span className={styles.factLabel}>{breed.historyTitle}</span>
          <p>{breed.history}</p>
        </section>
        <p className={styles.backNote}>
          {breed.backNote ??
            "그림은 크기 비교 예시예요. 크기와 수명은 개체마다 달라요."}
        </p>
        <div className={styles.backFoot}>
          <span>DOG ATLAS · BREED NOTES</span>
          <span>✧</span>
        </div>
      </div>
    </div>
  );
}
