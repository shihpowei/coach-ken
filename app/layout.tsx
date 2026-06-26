import type { Metadata } from "next";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
