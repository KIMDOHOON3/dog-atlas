"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BreedThumbnail } from "./breed-thumbnail";
import { useInterestBreeds } from "./interest-breeds";
import styles from "./compare-candidate-header.module.css";

type Candidate = { slug: string; nameKo: string };

export function CompareCandidateHeader({ candidates }: { candidates: Candidate[] }) {
  const router = useRouter();
  const { hydrated, slugs, remove, replaceAll } = useInterestBreeds();

  useEffect(() => {
    if (!hydrated) return;
    if (candidates.length > 0) {
      replaceAll(candidates.map((candidate) => candidate.slug));
    } else if (slugs.length > 0) {
      router.replace(`/compare?breeds=${slugs.join(",")}`);
    }
  }, [candidates, hydrated, replaceAll, router, slugs]);

  function removeCandidate(slug: string) {
    remove(slug);
    const next = candidates.filter((candidate) => candidate.slug !== slug);
    const query = next.length ? `?breeds=${next.map((candidate) => candidate.slug).join(",")}` : "";
    router.replace(`/compare${query}`);
  }

  if (candidates.length === 0) return null;

  return (
    <section className={styles.header} aria-label="비교 후보">
      <strong>비교 후보 {candidates.length}마리</strong>
      <div>
        {candidates.map((candidate) => (
          <article key={candidate.slug}>
            <BreedThumbnail slug={candidate.slug} nameKo={candidate.nameKo} size={44} className={styles.thumbnail} />
            <Link href={`/breeds/${candidate.slug}`}>{candidate.nameKo}</Link>
            <button type="button" onClick={() => removeCandidate(candidate.slug)} aria-label={`${candidate.nameKo} 후보에서 빼기`}>×</button>
          </article>
        ))}
      </div>
    </section>
  );
}
