"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./meadow-footer.module.css";

export function MeadowFooter() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = field.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    let disposed = false;
    let starting = false;
    let visible = false;
    let scene:
      | Awaited<ReturnType<(typeof import("./meadow-scene"))["createMeadow"]>>
      | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !scene && !starting) {
        starting = true;
        try {
          const { createMeadow } = await import("./meadow-scene");
          if (disposed) return;
          scene = createMeadow(host);
        } catch {
          host.dataset.renderer = "fallback";
        }
      }
      scene?.setVisible(visible);
    });
    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      scene?.dispose();
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.garden}>
        <div className={styles.copy}>
          <span>함께 걷는 내일을 위해</span>
          <p>
            알아갈수록,
            <br className={styles.mobileBreak} /> 더 가까워지는 사이.
          </p>
        </div>
        <div ref={field} className={styles.field} aria-label="잔디 운동장">
          <span className={styles.hint}>공을 잡아, 가볍게 던져보세요.</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <Link href="/" className={styles.brand}>
          견종도감
        </Link>
        <span>한 마리의 이야기에서, 함께하는 일상으로.</span>
        <Link href="/discover">
          견종 발견 <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </footer>
  );
}
