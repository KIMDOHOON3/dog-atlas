import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getHomeCuriosityBreeds, getHomeCuriosityTheme, homeCuriosityThemes } from "@/content/home-curiosity";
import { toCuriosityBreedCard } from "@/lib/curiosity-breed-data";
import { CuriosityBreedGrid } from "./curiosity-breed-grid";
import { createPageMetadata } from "@/lib/site-metadata";
import { getBreedCardImage } from "@/lib/breed-image-assets";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ key: string }> };

export function generateStaticParams() {
  return homeCuriosityThemes.map((theme) => ({ key: theme.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const theme = getHomeCuriosityTheme((await params).key);
  if (!theme) return {};

  const example = getHomeCuriosityBreeds(theme, breeds)[0]?.breed;
  return createPageMetadata({
    title: `${theme.label} 견종 이야기`,
    description: theme.collectionDescription,
    path: `/curiosity/${theme.key}`,
    image: example ? getBreedCardImage(example.slug) : undefined,
    imageAlt: example ? `${theme.label} 견종 이야기를 소개하는 ${example.nameKo} 일러스트` : undefined,
  });
}

export default async function CuriosityThemePage({ params }: PageProps) {
  const key = (await params).key;
  if (key === "names-at-work") redirect("/curiosity/regulated-care");
  const theme = getHomeCuriosityTheme(key);
  if (!theme) notFound();

  const themeBreeds = getHomeCuriosityBreeds(theme, breeds);
  const selectionSentences = theme.selectionNote.match(/[^.!?]+[.!?]?/gu)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [theme.selectionNote];
  const [selectionLead, ...selectionDetails] = selectionSentences;

  return (
    <>
      <a className="skip-link" href="#curiosity-results">테마 견종 목록으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="curiosity-theme-title">
          <p className={styles.eyebrow}>견종 호기심 탐험</p>
          <span className={styles.term}>{theme.label}</span>
          <h1 id="curiosity-theme-title">{theme.collectionTitle}</h1>
        </section>

        <nav className={styles.themeNav} aria-label="다른 호기심 주제 살펴보기">
          {homeCuriosityThemes.map((item) => (
            <Link href={`/curiosity/${item.key}`} key={item.key} aria-current={item.key === theme.key ? "page" : undefined}>{item.label}</Link>
          ))}
        </nav>

        <section className={styles.results} id="curiosity-results" aria-labelledby="curiosity-results-title">
          <header>
            <p className={styles.eyebrow}>이 주제로 만나는 견종</p>
            <h2 id="curiosity-results-title">{selectionLead}</h2>
            {selectionDetails.length > 0 && <p>{selectionDetails.join(" ")}</p>}
          </header>

          <CuriosityBreedGrid breeds={themeBreeds.map(toCuriosityBreedCard)} />
        </section>

        <aside className={styles.guide} aria-labelledby="curiosity-guide-title">
          <div>
            <p className={styles.eyebrow}>읽는 방법</p>
            <h2 id="curiosity-guide-title">재미있는 특징은 발견의 시작점이에요.</h2>
            <p>한 가지 외형이나 기록만으로 함께 살기 좋은지를 판단할 수는 없어요. 관심 가는 견종을 찾았다면 상세 페이지에서 역할의 역사와 활동, 관계, 관리 조건을 함께 확인해 주세요.</p>
          </div>
          <div className={styles.sources}>
            <strong>이 테마에서 확인한 자료</strong>
            {theme.sources.map((source) => (
              <a href={source.url} key={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </aside>
      </main>
    </>
  );
}
