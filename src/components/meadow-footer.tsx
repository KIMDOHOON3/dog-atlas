"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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
          aria-label="파라솔과 테이블, 원목 울타리, 장소 안내판과 던질 수 있는 장난감이 놓인 애견카페 운동장"
        >
          <Link
            href="/places"
            prefetch={false}
            className={styles.sign}
            data-yard-sign
          >
            함께 갈 곳 <span aria-hidden="true">↗</span>
          </Link>
          <div className={styles.caption} data-yard-caption>
            <span className={styles.hint}>
              <span className={styles.desktopHint}>
                공·뼈다귀·원반·터그를 잡고 던져보세요.
              </span>
              <span className={styles.mobileHint}>
                공과 장난감을 잡고 던져보세요.
              </span>
            </span>
            <button
              type="button"
              className={styles.reset}
              onClick={() =>
                field.current?.dispatchEvent(new Event("yard-reset"))
              }
            >
              장난감 제자리로
            </button>
            <div className={styles.bottom}>
              <span className={styles.copyright}>
                © {new Date().getFullYear()} 견종도감.
              </span>
              <p>견종 정보는 일반적인 경향이며, 개체마다 다를 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
