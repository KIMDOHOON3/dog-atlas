"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import { DogIcon } from "@/components/dog-icon";
import type { Breed } from "@/content/breeds/schema";
import styles from "./category-explorer.module.css";

type CategoryKey = "life" | "home" | "relationship";

type Category = {
  key: CategoryKey;
  title: string;
  description: string;
  resultLabel: string;
  slugs: string[];
};

const categories: Category[] = [
  { key: "life", title: "어떤 삶을 살아왔나", description: "반려·목양·수호·사냥·북방 작업의 배경", resultLabel: "역할과 형성 배경", slugs: ["mongolian-bankhar", "tibetan-mastiff", "central-asian-shepherd-dog", "bernese-mountain-dog"] },
  { key: "home", title: "함께 살 때 무엇이 필요하나", description: "활동·공간·털·기후·관리 시간", resultLabel: "생활 조건과 관리", slugs: ["mongolian-bankhar", "samoyed", "greyhound", "maltese"] },
  { key: "relationship", title: "어떤 방식으로 관계 맺나", description: "교감·협력·독립적 판단·주변 반응", resultLabel: "교감과 반응", slugs: ["maltese", "cavalier-king-charles-spaniel", "border-collie", "mongolian-bankhar"] },
];

const quickFilters = [
  { key: "new", label: "처음 보는 견종", category: "life" as CategoryKey, slugs: ["mongolian-bankhar", "karelian-bear-dog", "norwegian-lundehund", "mudi"] },
  { key: "active", label: "활동적인 견종", category: "home" as CategoryKey, slugs: ["border-collie", "australian-shepherd", "greyhound", "siberian-husky"] },
  { key: "guardian", label: "큰 작업견", category: "life" as CategoryKey, slugs: ["mongolian-bankhar", "tibetan-mastiff", "central-asian-shepherd-dog", "great-dane"] },
  { key: "companion", label: "사람 곁을 좋아하는 견종", category: "relationship" as CategoryKey, slugs: ["maltese", "cavalier-king-charles-spaniel", "japanese-spitz", "havanese"] },
  { key: "coat", label: "털과 기후 관리", category: "home" as CategoryKey, slugs: ["mongolian-bankhar", "samoyed", "japanese-spitz", "maltese"] },
];

const firstExploreOptions = [
  { label: "느긋한 활동", description: "활동량이 낮은 편", query: "activity=low", icon: "calm" as const },
  { label: "많이 움직이기", description: "활동량이 높은 편", query: "activity=high", icon: "active" as const },
  { label: "사람과 교감", description: "교감이 높은 편", query: "social=high", icon: "social" as const },
  { label: "독립적인 성향", description: "독립성이 높은 편", query: "independence=high", icon: "independent" as const },
  { label: "털 관리 적게", description: "털 관리가 낮은 편", query: "grooming=low", icon: "grooming" as const },
  { label: "아직 잘 모르겠어요", description: "전체 견종 둘러보기", query: "", icon: "unfamiliar" as const },
];

const categoryMarks: Record<CategoryKey, string> = {
  life: styles.roleMark,
  home: styles.rhythmMark,
  relationship: styles.relationshipMark,
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

export function CategoryExplorer({ breeds, mode = "history" }: { breeds: readonly Breed[]; mode?: "history" | "quick" }) {
  const [activeKey, setActiveKey] = useState<CategoryKey>("life");
  const [activeLabel, setActiveLabel] = useState(categories[0].resultLabel);
  const [activeSlugs, setActiveSlugs] = useState(categories[0].slugs);
  const activeCategory = categories.find((category) => category.key === activeKey) ?? categories[0];
  const breedBySlug = useMemo(() => new Map(breeds.map((breed) => [breed.slug, breed])), [breeds]);
  const results = activeSlugs.flatMap((slug) => {
    const breed = breedBySlug.get(slug);
    return breed ? [breed] : [];
  });

  if (mode === "quick") {
    return (
      <section className={`${styles.explorer} ${styles.quickExplorer}`} id="lenses" aria-labelledby="explorer-title">
        <div className={styles.eyebrow}>처음이라면 여기부터</div>
        <h2 id="explorer-title">내가 원하는 생활부터 골라보세요.</h2>
        <p className={styles.intro}>원하는 생활을 하나 골라 가볍게 시작해보세요.</p>
        <div className={styles.quickStartGrid} role="list" aria-label="견종 발견 빠른 시작">
          {firstExploreOptions.map((option) => (
            <Link className={styles.quickStartCard} href={option.query ? `/discover?${option.query}` : "/discover"} key={option.label}>
              <DogIcon name={option.icon} className={styles.quickIcon} />
              <strong>{option.label}</strong>
              <span>{option.description}</span>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.explorer} id="lenses" aria-labelledby="explorer-title">
      <div className={styles.eyebrow}>견종을 살펴보는 관점</div>
      <h2 id="explorer-title">어떤 관점으로 견종을 살펴볼까요?</h2>
      <p className={styles.intro}>정답이나 추천 순위 대신, 각 견종이 살아온 배경과 오늘의 생활 조건을 여러 방향에서 비교해볼 수 있어요.</p>

      <div className={styles.categoryHeading}>
        <h3>먼저 큰 질문을 골라보세요</h3>
        <p>세 가지 방향으로 빠르게 둘러볼 수 있어요</p>
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
              onClick={() => { setActiveKey(category.key); setActiveLabel(category.resultLabel); setActiveSlugs(category.slugs); }}
            >
              <span className={`${styles.categoryMark} ${categoryMarks[category.key]}`} aria-hidden="true" />
              <strong>{category.title}</strong>
              <span>{category.description}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.quickFilters} aria-label="빠른 탐색">
        <span>빠른 탐색</span>
        {quickFilters.map((filter) => (
          <button className={activeLabel === filter.label ? styles.quickActive : ""} type="button" key={filter.key} onClick={() => { setActiveKey(filter.category); setActiveLabel(filter.label); setActiveSlugs(filter.slugs); }}>
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.results} aria-live="polite">
        <div className={styles.resultsHeading}>
          <h3>{activeCategory.title}</h3>
          <p>이 관점으로 살펴볼 견종</p>
        </div>
        <div className={styles.chips} aria-label={`${activeCategory.resultLabel} 선택`}>
          <span className={styles.selectedChip}>{activeLabel}</span>
          <span className={styles.chipHint}>순위 없이 편집된 대표 견종을 먼저 보여드려요</span>
        </div>
        <div className={styles.resultGrid}>
          {results.map((breed) => (
            <Link className={styles.resultCard} href={`/breeds/${breed.slug}`} key={breed.slug}>
              <BreedVisual breed={breed} variant="tile" />
              <div className={styles.resultCopy}>
                <span>{breed.identity.origin} · {registryLabels[breed.slug] ?? breed.catalog.discoveryTags[0]}</span>
                <strong>{breed.nameKo}</strong>
                <em>{breed.catalog.discoveryTags[0]}</em>
              </div>
            </Link>
          ))}
        </div>
        <Link className={styles.allLink} href="/discover">전체 도감에서 더 살펴보기 →</Link>
      </div>
    </section>
  );
}
