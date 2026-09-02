import type { Metadata } from "next";

export const SITE_NAME = "살아 있는 견종도감";
export const SITE_DESCRIPTION = "익숙한 외모 너머의 역사와 행동 경향, 오늘의 양육 현실을 함께 살펴보는 예비 보호자를 위한 견종도감입니다.";
export const DEFAULT_SHARE_IMAGE = "/illustrations/v8/home-care-ui-spitz-diorama.webp";

export function resolveSiteUrl(env: { NEXT_PUBLIC_SITE_URL?: string; VERCEL_PROJECT_PRODUCTION_URL?: string } = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
}) {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelDomain = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = new URL(configured || (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"));
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) site origin without credentials, path, query or fragment.");
  }
  return new URL(url.origin);
}

export function createPageMetadata({ title, description, path, image = DEFAULT_SHARE_IMAGE, imageAlt = "강아지 도감의 생활 디오라마" }: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const base = resolveSiteUrl();
  const url = new URL(path, base).href;
  const imageUrl = new URL(image, base).href;
  const shareTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  return {
    title: title === SITE_NAME ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title: shareTitle, description, url, siteName: SITE_NAME, type: "website", locale: "ko_KR", images: [{ url: imageUrl, alt: imageAlt }] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [{ url: imageUrl, alt: imageAlt }] },
  };
}
