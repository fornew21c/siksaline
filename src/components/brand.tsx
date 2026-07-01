import Link from "next/link";

/** 노선 아이콘 — 원(역) + 선(노선)을 미니멀하게 표현 */
export function LineMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="40" height="40" rx="10" fill="var(--brand)" />
      <path
        d="M11 27 L20 13 L29 27"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="11" cy="27" r="3.4" fill="#fff" />
      <circle cx="20" cy="13" r="3.4" fill="var(--teal)" stroke="#fff" strokeWidth="2" />
      <circle cx="29" cy="27" r="3.4" fill="#fff" />
    </svg>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="고양은평선 식사연장 홈">
      <LineMark className="h-9 w-9 shrink-0 transition-transform group-hover:-rotate-3" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.15rem] font-extrabold tracking-tight text-ink">
          고양은평<span className="text-brand">선</span>
        </span>
        {!compact && (
          <span className="mt-0.5 text-[0.62rem] font-medium tracking-wide text-ink-muted">
            식사동 연장 데이터 플랫폼
          </span>
        )}
      </span>
    </Link>
  );
}
