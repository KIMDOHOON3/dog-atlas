"use client";

import { useState } from "react";
import { MAX_INTEREST_BREEDS, useInterestBreeds } from "./interest-breeds";
import styles from "./interest-breed-toggle.module.css";

export function InterestBreedToggle({ slug, nameKo }: { slug: string; nameKo: string }) {
  const { slugs, hydrated, add, remove } = useInterestBreeds();
  const [message, setMessage] = useState("");
  const active = slugs.includes(slug);

  function handleToggle() {
    if (active) {
      remove(slug);
      setMessage(`비교 후보에서 ${nameKo}를 뺐어요.`);
      return;
    }

    const result = add(slug);
    if (result === "limit") window.dispatchEvent(new Event("dog-atlas:shortlist-limit"));
    setMessage(result === "limit"
      ? `비교 후보는 ${MAX_INTEREST_BREEDS}마리까지 담을 수 있어요. 먼저 한 마리를 빼주세요.`
      : `비교 후보에 ${nameKo}를 담았어요.`);
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.toggle}
        aria-label={`${nameKo} ${active ? "후보에서 빼기" : "비교 후보에 담기"}`}
        aria-pressed={active}
        disabled={!hydrated}
        onClick={handleToggle}
      >
        <span aria-hidden="true">{active ? "✓" : "+"}</span>
        {active ? "후보에서 빼기" : "비교 후보에 담기"}
      </button>
      <span className={styles.hint} aria-live="polite">
        {message || "로그인 없이 이 브라우저에 저장돼요."}
      </span>
    </div>
  );
}
