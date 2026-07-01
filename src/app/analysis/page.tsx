import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, StatCard, Callout, PendingData } from "@/components/ui";
import { CommuteSimulator } from "@/components/commute-simulator";
import { POP_HEADLINE, PENDING_ANALYSIS } from "@/data/analysis";
import { DATA_NOTE } from "@/data/overview";

export const metadata: Metadata = {
  title: "데이터 분석",
  description: "인구 현황, 통행시간 개선 시뮬레이션, 그리고 확보 예정 분석 지표(경제효과·교통 소외지수).",
};

export default function AnalysisPage() {
  return (
    <>
      <PageHeader
        eyebrow="데이터 분석"
        title="숫자를 근거로 바꾸다"
        lead="검증된 인구 지표와 개통 효과 시뮬레이션을 제공합니다. 정밀 산정이 필요한 지표는 임의값 대신 산정 방법과 출처를 밝히고 '자료 확보 중'으로 표시합니다."
      />

      {/* 인구 현황 (실데이터) */}
      <Section id="population">
        <SectionTitle desc="주민등록·공개 통계 기준">인구 현황</SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {POP_HEADLINE.map((p) => (
            <StatCard key={p.label} label={p.label} value={p.value} unit={p.unit} sub={p.sub} tone={p.tone} />
          ))}
        </div>
      </Section>

      {/* 출퇴근 시뮬레이터 */}
      <Section className="pt-0" id="simulator">
        <SectionTitle desc="목적지를 골라 개통 전후 통행시간을 비교해 보세요. (추정 시뮬레이션)">
          출퇴근 시뮬레이터
        </SectionTitle>
        <CommuteSimulator />
      </Section>

      {/* 자료 확보 중 분석 지표 */}
      <Section className="pt-0" id="transit-poverty">
        <SectionTitle desc="공인된 방법론과 공공데이터로 산정 후 공개합니다">확보 예정 분석</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-3">
          <PendingData title={PENDING_ANALYSIS.economic.title} source={PENDING_ANALYSIS.economic.source}>
            {PENDING_ANALYSIS.economic.desc}
          </PendingData>
          <PendingData title={PENDING_ANALYSIS.poverty.title} source={PENDING_ANALYSIS.poverty.source}>
            {PENDING_ANALYSIS.poverty.desc}
          </PendingData>
          <PendingData title={PENDING_ANALYSIS.commuteRatio.title} source={PENDING_ANALYSIS.commuteRatio.source}>
            {PENDING_ANALYSIS.commuteRatio.desc}
          </PendingData>
        </div>
        <div className="mt-4">
          <Callout title="핵심 메시지" tone="brand">
            식사·풍동 일대 <strong>약 8만 명</strong>이 도시철도역 없이 광역버스에 의존합니다.
            연장은 집값이 아니라 <strong>이동권 격차</strong>를 줄이는 균형발전 정책입니다.
            정확한 경제효과·소외지수는 공인 방법론으로 산정해 순차 공개합니다.
          </Callout>
        </div>
        <p className="mt-4 text-xs text-ink-muted">※ {DATA_NOTE}</p>
      </Section>
    </>
  );
}
