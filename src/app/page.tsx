import { CategoryExplorer } from "@/components/category-explorer";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import styles from "./page.module.css";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">본문으로 바로가기</a>
      <SiteHeader />
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>375개 견종·교배견의 생활 정보</p>
            <h1 className={styles.searchTitle} id="hero-title">궁금한 견종이 있다면 이름으로 검색해보세요.</h1>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn, illustration }) => {
              const master = getMasterBreed(slug);
              return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
            })} />
          </div>
        </section>

        <CategoryExplorer />
      </main>
      <footer className={styles.footer}>견종의 특성은 일반적 경향이며 실제 개체와 환경에 따라 달라질 수 있어요.</footer>
    </>
  );
}
