"use client";

import { useState, useTransition } from "react";
import { sendSignatureCode, confirmSignature } from "@/app/petition/actions";
import { SIGN_REGIONS } from "@/app/petition/regions";

type Step = "form" | "code" | "done";

export function PetitionForm({ onSigned }: { onSigned?: (count: number) => void }) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [region, setRegion] = useState(SIGN_REGIONS[0]);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const canSend = name.trim().length >= 2 && emailOk && agree;

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setError(null);
    startTransition(async () => {
      const r = await sendSignatureCode(email);
      if (r.ok) setStep("code");
      else setError(r.error ?? "발송에 실패했습니다.");
    });
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) return;
    setError(null);
    startTransition(async () => {
      const r = await confirmSignature({ email, code, name, region });
      if (r.ok) {
        if (typeof r.count === "number") onSigned?.(r.count);
        setStep("done");
      } else {
        setError(r.error ?? "인증에 실패했습니다.");
      }
    });
  }

  if (step === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-good bg-good-soft p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-good text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-ink">서명이 완료되었습니다</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {name}님({region})의 참여에 감사드립니다. 데이터에 목소리가 더해졌습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      {/* 단계 표시 */}
      <div className="mb-4 flex items-center gap-2 text-xs font-bold">
        <span className={step === "form" ? "text-brand" : "text-ink-muted"}>① 정보 입력</span>
        <span className="text-ink-muted">→</span>
        <span className={step === "code" ? "text-brand" : "text-ink-muted"}>② 이메일 인증</span>
      </div>

      {step === "form" ? (
        <form onSubmit={submitForm}>
          <h3 className="text-lg font-extrabold text-ink">1분이면 참여할 수 있습니다</h3>
          <p className="mt-1 text-sm text-ink-soft">이메일 인증 1회로 중복 없는 서명이 됩니다.</p>

          <div className="mt-5 space-y-4">
            <Field label="이름" htmlFor="name">
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className={inputCls} />
            </Field>
            <Field label="거주지역" htmlFor="region">
              <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} className={inputCls}>
                {SIGN_REGIONS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Field>
            <Field label="이메일" htmlFor="email">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
            </Field>

            <label className="flex items-start gap-2.5 text-sm text-ink-soft">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
              <span>
                서명 취지에 동의하며, 입력 정보가 서명 집계·중복 확인 목적으로만 사용되는 것에 동의합니다.
                (명단은 공개되지 않으며 통계 외 용도로 사용되지 않습니다.)
              </span>
            </label>
          </div>

          {error && <p className="mt-4 text-sm font-semibold text-signal">{error}</p>}

          <button type="submit" disabled={!canSend || pending} className={btnCls}>
            {pending ? "인증 메일 발송 중…" : "인증 메일 받기"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitCode}>
          <h3 className="text-lg font-extrabold text-ink">이메일을 확인해주세요</h3>
          <p className="mt-1 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{email}</span> 로 보낸 6자리 인증코드를 입력하세요.
          </p>

          <div className="mt-5">
            <Field label="인증코드" htmlFor="code">
              <input
                id="code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className={`${inputCls} tabular tracking-[0.4em]`}
              />
            </Field>
          </div>

          {error && <p className="mt-4 text-sm font-semibold text-signal">{error}</p>}

          <button type="submit" disabled={code.trim().length !== 6 || pending} className={btnCls}>
            {pending ? "확인 중…" : "서명 완료하기"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("form");
              setCode("");
              setError(null);
            }}
            className="mt-3 w-full text-center text-sm font-semibold text-ink-muted hover:text-ink"
          >
            ← 정보 다시 입력
          </button>
        </form>
      )}

      <p className="mt-3 text-center text-xs text-ink-muted">
        ※ 명단·이메일은 공개되지 않습니다. 공개되는 것은 서명 수(집계)뿐입니다.
      </p>
    </div>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 font-medium text-ink placeholder:text-ink-muted placeholder:font-normal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft";

const btnCls =
  "mt-6 w-full rounded-xl bg-brand px-5 py-3 font-bold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
