import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // 👈 這行就是允許 Sanity 圖片顯示的關鍵
      },
    ],
  },
};

export default nextConfig;