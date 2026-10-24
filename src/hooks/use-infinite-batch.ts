"use client";

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

export function useInfiniteBatch(visibleCount: number, totalCount: number, batchSize: number, setCount: Dispatch<SetStateAction<number>>) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= totalCount) return;
    let disposed = false;
    let loaded = false;
    let frame = 0;
    let timer: number | null = null;
    let observer: IntersectionObserver | undefined;
    const useObserver = typeof window.IntersectionObserver === "function";

    function loadNext() {
      if (disposed || loaded) return;
      loaded = true;
      observer?.disconnect();
      if (timer !== null) window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      setCount((count) => Math.min(count + batchSize, totalCount));
    }

    function measurePosition() {
      if (!disposed && !loaded && sentinel!.getBoundingClientRect().top <= window.innerHeight + 600) loadNext();
    }

    function checkPosition() {
      if (disposed || loaded || timer !== null) return;
      timer = window.setTimeout(() => {
        timer = null;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measurePosition);
      }, 150);
    }

    if (useObserver) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) loadNext();
      }, { rootMargin: "600px 0px" });
      observer.observe(sentinel);
    }

    // Some mobile WebViews expose IntersectionObserver but miss notifications.
    // Retain the documented safety path, throttled instead of reading layout
    // on every animation frame while the user scrolls.
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    frame = requestAnimationFrame(measurePosition);

    return () => {
      disposed = true;
      if (timer !== null) window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [visibleCount, totalCount, batchSize, setCount]);

  return sentinelRef;
}
