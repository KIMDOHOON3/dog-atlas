"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { BreedVisual } from "./breed-visual";
import type { Breed } from "@/content/breeds/schema";
import styles from "./today-breed-carousel.module.css";

type Props = {
  breeds: Breed[];
  initialIndex: number;
};

const AUTOPLAY_INTERVAL_MS = 2000;
const CROSSFADE_DURATION_MS = 600;

export function TodayBreedCarousel({ breeds, initialIndex }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(true);
  const [preparedIndex, setPreparedIndex] = useState(() => (
    breeds.length > 1 ? (initialIndex + 1) % breeds.length : initialIndex
  ));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const changeTimer = useRef<number | null>(null);
  const firstAnimationFrame = useRef<number | null>(null);
  const secondAnimationFrame = useRef<number | null>(null);
  const changingRef = useRef(false);
  const currentIndexRef = useRef(initialIndex);
  const current = breeds[currentIndex];
  const prepared = breeds[preparedIndex];

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionAllowed(!media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  const transitionMove = useCallback((direction: -1 | 1) => {
    if (breeds.length < 2 || changingRef.current) return;

    const targetIndex = (currentIndexRef.current + direction + breeds.length) % breeds.length;

    if (!motionAllowed) {
      currentIndexRef.current = targetIndex;
      setCurrentIndex(targetIndex);
      setPreparedIndex((targetIndex + 1) % breeds.length);
      return;
    }

    changingRef.current = true;
    setPreparedIndex(targetIndex);
    setIsTransitioning(false);

    firstAnimationFrame.current = window.requestAnimationFrame(() => {
      secondAnimationFrame.current = window.requestAnimationFrame(() => {
        setIsTransitioning(true);
        changeTimer.current = window.setTimeout(() => {
          currentIndexRef.current = targetIndex;
          setCurrentIndex(targetIndex);
          setPreparedIndex((targetIndex + 1) % breeds.length);
          setIsTransitioning(false);
          changingRef.current = false;
          changeTimer.current = null;
          firstAnimationFrame.current = null;
          secondAnimationFrame.current = null;
        }, CROSSFADE_DURATION_MS);
      });
    });
  }, [breeds.length, motionAllowed]);

  useEffect(() => {
    if (isPaused || !motionAllowed || breeds.length < 2) return;
    const timer = window.setInterval(() => transitionMove(1), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [breeds.length, isPaused, motionAllowed, transitionMove]);

  useEffect(() => () => {
    if (changeTimer.current !== null) window.clearTimeout(changeTimer.current);
    if (firstAnimationFrame.current !== null) window.cancelAnimationFrame(firstAnimationFrame.current);
    if (secondAnimationFrame.current !== null) window.cancelAnimationFrame(secondAnimationFrame.current);
  }, []);

  function move(direction: -1 | 1) {
    transitionMove(direction);
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
    setIsPaused(true);
    swipeStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) {
      setIsPaused(false);
      return;
    }
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) >= 42) move(distance > 0 ? -1 : 1);
    setIsPaused(false);
  }

  function clearSwipeStart() {
    swipeStartX.current = null;
    setIsPaused(false);
  }

  return (
    <section
      className={styles.carousel}
      aria-roledescription="캐러셀"
      aria-label="오늘의 강아지"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.stage} aria-live={isPaused ? "polite" : "off"} aria-atomic="true">
        <div
          className={styles.visualFrame}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={clearSwipeStart}
          onPointerLeave={clearSwipeStart}
        >
          <div key={current.slug} className={`${styles.slide} ${isTransitioning ? styles.currentSlideLeaving : ""}`}>
            <BreedVisual
              breed={current}
              variant="hero"
              priority={currentIndex === initialIndex}
            />
          </div>
          {prepared && preparedIndex !== currentIndex && (
            <div
              key={prepared.slug}
              className={`${styles.slide} ${styles.preparedSlide} ${isTransitioning ? styles.preparedSlideEntering : ""}`}
              aria-hidden="true"
            >
              <BreedVisual breed={prepared} variant="hero" />
            </div>
          )}
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
