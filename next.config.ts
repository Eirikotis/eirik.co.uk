import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep development assets separate from production build output. Running
  // `next build` must not invalidate the CSS manifest of a live dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  agentRules: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  serverExternalPackages: ["pg"],
  async redirects() {
    return [
      { source: "/work/bittensor", destination: "/?ask=bittensor", permanent: true },
      { source: "/work/void", destination: "/?ask=void", permanent: true },
      { source: "/work/bittensor-autoresearch", destination: "/?ask=autoresearch", permanent: true },
      { source: "/work/dusd", destination: "/?ask=dusd", permanent: true },
      { source: "/work/one-click-labs", destination: "/?ask=one-click-labs", permanent: true },
      { source: "/work/kpmg", destination: "/?ask=kpmg", permanent: true },
      { source: "/experience", destination: "/?ask=experience", permanent: true },
      { source: "/about", destination: "/?ask=about", permanent: true },
    ];
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
