import Link from "next/link";
import type { ReactNode } from "react";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import type { StandardBreedDetail } from "@/content/standard-breed-detail/schema";
import { StandardReadinessChecklist, StandardStorySteps } from "./breed-detail-standard-interactions";
import styles from "./poodle-detail.module.css";

type RelatedBreed = { breed: Breed; reason: string };

type StandardExperienceDetail = Pick<
  StandardBreedDetail,
  | "slug"
  | "nameKo"
  | "story"
  | "modernWork"
  | "realitiesTitle"
  | "readinessTitle"
  | "readinessQuestions"
  | "relatedTitle"
  | "relatedDescription"
  | "relatedDifferences"
>;

export function StandardBreedDetailExperience({
  detail,
  related,
  realityCards,
}: {
  detail: StandardExperienceDetail;
  related: RelatedBreed[];
  realityCards: ReactNode;
}) {
  const relatedBreeds = related.filter(({ breed }) => detail.relatedDifferences[breed.slug]).slice(0, 3);

  return (
    <>
      <section className={styles.story} aria-labelledby={`${detail.slug}-story-title`}>
        <header>
          <p><b aria-hidden="true">01</b> 과거에서 오늘까지</p>
          <h2 id={`${detail.slug}-story-title`}>{detail.story.title}</h2>
          <span>{detail.story.description}</span>
        </header>
        <div className={styles.storyLayout}><StandardStorySteps detail={detail} /></div>
        <p className={styles.caution}><span aria-hidden="true">*</span>{detail.story.caution}</p>
        {detail.modernWork && (
          <section className={styles.modernWork} aria-labelledby={`${detail.slug}-modern-work-title`}>
            <header>
              <span>오늘도 이어지는 역할</span>
              <h3 id={`${detail.slug}-modern-work-title`}>{detail.modernWork.title}</h3>
              <p>{detail.modernWork.description}</p>
            </header>
            <div>
              {detail.modernWork.roles.map((role) => (
                <article key={role.label}>
                  <span>{role.label}</span>
                  <h4>{role.title}</h4>
                  <p>{role.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.modernWorkCaution}><span aria-hidden="true">*</span>{detail.modernWork.caution}</p>
          </section>
        )}
      </section>

      <section className={styles.realities} aria-labelledby={`${detail.slug}-realities-title`}>
        <header>
          <p><b aria-hidden="true">02</b> 함께 살 때 체감하는 것</p>
          <h2 id={`${detail.slug}-realities-title`}>{detail.realitiesTitle}</h2>
        </header>
        {realityCards}
      </section>

      <section className={styles.readiness} aria-labelledby={`${detail.slug}-readiness-title`}>
        <header>
          <p><b aria-hidden="true">03</b> 함께 살기 전에</p>
          <h2 id={`${detail.slug}-readiness-title`}>{detail.readinessTitle}</h2>
        </header>
        <StandardReadinessChecklist detail={detail} />
      </section>

      {relatedBreeds.length > 0 && (
        <section className={styles.related} aria-labelledby={`${detail.slug}-related-title`}>
          <header>
            <p><b aria-hidden="true">04</b> 다음으로 살펴보기</p>
            <h2 id={`${detail.slug}-related-title`}>{detail.relatedTitle}</h2>
            <span>{detail.relatedDescription}</span>
          </header>
          <div>
            {relatedBreeds.map(({ breed }) => (
              <Link href={`/breeds/${breed.slug}`} key={breed.slug}>
                <BreedVisual breed={breed} variant="tile" />
                <span><strong>{breed.nameKo}</strong><small>{detail.relatedDifferences[breed.slug]}</small><b>상세페이지 보기 →</b></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
