import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import { familiarKoreaBreeds } from "@/content/familiar-korea-breeds";
import styles from "./familiar-breed-start.module.css";

export function FamiliarBreedStart({ breeds }: { breeds: readonly Breed[] }) {
  const breedBySlug = new Map(breeds.map((breed) => [breed.slug, breed]));
  const entries = familiarKoreaBreeds.flatMap((entry) => {
    const breed = breedBySlug.get(entry.slug);
    return breed ? [{ ...entry, breed }] : [];
  });
  const first = entries.filter((entry) => entry.priority === "first");
  const more = entries.filter((entry) => entry.priority === "more");

  return (
    <section className={styles.section} aria-labelledby="familiar-breeds-title">
      <header className={styles.header}>
        <p>익숙한 이름부터</p>
        <h2 id="familiar-breeds-title">먼저 떠오르는 견종이 있나요?</h2>
        <span>국내 양육 조사와 일상에서 익숙한 이름을 시작점으로 골랐어요. 인기 순위나 추천 결과는 아니에요.</span>
      </header>

      <div className={styles.rail}>
        {first.map(({ breed, displayName, displayNameEn }) => (
          <Link className={styles.card} href={`/breeds/${breed.slug}`} key={breed.slug}>
            <BreedVisual breed={breed} variant="tile" />
            <strong>{displayName ?? breed.nameKo}</strong>
            <span>{displayNameEn ?? breed.nameEn}</span>
          </Link>
        ))}
      </div>

      <details className={styles.more}>
        <summary>익숙한 견종 20종 더 보기</summary>
        <div>
          {more.map(({ breed, displayName }) => (
            <Link href={`/breeds/${breed.slug}`} key={breed.slug}>{displayName ?? breed.nameKo}<span aria-hidden="true">→</span></Link>
          ))}
        </div>
      </details>
    </section>
  );
}
