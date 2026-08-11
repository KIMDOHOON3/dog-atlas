"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
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
  const swipeStartX = useRef<number | null>(null);
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

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 42) return;
    move(distance > 0 ? -1 : 1);
  }

  function clearSwipeStart() {
    swipeStartX.current = null;
  }

  return (
    <section
      className={styles.carousel}
      aria-roledescription="캐러셀"
      aria-label="오늘의 강아지"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.stage} aria-live="polite" aria-atomic="true">
        <div
          className={styles.visualFrame}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={clearSwipeStart}
          onPointerLeave={clearSwipeStart}
        >
          <BreedVisual
            breed={current}
            variant="hero"
            priority={currentIndex === initialIndex}
          />
          <div className={styles.controls}>
            <button type="button" onClick={() => move(-1)} aria-label="이전 강아지 보기">←</button>
            <span aria-label={`${breeds.length}개 중 ${currentIndex + 1}번째`}>{currentIndex + 1} / {breeds.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="다음 강아지 보기">→</button>
          </div>
        </div>
        <div className={styles.summary}>
          <span>{current.identity.origin} · {current.identity.lineage}</span>
          <strong>{current.nameKo}</strong>
          <p>{current.tagline}</p>
          <Link href={`/breeds/${current.slug}`}>이 강아지 이야기 보기 <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <p className={styles.swipeHint}>이미지를 좌우로 밀어 다음 견종을 살펴보세요.</p>
    </section>
  );
}
