import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DiscoverExplorer } from "@/components/discover-explorer";
import { SiteHeader } from "@/components/site-header";
import { breeds } from "@/content/breeds/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "견종 발견",
  description: "이름을 몰라도 괜찮아요. 원하는 특성을 선택하면서 견종을 살펴보세요.",
};

export default function DiscoverPage() {
  return (
    <>
      <a className="skip-link" href="#discover-results-title">본문으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">도감</Link><span aria-hidden="true">/</span><span aria-current="page">견종 발견</span></nav>
        <header className={styles.intro}>
          <p>견종 발견</p>
          <h1>이름을 몰라도 괜찮아요.</h1>
          <span>원하는 특성을 선택하면서 여러 견종의 생활과 배경을 살펴보세요.</span>
        </header>
        <Suspense fallback={<div className={styles.loading}>견종 필터를 준비하고 있어요.</div>}>
          <DiscoverExplorer breeds={breeds} />
        </Suspense>
      </main>
    </>
  );
}
