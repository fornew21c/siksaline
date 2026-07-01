/** 데이터 분석 — 검증된 실데이터 + 자료 확보 중 항목 표기 */

/** 인구 핵심 (실데이터) */
export const POP_HEADLINE = [
  { label: "식사동 인구", value: "40,430", unit: "명", sub: "2025.12", tone: "brand" as const },
  { label: "식사·풍동 일대", value: "약 8만", unit: "명", sub: "10만+ 전망", tone: "brand" as const },
  { label: "고양시 인구", value: "약 106만", unit: "명", sub: "2025", tone: "teal" as const },
  { label: "도시철도역", value: "0", unit: "개", sub: "식사동 내", tone: "signal" as const },
];

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

/** 아직 실데이터를 확보하지 못한 분석 지표 */
export const PENDING_ANALYSIS = {
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
