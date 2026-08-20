import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoverExplorer } from "@/components/discover-explorer";
import { DiscoverSearch } from "@/components/discover-search";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import { getMasterBreed } from "@/content/breeds/master-catalog";
import { toDiscoverBreed } from "@/lib/discover-breeds";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "견종 발견",
  description: "이름을 몰라도 괜찮아요. 원하는 특성을 선택하면서 견종을 살펴보세요.",
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
            <p>견종 발견</p>
            <h1>이름을 몰라도 괜찮아요.</h1>
            <span>원하는 특성을 선택하면서 여러 견종의 생활과 배경을 살펴보세요.</span>
          </header>
          <Suspense fallback={null}>
            <DiscoverSearch breeds={breedOptions} />
          </Suspense>
        </div>
        <Suspense fallback={<div className={styles.loading}>견종 필터를 준비하고 있어요.</div>}>
          <DiscoverExplorer breeds={breeds.map(toDiscoverBreed)} />
        </Suspense>
      </main>
    </>
  );
}
