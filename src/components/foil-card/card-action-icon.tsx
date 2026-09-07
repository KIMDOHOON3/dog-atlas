import Image from "next/image";
import styles from "./card-action-icon.module.css";
export function CardActionIcon({
  kind,
  expanded = false,
}: {
  kind: "flip" | "detail" | "expand";
  expanded?: boolean;
}) {
  const asset = kind === "expand" ? (expanded ? "collapse" : "expand") : kind;
  return (
    <Image
      className={kind === "expand" ? styles.zoomArtwork : styles.artwork}
      src={`/images/card-controls/${asset}-paper-v2.webp`}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      unoptimized
    />
  );
}
