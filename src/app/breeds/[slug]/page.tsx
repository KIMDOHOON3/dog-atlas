import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { BreedVisual } from "@/components/breed-visual";
import { StandardBreedDetailExperience } from "@/components/breed-detail-standard";
import { StandardRealityCards } from "@/components/breed-detail-standard-interactions";
import { BeginnerGuideLink } from "@/components/beginner-guide-link";
import { LegalCareNotice } from "@/components/legal-care-notice";
import { LifestyleProductIcon } from "@/components/lifestyle-product-icon";
import { PoodleDetailExperience } from "@/components/poodle-detail";
import { SiteHeader } from "@/components/site-header";
import { getBreedFeatures } from "@/content/breed-features/data";
import { getBreedGrowthGuide } from "@/content/breed-growth-guides/data";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "@/content/breeds/data";
import type { Breed } from "@/content/breeds/schema";
import { poodleDetail } from "@/content/poodle-detail/data";
import { getStandardBreedDetail } from "@/content/standard-breed-detail/data";
import {
  getBreedLifePresentation,
} from "@/lib/breed-life-presentation";
import { getBreedFactPresentation } from "@/lib/breed-fact-presentation";
import { isKoreanManagedBreed } from "@/lib/breed-legal-care";
import { getBreedRoleFacts } from "@/lib/breed-role-presentation";
import { withObjectParticle } from "@/lib/korean-particles";
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
  if (slug === "poodle") return { title: breed.nameKo, description: poodleDetail.metadataDescription };
  const standardDetail = getStandardBreedDetail(slug);
  if (standardDetail) return { title: breed.nameKo, description: standardDetail.metadataDescription };
  const descriptionTopics = getBreedGrowthGuide(slug)
    ? "크기와 수명, 성장 단계별 돌봄, 행동 경향과 함께 사는 현실"
    : breed.historyVisibility === "hidden"
      ? "크기와 수명, 행동 경향과 함께 사는 현실"
      : "크기와 수명, 역사, 행동 경향과 함께 사는 현실";
  return { title: breed.nameKo, description: `${breed.tagline} ${descriptionTopics}을 살펴봅니다.` };
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

const tendencyLevelScore = {
  "낮은 편": 1,
  "중간": 2,
  "높은 편": 3,
  "개체별 확인 필요": 0,
} as const;

function BreedDetailExperience({ breed }: { breed: Breed }) {
  const { lifePoints, dayPoints } = getBreedLifePresentation(breed);
  const breedFeatures = getBreedFeatures(breed.slug);
  const growthGuide = getBreedGrowthGuide(breed.slug);

  return (
    <>
      {breedFeatures ? (
        <section className={styles.breedFeatures} aria-labelledby="breed-features-title">
          <header>
            <p className={styles.eyebrow}>견종을 이해하는 출발점</p>
            <h2 id="breed-features-title">{withObjectParticle(breed.nameKo)} 먼저 알아볼 세 가지</h2>
            <p>{breedFeatures.intro}</p>
          </header>
          <div className={styles.breedFeatureGrid}>
            {breedFeatures.cards.map((feature) => (
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

      {breed.historyVisibility !== "hidden" && (
        <section className={styles.malteseStory} aria-labelledby="breed-story-title">
          {breed.historyVisual && <BreedVisual breed={breed} variant="history" />}
          <div className={styles.malteseStoryCopy}>
            <p className={styles.eyebrow}>역사에서 오늘까지</p>
            <h2 id="breed-story-title">{breed.nameKo}의 과거가 오늘의 생활로 이어져요.</h2>
            <p className={styles.malteseStoryLead}>{breed.story.opening}</p>
            <p className={styles.malteseStoryLead}>{breed.story.roleToHome}</p>
          </div>
        </section>
      )}

      {growthGuide && (
        <section className={styles.growthGuide} aria-labelledby="growth-guide-title">
          <header>
            <p className={styles.eyebrow}>성장 단계에 맞춰</p>
            <h2 id="growth-guide-title">{breed.nameKo}와 자라는 동안 보호자가 할 일</h2>
            <p>{growthGuide.intro}</p>
          </header>
          <div className={styles.growthStageGrid}>
            {growthGuide.stages.map((stage) => (
              <article key={stage.label}>
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1100px) 50vw, 30vw"
                />
                <div className={styles.growthStageCopy}>
                  <div className={styles.growthStageMeta}><span>{stage.label}</span><small>{stage.ageGuide}</small></div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                  <ul>{stage.actions.map((action) => <li key={action}>{action}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <aside className={styles.growthMedicalNote}><strong>월령보다 개별 성장 확인</strong><p>{growthGuide.medicalNote}</p></aside>
        </section>
      )}

      <section className={styles.malteseDecision} aria-label={`${breed.nameKo} 다음 선택`}>
        <div className={styles.malteseChoiceActions}>
          <BeginnerGuideLink slug={breed.slug} nameKo={breed.nameKo} />
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
  const standardDetail = getStandardBreedDetail(breed.slug);
  const isStandardDetail = breed.slug === "poodle" || Boolean(standardDetail);
  const related = isStandardDetail ? getRelatedBreeds(breed) : [];
  const growthGuide = getBreedGrowthGuide(breed.slug);
  const allSources = breed.slug === "poodle"
    ? poodleDetail.sources
    : [...new Map(
      [...breed.sources, ...(growthGuide?.sources ?? []), ...behaviorContextSources].map((source) => [source.url, source]),
    ).values()];
  const facts = getBreedFactPresentation(breed);
  const roleFacts = isStandardDetail ? getBreedRoleFacts(breed) : [];
  const hasSizeFact = breed.slug === "poodle" || Boolean(facts.height || facts.weight || facts.size);
  const factCount = Number(hasSizeFact) + Number(Boolean(facts.lifespan)) + (isStandardDetail ? roleFacts.length : 2);

  return (
    <>
      <a className="skip-link" href="#breed-content">견종 정보로 바로가기</a>
      <SiteHeader />
      <main id="breed-content" data-breed-theme={isStandardDetail ? "standard" : undefined}>
        <section className={`${styles.hero} ${styles.malteseHero} ${isStandardDetail ? styles.poodleHero : ""}`} aria-labelledby="breed-title">
          <BreedVisual breed={breed} variant="detail" priority />
          <div className={styles.profileSummary}>
            <div className={styles.summary}>
              <h1 id="breed-title">{breed.nameKo}</h1>
              <p className={styles.breedNameEn}>{breed.nameEn}</p>
            </div>
            {breed.slug === "poodle" && <p className={styles.poodleHeroStatement}>{poodleDetail.heroStatement}</p>}
            {standardDetail && <p className={styles.poodleHeroStatement}>{standardDetail.heroStatement}</p>}
            <div className={styles.atAGlance}>
              <dl className={`${styles.facts} ${factCount % 2 === 1 ? styles.factsOdd : ""}`}>
                {standardDetail?.sizeVarieties ? (
                  <div>
                    <dt>크기</dt>
                    <dd>
                      <details className={styles.poodleSizeDetails}>
                        <summary>{standardDetail.sizeVarieties.summary}</summary>
                        <ul>{standardDetail.sizeVarieties.items.map((size) => <li key={size.id}><span>{size.label}</span><strong>{size.range}</strong></li>)}</ul>
                      </details>
                    </dd>
                  </div>
                ) : breed.slug === "poodle" ? (
                  <div>
                    <dt>크기</dt>
                    <dd>
                      <details className={styles.poodleSizeDetails}>
                        <summary>{poodleDetail.heroSizeSummary}</summary>
                        <ul>{poodleDetail.sizes.map((size) => <li key={size.id}><span>{size.label}</span><strong>{size.range}</strong></li>)}</ul>
                      </details>
                    </dd>
                  </div>
                ) : facts.height && facts.weight ? (
                  <div>
                    <dt>크기</dt>
                    <dd className={styles.sizeMeasurements}>
                      <span><small>체고</small>{facts.height}</span>
                      <span><small>몸무게</small>{facts.weight}</span>
                    </dd>
                  </div>
                ) : facts.size ? <div><dt>크기</dt><dd>{facts.size}</dd></div> : null}
                {facts.lifespan && <div><dt>평균 수명</dt><dd>{facts.lifespan}</dd></div>}
                {isStandardDetail ? roleFacts.map((role) => (
                  <div key={role.label}><dt>{role.label}</dt><dd>{role.value}</dd></div>
                )) : (
                  <>
                    <div><dt>계통</dt><dd>{breed.identity.lineage}</dd></div>
                    <div><dt>원래 역할</dt><dd>{breed.identity.originalRole}</dd></div>
                  </>
                )}
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

        <article className={`${styles.content} ${isStandardDetail ? styles.poodleContent : ""}`}>
          {breed.slug === "poodle" ? (
            <PoodleDetailExperience related={related} />
          ) : standardDetail ? (
            <StandardBreedDetailExperience
              detail={standardDetail}
              related={related}
              realityCards={<StandardRealityCards detail={standardDetail} />}
            />
          ) : (
            <BreedDetailExperience breed={breed} />
          )}
          {!isStandardDetail && (
            <details className={styles.sources}>
              <summary><span>정보 출처와 편집 안내</span><small>출처 {allSources.length}개 · {allSources[0].checkedAt} 확인</small></summary>
              <div><p>현재 편집 중이며 수의학·행동 전문가 검수 전인 정보입니다. 품종의 일반적 경향이 개별 강아지의 건강과 행동을 보장하지는 않습니다.</p><ul>{allSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} — {source.title}</a><span>확인일 {source.checkedAt}</span></li>)}</ul></div>
            </details>
          )}
        </article>
      </main>
    </>
  );
}
