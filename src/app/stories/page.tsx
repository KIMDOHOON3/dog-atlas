import type { Metadata } from "next";
import { BreedNameStoriesExplorer } from "@/components/breed-name-stories-explorer";
import { HomeCuriosityExplorer } from "@/components/home-curiosity-explorer";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "견종 이야기",
  description: "견종 이름에 남은 옛 역할과 외형·기록에서 시작하는 호기심 이야기를 살펴보세요.",
};

const curiosityThemes = homeCuriosityThemes.map(({ key, label, thumbnailSlug, heading, description, selectionNote, moreLabel, items }) => ({
  key,
  label,
  thumbnailSlug,
  heading,
  description,
  selectionNote,
  moreLabel,
  items: items.slice(0, 3),
}));
const curiosityBreedSlugs = new Set(curiosityThemes.flatMap((theme) => [theme.thumbnailSlug, ...theme.items.map((item) => item.slug)]));
const curiosityBreeds = breeds.filter((breed) => curiosityBreedSlugs.has(breed.slug));

export default function StoriesPage() {
  return (
    <>
      <a className="skip-link" href="#story-content">견종 이야기로 바로가기</a>
      <SiteHeader />
      <main id="story-content">
        <header className={styles.hero}>
          <p>견종 이야기</p>
          <h1>이름과 특징에서 시작하는{" "}<br />강아지 이야기</h1>
          <span>이름에 남은 옛 역할부터 외형과 기록에 얽힌 호기심까지, 여러 관점으로 견종을 만나보세요.</span>
        </header>
        <BreedNameStoriesExplorer />
        <HomeCuriosityExplorer breeds={curiosityBreeds} themes={curiosityThemes} />
      </main>
    </>
  );
}
