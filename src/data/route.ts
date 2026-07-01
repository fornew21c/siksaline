/**
 * 노선도 데이터
 *
 * 본선(새절~고양시청)은 국토부 대광위 기본계획 승인 사실에 기반합니다.
 * 다만 창릉신도시 구간 등 일부 역명은 가칭·미확정이며, 식사 연장은
 * 아직 확정된 노선이 아니라 고양시가 건의·추진 중인 단계입니다.
 * 정확한 선형·역 위치는 타당성 조사 및 기본계획에서 확정됩니다.
 */

export type StationKind = "confirmed" | "extension";

export type Station = {
  id: string;
  name: string;
  kind: StationKind;
  transfer?: string[];
  note?: string;
};

export const LINE = {
  name: "고양은평선",
  color: "var(--brand)",
  extensionColor: "var(--teal)",
  /**
   * 본선: 서울 6호선 새절 ~ 고양시청 (약 15km, K-AGT 경전철)
   * 창릉신도시 내 다수 역이 예정돼 있어 대표 역만 표기했습니다.
   * 연장: 고양시청 → 식사(가칭) — 추진/건의 단계
   */
  stations: [
    { id: "s-saejeol", name: "새절", kind: "confirmed", transfer: ["6호선"], note: "서울 기점" },
    { id: "s-hyangdong", name: "향동", kind: "confirmed", note: "향동지구 · 가칭" },
    { id: "s-changneung", name: "창릉", kind: "confirmed", transfer: ["GTX-A"], note: "창릉신도시(내 다수 역 예정)" },
    { id: "s-doraeul", name: "도래울", kind: "confirmed", note: "원흥지구 · 가칭" },
    { id: "s-haengsin", name: "행신중앙로", kind: "confirmed", note: "능곡지구 · 가칭" },
    { id: "s-hwajeong", name: "화정", kind: "confirmed", transfer: ["3호선"], note: "환승" },
    { id: "s-cityhall", name: "고양시청", kind: "confirmed", note: "본선 종점" },
    { id: "e-siksa", name: "식사", kind: "extension", note: "가칭 · 연장 추진" },
  ] as Station[],
  source: "국토부 대광위 기본계획 · 고양시 연장 건의안(보도 종합)",
  asOf: "2026-06",
};

/** 노선 핵심 팩트 (출처 있는 실제 정보) */
export const LINE_FACTS = [
  { label: "본선 연장", value: "약 15", unit: "km", tone: "brand" as const, sub: "새절~고양시청" },
  { label: "개통 목표", value: "2031", unit: "년", tone: "teal" as const, sub: "K-AGT 경전철" },
  { label: "식사 연장 구간", value: "2.04", unit: "km", tone: "good" as const, sub: "고양시청→식사(가칭)" },
  { label: "연장 사업비", value: "2,361", unit: "억원", tone: "brand" as const, sub: "시의회 결의안 기준" },
];

/** 연장 근거 — 검증된 실데이터 */
export const CATCHMENT = [
  { label: "식사·풍동 일대 주민", value: "약 8만", note: "명", tone: "brand" as const },
  { label: "2025 서명운동", value: "약 22,000", note: "명", tone: "good" as const },
];

export const KIND_META: Record<StationKind, { label: string; color: string }> = {
  confirmed: { label: "본선 (기본계획 승인)", color: "var(--brand)" },
  extension: { label: "식사 연장 (추진 중)", color: "var(--teal)" },
};
