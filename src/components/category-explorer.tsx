import Link from "next/link";
import { DogIcon } from "@/components/dog-icon";
import { applyBreedFilterPreset, breedFilterPresets, filtersToSearchParams } from "@/lib/breed-filters";
import styles from "./category-explorer.module.css";

const optionDetails = {
  calm: { description: "활동량이 낮은 편", icon: "calm" as const },
  active: { description: "활동량이 높은 편", icon: "active" as const },
  social: { description: "교감이 높은 편", icon: "social" as const },
  independent: { description: "독립성이 높은 편", icon: "independent" as const },
  "grooming-light": { description: "털 관리가 낮은 편", icon: "grooming" as const },
  all: { description: "전체 견종 둘러보기", icon: "unfamiliar" as const },
};

const firstExploreOptions = breedFilterPresets.map((preset) => ({
  ...preset,
  ...optionDetails[preset.key as keyof typeof optionDetails],
  query: filtersToSearchParams(applyBreedFilterPreset(preset)).toString(),
}));

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
