"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreedThumbnail } from "./breed-thumbnail";
import { useInterestBreeds } from "./interest-breeds";
import styles from "./interest-breed-tray.module.css";

export function InterestBreedTray() {
  const pathname = usePathname();
  const { breeds, slugs, hydrated, remove, clear } = useInterestBreeds();
  const [expanded, setExpanded] = useState(false);
  const [dismissedForCount, setDismissedForCount] = useState<number | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const listId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleFocus(event: FocusEvent) {
      const target = event.target;
      setKeyboardOpen(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement);
    }
    function handleBlur() { setKeyboardOpen(false); }
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  useEffect(() => {
    function expandForLimit() { setExpanded(true); }
    window.addEventListener("dog-atlas:shortlist-limit", expandForLimit);
    return () => window.removeEventListener("dog-atlas:shortlist-limit", expandForLimit);
  }, []);

  const dismissed = dismissedForCount === slugs.length;

  if (!hydrated || slugs.length === 0 || pathname === "/compare" || dismissed) return null;

  const selectedBreeds = slugs.flatMap((slug) => {
    const breed = breeds.find((item) => item.slug === slug);
    return breed ? [breed] : [];
  });
  const canCompare = selectedBreeds.length >= 2;

  function emptyShortlist() {
    clear();
    dialogRef.current?.close();
  }

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <aside className={`${styles.tray} ${keyboardOpen ? styles.keyboardHidden : ""}`} data-interest-tray aria-label="비교 후보 보관함">
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.summary}
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((current) => !current)}
          >
            <span className={styles.thumbnails} aria-hidden="true">
              {selectedBreeds.map((breed) => <BreedThumbnail key={breed.slug} slug={breed.slug} nameKo={breed.nameKo} size={44} className={styles.thumbnail} />)}
            </span>
            <span className={styles.heading}>
              <strong>비교 후보 {selectedBreeds.length}마리</strong>
              <small>{selectedBreeds.length === 1 ? "한 마리 더 담으면 같은 기준으로 비교할 수 있어요." : "후보 목록 펼치기"}</small>
            </span>
          </button>

          {canCompare ? (
            <Link className={styles.compare} href={`/compare?breeds=${slugs.join(",")}`}>{selectedBreeds.length}마리 비교하기</Link>
          ) : (
            <button className={styles.compareDisabled} type="button" disabled>한 마리 더 담아주세요</button>
          )}

          <button
            type="button"
            className={styles.dismiss}
            aria-label="비교 후보 보관함 닫기"
            onClick={() => setDismissedForCount(slugs.length)}
          >
            <span aria-hidden="true">×</span>
          </button>

          {expanded && (
            <div className={styles.expanded} id={listId}>
              <div className={styles.list}>
                {selectedBreeds.map((breed) => (
                  <div className={styles.candidate} key={breed.slug}>
                    <BreedThumbnail slug={breed.slug} nameKo={breed.nameKo} size={48} className={styles.thumbnail} />
                    <Link href={`/breeds/${breed.slug}`}>{breed.nameKo}</Link>
                    <button type="button" onClick={() => remove(breed.slug)} aria-label={`${breed.nameKo} 후보에서 빼기`}>×</button>
                  </div>
                ))}
              </div>
              <div className={styles.expandedActions}>
                <button type="button" onClick={() => setExpanded(false)}>후보 목록 접기</button>
                <button ref={clearButtonRef} type="button" onClick={() => dialogRef.current?.showModal()}>후보 모두 비우기</button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="clear-shortlist-title" onClose={() => clearButtonRef.current?.focus()}>
        <h2 id="clear-shortlist-title">담아둔 비교 후보를 모두 비울까요?</h2>
        <p>비운 후보는 상세 페이지에서 다시 담을 수 있어요.</p>
        <div>
          <button type="button" onClick={() => dialogRef.current?.close()}>계속 담아두기</button>
          <button type="button" onClick={emptyShortlist}>모두 비우기</button>
        </div>
      </dialog>
    </>
  );
}
