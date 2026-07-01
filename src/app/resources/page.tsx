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
        <SectionTitle desc="검증된 지표는 바로 받고, 원본은 공개 출처로 연결됩니다">
          데이터 · 원본 출처
        </SectionTitle>
        <div className="grid gap-3">
          {RESOURCES.map((r) => {
            const url = "url" in r ? (r.url as string) : undefined;
            const isFile = r.kind === "file";
            return (
              <Card key={r.title} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[0.7rem] font-extrabold ${
                      r.format === "CSV"
                        ? "bg-teal-soft text-teal"
                        : r.format === "링크"
                        ? "bg-brand-soft text-brand"
                        : "bg-signal-soft text-signal"
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
                    {...(isFile ? { download: "" } : { target: "_blank", rel: "noreferrer" })}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-strong px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:bg-surface-2"
                  >
                    {isFile ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                        </svg>
                        받기
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                        </svg>
                        바로가기
                      </>
                    )}
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
          ※ 핵심 지표 CSV는 지표별 출처를 포함합니다. 원본 데이터는 각 공개 출처로 연결되며, 산정 방법론 문서는 작성 후 공개합니다. {DATA_NOTE}
        </p>
      </Section>
    </>
  );
}
