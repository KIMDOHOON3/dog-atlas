"use client";

import Link from "next/link";
import { memo } from "react";
import { BreedVisual } from "@/components/breed-visual";
import {
  getBreedFilterValue,
  getBreedSizeClasses,
  type BreedSize,
  type TendencyFilterKey,
} from "@/lib/breed-filters";
import type { DiscoverBreed } from "@/lib/discover-breeds";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
import { presentBreedOrigin } from "@/lib/breed-origin-presentation";
import styles from "./discover-explorer.module.css";

export type SelectedEntry = {
  key: "size" | TendencyFilterKey;
  value: string;
  label: string;
};

export const DiscoverResultGrid = memo(function DiscoverResultGrid({
  breeds,
  selectedEntries,
}: {
  breeds: readonly DiscoverBreed[];
  selectedEntries: readonly SelectedEntry[];
}) {
  return (
    <div className={styles.resultGrid}>
      {breeds.map((breed) => {
        const sizes = getBreedSizeClasses(breed);
        const showSizeHighlight =
          sizes.length > 0 || breed.sizeDisplay?.startsWith("유형별");
        const defaultHighlights: Array<{
          key: "size" | TendencyFilterKey;
          label: string;
        }> = [
          ...(showSizeHighlight && breed.sizeDisplay
            ? [{ key: "size" as const, label: `체구 · ${breed.sizeDisplay}` }]
            : []),
          {
            key: "activity" as const,
            label: `활동량 · ${breed.tendencies.activity.label}`,
          },
        ];
        const highlights: Array<{
          key: "size" | TendencyFilterKey;
          label: string;
        }> =
          selectedEntries.length > 0
            ? selectedEntries
                .map(({ key, value, label }) => {
                  const matches =
                    key === "size"
                      ? sizes.includes(value as BreedSize)
                      : getBreedFilterValue(breed, key) === value;
                  return matches ? { key, label: label } : undefined;
                })
                .filter(
                  (
                    highlight,
                  ): highlight is {
                    key: "size" | TendencyFilterKey;
                    label: string;
                  } => Boolean(highlight),
                )
            : defaultHighlights;
        return (
          <Link
            className={styles.resultCard}
            href={`/breeds/${breed.slug}`}
            prefetch={false}
            key={breed.slug}
            aria-label={`${breed.nameKo} 상세 이야기 보기`}
          >
            <BreedVisual breed={breed} variant="tile" />
            <div className={styles.resultCopy}>
              <div className={styles.resultMeta}>
                <span>{breed.nameEn}</span>
                <span>{presentBreedOrigin(breed.identity.origin)}</span>
              </div>
              {isKoreanManagedBreed(breed.slug) && (
                <span className={styles.legalBadge}>대한민국 법령상 맹견</span>
              )}
              <h2>{breed.nameKo}</h2>
              <div className={styles.resultHighlights}>
                {highlights.map((highlight) => (
                  <span
                    className={styles[`resultHighlight_${highlight.key}`]}
                    key={`${highlight.key}-${highlight.label}`}
                  >
                    {highlight.label}
                  </span>
                ))}
              </div>
              <p>{breed.tagline}</p>
              <span className={styles.resultDetail}>상세 이야기 보기 →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
});
