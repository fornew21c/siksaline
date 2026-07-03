/**
 * 개요 데이터
 *
 * 아래 수치는 공개된 공공데이터·언론 보도에 근거하며 각 지표에 출처를 표기합니다.
 * 일부 분석 지표(버스 혼잡도·경제효과 등 정밀 수치)는 공공데이터 연동 전
 * "자료 확보 중" 상태로 두고, 검증된 값만 표시합니다.
 */

export const DATA_NOTE =
  "모든 지표는 공개 공공데이터·언론 보도에 근거하며 출처를 함께 표기합니다. 일부 정밀 분석 지표는 자료 확보 중입니다.";

/** 캠페인 주체 (현수막·보도 기준 실제 정보) */
export const CAMPAIGN = {
  org: "고양은평선연장 추진모임",
  who: "식사·풍동 8만 주민 일동",
  cityPop: "106만",
  demand: "국토부 대도시권광역교통위원회는 고양은평선 식사·풍동 연장을 조속히 확정하라",
};

/** 현수막 슬로건 (오프라인과 동기화) — 평문 */
export const SLOGANS = [
  "교통복지 실현! 국토부 대광위는 고양은평선 연장을 승인하라",
  "출퇴근 교통 끝! 식사·풍동 연장을 즉각 추진하라",
  "106만 고양시민의 염원, 고양은평선 연장안을 조속히 확정하라",
  "더 이상 미루지 말라! 식사·풍동 연장을 결단하라",
];

/**
 * 현수막 스타일 렌더링용 구조화 슬로건
 * lead = 노란 강조 / body = 본문 / em = 빨강 강조 / tail = 마무리
 */
export const BANNERS = [
  { lead: "교통복지 실현!", body: "국토부 대광위는 고양은평선 연장을", em: "승인", tail: "하라!" },
  { lead: "출퇴근 교통 끝!", body: "국토부 대광위는 식사·풍동 연장을", em: "즉각 추진", tail: "하라!" },
  { lead: "106만 고양시민의 염원!", body: "고양은평선 연장안을", em: "조속히 확정", tail: "하라!" },
  { lead: "더 이상 미루지 말라!", body: "국토부 대광위는 식사·풍동 연장을", em: "결단", tail: "하라!" },
];

export const VISION = {
  headline: "감정이 아닌, 데이터로.",
  sub: "고양은평선 식사·풍동 연장",
  lead: "식사·풍동 8만 주민의 교통 접근성을 개선하고, 고양시 북동부의 균형 발전을 위해 공공데이터를 근거로 고양은평선 연장을 촉구하는 시민 플랫폼입니다.",
};

export const PHILOSOPHY = [
  {
    title: "감정이 아닌 데이터",
    body: "구호와 감정 대신 공개된 통계와 교통 데이터로 필요성을 증명합니다.",
    icon: "data",
  },
  {
    title: "집값이 아닌 교통복지",
    body: "부동산 가치가 아니라 이동권과 균형발전의 관점에서 접근합니다.",
    icon: "welfare",
  },
  {
    title: "정치적 중립",
    body: "특정 정당·후보와 무관하며, 누구의 성과도 아닌 주민의 필요를 말합니다.",
    icon: "neutral",
  },
  {
    title: "객관적 공공데이터",
    body: "모든 지표에 출처와 기준시점을 표기하고 원자료를 공개합니다.",
    icon: "open",
  },
] as const;

/** 홈 "오늘의 데이터" 대시보드 — 검증된 실데이터 */
export const TODAY = {
  asOf: "2026-06",
  stats: [
    {
      key: "residents",
      label: "식사·풍동 일대 주민",
      value: "약 8만",
      unit: "명",
      tone: "brand" as const,
      sub: "입주 시 10만+ 전망",
      source: "추진모임·언론 보도",
    },
    {
      key: "population",
      label: "식사동 인구",
      value: "40,430",
      unit: "명",
      tone: "brand" as const,
      sub: "2025.12 주민등록",
      source: "행안부·일산동구",
    },
    {
      key: "stations",
      label: "식사동 도시철도역",
      value: "0",
      unit: "개",
      tone: "signal" as const,
      sub: "동 내 도시철도역 부재",
      source: "사실",
    },
    {
      key: "opening",
      label: "본선 개통 목표",
      value: "2031",
      unit: "년",
      tone: "teal" as const,
      sub: "새절~고양시청 15km",
      source: "국토부 대광위",
    },
    {
      key: "signatures",
      label: "2025 서명운동",
      value: "약 22,000",
      unit: "명",
      tone: "good" as const,
      sub: "7.25~11.14 누적",
      source: "추진모임·언론 보도",
    },
  ],
};

/** 차별화 아이디어 (핵심 기능 카드) */
export const FEATURES = [
  {
    title: "교통 소외지수",
    body: "철도 접근성·배차·통행시간을 합산해 지역별 이동권 격차를 하나의 지수로. (자료 확보 중)",
    href: "/transit#transit-poverty",
  },
  {
    title: "실시간 정책 타임라인",
    body: "서명운동·시의회 결의·용역 신청까지 추진 단계를 시간순으로 추적합니다.",
    href: "/progress",
  },
  {
    title: "출퇴근 시뮬레이터",
    body: "현재 경로와 연장 후 예상 경로의 통행시간을 비교합니다.",
    href: "/transit#simulator",
  },
  {
    title: "버스 혼잡도 시각화",
    body: "주요 노선의 시간대별 혼잡도와 배차 간격을 한눈에. (자료 확보 중)",
    href: "/transit",
  },
  {
    title: "데이터 다운로드",
    body: "모든 원자료를 CSV로 제공하고, 향후 공개 API를 지원합니다.",
    href: "/resources",
  },
  {
    title: "공약 추적기",
    body: "선거·정책에서 나온 교통 관련 약속의 이행 여부를 기록합니다.",
    href: "/progress#promises",
  },
] as const;
