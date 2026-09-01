import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BeginnerGuide } from "@/components/beginner-guide";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { LegalCareNotice } from "@/components/legal-care-notice";
import { JapaneseSpitzReadiness } from "@/components/japanese-spitz-readiness";
import { getBreed } from "@/content/breeds/data";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
import { getBreedSizePresentation } from "@/lib/breed-size-presentation";
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
  const isReadinessPilot = breed.slug === "japanese-spitz";
  const sizeDisplay = getBreedSizePresentation(breed.slug).displayLabel;

  return (
    <>
      <a className="skip-link" href="#guide-content">맞이 준비 가이드로 바로가기</a>
      <SiteHeader />
      <main id="guide-content" className={styles.main}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{isReadinessPilot ? "맞이 준비도 진단 · 시범 운영" : "처음 함께 살기 위한 4단계"}</p>
            <h1>{isReadinessPilot ? <>{breed.nameKo}와 살<br />현실을 확인해볼까요?</> : <>{breed.nameKo}를<br />맞이할 준비를 해볼까요?</>}</h1>
            <p>{isReadinessPilot ? "좋아하는 마음만큼 중요한 주거, 시간, 비용과 견종 이해를 한 질문씩 점검해보세요. 점수는 결정을 대신하지 않고, 지금 보완할 조건을 찾는 데 사용합니다." : "많이 준비할 필요는 없어요. 데려오기 전 꼭 확인할 것부터 첫 생활과 보호자의 마음가짐까지, 지금 필요한 내용만 차례로 살펴보세요."}</p>
          </div>
          <aside className={styles.breedCard} aria-label={`선택한 강아지 ${breed.nameKo}`}>
            <BreedVisual breed={breed} variant="tile" />
            <div><small>내가 선택한 강아지</small><strong>{breed.nameKo}</strong><span>{sizeDisplay ? `${sizeDisplay} · ` : ""}{breed.identity.lineage}</span></div>
          </aside>
        </header>

        {isKoreanManagedBreed(breed.slug) && <LegalCareNotice breedName={breed.nameKo} />}
        {isReadinessPilot ? <JapaneseSpitzReadiness /> : <BeginnerGuide slug={breed.slug} nameKo={breed.nameKo} />}
        <p className={styles.disclaimer}>이 가이드는 첫 준비를 위한 출발점이에요. 함께 살면서 보이는 반응과 생활 변화를 관찰하고, 필요한 주제는 신뢰할 수 있는 전문가 자료로 계속 배워가세요.</p>
      </main>
    </>
  );
}
