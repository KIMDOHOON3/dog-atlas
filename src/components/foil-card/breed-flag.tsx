import type { GiantCard } from "@/content/giant-cards";
import styles from "./foil-card.module.css";

export function BreedFlag({ country }: { country: GiantCard["flag"] }) {
  if (country === null) {
    return (
      <svg className={styles.regionMark} viewBox="0 0 36 24" aria-hidden="true">
        <path
          d="m3 21 11-17 8 12 5-7 7 12H3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="m10 10 4 3 4-3" fill="none" stroke="currentColor" />
      </svg>
    );
  }
  if (country === "turkey") {
    return (
      <svg className={styles.flag} viewBox="0 0 36 24" aria-hidden="true">
        <path fill="#c74748" d="M0 0h36v24H0z" />
        <circle cx="14" cy="12" r="6" fill="#fff9eb" />
        <circle cx="15.5" cy="12" r="4.8" fill="#c74748" />
        <path
          fill="#fff9eb"
          d="m23 8.4.9 2.7h2.9l-2.4 1.7.9 2.8-2.3-1.7-2.4 1.7.9-2.8-2.3-1.7h2.9z"
        />
      </svg>
    );
  }
  if (country === "mongolia") {
    return (
      <svg className={styles.flag} viewBox="0 0 48 24" aria-hidden="true">
        <path fill="#be4549" d="M0 0h48v24H0z" />
        <path fill="#31649a" d="M16 0h16v24H16z" />
        <g fill="#f2cf64">
          <path d="M7 5c-1-1 1-2 0-3 3 1 1 2 2 3 1 0 1-1 1-1 2 3-4 4-3 1Z" />
          <circle cx="8" cy="8" r="1.5" />
          <path d="M5.8 8.6a2.3 2.3 0 0 0 4.4 0 2.3 3.4 0 0 1-4.4 0ZM4 11h1.5v10H4zM10.5 11H12v10h-1.5zM6 11h4l-2 1.5zM6 19.5h4L8 21zM6 13h4v1H6zM6 18h4v1H6z" />
          <circle cx="8" cy="16" r="1.8" />
        </g>
        <path
          d="M8 14.2c-2 .8 2 2.8 0 3.6"
          fill="none"
          stroke="#be4549"
          strokeWidth=".45"
        />
        <circle cx="8" cy="15.1" r=".3" fill="#be4549" />
        <circle cx="8" cy="16.9" r=".3" fill="#be4549" />
      </svg>
    );
  }
  return (
    <span className={styles.flag} data-country={country} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
