"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/nav";
import { BrandLockup } from "./brand";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLockup />

        {/* 데스크톱 내비 */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="주요 메뉴">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-brand"
                    : "text-ink-soft hover:text-ink hover:bg-surface-2"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[9px] h-0.5 rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/petition"
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            서명 참여
          </Link>

          {/* 모바일 토글 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="메뉴 열기"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-ink lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav
          className="border-t border-border bg-surface lg:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="mx-auto max-w-6xl px-3 py-2">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 ${
                      active ? "bg-brand-soft text-brand" : "text-ink-soft"
                    }`}
                  >
                    <span className="text-[0.95rem] font-semibold">{item.label}</span>
                    <span className="text-xs text-ink-muted">{item.desc}</span>
                  </Link>
                </li>
              );
            })}
            <li className="p-2">
              <Link
                href="/petition"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-brand px-4 py-3 font-bold text-white"
              >
                서명 참여하기
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
