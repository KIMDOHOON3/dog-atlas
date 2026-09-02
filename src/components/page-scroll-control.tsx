"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./page-scroll-control.module.css";

type ScrollDirection = "top" | "bottom";

export function PageScrollControl() {
  const pathname = usePathname();
  const [direction, setDirection] = useState<ScrollDirection | null>(null);
  const lastScrollYRef = useRef(0);
  const followTimerRef = useRef<number | null>(null);

  function stopFollowing() {
    if (followTimerRef.current !== null) window.clearInterval(followTimerRef.current);
    followTimerRef.current = null;
  }

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const revealThreshold = window.matchMedia("(max-width: 767px)").matches ? 96 : 240;
    const initialFrame = requestAnimationFrame(() => {
      setDirection(window.scrollY >= revealThreshold ? "top" : null);
    });
    let animationFrame = 0;

    function update() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      const canScroll = document.documentElement.scrollHeight > window.innerHeight + 360;

      if (!canScroll || currentScrollY < revealThreshold) {
        setDirection(null);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) < 12) return;
      setDirection(delta > 0 ? "top" : "bottom");
      lastScrollYRef.current = currentScrollY;
    }

    function handleScroll() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      stopFollowing();
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (!direction) return null;

  function move() {
    stopFollowing();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (direction === "bottom") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
      let attempts = 0;
      let stableChecks = 0;
      let previousHeight = document.documentElement.scrollHeight;
      followTimerRef.current = window.setInterval(() => {
        attempts += 1;
        const nextHeight = document.documentElement.scrollHeight;
        stableChecks = nextHeight === previousHeight ? stableChecks + 1 : 0;
        previousHeight = nextHeight;
        window.scrollTo({ top: nextHeight, behavior: "auto" });
        if (stableChecks >= 3 || attempts >= 12) stopFollowing();
      }, 240);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      className={`${styles.control} ${pathname === "/discover" ? styles.discoverTone : ""}`}
      type="button"
      aria-label={direction === "top" ? "페이지 맨 위로 이동" : "페이지 맨 아래로 이동"}
      onClick={move}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={direction === "top" ? "M6 14l6-6 6 6" : "M6 10l6 6 6-6"} />
      </svg>
    </button>
  );
}
