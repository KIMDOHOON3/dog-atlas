"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchBox, type BreedOption } from "@/components/search-box";
import { applyBreedFilterPreset, breedFilterPresets, emptyBreedFilters, filtersToSearchParams, parseBreedFilters } from "@/lib/breed-filters";
import styles from "./discover-search.module.css";

const quickPresets = breedFilterPresets.filter((preset) => ["calm", "active", "social", "grooming-light"].includes(preset.key));

export function DiscoverSearch({ breeds }: { breeds: BreedOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sourceRef = useRef<HTMLElement>(null);
  const [showDock, setShowDock] = useState(false);
  const [open, setOpen] = useState(false);
  const queryString = searchParams.toString();
  const activeFilters = useMemo(() => parseBreedFilters(new URLSearchParams(queryString)), [queryString]);

  function applyPreset(preset: (typeof breedFilterPresets)[number]) {
    const presetFilters = applyBreedFilterPreset(preset);
    const active = JSON.stringify(activeFilters) === JSON.stringify(presetFilters);
    const next = active ? emptyBreedFilters() : presetFilters;
    const query = filtersToSearchParams(next).toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  useEffect(() => {
    const source = sourceRef.current;
    if (!source || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      const passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      setShowDock(passed);
      if (!passed) setOpen(false);
    });
    observer.observe(source);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sourceRef} className={styles.source} aria-labelledby="discover-search-title">
        <h2 id="discover-search-title">견종 이름 검색</h2>
        <SearchBox id="discover-breed-search" breeds={breeds} />
        <div className={styles.presets} aria-label="생활 조건 빠른 선택">
          {quickPresets.map((preset) => {
            const presetFilters = applyBreedFilterPreset(preset);
            const active = JSON.stringify(activeFilters) === JSON.stringify(presetFilters);
            return <button type="button" key={preset.key} aria-pressed={active} onClick={() => applyPreset(preset)}>{preset.label}</button>;
          })}
        </div>
      </section>
      {showDock && (
        <div className={`${styles.dock} ${open ? styles.open : ""}`}>
          <button className={styles.trigger} type="button" aria-expanded={open} aria-controls="discover-search-dock" onClick={() => setOpen((value) => !value)}>
            <span aria-hidden="true">⌕</span> 견종 검색
          </button>
          {open && (
            <div className={styles.panel} id="discover-search-dock">
              <SearchBox id="discover-breed-search-dock" breeds={breeds} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
