import Link from "next/link";
import {
  Container,
  Section,
  Card,
  StatCard,
  Badge,
  Callout,
  ButtonLink,
  SectionTitle,
  SourceTag,
} from "@/components/ui";
import { TODAY, VISION, PHILOSOPHY, FEATURES, DATA_NOTE } from "@/data/overview";
import { POP_FACTS, POP_SOURCE, COMMUTE_CLAIM } from "@/data/transit";
import { PETITION } from "@/data/civic";
import { BannerSlogans } from "@/components/banner-slogans";

export default function HomePage() {
  const pct = Math.round((PETITION.current / PETITION.goal) * 100);

  return (
    <>
      {/* ---------------- 히어로 ---------------- */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 85% 0%, var(--brand-soft) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, var(--teal-soft) 0%, transparent 55%)",
          }}
        />
        <Container className="relative py-16 sm:py-24">
          <div className="rise max-w-3xl">
            <Badge tone="brand">고양은평선 식사동 연장 · 시민 데이터 플랫폼</Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl">
              {VISION.headline}
              <br />
              <span className="text-brand">{VISION.sub}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {VISION.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/petition">서명 참여하기 →</ButtonLink>
              <ButtonLink href="/analysis" variant="ghost">
                데이터 근거 보기
              </ButtonLink>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-good" /> 정치적 중립
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> 공공데이터 기반
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" /> 원자료 공개
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* ---------------- 요구 · 슬로건 (현수막 스타일) ---------------- */}
      <BannerSlogans />

      {/* ---------------- 오늘의 데이터 ---------------- */}
      <Section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionTitle desc="식사동의 교통 현실을 숫자로. 매일 갱신을 목표로 합니다.">
            오늘의 데이터
          </SectionTitle>
          <span className="hidden shrink-0 text-xs text-ink-muted sm:block">
            {TODAY.asOf} 기준
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {TODAY.stats.map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={s.value}
              unit={s.unit}
              sub={s.sub}
              tone={s.tone}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">※ {DATA_NOTE}</p>
      </Section>

      {/* ---------------- 핵심 철학 ---------------- */}
      <Section className="bg-surface">
        <SectionTitle desc="우리가 지키는 네 가지 원칙">
          무엇을 말하고, 무엇을 말하지 않는가
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHILOSOPHY.map((p) => (
            <Card key={p.title}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <PhilosophyIcon name={p.icon} />
              </div>
              <h3 className="font-bold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------- 데이터 하이라이트 ---------------- */}
      <Section>
        <SectionTitle desc="검증된 지표를 미리 봅니다. 자세한 분석은 각 섹션에서.">
          데이터가 말하는 것
        </SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-bold text-ink">주민은 8만, 도시철도역은 0</h3>
            <p className="mt-1 mb-4 text-sm text-ink-soft">
              식사·풍동 일대 인구 현황
            </p>
            <div className="grid grid-cols-3 gap-3">
              {POP_FACTS.map((p) => (
                <div key={p.label} className="rounded-xl bg-surface-2 p-3">
                  <p className="text-xs font-semibold text-ink-soft">{p.label}</p>
                  <p className="tabular mt-1 text-xl font-extrabold text-brand">
                    {p.value}
                    <span className="text-xs text-ink-muted"> {p.unit}</span>
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-ink-muted">{p.sub}</p>
                </div>
              ))}
            </div>
            <SourceTag source={POP_SOURCE.source} date={POP_SOURCE.asOf} />
            <Link
              href="/analysis"
              className="mt-3 inline-block text-sm font-bold text-brand hover:underline"
            >
              인구·분석 자세히 →
            </Link>
          </Card>
          <Card>
            <h3 className="font-bold text-ink">연장되면 얼마나 빨라지나</h3>
            <p className="mt-1 mb-5 text-sm text-ink-soft">{COMMUTE_CLAIM.label}</p>
            <div className="space-y-4">
              <BeforeAfterBar label="현재" value={COMMUTE_CLAIM.now} max={COMMUTE_CLAIM.now} color="var(--signal)" />
              <BeforeAfterBar label="개통 시" value={COMMUTE_CLAIM.after} max={COMMUTE_CLAIM.now} color="var(--good)" />
            </div>
            <SourceTag source={COMMUTE_CLAIM.source} />
            <Link
              href="/transit"
              className="mt-3 inline-block text-sm font-bold text-brand hover:underline"
            >
              교통 데이터 자세히 →
            </Link>
          </Card>
        </div>
      </Section>

      {/* ---------------- 기능 그리드 ---------------- */}
      <Section className="bg-surface">
        <SectionTitle desc="데이터를 정책으로 잇는 도구들">플랫폼이 하는 일</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-all hover:border-brand hover:shadow-sm"
            >
              <h3 className="font-bold text-ink group-hover:text-brand">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              <span className="mt-3 inline-block text-sm font-bold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                바로가기 →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------------- 서명 CTA ---------------- */}
      <Section>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-brand text-white">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white/70">
                주민 서명
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                데이터에 목소리를 더해주세요
              </h2>
              <p className="mt-3 max-w-lg text-white/85">
                숫자는 필요성을 증명하고, 서명은 그 숫자에 무게를 싣습니다. 이름과
                거주지만으로 1분이면 참여할 수 있습니다.
              </p>
              <div className="mt-6">
                <ButtonLink
                  href="/petition"
                  className="!bg-white !text-brand hover:!bg-white/90"
                >
                  지금 서명하기 →
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <div className="flex items-baseline justify-between">
                <span className="tabular text-3xl font-extrabold">
                  {PETITION.current.toLocaleString()}
                </span>
                <span className="text-white/70">
                  / {PETITION.goal.toLocaleString()}명
                </span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-white/80">
                {PETITION.drive} · 잠정 목표의 <span className="font-bold">{pct}%</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- 중립 성명 ---------------- */}
      <Section className="pt-0">
        <Callout title="정치적 중립 원칙" tone="good">
          이 플랫폼은 특정 정당·후보·이해관계와 무관한 시민 자율 플랫폼입니다. 우리는
          성과를 다투지 않고, 주민의 이동권이라는 사실만을 다룹니다. 모든 지표는
          출처와 기준시점을 밝히며 원자료를{" "}
          <Link href="/resources" className="font-bold underline">
            자료실
          </Link>
          에서 공개합니다.
        </Callout>
      </Section>
    </>
  );
}

function BeforeAfterBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="tabular text-sm font-bold text-ink-soft">약 {value}분대</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function PhilosophyIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "data":
      return (
        <svg {...common}>
          <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
        </svg>
      );
    case "welfare":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "neutral":
      return (
        <svg {...common}>
          <path d="M12 3v18M5 8h14M6 8l-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3l9 4-9 4-9-4 9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
        </svg>
      );
  }
}
