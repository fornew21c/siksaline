import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 클라이언트 (서버 전용)
 * - anonClient: 이메일 OTP 인증용 (공개 anon key)
 * - serviceClient: 서명 저장·조회용 (service_role key, 서버에서만 사용 — RLS 우회)
 *
 * 환경변수 미설정 시 isSupabaseConfigured=false 로 안전하게 비활성 동작.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey && serviceKey);

const noPersist = {
  auth: { persistSession: false, autoRefreshToken: false },
} as const;

export function anonClient() {
  if (!url || !anonKey) throw new Error("Supabase anon 환경변수 미설정");
  return createClient(url, anonKey, noPersist);
}

export function serviceClient() {
  if (!url || !serviceKey) throw new Error("Supabase service_role 환경변수 미설정");
  return createClient(url, serviceKey, noPersist);
}
