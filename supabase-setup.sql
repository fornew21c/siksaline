-- ============================================================
-- 고양은평선 식사·풍동 연장 — 온라인 서명 DB 설정
-- Supabase 대시보드 → SQL Editor 에 아래 전체를 붙여넣고 실행하세요.
-- (한 번만 실행하면 됩니다)
-- ============================================================

-- 1) 서명 테이블
create table if not exists public.signatures (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,        -- 이메일 인증된 서명자 (중복 방지 키)
  name        text not null,               -- 이름
  region      text not null,               -- 거주지역
  verified_at timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- 2) RLS 활성화 — 정책을 하나도 만들지 않음 = 클라이언트(anon)는
--    개별 행을 절대 읽/쓰기 못 함. 서버(service_role)만 우회 가능.
--    => 서명자 명단·이메일은 공개되지 않습니다.
alter table public.signatures enable row level security;

-- anon/authenticated 의 테이블 직접 접근 권한 회수 (이중 안전장치)
revoke all on table public.signatures from anon, authenticated;

-- 3) 공개 집계 함수 — "숫자만" 노출 (개별 정보 노출 없음)
create or replace function public.signature_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int from public.signatures;
$$;

grant execute on function public.signature_count() to anon, authenticated;

-- ============================================================
-- 확인:
--   select public.signature_count();   -- 현재 서명 수 (숫자)
--   select * from public.signatures;   -- 명단 (대시보드/SQL에서만, 공개 X)
-- ============================================================
