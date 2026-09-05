"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavigationIcon } from "./navigation-icon";
import styles from "./site-header.module.css";

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const pathname = usePathname();
  const discoverTone = pathname === "/discover";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${wide ? styles.wide : ""} ${discoverTone ? styles.discoverTone : ""}`}
      >
        <Link
          className={styles.brand}
          href="/"
          aria-label="살아 있는 견종도감 홈"
        >
          <span className={styles.mark} aria-hidden="true">
            犬
          </span>
          <span>강아지 도감</span>
        </Link>
        <div className={styles.headerActions}>
          <nav aria-label="주요 탐색">
            <Link
              className={pathname === "/discover" ? styles.headerActive : ""}
              href="/discover"
              aria-current={pathname === "/discover" ? "page" : undefined}
            >
              견종 발견
            </Link>
          </nav>
          <div className={styles.menu} ref={menuRef}>
            <button
              className={styles.menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-more-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span>메뉴</span>
              <i aria-hidden="true">
                <b />
                <b />
              </i>
            </button>
            {menuOpen && (
              <nav
                className={styles.menuPanel}
                id="site-more-menu"
                aria-label="더 둘러보기"
              >
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <strong>견종 카드</strong>
                  <span>초대형견 8종을 수채화 카드로 만나요.</span>
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
      <nav
        className={`${styles.mobileBottomNav} ${discoverTone ? styles.discoverTone : ""}`}
        aria-label="모바일 주요 탐색"
      >
        <Link
          className={pathname === "/" ? styles.mobileNavActive : ""}
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <NavigationIcon name="home" />
          <span>홈</span>
        </Link>
        <Link
          className={pathname === "/discover" ? styles.mobileNavActive : ""}
          href="/discover"
          aria-current={pathname === "/discover" ? "page" : undefined}
        >
          <NavigationIcon name="discovery" />
          <span>견종 발견</span>
        </Link>
      </nav>
    </>
  );
}
