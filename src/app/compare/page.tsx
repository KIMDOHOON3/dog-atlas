import type { Metadata } from "next";
import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { CompareCandidateHeader } from "@/components/compare-candidate-header";
import { SiteHeader } from "@/components/site-header";
import { StoryGlyph } from "@/components/story-glyph";
import { resolveComparisonSelection } from "@/lib/compare-breeds";
import type { Breed } from "@/content/breeds/schema";
import styles from "./page.module.css";

type PageProps = { searchParams: Promise<{ breeds?: string | string[] }> };
type RowValue = { value: string; note?: string; degree?: boolean };
type ComparisonRow = { label: string; values: RowValue[] };

const directionMark: Record<string, string> = { "높은 편": "↑", 중간: "→", "낮은 편": "↓", "개체별 확인 필요": "·" };
const degreeToneClass: Record<string, string> = {
  "높은 편": styles.degreeHigh,
  중간: styles.degreeMedium,
  "낮은 편": styles.degreeLow,
  "개체별 확인 필요": styles.degreeIndividual,
};

function buildRows(selectedBreeds: Breed[]): ComparisonRow[] {
  const identityRow = (label: string, select: (breed: Breed) => string): ComparisonRow => ({
    label,
    values: selectedBreeds.map((breed) => ({ value: select(breed) })),
  });
  const tendencyRow = (label: string, key: keyof Breed["tendencies"]): ComparisonRow => ({
    label,
    values: selectedBreeds.map((breed) => ({ value: breed.tendencies[key].label, note: breed.tendencies[key].note, degree: true })),
  });

  return [
    identityRow("형성 지역", (breed) => breed.identity.origin),
    identityRow("계통", (breed) => breed.identity.lineage),
    identityRow("원래 역할", (breed) => breed.identity.originalRole),
    identityRow("체격", (breed) => breed.identity.size),
    tendencyRow("신체 활동 경향", "activity"),
    tendencyRow("사람과의 교감", "socialConnection"),
    tendencyRow("알림 행동", "alerting"),
    tendencyRow("털 관리", "grooming"),
  ];
}

function ComparisonValue({ value, degree = false }: { value: string; degree?: boolean }) {
  if (!degree) return value;
  return <span className={`${styles.degreeBadge} ${degreeToneClass[value] ?? styles.degreeIndividual}`}><span>{value}</span><span aria-hidden="true">{directionMark[value]}</span></span>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { breeds } = resolveComparisonSelection((await searchParams).breeds);
  return {
    title: breeds.length >= 2 ? `${breeds.map((breed) => breed.nameKo).join(" · ")} 비교` : "견종 비교",
    description: "관심을 가진 견종의 역사, 행동 경향과 생활 부담을 같은 기준으로 비교합니다.",
  };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const selection = resolveComparisonSelection((await searchParams).breeds);
  const selectedBreeds = selection.breeds;
  const rows = buildRows(selectedBreeds);
  const candidateSummaries = selectedBreeds.map(({ slug, nameKo }) => ({ slug, nameKo }));

  return (
    <>
      <a className="skip-link" href={selectedBreeds.length >= 2 ? "#comparison" : "#compare-state"}>비교 내용으로 바로가기</a>
      <SiteHeader wide />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">도감</Link><span aria-hidden="true">/</span><span aria-current="page">비교하기</span></nav>
        <header className={styles.intro}>
          <div className={styles.introMark}><StoryGlyph kind="compare" /><p>견종 비교</p></div>
          <h1>관심을 가진 견종을 같은 기준으로 살펴보세요.</h1>
          <span>이 비교는 우열이나 정답을 정하지 않습니다. 일반적인 경향과 생활 부담을 함께 확인하세요.</span>
          {selection.usedFallback && <p className={styles.queryNotice}>알 수 없는 견종이 포함되어 기본 비교 후보를 보여드려요.</p>}
        </header>

        <CompareCandidateHeader candidates={candidateSummaries} />

        {selectedBreeds.length < 2 ? (
          <section className={styles.emptyState} id="compare-state" aria-live="polite">
            <p>비교 후보</p>
            <h2>{selectedBreeds.length === 0 ? "아직 담은 비교 후보가 없어요." : "한 마리를 더 담으면 비교할 수 있어요."}</h2>
            <span>{selectedBreeds.length === 0
              ? "관심 가는 견종의 정보를 읽고, 더 알아보고 싶은 견종을 후보에 담아보세요."
              : `${selectedBreeds[0].nameKo}의 관련 견종을 살펴보거나 도감에서 다른 견종을 발견해보세요.`}</span>
            <div>
              <Link href="/#discover">{selectedBreeds.length === 0 ? "견종 둘러보기" : "다른 견종 둘러보기"}</Link>
              {selectedBreeds[0] && <Link href={`/breeds/${selectedBreeds[0].slug}`}>{selectedBreeds[0].nameKo} 상세로 돌아가기</Link>}
            </div>
          </section>
        ) : (
          <>
            <section className={styles.visualCompare} data-count={selectedBreeds.length} aria-label={`${selectedBreeds.length}개 견종 대표 형태 도식`}>
              {selectedBreeds.map((breed) => <article key={breed.slug}><BreedVisual breed={breed} variant="compare" /><h2>{breed.nameKo}</h2><p>{breed.tagline}</p><Link href={`/breeds/${breed.slug}`}>상세 이야기 보기 →</Link></article>)}
            </section>

            <section className={styles.tableSection} id="comparison" aria-labelledby="table-title">
              <div className={styles.sectionHead}><div><p>한눈에 비교</p><h2 id="table-title">같은 기준으로 나란히 보기</h2></div><span>행동 항목은 일반적 경향이며 실제 개체를 예측하거나 보증하지 않습니다.</span></div>
              <p className={styles.degreeGuide}>화살표는 좋고 나쁨이 아니라 <strong>정도의 높고 낮음</strong>을 뜻해요. 털 관리의 ↑는 관리 부담이 높은 편이라는 의미입니다.</p>
              <div className={styles.tableWrap} data-count={selectedBreeds.length} tabIndex={0} aria-label="좌우로 스크롤 가능한 견종 비교표">
                <table>
                  <thead><tr><th scope="col">비교 기준</th>{selectedBreeds.map((breed) => <th scope="col" key={breed.slug}>{breed.nameKo}</th>)}</tr></thead>
                  <tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((item, index) => <td key={selectedBreeds[index].slug}><ComparisonValue value={item.value} degree={item.degree} /></td>)}</tr>)}</tbody>
                </table>
              </div>

              <div className={styles.mobileComparison}>
                <div className={styles.mobileRows}>
                  {rows.map((row) => (
                    <article key={row.label}>
                      <h3>{row.label}</h3>
                      <div>
                        {row.values.map((item, index) => (
                          <section key={selectedBreeds[index].slug}>
                            <small>{selectedBreeds[index].nameKo}</small>
                            <strong><ComparisonValue value={item.value} degree={item.degree} /></strong>
                            {item.note && <p>{item.note}</p>}
                          </section>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.reality} aria-labelledby="difference-title">
              <div><p>Biggest difference</p><h2 id="difference-title">가장 먼저 확인할 차이는 체격과 생활 부담이에요.</h2></div>
              <div className={styles.realityCards} data-count={selectedBreeds.length}>
                {selectedBreeds.map((breed) => <article key={breed.slug}><span>{breed.nameKo}</span><h3>함께 살기 전에 확인할 현실</h3><p>{breed.story.reality}</p></article>)}
              </div>
            </section>
            <aside className={styles.notice}><strong>비교 뒤에 남겨야 할 질문</strong><p>어느 견종이 더 좋은가가 아니라, 내가 매일 제공할 수 있는 활동·공간·관리와 실제 입양 대상 개체의 성격이 맞는지 확인하세요. 지금은 입양을 미루는 선택도 유효합니다.</p><Link href="/#discover">다른 견종 더 발견하기</Link></aside>
          </>
        )}
      </main>
    </>
  );
}
