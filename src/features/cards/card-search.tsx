"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createBreedSearchIndex,
  normalizeBreedQuery,
  searchBreedIndex,
  type BreedSearchOption,
} from "@/lib/breeds/breed-search-index";
import { SizeSelector, type CardSize } from "./size-selector";
import styles from "./card-search.module.css";

export type CardSearchEntry = {
  name: string;
  nameEn: string;
  slug: string;
  size: CardSize;
  index: number;
  image: string;
};
export function CardSearch({
  size,
  entries,
  breeds,
  disabled,
  onSize,
  onSelect,
}: {
  size: CardSize;
  entries: CardSearchEntry[];
  breeds?: BreedSearchOption[];
  disabled: boolean;
  onSize: (size: CardSize) => void;
  onSelect: (entry: CardSearchEntry) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const index = useMemo(
    () =>
      createBreedSearchIndex(
        (
          breeds ??
          entries.map<BreedSearchOption>((entry) => ({
            slug: entry.slug,
            nameKo: entry.name,
            nameEn: entry.nameEn,
            imageSrc: entry.image,
          }))
        ).map((breed) => {
          const card = entries.find((entry) => entry.slug === breed.slug);
          return card
            ? {
                ...breed,
                nameKo: card.name,
                nameEn: card.nameEn,
                aliases: [...(breed.aliases ?? []), breed.nameKo, breed.nameEn],
              }
            : breed;
        }),
      ),
    [breeds, entries],
  );
  const matches = searchBreedIndex(index, normalizeBreedQuery(query));
  const choose = (breed: BreedSearchOption, restoreFocus = true) => {
    setOpen(false);
    setQuery("");
    if (!restoreFocus) input.current?.blur();
    const entry = entries.find((entry) => entry.slug === breed.slug);
    if (entry) onSelect(entry);
    else router.push(`/breeds/${breed.slug}`);
    if (restoreFocus) input.current?.focus({ preventScroll: true });
  };
  return (
    <div
      className={styles.root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
          setCategory(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          setCategory(false);
          input.current?.focus();
        }
      }}
    >
      <form
        className={styles.bar}
        role="search"
        aria-label="전체 견종 검색"
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0] && !disabled) choose(matches[0]);
          else setOpen(true);
        }}
      >
        <input
          ref={input}
          aria-label="견종 이름 검색"
          placeholder="견종 검색"
          value={query}
          maxLength={80}
          onFocus={() => {
            setOpen(true);
            setCategory(false);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              e.currentTarget
                .closest(`.${styles.root}`)
                ?.querySelector<HTMLButtonElement>("[data-search-result]")
                ?.focus();
            }
          }}
        />
        <button
          type="button"
          className={styles.category}
          aria-label="견종 분류"
          aria-expanded={category}
          aria-controls="card-categories"
          disabled={disabled}
          onClick={() => {
            setCategory(!category);
            setOpen(false);
          }}
        >
          {size}
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        <button
          className={styles.submit}
          type="submit"
          aria-label="검색"
          disabled={disabled}
        >
          <span className={styles.glass} aria-hidden="true" />
        </button>
      </form>
      {category && (
        <div
          id="card-categories"
          className={`${styles.panel} ${styles.categoryPanel}`}
        >
          <SizeSelector
            value={size}
            onChange={(next) => {
              onSize(next);
              setCategory(false);
            }}
          />
        </div>
      )}
      {open && query.trim() && (
        <div className={styles.panel} aria-label="검색 결과">
          <p role="status">
            {matches.length
              ? "카드 또는 상세 이야기로 만나보세요"
              : "일치하는 견종이 없어요"}
          </p>
          {matches.map((breed) => (
            <button
              type="button"
              data-search-result
              key={breed.slug}
              disabled={disabled}
              onClick={(event) => choose(breed, event.detail === 0)}
            >
              <Image
                src={breed.imageSrc}
                alt=""
                width={44}
                height={44}
                unoptimized
                className={styles.thumbnail}
              />
              <span>{breed.nameKo}</span>
              <small>
                {entries.find((entry) => entry.slug === breed.slug)?.size ??
                  "상세 보기"}
              </small>
            </button>
          ))}
          <Link href="/discover">견종 발견에서 더 찾아보기 ↗</Link>
        </div>
      )}
    </div>
  );
}
