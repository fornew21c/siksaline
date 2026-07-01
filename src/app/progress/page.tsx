import type { Metadata } from "next";
import { Section, Card, PageHeader, SectionTitle, Badge } from "@/components/ui";
import { StageBadge } from "@/components/stage-badge";
import { STAGES, TIMELINE, PROMISES } from "@/data/civic";

export const metadata: Metadata = {
  title: "진행현황",
  description: "고양은평선 식사동 연장 추진 단계와 정책 타임라인, 공약 이행 추적.",
};

export default function ProgressPage() {
  const doneCount = STAGES.filter((s) => s.stage === "완료").length;

  return (
    <>
      <PageHeader
        eyebrow="진행현황"
        title="지금 어디까지 왔나"
        lead="필요성 제기부터 계획 반영까지, 추진 단계를 투명하게 추적합니다. 성과가 아니라 사실을 기록합니다."
      />

      {/* 추진 단계 */}
      <Section>
        <SectionTitle desc={`전체 ${STAGES.length}단계 중 ${doneCount}단계 완료`}>
          추진 단계
        </SectionTitle>
        <div className="grid gap-3">
          {STAGES.map((s, i) => (
            <Card key={s.name} className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-extrabold text-ink-soft">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-ink">{s.name}</h3>
                  <StageBadge stage={s.stage} />
                </div>
                <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 정책 타임라인 */}
      <Section className="bg-surface" id="timeline">
        <SectionTitle desc="최근 활동과 발표를 시간순으로">정책 타임라인</SectionTitle>
        <ol className="relative ml-3 border-l-2 border-border">
          {TIMELINE.map((t) => (
            <li key={t.date + t.title} className="mb-8 ml-6 last:mb-0">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-surface bg-brand" />
              <div className="flex flex-wrap items-center gap-2">
                <time className="tabular text-sm font-bold text-brand">{t.date}</time>
                <Badge tone="neutral">{t.tag}</Badge>
              </div>
              <h3 className="mt-1 font-bold text-ink">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 공약 추적기 */}
      <Section id="promises">
        <SectionTitle desc="교통 관련 약속과 이행 상태를 중립적으로 기록합니다.">
          공약 추적기
        </SectionTitle>
        <Card className="p-0">
          <div className="scroll-x">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-ink-muted">
                  <th className="px-5 py-3 font-semibold">주체</th>
                  <th className="px-5 py-3 font-semibold">내용</th>
                  <th className="px-5 py-3 font-semibold">상태</th>
                  <th className="px-5 py-3 font-semibold">비고</th>
                </tr>
              </thead>
              <tbody>
                {PROMISES.map((p) => (
                  <tr key={p.what} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-semibold text-ink">{p.who}</td>
                    <td className="px-5 py-4 text-ink-soft">{p.what}</td>
                    <td className="px-5 py-4">
                      <StageBadge stage={p.status} />
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <p className="mt-4 text-xs text-ink-muted">
          ※ 특정 정당·후보를 지지·반대하지 않으며, 공개된 계획·발언만을 사실로 기록합니다.
        </p>
      </Section>
    </>
  );
}
