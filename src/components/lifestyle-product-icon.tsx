import Image from "next/image";
import type { LifestyleIconId } from "@/lib/breed-life-presentation";

const lifestyleIconSources: Record<LifestyleIconId, string> = {
  rest: "/images/lifestyle-icons/rest.png",
  grooming: "/images/lifestyle-icons/grooming.png",
  safety: "/images/lifestyle-icons/safety.png",
  walk: "/images/lifestyle-icons/walk.png",
  "sofa-rest": "/images/lifestyle-icons/sofa-rest.png",
  hygiene: "/images/lifestyle-icons/hygiene.png",
  enrichment: "/images/lifestyle-icons/enrichment.png",
  connection: "/images/lifestyle-icons/connection.png",
  climate: "/images/lifestyle-icons/climate.png",
  "health-check": "/images/lifestyle-icons/health-check.png",
  feeding: "/images/lifestyle-icons/feeding.png",
  "calm-alert": "/images/lifestyle-icons/calm-alert.png",
};

export function LifestyleProductIcon({
  name,
  className,
  size = 72,
}: {
  name: LifestyleIconId;
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={lifestyleIconSources[name]}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    />
  );
}
