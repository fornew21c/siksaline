"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV } from "@/lib/nav";
import { BrandLockup } from "./brand";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
      {/* 상단 바 */}
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
                  active ? "text-brand" : "text-ink-soft hover:text-ink hover:bg-surface-2"
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

        <Link
          href="/petition"
          className="inline-flex shrink-0 rounded-lg bg-brand px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-strong sm:px-4"
        >
          서명 참여
        </Link>
      </div>

      {/* 모바일/태블릿: 가로 스크롤 탭 바 */}
      <MobileTabs pathname={pathname} />
    </header>
  );
}

function MobileTabs({ pathname }: { pathname: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // 현재 페이지 탭을 화면 안으로 스크롤
  useEffect(() => {
    const el = activeRef.current;
    const box = scroller.current;
    if (!el || !box) return;
    const left = el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  }, [pathname]);

  return (
    <div className="relative border-t border-border lg:hidden">
      <div
        ref={scroller}
        className="scroll-x flex gap-1 px-3 py-2"
        style={{ scrollbarWidth: "none" }}
        aria-label="주요 메뉴"
        role="navigation"
      >
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              ref={active ? activeRef : undefined}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                active ? "bg-brand text-white" : "bg-surface-2 text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {/* 우측 페이드 (더 있음을 암시) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent" />
    </div>
  );
}
