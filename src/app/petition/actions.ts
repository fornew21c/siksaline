"use server";

import { anonClient, serviceClient, isSupabaseConfigured } from "@/lib/supabase";
import { SIGN_REGIONS } from "./regions";

type Result = { ok: boolean; error?: string; count?: number };

/**
 * 매직링크 인증 완료 후 서명 저장.
 * 브라우저에서 받은 access_token 을 서버가 Supabase에 재검증(getUser)해서
 * 실제 인증된 이메일을 확인한 뒤 저장한다. (클라이언트가 이메일을 위조 못 함)
 * 이름·지역은 자기신고 값(localStorage) 우선, 없으면 user_metadata 폴백.
 */
export async function recordSignature(input: {
  accessToken: string;
  name: string;
  region: string;
}): Promise<Result> {
  if (!isSupabaseConfigured) return { ok: false, error: "서명 시스템 준비 중입니다." };

  try {
    const supa = anonClient();
    const { data, error } = await supa.auth.getUser(input.accessToken);
    if (error || !data.user?.email) {
      return { ok: false, error: "이메일 인증을 확인할 수 없습니다. 링크를 다시 눌러주세요." };
    }
    const email = data.user.email.toLowerCase();
    const meta = (data.user.user_metadata ?? {}) as Record<string, string>;

    const name = (input.name?.trim() || meta.sig_name || "").trim();
    const region =
      SIGN_REGIONS.includes(input.region)
        ? input.region
        : SIGN_REGIONS.includes(meta.sig_region)
        ? meta.sig_region
        : "기타 지역";

    if (name.length < 2) {
      return { ok: false, error: "이름 정보가 없어 저장하지 못했습니다. 서명 화면에서 다시 시도해주세요." };
    }

    const svc = serviceClient();
    const { error: iErr } = await svc.from("signatures").upsert(
      { email, name, region, verified_at: new Date().toISOString() },
      { onConflict: "email" }
    );
    if (iErr) return { ok: false, error: "서명 저장 중 오류가 발생했습니다." };

    return { ok: true, count: await getSignatureCount() };
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
