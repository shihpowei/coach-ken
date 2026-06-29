// 檔案路徑：app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// 🆕 1. 引入分析工具 (這是新增的)
import { Analytics } from "@vercel/analytics/react"; 
import "./globals.css";
// ✅ 正確寫法：一個點，代表「就在這裡找」
import Navbar from "./components/Navbar"; // 👈 這裡就是引入我們剛剛做的 Navbar
import GoogleAnalytics from "./components/GoogleAnalytics";
import BookingClickTracker from "./components/BookingClickTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coach-ken.vercel.app'),
  title: {
    template: '%s | 阿Ken教練 施柏瑋',
    default: '阿Ken教練 施柏瑋 | 高雄・屏東專業健身教練', 
  },
  description: "阿Ken教練 施柏瑋官方網站。提供高雄、屏東一對一私人健身教練課、小團體訓練與新手健身入門。",
  keywords: ['阿Ken教練', '施柏瑋', '高雄健身教練', '屏東健身教練', '私人教練', '增肌減脂'],
  openGraph: {
    title: '阿Ken教練 施柏瑋',
    description: '高雄・屏東專業健身教練，陪你用安全、有效的訓練建立穩定運動習慣。',
    url: 'https://coach-ken.vercel.app',
    siteName: '阿Ken教練 施柏瑋',
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
            © {new Date().getFullYear()} 阿Ken教練 施柏瑋. All rights reserved.
        </footer>

        {/* 🆕 2. 這裡放入計數器，它會自動回傳數據給 Vercel (這是新增的) */}
        <Analytics />
        <GoogleAnalytics />
        <BookingClickTracker />
      </body>
    </html>
  );
}
