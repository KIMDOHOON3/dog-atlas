import Image from "next/image";
import styles from "./card-action-icon.module.css";

const artwork = {
  flip: "/images/card-controls/flip-paper-v2.webp",
  detail: "/images/card-controls/detail-paper-v2.webp",
  expand: "/images/card-controls/expand-paper-v2.webp",
  collapse: "/images/card-controls/collapse-paper-v2.webp",
} as const;

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
      src={artwork[asset]}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      unoptimized
    />
  );
}
