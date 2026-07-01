import type { Metadata } from "next";
import { Section, PageHeader, StatCard } from "@/components/ui";
import { PetitionLive } from "@/components/petition-live";
import { BannerSlogans } from "@/components/banner-slogans";
import { PETITION } from "@/data/civic";
import { CAMPAIGN } from "@/data/overview";
import { getSignatureCount } from "./actions";

export const metadata: Metadata = {
  title: "주민 서명",
  description: "고양은평선 식사·풍동 연장을 위한 온라인 주민 서명(이메일 인증)과 참여 현황.",
};

// 온라인 서명 수를 주기적으로 갱신 (ISR)
export const revalidate = 30;

export default async function PetitionPage() {
  const online = await getSignatureCount();

  return (
    <>
      <PageHeader
        eyebrow="주민 서명"
        title="데이터에 목소리를 더하다"
        lead={`${CAMPAIGN.org} · ${CAMPAIGN.who}. 이메일 인증으로 중복 없는 온라인 서명을 받습니다. 명단은 공개되지 않으며, 공개되는 것은 서명 수뿐입니다.`}
      />

      <Section>
        <PetitionLive initialCount={online} />
      </Section>

      {/* 요구 · 슬로건 (현수막 스타일) */}
      <BannerSlogans />

      <Section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="온라인 서명" value={online.toLocaleString()} unit="명" tone="good" />
          <StatCard label="2025 서명운동" value={`약 ${PETITION.current.toLocaleString()}`} unit="명" tone="brand" />
          <StatCard label="식사·풍동 주민" value="약 8만" unit="명" tone="brand" />
          <StatCard label="고양시민" value="약 106만" unit="명" tone="teal" />
        </div>
      </Section>
    </>
  );
}
