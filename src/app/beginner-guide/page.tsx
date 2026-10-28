import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BeginnerGuide } from "@/features/guide/beginner-guide";
import { withAndParticle } from "@/lib/korean-particles";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { LegalCareNotice } from "@/components/legal-care-notice";
import { getBreed } from "@/content/breeds/data";
import { isKoreanManagedBreed } from "@/lib/breeds/breed-legal-care";
import { getBreedSizePresentation } from "@/lib/breeds/breed-size-presentation";
import { createPageMetadata } from "@/lib/site-metadata";
import { getBreedCardImage } from "@/lib/breeds/breed-image-assets";
import styles from "./page.module.css";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const breedParam = (await searchParams).breed;
  const breed = typeof breedParam === "string" ? getBreed(breedParam) : undefined;
  if (!breed) return {};
  return createPageMetadata({
    title: `${breed.nameKo} 맞이 준비 가이드`,
    description: "강아지를 데려오기 전부터 첫 생활과 보호자의 마음가짐까지 꼭 필요한 준비를 차례로 확인합니다.",
    path: `/beginner-guide?breed=${encodeURIComponent(breed.slug)}`,
    image: getBreedCardImage(breed.slug),
    imageAlt: `${breed.nameKo} 맞이 준비 가이드의 견종 일러스트`,
  });
}

type PageProps = { searchParams: Promise<{ breed?: string | string[] }> };

export default async function BeginnerGuidePage({ searchParams }: PageProps) {
  const breedParam = (await searchParams).breed;
  const breed = typeof breedParam === "string" ? getBreed(breedParam) : undefined;
  if (!breed) redirect("/discover");
  const sizeDisplay = getBreedSizePresentation(breed.slug).displayLabel;

  return (
    <>
      <a className="skip-link" href="#guide-content">맞이 준비 가이드로 바로가기</a>
      <SiteHeader />
      <main id="guide-content" className={styles.main}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>처음 함께 살기 위한 안내</p>
            <h1>{withAndParticle(breed.nameKo)} 함께할<br />첫 생활을 알아보세요.</h1>
            <p>데려오기 전 필요한 준비와 첫 생활 안내를 자유롭게 살펴보세요.</p>
          </div>
          <aside className={styles.breedCard} aria-label={`선택한 강아지 ${breed.nameKo}`}>
            <BreedVisual breed={breed} variant="tile" />
            <div><small>내가 선택한 강아지</small><strong>{breed.nameKo}</strong><span>{sizeDisplay ? `${sizeDisplay} · ` : ""}{breed.identity.lineage}</span></div>
          </aside>
        </header>

        {isKoreanManagedBreed(breed.slug) && <LegalCareNotice breedName={breed.nameKo} />}
        <BeginnerGuide />
        <p className={styles.disclaimer}>이 가이드는 첫 준비를 위한 출발점이에요. 함께 살면서 보이는 반응과 생활 변화를 관찰하고, 필요한 주제는 신뢰할 수 있는 전문가 자료로 계속 배워가세요.</p>
      </main>
    </>
  );
}
