import Link from "next/link";
import { breedNameStories } from "@/content/breed-name-stories";
import styles from "./breed-name-stories-explorer.module.css";

export function BreedNameStoriesExplorer() {
  return (
    <section className={styles.section} id="breed-name-stories" aria-labelledby="breed-name-stories-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>이름 속 견종</p>
        <h2 id="breed-name-stories-title">어떤 이름의 이야기가 궁금하세요?</h2>
        <p>이름을 선택하면 옛 역할과 연결된 견종을 바로 자세히 볼 수 있어요.</p>
      </header>

      <div className={styles.storyGrid}>
        {breedNameStories.map((story) => (
          <Link className={styles.storyCard} href={`/breed-names/${story.key}`} key={story.key}>
            <span className={styles.term}>{story.term}</span>
            <h3>{story.meaning}</h3>
            <p>{story.description}</p>
            <span className={styles.more}>
              이야기 자세히 보기 <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
      <p className={styles.disclaimer}>이름은 역사적 역할을 읽는 단서예요. 같은 이름군의 모든 견종이나 오늘의 개체가 똑같이 행동한다는 뜻은 아닙니다.</p>
    </section>
  );
}
