"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import {
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
import { useHistoryEntryState } from "@/lib/history-entry-state";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
import { presentBreedOrigin } from "@/lib/breed-origin-presentation";
import styles from "./discover-explorer.module.css";

const sizeOptions: Array<{ value: BreedSize; label: string }> = [
  { value: "small", label: "소형" },
  { value: "medium", label: "중형" },
  { value: "large", label: "대형" },
  { value: "giant", label: "초대형" },
];

const tendencyFields: Array<{ key: TendencyFilterKey; label: string; queryLabel: string; description: string }> = [
  { key: "activity", label: "활동량", queryLabel: "활동량", description: "산책·놀이처럼 반복해서 필요한 신체 활동의 정도" },
  { key: "mentalStimulation", label: "정신적 자극", queryLabel: "정신적 자극", description: "냄새 탐색·학습·문제 해결처럼 머리를 쓰는 활동의 필요" },
  { key: "socialConnection", label: "사람과의 교감", queryLabel: "교감", description: "사람 곁에 머물며 상호작용을 찾는 경향" },
  { key: "independence", label: "독립성", queryLabel: "독립성", description: "스스로 판단하거나 거리를 조절하려는 경향" },
  { key: "alerting", label: "주변 변화에 대한 반응", queryLabel: "주변 반응", description: "소리·방문객·움직임을 알아차리고 알리는 경향" },
  { key: "grooming", label: "털 관리", queryLabel: "털 관리", description: "빗질·털갈이·세정·미용에 드는 반복 관리 부담" },
];

const tendencyOptions: Array<{ value: TendencyLevel; label: string }> = [
  { value: "low", label: "낮은 편" },
  { value: "medium", label: "중간" },
  { value: "high", label: "높은 편" },
];

const INITIAL_RESULT_COUNT = 48;
const RESULT_BATCH_SIZE = 48;
const isValidVisibleCount = (value: unknown): value is number => (
  Number.isInteger(value) && Number(value) >= INITIAL_RESULT_COUNT
);

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
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const filterPanelRef = useRef<HTMLElement>(null);
  const closeFilterRef = useRef<HTMLButtonElement>(null);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const pendingQueryRef = useRef<string | null>(null);
  const queryString = searchParams.toString();
  const syncedQueryRef = useRef(queryString);
  const urlFilters = useMemo(() => parseBreedFilters(new URLSearchParams(queryString)), [queryString]);
  const [filters, setFilters] = useState<BreedFilters>(() => urlFilters);
  const [visibleCount, setVisibleCount] = useHistoryEntryState(
    "discoverVisibleCount",
    INITIAL_RESULT_COUNT,
    isValidVisibleCount,
  );
  const filtersRef = useRef(filters);
  const results = useMemo(() => filterBreeds(breeds, filters), [breeds, filters]);
  const visibleResults = useMemo(() => results.slice(0, visibleCount), [results, visibleCount]);
  const activeCount = Object.values(filters).reduce((count, values) => count + values.length, 0);

  useEffect(() => {
    if (pendingQueryRef.current !== null) {
      if (queryString === pendingQueryRef.current) {
        pendingQueryRef.current = null;
        syncedQueryRef.current = queryString;
      }
      return;
    }

    if (queryString === syncedQueryRef.current) return;

    syncedQueryRef.current = queryString;
    filtersRef.current = urlFilters;
    setFilters(urlFilters);
    setVisibleCount(INITIAL_RESULT_COUNT);
  }, [queryString, setVisibleCount, urlFilters]);

  useEffect(() => {
    if (!filterOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeFilterRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setFilterOpen(false);
        requestAnimationFrame(() => filterTriggerRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [...(filterPanelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [])].filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterOpen]);

  useEffect(() => {
    const sentinel = infiniteScrollRef.current;
    if (!sentinel || visibleResults.length >= results.length) return;
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
      setVisibleCount((count) => Math.min(count + RESULT_BATCH_SIZE, results.length));
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
  }, [results.length, setVisibleCount, visibleResults.length]);

  function closeMobileFilters() {
    setFilterOpen(false);
    requestAnimationFrame(() => filterTriggerRef.current?.focus());
  }

  function commitFilters(nextFilters: BreedFilters) {
    filtersRef.current = nextFilters;
    setFilters(nextFilters);
    setVisibleCount(INITIAL_RESULT_COUNT);
    const query = filtersToSearchParams(nextFilters).toString();
    pendingQueryRef.current = query;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFilter(key: "size" | TendencyFilterKey, value: string) {
    const next = cloneFilters(filtersRef.current);
    const values = next[key] as string[];
    next[key] = (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]) as never;
    commitFilters(next);
  }

  function clearOne(key: "size" | TendencyFilterKey, value: string) {
    const next = cloneFilters(filtersRef.current);
    next[key] = (next[key] as string[]).filter((item) => item !== value) as never;
    commitFilters(next);
  }

  function selectedLabel(key: "size" | TendencyFilterKey, value: string) {
    if (key === "size") return `체구 · ${sizeOptions.find((option) => option.value === value)?.label ?? value}`;
    const field = tendencyFields.find((option) => option.key === key);
    const level = tendencyOptions.find((option) => option.value === value)?.label ?? value;
    return `${field?.queryLabel ?? field?.label ?? key} · ${level}`;
  }

  const selectedEntries = (Object.entries(filters) as Array<["size" | TendencyFilterKey, string[]]>).flatMap(([key, values]) => values.map((value) => ({ key, value })));

  return (
    <div className={styles.explorer}>
      <div className={styles.mobileFilterBar}>
        <button ref={filterTriggerRef} className={styles.filterTrigger} type="button" aria-controls="breed-filter-panel" aria-expanded={filterOpen} onClick={() => setFilterOpen(true)}>
          <span className={styles.filterLabel}>
            <svg className={styles.filterIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h5m4 0h7M4 17h9m4 0h3M9 4v6m4 4v6" />
            </svg>
            <span>조건 필터</span>
          </span>
          <span className={styles.filterAction}>
            {activeCount > 0 && <strong aria-label={`선택한 필터 ${activeCount}개`}>{activeCount}</strong>}
            <span>열기</span>
            <span className={styles.filterChevron} aria-hidden="true">›</span>
          </span>
        </button>
        {activeCount > 0 && <button className={styles.clearFilters} type="button" aria-label="선택한 필터 모두 지우기" onClick={() => commitFilters(emptyBreedFilters())}>선택 지우기</button>}
      </div>

      <div className={`${styles.filterLayout} ${filterOpen ? styles.filterOpen : ""}`}>
        {filterOpen && <button className={styles.backdrop} type="button" aria-label="필터 닫기" onClick={closeMobileFilters} />}
        <aside ref={filterPanelRef} id="breed-filter-panel" className={styles.filterPanel} role={filterOpen ? "dialog" : undefined} aria-modal={filterOpen || undefined} aria-labelledby="breed-filter-title">
          <div className={styles.filterPanelHeader}>
            <div><span>조건 선택</span><h2 id="breed-filter-title">어떤 기준으로 살펴볼까요?</h2></div>
            <button ref={closeFilterRef} className={styles.closeFilter} type="button" aria-label="필터 닫기" onClick={closeMobileFilters}>×</button>
          </div>

          <fieldset>
            <legend><span className={styles.filterLegendLabel}>체구</span></legend>
            <div className={styles.optionGrid}>
              {sizeOptions.map((option) => <button type="button" key={option.value} aria-pressed={filters.size.includes(option.value)} onClick={() => toggleFilter("size", option.value)}>{option.label}</button>)}
            </div>
          </fieldset>

          {tendencyFields.map((field) => (
            <fieldset key={field.key}>
              <legend><span className={styles.filterLegendLabel}>{field.label}</span></legend>
              <div className={styles.optionGrid}>
                {tendencyOptions.map((option) => <button type="button" key={option.value} aria-pressed={filters[field.key].includes(option.value)} onClick={() => toggleFilter(field.key, option.value)}>{option.label}</button>)}
              </div>
            </fieldset>
          ))}

          <details className={styles.filterGuide}>
            <summary>필터 기준 알아보기</summary>
            <div>
              <p>낮음·중간·높음은 점수나 보장값이 아니라, 품종의 역사적 역할과 현재 생활·관리 정보를 종합한 편집 분류예요.</p>
              <dl>
                {tendencyFields.map((field) => (
                  <div key={field.key}><dt>{field.label}</dt><dd>{field.description}</dd></div>
                ))}
              </dl>
              <small>같은 견종도 개체와 생활 환경에 따라 달라질 수 있어요.</small>
            </div>
          </details>

          <button className={styles.applyFilter} type="button" onClick={closeMobileFilters}>{activeCount > 0 ? `${results.length}종 결과 보기` : `전체 ${results.length}종 보기`}</button>
        </aside>

        <section className={styles.resultsPanel} aria-live="polite" aria-labelledby="discover-results-title">
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
            {visibleResults.map((breed) => {
              const size = getBreedFilterValue(breed, "size");
              const defaultHighlights: Array<{ key: "size" | TendencyFilterKey; label: string }> = [
                ...(size ? [{ key: "size" as const, label: selectedLabel("size", size) }] : []),
                { key: "activity" as const, label: `활동량 · ${breed.tendencies.activity.label}` },
              ];
              const highlights: Array<{ key: "size" | TendencyFilterKey; label: string }> = activeCount > 0
                ? selectedEntries
                  .map(({ key, value }) => {
                    const matches = key === "size"
                      ? getBreedFilterValue(breed, "size") === value as BreedSize
                      : getBreedFilterValue(breed, key) === value;
                    return matches ? { key, label: selectedLabel(key, value) } : undefined;
                  })
                  .filter((highlight): highlight is { key: "size" | TendencyFilterKey; label: string } => Boolean(highlight))
                : defaultHighlights;
              return (
                <Link className={styles.resultCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 이야기 보기`}>
                  <BreedVisual breed={breed} variant="tile" />
                  <div className={styles.resultCopy}>
                    <div className={styles.resultMeta}><span>{breed.nameEn}</span><span>{presentBreedOrigin(breed.identity.origin)}</span></div>
                    {isKoreanManagedBreed(breed.slug) && <span className={styles.legalBadge}>대한민국 법령상 맹견</span>}
                    <h2>{breed.nameKo}</h2>
                    <div className={styles.resultHighlights}>{highlights.map((highlight) => <span className={styles[`resultHighlight_${highlight.key}`]} key={`${highlight.key}-${highlight.label}`}>{highlight.label}</span>)}</div>
                    <p>{breed.tagline}</p>
                    <span className={styles.resultDetail}>상세 이야기 보기 →</span>
                  </div>
                </Link>
              );
            })}
          </div>
          {visibleResults.length < results.length && (
            <div className={styles.infiniteScroll} ref={infiniteScrollRef} role="status" aria-live="polite">
              <span className={styles.loadingMark} aria-hidden="true" />
              <span>{visibleResults.length} / {results.length}마리 · 아래로 내리면 계속 보여요</span>
            </div>
          )}
          {results.length === 0 && <div className={styles.emptyState}><h2>이 조건에 맞는 견종이 아직 없어요.</h2><p>조건을 하나씩 줄이거나 선택을 모두 지우고 다시 살펴보세요.</p><button type="button" onClick={() => commitFilters(emptyBreedFilters())}>선택 지우기</button></div>}
        </section>
      </div>
    </div>
  );
}
