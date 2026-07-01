"use client";

import { useEffect, useRef, useState } from "react";
import { PetitionForm } from "./petition-form";
import { Card, Badge, PendingData } from "./ui";
import { PETITION } from "@/data/civic";
import { browserSupabase } from "@/lib/supabase-browser";
import { recordSignature } from "@/app/petition/actions";

/** 폼 + 실시간 온라인 서명 집계 + 매직링크 복귀 처리 */
export function PetitionLive({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [status, setStatus] = useState<"idle" | "confirming" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const handled = useRef(false);

  useEffect(() => {
    // 매직링크 복귀(?confirm=1 + #access_token=...)를 처리
    if (typeof window === "undefined") return;
    const isReturn =
      new URLSearchParams(window.location.search).get("confirm") === "1" ||
      window.location.hash.includes("access_token");
    if (!isReturn) return;

    const supa = browserSupabase();
    if (!supa) return;

    setStatus("confirming");
    const { data: sub } = supa.auth.onAuthStateChange(async (_event, session) => {
      if (!session || handled.current) return;
      handled.current = true;
      const name = localStorage.getItem("sig_name") ?? "";
      const region = localStorage.getItem("sig_region") ?? "";
      const r = await recordSignature({ accessToken: session.access_token, name, region });
      if (r.ok && typeof r.count === "number") {
        setCount(r.count);
        setStatus("done");
        setMessage("서명이 완료되었습니다. 참여해주셔서 감사합니다.");
      } else {
        setStatus("error");
        setMessage(r.error ?? "서명 저장에 실패했습니다.");
      }
      localStorage.removeItem("sig_name");
      localStorage.removeItem("sig_region");
      await supa.auth.signOut().catch(() => {});
      window.history.replaceState({}, "", "/petition");
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {status === "done" && (
        <div className="rounded-[var(--radius-card)] border border-good bg-good-soft p-4 text-center font-bold text-good">
          ✓ {message}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-[var(--radius-card)] border border-signal bg-signal-soft p-4 text-center font-bold text-signal">
          {message}
        </div>
      )}
      {status === "confirming" && (
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 text-center font-semibold text-ink-soft">
          서명 확인 중…
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <PetitionForm />

        <div className="space-y-4">
          <Card>
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-ink-soft">온라인 서명</p>
              <Badge tone="good">실시간</Badge>
            </div>
            <p className="tabular mt-1 text-4xl font-extrabold text-brand">
              {count.toLocaleString()}
              <span className="text-base font-bold text-ink-muted"> 명</span>
            </p>
            <p className="mt-2 text-sm text-ink-soft">이메일 인증을 완료한 서명 수입니다.</p>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-ink-soft">2025 서명운동</p>
            <p className="tabular mt-1 text-3xl font-extrabold text-ink">
              약 {PETITION.current.toLocaleString()}
              <span className="text-base font-bold text-ink-muted"> 명</span>
            </p>
            <p className="mt-2 text-xs text-ink-muted">
              {PETITION.drive}. 온라인 서명은 이와 별도로 계속 모읍니다.
            </p>
          </Card>

          <PendingData title="지역별 참여 집계 — 정리 중" source="추진모임 서명 데이터">
            식사·풍동·기타 지역별 참여 현황은 집계가 정리되는 대로 공개합니다.
          </PendingData>
        </div>
      </div>
    </div>
  );
}
