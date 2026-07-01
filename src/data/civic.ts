/** 진행현황 · 서명 · 뉴스 · 자료실 — 실제 사건·보도 기반 */

export type Stage = "완료" | "진행" | "예정";

/** 추진 단계 (실제) */
export const STAGES: { name: string; stage: Stage; desc: string }[] = [
  { name: "본선 기본계획 승인", stage: "완료", desc: "새절~고양시청 15km, 대광위 승인 · 2031 개통 목표" },
  { name: "주민 서명운동", stage: "완료", desc: "2025 서명운동 누적 약 22,000명(7.25~11.14)" },
  { name: "고양시의회 지지 결의", stage: "완료", desc: "2025.09.03 건설교통위, 일산연장 지지 결의안 만장일치 통과" },
  { name: "제5차 광역교통계획 반영 건의", stage: "진행", desc: "고양시, 국토부·대광위에 반영 총력" },
  { name: "사전타당성 검토 용역", stage: "진행", desc: "2026년 추경에 검토 용역 신청" },
  { name: "예비타당성/기본계획 반영", stage: "예정", desc: "식사·풍동 연장 확정 단계" },
];

/** 정책 타임라인 (실제 보도 기반) */
export const TIMELINE = [
  { date: "2026-01", tag: "행정", title: "트램보다 '고양은평선 일산연장' 우선 검토", body: "고양시, 광역철도(고양은평선 연장)를 우선 검토 방침으로 정리. (경기일보 보도)" },
  { date: "2025-11", tag: "주민", title: "2025 서명운동 마감 · 시장에 서명부 전달", body: "7.25~11.14 서명운동 누적 약 22,000명. 이동환 고양특례시장에게 주민 서명부 전달." },
  { date: "2025-09", tag: "의회", title: "고양시의회, 일산연장 지지 결의안 통과", body: "9월 3일 건설교통위원회에서 고양은평선 일산연장 지지 결의안을 만장일치로 의결." },
  { date: "2025-09", tag: "도정", title: "경기도의회 '식사동 연장 필요' 제기", body: "오준환 도의원 등 '고양은평선 식사동 연장이 미래 성장축' 필요성 제기." },
  { date: "2025-07", tag: "주민", title: "추진모임, 식사·풍동 연장 서명운동 시작", body: "지하철 고양은평선 식사연장 추진모임이 온·오프라인 서명운동 개시." },
  { date: "2024-12", tag: "본선", title: "고양은평선 기본계획 승인", body: "국토부 대광위, 새절~고양시청 본선 기본계획 승인. 2031년 개통 목표." },
];

/** 공약·행정 추적기 (실제, 중립 기록) */
export const PROMISES = [
  { who: "이동환 고양특례시장", what: "제5차 광역교통계획에 고양은평선 연장 반영", status: "진행" as Stage, note: "반영 총력 방침" },
  { who: "고양시의회 건설교통위", what: "고양은평선 일산연장 지지", status: "완료" as Stage, note: "결의안 만장일치 통과" },
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
  { date: "2025-11", source: "오늘경제", title: "이동환 고양특례시장, 고양은평선 일산 연장 주민 서명부 전달받아", url: "https://www.startuptoday.co.kr/news/articleView.html?idxno=545766" },
  { date: "2025-09-24", source: "오마이뉴스", title: "\"트램 노선 대신 고양은평선 '식사역' 연장해야\"", url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003164726" },
  { date: "2025-09-08", source: "서울신문", title: "오준환 경기도의원 \"고양은평선 식사동 연장 필요…미래 성장축 될 것\"", url: "https://m.go.seoul.co.kr/news/spotlight/2025/09/08/20250908500218" },
  { date: "2024-12-03", source: "한국경제", title: "고양은평선 2031년 개통…출퇴근 50분→20분대로", url: "https://www.hankyung.com/article/2024120313571" },
  { date: "2025", source: "딜라이브뉴스", title: "'고양은평선 식사동 연장' 서명운동 시작", url: "https://news.dlive.kr/news/articleView.html?idxno=18832" },
];

/** 자료실 */
export const RESOURCES = [
  { title: "식사동·고양시 인구 현황(2025)", format: "CSV", size: "—", source: "행안부 주민등록", ready: false },
  { title: "고양은평선 본선·연장 개념 정리", format: "PDF", size: "—", source: "보도 종합", ready: false },
  { title: "버스 혼잡도·배차 (확보 예정)", format: "CSV", size: "—", source: "국가대중교통DB(TAGO)", ready: false },
  { title: "서울 거점 통행시간 (확보 예정)", format: "CSV", size: "—", source: "KTDB", ready: false },
  { title: "교통 소외지수 산정 방법론 (작성 예정)", format: "PDF", size: "—", source: "자체 산정", ready: false },
];
