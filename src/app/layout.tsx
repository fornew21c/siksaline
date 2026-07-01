import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const SITE_URL = "https://siksaline.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "고양은평선 식사동 연장 데이터 플랫폼",
    template: "%s · 고양은평선 식사연장",
  },
  description:
    "감정이 아닌 데이터로. 고양은평선의 식사동 연장 필요성을 공공데이터 기반으로 분석하고, 고양 북동부의 교통복지와 균형발전을 제안하는 정치적 중립 시민 플랫폼입니다.",
  keywords: [
    "고양은평선",
    "식사동",
    "지하철 연장",
    "고양시 교통",
    "교통복지",
    "풍동",
    "고양은평선연장 추진모임",
    "교통 데이터",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "고양은평선 식사연장",
    title: "고양은평선 식사동 연장 데이터 플랫폼",
    description:
      "감정이 아닌 데이터로. 고양 북동부 교통복지·균형발전을 위한 공공데이터 기반 시민 플랫폼.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {/* 한국어 웹 표준 서체 Pretendard */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
