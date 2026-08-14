"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInterestBreeds } from "./interest-breeds";
import styles from "./site-header.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3.8 13.2 16 3.5l12.2 9.7M6.2 11.4v16.4M25.8 11.4v16.4" />
      <path d="M10.1 27.8V16.2c0-2.2 1.8-4 4-4h3.8c2.2 0 4 1.8 4 4v11.6" />
      <path d="M12.3 20.2c.4-2.1 1.9-3.5 4-3.5 2.4 0 4.2 1.9 4.2 4.2 0 2.5-1.9 4.4-4.5 4.4-1.9 0-3.4-1-4.1-2.5" />
      <path d="M12.7 19.1c-1.4.5-2.3 1.7-2.3 3.2 0 1.4.8 2.5 2 3.1M17.5 20.2h.1M20 22.1c-.7.5-1.4.7-2.2.6" />
    </svg>
  );
}

function DiscoveryIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="13.2" cy="13.2" r="9.6" />
      <path d="m20.2 20.2 8.1 8.1" />
      <path className={styles.solidIcon} d="M9.2 17.1c.5-1.1.8-2.3.9-3.5.1-2.4 1.7-4.2 3.8-4.2 1.4 0 2.5.6 3.2 1.7.5.8 1.3 1.1 2.1 1.3.7.2.9 1 .4 1.5-.7.8-1.6 1.3-2.8 1.3l.3 2.6c-2.6.7-5.3.5-7.9-.7Z" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3.8 23.8c1.2-1.4 1.7-3 1.8-4.8.1-3.5 2.4-6.1 5.5-6.1 2.2 0 4 1 5 2.8.8 1.4 2.2 2.2 4 2.2" />
      <path d="M5.8 18.4c-1.8.5-2.8 2-2.8 3.8 0 1.5.8 2.8 2 3.5M11.8 18.1h.1M14.8 20.5c-1 .7-2 1-3.2.8" />
      <path d="M28.2 23.8c-1.2-1.4-1.7-3-1.8-4.8-.1-3.5-2.4-6.1-5.5-6.1-1.5 0-2.8.5-3.8 1.4M26.2 18.4c1.8.5 2.8 2 2.8 3.8 0 1.5-.8 2.8-2 3.5M20.2 18.1h-.1M17.2 20.5c1 .7 2 1 3.2.8" />
      <path d="M24.6 12.9c.1-2 .9-3.8 2.4-5.3.2 2 .8 3.5 1.8 4.7" />
    </svg>
  );
}

function StoriesIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8.3 7.8 12 5.3l3.1 3.3M10.6 8.4l-5.4 3.3 5.5 15.4c.5 1.5 2.2 2.3 3.7 1.7l10.1-3.6c1.5-.5 2.2-2.2 1.7-3.7L22 9.9" />
      <path d="M11.7 19.7h6.1" />
      <path d="M14.8 7.6c.9-2 2.6-3.2 4.8-3.2 2.8 0 5 2.1 5.2 4.9.1 1.6.8 2.9 2 4-1.2 1-2.4 1.4-3.7 1.3l-.4 3.3" />
      <path d="M15.8 7.7c-1.5.5-2.4 1.8-2.4 3.3 0 1.4.7 2.5 1.9 3.2M20.6 8.7h.1M23.4 10.8c-.8.6-1.6.8-2.6.7M23.3 5.9c1.1.4 1.9 1.2 2.5 2.3" />
    </svg>
  );
}

function CuriosityIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7.2 27c1.2-2.2 1.8-4.5 1.8-7.1 0-4.7 3.1-8.2 7.3-8.2 2.9 0 5.2 1.3 6.7 3.7 1.1 1.8 2.8 2.7 5.2 2.8-1.1 2.2-3 3.5-5.5 3.5l.5 5.3" />
      <path d="M9.3 19.1c-2.1.6-3.3 2.3-3.3 4.4 0 1.8.9 3.3 2.5 4.2M17.2 18.5h.1M21 21.3c-1.2.8-2.5 1.1-3.9.9" />
      <path d="m22.7 6.3.8-2.2.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8ZM14.6 4.2l.5-1.4.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" />
    </svg>
  );
}

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const { slugs, hydrated } = useInterestBreeds();
  const pathname = usePathname();
  const compareHref = slugs.length ? `/compare?breeds=${slugs.join(",")}` : "/compare";
  const breedNamesActive = pathname === "/breed-names" || pathname.startsWith("/breed-names/");
  const curiosityActive = pathname === "/curiosity" || pathname.startsWith("/curiosity/");

  return (
    <>
      <header className={`${styles.header} ${wide ? styles.wide : ""}`}>
        <Link className={styles.brand} href="/" aria-label="살아 있는 견종도감 홈">
          <span className={styles.mark} aria-hidden="true">犬</span>
          <span>강아지 도감</span>
        </Link>
        <nav aria-label="주요 탐색">
          <Link href="/discover">견종 발견</Link>
          <Link href="/breed-names/pointer">이름 속 견종</Link>
          <Link href="/curiosity/distinctive-coats">견종 모아보기</Link>
          <Link href={compareHref}>비교하기{hydrated && slugs.length > 0 ? ` · ${slugs.length}` : ""}</Link>
          <Link className={styles.searchIcon} href="/#breed-search" aria-label="견종 검색으로 이동"><span className={styles.searchGlyph} aria-hidden="true" /></Link>
        </nav>
      </header>
      <nav className={styles.mobileBottomNav} aria-label="모바일 주요 탐색">
        <Link className={pathname === "/" ? styles.mobileNavActive : ""} href="/">
          <HomeIcon />
          <span>홈</span>
        </Link>
        <Link className={pathname === "/discover" ? styles.mobileNavActive : ""} href="/discover">
          <DiscoveryIcon />
          <span>견종 발견</span>
        </Link>
        <Link className={breedNamesActive ? styles.mobileNavActive : ""} href="/breed-names/pointer">
          <StoriesIcon />
          <span>이름 속 견종</span>
        </Link>
        <Link className={curiosityActive ? styles.mobileNavActive : ""} href="/curiosity/distinctive-coats">
          <CuriosityIcon />
          <span>견종 모아보기</span>
        </Link>
        <Link className={pathname === "/compare" ? styles.mobileNavActive : ""} href={compareHref}>
          <CompareIcon />
          <span>비교하기{hydrated && slugs.length > 0 ? ` · ${slugs.length}` : ""}</span>
        </Link>
      </nav>
    </>
  );
}
