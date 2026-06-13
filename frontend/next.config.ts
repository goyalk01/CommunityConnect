import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://krish.free.je/api/:path*",
      },
    ];
  },
};

export default nextConfig;