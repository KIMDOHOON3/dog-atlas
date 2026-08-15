"use client";

import { useEffect, useRef, useState } from "react";
import { SearchBox, type BreedOption } from "@/components/search-box";
import styles from "./discover-search.module.css";

export function DiscoverSearch({ breeds }: { breeds: BreedOption[] }) {
  const sourceRef = useRef<HTMLElement>(null);
  const [showDock, setShowDock] = useState(false);
  const [open, setOpen] = useState(false);

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
        <h2 id="discover-search-title">이미 아는 견종이 있나요?</h2>
        <SearchBox id="discover-breed-search" breeds={breeds} />
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
