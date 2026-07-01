"use client";

import { useState } from "react";
import { PetitionForm } from "./petition-form";
import { Card, Badge, PendingData } from "./ui";
import { PETITION } from "@/data/civic";

/** 폼 + 실시간 온라인 서명 집계 (서명 완료 시 즉시 반영) */
export function PetitionLive({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <PetitionForm onSigned={setCount} />

      <div className="space-y-4">
        {/* 온라인 실시간 집계 */}
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

        {/* 2025 오프라인 서명운동 (역사적 기록) */}
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
  );
}
