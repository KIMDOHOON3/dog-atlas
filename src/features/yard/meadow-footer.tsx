"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { loadYardModel } from "./yard-model";
import styles from "./meadow-footer.module.css";

export function MeadowFooter() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = field.current;
    if (!host) return;
    const caption = host.querySelector<HTMLElement>("[data-yard-caption]");
    const measureCaption = () => {
      if (caption)
        host.style.setProperty(
          "--yard-caption-height",
          `${caption.offsetHeight}px`,
        );
    };
    measureCaption();
    const captionObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(measureCaption);
    if (caption) captionObserver?.observe(caption);
    let disposed = false;
    let starting = false;
    let visible = false;
    let scene:
      | Awaited<ReturnType<(typeof import("./meadow-scene"))["createMeadow"]>>
      | undefined;
    const start = async () => {
      if (!scene && !starting) {
        starting = true;
        // Share this request with the GLTF parser; a failed preload can retry.
        void loadYardModel().catch(() => {});
        try {
          const { createMeadow } = await import("./meadow-scene");
          if (disposed) return;
          scene = createMeadow(host);
        } catch {
          host.dataset.renderer = "fallback";
        }
      }
      scene?.setVisible(visible);
    };
    // Prepare within one screen of the footer, but animate only when visible.
    // Using a separate observer prevents the preload margin from running physics
    // and animation while the user is still reading the breed cards.
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) void start();
            else scene?.setVisible(false);
          })
        : undefined;
    const prepare =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              prepare?.disconnect();
              void start();
            },
            { rootMargin: "900px 0px" },
          )
        : undefined;
    observer?.observe(host);
    prepare?.observe(host);
    if (!observer) {
      visible = true;
      void start();
    }
    return () => {
      disposed = true;
      observer?.disconnect();
      prepare?.disconnect();
      captionObserver?.disconnect();
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
          <picture className={styles.preview}>
            <source
              media="(max-width: 767px)"
              srcSet="/images/yard/preview-mobile.webp?v=2"
            />
            {/* A render of this scene, including its camera framing. */}
            <img
              src="/images/yard/preview-desktop.webp?v=2"
              alt=""
              loading="lazy"
              decoding="async"
              width={1440}
              height={668}
            />
          </picture>
          <div className={styles.caption} data-yard-caption>
            <Link
              href="/places"
              prefetch={false}
              className={styles.sign}
              data-yard-sign
            >
              함께 갈 곳 <span aria-hidden="true">↗</span>
            </Link>
            <span className={styles.hint}>
              <span className={styles.desktopHint}>
                공·뼈다귀·원반·터그를 잡고 던져보세요.
              </span>
              <span className={styles.mobileHint}>
                공과 장난감을 잡고 던져보세요.
              </span>
              <span className={styles.viewHint}>
                빈 곳을 좌우로 끌어 둘러보세요.
              </span>
            </span>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.reset}
                onClick={() =>
                  field.current?.dispatchEvent(new Event("yard-reset"))
                }
              >
                <span aria-hidden="true">↺</span> 장난감 제자리로
              </button>
            </div>
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
