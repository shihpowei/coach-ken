import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* 在這裡告訴網站：Sanity 的圖片是安全的，請放行 */
=======
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: 'cdn.sanity.io',
=======
        hostname: 'cdn.sanity.io', // 👈 這行就是允許 Sanity 圖片顯示的關鍵
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
      },
    ],
  },
};

export default nextConfig;