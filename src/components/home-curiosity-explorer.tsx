"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import type { HomeCuriosityTheme, HomeCuriosityThemeKey } from "@/content/home-curiosity";
import styles from "./home-curiosity-explorer.module.css";

type Props = {
  breeds: Breed[];
  themes: Array<Pick<HomeCuriosityTheme, "key" | "label" | "thumbnailSlug" | "heading" | "description" | "selectionNote" | "moreLabel" | "items">>;
};

export function HomeCuriosityExplorer({ breeds, themes }: Props) {
  const [activeKey, setActiveKey] = useState<HomeCuriosityThemeKey>("distinctive-coats");
  const themeScrollerRef = useRef<HTMLDivElement>(null);
  const activeThemeButtonRef = useRef<HTMLButtonElement>(null);
  const hasAlignedTheme = useRef(false);
  const activeTheme = themes.find((theme) => theme.key === activeKey) ?? themes[0];
  const breedsBySlug = new Map(breeds.map((breed) => [breed.slug, breed]));
  const featuredItems = activeTheme.items.slice(0, 3).flatMap((item) => {
    const breed = breedsBySlug.get(item.slug);
    return breed ? [{ ...item, breed }] : [];
  });

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const scroller = themeScrollerRef.current;
      const button = activeThemeButtonRef.current;
      if (!scroller || !button || typeof scroller.scrollTo !== "function") return;

      const left = button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scroller.scrollTo({
        left: Math.max(0, left),
        behavior: hasAlignedTheme.current && !reduceMotion ? "smooth" : "auto",
      });
      hasAlignedTheme.current = true;
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeKey]);

  return (
    <section className={styles.section} id="curiosity" aria-labelledby="curiosity-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>
          <CuriosityGlyph />
          견종 호기심 탐험
        </p>
        <h2 id="curiosity-title">오늘은 어떤 강아지가 궁금하세요?</h2>
        <p>궁금한 주제를 고르고 세 견종을 가볍게 만나보세요.</p>
      </header>

      <div className={styles.themeScroller} ref={themeScrollerRef} role="group" aria-label="호기심 주제 선택">
        <div className={styles.themeList}>
          {themes.map((theme) => {
            const thumbnailBreed = breedsBySlug.get(theme.thumbnailSlug);
            const selected = theme.key === activeTheme.key;
            if (!thumbnailBreed) return null;

            return (
              <button
                className={styles.themeButton}
                type="button"
                key={theme.key}
                ref={selected ? activeThemeButtonRef : undefined}
                aria-label={theme.label}
                aria-pressed={selected}
                onClick={() => setActiveKey(theme.key)}
              >
                <BreedVisual breed={thumbnailBreed} variant="tile" />
                <span>{theme.label}</span>
                {selected && <CheckGlyph />}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.featurePanel} aria-live="polite" aria-atomic="true">
        <div className={styles.featureHeader}>
          <div>
            <h3>{activeTheme.heading}</h3>
            <p>{activeTheme.description}</p>
          </div>
          <Link href={`/curiosity/${activeTheme.key}`}>
            {activeTheme.moreLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.breedGrid}>
          {featuredItems.map(({ breed, fact }) => (
            <Link
              className={styles.breedCard}
              href={`/breeds/${breed.slug}`}
              key={breed.slug}
              aria-label={`${breed.nameKo} 상세 정보 보기`}
            >
              <BreedVisual breed={breed} variant="card" />
              <div>
                <small>{breed.nameEn}</small>
                <strong>{breed.nameKo}</strong>
                <p>{fact}</p>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        <Link className={styles.mobileMore} href={`/curiosity/${activeTheme.key}`}>
          {activeTheme.moreLabel} <span aria-hidden="true">→</span>
        </Link>
        <p className={styles.context}>{activeTheme.selectionNote}</p>
      </div>
    </section>
  );
}

function CuriosityGlyph() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="17" cy="17" r="11" />
      <path d="m25 25 9 9M13 18c0-3 2-5 5-5 2.7 0 4.7 1.7 4.7 4.1 0 2.8-2.8 3.4-4.1 5.1-.6.8-.7 1.4-.7 2.2M17.9 28h.1" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <span className={styles.check} aria-hidden="true">
      <svg viewBox="0 0 20 20"><path d="m5 10 3 3 7-7" /></svg>
    </span>
  );
}
