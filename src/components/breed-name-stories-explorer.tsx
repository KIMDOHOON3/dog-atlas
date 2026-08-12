import Link from "next/link";
import { BreedVisual } from "@/components/breed-visual";
import { breedNameStories, getBreedNameStoryBreeds } from "@/content/breed-name-stories";
import { breeds, getBreed } from "@/content/breeds/data";
import styles from "./breed-name-stories-explorer.module.css";

export function BreedNameStoriesExplorer() {
  return (
    <section className={styles.section} id="breed-name-stories" aria-labelledby="breed-name-stories-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>이름 속 견종</p>
        <h2 id="breed-name-stories-title">견종 이름은 어디에서 왔을까요?</h2>
        <p>이름에 남은 옛 역할과 역사를 대표 견종부터 가볍게 살펴보세요.</p>
      </header>

      <div className={styles.collection}>
        <div className={styles.collectionHeading}>
          <div>
            <h3>이름을 읽으면 옛일이 보여요.</h3>
            <p>각 이름마다 대표 견종 4종을 먼저 보고, 더보기에서 연결된 견종을 모두 만날 수 있어요.</p>
          </div>
          <span className={styles.swipeHint}>옆으로 넘겨 보기 →</span>
        </div>

        <div className={styles.storyGrid}>
          {breedNameStories.map((story) => {
            const storyBreeds = getBreedNameStoryBreeds(story.key, breeds);

            return (
              <article className={styles.storyCard} key={story.key} aria-labelledby={`${story.key}-story-title`}>
                <div className={styles.storyHead}>
                  <span>{story.term}</span>
                  <h3 id={`${story.key}-story-title`}>{story.meaning}</h3>
                </div>
                <p className={styles.description}>{story.description}</p>
                <div className={styles.representative}><span>대표 견종</span><strong>4종</strong></div>
                <ul className={styles.examples} aria-label={`${story.term} 관련 견종`}>
                  {story.examples.map((example) => {
                    const breed = getBreed(example.slug);
                    if (!breed) return null;

                    return (
                      <li key={example.slug}>
                        <Link href={`/breeds/${breed.slug}`} aria-label={`${breed.nameKo} 상세 정보 보기`}>
                          <BreedVisual breed={breed} variant="tile" />
                          <div>
                            <strong>{breed.nameKo}</strong>
                            <span>{example.cue}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link className={styles.more} href={`/breed-names/${story.key}`}>
                  현재 도감에서 {storyBreeds.length}종 더 보기 <span aria-hidden="true">→</span>
                </Link>
                <div className={styles.sources}>
                  <span>자료</span>
                  {story.sources.map((source) => (
                    <a href={source.url} key={source.url} target="_blank" rel="noreferrer" aria-label={`${source.organization} 자료 새 창에서 열기`}>
                      {source.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.disclaimer}>이름은 역사적 역할을 읽는 단서예요. 같은 이름군의 모든 견종이나 오늘의 개체가 똑같이 행동한다는 뜻은 아닙니다.</p>
      </div>
    </section>
  );
}
