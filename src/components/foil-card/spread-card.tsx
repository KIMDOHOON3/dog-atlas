"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GiantCard } from "@/content/giant-cards";
import { CardFront } from "./card-front";
import { CardBack } from "./card-back";
import styles from "./foil-card.module.css";

export function SpreadCard({
  breed,
  modal = false,
  onClose,
}: {
  breed: GiantCard;
  modal?: boolean;
  onClose?: () => void;
}) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 600px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);
  const [back, setBack] = useState(false);
  const [opened, setOpened] = useState(false);
  const [scale, setScale] = useState(1);
  const area = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const resize = () => setScale(element.clientWidth / 360);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  function flip() {
    if (mobile && !modal) {
      setExpanded(true);
      return;
    }
    setOpened(true);
    setBack((value) => !value);
  }
  const label =
    mobile && !modal
      ? "크게 보기"
      : back
        ? "그림으로 돌아가기"
        : "뒤집어서 알아보기";
  return (
    <article
      className={styles.spreadItem}
      data-modal={modal}
      aria-label={breed.name}
    >
      <div
        ref={area}
        className={styles.spreadSurface}
        role="button"
        tabIndex={0}
        aria-label={`${breed.name} ${label}`}
        aria-pressed={back}
        onClick={flip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            flip();
          }
        }}
      >
        <div
          className={styles.spreadScale}
          style={{ "--spread-scale": scale } as CSSProperties}
        >
          <div className={styles.spreadTurner} data-back={back}>
            <div
              className={`${styles.face} ${styles.spreadFront}`}
              data-theme={breed.theme}
              aria-hidden={back}
            >
              <CardFront breed={breed} />
            </div>
            <div
              className={`${styles.face} ${styles.spreadBack}`}
              data-theme={breed.theme}
              aria-hidden={!back}
            >
              {opened && <CardBack breed={breed} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.spreadActions}>
        <button
          type="button"
          onClick={flip}
          aria-label={`${breed.name} ${label} 버튼`}
          aria-pressed={back}
        >
          <Image
            src="/images/card-controls/flip-f08.webp"
            alt=""
            width={32}
            height={32}
            unoptimized
          />
          {modal ? (back ? "앞면 보기" : "뒤집기") : label}
        </button>
        <Link
          href={`/breeds/${breed.slug}`}
          prefetch={false}
          aria-label={`${breed.name} 자세히 보기`}
        >
          <Image
            src="/images/card-controls/detail-d10.webp"
            alt=""
            width={32}
            height={32}
            unoptimized
          />
          {modal ? "자세히 보기" : "견종 자세히 보기"}
        </Link>
        {modal && (
          <button type="button" onClick={onClose}>
            닫기 ×
          </button>
        )}
      </div>
      {!modal && (
        <dialog
          ref={dialog}
          className={styles.spreadDialog}
          aria-label={`${breed.name} 크게 보기`}
          onCancel={() => setExpanded(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              dialog.current?.close();
              setExpanded(false);
            }
          }}
        >
          {expanded && (
            <SpreadCard
              breed={breed}
              modal
              onClose={() => {
                dialog.current?.close();
                setExpanded(false);
              }}
            />
          )}
        </dialog>
      )}
    </article>
  );
}
