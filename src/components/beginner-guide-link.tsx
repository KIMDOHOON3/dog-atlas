"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BEGINNER_GUIDE_PROGRESS_EVENT,
  BEGINNER_GUIDE_STEP_COUNT,
  getBeginnerGuideStorageKey,
  readBeginnerGuideProgress,
} from "@/lib/beginner-guide-progress";
import styles from "./beginner-guide-link.module.css";

function objectParticle(word: string) {
  const lastCode = word.charCodeAt(word.length - 1);
  const hasBatchim = lastCode >= 0xac00 && lastCode <= 0xd7a3 && (lastCode - 0xac00) % 28 !== 0;
  return hasBatchim ? "을" : "를";
}

export function BeginnerGuideLink({ slug, nameKo }: { slug: string; nameKo: string }) {
  const [completed, setCompleted] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setCompleted(readBeginnerGuideProgress(slug));
      setHydrated(true);
    });

    const storageKey = getBeginnerGuideStorageKey(slug);
    function syncStorage(event: StorageEvent) {
      if (event.key === storageKey) setCompleted(readBeginnerGuideProgress(slug));
    }
    function syncCurrentTab(event: Event) {
      const detail = (event as CustomEvent<{ slug?: string; completed?: number }>).detail;
      if (detail?.slug === slug && typeof detail.completed === "number") setCompleted(detail.completed);
    }

    window.addEventListener("storage", syncStorage);
    window.addEventListener(BEGINNER_GUIDE_PROGRESS_EVENT, syncCurrentTab);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(BEGINNER_GUIDE_PROGRESS_EVENT, syncCurrentTab);
    };
  }, [slug]);

  const label = !hydrated || completed === 0
    ? "이 강아지 맞이할 준비하기"
    : completed === BEGINNER_GUIDE_STEP_COUNT
      ? "맞이 준비 확인 완료 ✓"
      : "맞이 준비 계속하기";

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/beginner-guide?breed=${encodeURIComponent(slug)}`}>
        <span aria-hidden="true">
          <Image src="/illustrations/ui/action-icons/readiness-checklist-3d.png" alt="" width={256} height={256} />
        </span>
        {label}
      </Link>
      <span className={styles.hint}>
        {nameKo}{objectParticle(nameKo)} 데려오기 전 필요한 것만 차례로 확인해요.
      </span>
    </div>
  );
}
