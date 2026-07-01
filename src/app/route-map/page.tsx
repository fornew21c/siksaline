import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, StatCard, Callout, SourceTag, PendingData } from "@/components/ui";
import { RouteDiagram } from "@/components/route-diagram";
import { LINE, LINE_FACTS, CATCHMENT } from "@/data/route";

export const metadata: Metadata = {
  title: "노선도",
  description: "고양은평선 본선(새절~고양시청)과 식사동 연장 추진 노선, 예상 역세권 분석.",
};

export default function RouteMapPage() {
  return (
    <>
      <PageHeader
        eyebrow="노선도"
        title="새절에서 고양시청, 그리고 식사동까지"
        lead="고양은평선 본선(새절~고양시청, 약 15km)은 국토부 대광위 기본계획이 승인됐습니다. 여기에 고양시청에서 식사동까지 연장하는 안이 추진되고 있습니다."
      />

      {/* 노선 핵심 팩트 */}
      <Section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {LINE_FACTS.map((f) => (
            <StatCard key={f.label} label={f.label} value={f.value} unit={f.unit} sub={f.sub} tone={f.tone} />
          ))}
        </div>
      </Section>

      {/* 개념도 */}
      <Section className="pt-0">
        <Card>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-extrabold text-ink">{LINE.name} 노선 개념도</h2>
            <span className="text-xs text-ink-muted">개념도 · 창릉 등 일부 역명 가칭·미확정</span>
          </div>
          <RouteDiagram />
          <SourceTag source={LINE.source} date={LINE.asOf} />
        </Card>
      </Section>

      {/* 연장 근거 (실데이터) + 역세권 상세는 확보 중 */}
      <Section className="pt-0">
        <SectionTitle desc="연장 필요성을 뒷받침하는 검증된 지표">연장 근거</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {CATCHMENT.map((c) => (
            <StatCard key={c.label} label={c.label} value={c.value} unit={c.note} tone={c.tone} />
          ))}
        </div>
        <div className="mt-4">
          <PendingData
            title="역세권 상세 분석 — 자료 확보 중"
            source="통계청 · 고양시 통계 · 지도 API"
          >
            식사역(가칭) 반경 배후인구·세대수·학교 분포는 역 위치가 확정되는 대로 실측 기반으로 공개합니다.
          </PendingData>
        </div>
      </Section>

      {/* 추진 상황 콜아웃 */}
      <Section className="pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title="왜 식사동 연장인가" tone="brand">
            고양은평선 <strong>차량기지가 식사 인근</strong>에 위치해 차량기지에서 식사역(가칭)까지
            <strong> 약 2km</strong>에 불과합니다. 식사동은 인구가 늘지만 도시철도역이 없어
            광역버스 의존도가 높아, 연장의 효율성과 필요성이 함께 제기됩니다.
          </Callout>
          <Callout title="현재 추진 단계" tone="teal">
            고양시가 <strong>제5차 대도시권 광역교통 시행계획</strong> 반영을 국토부에 건의했고,
            <strong> 2026년 추경에 사전타당성 검토 용역</strong>을 신청했습니다. 국토부·대광위가
            검토 중이며 연말경 확정 여부가 결정될 전망입니다. 한편 <strong>식사~고양시청~대곡
            트램</strong>안과의 우선순위 논의도 진행 중입니다.
          </Callout>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          ※ 식사 연장은 확정 노선이 아니라 건의·추진 단계이며, 정확한 선형·역 위치는 타당성 조사와 기본계획에서 확정됩니다.
        </p>
      </Section>

      <Section className="pt-0">
        <Card className="flex flex-col items-center gap-2 border-dashed py-10 text-center">
          <p className="font-bold text-ink">지도 API 연동 예정</p>
          <p className="max-w-md text-sm text-ink-soft">
            정식 공개 시 카카오맵/브이월드 레이어로 실제 선형·역 위치·역세권 폴리곤을
            지도 위에 표시합니다.
          </p>
        </Card>
      </Section>
    </>
  );
}
