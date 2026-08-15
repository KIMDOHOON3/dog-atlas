"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInterestBreeds } from "./interest-breeds";
import styles from "./site-header.module.css";

function HomeIcon() {
  return <span className={`${styles.mobileNavIcon} ${styles.homeIcon}`} aria-hidden="true" />;
}

function DiscoveryIcon() {
  return <span className={`${styles.mobileNavIcon} ${styles.discoveryIcon}`} aria-hidden="true" />;
}

function CompareIcon() {
  return <span className={`${styles.mobileNavIcon} ${styles.compareIcon}`} aria-hidden="true" />;
}

function StoriesIcon() {
  return <span className={`${styles.mobileNavIcon} ${styles.storiesIcon}`} aria-hidden="true" />;
}

function CuriosityIcon() {
  return <span className={`${styles.mobileNavIcon} ${styles.curiosityIcon}`} aria-hidden="true" />;
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
          <Link href="/curiosity/regulated-care">견종 모아보기</Link>
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
        <Link className={curiosityActive ? styles.mobileNavActive : ""} href="/curiosity/regulated-care">
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
