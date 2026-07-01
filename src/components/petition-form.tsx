"use client";

import { useState } from "react";
import { browserSupabase } from "@/lib/supabase-browser";
import { SIGN_REGIONS } from "@/app/petition/regions";

type Step = "form" | "sent";

export function PetitionForm() {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [region, setRegion] = useState(SIGN_REGIONS[0]);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const canSend = name.trim().length >= 2 && emailOk && agree && !loading;

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setError(null);
    setLoading(true);
    const supa = browserSupabase();
    if (!supa) {
      setError("서명 시스템 준비 중입니다. 곧 오픈합니다.");
      setLoading(false);
      return;
    }
    try {
      // 크로스 디바이스 대비: 이름·지역을 user_metadata + 로컬 양쪽에 보관
      localStorage.setItem("sig_name", name.trim());
      localStorage.setItem("sig_region", region);
      const { error } = await supa.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/petition?confirm=1`,
          shouldCreateUser: true,
          data: { sig_name: name.trim(), sig_region: region },
        },
      });
      if (error) setError("인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      else setStep("sent");
    } catch {
      setError("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "sent") {
    return (
      <div className="rounded-[var(--radius-card)] border border-brand bg-brand-soft p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16v12H4z" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-ink">메일함을 확인해주세요</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">{email}</span> 로 인증 메일을 보냈습니다.
          <br />
          메일의 <b>서명 확인 링크</b>를 누르면 서명이 완료됩니다.
        </p>
        <p className="mt-3 text-xs text-ink-muted">
          메일이 안 보이면 스팸함을 확인해주세요. 링크는 잠시 후 만료됩니다.
        </p>
        <button
          onClick={() => {
            setStep("form");
            setError(null);
          }}
          className="mt-4 text-sm font-bold text-brand hover:underline"
        >
          ← 다시 입력
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={sendLink} className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <h3 className="text-lg font-extrabold text-ink">1분이면 참여할 수 있습니다</h3>
      <p className="mt-1 text-sm text-ink-soft">이메일 인증 1회로 중복 없는 서명이 됩니다.</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">이름</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className={inputCls} />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-semibold text-ink">거주지역</label>
          <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} className={inputCls}>
            {SIGN_REGIONS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">이메일</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
          <span>
            서명 취지에 동의하며, 입력 정보가 서명 집계·중복 확인 목적으로만 사용되는 것에 동의합니다.
            (명단은 공개되지 않으며 통계 외 용도로 사용되지 않습니다.)
          </span>
        </label>
      </div>

      {error && <p className="mt-4 text-sm font-semibold text-signal">{error}</p>}

      <button type="submit" disabled={!canSend} className={btnCls}>
        {loading ? "인증 메일 발송 중…" : "인증 메일 받기"}
      </button>
      <p className="mt-3 text-center text-xs text-ink-muted">
        ※ 명단·이메일은 공개되지 않습니다. 공개되는 것은 서명 수(집계)뿐입니다.
      </p>
    </form>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 font-medium text-ink placeholder:text-ink-muted placeholder:font-normal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft";

const btnCls =
  "mt-6 w-full rounded-xl bg-brand px-5 py-3 font-bold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40";
