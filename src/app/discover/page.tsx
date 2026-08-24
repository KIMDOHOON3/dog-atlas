import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoverExplorer } from "@/components/discover-explorer";
import { DiscoverSearch } from "@/components/discover-search";
import { FamiliarBreedStart } from "@/components/familiar-breed-start";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import { toDiscoverBreed } from "@/lib/discover-breeds";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "견종 발견",
  description: "익숙한 견종 이름부터 생활 조건까지, 376종의 이야기를 천천히 탐색해보세요.",
};

export default function DiscoverPage() {
  const breedOptions = breeds.map(({ slug, nameKo, nameEn, illustration }) => {
    const master = getMasterBreed(slug);
    return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
  });

  return (
    <>
      <a className="skip-link" href="#discover-results-title">본문으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <div className={styles.introShell}>
          <header className={styles.intro}>
            <h1>아는 이름부터,<br />함께할 생활까지 살펴봐요.</h1>
            <span>견종 이름을 검색하거나 익숙한 이름에서 시작해보세요.</span>
          </header>
          <Suspense fallback={null}>
            <DiscoverSearch breeds={breedOptions} />
          </Suspense>
        </div>
        <FamiliarBreedStart breeds={breeds} />
        <Suspense fallback={<div className={styles.loading}>견종 필터를 준비하고 있어요.</div>}>
          <DiscoverExplorer breeds={breeds.map(toDiscoverBreed)} />
        </Suspense>
      </main>
    </>
  );
}
