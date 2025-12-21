import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 保留原本的高級字體設定
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- 這裡就是修改重點：您的品牌招牌 ---
export const metadata: Metadata = {
  // 1. 網頁標題
  title: {
    template: '%s | Ken教練-柏瑋',
    default: 'Ken教練-柏瑋 | 打造您的個人品牌與職涯優勢', 
  },
  
  // 2. 網頁描述
  description: "Ken教練-柏瑋官方網站。專注於協助專業人士建立個人品牌、網站系統與職涯教練服務。透過系統化教學，讓您的專業被更多人看見。",
  
  // 3. 關鍵字
  keywords: ['Ken教練', '柏瑋', '個人品牌', '職涯教練', '網站架設', '自我成長'],

  // 4. 社群分享設定 (FB/LINE 顯示的預覽)
  openGraph: {
    title: 'Ken教練-柏瑋 | 打造您的個人品牌與職涯優勢',
    description: '協助您突破職涯瓶頸，打造個人影響力。',
    siteName: 'Ken教練-柏瑋',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 重點：我幫您把 lang="en" 改成 "zh-TW"，這樣 Google 才知道這是繁體中文網站
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}