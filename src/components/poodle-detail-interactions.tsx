"use client";

import Image from "next/image";
import { useState } from "react";
import type { PoodleDetail } from "@/content/poodle-detail/data";
import { useSnapCarousel } from "@/lib/use-snap-carousel";
import styles from "./poodle-detail.module.css";

export function PoodleSizePicker({
  sizes,
  activeSize: controlledActiveSize,
  onSelect,
}: {
  sizes: PoodleDetail["sizes"];
  activeSize?: number;
  onSelect?: (index: number) => void;
}) {
  const [localActiveSize, setLocalActiveSize] = useState(0);
  const activeSize = controlledActiveSize ?? localActiveSize;

  function selectSize(index: number) {
    if (onSelect) onSelect(index);
    else setLocalActiveSize(index);
  }

  return (
    <div className={styles.sizePicker} aria-label="푸들 크기별 체고 보기">
      <div>
        {sizes.map((item, index) => (
          <button
            type="button"
            aria-pressed={activeSize === index}
            key={item.id}
            onClick={() => selectSize(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PoodleRealityCards({ sizes, realities }: { sizes: PoodleDetail["sizes"]; realities: PoodleDetail["realities"] }) {
  const [activeSize, setActiveSize] = useState(0);
  const {
    current: mobileCard,
    handleScroll: handleMobileScroll,
    scrollTo: scrollToMobileCard,
    trackRef: mobileTrackRef,
  } = useSnapCarousel(realities.length);
  const sizeReality = realities.find((reality) => reality.id === "sizes");
  const coatReality = realities.find((reality) => reality.id === "coat");

  if (!sizeReality || !coatReality) return null;

  return (
    <div className={`${styles.realityCarousel} mobile-edge-to-edge`} aria-label="푸들과 살 때 체감하는 두 가지" aria-roledescription="carousel">
      <div className={`${styles.realityGrid} mobile-edge-to-edge-track`} ref={mobileTrackRef} onScroll={handleMobileScroll}>
        <article className={styles.sizeReality}>
          <div className={styles.sizeVisual}>
            {sizes.map((item, index) => (
              <Image
                className={styles.sizeImage}
                src={item.image}
                alt={activeSize === index ? item.imageAlt : ""}
                aria-hidden={activeSize !== index}
                data-active={activeSize === index || undefined}
                width={1200}
                height={900}
                sizes="(max-width: 767px) calc(100vw - 60px), 46vw"
                key={item.image}
              />
            ))}
            {sizes.map((item, index) => (
              <span
                aria-hidden={activeSize !== index}
                aria-live={activeSize === index ? "polite" : undefined}
                data-active={activeSize === index || undefined}
                key={item.id}
              >
                <strong>{item.label}</strong><small>{item.range}</small>
              </span>
            ))}
          </div>
          <div className={styles.realityBody}>
            <h3>{sizeReality.title}</h3>
            <p>{sizeReality.body}</p>
            <PoodleSizePicker sizes={sizes} activeSize={activeSize} onSelect={setActiveSize} />
          </div>
        </article>
        <article>
          <Image
            src={coatReality.image!}
            alt={coatReality.imageAlt!}
            width={1200}
            height={900}
            sizes="(max-width: 767px) calc(100vw - 60px), 46vw"
          />
          <div className={styles.realityBody}>
            <h3>{coatReality.title}</h3>
            <p>{coatReality.body}</p>
          </div>
        </article>
      </div>
      <div className={styles.realityDots} aria-label="생활 현실 카드 선택">
        {realities.map((reality, index) => (
          <button
            type="button"
            aria-label={`${index + 1}번째 ${reality.title} 보기`}
            aria-current={mobileCard === index ? "step" : undefined}
            onClick={() => scrollToMobileCard(index)}
            key={reality.id}
          />
        ))}
      </div>
    </div>
  );
}
