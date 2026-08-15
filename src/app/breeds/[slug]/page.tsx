import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { BeginnerGuideLink } from "@/components/beginner-guide-link";
import { InterestBreedToggle } from "@/components/interest-breed-toggle";
import { LegalCareNotice } from "@/components/legal-care-notice";
import { SiteHeader } from "@/components/site-header";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";
import {
  getBreedDayIcons,
  getBreedLifePoints,
  type LifestyleIconId,
} from "@/lib/breed-life-presentation";
import { getBreedFactPresentation } from "@/lib/breed-fact-presentation";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
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

const tendencyQuestions: Record<keyof Breed["tendencies"], string> = {
  activity: "얼마나 움직이나요?",
  mentalStimulation: "머리를 쓰는 놀이는 얼마나 필요한가요?",
  independence: "혼자 쉬는 성향은 어떤가요?",
  socialConnection: "사람과 얼마나 가까이 지내나요?",
  alerting: "소리와 주변 변화에 얼마나 반응하나요?",
  grooming: "털 관리는 얼마나 필요한가요?",
};

function TendencyCard({ breed, name }: { breed: Breed; name: keyof Breed["tendencies"] }) {
  const tendency = breed.tendencies[name];
  return <article><span>{tendencyQuestions[name]}</span><strong>{tendency.label}</strong><p>{tendency.note}</p></article>;
}

function getLifestyleDifference(left: Breed, right: Breed) {
  const leftFacts = getBreedFactPresentation(left);
  const rightFacts = getBreedFactPresentation(right);
  return [
    leftFacts.size && rightFacts.size
      ? `체격 ${leftFacts.size} ↔ ${rightFacts.size}`
      : undefined,
    `활동량 ${left.tendencies.activity.label} ↔ ${right.tendencies.activity.label}`,
    `털 관리 ${left.tendencies.grooming.label} ↔ ${right.tendencies.grooming.label}`,
  ].filter(Boolean).join(" · ");
}

const lifestyleIconSources: Record<LifestyleIconId, string> = {
  rest: "/images/lifestyle-icons/rest.png",
  grooming: "/images/lifestyle-icons/grooming.png",
  safety: "/images/lifestyle-icons/safety.png",
  walk: "/images/lifestyle-icons/walk.png",
  "sofa-rest": "/images/lifestyle-icons/sofa-rest.png",
  hygiene: "/images/lifestyle-icons/hygiene.png",
  enrichment: "/images/lifestyle-icons/enrichment.png",
  connection: "/images/lifestyle-icons/connection.png",
  climate: "/images/lifestyle-icons/climate.png",
  "health-check": "/images/lifestyle-icons/health-check.png",
  feeding: "/images/lifestyle-icons/feeding.png",
  "calm-alert": "/images/lifestyle-icons/calm-alert.png",
};

function LifestyleProductIcon({ name }: { name: LifestyleIconId }) {
  return <Image src={lifestyleIconSources[name]} alt="" width={72} height={72} aria-hidden className={styles.malteseProductIcon} />;
}

function BreedDetailExperience({ breed }: { breed: Breed }) {
  const lifePoints = getBreedLifePoints(breed);
  const dayIcons = getBreedDayIcons(breed);

  return (
    <>
      <section className={styles.malteseEssentials} aria-labelledby="breed-essentials-title">
        <header>
          <p className={styles.eyebrow}>함께 살기 전에</p>
          <h2 id="breed-essentials-title">{breed.nameKo}와 살면 먼저 챙길 세 가지</h2>
          <p>귀여운 외모보다 매일 반복될 생활을 먼저 확인해보세요.</p>
        </header>
        <div className={styles.malteseLifeGrid}>
          {lifePoints.map((point) => (
            <article key={point.title}>
              <LifestyleProductIcon name={point.icon} />
              <div><span>{point.label}</span><h3>{point.title}</h3><p>{point.description}</p></div>
            </article>
          ))}
        </div>
        <div className={styles.malteseDay}>
          <div><p className={styles.eyebrow}>평범한 하루</p><h3>하루 안에서 이렇게 이어져요.</h3></div>
          <ol>{breed.daySnapshot.map((step, index) => <li key={step.time}><LifestyleProductIcon name={dayIcons[index] ?? "sofa-rest"} /><div><span>{step.time}</span><strong>{step.title}</strong><p>{step.description}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.malteseStory} aria-labelledby="breed-story-title">
        {breed.historyVisual && <BreedVisual breed={breed} variant="history" />}
        <div className={styles.malteseStoryCopy}>
          <p className={styles.eyebrow}>역사에서 오늘까지</p>
          <h2 id="breed-story-title">{breed.nameKo}의 과거가 오늘의 생활로 이어져요.</h2>
          <p className={styles.malteseStoryLead}>{breed.story.opening}</p>
          <p className={styles.malteseStoryLead}>{breed.story.roleToHome}</p>
        </div>
      </section>

      <details className={styles.malteseTendencies}>
        <summary>
          <span className={styles.malteseTendencyIcon}><LifestyleProductIcon name="health-check" /></span>
          <span className={styles.malteseTendencyCopy}><strong>이 강아지 성향 더 알아보기</strong><small>활동량, 교감, 혼자 쉬기와 털 관리를 확인해요.</small></span>
          <span className={styles.malteseTendencyChevron} aria-hidden="true" />
        </summary>
        <div><p>같은 견종이어도 성격은 모두 달라요. 아래 내용은 일반적인 경향으로만 봐주세요.</p><div>{([...coreTendencies, ...extraTendencies] as const).map((name) => <TendencyCard breed={breed} name={name} key={name} />)}</div></div>
      </details>

      <section className={styles.malteseDecision} aria-labelledby="breed-decision-title">
        <div>
          <p className={styles.eyebrow}>살펴본 뒤 선택하기</p>
          <h2 id="breed-decision-title">{breed.nameKo}를 더 알아보고 싶나요?</h2>
          <p>함께 살 생활을 확인했다면 맞이할 준비를 살펴보거나 비교 후보로 남겨보세요.</p>
        </div>
        <div className={styles.malteseChoiceActions}>
          <BeginnerGuideLink slug={breed.slug} nameKo={breed.nameKo} />
          <InterestBreedToggle slug={breed.slug} nameKo={breed.nameKo} />
        </div>
      </section>
    </>
  );
}

export default async function BreedDetail({ params }: PageProps) {
  const breed = getBreed((await params).slug);
  if (!breed) notFound();
  const related = getRelatedBreeds(breed);
  const [featuredRelated, ...otherRelated] = related;
  const allSources = [...breed.sources, ...behaviorContextSources];
  const facts = getBreedFactPresentation(breed);

  return (
    <>
      <a className="skip-link" href="#breed-content">견종 정보로 바로가기</a>
      <SiteHeader />
      <main id="breed-content">
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">← 도감으로 돌아가기</Link><span aria-hidden="true">/</span><span>{breed.nameKo}</span></nav>

        <section className={`${styles.hero} ${styles.malteseHero}`} aria-labelledby="breed-title">
          <div className={styles.summary}>
            <h1 id="breed-title">{breed.nameKo}</h1>
          </div>
          <BreedVisual breed={breed} variant="detail" priority />
          <div className={styles.atAGlance}>
            <dl className={styles.facts}>
              {facts.size && <div><dt>크기</dt><dd>{facts.size}</dd></div>}
              {facts.lifespan && <div><dt>평균 수명</dt><dd>{facts.lifespan}</dd></div>}
              <div><dt>계통</dt><dd>{breed.identity.lineage}</dd></div>
              <div><dt>원래 역할</dt><dd>{breed.identity.originalRole}</dd></div>
            </dl>
            <div className={styles.heroTendencies} aria-label="핵심 행동 경향">
              {coreTendencies.map((name) => <div key={name}><span>{tendencyNames[name]}</span><strong>{breed.tendencies[name].label}</strong></div>)}
            </div>
          </div>
        </section>

        <aside className={styles.appearanceNote}><strong>대표 형태 살펴보기</strong><span>{facts.size ? `${facts.size} · ` : ""}{breed.identity.lineage}</span><small>외형 자료: 편집 일러스트 참고</small></aside>
        {isKoreanManagedBreed(breed.slug) && <LegalCareNotice breedName={breed.nameKo} />}

        <article className={styles.content}>
          <BreedDetailExperience breed={breed} />
          {featuredRelated && <section className={styles.related} aria-labelledby="related-title">
            <header><p className={styles.eyebrow}>비슷한 견종과 비교하기</p><h2 id="related-title">나란히 보면 생활의 차이가 보여요.</h2></header>
            <>
              <div className={styles.compareFeature}>
                <BreedVisual breed={breed} variant="card" />
                <div className={styles.compareMark} aria-hidden="true">↔</div>
                <BreedVisual breed={featuredRelated.breed} variant="card" />
                <div className={styles.compareCopy}>
                  <strong>{breed.nameKo}와 {featuredRelated.breed.nameKo}</strong>
                  <p><b>왜 함께 보나요</b> {featuredRelated.reason}</p>
                  <p><b>생활 차이</b> {getLifestyleDifference(breed, featuredRelated.breed)}</p>
                  <Link href={`/compare?breeds=${breed.slug},${featuredRelated.breed.slug}`}>{breed.nameKo}와 {featuredRelated.breed.nameKo} 비교하기 →</Link>
                </div>
              </div>
              {otherRelated.map(({ breed: item, reason }) => (
                <Link className={styles.smallRelated} href={`/breeds/${item.slug}`} key={item.slug}>
                  <BreedVisual breed={item} variant="tile" />
                  <div><small>함께 살펴볼 또 다른 견종</small><strong>{item.nameKo}</strong><p>{reason}</p></div>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </>
          </section>}

          <details className={styles.sources}>
            <summary><span>정보 출처와 편집 안내</span><small>출처 {allSources.length}개 · {breed.sources[0].checkedAt} 확인</small></summary>
            <div><p>현재 편집 중이며 수의학·행동 전문가 검수 전인 정보입니다. 품종의 일반적 경향이 개별 강아지의 건강과 행동을 보장하지는 않습니다.</p><ul>{allSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} — {source.title}</a><span>확인일 {source.checkedAt}</span></li>)}</ul></div>
          </details>
        </article>
      </main>
    </>
  );
}
