import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cs.copart.com",
      },
      {
        protocol: "https",
        hostname: "vis.iaai.com",
      },
      {
        protocol: "https",
        hostname: "fadder.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.copart.com",
      },
      {
        protocol: "https",
        hostname: "*.copart.com",
      },
      {
        protocol: "https",
        hostname: "*.iaai.com",
      },
    ],
  },
};

export default nextConfig;
