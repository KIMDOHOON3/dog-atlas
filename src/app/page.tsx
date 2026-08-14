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
            <p className={styles.eyebrow}>370개 견종·교배견의 성격과 생활 정보를 비교해</p>
            <h1 id="hero-title"><span>나와 잘 맞는 강아지를</span>{" "}<span>찾아보세요.</span></h1>
          </div>
        </section>

        <CategoryExplorer />

        <section className={styles.breedSearch} aria-labelledby="breed-search-title">
          <h2 id="breed-search-title">궁금한 견종이 있다면 이름으로 검색해보세요.</h2>
          <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn }) => {
            const master = getMasterBreed(slug);
            return { slug, nameKo, nameEn, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
          })} />
        </section>
      </main>
      <footer className={styles.footer}>견종의 특성은 일반적 경향이며 실제 개체와 환경에 따라 달라질 수 있어요.</footer>
    </>
  );
}
