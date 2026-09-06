import type { GiantCard } from "@/content/giant-cards";
import styles from "./foil-card.module.css";

export function BreedFlag({ country }: { country: GiantCard["flag"] }) {
  if (country === "none") return null;
  if (country === "japan")
    return (
      <svg className={styles.flag} viewBox="0 0 60 40" aria-hidden="true">
        <path fill="#f9f7ed" d="M0 0h60v40H0z" />
        <circle cx="30" cy="20" r="12" fill="#b64e45" />
      </svg>
    );
  if (country === "korea")
    return (
      <svg className={styles.flag} viewBox="0 0 60 40" aria-hidden="true">
        <path fill="#f9f7ed" d="M0 0h60v40H0z" />
        <g transform="rotate(33.69 30 20)">
          <circle cx="30" cy="20" r="10" fill="#355b83" />
          <path
            d="M20 20a10 10 0 0 1 20 0a5 5 0 0 1-10 0a5 5 0 0 0-10 0"
            fill="#b64e45"
          />
        </g>
        {[
          { x: 12, y: 9, angle: -56.31, broken: [false, false, false] },
          { x: 48, y: 9, angle: 56.31, broken: [true, false, true] },
          { x: 12, y: 31, angle: 56.31, broken: [false, true, false] },
          { x: 48, y: 31, angle: -56.31, broken: [true, true, true] },
        ].map(({ x, y, angle, broken }) => (
          <g
            key={x + "-" + y}
            transform={`translate(${x} ${y}) rotate(${angle})`}
            fill="#303a38"
          >
            {broken.map((split, index) => (
              <g key={index} transform={`translate(0 ${(index - 1) * 3})`}>
                {split ? (
                  <>
                    <rect x="-5" y="-1" width="4" height="2" />
                    <rect x="1" y="-1" width="4" height="2" />
                  </>
                ) : (
                  <rect x="-5" y="-1" width="10" height="2" />
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>
    );
  if (country === "china")
    return (
      <svg className={styles.flag} viewBox="0 0 30 20" aria-hidden="true">
        <path fill="#bd4945" d="M0 0h30v20H0z" />
        <g fill="#ead37c">
          <path d="m5 2 1 2.3 2.5.2-1.9 1.6.6 2.5L5 7.3 2.8 8.6l.6-2.5L1.5 4.5 4 4.3z" />
          <path d="m10 1 .3.7.8.1-.6.5.2.7-.7-.4-.6.4.2-.7-.6-.5.8-.1z" />
          <path d="m12 3 .3.7.8.1-.6.5.2.7-.7-.4-.6.4.2-.7-.6-.5.8-.1zM12 6l.3.7.8.1-.6.5.2.7-.7-.4-.6.4.2-.7-.6-.5.8-.1zM10 8l.3.7.8.1-.6.5.2.7-.7-.4-.6.4.2-.7-.6-.5.8-.1z" />
        </g>
      </svg>
    );
  if (country === "uk") {
    return (
      <svg className={styles.flag} viewBox="0 0 60 40" aria-hidden="true">
        <path fill="#354e6d" d="M0 0h60v40H0z" />
        <path stroke="#f9f7ed" strokeWidth="8" d="m0 0 60 40M60 0 0 40" />
        <path
          stroke="#b64e45"
          strokeWidth="3"
          d="m0 0 30 20m30-20L30 20m0 0 30 20M30 20 0 40"
        />
        <path stroke="#f9f7ed" strokeWidth="13" d="M30 0v40M0 20h60" />
        <path stroke="#b64e45" strokeWidth="7" d="M30 0v40M0 20h60" />
      </svg>
    );
  }
  if (country === "mexico") {
    return (
      <svg className={styles.flag} viewBox="0 0 36 24" aria-hidden="true">
        <path fill="#f9f7ed" d="M0 0h36v24H0z" />
        <path fill="#316950" d="M0 0h12v24H0z" />
        <path fill="#b64e45" d="M24 0h12v24H24z" />
        <path fill="#8b7044" d="m15 8 4 2 2 4-4-1-2-3 1 5h4l-2 1-3-1z" />
        <path
          d="M14 14q4 6 8 0M18 15v-3l3-1"
          fill="none"
          stroke="#547557"
          strokeWidth=".8"
        />
      </svg>
    );
  }
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
