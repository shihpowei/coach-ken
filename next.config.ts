import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 在這裡告訴網站：Sanity 的圖片是安全的，請放行 */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;