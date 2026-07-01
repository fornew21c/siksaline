"use client";

import { useState } from "react";

const AREAS = ["식사동", "풍동", "기타 고양시", "기타 지역"];

export function PetitionForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-[var(--radius-card)] border border-good bg-good-soft p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-good text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-ink">서명이 접수되었습니다</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {name}님({area})의 참여에 감사드립니다. 데이터에 목소리가 더해졌습니다.
        </p>
        <button
          onClick={() => {
            setDone(false);
            setName("");
            setAgree(false);
          }}
          className="mt-4 text-sm font-bold text-brand hover:underline"
        >
          다른 이름으로 참여
        </button>
      </div>
    );
  }

  const valid = name.trim().length >= 2 && agree;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }}
      className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6"
    >
      <h3 className="text-lg font-extrabold text-ink">1분이면 참여할 수 있습니다</h3>
      <p className="mt-1 text-sm text-ink-soft">이름과 거주지역만 입력하면 됩니다.</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            이름
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
          />
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-semibold text-ink">
            거주지역
          </label>
          <select
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 font-medium text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
          >
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
          />
          <span>
            서명 취지에 동의하며, 입력 정보가 서명 집계 목적으로만 사용되는 것에
            동의합니다. (개인정보는 통계 외 용도로 사용되지 않습니다.)
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="mt-6 w-full rounded-xl bg-brand px-5 py-3 font-bold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40"
      >
        서명하기
      </button>
      <p className="mt-3 text-center text-xs text-ink-muted">
        ※ 데모 양식입니다. 정식 공개 시 Supabase에 안전하게 저장됩니다.
      </p>
    </form>
  );
}
