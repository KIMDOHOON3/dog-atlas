import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { CategoryExplorer } from "@/components/category-explorer";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import styles from "./page.module.css";

export const revalidate = 86400;

const cardTraits: Record<string, string> = {
  "japanese-spitz": "가족과의 교감",
  maltese: "사람 곁을 선호",
  "border-collie": "높은 집중과 활동",
  greyhound: "질주와 휴식의 리듬",
  samoyed: "교감과 털 관리",
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">본문으로 바로가기</a>
      <SiteHeader />
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>370개 견종·교배견의 성격과 생활 정보를 담은 강아지 도감</p>
            <h1 id="hero-title"><span>나와 잘 맞는 강아지를</span>{" "}<span>찾아보세요.</span></h1>
            <p className={styles.lead}>활동량, 성격, 크기, 털 관리부터 실제 양육 난이도까지 비교하고 나에게 맞는 견종을 발견할 수 있어요.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/discover">내게 맞는 견종 찾기</Link>
            </div>
          </div>
          <div className={styles.heroSearch}>
            <p>이미 궁금한 견종이 있나요?</p>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn }) => {
              const master = getMasterBreed(slug);
              return { slug, nameKo, nameEn, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
            })} />
          </div>
        </section>

        <CategoryExplorer />

        <section className={styles.browse} id="discover" aria-labelledby="browse-title">
          <header><h2 id="browse-title">강아지 둘러보기</h2><p>관심 가는 한 마리부터 천천히 알아보세요.</p></header>
          <div className={styles.breedGrid}>
            {breeds.map((breed) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                <BreedVisual breed={breed} variant="tile" />
                <div><strong>{breed.nameKo}</strong><span aria-hidden="true">↗</span><small>{breed.identity.origin} · {cardTraits[breed.slug] ?? breed.catalog.discoveryTags[0]}</small></div>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <footer className={styles.footer}>견종의 특성은 일반적 경향이며 실제 개체와 환경에 따라 달라질 수 있어요.</footer>
    </>
  );
}
