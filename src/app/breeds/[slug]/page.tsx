import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { InterestBreedToggle } from "@/components/interest-breed-toggle";
import { SiteHeader } from "@/components/site-header";
import { OriginMark } from "@/components/origin-mark";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return breeds.map((breed) => ({ slug: breed.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const breed = getBreed((await params).slug);
  if (!breed) return {};
  return { title: breed.nameKo, description: `${breed.tagline} 크기와 수명, 역사, 행동 경향과 함께 사는 현실을 살펴봅니다.` };
}

const tendencyNames = {
  activity: "활동",
  mentalStimulation: "정신적 자극",
  independence: "독립성",
  socialConnection: "사람과의 교감",
  alerting: "알림 행동",
  grooming: "털 관리",
} as const;

const coreTendencies = ["activity", "socialConnection", "grooming"] as const;
const extraTendencies = ["mentalStimulation", "independence", "alerting"] as const;

const realityLabels: Record<string, [string, string][]> = {
  "japanese-spitz": [["풍성한 이중모", "정기적인 빗질과 털갈이 관리"], ["주변 변화에 기민함", "소리 자극과 알림 행동을 차분히 관리"], ["가족과의 교감", "혼자 편안히 쉬는 연습도 천천히"]],
  maltese: [["사람을 좋아하는 성향", "짧은 시간부터 혼자 쉬는 연습"], ["길고 흰 피모", "엉킴을 줄이는 규칙적인 관리"], ["작은 체구", "낙상과 거친 상호작용을 예방"]],
  "border-collie": [["높은 집중력", "매일 문제를 해결할 과제 제공"], ["빠른 움직임", "충분한 활동과 차분한 휴식의 균형"], ["몰이 행동의 배경", "움직임 자극을 세심하게 관리"]],
  greyhound: [["폭발적인 질주", "안전한 환경에서의 운동 기회"], ["시각으로 쫓는 본능", "리드와 울타리 환경을 꼼꼼히 확인"], ["짧은 털과 마른 체형", "추위와 단단한 바닥에 대비"]],
  samoyed: [["두꺼운 이중모", "털갈이 관리와 더운 날씨 대비"], ["작업견의 힘과 활동성", "규칙적인 움직임과 생활 참여"], ["사람과 가까운 역사", "충분한 교감과 혼자 쉬는 연습"]],
};

function TendencyCard({ breed, name }: { breed: Breed; name: keyof Breed["tendencies"] }) {
  const tendency = breed.tendencies[name];
  return <article><span>{tendencyNames[name]}</span><strong>{tendency.label}</strong><p>{tendency.note}</p></article>;
}

export default async function BreedDetail({ params }: PageProps) {
  const breed = getBreed((await params).slug);
  if (!breed) notFound();
  const related = getRelatedBreeds(breed);
  const samoyed = getBreed("samoyed")!;
  const maltese = getBreed("maltese")!;
  const allSources = [...breed.sources, ...behaviorContextSources];
  const responsibilities = realityLabels[breed.slug] ?? breed.careNotes.slice(0, 3).map((note, index) => [
    breed.catalog.discoveryTags[index] ?? `생활 조건 ${index + 1}`,
    note,
  ] as [string, string]);

  return (
    <>
      <a className="skip-link" href="#breed-content">견종 정보로 바로가기</a>
      <SiteHeader />
      <main id="breed-content">
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">← 도감으로 돌아가기</Link><span aria-hidden="true">/</span><span>{breed.nameKo}</span></nav>

        <section className={styles.hero} aria-labelledby="breed-title">
          <div className={styles.summary}>
            <p className={styles.originLine}><span>{breed.nameEn} ·</span><OriginMark slug={breed.slug} /><span>{breed.identity.origin}</span></p>
            <h1 id="breed-title">{breed.nameKo}</h1>
            <strong>{breed.tagline}</strong>
            <InterestBreedToggle slug={breed.slug} nameKo={breed.nameKo} />
          </div>
          <BreedVisual breed={breed} variant="detail" priority />
          <div className={styles.atAGlance}>
            <dl className={styles.facts}>
              <div><dt>크기</dt><dd>{breed.identity.size}</dd></div>
              <div><dt>평균 수명</dt><dd>{breed.identity.lifespan}</dd></div>
              <div><dt>계통</dt><dd>{breed.identity.lineage}</dd></div>
              <div><dt>원래 역할</dt><dd>{breed.identity.originalRole}</dd></div>
            </dl>
            <div className={styles.heroTendencies} aria-label="핵심 행동 경향">
              {coreTendencies.map((name) => <div key={name}><span>{tendencyNames[name]}</span><strong>{breed.tendencies[name].label}</strong></div>)}
            </div>
          </div>
        </section>

        <aside className={styles.appearanceNote}><strong>대표 형태 살펴보기</strong><span>{breed.identity.size} · {breed.identity.lineage}</span><small>외형 자료: 편집 일러스트 참고</small></aside>

        <article className={styles.content}>
          <section className={`${styles.history} ${breed.historyVisual ? styles.historyWithVisual : ""}`} aria-labelledby="history-title">
            {breed.historyVisual && <BreedVisual breed={breed} variant="history" />}
            <div>
              <p className={styles.eyebrow}>역사와 원래 역할</p>
              <h2 id="history-title">어디에서, 어떤 역할을 하며 살아왔을까요?</h2>
              <p>{breed.story.opening}</p><p>{breed.story.roleToHome}</p>
              <blockquote>{breed.identity.origin}에서 {breed.identity.originalRole}의 배경을 거쳐, 오늘의 행동 경향으로 이어질 수 있어요.</blockquote>
            </div>
          </section>

          <section className={styles.behaviorBridge} aria-labelledby="behavior-bridge-title">
            <header>
              <p className={styles.eyebrow}>역사가 남긴 행동 단서</p>
              <h2 id="behavior-bridge-title">역할의 흔적을 오늘의 생활에서 읽어보기</h2>
              <p>지역보다 원래 역할과 현재의 맥락을 함께 봐요. 견종 경향만으로 개체의 공격성이나 입질을 예측할 수 없습니다.</p>
            </header>
            <div className={styles.clueGrid}>
              <article><span>원래 역할</span><p>{breed.behaviorClues.originalRole}</p></article>
              <article><span>오늘 보일 수 있는 단서</span><p>{breed.behaviorClues.today}</p></article>
              <article><span>보호자가 확인할 맥락</span><p>{breed.behaviorClues.guardianContext}</p></article>
            </div>
          </section>

          <section className={styles.tendencies} aria-labelledby="tendency-title">
            <header><div><p className={styles.eyebrow}>행동 경향</p><h2 id="tendency-title">함께 살기 전에 먼저 볼 세 가지</h2></div><p>견종의 일반적 경향이며 개체와 환경에 따라 달라질 수 있어요.</p></header>
            <div className={styles.coreGrid}>{coreTendencies.map((name) => <TendencyCard breed={breed} name={name} key={name} />)}</div>
            <details className={styles.moreTendencies}><summary>다른 행동 경향 더 알아보기</summary><div>{extraTendencies.map((name) => <TendencyCard breed={breed} name={name} key={name} />)}</div></details>
          </section>

          <section className={styles.reality} aria-labelledby="reality-title">
            <header><p className={styles.eyebrow}>함께 사는 현실</p><h2 id="reality-title">매력적인 특징에는 필요한 책임이 따라와요.</h2></header>
            <div className={styles.responsibilityList}>{responsibilities.map(([trait, responsibility]) => <div key={trait}><strong>{trait}</strong><span aria-hidden="true">→</span><p>{responsibility}</p></div>)}</div>
            <div className={styles.day}><h3>평범한 하루</h3><ol>{breed.daySnapshot.map((step) => <li key={step.time}><span>{step.time}</span><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol></div>
          </section>

          <section className={styles.related} aria-labelledby="related-title">
            <header><p className={styles.eyebrow}>다른 가능성 발견하기</p><h2 id="related-title">비슷해 보여도 생활은 달라요.</h2></header>
            {breed.slug === "japanese-spitz" ? (
              <>
                <div className={styles.compareFeature}>
                  <BreedVisual breed={breed} variant="card" />
                  <div className={styles.compareMark} aria-hidden="true">↔</div>
                  <BreedVisual breed={samoyed} variant="card" />
                  <div className={styles.compareCopy}><strong>{breed.nameKo}와 {samoyed.nameKo}</strong><p><b>닮은 점</b> 풍성한 흰 이중모와 스피츠형 인상</p><p><b>다른 점</b> 체격, 활동량, 더위와 털 관리의 부담</p><Link href="/compare?breeds=japanese-spitz,samoyed">스피츠와 사모예드 비교하기 →</Link></div>
                </div>
                <Link className={styles.smallRelated} href={`/breeds/${maltese.slug}`}><BreedVisual breed={maltese} variant="tile" /><div><small>더 작은 흰 반려견</small><strong>{maltese.nameKo}</strong><p>스피츠보다 작고 사람 곁을 더 가까이 찾는 반려견이에요. 털 관리 방식과 하루 활동 리듬을 비교해보세요.</p></div><span aria-hidden="true">→</span></Link>
              </>
            ) : (
              <div className={styles.relatedGrid}>{related.map(({ breed: item, reason }) => <Link href={`/breeds/${item.slug}`} key={item.slug}><BreedVisual breed={item} variant="tile" /><div><strong>{item.nameKo}</strong><p>{reason}</p></div></Link>)}</div>
            )}
          </section>

          <details className={styles.sources}>
            <summary><span>정보 출처와 편집 안내</span><small>출처 {allSources.length}개 · {breed.sources[0].checkedAt} 확인</small></summary>
            <div><p>현재 편집 중이며 수의학·행동 전문가 검수 전인 정보입니다. 품종의 일반적 경향이 개별 강아지의 건강과 행동을 보장하지는 않습니다.</p><ul>{allSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} — {source.title}</a><span>확인일 {source.checkedAt}</span></li>)}</ul></div>
          </details>
        </article>
      </main>
    </>
  );
}
