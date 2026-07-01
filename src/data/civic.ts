/** 진행현황 · 서명 · 뉴스 · 자료실 — 실제 사건·보도 기반 */

export type Stage = "완료" | "진행" | "예정";

/** 추진 단계 (실제) */
export const STAGES: { name: string; stage: Stage; desc: string }[] = [
  { name: "본선 기본계획 승인", stage: "완료", desc: "새절~고양시청 15km, 대광위 승인 · 2031 개통 목표" },
  { name: "주민 서명운동", stage: "완료", desc: "2025 서명운동 누적 약 22,000명(7.25~11.14)" },
  { name: "고양시의회 지지 결의", stage: "완료", desc: "2025.09.15 본회의, 일산(식사) 연장 촉구 결의안 만장일치 의결" },
  { name: "제5차 광역교통계획 반영 건의", stage: "진행", desc: "고양시, 국토부·대광위에 반영 총력" },
  { name: "사전타당성 검토 용역", stage: "진행", desc: "2026년 추경에 검토 용역 신청" },
  { name: "예비타당성/기본계획 반영", stage: "예정", desc: "식사·풍동 연장 확정 단계" },
];

/** 정책 타임라인 (실제 보도 기반) */
export const TIMELINE = [
  { date: "2026-01", tag: "행정", title: "트램보다 '고양은평선 일산연장' 우선 검토", body: "고양시, 광역철도(고양은평선 연장)를 우선 검토 방침으로 정리. (경기일보 보도)" },
  { date: "2025-11", tag: "주민", title: "2025 서명운동 마감 · 시장에 서명부 전달", body: "7.25~11.14 서명운동 누적 약 22,000명. 이동환 고양특례시장에게 주민 서명부 전달." },
  { date: "2025-09", tag: "의회", title: "고양시의회, 일산(식사) 연장 촉구 결의안 만장일치", body: "9월 15일 제297회 정례회 본회의에서 결의안 의결. 식사역까지 2.04km·사업비 2,361억원 연장을 정부에 촉구." },
  { date: "2025-09", tag: "도정", title: "경기도의회 '식사동 연장 필요' 제기", body: "오준환 도의원 등 '고양은평선 식사동 연장이 미래 성장축' 필요성 제기." },
  { date: "2025-07", tag: "주민", title: "추진모임, 식사·풍동 연장 서명운동 시작", body: "지하철 고양은평선 식사연장 추진모임이 온·오프라인 서명운동 개시." },
  { date: "2024-12", tag: "본선", title: "고양은평선 기본계획 승인", body: "국토부 대광위, 새절~고양시청 본선 기본계획 승인. 2031년 개통 목표." },
];

/** 공약·행정 추적기 (실제, 중립 기록) */
export const PROMISES = [
  { who: "이동환 고양특례시장", what: "제5차 광역교통계획에 고양은평선 연장 반영", status: "진행" as Stage, note: "반영 총력 방침" },
  { who: "고양시의회", what: "고양은평선 일산(식사) 연장 촉구 결의", status: "완료" as Stage, note: "2025.09.15 본회의 만장일치" },
  { who: "경기도의회(오준환 도의원 등)", what: "식사동 연장 필요성 제기", status: "진행" as Stage, note: "도정 차원 논의" },
  { who: "고양시(행정)", what: "사전타당성 검토 용역 추진", status: "진행" as Stage, note: "2026 추경 신청" },
];

/** 서명 현황 (실제) */
export const PETITION = {
  current: 22000,
  goal: 30000, // 잠정 목표
  drive: "2025 서명운동(7.25~11.14) 누적",
  note: "2025 서명운동 누적 인원(약 22,000명)입니다. 온라인 참여는 계속 받고 있으며, 지역별 집계는 확보하는 대로 공개합니다.",
};

/** 뉴스 (실제 보도) */
export const NEWS = [
  { date: "2026-01-28", source: "경기일보", title: "고양시 트램보다 '고양은평선 일산연장'…광역철도 우선 검토", url: "https://www.kyeonggi.com/article/20260128580279" },
  { date: "2025-11-21", source: "딜라이브뉴스", title: "'고양은평선 일산 연장' 서명 확대…주민 2만2000여명 동참", url: "https://news.dlive.kr/news/articleView.html?idxno=19484" },
  { date: "2025-09-15", source: "고양신문", title: "'고양은평선 일산(식사) 연장 촉구 결의안' 만장일치 통과", url: "https://www.mygoyang.com/news/articleView.html?idxno=85684" },
  { date: "2025-09-24", source: "오마이뉴스", title: "\"트램 노선 대신 고양은평선 '식사역' 연장해야\"", url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003164726" },
  { date: "2024-12-03", source: "한국경제", title: "고양은평선 2031년 개통…출퇴근 50분→20분대로", url: "https://www.hankyung.com/article/2024120313571" },
  { date: "2025-07", source: "딜라이브뉴스", title: "'고양은평선 식사동 연장' 서명운동 시작", url: "https://news.dlive.kr/news/articleView.html?idxno=18832" },
];

/**
 * 자료실
 * kind: "file" = 우리가 제공하는 다운로드, "link" = 외부 원본 출처, "pending" = 확보 중
 */
export const RESOURCES = [
  {
    title: "식사·고양 핵심 지표 데이터셋 (2025)",
    format: "CSV",
    size: "다운로드",
    source: "자체 정리 (지표별 출처 포함)",
    ready: true,
    kind: "file" as const,
    url: "/data/siksaline-key-stats-2025.csv",
  },
  {
    title: "고양은평선 일산(식사) 연장 촉구 결의안 (원문)",
    format: "PDF",
    size: "외부 링크",
    source: "고양시의회",
    ready: true,
    kind: "link" as const,
    url: "https://www.goyangcouncil.go.kr/viewer/pdf.do?group=appendix&uid=29112",
  },
  {
    title: "행정구역별 주민등록 인구 통계표",
    format: "링크",
    size: "KOSIS 통계표",
    source: "통계청 KOSIS",
    ready: true,
    kind: "link" as const,
    url: "https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B040A3",
  },
  {
    title: "경기 버스·대중교통 데이터셋 검색",
    format: "링크",
    size: "공공데이터포털",
    source: "국가대중교통DB(TAGO)",
    ready: true,
    kind: "link" as const,
    url: "https://www.data.go.kr/tcs/dss/selectDataSetList.do?keyword=경기버스",
  },
  {
    title: "경기 교통·지역 데이터 포털",
    format: "링크",
    size: "경기데이터드림",
    source: "경기도",
    ready: true,
    kind: "link" as const,
    url: "https://data.gg.go.kr",
  },
  {
    title: "교통 소외지수 산정 방법론 (작성 예정)",
    format: "PDF",
    size: "—",
    source: "자체 산정",
    ready: false,
    kind: "pending" as const,
  },
];
