"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBreedSearchIndex, findExactBreed, normalizeBreedQuery as normalize, searchBreedIndex, type BreedSearchOption } from "@/lib/breed-search-index";
import styles from "./search-box.module.css";

export type BreedOption = BreedSearchOption;

export function SearchBox({ breeds, id = "breed-search" }: { breeds: BreedOption[]; id?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = `${id}-suggestions`;
  const normalizedQuery = normalize(query);
  const searchIndex = useMemo(() => createBreedSearchIndex(breeds), [breeds]);
  const suggestions = useMemo(() => searchBreedIndex(searchIndex, normalizedQuery), [searchIndex, normalizedQuery]);

  function openBreed(breed: BreedOption) {
    setQuery(breed.nameKo);
    setError("");
    setIsOpen(false);
    router.push(`/breeds/${breed.slug}`);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalize(query);
    const match = findExactBreed(searchIndex, normalized);
    if (!match) { setError(`현재 도감에는 ${breeds.length}종의 강아지가 있어요. 목록에서 이름을 선택해 주세요.`); return; }
    openBreed(match);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const activeSuggestion = suggestions[activeIndex];
      if (activeSuggestion) openBreed(activeSuggestion);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} role="search" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
    }}>
      <label htmlFor={id}>견종 이름 검색</label>
      <div className={styles.row}>
        <input
          id={id}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setError("");
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="견종 이름 입력"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={listId}
          aria-activedescendant={isOpen && suggestions.length > 0 ? `${listId}-${suggestions[activeIndex]?.slug}` : undefined}
          autoComplete="off"
        />
        <button type="submit" aria-label="찾기" title="찾기"><span aria-hidden="true">⌕</span></button>
      </div>
      {isOpen && suggestions.length > 0 && (
        <ul className={styles.suggestions} id={listId} role="listbox" aria-label="관련 견종">
          {suggestions.map((breed, index) => (
            <li key={breed.slug} role="presentation">
              <button
                id={`${listId}-${breed.slug}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => openBreed(breed)}
              >
                <Image className={styles.suggestionImage} src={breed.imageSrc} alt="" width={52} height={52} />
                <span className={styles.suggestionCopy}><strong>{breed.nameKo}</strong><small>{breed.nameEn}</small></span>
                {breed.matchingAlias && normalize(breed.matchingAlias) !== normalize(breed.nameKo) && <em>{breed.matchingAlias}</em>}
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.error} aria-live="polite">{error}</p>
    </form>
  );
}
