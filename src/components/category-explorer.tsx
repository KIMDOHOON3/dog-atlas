"use client";

import Link from "next/link";
import { applyBreedFilterPreset, breedFilterPresets, filtersToSearchParams } from "@/lib/breed-filters";
import styles from "./category-explorer.module.css";

const optionDetails = [
  { key: "calm", title: "차분한 활동 리듬", description: "가벼운 움직임을 선호하는 견종부터 살펴봐요." },
  { key: "active", title: "충분히 움직이는 생활", description: "매일 활동과 과제가 필요한 견종부터 살펴봐요." },
  { key: "grooming-light", title: "관리 부담 살펴보기", description: "빗질 부담이 비교적 낮은 견종부터 살펴봐요." },
] as const;

const firstExploreOptions = optionDetails.flatMap((detail) => {
  const preset = breedFilterPresets.find((item) => item.key === detail.key);
  return preset ? [{ ...detail, query: filtersToSearchParams(applyBreedFilterPreset(preset)).toString() }] : [];
});

export function CategoryExplorer() {
  return (
    <section className={styles.explorer} id="lenses" aria-labelledby="explorer-title">
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>생활 조건으로 발견하기</p>
          <h2 id="explorer-title">함께할 수 있는 생활부터 살펴보세요.</h2>
        </div>
        <Link className={styles.allLink} href="/discover">모든 조건 보기 <span aria-hidden="true">→</span></Link>
      </header>
      <nav className={styles.quickStartGrid} aria-label="견종 발견 빠른 시작">
        {firstExploreOptions.map((option, index) => (
          <Link className={styles.quickStartCard} href={`/discover?${option.query}`} key={option.key}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <strong>{option.title}</strong>
            <span className={styles.quickDescription}>{option.description}</span>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </nav>
    </section>
  );
}
