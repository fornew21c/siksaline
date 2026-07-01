import type { Metadata } from "next";
import { Section, Card, PageHeader, Badge } from "@/components/ui";
import { NEWS } from "@/data/civic";

export const metadata: Metadata = {
  title: "뉴스",
  description: "고양은평선 식사동 연장과 고양 북동부 교통 관련 보도 모음.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="뉴스"
        title="관련 보도 모음"
        lead="고양은평선 연장과 고양 북동부 교통을 다룬 언론 보도와 공식 발표를 모읍니다. 특정 매체를 지지하지 않으며 사실 전달을 목적으로 합니다."
      />

      <Section>
        <ul className="space-y-3">
          {NEWS.map((n) => (
            <li key={n.title}>
              <a
                href={n.url}
                className="group block"
                {...(n.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Card className="flex items-center justify-between gap-4 transition-all hover:border-brand hover:shadow-sm">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <time className="tabular text-xs font-bold text-ink-muted">{n.date}</time>
                      <Badge tone="neutral">{n.source}</Badge>
                    </div>
                    <h2 className="mt-1.5 font-bold text-ink group-hover:text-brand">{n.title}</h2>
                  </div>
                  <span className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                    →
                  </span>
                </Card>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-muted">
          ※ 링크는 데모용 자리표시자입니다. 정식 공개 시 원문 기사로 연결됩니다.
        </p>
      </Section>
    </>
  );
}
