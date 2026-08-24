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
        <h2 id="familiar-breeds-title"><em>익숙한 이름</em>에서 시작해보세요.</h2>
      </header>

      <div className={styles.rail}>
        {first.map(({ breed, displayName, displayNameEn }) => (
          <Link className={styles.card} href={`/breeds/${breed.slug}`} key={breed.slug}>
            <BreedVisual breed={breed} variant="tile" />
            <span className={styles.cardBody}>
              <span><strong>{displayName ?? breed.nameKo}</strong><small>{displayNameEn ?? breed.nameEn}</small></span>
              <i aria-hidden="true">→</i>
            </span>
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
