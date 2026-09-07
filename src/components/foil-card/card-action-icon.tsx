import styles from "./card-action-icon.module.css";
export function CardActionIcon({
  kind,
  expanded = false,
}: {
  kind: "flip" | "detail" | "expand";
  expanded?: boolean;
}) {
  return (
    <span
      className={`${styles.icon} ${styles[kind]}`}
      data-expanded={expanded}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
