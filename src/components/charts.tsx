import type { ReactNode } from "react";

/* 순수 SVG 차트 — 외부 라이브러리 없음, 서버 렌더 가능 */

const PALETTE = ["var(--brand)", "var(--teal)", "var(--signal)", "var(--good)"];

/* ---------------- 라인 차트 (다중 시리즈) ---------------- */

export type Series = { name: string; values: number[]; color?: string };

export function LineChart({
  labels,
  series,
  height = 240,
  unit = "",
  yMin,
  yMax,
}: {
  labels: string[];
  series: Series[];
  height?: number;
  unit?: string;
  yMin?: number;
  yMax?: number;
}) {
  const W = 720;
  const H = height;
  const pad = { t: 16, r: 16, b: 28, l: 44 };
  const all = series.flatMap((s) => s.values);
  const min = yMin ?? Math.min(...all);
  const max = yMax ?? Math.max(...all);
  const span = max - min || 1;
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const x = (i: number) =>
    pad.l + (labels.length === 1 ? iw / 2 : (i / (labels.length - 1)) * iw);
  const y = (v: number) => pad.t + ih - ((v - min) / span) * ih;

  const ticks = 4;
  const gridVals = Array.from({ length: ticks + 1 }, (_, i) => min + (span * i) / ticks);

  return (
    <div className="scroll-x">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[520px]"
        role="img"
        aria-label="추이 라인 차트"
      >
        {/* 그리드 + y축 라벨 */}
        {gridVals.map((v, i) => (
          <g key={i}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={pad.l - 8}
              y={y(v) + 4}
              textAnchor="end"
              className="tabular"
              fontSize="11"
              fill="var(--ink-muted)"
            >
              {Math.round(v).toLocaleString()}
            </text>
          </g>
        ))}

        {/* x축 라벨 */}
        {labels.map((l, i) => (
          <text
            key={l + i}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--ink-muted)"
          >
            {l}
          </text>
        ))}

        {/* 시리즈 */}
        {series.map((s, si) => {
          const color = s.color ?? PALETTE[si % PALETTE.length];
          const d = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              {s.values.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={color} />
              ))}
            </g>
          );
        })}
      </svg>

      {series.length > 1 && <Legend items={series.map((s, i) => ({ name: s.name, color: s.color ?? PALETTE[i % PALETTE.length] }))} />}
      {unit && <p className="mt-1 text-right text-xs text-ink-muted">단위: {unit}</p>}
    </div>
  );
}

/* ---------------- 수평 바 리스트 ---------------- */

export function BarList({
  items,
  unit = "",
}: {
  items: { label: string; value: number; tone?: "brand" | "teal" | "signal" | "good"; note?: string }[];
  unit?: string;
}) {
  const max = Math.max(...items.map((i) => i.value)) || 1;
  const color = (t?: string) =>
    t === "teal"
      ? "var(--teal)"
      : t === "signal"
      ? "var(--signal)"
      : t === "good"
      ? "var(--good)"
      : "var(--brand)";
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold text-ink">{it.label}</span>
            <span className="tabular text-sm font-bold text-ink-soft">
              {it.value.toLocaleString()}
              {unit}
              {it.note && <span className="ml-1 font-normal text-ink-muted">{it.note}</span>}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: color(it.tone) }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- 그룹 막대 (비교) ---------------- */

export function GroupedBars({
  labels,
  series,
  unit = "",
  height = 240,
}: {
  labels: string[];
  series: Series[];
  unit?: string;
  height?: number;
}) {
  const W = 720;
  const H = height;
  const pad = { t: 16, r: 16, b: 30, l: 44 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = Math.max(...series.flatMap((s) => s.values)) || 1;
  const groupW = iw / labels.length;
  const barW = (groupW * 0.7) / series.length;

  return (
    <div className="scroll-x">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="비교 막대 차트">
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + ih - f * ih} y2={pad.t + ih - f * ih} stroke="var(--border)" />
            <text x={pad.l - 8} y={pad.t + ih - f * ih + 4} textAnchor="end" fontSize="11" fill="var(--ink-muted)" className="tabular">
              {Math.round(max * f).toLocaleString()}
            </text>
          </g>
        ))}
        {labels.map((l, gi) => (
          <g key={l}>
            {series.map((s, si) => {
              const v = s.values[gi];
              const h = (v / max) * ih;
              const xg = pad.l + gi * groupW + groupW * 0.15 + si * barW;
              return (
                <rect
                  key={s.name}
                  x={xg}
                  y={pad.t + ih - h}
                  width={barW - 3}
                  height={h}
                  rx="3"
                  fill={s.color ?? PALETTE[si % PALETTE.length]}
                />
              );
            })}
            <text x={pad.l + gi * groupW + groupW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--ink-muted)">
              {l}
            </text>
          </g>
        ))}
      </svg>
      <Legend items={series.map((s, i) => ({ name: s.name, color: s.color ?? PALETTE[i % PALETTE.length] }))} />
      {unit && <p className="mt-1 text-right text-xs text-ink-muted">단위: {unit}</p>}
    </div>
  );
}

/* ---------------- 도넛 (게이지) ---------------- */

export function Gauge({
  value,
  max = 100,
  label,
  unit = "",
  tone = "brand",
}: {
  value: number;
  max?: number;
  label: ReactNode;
  unit?: string;
  tone?: "brand" | "teal" | "signal" | "good";
}) {
  const pct = Math.min(1, value / max);
  const r = 52;
  const c = 2 * Math.PI * r;
  const color =
    tone === "teal" ? "var(--teal)" : tone === "signal" ? "var(--signal)" : tone === "good" ? "var(--good)" : "var(--brand)";
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="h-32 w-32 -rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="-mt-[5.4rem] flex flex-col items-center">
        <span className="tabular text-2xl font-extrabold text-ink">
          {value.toLocaleString()}
          <span className="text-sm text-ink-muted">{unit}</span>
        </span>
      </div>
      <div className="mt-11 text-center text-sm font-semibold text-ink-soft">{label}</div>
    </div>
  );
}

/* ---------------- 범례 ---------------- */

function Legend({ items }: { items: { name: string; color: string }[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map((it) => (
        <li key={it.name} className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: it.color }} />
          {it.name}
        </li>
      ))}
    </ul>
  );
}
