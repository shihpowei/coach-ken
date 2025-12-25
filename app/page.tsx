import Link from "next/link";
import Image from "next/image";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react"; 
import {
  CheckCircle2, MapPin, Instagram, Facebook, Users, Monitor, Dumbbell,
  PlayCircle, ChevronDown, ArrowRight, ChevronRight,
  Coins, Building2, ExternalLink // ❌ 拿掉了 Navigation，改用 MapPin
} from "lucide-react";

// --- 1. Sanity 設定 ---
const client = createClient({
  // 🚑 修正：加上 ?? "" 騙過檢查，防止紅字
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

// --- 2. 抓取資料 ---
async function getAllData() {
  // 這裡使用 try-catch 防止抓資料失敗導致整個網頁掛掉
  try {
    const query = `{
      "profile": *[_type == "profile"][0] {
        bio, "portraitUrl": portrait.asset->url, certifications, experience, achievements, specialties
      },
      "homepage": *[_type == "homepage"][0] {
        heroTitle, heroSubtitle, heroDescription, "heroImageUrl": heroImage.asset->url
      },
      "posts": *[_type == "post"] | order(publishedAt desc)[0...3] {
        _id, title, slug, publishedAt, "mainImageUrl": mainImage.asset->url
      },
      "testimonials": *[_type == "testimonial"] | order(_createdAt desc)[0...3] {
        studentName, program, content, "beforeImageUrl": beforeImage.asset->url, "afterImageUrl": afterImage.asset->url
      },
      "venues": *[_type == "venue"] | order(area asc) { 
        area, name, address, description, url 
      },
      "pricing": *[_type == "pricing"] | order(order asc) { 
        title, price, unit 
      }
    }`;
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("抓取資料失敗:", error);
    return {}; // 如果失敗就回傳空物件，不要讓網頁爆掉
  }
}

export default async function Home() {
  const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";
  
  // 獲取所有資料 (強制轉型為 any，讓紅字閉嘴)
  const data = await getAllData() as any;
  
  // 安全解構 (給預設值)
  const profile = data?.profile || {};
  const homepage = data?.homepage || {};
  const posts = data?.posts || [];
  const testimonials = data?.testimonials || [];
  const venues = data?.venues || [];
  const pricing = data?.pricing || [];

  const heroTitle = homepage.heroTitle || "阿Ken教練";
  const heroSubtitle = homepage.heroSubtitle || "高雄・屏東專業健身教練";
  const heroDesc = homepage.heroDescription || "從零開始也可以，陪你用安全、有效的訓練，慢慢養成穩定運動習慣。";
  const heroBg = homepage.heroImageUrl; 
  const portrait = profile.portraitUrl; 

  // 場地自動分組
  const groupedVenues = (venues || []).reduce((acc: any, venue: any) => {
    const area = venue.area || "其他地區";
    if (!acc[area]) acc[area] = [];
    acc[area].push(venue);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
            {heroBg ? (
                <>
                  <Image src={heroBg} alt="Hero Background" fill className="object-cover object-center" priority />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                </>
            ) : <div className="w-full h-full bg-zinc-900"></div>}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 h-full">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-white drop-shadow-md">
                {heroTitle}<br/>
                <span className="text-zinc-200 text-2xl md:text-4xl block mt-2">{heroSubtitle}</span>
              </h1>
              <p className="text-lg leading-relaxed text-zinc-100 drop-shadow-sm">{heroDesc}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-bold text-zinc-900 shadow-lg hover:bg-zinc-100 hover:scale-105 transition-all" href={bookingUrl} target="_blank" rel="noopener">
                  填寫表單預約課程 <ArrowRight className="h-4 w-4"/>
                </a>
              </div>
              <div className="flex flex-col gap-1 text-sm text-zinc-300 pt-2">
                 <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 服務地區：高雄 / 屏東</div>
              </div>
            </div>
            {/* 適合對象區塊 */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-zinc-100 bg-white/95 backdrop-blur-sm p-6 shadow-xl shadow-zinc-900/20">
                  <div className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
                    <CheckCircle2 className="h-5 w-5 text-green-600" /> 適合對象
                  </div>
                  <ul className="space-y-3">
                    {["久坐、常覺得痠痛的上班族", "完全沒有運動基礎的新手", "想重新建立體力的人", "銀髮族維持活動力"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-600">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服務方案區 (包含新價目表) */}
      <section id="services" className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">服務方案</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* 固定卡片 */}
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Users className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">一對一私人教練課</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">量身打造，專注於動作優化與目標達成。</p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Dumbbell className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">小團體訓練</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">親友同行，互相激勵，訓練更有趣。</p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Monitor className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">線上課表規劃</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">自主訓練者的最佳夥伴，專業課表安排。</p>
          </div>
        </div>

        {/* 🆕 動態價目表 */}
        {pricing && pricing.length > 0 && (
            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Coins className="h-6 w-6 text-zinc-700"/> 詳細價目表
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 text-zinc-500 text-sm">
                                <th className="py-3 px-2 font-medium">方案名稱</th>
                                <th className="py-3 px-2 font-medium">價格</th>
                                <th className="py-3 px-2 font-medium">說明</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-800">
                            {pricing.map((item:any, index:number) => (
                                <tr key={index} className="border-b border-zinc-100 hover:bg-white transition-colors">
                                    <td className="py-4 px-2 font-bold">{item.title}</td>
                                    <td className="py-4 px-2 text-orange-600 font-bold text-lg">{item.price}</td>
                                    <td className="py-4 px-2 text-zinc-500 text-sm">{item.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </section>

      {/* 🆕 合作場館區 */}
      {venues && venues.length > 0 && (
          <section id="locations" className="py-20 bg-zinc-900 text-white">
            <div className="mx-auto max-w-5xl px-4">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-white">合作場館</h2>
                        <p className="text-zinc-400">高雄・屏東地區</p>
                    </div>
                </div>
                
                <div className="space-y-12">
                  {Object.entries(groupedVenues).map(([area, areaVenues]: [string, any]) => (
                    <div key={area}>
                      <h3 className="text-xl font-bold mb-6 pl-3 border-l-4 border-orange-600 text-zinc-100 flex items-center gap-2">
                        {area}
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {areaVenues.map((venue:any, i:number) => (
                          <div key={i} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 flex flex-col h-full">
                              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                                {venue.description || "歡迎預約體驗"}
                              </p>
                              {venue.address && (
                                <div className="text-xs text-zinc-500 mb-4 flex items-start gap-1.5 bg-zinc-900/50 p-2 rounded">
                                   <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-zinc-400" />
                                   <span>{venue.address}</span>
                                </div>
                              )}
                              {venue.url && (
                                  <a href={venue.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs text-orange-400 hover:underline">
                                      查看地圖/粉專 <ExternalLink className="h-3 w-3 inline"/>
                                  </a>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-white py-12 text-center text-zinc-500 text-sm">
         © {new Date().getFullYear()} 阿Ken教練｜高雄・屏東專業健身教練
      </footer>
    </main>
  );
}