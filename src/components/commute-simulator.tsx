"use client";

import { useState } from "react";
import { SIMULATOR, SIMULATOR_NOTE } from "@/data/transit";

export function CommuteSimulator() {
  const [idx, setIdx] = useState(0);
  const [roundTrip, setRoundTrip] = useState(true);
  const row = SIMULATOR[idx];
  const factor = roundTrip ? 2 : 1;
  const now = row.now * factor;
  const after = row.after * factor;
  const saved = now - after;
  const pct = Math.round((saved / now) * 100);
  const yearly = Math.round((saved * 5 * 48) / 60); // 주5일·48주 근사, 시간

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-ink">목적지</label>
        <select
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm font-semibold text-ink focus:border-brand focus:outline-none"
        >
          {SIMULATOR.map((s, i) => (
            <option key={s.dest} value={i}>
              {s.dest}
            </option>
          ))}
        </select>
        <div className="ml-auto flex rounded-lg border border-border p-0.5 text-sm font-semibold">
          <button
            onClick={() => setRoundTrip(false)}
            className={`rounded-md px-3 py-1.5 transition-colors ${!roundTrip ? "bg-brand text-white" : "text-ink-soft"}`}
          >
            편도
          </button>
          <button
            onClick={() => setRoundTrip(true)}
            className={`rounded-md px-3 py-1.5 transition-colors ${roundTrip ? "bg-brand text-white" : "text-ink-soft"}`}
          >
            왕복
          </button>
        </div>
      </div>

      {/* 막대 비교 */}
      <div className="mt-6 space-y-4">
        <SimBar label="현재 (버스)" value={now} max={now} color="var(--signal)" />
        <SimBar label="연장 후 (예상)" value={after} max={now} color="var(--good)" />
      </div>

      {/* 요약 */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
        <div>
          <p className="tabular text-2xl font-extrabold text-good">-{saved}<span className="text-sm">분</span></p>
          <p className="mt-0.5 text-xs text-ink-muted">{roundTrip ? "하루 왕복" : "편도"} 절감</p>
        </div>
        <div>
          <p className="tabular text-2xl font-extrabold text-brand">{pct}<span className="text-sm">%</span></p>
          <p className="mt-0.5 text-xs text-ink-muted">시간 단축</p>
        </div>
        <div>
          <p className="tabular text-2xl font-extrabold text-teal">{yearly}<span className="text-sm">시간</span></p>
          <p className="mt-0.5 text-xs text-ink-muted">연간 절감(근사)</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-ink-muted">※ {SIMULATOR_NOTE}</p>
    </div>
  );
}

function SimBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="tabular text-sm font-bold text-ink-soft">{value}분</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}
