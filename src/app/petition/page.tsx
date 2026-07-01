import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, StatCard, Badge, PendingData, Callout } from "@/components/ui";
import { PetitionForm } from "@/components/petition-form";
import { PETITION } from "@/data/civic";
import { CAMPAIGN, SLOGANS } from "@/data/overview";

export const metadata: Metadata = {
  title: "주민 서명",
  description: "고양은평선 식사·풍동 연장을 위한 온라인 주민 서명과 참여 현황.",
};

export default function PetitionPage() {
  const pct = Math.round((PETITION.current / PETITION.goal) * 100);

  return (
    <>
      <PageHeader
        eyebrow="주민 서명"
        title="데이터에 목소리를 더하다"
        lead={`${CAMPAIGN.org} · ${CAMPAIGN.who}. 2025 서명운동에 약 22,000명이 참여했고, 온라인 참여는 계속 받고 있습니다.`}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* 폼 */}
          <PetitionForm />

          {/* 현황 */}
          <div className="space-y-4">
            <Card>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink-soft">서명운동 누적</p>
                  <p className="tabular mt-1 text-4xl font-extrabold text-brand">
                    약 {PETITION.current.toLocaleString()}
                    <span className="text-base font-bold text-ink-muted">
                      {" "}/ {PETITION.goal.toLocaleString()}명
                    </span>
                  </p>
                </div>
                <Badge tone="good">2025 서명운동</Badge>
              </div>
              <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                잠정 목표 달성률 <span className="font-bold text-brand">{pct}%</span>
              </p>
              <p className="mt-3 text-xs text-ink-muted">{PETITION.note}</p>
            </Card>

            <PendingData title="지역별 참여 집계 — 확보 중" source="추진모임 서명 데이터">
              식사·풍동·기타 지역별 참여 현황은 집계가 정리되는 대로 공개합니다. 확인되지 않은 수치를 임의로 표시하지 않습니다.
            </PendingData>
          </div>
        </div>
      </Section>

      {/* 요구 · 슬로건 (현수막 동기화) */}
      <Section className="pt-0">
        <SectionTitle desc="거리의 현수막과 같은 메시지입니다">우리의 요구</SectionTitle>
        <Callout title={CAMPAIGN.demand} tone="brand">
          <div className="mt-3 flex flex-wrap gap-2">
            {SLOGANS.map((s) => (
              <span key={s} className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink-soft">
                {s}
              </span>
            ))}
          </div>
        </Callout>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="서명운동 누적" value={`약 ${PETITION.current.toLocaleString()}`} unit="명" tone="good" />
          <StatCard label="식사·풍동 주민" value="약 8만" unit="명" tone="brand" />
          <StatCard label="고양시민" value="약 106만" unit="명" tone="teal" />
        </div>
      </Section>
    </>
  );
}
