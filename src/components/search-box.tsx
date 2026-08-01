"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./search-box.module.css";

type BreedOption = { slug: string; nameKo: string; nameEn: string };

export function SearchBox({ breeds }: { breeds: BreedOption[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    const match = breeds.find((breed) => breed.nameKo === query.trim() || breed.nameEn.toLowerCase() === normalized);
    if (!match) { setError("첫 도감에는 다섯 견종이 있어요. 목록에서 이름을 선택해 주세요."); return; }
    setError("");
    router.push(`/breeds/${match.slug}`);
  }

  return (
    <form className={styles.form} onSubmit={submit} role="search">
      <label htmlFor="breed-search">견종 이름 검색</label>
      <div className={styles.row}>
        <input id="breed-search" list="breed-options" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="견종 이름을 검색해보세요" />
        <datalist id="breed-options">{breeds.map((breed) => <option value={breed.nameKo} key={breed.slug}>{breed.nameEn}</option>)}</datalist>
        <button type="submit" aria-label="찾기" title="찾기"><span aria-hidden="true">⌕</span></button>
      </div>
      <p className={styles.error} aria-live="polite">{error}</p>
    </form>
  );
}
