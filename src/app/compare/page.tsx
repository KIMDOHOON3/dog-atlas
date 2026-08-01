import type { Metadata } from "next";
import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { SiteHeader } from "@/components/site-header";
import { getBreed } from "@/content/breeds/data";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "재패니즈 스피츠와 사모예드 비교", description: "비슷한 흰 스피츠형 외모 너머의 체격, 역사, 행동 경향과 생활 부담을 같은 기준으로 비교합니다." };

const spitz = getBreed("japanese-spitz")!;
const samoyed = getBreed("samoyed")!;
const rows = [
  { label: "형성 지역", left: spitz.identity.origin, right: samoyed.identity.origin },
  { label: "계통", left: spitz.identity.lineage, right: samoyed.identity.lineage },
  { label: "원래 역할", left: spitz.identity.originalRole, right: samoyed.identity.originalRole },
  { label: "체격", left: spitz.identity.size, right: samoyed.identity.size },
  { label: "신체 활동 경향", left: spitz.tendencies.activity.label, right: samoyed.tendencies.activity.label, degree: true },
  { label: "사람과의 교감", left: spitz.tendencies.socialConnection.label, right: samoyed.tendencies.socialConnection.label, degree: true },
  { label: "알림 행동", left: spitz.tendencies.alerting.label, right: samoyed.tendencies.alerting.label, degree: true },
  { label: "털 관리", left: spitz.tendencies.grooming.label, right: samoyed.tendencies.grooming.label, degree: true },
];

const directionMark: Record<string, string> = { "높은 편": "↑", 중간: "→", "낮은 편": "↓", "개체별 확인 필요": "·" };
const degreeToneClass: Record<string, string> = {
  "높은 편": styles.degreeHigh,
  중간: styles.degreeMedium,
  "낮은 편": styles.degreeLow,
  "개체별 확인 필요": styles.degreeIndividual,
};

function ComparisonValue({ value, degree = false }: { value: string; degree?: boolean }) {
  if (!degree) return value;
  return <span className={`${styles.degreeBadge} ${degreeToneClass[value] ?? styles.degreeIndividual}`}><span>{value}</span><span aria-hidden="true">{directionMark[value]}</span></span>;
}

export default function ComparePage() {
  return (
    <>
      <a className="skip-link" href="#comparison">비교표로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">도감</Link><span aria-hidden="true">/</span><span aria-current="page">비교하기</span></nav>
        <header className={styles.intro}>
          <p>Same silhouette, different life</p>
          <h1>하얗고 풍성한 외모가 닮아도 함께할 하루는 다를 수 있어요.</h1>
          <span>이 비교는 우열이나 정답을 정하지 않습니다. 관심을 가진 이유와 현실적인 차이를 함께 확인하세요.</span>
        </header>
        <section className={styles.visualCompare} aria-label="두 견종 대표 형태 도식">
          {[spitz, samoyed].map((breed) => <article key={breed.slug}><BreedVisual breed={breed} variant="compare" /><h2>{breed.nameKo}</h2><p>{breed.tagline}</p><Link href={`/breeds/${breed.slug}`}>상세 이야기 보기 →</Link></article>)}
        </section>
        <section className={styles.tableSection} id="comparison" aria-labelledby="table-title">
          <div className={styles.sectionHead}><div><p>한눈에 비교</p><h2 id="table-title">같은 기준으로 나란히 보기</h2></div><span>행동 항목은 일반적 경향이며 실제 개체를 예측하거나 보증하지 않습니다.</span></div>
          <p className={styles.degreeGuide}>화살표는 좋고 나쁨이 아니라 <strong>정도의 높고 낮음</strong>을 뜻해요. 털 관리의 ↑는 관리 부담이 높은 편이라는 의미입니다.</p>
          <div className={styles.tableWrap} tabIndex={0} aria-label="좌우로 스크롤 가능한 견종 비교표">
            <table><thead><tr><th scope="col">비교 기준</th><th scope="col">{spitz.nameKo}</th><th scope="col">{samoyed.nameKo}</th></tr></thead><tbody>{rows.map(({ label, left, right, degree }) => <tr key={label}><th scope="row">{label}</th><td><ComparisonValue value={left} degree={degree} /></td><td><ComparisonValue value={right} degree={degree} /></td></tr>)}</tbody></table>
          </div>
          <div className={styles.mobileComparison}>
            <div className={styles.mobileBreedHeader} aria-hidden="true"><span>{spitz.nameKo}</span><span>{samoyed.nameKo}</span></div>
            <div className={styles.mobileRows}>
              {rows.map(({ label, left, right, degree }) => (
                <article key={label}>
                  <h3>{label}</h3>
                  <div>
                    <section><small>{spitz.nameKo}</small><strong><ComparisonValue value={left} degree={degree} /></strong></section>
                    <section><small>{samoyed.nameKo}</small><strong><ComparisonValue value={right} degree={degree} /></strong></section>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.reality} aria-labelledby="difference-title">
          <div><p>Biggest difference</p><h2 id="difference-title">가장 먼저 확인할 차이는 체격과 생활 부담이에요.</h2></div>
          <div className={styles.realityCards}>
            <article><span>{spitz.nameKo}</span><h3>작아 보여도 교육과 활동은 필요해요.</h3><p>{spitz.story.reality}</p></article>
            <article><span>{samoyed.nameKo}</span><h3>큰 체격과 북방견의 털 관리를 함께 계산해야 해요.</h3><p>{samoyed.story.reality}</p></article>
          </div>
        </section>
        <aside className={styles.notice}><strong>비교 뒤에 남겨야 할 질문</strong><p>어느 견종이 더 좋은가가 아니라, 내가 매일 제공할 수 있는 활동·공간·관리와 실제 입양 대상 개체의 성격이 맞는지 확인하세요. 지금은 입양을 미루는 선택도 유효합니다.</p><Link href="/">다른 견종 더 발견하기</Link></aside>
      </main>
    </>
  );
}
