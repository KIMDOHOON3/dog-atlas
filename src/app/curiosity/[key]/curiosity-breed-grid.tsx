"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { CuriosityBreedCard } from "@/lib/curiosity-breed-data";
import { useInfiniteBatch } from "@/lib/use-infinite-batch";
import { presentBreedOrigin } from "@/lib/breed-origin-presentation";
import styles from "./page.module.css";

const INITIAL_COUNT = 48;
const BATCH_SIZE = 48;



export function CuriosityBreedGrid({ breeds }: { breeds: CuriosityBreedCard[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useInfiniteBatch(visibleCount, breeds.length, BATCH_SIZE, setVisibleCount);
  const visibleBreeds = useMemo(() => breeds.slice(0, visibleCount), [breeds, visibleCount]);


  return (
    <>
      <div className={styles.breedGrid}>
        {visibleBreeds.map(({ breed, fact }) => (
          <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} prefetch={false} key={`${breed.slug}-${fact}`} aria-label={`${breed.nameKo} 상세 정보 보기`}>
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
