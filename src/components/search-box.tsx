"use client";

import { Fragment, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./search-box.module.css";

type BreedOption = { slug: string; nameKo: string; nameEn: string; aliases?: string[] };

export function SearchBox({ breeds }: { breeds: BreedOption[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    const match = breeds.find((breed) =>
      breed.nameKo === query.trim()
      || breed.nameEn.toLowerCase() === normalized
      || breed.aliases?.some((alias) => alias.toLowerCase() === normalized),
    );
    if (!match) { setError(`현재 도감에는 ${breeds.length}종의 강아지가 있어요. 목록에서 이름을 선택해 주세요.`); return; }
    setError("");
    router.push(`/breeds/${match.slug}`);
  }

  return (
    <form className={styles.form} onSubmit={submit} role="search">
      <label htmlFor="breed-search">견종 이름 검색</label>
      <div className={styles.row}>
        <input id="breed-search" list="breed-options" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="견종 이름을 검색해보세요" />
        <datalist id="breed-options">
          {breeds.map((breed) => (
            <Fragment key={breed.slug}>
              <option value={breed.nameKo}>{breed.nameEn}</option>
              {breed.aliases?.map((alias) => <option value={alias} key={`${breed.slug}-${alias}`}>{breed.nameKo}</option>)}
            </Fragment>
          ))}
        </datalist>
        <button type="submit" aria-label="찾기" title="찾기"><span aria-hidden="true">⌕</span></button>
      </div>
      <p className={styles.error} aria-live="polite">{error}</p>
    </form>
  );
}
