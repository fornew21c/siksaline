import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // '데이터 분석' 탭을 '교통 데이터'로 통합 — 구 링크·북마크 유지
      { source: "/analysis", destination: "/transit", permanent: true },
    ];
  },
};

export default nextConfig;
