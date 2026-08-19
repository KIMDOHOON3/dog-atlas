import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { BeginnerGuideLink } from "@/components/beginner-guide-link";
import { InterestBreedToggle } from "@/components/interest-breed-toggle";
import { LegalCareNotice } from "@/components/legal-care-notice";
import { LifestyleProductIcon } from "@/components/lifestyle-product-icon";
import { SiteHeader } from "@/components/site-header";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";
import {
  getBreedLifePresentation,
} from "@/lib/breed-life-presentation";
import { getBreedFactPresentation } from "@/lib/breed-fact-presentation";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

const legacyBreedRedirects: Record<string, string> = {
  "belgian-shepherd-dog": "belgian-malinois",
};

export function generateStaticParams() {
  return [...breeds.map((breed) => ({ slug: breed.slug })), ...Object.keys(legacyBreedRedirects).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  if (legacyBreedRedirects[slug]) return {};
  const breed = getBreed(slug);
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

const japaneseSpitzFeatures = [
  {
    eyebrow: "사람과의 관계",
    title: "사람 곁에서 함께 움직이길 좋아해요.",
    description: "사람을 좋아하고 보호자와 산책하거나 놀이하는 시간을 즐기는 영리하고 쾌활한 반려견이에요. 다만 사람과 가까워지는 속도와 애정을 표현하는 방식은 강아지마다 달라요.",
    image: "/illustrations/v4/japanese-spitz-feature-companionship.webp",
    alt: "사람 곁을 따라 걸으며 얼굴을 바라보는 재패니즈 스피츠 삽화",
  },
  {
    eyebrow: "짖음과 알림",
    title: "작은 변화에도 먼저 반응할 수 있어요.",
    description: "현관 소리나 창밖 움직임을 알아차리고 짖음으로 알릴 수 있어요. 편안히 쉴 자리를 마련하고, 자극을 확인한 뒤 보호자에게 돌아오는 연습을 어릴 때부터 해두면 좋아요.",
    image: "/illustrations/v4/japanese-spitz-feature-calm-alert.webp",
    alt: "닫힌 문밖의 작은 소리를 조용히 알아차린 재패니즈 스피츠 삽화",
  },
  {
    eyebrow: "털 관리 부담",
    title: "풍성한 이중모는 꾸준한 빗질이 필요해요.",
    description: "짧고 촘촘한 속털과 풍성한 겉털을 함께 가진 견종이에요. 특히 털갈이 시기에는 빠진 속털이 엉키지 않도록 규칙적인 빗질을 생활에 포함해야 해요.",
    image: "/illustrations/v4/japanese-spitz-feature-double-coat.webp",
    alt: "빠진 속털을 브러시로 빗어 관리하는 재패니즈 스피츠 삽화",
  },
] as const;

const tendencyLevelScore = {
  "낮은 편": 1,
  "중간": 2,
  "높은 편": 3,
  "개체별 확인 필요": 0,
} as const;

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
  const differences = [
    leftFacts.size && rightFacts.size && leftFacts.size !== rightFacts.size ? "체격" : undefined,
    left.tendencies.activity.label !== right.tendencies.activity.label ? "활동량" : undefined,
    left.tendencies.grooming.label !== right.tendencies.grooming.label ? "털 관리" : undefined,
  ].filter((difference): difference is string => Boolean(difference));

  return differences.length > 0
    ? `${differences.join(" · ")} 차이가 있어요.`
    : "생활 조건이 비슷한 편이에요.";
}

function getLifestyleCommonality(left: Breed, right: Breed) {
  const commonTraits = [
    left.tendencies.activity.label === right.tendencies.activity.label
      ? `활동량 ${left.tendencies.activity.label}`
      : undefined,
    left.tendencies.socialConnection.label === right.tendencies.socialConnection.label
      ? `교감 ${left.tendencies.socialConnection.label}`
      : undefined,
    left.tendencies.grooming.label === right.tendencies.grooming.label
      ? `털 관리 ${left.tendencies.grooming.label}`
      : undefined,
  ].filter((trait): trait is string => Boolean(trait)).slice(0, 2);

  return commonTraits.length > 0
    ? commonTraits.join(" · ")
    : "비슷한 생활 기준으로 살펴보기 좋아요.";
}

function BreedDetailExperience({ breed }: { breed: Breed }) {
  const { lifePoints, dayPoints } = getBreedLifePresentation(breed);
  const isJapaneseSpitz = breed.slug === "japanese-spitz";

  return (
    <>
      {isJapaneseSpitz ? (
        <section className={styles.japaneseSpitzFeatures} aria-labelledby="japanese-spitz-features-title">
          <header>
            <p className={styles.eyebrow}>실제로 함께 살면</p>
            <h2 id="japanese-spitz-features-title">재패니즈 스피츠는 어떤 개인가요?</h2>
            <p>사람과의 관계, 주변 변화에 대한 반응, 매일 체감할 털 관리 부담을 먼저 살펴보세요.</p>
          </header>
          <div className={styles.japaneseSpitzFeatureGrid}>
            {japaneseSpitzFeatures.map((feature) => (
              <article key={feature.title}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1100px) 50vw, 30vw"
                />
                <div>
                  <span>{feature.eyebrow}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.malteseEssentials} aria-labelledby="breed-essentials-title">
          <header>
            <p className={styles.eyebrow}>함께 살기 전에</p>
            <h2 id="breed-essentials-title">{breed.nameKo}와 살면 먼저 챙길 세 가지</h2>
            <p>귀여운 외모보다 매일 반복될 생활을 먼저 확인해보세요.</p>
          </header>
          <div className={styles.malteseLifeGrid}>
            {lifePoints.map((point) => (
              <article key={point.title}>
                <LifestyleProductIcon name={point.icon} className={styles.malteseProductIcon} />
                <div><span>{point.label}</span><h3>{point.title}</h3><p>{point.description}</p></div>
              </article>
            ))}
          </div>
          <div className={styles.malteseDay}>
            <header>
              <p className={styles.eyebrow}>생활에 가볍게 더하기</p>
              <h3>하루에 한 번씩 해보면 좋아요.</h3>
              <p>전부 완벽하게 하기보다 가능한 것부터 편안하게 이어가세요.</p>
            </header>
            <ul>{dayPoints.map((point) => <li key={point.icon}><LifestyleProductIcon name={point.icon} className={styles.malteseProductIcon} /><div><strong>{point.title}</strong><p>{point.description}</p></div></li>)}</ul>
          </div>
        </section>
      )}

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
          <span className={styles.malteseTendencyIcon}><LifestyleProductIcon name="health-check" className={styles.malteseProductIcon} /></span>
          <span className={styles.malteseTendencyCopy}><strong>이 강아지 성향 더 알아보기</strong><small>활동량, 교감, 혼자 쉬기와 털 관리를 확인해요.</small></span>
          <span className={styles.malteseTendencyChevron} aria-hidden="true" />
        </summary>
        <div><p>같은 견종이어도 성격은 모두 달라요. 아래 내용은 일반적인 경향으로만 봐주세요.</p><div>{([...coreTendencies, ...extraTendencies] as const).map((name) => <TendencyCard breed={breed} name={name} key={name} />)}</div></div>
      </details>

      <section className={styles.malteseDecision} aria-label={`${breed.nameKo} 다음 선택`}>
        <div className={styles.malteseChoiceActions}>
          <BeginnerGuideLink slug={breed.slug} nameKo={breed.nameKo} />
          <InterestBreedToggle slug={breed.slug} nameKo={breed.nameKo} />
        </div>
      </section>
    </>
  );
}

export default async function BreedDetail({ params }: PageProps) {
  const slug = (await params).slug;
  if (legacyBreedRedirects[slug]) redirect(`/breeds/${legacyBreedRedirects[slug]}`);
  const breed = getBreed(slug);
  if (!breed) notFound();
  const related = getRelatedBreeds(breed);
  const [featuredRelated, ...otherRelated] = related;
  const allSources = [...new Map(
    [...breed.sources, ...behaviorContextSources].map((source) => [source.url, source]),
  ).values()];
  const facts = getBreedFactPresentation(breed);

  return (
    <>
      <a className="skip-link" href="#breed-content">견종 정보로 바로가기</a>
      <SiteHeader />
      <main id="breed-content">
        <section className={`${styles.hero} ${styles.malteseHero}`} aria-labelledby="breed-title">
          <BreedVisual breed={breed} variant="detail" priority />
          <div className={styles.profileSummary}>
            <div className={styles.summary}>
              <h1 id="breed-title">{breed.nameKo}</h1>
              <p className={styles.breedNameEn}>{breed.nameEn}</p>
            </div>
            <div className={styles.atAGlance}>
              <dl className={styles.facts}>
                {facts.size && <div><dt>크기</dt><dd>{facts.size}</dd></div>}
                {facts.lifespan && <div><dt>평균 수명</dt><dd>{facts.lifespan}</dd></div>}
                <div><dt>계통</dt><dd>{breed.identity.lineage}</dd></div>
                <div><dt>원래 역할</dt><dd>{breed.identity.originalRole}</dd></div>
              </dl>
              <div className={styles.heroTendencies} aria-label="핵심 행동 경향">
                {coreTendencies.map((name) => {
                  const tendency = breed.tendencies[name];
                  const score = tendencyLevelScore[tendency.label];
                  return (
                    <div data-tendency={name} key={name}>
                      <span>{tendencyNames[name]}</span>
                      <span className={styles.tendencyValue}>
                        <span className={styles.tendencyMeter} aria-hidden="true">
                          {[1, 2, 3].map((step) => <i className={score >= step ? styles.filled : undefined} key={step} />)}
                        </span>
                        <strong>{tendency.label}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

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
                  <div className={styles.comparePoints}>
                    <p><b>공통점</b><span>{getLifestyleCommonality(breed, featuredRelated.breed)}</span></p>
                    <p><b>차이점</b><span>{getLifestyleDifference(breed, featuredRelated.breed)}</span></p>
                  </div>
                  <Link href={`/compare?breeds=${breed.slug},${featuredRelated.breed.slug}`}>{breed.nameKo}와 {featuredRelated.breed.nameKo} 비교하기 →</Link>
                </div>
              </div>
              {otherRelated.length > 0 && <div className={styles.otherRelated}>
                <p>함께 살펴볼 관련 견종</p>
                <div className={styles.otherRelatedGrid}>
                  {otherRelated.slice(0, 3).map(({ breed: item, reason }) => (
                    <Link className={styles.smallRelated} href={`/breeds/${item.slug}`} key={item.slug}>
                      <BreedVisual breed={item} variant="tile" />
                      <div><strong>{item.nameKo}</strong><small>{item.nameEn}</small><p>{reason}</p></div>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>}
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
