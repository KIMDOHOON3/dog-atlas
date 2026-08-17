"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CategoryDogIcon } from "@/components/category-dog-icon";
import { applyBreedFilterPreset, breedFilterPresets, filtersToSearchParams } from "@/lib/breed-filters";
import styles from "./category-explorer.module.css";

const optionDetails = {
  calm: { description: "가벼운 산책 중심", icon: "calm" as const },
  active: { description: "충분한 운동이 필요한 편", icon: "active" as const },
  social: { description: "사람과 가까이 지내는 편", icon: "social" as const },
  independent: { description: "혼자 쉬는 시간을 즐기는 편", icon: "independent" as const },
  "grooming-light": { description: "빗질 부담이 낮은 편", icon: "grooming" as const },
  all: { description: "조건 없이 모두 보기", icon: "unfamiliar" as const },
};

const firstExploreOptions = breedFilterPresets.map((preset) => ({
  ...preset,
  ...optionDetails[preset.key as keyof typeof optionDetails],
  query: filtersToSearchParams(applyBreedFilterPreset(preset)).toString(),
}));

export function CategoryExplorer() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-motion-card]");
    if (!cards?.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => { card.dataset.motionReady = "true"; });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.motionReady = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.32 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.explorer} ${styles.quickExplorer}`} id="lenses" aria-labelledby="explorer-title">
      <div className={styles.eyebrow}>생활 조건으로 찾기</div>
      <h2 id="explorer-title">내가 원하는 생활부터 골라보세요.</h2>
      <div ref={gridRef} className={styles.quickStartGrid} role="list" aria-label="견종 발견 빠른 시작">
        {firstExploreOptions.map((option) => (
          <Link data-motion-card className={styles.quickStartCard} href={option.query ? `/discover?${option.query}` : "/discover"} key={option.label}>
            <CategoryDogIcon name={option.icon} className={styles.quickIcon} />
            <strong>{option.label}</strong>
            <span className={styles.quickDescription}>{option.description}</span>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
