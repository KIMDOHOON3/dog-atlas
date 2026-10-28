import Image from "next/image";
import type { GiantCard } from "@/content/giant-cards";
import styles from "./foil-card.module.css";
import { BreedFlag } from "./breed-flag";

export function CardBack({ breed }: { breed: GiantCard }) {
  return (
    <div className={styles.backPaper} data-breed={breed.slug}>
      <Image
        className={styles.backArtwork}
        src={breed.back.src}
        alt={breed.back.alt}
        width={breed.back.width}
        height={breed.back.height}
        unoptimized
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      {(Number(breed.number) >= 4 ||
        breed.slug === "german-spitz" ||
        breed.slug === "yorkshire-terrier") && (
        <div className={styles.backScrim} aria-hidden="true" />
      )}
      <div className={styles.origin}>
        <BreedFlag country={breed.flag} />
        {breed.secondaryFlag && <BreedFlag country={breed.secondaryFlag} />}
        <div>
          <span className={styles.originLabel}>{breed.originEn}</span>
          <p>{breed.origin}</p>
        </div>
      </div>
      <h2 className={styles.backTitle}>{breed.name}</h2>
      <div className={styles.backFacts}>
        {breed.facts ? (
          <>
            <section aria-label="성견 크기">
              {breed.facts.variety && (
                <span className={styles.factLabel}>
                  {breed.facts.variety} 기준
                </span>
              )}
              {breed.facts.note && (
                <p className={styles.variableSize}>{breed.facts.note}</p>
              )}
              <div className={styles.sizeNumbers}>
                {breed.facts.rows.map((row) => (
                  <div key={row.label}>
                    <span className={styles.factLabel}>{row.label}</span>
                    <p>
                      <strong className={styles.sharedFactValue}>
                        {row.value}
                      </strong>
                    </p>
                  </div>
                ))}
              </div>
            </section>
            {breed.facts.lifespan && (
              <div className={styles.lifespan}>
                <span className={styles.factLabel}>수명 · 참고</span>
                <p>
                  <strong className={styles.sharedFactValue}>
                    {breed.facts.lifespan}
                  </strong>
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <section aria-label="성견 크기">
              {breed.sizeNote ? (
                <p className={styles.variableSize}>{breed.sizeNote}</p>
              ) : (
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
              )}
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
          </>
        )}
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
