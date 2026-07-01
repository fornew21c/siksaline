/** 교통 데이터 — 검증된 실데이터 + 자료 확보 중 항목 표기 */

/** 인구 현황 (실데이터) */
export const POP_FACTS = [
  { label: "식사동 인구", value: "40,430", unit: "명", sub: "2025.12 주민등록", tone: "brand" as const },
  { label: "식사·풍동 일대", value: "약 8만", unit: "명", sub: "입주 시 10만+ 전망", tone: "brand" as const },
  { label: "고양시 인구", value: "약 106만", unit: "명", sub: "2025 기준", tone: "teal" as const },
];
export const POP_SOURCE = {
  source: "행정안전부 주민등록 · 고양시/일산동구 통계 · 추진모임",
  asOf: "2025-12",
};

/**
 * 서울 접근성 개선 — 언론 보도 기반(고양은평선 개통 효과)
 * "출퇴근 50분대 → 20분대" 보도(한국경제 등). 본선 기준이며 식사 연장 시 추가 검토 대상.
 */
export const COMMUTE_CLAIM = {
  now: 50,
  after: 25,
  label: "서울 도심 접근 (고양은평선 개통 시)",
  source: "언론 보도(고양은평선 개통 효과, 한국경제 등)",
  note: "본선 기준 · 식사·풍동 연장 시 별도 검토",
};

/** 철도 접근성 — 핵심 사실 */
export const RAIL_FACT =
  "식사동에는 도시철도역이 없어, 최단 도시철도역까지 버스 환승이 필요합니다. 고양은평선 차량기지가 식사 인근(약 2km)에 위치해 연장 효율성이 큽니다.";

/** 아직 실데이터를 확보하지 못한 지표 (임의값 표시 금지) */
export const PENDING = {
  congestion: {
    title: "버스 혼잡도 — 자료 확보 중",
    source: "국가대중교통DB(TAGO) · 경기버스정보",
    desc: "주요 광역·간선 노선의 출근 첨두 재차인원/정원 데이터를 확보하는 대로 시간대별로 시각화합니다.",
  },
  headway: {
    title: "배차 간격 — 자료 확보 중",
    source: "경기버스정보 · 각 운수사 운행계획",
    desc: "첨두/비첨두 배차 간격을 노선별로 정리해 공개합니다.",
  },
  commuteDetail: {
    title: "목적지별 통행시간 실측 — 자료 확보 중",
    source: "KTDB 국가교통DB 경로탐색",
    desc: "서울 주요 거점별 편도 통행시간을 실측 기반으로 비교합니다.",
  },
};
