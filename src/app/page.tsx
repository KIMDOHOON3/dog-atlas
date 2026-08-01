import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { breeds, getBreed } from "@/content/breeds/data";
import styles from "./page.module.css";

const spitz = getBreed("japanese-spitz")!;
const borderCollie = getBreed("border-collie")!;
const greyhound = getBreed("greyhound")!;

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
            <p className={styles.eyebrow}>살아 있는 강아지 도감</p>
            <h1 id="hero-title">아직 모르는 강아지를<br />만나보세요.</h1>
            <p className={styles.lead}>생김새 너머의 역사와, 함께 사는 현실까지.</p>
          </div>
          <BreedVisual breed={spitz} variant="hero" label="오늘의 강아지 · 재패니즈 스피츠" priority />
          <div className={styles.heroSearch}>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn }) => ({ slug, nameKo, nameEn }))} />
            <Link className={styles.todayLink} href="/breeds/japanese-spitz">오늘의 강아지 자세히 보기 <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className={styles.browse} id="discover" aria-labelledby="browse-title">
          <header><h2 id="browse-title">강아지 둘러보기</h2><p>관심 가는 한 마리부터 천천히 알아보세요.</p></header>
          <div className={styles.breedGrid}>
            {breeds.map((breed) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                <BreedVisual breed={breed} variant="tile" />
                <div><strong>{breed.nameKo}</strong><span aria-hidden="true">↗</span><small>{breed.identity.origin} · {cardTraits[breed.slug]}</small></div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.curations} aria-label="편집 추천">
          <article className={styles.feature}>
            <BreedVisual breed={spitz} variant="card" />
            <div>
              <p className={styles.eyebrow}>오늘 처음 만나는 강아지</p>
              <h2>익숙한 흰 털 뒤에 기민하고 다정한 일상이 있어요.</h2>
              <p>{spitz.story.roleToHome}</p>
              <dl><div><dt>형성 지역</dt><dd>{spitz.identity.origin}</dd></div><div><dt>원래 역할</dt><dd>{spitz.identity.originalRole}</dd></div></dl>
              <Link href={`/breeds/${spitz.slug}`}>재패니즈 스피츠 알아보기 →</Link>
            </div>
          </article>

          <div className={styles.rhythmSection}>
            <header><p className={styles.eyebrow}>외모만 보면 놓치는 것</p><h2>달리는 모습이 닮아도 필요한 하루는 달라요.</h2></header>
            <div>
              {[borderCollie, greyhound].map((breed) => (
                <Link className={styles.rhythmCard} href={`/breeds/${breed.slug}`} key={breed.slug}>
                  <BreedVisual breed={breed} variant="landscape" />
                  <div><strong>{breed.nameKo}</strong><p>{breed.story.roleToHome}</p><span>생활 리듬 살펴보기 →</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>견종의 특성은 일반적 경향이며 실제 개체와 환경에 따라 달라질 수 있어요.</footer>
    </>
  );
}
