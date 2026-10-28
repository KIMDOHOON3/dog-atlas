import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoverExplorer } from "@/features/discovery/discover-explorer";
import { DiscoverSearch } from "@/features/discovery/discover-search";
import { FamiliarBreedStart } from "@/features/discovery/familiar-breed-start";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getBreedSearchOptions } from "@/lib/breeds/breed-search-options";
import { toDiscoverBreed } from "@/features/discovery/discover-breeds";
import { createPageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
import entrance from "@/components/page-entrance.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "견종 발견",
  description: "익숙한 견종 이름부터 생활 조건까지, 376종의 이야기를 천천히 탐색해보세요.",
  path: "/discover",
});

export default function DiscoverPage() {
  const breedOptions = getBreedSearchOptions();

  return (
    <>
      <a className="skip-link" href="#discover-results-title">본문으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <div className={styles.introShell}>
          <header className={`${styles.intro} ${entrance.title}`}>
            <h1>이름으로 찾거나,<br /><em>생활</em>에서 발견하세요.</h1>
            <span>아는 견종이 없다면 익숙한 이름과 생활 조건에서 시작해보세요.</span>
          </header>
          <Suspense fallback={null}>
            <DiscoverSearch breeds={breedOptions} />
          </Suspense>
        </div>
        <FamiliarBreedStart breeds={breeds} />
        <Suspense fallback={<div className={styles.loading}>견종 필터를 준비하고 있어요.</div>}>
          <DiscoverExplorer breeds={breeds.map((breed) => toDiscoverBreed(breed))} />
        </Suspense>
      </main>
    </>
  );
}
