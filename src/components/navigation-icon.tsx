import styles from "./navigation-icon.module.css";

export type NavigationIconName = "home" | "discovery" | "stories" | "curiosity";

export function NavigationIcon({ name }: { name: NavigationIconName }) {
  return <span className={`${styles.icon} ${styles[name]}`} aria-hidden="true" />;
}
