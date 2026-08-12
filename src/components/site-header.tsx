"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInterestBreeds } from "./interest-breeds";
import styles from "./site-header.module.css";

function DiscoveryIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.25" /><path d="m14.9 9.1-1.7 4.1-4.1 1.7 1.7-4.1 4.1-1.7Z" /></svg>;
}

function CompareIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="6" height="14" rx="2" /><rect x="14" y="5" width="6" height="14" rx="2" /><path d="M10 9h4M10 15h4" /></svg>;
}

function StoriesIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10a4 4 0 0 1 4 4V19H9a4 4 0 0 0-4 1.5v-16Z" /><path d="M9 8h6M9 12h6" /></svg>;
}

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const { slugs, hydrated } = useInterestBreeds();
  const pathname = usePathname();
  const compareHref = slugs.length ? `/compare?breeds=${slugs.join(",")}` : "/compare";
  const storiesActive = pathname === "/stories" || pathname.startsWith("/breed-names/") || pathname.startsWith("/curiosity/");

  return (
    <>
      <header className={`${styles.header} ${wide ? styles.wide : ""}`}>
        <Link className={styles.brand} href="/" aria-label="살아 있는 견종도감 홈">
          <span className={styles.mark} aria-hidden="true">犬</span>
          <span>강아지 도감</span>
        </Link>
        <nav aria-label="주요 탐색">
          <Link href="/discover">견종 발견</Link>
          <Link href="/stories">견종 이야기</Link>
          <Link href={compareHref}>비교하기{hydrated && slugs.length > 0 ? ` · ${slugs.length}` : ""}</Link>
          <Link className={styles.searchIcon} href="/#breed-search" aria-label="견종 검색으로 이동"><span className={styles.searchGlyph} aria-hidden="true" /></Link>
        </nav>
      </header>
      <nav className={styles.mobileBottomNav} aria-label="모바일 주요 탐색">
        <Link className={pathname === "/discover" ? styles.mobileNavActive : ""} href="/discover">
          <DiscoveryIcon />
          <span>견종 발견</span>
        </Link>
        <Link className={storiesActive ? styles.mobileNavActive : ""} href="/stories">
          <StoriesIcon />
          <span>견종 이야기</span>
        </Link>
        <Link className={pathname === "/compare" ? styles.mobileNavActive : ""} href={compareHref}>
          <CompareIcon />
          <span>비교하기{hydrated && slugs.length > 0 ? ` · ${slugs.length}` : ""}</span>
        </Link>
      </nav>
    </>
  );
}
