"use client";

import { useEffect, useRef } from "react";
import styles from "./foil-card.module.css";

export const cardSizes = [
  "초소형견",
  "소형견",
  "중형견",
  "대형견",
  "초대형견",
] as const;
export type CardSize = (typeof cardSizes)[number];

export function SizeSelector({
  value,
  onChange,
}: {
  value: CardSize;
  onChange: (size: CardSize) => void;
}) {
  const viewport = useRef<HTMLElement>(null);
  const initial = useRef(true);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const selected = element.querySelector<HTMLButtonElement>(
      '[aria-pressed="true"]',
    );
    if (!selected) return;
    const center = (smooth: boolean) => {
      const left =
        element.scrollLeft +
        selected.getBoundingClientRect().left -
        element.getBoundingClientRect().left -
        (element.clientWidth - selected.getBoundingClientRect().width) / 2;
      element.scrollTo?.({ left, behavior: smooth ? "smooth" : "instant" });
    };
    center(
      !initial.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    initial.current = false;
    let width = element.clientWidth;
    const resize = new ResizeObserver(() => {
      if (width !== element.clientWidth) {
        width = element.clientWidth;
        center(false);
      }
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, [value]);
  return (
    <nav
      ref={viewport}
      className={styles.sizeSelector}
      aria-label="견종 크기 선택"
    >
      {cardSizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-pressed={value === size}
          onClick={() => onChange(size)}
        >
          {size}
        </button>
      ))}
    </nav>
  );
}
