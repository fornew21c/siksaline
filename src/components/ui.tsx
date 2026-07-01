import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------- 레이아웃 ---------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/* ---------------- 페이지 헤더 ---------------- */

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {lead}
          </p>
        )}
      </Container>
    </div>
  );
}

export function SectionTitle({
  children,
  desc,
}: {
  children: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
        {children}
      </h2>
      {desc && <p className="mt-2 max-w-2xl text-sm text-ink-soft">{desc}</p>}
    </div>
  );
}

/* ---------------- 카드 / 배지 ---------------- */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

type Tone = "brand" | "teal" | "signal" | "good" | "neutral";

const toneMap: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand",
  teal: "bg-teal-soft text-teal",
  signal: "bg-signal-soft text-signal",
  good: "bg-good-soft text-good",
  neutral: "bg-surface-2 text-ink-soft",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------------- 통계 카드 ---------------- */

export function StatCard({
  label,
  value,
  unit,
  sub,
  tone = "brand",
  trend,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  tone?: Tone;
  trend?: { dir: "up" | "down"; text: string; good?: boolean };
}) {
  const accent =
    tone === "teal"
      ? "text-teal"
      : tone === "signal"
      ? "text-signal"
      : tone === "good"
      ? "text-good"
      : "text-brand";
  return (
    <Card className="flex flex-col justify-between">
      <p className="text-sm font-semibold text-ink-soft">{label}</p>
      <p className="mt-3 flex items-baseline gap-1">
        <span className={`tabular text-3xl font-extrabold sm:text-4xl ${accent}`}>
          {value}
        </span>
        {unit && <span className="text-sm font-bold text-ink-muted">{unit}</span>}
      </p>
      {(sub || trend) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold ${
                trend.good ? "text-good" : "text-signal"
              }`}
            >
              {trend.dir === "up" ? "▲" : "▼"} {trend.text}
            </span>
          )}
          {sub && <span className="text-ink-muted">{sub}</span>}
        </div>
      )}
    </Card>
  );
}

/* ---------------- 출처 태그 ---------------- */

export function SourceTag({
  source,
  date,
}: {
  source: string;
  date?: string;
}) {
  return (
    <p className="mt-4 text-xs text-ink-muted">
      출처: {source}
      {date && ` · ${date} 기준`}
    </p>
  );
}

/* ---------------- 콜아웃 ---------------- */

export function Callout({
  title,
  children,
  tone = "brand",
}: {
  title?: string;
  children: ReactNode;
  tone?: Tone;
}) {
  const border =
    tone === "teal"
      ? "border-l-teal"
      : tone === "signal"
      ? "border-l-signal"
      : tone === "good"
      ? "border-l-good"
      : "border-l-brand";
  return (
    <div
      className={`rounded-r-xl border border-l-4 border-border ${border} bg-surface p-5`}
    >
      {title && <p className="font-bold text-ink">{title}</p>}
      <div className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

/* ---------------- 자료 확보 중 (정직한 플레이스홀더) ---------------- */

export function PendingData({
  title,
  source,
  children,
}: {
  title: string;
  source?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-border-strong bg-surface-2/50 p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-bold text-ink">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {children ?? "정확한 수치를 확보하는 대로 공개합니다. 확인되지 않은 값을 임의로 표시하지 않습니다."}
          </p>
          {source && (
            <p className="mt-2 text-xs text-ink-muted">확보 예정 출처: {source}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 링크 버튼 ---------------- */

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-strong shadow-sm"
      : "border border-border-strong text-ink hover:bg-surface-2";
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
