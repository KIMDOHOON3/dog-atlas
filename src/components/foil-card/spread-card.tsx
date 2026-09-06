"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GiantCard } from "@/content/giant-cards";
import { CardFront } from "./card-front";
import { CardBack } from "./card-back";
import styles from "./foil-card.module.css";

export function SpreadCard({ breed }: { breed: GiantCard }) {
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
    setOpened(true);
    setBack((value) => !value);
  }
  const label = back ? "그림으로 돌아가기" : "뒤집어서 알아보기";
  return (
    <article className={styles.spreadItem} aria-label={breed.name}>
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
          {label}
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
          견종 자세히 보기
        </Link>
      </div>
    </article>
  );
}
