"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./foil-card.module.css";

/** Mounted only for an explicitly selected search result, never ordinary paging. */
export function SearchCardFeedback() {
  const ring = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const surface = ring.current?.parentElement;
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    if (rect.top < 160 || rect.bottom > window.innerHeight) {
      surface.scrollIntoView?.({ block: "center", behavior: "instant" });
    }
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animation = preference.matches ? undefined : surface.animate?.(
      [{ translate: "0 0" }, { translate: "0 -5px", offset: 0.35 }, { translate: "0 0" }],
      { duration: 420, easing: "ease-out" },
    );
    const stopMotion = () => { if (preference.matches) animation?.cancel(); };
    preference.addEventListener("change", stopMotion);
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => {
      clearTimeout(timer);
      animation?.cancel();
      preference.removeEventListener("change", stopMotion);
    };
  }, []);

  return visible ? <span ref={ring} className={styles.searchFeedback} aria-hidden="true" /> : null;
}
