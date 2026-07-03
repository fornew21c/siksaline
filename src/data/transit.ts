/** 교통 데이터 — 검증된 실데이터 + 자료 확보 중 항목 표기 (구 '데이터 분석' 통합) */

/** 인구 현황 (실데이터) — 홈 하이라이트용 3개 지표 */
export const POP_FACTS = [
  { label: "식사동 인구", value: "40,430", unit: "명", sub: "2025.12 주민등록", tone: "brand" as const },
  { label: "식사·풍동 일대", value: "약 8만", unit: "명", sub: "입주 시 10만+ 전망", tone: "brand" as const },
  { label: "고양시 인구", value: "약 106만", unit: "명", sub: "2025 기준", tone: "teal" as const },
];

/** 인구 현황 (실데이터) — 페이지 헤드라인용 4개 지표 (도시철도역 0 포함) */
export const POP_HEADLINE = [
  { label: "식사동 인구", value: "40,430", unit: "명", sub: "2025.12", tone: "brand" as const },
  { label: "식사·풍동 일대", value: "약 8만", unit: "명", sub: "10만+ 전망", tone: "brand" as const },
  { label: "고양시 인구", value: "약 106만", unit: "명", sub: "2025", tone: "teal" as const },
  { label: "도시철도역", value: "0", unit: "개", sub: "식사동 내", tone: "signal" as const },
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

/**
 * 출퇴근 시뮬레이터 프리셋 (편도, 분)
 * ⚠️ 아래 값은 실측이 아닌 "추정 예시"입니다. KTDB 경로탐색 데이터 확보 시 실측으로 교체됩니다.
 * 서울 도심 기준 개선 폭(50분대→20분대)은 고양은평선 개통 보도에 근거합니다.
 */
export const SIMULATOR = [
  { dest: "서울 도심(보도 기준)", now: 50, after: 25 },
  { dest: "여의도(추정)", now: 55, after: 32 },
  { dest: "강남(추정)", now: 65, after: 42 },
];
export const SIMULATOR_NOTE =
  "서울 도심 개선 폭은 고양은평선 개통 보도(50분대→20분대)에 근거하며, 그 외 목적지는 추정 예시입니다. 실측 데이터 확보 시 교체됩니다.";

/**
 * 아직 실데이터를 확보하지 못한 지표 (임의값 표시 금지)
 * 교통 실측 지표 + 분석 지표를 하나로 통합
 */
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
  economic: {
    title: "경제효과 추정 — 자료 확보 중",
    source: "한국교통연구원 방법론 · KTDB",
    desc: "통행시간 절감의 화폐가치, 차량운행비·환경 편익을 공인된 방법론으로 산정해 공개합니다.",
  },
  poverty: {
    title: "교통 소외지수 — 자료 확보 중",
    source: "KTDB · 경기버스정보 · 자체 산정",
    desc: "철도접근성·배차·통행시간·수단다양성을 합산한 지역 간 이동권 격차 지수를 산정 중입니다.",
  },
  commuteRatio: {
    title: "서울 통근 비율 — 자료 확보 중",
    source: "통계청 인구총조사 통근·통학 데이터",
    desc: "거주지 기준 서울 통근자 비율을 지역별로 비교합니다.",
  },
};
