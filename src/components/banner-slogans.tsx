import { Container } from "./ui";
import { BANNERS, CAMPAIGN } from "@/data/overview";

/* 현수막 색 (화면용으로 살짝 톤다운한 형광노랑 + 빨강) */
const YELLOW = "#F2C200";
const RED = "#E4002B";

/**
 * 오프라인 현수막과 동일한 톤의 "요구·슬로건" 구역.
 * 풀폭 검정 띠 대신, 밝은 화면 위에 여백을 두른 "검정 포스터"로 얹어
 * 전환을 자연스럽게 하면서도 현수막의 강한 힘은 유지한다.
 * 이 구역에만 투쟁 현수막 스타일을 쓰고, 데이터 영역은 차분한 톤 유지.
 */
export function BannerSlogans({ eyebrow = true }: { eyebrow?: boolean }) {
  const [featured, ...rest] = BANNERS;

  return (
    <section className="bg-background py-12 sm:py-16">
      <Container>
        {/* 검정 포스터 (여백 두르고 둥글게) */}
        <div className="rounded-3xl bg-[#0d0d0d] px-5 py-10 sm:px-10 sm:py-12">
          {eyebrow && (
            <p className="mb-5 text-sm font-extrabold tracking-wide" style={{ color: YELLOW }}>
              우리의 요구
            </p>
          )}

          {/* 대표 현수막 (노랑 바탕) — 면적 절제: 살짝 좁게 */}
          <div className="max-w-4xl rounded-xl px-5 py-5 sm:px-8 sm:py-6" style={{ background: YELLOW }}>
            <p className="text-2xl font-black leading-[1.15] tracking-tight text-black sm:text-4xl">
              <span style={{ color: RED }}>{featured.lead}</span> {featured.body}{" "}
              <span className="underline decoration-4 underline-offset-4" style={{ color: RED }}>
                {featured.em}
              </span>
              {featured.tail}
            </p>
            <p className="mt-3 text-sm font-bold text-black/70 sm:text-base">
              {CAMPAIGN.org} · {CAMPAIGN.who}
            </p>
          </div>

          {/* 나머지 현수막 (검정 바탕) */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {rest.map((b) => (
              <div key={b.lead} className="rounded-lg border border-white/10 bg-black px-5 py-5">
                <p className="text-lg font-black leading-snug tracking-tight text-white sm:text-xl">
                  <span
                    className="mr-1.5 inline-block rounded px-1.5 text-black"
                    style={{ background: YELLOW }}
                  >
                    {b.lead}
                  </span>
                  {b.body}{" "}
                  <span style={{ color: RED }}>{b.em}</span>
                  <span className="text-white">{b.tail}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/50">
            {CAMPAIGN.cityPop} 고양시민의 염원 · 오프라인 현수막과 같은 메시지입니다.
          </p>
        </div>
      </Container>
    </section>
  );
}
