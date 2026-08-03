import Image from "next/image";
import { getBreedCardImage } from "./breed-visual";

export function BreedThumbnail({
  slug,
  nameKo,
  size,
  className,
}: {
  slug: string;
  nameKo: string;
  size: number;
  className?: string;
}) {
  const src = getBreedCardImage(slug);
  if (!src) return <span className={className} aria-hidden="true">{nameKo.slice(0, 1)}</span>;
  return <Image className={className} src={src} alt="" width={size} height={size} />;
}
