import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, Badge, Callout } from "@/components/ui";
import { RESOURCES } from "@/data/civic";
import { DATA_NOTE } from "@/data/overview";

export const metadata: Metadata = {
  title: "자료실",
  description: "인구·교통 원자료(CSV)와 분석 방법론 보고서(PDF) 다운로드.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="자료실"
        title="숨기지 않습니다, 원자료를 공개합니다"
        lead="플랫폼의 모든 지표는 아래 원자료에서 나옵니다. 누구나 내려받아 검증할 수 있으며, 향후 공개 API로도 제공할 예정입니다."
      />

      <Section>
        <SectionTitle desc="CSV·PDF 형식으로 제공">데이터 다운로드</SectionTitle>
        <div className="grid gap-3">
          {RESOURCES.map((r) => {
            const url = "url" in r ? (r.url as string) : undefined;
            return (
              <Card key={r.title} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                      r.format === "CSV" ? "bg-teal-soft text-teal" : "bg-signal-soft text-signal"
                    }`}
                  >
                    {r.format}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-ink">{r.title}</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {r.ready ? "출처" : "확보 예정 출처"}: {r.source}
                    </p>
                  </div>
                </div>
                {r.ready && url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-strong px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:bg-surface-2"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                    </svg>
                    원문 보기
                  </a>
                ) : (
                  <span className="shrink-0 rounded-lg bg-surface-2 px-3.5 py-2 text-sm font-bold text-ink-muted">
                    준비 중
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout title="공개 API (예정)" tone="teal">
            정식 공개 시 <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">/api/v1</code>{" "}
            엔드포인트로 인구·교통·서명 데이터를 JSON으로 제공합니다. 연구자·개발자
            누구나 자유롭게 활용할 수 있도록 개방합니다.
          </Callout>
          <Callout title="출처와 기준시점" tone="brand">
            모든 파일에는 원 출처와 수집 기준시점을 함께 표기합니다. 가공한 지표는
            산정 방법론 문서를 함께 제공해 재현 가능하도록 합니다.
          </Callout>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          ※ 시의회 결의안은 고양시의회 원문으로 연결됩니다. 나머지 데이터는 확보 후 순차 공개합니다. {DATA_NOTE}
        </p>
      </Section>
    </>
  );
}
