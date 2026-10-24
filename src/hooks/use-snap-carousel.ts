"use client";

import { useRef, useState } from "react";

export function useSnapCarousel(itemCount: number) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  function handleScroll() {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const width = firstCard.offsetWidth + gap;
    if (width <= 0) return;
    setCurrent(Math.max(0, Math.min(Math.round(track.scrollLeft / width), itemCount - 1)));
  }

  function scrollTo(index: number) {
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest", inline: "start" });
  }

  return { current, handleScroll, scrollTo, trackRef };
}
