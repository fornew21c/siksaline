"use server";

import { anonClient, serviceClient, isSupabaseConfigured } from "@/lib/supabase";
import { SIGN_REGIONS } from "./regions";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Result = { ok: boolean; error?: string; count?: number };

/** 1단계: 이메일로 6자리 인증코드 발송 (Supabase Auth OTP — 무료, 도메인 불필요) */
export async function sendSignatureCode(email: string): Promise<Result> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "서명 시스템 준비 중입니다. 곧 오픈합니다." };
  }
  const e = email.trim().toLowerCase();
  if (!EMAIL_RE.test(e)) return { ok: false, error: "이메일 형식을 확인해주세요." };

  try {
    const supa = anonClient();
    const { error } = await supa.auth.signInWithOtp({
      email: e,
      options: { shouldCreateUser: true },
    });
    if (error) {
      return { ok: false, error: "인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}

/** 2단계: 코드 검증 후 서명 저장 (이메일당 1회, 중복은 갱신) */
export async function confirmSignature(input: {
  email: string;
  code: string;
  name: string;
  region: string;
}): Promise<Result> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "서명 시스템 준비 중입니다." };
  }
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  const region = input.region;
  const code = input.code.trim();

  if (name.length < 2) return { ok: false, error: "이름을 확인해주세요." };
  if (!SIGN_REGIONS.includes(region)) return { ok: false, error: "거주지역을 선택해주세요." };
  if (!/^\d{6}$/.test(code)) return { ok: false, error: "인증코드 6자리를 입력해주세요." };

  try {
    // 이메일 소유 증명 (OTP 검증)
    const supa = anonClient();
    const { error: vErr } = await supa.auth.verifyOtp({ email, token: code, type: "email" });
    if (vErr) return { ok: false, error: "코드가 올바르지 않거나 만료됐습니다. 다시 시도해주세요." };

    // 서명 저장 (service_role — RLS 우회). 이메일당 1건.
    const svc = serviceClient();
    const { error: iErr } = await svc.from("signatures").upsert(
      { email, name, region, verified_at: new Date().toISOString() },
      { onConflict: "email" }
    );
    // 임시 세션 정리 (로그인 상태로 남기지 않음)
    await supa.auth.signOut().catch(() => {});

    if (iErr) return { ok: false, error: "서명 저장 중 오류가 발생했습니다." };

    const count = await getSignatureCount();
    return { ok: true, count };
  } catch {
    return { ok: false, error: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}

/** 온라인 서명 집계 (공개 RPC — 숫자만) */
export async function getSignatureCount(): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  try {
    const supa = anonClient();
    const { data, error } = await supa.rpc("signature_count");
    if (error || typeof data !== "number") return 0;
    return data;
  } catch {
    return 0;
  }
}
