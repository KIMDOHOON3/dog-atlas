import Link from "next/link";
import { DogIcon } from "@/components/dog-icon";
import styles from "./category-explorer.module.css";

const firstExploreOptions = [
  { label: "느긋한 활동", description: "활동량이 낮은 편", query: "activity=low", icon: "calm" as const },
  { label: "많이 움직이기", description: "활동량이 높은 편", query: "activity=high", icon: "active" as const },
  { label: "사람과 교감", description: "교감이 높은 편", query: "social=high", icon: "social" as const },
  { label: "독립적인 성향", description: "독립성이 높은 편", query: "independence=high", icon: "independent" as const },
  { label: "털 관리 적게", description: "털 관리가 낮은 편", query: "grooming=low", icon: "grooming" as const },
  { label: "아직 잘 모르겠어요", description: "전체 견종 둘러보기", query: "", icon: "unfamiliar" as const },
];

export function CategoryExplorer() {
  return (
    <section className={`${styles.explorer} ${styles.quickExplorer}`} id="lenses" aria-labelledby="explorer-title">
      <div className={styles.eyebrow}>처음이라면 여기부터</div>
      <h2 id="explorer-title">내가 원하는 생활부터 골라보세요.</h2>
      <p className={styles.intro}>원하는 생활을 하나 골라 가볍게 시작해보세요.</p>
      <div className={styles.quickStartGrid} role="list" aria-label="견종 발견 빠른 시작">
        {firstExploreOptions.map((option) => (
          <Link className={styles.quickStartCard} href={option.query ? `/discover?${option.query}` : "/discover"} key={option.label}>
            <DogIcon name={option.icon} className={styles.quickIcon} />
            <strong>{option.label}</strong>
            <span>{option.description}</span>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
