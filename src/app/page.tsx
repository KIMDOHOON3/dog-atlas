import Image from "next/image";
import Link from "next/link";
import { CategoryExplorer } from "@/components/category-explorer";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { breeds, getBreed } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import styles from "./page.module.css";

export const revalidate = 86400;

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
      <main id="main" data-home-theme="warm-3d">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 className={styles.searchTitle} id="hero-title">외모보다, 함께할 생활을 먼저 살펴봐요.</h1>
            <p className={styles.heroDescription}>강아지가 필요로 하는 시간과 환경을 이해하고, 궁금한 견종의 이야기를 천천히 찾아보세요.</p>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn, illustration }) => {
              const master = getMasterBreed(slug);
              return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
            })} />
          </div>
          <figure className={styles.heroVisual}>
            <div
              className={styles.heroScene}
              role="img"
              aria-label="웃는 재패니즈 스피츠가 꼬리를 흔들고, 주변에 산책줄과 빗, 산책 수건, 물그릇이 차례로 나타나는 3D 생활 디오라마"
            >
              <Image
                className={styles.sceneBase}
                src="/illustrations/v9/home-spitz-tail-free-base.png"
                alt=""
                fill
                priority
                unoptimized
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 48vw, 680px"
              />
              <Image
                className={styles.sceneTail}
                src="/illustrations/v9/home-spitz-tail.png"
                alt=""
                fill
                priority
                unoptimized
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 48vw, 680px"
              />
              {[
                { className: styles.moduleLeash, src: "/illustrations/v9/home-care-leash.webp" },
                { className: styles.moduleBrush, src: "/illustrations/v9/home-care-brush.webp" },
                { className: styles.moduleCloth, src: "/illustrations/v9/home-care-cloth.webp" },
                { className: styles.moduleBowl, src: "/illustrations/v9/home-care-bowl.webp" },
              ].map((module) => (
                <span className={`${styles.careModule} ${module.className}`} key={module.src}>
                  <Image src={module.src} alt="" fill loading="eager" sizes="31vw" unoptimized />
                </span>
              ))}
            </div>
            <figcaption>귀여운 첫인상 다음에는 매일의 돌봄이 이어져요.</figcaption>
          </figure>
        </section>

        <CategoryExplorer />

        <section className={styles.familiar} aria-labelledby="familiar-title">
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>익숙한 이름부터</p>
              <h2 id="familiar-title">한 번쯤 들어본 견종을 살펴보세요.</h2>
            </div>
            <Link href="/curiosity/regulated-care">전체 견종 모아보기 <span aria-hidden="true">→</span></Link>
          </header>
          <nav className={styles.breedRail} aria-label="먼저 살펴볼 익숙한 견종">
            {familiarBreeds.map((breed) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug}>
                <Image src={breed.illustration} alt="" width={280} height={280} sizes="(max-width: 767px) 38vw, 180px" />
                <span>
                  <strong>{breed.nameKo}</strong>
                  <small>{breed.nameEn}</small>
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <section className={styles.principle} aria-label="강아지 도감의 관점">
          <p>강아지를 고르는 일이 아니라, 한 생명과 함께할 생활을 미리 이해하는 것.</p>
          <Link href="/discover">내 생활에서 살펴보기 <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <footer className={styles.footer}>견종의 특성은 일반적인 경향이며 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.</footer>
    </>
  );
}
