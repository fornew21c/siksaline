import { LINE, KIND_META } from "@/data/route";

/** 도식화 노선도 — 지리 좌표가 아닌 개념도 */
export function RouteDiagram() {
  const stations = LINE.stations;
  const W = 760;
  const H = 150;
  const padX = 40;
  const y = 70;
  const step = (W - padX * 2) / (stations.length - 1);
  const x = (i: number) => padX + i * step;

  // 연장 구간 시작 인덱스
  const extStart = stations.findIndex((s) => s.kind !== "confirmed");

  return (
    <div className="scroll-x">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[680px]" role="img" aria-label="고양은평선 연장 노선 개념도">
        {/* 기존 구간 라인 */}
        <line x1={x(0)} y1={y} x2={x(extStart)} y2={y} stroke="var(--brand)" strokeWidth="6" strokeLinecap="round" />
        {/* 연장 구간 라인 (점선) */}
        <line
          x1={x(extStart)}
          y1={y}
          x2={x(stations.length - 1)}
          y2={y}
          stroke="var(--teal)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 12"
        />

        {stations.map((s, i) => {
          const c = KIND_META[s.kind].color;
          const isExt = s.kind !== "confirmed";
          return (
            <g key={s.id}>
              <circle cx={x(i)} cy={y} r={isExt ? 9 : 8} fill="#fff" stroke={c} strokeWidth="4" />
              {s.transfer && <circle cx={x(i)} cy={y} r={3} fill={c} />}
              {/* 역명 — 지그재그 배치로 겹침 방지 */}
              <text
                x={x(i)}
                y={i % 2 === 0 ? y - 20 : y + 30}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight={isExt ? 700 : 600}
                fill={isExt ? "var(--ink)" : "var(--ink-soft)"}
              >
                {s.name}
              </text>
              {s.transfer && (
                <text x={x(i)} y={i % 2 === 0 ? y - 34 : y + 44} textAnchor="middle" fontSize="10" fill="var(--ink-muted)">
                  {s.transfer.join("·")}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <ul className="mt-4 flex flex-wrap gap-4">
        {Object.values(KIND_META).map((m) => (
          <li key={m.label} className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <span className="h-3 w-3 rounded-full border-[3px] bg-white" style={{ borderColor: m.color }} />
            {m.label}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-ink-muted sm:hidden">← 좌우로 밀어 전체 노선을 볼 수 있어요 →</p>
    </div>
  );
}
