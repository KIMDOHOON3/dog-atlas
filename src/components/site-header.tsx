"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationIcon } from "./navigation-icon";
import styles from "./site-header.module.css";

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const pathname = usePathname();
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
        </nav>
      </header>
      <nav className={styles.mobileBottomNav} aria-label="모바일 주요 탐색">
        <Link className={pathname === "/" ? styles.mobileNavActive : ""} href="/">
          <NavigationIcon name="home" />
          <span>홈</span>
        </Link>
        <Link className={pathname === "/discover" ? styles.mobileNavActive : ""} href="/discover">
          <NavigationIcon name="discovery" />
          <span>견종 발견</span>
        </Link>
        <Link className={breedNamesActive ? styles.mobileNavActive : ""} href="/breed-names/pointer">
          <NavigationIcon name="stories" />
          <span>이름 속 견종</span>
        </Link>
        <Link className={curiosityActive ? styles.mobileNavActive : ""} href="/curiosity/regulated-care">
          <NavigationIcon name="curiosity" />
          <span>견종 모아보기</span>
        </Link>
      </nav>
    </>
  );
}
