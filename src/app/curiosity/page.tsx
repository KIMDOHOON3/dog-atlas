import type { Metadata } from "next";
import { HomeCuriosityExplorer } from "@/components/home-curiosity-explorer";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import styles from "./index.module.css";

export const metadata: Metadata = {
  title: "견종 호기심 탐험",
  description: "크기와 외형, 이름 속 직업과 기록을 따라 다양한 견종을 발견해 보세요.",
};

const curiosityThemes = homeCuriosityThemes.map(({ key, label, thumbnailSlug, heading, description }) => ({
  key,
  label,
  thumbnailSlug,
  heading,
  description,
}));
const curiosityBreedSlugs = new Set(curiosityThemes.map((theme) => theme.thumbnailSlug));
const curiosityBreeds = breeds.filter((breed) => curiosityBreedSlugs.has(breed.slug));

export default function CuriosityPage() {
  return (
    <>
      <a className="skip-link" href="#curiosity">견종 호기심 탐험으로 바로가기</a>
      <SiteHeader />
      <main>
        <header className={styles.hero}>
          <p>견종 호기심 탐험</p>
          <h1>궁금한 특징에서{" "}<br />새로운 견종을 만나요.</h1>
          <span>큰 체구와 독특한 털부터 이름 속 직업과 도그쇼 기록까지, 궁금한 주제를 따라 살펴보세요.</span>
        </header>
        <HomeCuriosityExplorer breeds={curiosityBreeds} themes={curiosityThemes} />
      </main>
    </>
  );
}
