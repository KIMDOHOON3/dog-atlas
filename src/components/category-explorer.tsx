"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Breed } from "@/content/breeds/schema";
import styles from "./category-explorer.module.css";

type CategoryKey = "role" | "rhythm" | "care" | "relationship" | "stimulus" | "space";

type Category = {
  key: CategoryKey;
  title: string;
  description: string;
  resultLabel: string;
  slugs: string[];
};

const categories: Category[] = [
  { key: "role", title: "어떤 일을 해왔을까", description: "목양·수호·사냥·반려의 역사적 역할", resultLabel: "역할과 형성 배경", slugs: ["mongolian-bankhar", "tibetan-mastiff", "central-asian-shepherd-dog", "bernese-mountain-dog"] },
  { key: "rhythm", title: "하루를 어떻게 움직일까", description: "지속적인 활동부터 짧은 질주와 휴식까지", resultLabel: "활동 리듬", slugs: ["border-collie", "greyhound", "samoyed", "japanese-spitz"] },
  { key: "care", title: "털과 날씨를 어떻게 돌볼까", description: "빗질·미용·더위·추위 관리", resultLabel: "피모와 기후 관리", slugs: ["mongolian-bankhar", "samoyed", "japanese-spitz", "maltese"] },
  { key: "relationship", title: "사람과 어떻게 관계 맺을까", description: "교감·협력·독립적 판단을 나누어 보기", resultLabel: "교감과 독립", slugs: ["maltese", "cavalier-king-charles-spaniel", "border-collie", "mongolian-bankhar"] },
  { key: "stimulus", title: "주변 자극에 어떻게 반응할까", description: "알림·소리·낯선 변화에 대한 경향", resultLabel: "자극과 알림 행동", slugs: ["mongolian-bankhar", "tibetan-mastiff", "german-shepherd-dog", "japanese-spitz"] },
  { key: "space", title: "몸과 생활 동선은 어떨까", description: "체격·힘·울타리·이동 조건", resultLabel: "체격과 생활 동선", slugs: ["maltese", "japanese-spitz", "bernese-mountain-dog", "great-dane"] },
];

const categoryMarks: Record<CategoryKey, string> = {
  role: styles.roleMark,
  rhythm: styles.rhythmMark,
  care: styles.careMark,
  relationship: styles.relationshipMark,
  stimulus: styles.stimulusMark,
  space: styles.spaceMark,
};

const registryLabels: Record<string, string> = {
  "mongolian-bankhar": "랜드레이스",
  "tibetan-mastiff": "등록 견종",
  "central-asian-shepherd-dog": "등록 견종",
  "bernese-mountain-dog": "다목적 작업견",
  "border-collie": "목양견",
  greyhound: "시각 하운드",
  samoyed: "북방 작업견",
  "japanese-spitz": "반려견",
  maltese: "반려견",
  "cavalier-king-charles-spaniel": "반려견",
  "german-shepherd-dog": "목양·보호견",
  "great-dane": "대형 동반견",
};

export function CategoryExplorer({ breeds }: { breeds: readonly Breed[] }) {
  const [activeKey, setActiveKey] = useState<CategoryKey>("role");
  const activeCategory = categories.find((category) => category.key === activeKey) ?? categories[0];
  const breedBySlug = useMemo(() => new Map(breeds.map((breed) => [breed.slug, breed])), [breeds]);
  const results = activeCategory.slugs.flatMap((slug) => {
    const breed = breedBySlug.get(slug);
    return breed ? [breed] : [];
  });

  return (
    <section className={styles.explorer} id="lenses" aria-labelledby="explorer-title">
      <div className={styles.eyebrow}>견종을 살펴보는 관점</div>
      <h2 id="explorer-title">어떤 관점으로 견종을 살펴볼까요?</h2>
      <p className={styles.intro}>정답이나 추천 순위 대신, 각 견종이 살아온 배경과 오늘의 생활 조건을 여러 방향에서 비교해볼 수 있어요.</p>

      <div className={styles.categoryHeading}>
        <h3>먼저 큰 질문을 골라보세요</h3>
        <p>복수 관점으로 다시 살펴볼 수 있어요</p>
      </div>
      <div className={styles.categoryGrid} role="list" aria-label="견종 탐색 카테고리">
        {categories.map((category) => {
          const isActive = category.key === activeKey;
          return (
            <button
              className={`${styles.categoryCard} ${isActive ? styles.active : ""}`}
              key={category.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveKey(category.key)}
            >
              <span className={`${styles.categoryMark} ${categoryMarks[category.key]}`} aria-hidden="true" />
              <strong>{category.title}</strong>
              <span>{category.description}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.results} aria-live="polite">
        <div className={styles.resultsHeading}>
          <h3>{activeCategory.title}</h3>
          <p>이 관점으로 살펴볼 견종</p>
        </div>
        <div className={styles.chips} aria-label={`${activeCategory.resultLabel} 선택`}>
          <span className={styles.selectedChip}>{activeCategory.resultLabel}</span>
          <span className={styles.chipHint}>순위 없이 편집된 대표 견종을 먼저 보여드려요</span>
        </div>
        <div className={styles.resultGrid}>
          {results.map((breed) => (
            <Link className={styles.resultCard} href={`/breeds/${breed.slug}`} key={breed.slug}>
              <span>{breed.identity.origin} · {registryLabels[breed.slug] ?? breed.catalog.discoveryTags[0]}</span>
              <strong>{breed.nameKo}</strong>
              <em>{breed.catalog.discoveryTags[0]}</em>
            </Link>
          ))}
        </div>
        <Link className={styles.allLink} href="#discover">전체 도감에서 더 살펴보기 →</Link>
      </div>
    </section>
  );
}
