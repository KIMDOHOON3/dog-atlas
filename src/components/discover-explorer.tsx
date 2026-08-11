"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import {
  applyBreedFilterPreset,
  breedFilterPresets,
  emptyBreedFilters,
  filterBreeds,
  filtersToSearchParams,
  getBreedFilterValue,
  parseBreedFilters,
  type BreedFilters,
  type BreedSize,
  type TendencyFilterKey,
  type TendencyLevel,
} from "@/lib/breed-filters";
import styles from "./discover-explorer.module.css";

const sizeOptions: Array<{ value: BreedSize; label: string }> = [
  { value: "small", label: "소형" },
  { value: "medium", label: "중형" },
  { value: "large", label: "대형" },
  { value: "giant", label: "초대형" },
];

const tendencyFields: Array<{ key: TendencyFilterKey; label: string; queryLabel: string }> = [
  { key: "activity", label: "활동량", queryLabel: "활동량" },
  { key: "mentalStimulation", label: "정신적 자극", queryLabel: "정신적 자극" },
  { key: "socialConnection", label: "사람과의 교감", queryLabel: "교감" },
  { key: "independence", label: "독립성", queryLabel: "독립성" },
  { key: "alerting", label: "주변 변화에 대한 반응", queryLabel: "주변 반응" },
  { key: "grooming", label: "털 관리", queryLabel: "털 관리" },
];

const tendencyOptions: Array<{ value: TendencyLevel; label: string }> = [
  { value: "low", label: "낮은 편" },
  { value: "medium", label: "중간" },
  { value: "high", label: "높은 편" },
];

function cloneFilters(filters: BreedFilters): BreedFilters {
  return {
    size: [...filters.size],
    activity: [...filters.activity],
    mentalStimulation: [...filters.mentalStimulation],
    socialConnection: [...filters.socialConnection],
    independence: [...filters.independence],
    alerting: [...filters.alerting],
    grooming: [...filters.grooming],
  };
}

export function DiscoverExplorer({ breeds }: { breeds: readonly Breed[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const queryString = searchParams.toString();
  const filters = useMemo(() => parseBreedFilters(new URLSearchParams(queryString)), [queryString]);
  const results = useMemo(() => filterBreeds(breeds, filters), [breeds, filters]);
  const activeCount = Object.values(filters).reduce((count, values) => count + values.length, 0);

  function commitFilters(nextFilters: BreedFilters) {
    const query = filtersToSearchParams(nextFilters).toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFilter(key: "size" | TendencyFilterKey, value: string) {
    const next = cloneFilters(filters);
    const values = next[key] as string[];
    next[key] = (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]) as never;
    commitFilters(next);
  }

  function clearOne(key: "size" | TendencyFilterKey, value: string) {
    const next = cloneFilters(filters);
    next[key] = (next[key] as string[]).filter((item) => item !== value) as never;
    commitFilters(next);
  }

  function selectedLabel(key: "size" | TendencyFilterKey, value: string) {
    if (key === "size") return sizeOptions.find((option) => option.value === value)?.label ?? value;
    const field = tendencyFields.find((option) => option.key === key);
    const level = tendencyOptions.find((option) => option.value === value)?.label ?? value;
    return `${field?.queryLabel ?? field?.label ?? key} ${level}`;
  }

  const selectedEntries = (Object.entries(filters) as Array<["size" | TendencyFilterKey, string[]]>).flatMap(([key, values]) => values.map((value) => ({ key, value })));

  return (
    <div className={styles.explorer}>
      <div className={styles.mobileFilterBar}>
        <button className={styles.filterTrigger} type="button" aria-expanded={filterOpen} onClick={() => setFilterOpen(true)}>
          <span>필터</span>
          {activeCount > 0 && <strong aria-label={`선택한 필터 ${activeCount}개`}>{activeCount}</strong>}
        </button>
        {activeCount > 0 && <button className={styles.clearFilters} type="button" aria-label="선택한 필터 모두 지우기" onClick={() => commitFilters(emptyBreedFilters())}>선택 지우기</button>}
      </div>

      <div className={`${styles.filterLayout} ${filterOpen ? styles.filterOpen : ""}`}>
        {filterOpen && <button className={styles.backdrop} type="button" aria-label="필터 닫기" onClick={() => setFilterOpen(false)} />}
        <aside className={styles.filterPanel} aria-label="견종 필터">
          <div className={styles.filterPanelHeader}>
            <div><span>조건 선택</span><h2>어떤 기준으로 살펴볼까요?</h2></div>
            <button className={styles.closeFilter} type="button" aria-label="필터 닫기" onClick={() => setFilterOpen(false)}>×</button>
          </div>

          <fieldset>
            <legend>체구</legend>
            <div className={styles.optionGrid}>
              {sizeOptions.map((option) => <button type="button" key={option.value} aria-pressed={filters.size.includes(option.value)} onClick={() => toggleFilter("size", option.value)}>{option.label}</button>)}
            </div>
          </fieldset>

          {tendencyFields.map((field) => (
            <fieldset key={field.key}>
              <legend>{field.label}</legend>
              <div className={styles.optionGrid}>
                {tendencyOptions.map((option) => <button type="button" key={option.value} aria-pressed={filters[field.key].includes(option.value)} onClick={() => toggleFilter(field.key, option.value)}>{option.label}</button>)}
              </div>
            </fieldset>
          ))}

          <button className={styles.applyFilter} type="button" onClick={() => setFilterOpen(false)}>{activeCount > 0 ? `${results.length}종 결과 보기` : `전체 ${results.length}종 보기`}</button>
        </aside>

        <section className={styles.resultsPanel} aria-live="polite" aria-labelledby="discover-results-title">
          <div className={styles.quickExplore}>
            <div><span>빠른 탐색</span><p>한 번 눌러 바로 살펴보세요.</p></div>
            <div className={styles.presetList}>
              {breedFilterPresets.map((preset) => {
                const presetFilters = applyBreedFilterPreset(preset);
                const active = JSON.stringify(filters) === JSON.stringify(presetFilters);
                return <button type="button" className={active ? styles.presetActive : ""} aria-pressed={active} key={preset.key} onClick={() => commitFilters(active ? emptyBreedFilters() : presetFilters)}>{preset.label}</button>;
              })}
            </div>
          </div>

          <div className={styles.resultHeader}>
            <div><span>견종 발견</span><h1 id="discover-results-title">{activeCount > 0 ? `${results.length}종을 찾았어요` : `${breeds.length}종을 살펴보세요`}</h1></div>
            {activeCount > 0 && <button className={styles.resultClear} type="button" aria-label="선택한 필터 모두 지우기" onClick={() => commitFilters(emptyBreedFilters())}>선택 지우기</button>}
          </div>

          {selectedEntries.length > 0 && (
            <div className={styles.selectedChips} aria-label="선택한 필터">
              {selectedEntries.map(({ key, value }) => <button type="button" key={`${key}-${value}`} aria-label={`${selectedLabel(key, value)} 필터 제거`} onClick={() => clearOne(key, value)}>{selectedLabel(key, value)} <span aria-hidden="true">×</span></button>)}
            </div>
          )}

          <div className={styles.resultGrid}>
            {results.map((breed) => {
              const highlights = activeCount > 0
                ? selectedEntries.slice(0, 3).map(({ key }) => key === "size" ? sizeOptions.find((option) => getBreedFilterValue(breed, "size").includes(option.value))?.label : tendencyOptions.find((option) => option.value === getBreedFilterValue(breed, key))?.label).filter(Boolean)
                : [sizeOptions.find((option) => getBreedFilterValue(breed, "size").includes(option.value))?.label, breed.tendencies.activity.label].filter(Boolean);
              return (
                <article className={styles.resultCard} key={breed.slug}>
                  <BreedVisual breed={breed} variant="tile" />
                  <div className={styles.resultCopy}>
                    <div className={styles.resultMeta}><span>{breed.nameEn}</span><span>{breed.identity.origin}</span></div>
                    <h2>{breed.nameKo}</h2>
                    <div className={styles.resultHighlights}>{highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
                    <p>{breed.tagline}</p>
                    <Link href={`/breeds/${breed.slug}`}>상세 이야기 보기 →</Link>
                  </div>
                </article>
              );
            })}
          </div>
          {results.length === 0 && <div className={styles.emptyState}><h2>이 조건에 맞는 견종이 아직 없어요.</h2><p>조건을 하나씩 줄이거나 선택을 모두 지우고 다시 살펴보세요.</p><button type="button" onClick={() => commitFilters(emptyBreedFilters())}>선택 지우기</button></div>}
        </section>
      </div>
    </div>
  );
}
