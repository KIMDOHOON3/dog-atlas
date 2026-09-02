import type { Metadata } from "next";
import { PageScrollControl } from "@/components/page-scroll-control";
import { resolveSiteUrl, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "살아 있는 견종도감",
    description: "호기심으로 들어와, 함께 살 현실까지 이해하는 견종 탐험",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        {children}
        <PageScrollControl />
      </body>
    </html>
  );
}
