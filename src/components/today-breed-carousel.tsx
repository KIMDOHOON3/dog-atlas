"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { BreedVisual } from "./breed-visual";
import type { Breed } from "@/content/breeds/schema";
import styles from "./today-breed-carousel.module.css";

type Props = {
  breeds: Breed[];
  initialIndex: number;
};

export function TodayBreedCarousel({ breeds, initialIndex }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const current = breeds[currentIndex];

  function move(direction: -1 | 1) {
    setCurrentIndex((index) => (index + direction + breeds.length) % breeds.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  }

  return (
    <section
      className={styles.carousel}
      aria-roledescription="캐러셀"
      aria-label="오늘의 강아지"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.stage} aria-live="polite" aria-atomic="true">
        <BreedVisual
          breed={current}
          variant="hero"
          priority={currentIndex === initialIndex}
        />
        <div className={styles.summary}>
          <span>{current.identity.origin} · {current.identity.lineage}</span>
          <strong>{current.nameKo}</strong>
          <p>{current.tagline}</p>
          <Link href={`/breeds/${current.slug}`}>이 강아지 이야기 보기 <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} aria-label="이전 강아지 보기">←</button>
        <span aria-label={`${breeds.length}개 중 ${currentIndex + 1}번째`}>{currentIndex + 1} / {breeds.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="다음 강아지 보기">→</button>
      </div>
    </section>
  );
}
