import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BeginnerGuide } from "@/components/beginner-guide";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { getBreed } from "@/content/breeds/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "처음 함께 살기 가이드",
  description: "강아지를 데려오기 전부터 첫 생활과 보호자의 마음가짐까지 꼭 필요한 준비를 차례로 확인합니다.",
};

type PageProps = { searchParams: Promise<{ breed?: string | string[] }> };

export default async function BeginnerGuidePage({ searchParams }: PageProps) {
  const breedParam = (await searchParams).breed;
  const breed = typeof breedParam === "string" ? getBreed(breedParam) : undefined;
  if (!breed) redirect("/discover");

  return (
    <>
      <a className="skip-link" href="#guide-content">맞이 준비 가이드로 바로가기</a>
      <SiteHeader />
      <main id="guide-content" className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href={`/breeds/${breed.slug}`}>← {breed.nameKo} 이야기로 돌아가기</Link>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>처음 함께 살기 위한 4단계</p>
            <h1>{breed.nameKo}를<br />맞이할 준비를 해볼까요?</h1>
            <p>많이 준비할 필요는 없어요. 데려오기 전 꼭 확인할 것부터 첫 생활과 보호자의 마음가짐까지, 지금 필요한 내용만 차례로 살펴보세요.</p>
          </div>
          <aside className={styles.breedCard} aria-label={`선택한 강아지 ${breed.nameKo}`}>
            <BreedVisual breed={breed} variant="tile" />
            <div><small>내가 선택한 강아지</small><strong>{breed.nameKo}</strong><span>{breed.identity.size} · {breed.identity.lineage}</span></div>
          </aside>
        </header>

        <BeginnerGuide slug={breed.slug} nameKo={breed.nameKo} />
        <p className={styles.disclaimer}>이 가이드는 첫 준비를 위한 출발점이에요. 함께 살면서 보이는 반응과 생활 변화를 관찰하고, 필요한 주제는 신뢰할 수 있는 전문가 자료로 계속 배워가세요.</p>
      </main>
    </>
  );
}
