"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import styles from "./site-header.module.css";

export function SiteHeader({
  wide = false,
  children,
}: {
  wide?: boolean;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const discoverTone = true;
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
        className={`${styles.header} ${children ? styles.withSearch : ""} ${wide ? styles.wide : ""} ${discoverTone ? styles.discoverTone : ""}`}
      >
        <Link
          className={styles.brand}
          href="/"
          aria-label="살아 있는 견종도감 홈"
        >
          <Image
            className={styles.wordmark}
            src="/images/brand/wordmark-l01.webp"
            alt="견종도감"
            width={156}
            height={52}
            unoptimized
            priority
          />
        </Link>
        {children && <div className={styles.searchSlot}>{children}</div>}
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
              aria-label="메뉴"
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
                  <span>다양한 견종을 수채화 카드로 만나요.</span>
                </Link>
                <Link href="/discover" onClick={() => setMenuOpen(false)}>
                  <strong>견종 발견</strong>
                  <span>견종을 검색하고 비교해 보세요.</span>
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
