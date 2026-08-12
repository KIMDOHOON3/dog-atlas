import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import type { Breed } from "@/content/breeds/schema";
import type { HomeCuriosityTheme } from "@/content/home-curiosity";
import styles from "./home-curiosity-explorer.module.css";

type Props = {
  breeds: Breed[];
  themes: Array<Pick<HomeCuriosityTheme, "key" | "label" | "thumbnailSlug" | "heading" | "description">>;
};

export function HomeCuriosityExplorer({ breeds, themes }: Props) {
  const breedsBySlug = new Map(breeds.map((breed) => [breed.slug, breed]));

  return (
    <section className={styles.section} id="curiosity" aria-labelledby="curiosity-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>
          <CuriosityGlyph />
          견종 호기심 탐험
        </p>
        <h2 id="curiosity-title">어떤 특징부터 살펴볼까요?</h2>
        <p>궁금한 주제를 선택하면 관련 견종과 생활 정보를 바로 자세히 볼 수 있어요.</p>
      </header>

      <div className={styles.themeGrid}>
        {themes.map((theme) => {
          const thumbnailBreed = breedsBySlug.get(theme.thumbnailSlug);
          if (!thumbnailBreed) return null;

          return (
            <Link className={styles.themeCard} href={`/curiosity/${theme.key}`} key={theme.key}>
              <BreedVisual breed={thumbnailBreed} variant="tile" />
              <div>
                <span className={styles.label}>{theme.label}</span>
                <h3>{theme.heading}</h3>
                <p>{theme.description}</p>
                <span className={styles.more}>
                  자세히 보기 <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CuriosityGlyph() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="17" cy="17" r="11" />
      <path d="m25 25 9 9M13 18c0-3 2-5 5-5 2.7 0 4.7 1.7 4.7 4.1 0 2.8-2.8 3.4-4.1 5.1-.6.8-.7 1.4-.7 2.2M17.9 28h.1" />
    </svg>
  );
}
