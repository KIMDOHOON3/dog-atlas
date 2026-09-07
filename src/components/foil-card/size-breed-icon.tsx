import Image from "next/image";
import type { CardSize } from "./size-selector";
import styles from "./size-breed-icon.module.css";

// Crop windows on the approved sheet; preserve the approved outlines exactly.
const crops: Record<
  CardSize,
  { x: number; y: number; width: number; height: number; display: number }
> = {
  소형견: { x: 72, y: 355, width: 183, height: 203, display: 30 },
  중형견: { x: 320, y: 286, width: 286, height: 274, display: 39 },
  대형견: { x: 625, y: 247, width: 426, height: 312, display: 49 },
  초대형견: { x: 1051, y: 125, width: 458, height: 435, display: 52 },
};
export function SizeBreedIcon({ size }: { size: CardSize }) {
  const crop = crops[size];
  const scale = crop.display / crop.width;
  return (
    <span className={styles.frame} aria-hidden="true">
      <span
        className={styles.crop}
        style={{ width: crop.display, height: crop.height * scale }}
      >
        <Image
          src="/images/size-icons/approved-silhouettes.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="512px"
          quality={90}
          draggable={false}
          style={{
            width: 1536 * scale,
            height: 1024 * scale,
            left: -crop.x * scale,
            top: -crop.y * scale,
          }}
        />
      </span>
    </span>
  );
}
