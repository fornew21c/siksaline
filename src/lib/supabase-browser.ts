"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && anon);

let cached: SupabaseClient | null = null;

/** 브라우저용 Supabase 클라이언트 (매직링크 = implicit 플로우, 크로스 디바이스 지원) */
export function browserSupabase(): SupabaseClient | null {
  if (!url || !anon) return null;
  if (!cached) {
    cached = createClient(url, anon, {
      auth: {
        flowType: "implicit",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return cached;
}
