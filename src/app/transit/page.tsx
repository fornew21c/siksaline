import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, StatCard, SourceTag, Callout, PendingData } from "@/components/ui";
import { CommuteSimulator } from "@/components/commute-simulator";
import { POP_HEADLINE, POP_SOURCE, RAIL_FACT, PENDING } from "@/data/transit";
import { DATA_NOTE } from "@/data/overview";

export const metadata: Metadata = {
  title: "교통 데이터",
  description:
    "식사동 인구·철도 접근성 현황, 개통 전후 통행시간 시뮬레이션, 그리고 확보 예정 지표(혼잡도·경제효과·교통 소외지수)를 한곳에서.",
};

export default function TransitPage() {
  return (
    <>
      <PageHeader
        eyebrow="교통 데이터"
        title="주민은 8만, 도시철도역은 0"
        lead="식사·풍동 일대의 교통 현실을 검증된 지표로 정리합니다. 실측이 필요한 지표는 임의값 대신 산정 방법과 출처를 밝히고 '자료 확보 중'으로 투명하게 표시합니다."
      />

      {/* 인구 현황 (실데이터) */}
      <Section id="population">
        <SectionTitle desc="주민등록·공개 통계 기준">인구 현황</SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {POP_HEADLINE.map((p) => (
            <StatCard key={p.label} label={p.label} value={p.value} unit={p.unit} sub={p.sub} tone={p.tone} />
          ))}
        </div>
        <SourceTag source={POP_SOURCE.source} date={POP_SOURCE.asOf} />
      </Section>

      {/* 철도 접근성 */}
      <Section className="pt-0">
        <Card>
          <h2 className="font-bold text-ink">철도 접근성</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{RAIL_FACT}</p>
          <div className="mt-4 flex items-baseline gap-2 rounded-xl bg-signal-soft px-4 py-3">
            <span className="tabular text-3xl font-extrabold text-signal">0</span>
            <span className="text-sm font-semibold text-signal">개 · 식사동 내 도시철도역</span>
          </div>
        </Card>
      </Section>

      {/* 출퇴근 시뮬레이터 */}
      <Section className="pt-0" id="simulator">
        <SectionTitle desc="목적지를 골라 개통 전후 통행시간을 비교해 보세요. (추정 시뮬레이션)">
          출퇴근 시뮬레이터
        </SectionTitle>
        <CommuteSimulator />
      </Section>

      {/* 자료 확보 중 지표 (교통 실측 + 분석 통합) */}
      <Section className="pt-0" id="transit-poverty">
        <SectionTitle desc="공공데이터 연동·공인 방법론으로 산정 후 실측값으로 공개합니다">확보 예정 지표</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-3">
          <PendingData title={PENDING.congestion.title} source={PENDING.congestion.source}>
            {PENDING.congestion.desc}
          </PendingData>
          <PendingData title={PENDING.headway.title} source={PENDING.headway.source}>
            {PENDING.headway.desc}
          </PendingData>
          <PendingData title={PENDING.commuteDetail.title} source={PENDING.commuteDetail.source}>
            {PENDING.commuteDetail.desc}
          </PendingData>
          <PendingData title={PENDING.economic.title} source={PENDING.economic.source}>
            {PENDING.economic.desc}
          </PendingData>
          <PendingData title={PENDING.poverty.title} source={PENDING.poverty.source}>
            {PENDING.poverty.desc}
          </PendingData>
          <PendingData title={PENDING.commuteRatio.title} source={PENDING.commuteRatio.source}>
            {PENDING.commuteRatio.desc}
          </PendingData>
        </div>
      </Section>

      <Section className="pt-0">
        <Callout title="핵심 사실" tone="signal">
          식사동에는 <strong>도시철도역이 없습니다(0개)</strong>. 반면 식사·풍동 일대에는{" "}
          <strong>약 8만 명</strong>이 도시철도역 없이 광역버스에 의존하며, 입주로 10만 명을 넘어설 전망입니다.
          고양은평선 <strong>차량기지가 식사 인근(약 2km)</strong>에 있어 연장 효율성이 큽니다. 연장은 집값이 아니라{" "}
          <strong>이동권 격차</strong>를 줄이는 균형발전 정책입니다.
        </Callout>
        <p className="mt-4 text-xs text-ink-muted">※ {DATA_NOTE}</p>
      </Section>
    </>
  );
}
