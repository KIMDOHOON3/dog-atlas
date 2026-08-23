import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { poodleDetail } from "@/content/poodle-detail/data";
import type { Breed } from "@/content/breeds/schema";
import { PoodleReadinessChecklist, PoodleRealityCards, PoodleStorySteps } from "./poodle-detail-interactions";
import styles from "./poodle-detail.module.css";

type RelatedBreed = { breed: Breed; reason: string };

export function PoodleDetailExperience({ related }: { related: RelatedBreed[] }) {
  const relatedBreeds = related.filter(({ breed }) => poodleDetail.relatedDifferences[breed.slug]).slice(0, 3);

  return (
    <>
      <section className={styles.story} aria-labelledby="poodle-story-title">
        <header>
          <p>과거에서 오늘까지</p>
          <h2 id="poodle-story-title">{poodleDetail.story.title}</h2>
          <span>{poodleDetail.story.description}</span>
        </header>
        <div className={styles.storyLayout}>
          <PoodleStorySteps />
        </div>
        <p className={styles.caution}>{poodleDetail.story.caution}</p>
      </section>

      <section className={styles.realities} aria-labelledby="poodle-realities-title">
        <header>
          <p>함께 살 때 체감하는 것</p>
          <h2 id="poodle-realities-title">푸들의 생활 현실</h2>
        </header>
        <PoodleRealityCards />
      </section>

      <section className={styles.readiness} aria-labelledby="poodle-readiness-title">
        <header>
          <p>함께 살기 전에</p>
          <h2 id="poodle-readiness-title">푸들과 보낼 일상을 생각해보세요.</h2>
        </header>
        <PoodleReadinessChecklist />
      </section>

      {relatedBreeds.length > 0 && (
        <section className={styles.related} aria-labelledby="poodle-related-title">
          <header>
            <p>다음으로 살펴보기</p>
            <h2 id="poodle-related-title">푸들이 마음에 들지만 망설여진다면</h2>
            <span>다른 생활 조건을 가진 견종도 함께 살펴보세요.</span>
          </header>
          <div>
            {relatedBreeds.map(({ breed }) => (
              <Link href={`/breeds/${breed.slug}`} key={breed.slug}>
                <BreedVisual breed={breed} variant="tile" />
                <span><strong>{breed.nameKo}</strong><small>{poodleDetail.relatedDifferences[breed.slug]}</small><b>상세페이지 보기 →</b></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
