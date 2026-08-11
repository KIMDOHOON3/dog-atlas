import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { CategoryExplorer } from "@/components/category-explorer";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { StoryGlyph } from "@/components/story-glyph";
import { TodayBreedCarousel } from "@/components/today-breed-carousel";
import { breedNameStories, getBreedNameStoryBreeds } from "@/content/breed-name-stories";
import { breeds, getBreed } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import styles from "./page.module.css";

const spitz = getBreed("japanese-spitz")!;
const borderCollie = getBreed("border-collie")!;
const greyhound = getBreed("greyhound")!;

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
            <p className={styles.eyebrow}>살아 있는 강아지 도감</p>
            <h1 id="hero-title">아직 모르는 강아지를 만나보세요.</h1>
            <p className={styles.lead}>생김새 너머의 역사와, 함께 사는 현실까지.</p>
          </div>
          <TodayBreedCarousel breeds={breeds} initialIndex={0} />
          <div className={styles.heroSearch}>
            <SearchBox breeds={breeds.map(({ slug, nameKo, nameEn }) => {
              const master = getMasterBreed(slug);
              return { slug, nameKo, nameEn, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
            })} />
          </div>
        </section>

        <CategoryExplorer />

        <section className={styles.browseCollections} id="breed-name-stories" aria-labelledby="browse-collections-title">
          <header><p className={styles.eyebrow}>이름 속 견종</p><h2 id="browse-collections-title">견종 이름은 어디에서 왔을까요?</h2><span>이름에 남은 옛 역할과 역사를 대표 견종부터 가볍게 살펴보세요.</span></header>
          <div className={styles.collectionList}>
            <section className={`${styles.collection} ${styles.nameStoryCollection}`} aria-labelledby="name-story-title">
              <div className={styles.collectionHeading}>
                <div>
                  <h3 id="name-story-title">이름을 읽으면 옛일이 보여요.</h3>
                  <p>각 이름마다 대표 견종 4종을 먼저 보고, 더보기에서 연결된 견종을 모두 만날 수 있어요.</p>
                </div>
                <span className={styles.storySwipeHint}>옆으로 넘겨 보기 →</span>
              </div>
              <div className={styles.nameStoryGrid}>
                {breedNameStories.map((story) => {
                  const storyBreeds = getBreedNameStoryBreeds(story.key, breeds);

                  return (
                    <article className={styles.nameStoryCard} key={story.key} aria-labelledby={`${story.key}-story-title`}>
                      <div className={styles.nameStoryHead}>
                        <span>{story.term}</span>
                        <h4 id={`${story.key}-story-title`}>{story.meaning}</h4>
                      </div>
                      <p className={styles.nameStoryDescription}>{story.description}</p>
                      <div className={styles.nameStoryRepresentative}><span>대표 견종</span><strong>4종</strong></div>
                      <ul className={styles.nameStoryExamples} aria-label={`${story.term} 관련 견종`}>
                        {story.examples.map((example) => {
                          const breed = getBreed(example.slug);
                          if (!breed) return null;

                          return (
                            <li key={example.slug}>
                              <Link href={`/breeds/${breed.slug}`} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                                <BreedVisual breed={breed} variant="tile" />
                                <div>
                                  <strong>{breed.nameKo}</strong>
                                  <span>{example.cue}</span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <Link className={styles.nameStoryMore} href={`/breed-names/${story.key}`}>
                        현재 도감에서 {storyBreeds.length}종 더 보기 <span aria-hidden="true">→</span>
                      </Link>
                      <div className={styles.nameStorySources}>
                        <span>자료</span>
                        {story.sources.map((source) => (
                          <a href={source.url} key={source.url} target="_blank" rel="noreferrer" aria-label={`${source.organization} 자료 새 창에서 열기`}>
                            {source.label} ↗
                          </a>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className={styles.nameStoryDisclaimer}>이름은 역사적 역할을 읽는 단서예요. 같은 이름군의 모든 견종이나 오늘의 개체가 똑같이 행동한다는 뜻은 아닙니다.</p>
            </section>
          </div>
        </section>

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

        <section className={styles.curations} aria-label="편집 추천">
          <article className={styles.feature}>
            <BreedVisual breed={spitz} variant="card" />
            <div>
              <div className={styles.sectionCue}><StoryGlyph kind="discover" /><p className={styles.eyebrow}>오늘 처음 만나는 강아지</p></div>
              <h2>가족과의 교감, 알림 행동, 이중모 관리를 함께 살펴봐요.</h2>
              <p>{spitz.story.roleToHome}</p>
              <dl><div><dt>형성 지역</dt><dd>{spitz.identity.origin}</dd></div><div><dt>원래 역할</dt><dd>{spitz.identity.originalRole}</dd></div></dl>
              <Link href={`/breeds/${spitz.slug}`}>재패니즈 스피츠 알아보기 →</Link>
            </div>
          </article>

          <div className={styles.rhythmSection}>
            <header><div className={styles.sectionCue}><StoryGlyph kind="daily" /><p className={styles.eyebrow}>외모만 보면 놓치는 것</p></div><h2>달리는 모습이 닮아도 필요한 하루는 달라요.</h2></header>
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
