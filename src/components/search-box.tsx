"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./search-box.module.css";

type BreedOption = { slug: string; nameKo: string; nameEn: string; aliases?: string[] };

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[\s-]/g, "");
}

export function SearchBox({ breeds, id = "breed-search" }: { breeds: BreedOption[]; id?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = `${id}-suggestions`;
  const normalizedQuery = normalize(query);
  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return breeds
      .map((breed) => {
        const terms = [breed.nameKo, breed.nameEn, ...(breed.aliases ?? [])];
        const matchingAlias = breed.aliases?.find((alias) => normalize(alias).includes(normalizedQuery));
        const startsWith = terms.some((term) => normalize(term).startsWith(normalizedQuery));
        return { ...breed, matchingAlias, startsWith, matches: terms.some((term) => normalize(term).includes(normalizedQuery)) };
      })
      .filter((breed) => breed.matches)
      .sort((a, b) => Number(b.startsWith) - Number(a.startsWith) || a.nameKo.localeCompare(b.nameKo, "ko"))
      .slice(0, 6);
  }, [breeds, normalizedQuery]);

  function openBreed(breed: BreedOption) {
    setQuery(breed.nameKo);
    setError("");
    setIsOpen(false);
    router.push(`/breeds/${breed.slug}`);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalize(query);
    const match = breeds.find((breed) =>
      normalize(breed.nameKo) === normalized
      || normalize(breed.nameEn) === normalized
      || breed.aliases?.some((alias) => normalize(alias) === normalized),
    );
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
          placeholder="견종 이름을 검색해보세요"
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
                <span><strong>{breed.nameKo}</strong><small>{breed.nameEn}</small></span>
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
