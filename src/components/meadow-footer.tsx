"use client";

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
          <p>
            함께하기 전에 알아보고,
            <br />
            함께한 뒤에는 끝까지 책임져 주세요.
          </p>
        </div>
        <div
          ref={field}
          className={styles.field}
          aria-label="재패니즈 스피츠가 노는 잔디 운동장"
        >
          <span className={styles.hint}>공을 잡아, 가볍게 던져보세요.</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} 견종도감.
        </span>
        <p>견종 정보는 일반적인 경향이며, 개체마다 다를 수 있습니다.</p>
      </div>
    </footer>
  );
}
