// 檔案路徑：app/layout.tsx
import type { Metadata } from "next";
<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
// 🆕 1. 引入分析工具 (這是新增的)
import { Analytics } from "@vercel/analytics/react"; 
import "./globals.css";
// ✅ 正確寫法：一個點，代表「就在這裡找」
import Navbar from "./components/Navbar"; // 👈 這裡就是引入我們剛剛做的 Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ken教練-柏瑋',
    default: 'Ken教練-柏瑋 | 打造您的個人品牌與職涯優勢', 
  },
  description: "Ken教練-柏瑋官方網站。專注於協助專業人士建立個人品牌、網站系統與職涯教練服務。",
  keywords: ['Ken教練', '柏瑋', '個人品牌', '職涯教練', '健身教練', '增肌減脂'],
  openGraph: {
    title: 'Ken教練-柏瑋',
    description: '協助您突破職涯瓶頸，打造個人影響力。',
    siteName: 'Ken教練-柏瑋',
    locale: 'zh_TW',
    type: 'website',
=======
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./globals.css";  // 👈 這一行就是讓網頁變漂亮的關鍵！

export const metadata: Metadata = {
  metadataBase: new URL("https://coach-ken.vercel.app"),
  title: {
    default: "阿Ken教練｜高雄・屏東專業健身教練",
    template: "%s",
  },
  description: "阿Ken教練提供高雄、屏東一對一私人健身教練課、小團體訓練與新手健身入門，陪你用安全、有效的訓練建立穩定運動習慣。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "阿Ken教練｜高雄・屏東專業健身教練",
    description: "高雄、屏東私人健身教練課，新手也能從安全動作與基礎肌力開始。",
    url: "/",
    siteName: "阿Ken教練",
    locale: "zh_TW",
    type: "website",
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="zh-TW" className="scroll-smooth"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        {/* Navbar 放這裡，保證全站都有 */}
        <Navbar />
        
        <main className="min-h-screen">
            {children}
        </main>

        <footer className="border-t bg-white py-8 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Ken教練-柏瑋. All rights reserved.
        </footer>

        {/* 🆕 2. 這裡放入計數器，它會自動回傳數據給 Vercel (這是新增的) */}
        <Analytics />
=======
    <html lang="zh-TW">
      <body>
        {children}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
      </body>
    </html>
  );
}