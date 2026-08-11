import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { CategoryExplorer } from "@/components/category-explorer";
import { DogIcon } from "@/components/dog-icon";
import { SearchBox } from "@/components/search-box";
import { SiteHeader } from "@/components/site-header";
import { StoryGlyph } from "@/components/story-glyph";
import { TodayBreedCarousel } from "@/components/today-breed-carousel";
import { breedNameStories } from "@/content/breed-name-stories";
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

const browseCollections = [
  { key: "roles", title: "사람과 함께 일해 온 견종", description: "목양·수호·사냥처럼 원래 역할의 흔적을 살펴보세요.", slugs: ["border-collie", "mongolian-bankhar", "greyhound", "samoyed"] },
  { key: "origins", title: "각 지역의 환경에서 형성된 견종", description: "서로 다른 기후와 지형이 견종의 모습과 생활에 남긴 이야기를 봐요.", slugs: ["japanese-spitz", "norwegian-lundehund", "saluki", "newfoundland"] },
  { key: "unfamiliar", title: "처음 보면 낯선 견종", description: "이름은 낯설어도, 각자의 역할과 배경이 분명한 견종들이에요.", slugs: ["mudi", "karelian-bear-dog", "sapsaree", "icelandic-sheepdog"] },
] as const;

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

        <nav className={styles.homeShortcuts} aria-label="홈 바로가기">
          <Link href="/discover"><DogIcon name="discover" className={styles.homeIcon} /><span>견종 발견</span></Link>
          <Link href="/compare"><DogIcon name="compare" className={styles.homeIcon} /><span>견종 비교</span></Link>
          <Link href="/discover#history-title"><DogIcon name="history" className={styles.homeIcon} /><span>역할과 역사</span></Link>
          <Link href="/discover"><DogIcon name="unfamiliar" className={styles.homeIcon} /><span>처음 보는 견종</span></Link>
        </nav>

        <CategoryExplorer breeds={breeds} mode="quick" />

        <section className={styles.browseCollections} aria-labelledby="browse-collections-title">
          <header><p className={styles.eyebrow}>편집 큐레이션</p><h2 id="browse-collections-title">이야기로 강아지를 둘러보세요.</h2><span>이름 속 단서와 역할, 지역, 낯선 배경을 따라 골라볼 수 있어요.</span></header>
          <div className={styles.collectionList}>
            <section className={`${styles.collection} ${styles.nameStoryCollection}`} aria-labelledby="name-story-title">
              <div className={styles.collectionHeading}>
                <div>
                  <h3 id="name-story-title">이름을 읽으면 옛일이 보여요.</h3>
                  <p>Pointer, Retriever, Spaniel 같은 말에 어떤 역할과 역사가 남았는지 살펴보세요.</p>
                </div>
                <span className={styles.storySwipeHint}>옆으로 넘겨 보기 →</span>
              </div>
              <div className={styles.nameStoryGrid}>
                {breedNameStories.map((story) => {
                  const leadBreed = getBreed(story.examples[0].slug);
                  if (!leadBreed) return null;

                  return (
                    <article className={styles.nameStoryCard} key={story.key}>
                      <Link className={styles.nameStoryLead} href={`/breeds/${leadBreed.slug}`} aria-label={`${leadBreed.nameKo} 상세 정보 보기`}>
                        <BreedVisual breed={leadBreed} variant="tile" />
                      </Link>
                      <div className={styles.nameStoryHead}>
                        <span>{story.term}</span>
                        <h4>{story.meaning}</h4>
                      </div>
                      <p className={styles.nameStoryDescription}>{story.description}</p>
                      <ul className={styles.nameStoryExamples} aria-label={`${story.term} 관련 견종`}>
                        {story.examples.map((example) => {
                          const breed = getBreed(example.slug);
                          if (!breed) return null;

                          return (
                            <li key={example.slug}>
                              <Link href={`/breeds/${breed.slug}`}>
                                <strong>{breed.nameKo}</strong>
                                <span>{example.cue}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
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
            {browseCollections.map((collection) => {
              const collectionBreeds = collection.slugs.map((slug) => getBreed(slug)).filter((breed): breed is NonNullable<typeof breed> => Boolean(breed));
              return (
                <section className={styles.collection} key={collection.key} aria-labelledby={`${collection.key}-title`}>
                  <div className={styles.collectionHeading}><div><h3 id={`${collection.key}-title`}>{collection.title}</h3><p>{collection.description}</p></div><Link href="/discover">전체 견종 보기 →</Link></div>
                  <div className={styles.collectionGrid}>
                    {collectionBreeds.map((breed) => (
                      <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                        <BreedVisual breed={breed} variant="tile" />
                        <div><strong>{breed.nameKo}</strong><span aria-hidden="true">↗</span><small>{breed.identity.origin} · {breed.identity.originalRole}</small></div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
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
