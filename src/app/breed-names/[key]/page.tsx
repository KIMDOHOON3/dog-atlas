import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { breedNameStories, getBreedNameStory, getBreedNameStoryBreeds } from "@/content/breed-name-stories";
import { breeds, getBreed } from "@/content/breeds/data";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ key: string }> };

export function generateStaticParams() {
  return breedNameStories.map((story) => ({ key: story.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = getBreedNameStory((await params).key);
  if (!story) return {};

  return {
    title: `${story.term} 이름의 유래와 관련 견종`,
    description: `${story.term}가 뜻하는 ${story.meaning}의 역사와 현재 도감에 수록된 관련 견종을 살펴봅니다.`,
  };
}

export default async function BreedNameStoryPage({ params }: PageProps) {
  const story = getBreedNameStory((await params).key);
  if (!story) notFound();

  const representativeBreeds = story.examples.flatMap((example) => {
    const breed = getBreed(example.slug);
    return breed ? [breed] : [];
  });
  const representativeSlugs = new Set(representativeBreeds.map((breed) => breed.slug));
  const remainingBreeds = getBreedNameStoryBreeds(story.key, breeds)
    .filter((breed) => !representativeSlugs.has(breed.slug))
    .sort((a, b) => a.nameKo.localeCompare(b.nameKo, "ko"));
  const storyBreeds = [...representativeBreeds, ...remainingBreeds];
  const leadBreed = representativeBreeds[0];
  if (!leadBreed) notFound();

  return (
    <>
      <a className="skip-link" href="#name-story-results">관련 견종 목록으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href="/">도감</Link><span aria-hidden="true">/</span><Link href="/breed-names">이름 속 견종</Link><span aria-hidden="true">/</span><span aria-current="page">{story.term}</span>
        </nav>

        <section className={styles.hero} aria-labelledby="name-story-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>견종 이름의 유래</p>
            <span className={styles.term}>{story.term}</span>
            <h1 id="name-story-title">{story.meaning}</h1>
            <p className={styles.description}>{story.description}</p>
            <div className={styles.count}><strong>{storyBreeds.length}종</strong><span>현재 도감에서 이 이름과 연결해 볼 수 있어요.</span></div>
          </div>
          <Link className={styles.heroVisual} href={`/breeds/${leadBreed.slug}`} aria-label={`${leadBreed.nameKo} 상세 정보 보기`}>
            <BreedVisual breed={leadBreed} variant="card" priority />
            <span>대표 견종 · {leadBreed.nameKo}</span>
          </Link>
        </section>

        <nav className={styles.storyNav} aria-label="다른 견종 이름 살펴보기">
          {breedNameStories.map((item) => (
            <Link href={`/breed-names/${item.key}`} key={item.key} aria-current={item.key === story.key ? "page" : undefined}>{item.term}</Link>
          ))}
        </nav>

        <section className={styles.results} id="name-story-results" aria-labelledby="name-story-results-title">
          <header>
            <div><p className={styles.eyebrow}>이 이름과 연결된 견종</p><h2 id="name-story-results-title">현재 도감에서 {storyBreeds.length}종을 찾았어요.</h2></div>
            <p>{story.collectionDescription}</p>
          </header>
          <div className={styles.breedGrid}>
            {storyBreeds.map((breed, index) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                <BreedVisual breed={breed} variant="tile" />
                <div>
                  {index < representativeBreeds.length && <span className={styles.representative}>홈 대표 견종</span>}
                  <small>{breed.nameEn}</small>
                  <h3>{breed.nameKo}</h3>
                  <p>{breed.identity.originalRole}</p>
                  <span className={styles.origin}>{breed.identity.origin} <b aria-hidden="true">→</b></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className={styles.guide} aria-labelledby="name-story-guide-title">
          <div>
            <p className={styles.eyebrow}>읽는 방법</p>
            <h2 id="name-story-guide-title">이름은 시작점이지, 행동의 답은 아니에요.</h2>
            <p>같은 이름군 안에서도 형성 지역과 구체적인 역할이 다릅니다. 이름에 담긴 역사를 본 뒤 각 상세 페이지에서 생활 경향과 관리 조건을 따로 확인해 주세요.</p>
          </div>
          <div className={styles.sources}>
            <strong>확인한 자료</strong>
            {story.sources.map((source) => (
              <a href={source.url} key={source.url} target="_blank" rel="noreferrer">{source.organization} · {source.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </aside>
      </main>
    </>
  );
}
