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
          aria-label="골든 리트리버가 있는, 공을 던지며 놀 수 있는 잔디 운동장"
        >
          <span className={styles.hint}>
            <span className={styles.desktopHint}>
              살살 굴리고, 위로 던지고, 다시 잡아보세요.
            </span>
            <span className={styles.mobileHint}>
              공을 잡고 끌어 던져보세요.
            </span>
          </span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} 견종도감.
        </span>
        <div>
          <p>견종 정보는 일반적인 경향이며, 개체마다 다를 수 있습니다.</p>
          <p className={styles.credit}>
            3D 강아지:{" "}
            <a href="https://sketchfab.com/3d-models/golden-retriever-dog-3d-model-free-4d32f856099c4baca05da2da485c24c1">
              iRahulRajput
            </a>
            {" · "}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
            {" · 모델·텍스처 최적화"}
          </p>
        </div>
      </div>
    </footer>
  );
}
