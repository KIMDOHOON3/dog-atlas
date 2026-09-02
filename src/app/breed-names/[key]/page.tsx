import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { breedNameStories, getBreedNameStory, getBreedNameStoryBreeds } from "@/content/breed-name-stories";
import { breeds, getBreed } from "@/content/breeds/data";
import { presentBreedOrigin } from "@/lib/breed-origin-presentation";
import { createPageMetadata } from "@/lib/site-metadata";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ key: string }> };

const storyLabelsKo = {
  pointer: "포인터",
  retriever: "리트리버",
  setter: "세터",
  spaniel: "스패니얼",
  shepherd: "쉽독·셰퍼드",
  terrier: "테리어",
} satisfies Record<(typeof breedNameStories)[number]["key"], string>;

export function generateStaticParams() {
  return breedNameStories.map((story) => ({ key: story.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = getBreedNameStory((await params).key);
  if (!story) return {};

  const example = story.examples.map((item) => getBreed(item.slug)).find(Boolean);
  return createPageMetadata({
    title: `${story.term} 이름의 유래와 관련 견종`,
    description: `${story.term}가 뜻하는 ${story.meaning}의 역사와 현재 도감에 수록된 관련 견종을 살펴봅니다.`,
    path: `/breed-names/${story.key}`,
    image: example ? getBreedCardImage(example.slug) : undefined,
    imageAlt: example ? `${story.term} 이름의 유래를 소개하는 ${example.nameKo} 일러스트` : undefined,
  });
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
  if (representativeBreeds.length === 0) notFound();

  return (
    <>
      <a className="skip-link" href="#name-story-results">관련 견종 목록으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <header className={styles.intro} aria-labelledby="name-story-title">
          <div className={styles.introTitle}>
            <p className={styles.eyebrow}>견종 이름의 유래</p>
            <span className={styles.term}>{story.term}</span>
            <h1 id="name-story-title">{story.meaning}</h1>
            <p className={styles.description}>{story.description}</p>
          </div>
        </header>

        <nav className={styles.storyNav} aria-label="다른 견종 이름 살펴보기">
          {breedNameStories.map((item) => (
            <Link href={`/breed-names/${item.key}`} key={item.key} aria-current={item.key === story.key ? "page" : undefined}>
              <strong>{storyLabelsKo[item.key]}</strong>
              <small>({item.term})</small>
            </Link>
          ))}
        </nav>

        <section className={styles.results} id="name-story-results" aria-label={`${story.term} 이름과 관련된 견종`}>
          <div className={styles.breedGrid}>
            {storyBreeds.map((breed) => (
              <Link className={styles.breedCard} href={`/breeds/${breed.slug}`} key={breed.slug} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                <BreedVisual breed={breed} variant="tile" />
                <div>
                  <small>{breed.nameEn}</small>
                  <h3>{breed.nameKo}</h3>
                  <p>{breed.identity.originalRole}</p>
                  <span className={styles.origin}>{presentBreedOrigin(breed.identity.origin)} <b aria-hidden="true">→</b></span>
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
