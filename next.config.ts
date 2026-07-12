import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep development assets separate from production build output. Running
  // `next build` must not invalidate the CSS manifest of a live dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
