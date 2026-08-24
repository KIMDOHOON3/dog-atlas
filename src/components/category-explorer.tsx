"use client";

import Image from "next/image";
import Link from "next/link";
import { applyBreedFilterPreset, breedFilterPresets, filtersToSearchParams } from "@/lib/breed-filters";
import styles from "./category-explorer.module.css";

const optionDetails = [
  { key: "calm", image: "/illustrations/ui/home-conditions/calm-rhythm-3d.webp", title: "차분한 활동 리듬", description: "가벼운 움직임에 맞는 일상부터 봐요." },
  { key: "active", image: "/illustrations/ui/home-conditions/active-life-3d.webp", title: "충분히 움직이는 생활", description: "매일 활동과 과제가 필요한 생활이에요." },
  { key: "grooming-light", image: "/illustrations/ui/home-conditions/coat-care-3d.webp", title: "털 관리 부담 살펴보기", description: "빗질 부담이 낮은 편부터 살펴봐요." },
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
          <h2 id="explorer-title">내가 가능한 <em>생활</em>부터 골라보세요.</h2>
        </div>
        <Link className={styles.allLink} href="/discover">전체 조건 <span aria-hidden="true">→</span></Link>
      </header>
      <nav className={styles.quickStartGrid} aria-label="견종 발견 빠른 시작">
        {firstExploreOptions.map((option, index) => (
          <Link className={styles.quickStartCard} href={`/discover?${option.query}`} key={option.key}>
            <span className={styles.cardVisual} aria-hidden="true">
              <Image className={styles.module} src={option.image} alt="" width={512} height={341} sizes="96px" />
            </span>
            <span className={styles.cardCopy}>
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              <strong>{option.title}</strong>
              <span className={styles.quickDescription}>{option.description}</span>
            </span>
            <b aria-hidden="true"><span>→</span></b>
          </Link>
        ))}
      </nav>
    </section>
  );
}
