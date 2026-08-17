"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import { presentBreedOrigin } from "@/lib/breed-origin-presentation";
import styles from "./page.module.css";

const INITIAL_COUNT = 48;
const BATCH_SIZE = 48;

type CuriosityBreed = { breed: Breed; fact: string };

export function CuriosityBreedGrid({ breeds }: { breeds: CuriosityBreed[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visibleBreeds = useMemo(() => breeds.slice(0, visibleCount), [breeds, visibleCount]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleBreeds.length >= breeds.length) return;
    const sentinelElement = sentinel;
    let animationFrame = 0;
    let loaded = false;
    let observer: IntersectionObserver | undefined;

    function loadNextBatch() {
      if (loaded) return;
      loaded = true;
      observer?.disconnect();
      window.removeEventListener("scroll", checkSentinelPosition);
      window.removeEventListener("resize", checkSentinelPosition);
      setVisibleCount((count) => Math.min(count + BATCH_SIZE, breeds.length));
    }

    function checkSentinelPosition() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        if (sentinelElement.getBoundingClientRect().top <= window.innerHeight + 600) loadNextBatch();
      });
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) loadNextBatch();
      }, { rootMargin: "600px 0px" });
      observer.observe(sentinelElement);
    }

    window.addEventListener("scroll", checkSentinelPosition, { passive: true });
    window.addEventListener("resize", checkSentinelPosition);
    checkSentinelPosition();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", checkSentinelPosition);
      window.removeEventListener("resize", checkSentinelPosition);
    };
  }, [breeds.length, visibleBreeds.length]);

  return (
    <>
      <div className={styles.breedGrid}>
        {visibleBreeds.map(({ breed, fact }) => (
          <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={`${breed.slug}-${fact}`} aria-label={`${breed.nameKo} 상세 정보 보기`}>
            <BreedVisual breed={breed} variant="tile" />
            <div>
              <small>{breed.nameEn}</small>
              <h3>{breed.nameKo}</h3>
              <p>{fact}</p>
              <span>{presentBreedOrigin(breed.identity.origin)} <b aria-hidden="true">→</b></span>
            </div>
          </Link>
        ))}
      </div>
      {visibleBreeds.length < breeds.length && (
        <div className={styles.infiniteScroll} ref={sentinelRef} role="status" aria-live="polite">
          <span className={styles.loadingMark} aria-hidden="true" />
          <span>{visibleBreeds.length} / {breeds.length}마리 · 아래로 내리면 계속 보여요</span>
        </div>
      )}
    </>
  );
}
