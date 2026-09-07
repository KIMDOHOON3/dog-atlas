"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
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
const normalize = (text: string) =>
  text.toLocaleLowerCase().replace(/[\s-]/g, "");
const aliases: Record<string, string[]> = {
  "miniature-pinscher": ["미니핀"],
  "miniature-schnauzer": ["슈나우저"],
  "pembroke-welsh-corgi": ["웰시코기", "코기"],
  pomeranian: ["포메"],
  "labrador-retriever": ["래브라도", "라브라도"],
  "yorkshire-terrier": ["요키"],
  "german-shepherd-dog": ["저먼셰퍼드", "독일셰퍼드"],
};
export function CardSearch({
  size,
  entries,
  disabled,
  onSize,
  onSelect,
}: {
  size: CardSize;
  entries: CardSearchEntry[];
  disabled: boolean;
  onSize: (size: CardSize) => void;
  onSelect: (entry: CardSearchEntry) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const matches = query.trim()
    ? entries
        .filter((e) =>
          normalize(
            [e.name, e.nameEn, ...(aliases[e.slug] ?? [])].join(" "),
          ).includes(normalize(query)),
        )
        .slice(0, 8)
    : [];
  const choose = (entry: CardSearchEntry) => {
    setOpen(false);
    setQuery("");
    onSelect(entry);
    input.current?.focus();
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
        aria-label="견종 카드 검색"
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0] && !disabled) choose(matches[0]);
          else setOpen(true);
        }}
      >
        <input
          ref={input}
          aria-label="견종 이름 검색"
          placeholder="어떤 견종이 궁금하세요?"
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
            {matches.length ? "카드로 만나보기" : "일치하는 카드가 없어요"}
          </p>
          {matches.map((entry) => (
            <button
              type="button"
              data-search-result
              key={entry.slug}
              disabled={disabled}
              onClick={() => choose(entry)}
            >
              <Image
                src={entry.image}
                alt=""
                width={44}
                height={44}
                unoptimized
                className={styles.thumbnail}
              />
              <span>{entry.name}</span>
              <small>{entry.size}</small>
            </button>
          ))}
          <Link href="/discover">견종 발견에서 더 찾아보기 ↗</Link>
        </div>
      )}
    </div>
  );
}
