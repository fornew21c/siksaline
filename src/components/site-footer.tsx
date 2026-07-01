import Link from "next/link";
import { NAV } from "@/lib/nav";
import { BrandLockup } from "./brand";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLockup />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              고양은평선의 식사동 연장 필요성을 공공데이터로 분석하고, 고양 북동부의
              교통복지와 균형발전을 제안하는 시민 플랫폼입니다.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-good" />
              정치적 중립 · 특정 정당·후보와 무관
            </p>
          </div>

          <nav aria-label="사이트맵">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              바로가기
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              데이터 출처
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>통계청 · 행정안전부 주민등록</li>
              <li>국가교통DB(KTDB)</li>
              <li>경기데이터드림 · 고양시 통계</li>
              <li>국토교통부 · 대도시권광역교통위원회</li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              모든 지표는 원본 출처와 수집 시점을 함께 표기하며,{" "}
              <Link href="/resources" className="underline hover:text-brand">
                자료실
              </Link>
              에서 원자료를 확인·다운로드할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 고양은평선 식사연장 데이터 플랫폼. 시민 자율 운영 · 비영리.</p>
          <p>고양은평선연장 추진모임 · 식사·풍동 8만 주민 일동</p>
        </div>
      </div>
    </footer>
  );
}
