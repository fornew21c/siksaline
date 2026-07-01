import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, StatCard, SourceTag, Callout, PendingData } from "@/components/ui";
import { POP_FACTS, POP_SOURCE, COMMUTE_CLAIM, RAIL_FACT, PENDING } from "@/data/transit";
import { DATA_NOTE } from "@/data/overview";

export const metadata: Metadata = {
  title: "교통 데이터",
  description: "식사동 인구·철도 접근성 현황과 고양은평선 개통 시 통행시간 개선, 그리고 확보 예정 지표.",
};

export default function TransitPage() {
  return (
    <>
      <PageHeader
        eyebrow="교통 데이터"
        title="주민은 8만, 도시철도역은 0"
        lead="식사·풍동 일대의 교통 현실을 검증된 지표로 정리합니다. 실측이 필요한 지표는 임의값 대신 '자료 확보 중'으로 투명하게 표시합니다."
      />

      {/* 인구 현황 (실데이터) */}
      <Section>
        <SectionTitle desc="주민등록·공개 통계 기준">인구 현황</SectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {POP_FACTS.map((p) => (
            <StatCard key={p.label} label={p.label} value={p.value} unit={p.unit} sub={p.sub} tone={p.tone} />
          ))}
        </div>
        <SourceTag source={POP_SOURCE.source} date={POP_SOURCE.asOf} />
      </Section>

      {/* 철도 접근성 + 통행시간 */}
      <Section className="pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="font-bold text-ink">철도 접근성</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{RAIL_FACT}</p>
            <div className="mt-4 flex items-baseline gap-2 rounded-xl bg-signal-soft px-4 py-3">
              <span className="tabular text-3xl font-extrabold text-signal">0</span>
              <span className="text-sm font-semibold text-signal">개 · 식사동 내 도시철도역</span>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold text-ink">통행시간 개선 (개통 시)</h2>
            <p className="mt-1 mb-4 text-sm text-ink-soft">{COMMUTE_CLAIM.label}</p>
            <div className="space-y-4">
              <Bar label="현재" value={COMMUTE_CLAIM.now} max={COMMUTE_CLAIM.now} color="var(--signal)" />
              <Bar label="개통 시" value={COMMUTE_CLAIM.after} max={COMMUTE_CLAIM.now} color="var(--good)" />
            </div>
            <p className="mt-3 text-xs text-ink-muted">{COMMUTE_CLAIM.note}</p>
            <SourceTag source={COMMUTE_CLAIM.source} />
          </Card>
        </div>
      </Section>

      {/* 자료 확보 중 */}
      <Section className="pt-0">
        <SectionTitle desc="공공데이터 연동 후 실측값으로 공개합니다">확보 예정 지표</SectionTitle>
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
        </div>
      </Section>

      <Section className="pt-0">
        <Callout title="핵심 사실" tone="signal">
          식사동에는 <strong>도시철도역이 없습니다(0개)</strong>. 반면 식사·풍동 일대에는{" "}
          <strong>약 8만 명</strong>이 거주하며 입주로 10만 명을 넘어설 전망입니다. 고양은평선{" "}
          <strong>차량기지가 식사 인근(약 2km)</strong>에 있어 연장 효율성이 큽니다.
        </Callout>
        <p className="mt-4 text-xs text-ink-muted">※ {DATA_NOTE}</p>
      </Section>
    </>
  );
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="tabular text-sm font-bold text-ink-soft">약 {value}분대</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}
