import Link from "next/link";
import styles from "./site-header.module.css";

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  return (
    <header className={`${styles.header} ${wide ? styles.wide : ""}`}>
      <Link className={styles.brand} href="/" aria-label="살아 있는 견종도감 홈">
        <span className={styles.mark} aria-hidden="true">犬</span>
        <span>강아지 도감</span>
      </Link>
      <nav aria-label="주요 탐색">
        <Link href="/#discover">견종 발견</Link>
        <Link href="/compare?breeds=japanese-spitz,samoyed">비교하기</Link>
        <Link className={styles.searchIcon} href="/#breed-search" aria-label="견종 검색으로 이동"><span className={styles.searchGlyph} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
