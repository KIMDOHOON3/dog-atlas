import Image from "next/image";
import styles from "./card-action-icon.module.css";
export function CardActionIcon({
  kind,
  expanded = false,
}: {
  kind: "flip" | "detail" | "expand";
  expanded?: boolean;
}) {
  if (kind !== "expand")
    return (
      <Image
        className={styles.artwork}
        src={`/images/card-controls/${kind}-paper-v2.webp`}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        unoptimized
      />
    );
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
