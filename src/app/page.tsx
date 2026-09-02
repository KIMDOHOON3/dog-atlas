import Image from "next/image";
import Link from "next/link";
import { CategoryExplorer } from "@/components/category-explorer";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { breeds, getBreed } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import { createPageMetadata, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-metadata";
import styles from "./page.module.css";

export const revalidate = 86400;
export const metadata = createPageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" });

const familiarBreedSlugs = [
  "poodle",
  "maltese",
  "bichon-frise",
  "shih-tzu",
  "korea-jindo-dog",
  "golden-retriever",
] as const;

export default function Home() {
  const familiarBreeds = familiarBreedSlugs.flatMap((slug) => {
    const breed = getBreed(slug);
    return breed ? [breed] : [];
  });

  return (
    <>
      <a className="skip-link" href="#main">본문으로 바로가기</a>
      <SiteHeader />
      <main id="main" data-home-theme="warm-3d" data-deployment-check="2026-08-25-2">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 className={styles.searchTitle} id="hero-title">
              <span>외모보다,</span>
              <span><em>함께할 생활</em>을 먼저 살펴봐요.</span>
            </h1>
            <p className={styles.heroDescription}>필요한 시간과 환경부터 알아보세요.</p>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn, illustration }) => {
              const master = getMasterBreed(slug);
              return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
            })} />
          </div>
          <figure className={styles.heroVisual}>
            <Image
              src="/illustrations/v8/home-care-ui-spitz-diorama.webp"
              alt="재패니즈 스피츠 주변에 산책줄과 물그릇, 빗, 산책 수건이 각각 놓인 3D 생활 디오라마"
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 48vw, 680px"
            />
            <figcaption>귀여운 첫인상 다음에는 매일의 돌봄이 이어져요.</figcaption>
          </figure>
        </section>

        <CategoryExplorer />

        <section className={styles.familiar} aria-labelledby="familiar-title">
          <header className={styles.sectionHeader}>
            <div>
              <h2 id="familiar-title"><em>익숙한 이름</em>에서 시작해보세요.</h2>
            </div>
            <Link href="/discover">전체 {breeds.length}종 <span aria-hidden="true">→</span></Link>
          </header>
          <nav className={styles.breedRail} aria-label="먼저 살펴볼 익숙한 견종">
            {familiarBreeds.map((breed) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug}>
                <Image src={breed.illustration} alt="" width={280} height={280} sizes="(max-width: 767px) 38vw, 180px" />
                <span>
                  <span><strong>{breed.nameKo}</strong><small>{breed.nameEn}</small></span>
                  <i aria-hidden="true">→</i>
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <section className={styles.principle} aria-label="강아지 도감의 관점">
          <p>강아지를 고르는 일이 아니라,<br /><em>한 생명과 함께할 생활</em>을 미리 이해하는 것.</p>
          <Link href="/discover">내 생활에서 살펴보기 <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <footer className={styles.footer}>견종의 특성은 일반적인 경향이며 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.</footer>
    </>
  );
}
