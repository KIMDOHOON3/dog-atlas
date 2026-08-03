import type { Metadata } from "next";
import { InterestBreedTray } from "@/components/interest-breed-tray";
import { InterestBreedsProvider } from "@/components/interest-breeds";
import { breeds } from "@/content/breeds/data";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "살아 있는 견종도감",
    template: "%s | 살아 있는 견종도감",
  },
  description:
    "익숙한 외모 너머의 역사와 행동 경향, 오늘의 양육 현실을 함께 살펴보는 예비 보호자를 위한 견종도감입니다.",
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
        <InterestBreedsProvider breeds={breeds.map(({ slug, nameKo }) => ({ slug, nameKo }))}>
          {children}
          <InterestBreedTray />
        </InterestBreedsProvider>
      </body>
    </html>
  );
}
