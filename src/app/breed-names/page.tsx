import type { Metadata } from "next";
import { BreedNameStoriesExplorer } from "@/components/breed-name-stories-explorer";
import { SiteHeader } from "@/components/site-header";
import styles from "./index.module.css";

export const metadata: Metadata = {
  title: "이름 속 견종",
  description: "견종 이름에 남은 옛 역할과 어원을 대표 견종과 함께 살펴보세요.",
};

export default function BreedNamesPage() {
  return (
    <>
      <a className="skip-link" href="#breed-name-stories">이름 속 견종으로 바로가기</a>
      <SiteHeader />
      <main>
        <header className={styles.hero}>
          <p>이름 속 견종</p>
          <h1>이름을 읽으면{" "}<br />견종의 옛일이 보여요.</h1>
          <span>Pointer, Retriever, Terrier처럼 이름에 남은 역할과 어원을 대표 견종부터 살펴보세요.</span>
        </header>
        <BreedNameStoriesExplorer />
      </main>
    </>
  );
}
