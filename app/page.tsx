import Link from "next/link";
import Image from "next/image";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react"; 
import {
  CheckCircle2,
  MapPin,
  Instagram,
  Facebook,
  Calendar,
  Users,
  Monitor,
  Dumbbell,
  PlayCircle,
  ChevronDown,
  ArrowRight,
  Info,
  Eye,
  ChevronRight,
  Coins,        // 🆕 新增圖示
  Building2,    // 🆕 新增圖示
  ExternalLink, // 🆕 新增圖示
  Navigation    // 🆕 新增圖示
} from "lucide-react";

// --- 1. Sanity 設定 ---
const client = createClient({
  // ✅ 改成環境變數，並加上 ?? "" 防止紅字
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
});

// --- 2. 資料介面定義 ---
interface ProfileData {
  bio: any[]; 
  portraitUrl: string;
  certifications: string[];
  experience: string[];
  achievements: string[];
  specialties: string[];
}

interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImageUrl?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImageUrl?: string;
  publishedAt: string;
}

interface Testimonial {
  studentName: string;
  program: string;
  content: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}

// 🆕 新增介面：場地與價格
interface Venue {
  area: string;
  name: string;
  address?: string;
  description?: string;
  url?: string;
}

interface Pricing {
  title: string;
  price: string;
  unit?: string;
}

// --- 3. 抓取資料 (融合版) ---
async function getAllData() {
  try {
    const query = `{
      "profile": *[_type == "profile"][0] {
        bio,
        "portraitUrl": portrait.asset->url,
        certifications,
        experience,
        achievements,
        specialties
      },
      "homepage": *[_type == "homepage"][0] {
        heroTitle,
        heroSubtitle,
        heroDescription,
        "heroImageUrl": heroImage.asset->url
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
    
    // ✅ 加上 no-store
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Fetch error:", error);
    return {};
  }
}

export default async function Home() {
  const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";
  
  // 獲取所有資料
  const data = await getAllData() as any; // 暫時用 any 避免型別報錯
  
  const profile = data?.profile || {};
  const homepage = data?.homepage || {};
  const posts = data?.posts || [];
  const testimonials = data?.testimonials || [];
  // 🆕 新增變數
  const venues = data?.venues || [];
  const pricing = data?.pricing || [];

  // --- 資料防呆處理 ---
  const heroTitle = homepage?.heroTitle || "阿Ken教練";
  const heroSubtitle = homepage?.heroSubtitle || "高雄・屏東專業健身教練";
  const heroDesc = homepage?.heroDescription || "從零開始也可以，陪你用安全、有效的訓練，慢慢養成穩定運動習慣。";
  const heroBg = homepage?.heroImageUrl; 

  const certifications = (profile?.certifications && profile.certifications.length > 0) ? profile.certifications : ["後台尚未輸入證照資料..."];
  const experience = (profile?.experience && profile.experience.length > 0) ? profile.experience : ["後台尚未輸入經歷資料..."];
  const achievements = (profile?.achievements && profile.achievements.length > 0) ? profile.achievements : ["後台尚未輸入成績資料..."];
  const portrait = profile?.portraitUrl; 

  // 🆕 場地分組邏輯 (這是讓它可以縮放分類的關鍵)
  const groupedVenues = (venues || []).reduce((acc: any, venue: any) => {
    const area = venue.area || "其他地區";
    if (!acc[area]) acc[area] = [];
    acc[area].push(venue);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* --- Hero Section --- */}
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
                <a className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-base font-medium text-white hover:bg-white/20 transition-colors" href="#services">
                  看服務內容
                </a>
              </div>
              
              <div className="flex flex-col gap-1 text-sm text-zinc-300 pt-2">
                 <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 服務地區：高雄 / 屏東</div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-zinc-100 bg-white/95 backdrop-blur-sm p-6 shadow-xl shadow-zinc-900/20">
                  <div className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900"><CheckCircle2 className="h-5 w-5 text-green-600" /> 適合對象</div>
                  <ul className="space-y-6">
                    {[
                      {
                        icon: "🏃",
                        title: "想提升表現的你",
                        desc: "傳承運動員訓練思維，帶你突破卡關瓶頸"
                      },
                      {
                        icon: "💼",
                        title: "久坐少動的你",
                        desc: "擺脫痠痛僵硬，找回挺拔輕鬆的身體"
                      },
                      {
                        icon: "🐣",
                        title: "毫無經驗的你",
                        desc: "不需擔心害怕，我會手把手帶你從零開始"
                      },
                      {
                        icon: "🔋",
                        title: "想找回體力的你",
                        desc: "建立可持續的習慣，重新啟動身體能量"
                      },
                      {
                        icon: "🌳",
                        title: "重視健康的長輩",
                        desc: "增強肌力與平衡，享受自在的樂齡生活"
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        {/* 左邊：圖示 (固定寬度，不會被擠壓) */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl shadow-sm border border-orange-100">
                          {item.icon}
                        </div>
                        
                        {/* 右邊：文字 (標題加粗，說明文自動換行對齊) */}
                        <div className="pt-0.5">
                          <h4 className="font-bold text-zinc-900 text-lg mb-1">
                            {item.title}
                          </h4>
                          <p className="text-zinc-600 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* --- 學員見證區 (移除標籤版) --- */}
      {testimonials && testimonials.length > 0 && (
        <section id="testimonials" className="py-20 bg-zinc-50 border-b">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">學員</h2>
              <p className="text-zinc-600">真實的改變，從這裡開始</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((item:any, i:number) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-zinc-100 flex flex-col">
                  <div className="flex h-48 w-full">
                    {/* 左邊圖片 (已移除 Before 標籤) */}
                    {item.beforeImageUrl ? (
                      <div className="relative w-1/2 bg-zinc-200">
                        <Image src={item.beforeImageUrl} alt="Before" fill className="object-cover" />
                      </div>
                    ) : <div className="w-1/2 bg-zinc-200 flex items-center justify-center text-xs text-zinc-400">無圖片</div>}
                    
                    {/* 右邊圖片 (已移除 After 標籤) */}
                    {item.afterImageUrl ? (
                      <div className="relative w-1/2 bg-zinc-200">
                        <Image src={item.afterImageUrl} alt="After" fill className="object-cover" />
                      </div>
                    ) : <div className="w-1/2 bg-zinc-200 flex items-center justify-center text-xs text-zinc-400">無圖片</div>}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="font-bold text-lg">{item.studentName}</div>
                      <span className="text-xs bg-zinc-100 px-2 py-1 rounded-full text-zinc-600">{item.program}</span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed line-clamp-4 flex-1">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}     

      {/* --- About Section --- */}
      <section id="about" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="md:flex md:gap-12">
             <div className="md:w-1/3 mb-8 md:mb-0">
                <div className="relative aspect-[3/4] w-full rounded-2xl bg-zinc-200 overflow-hidden shadow-lg">
                    {portrait ? (<Image src={portrait} alt="阿Ken教練形象照" fill className="object-cover"/>) : (<div className="flex h-full w-full items-center justify-center text-zinc-400"><span className="text-sm text-center">請至後台<br/>上傳形象照</span></div>)}
                </div>
             </div>
             
             <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">關於我</h2>
                <div className="space-y-4 text-zinc-700 text-lg leading-relaxed">
                    {profile?.bio ? <PortableText value={profile.bio} /> : <p>資料讀取中，或請至後台填寫自我介紹...</p>}
                </div>

                <div className="mt-10 rounded-xl border bg-white shadow-sm overflow-hidden">
                    <details className="group" open>
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
                        <span>查看完整簡歷（證照 / 經歷 / 成績）</span>
                        <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                    </summary>

                    <div className="border-t px-5 pb-8 pt-4">
                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800"><CheckCircle2 className="w-5 h-5 text-orange-600"/> 專業證照 Certifications</h3>
                                <ul className="grid gap-2 md:grid-cols-2 list-disc pl-4 text-sm text-zinc-600">{certifications.map((item:any, index:number) => <li key={index}>{item}</li>)}</ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800"><Users className="w-5 h-5 text-blue-600"/> 經歷 Experience</h3>
                                <ul className="grid gap-2 md:grid-cols-2 list-disc pl-4 text-sm text-zinc-600">{experience.map((item:any, index:number) => <li key={index}>{item}</li>)}</ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800"><Dumbbell className="w-5 h-5 text-zinc-700"/> 競技成績 Achievements</h3>
                                <ul className="space-y-1 list-disc pl-4 text-sm text-zinc-600">{achievements.map((item:any, index:number) => <li key={index}>{item}</li>)}</ul>
                            </div>
                        </div>
                    </div>
                    </details>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">服務</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Users className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">一對一私人教練課</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">高雄/ 屏東實體授課。動作拆解、循序漸進、以安全與可持續為核心。</p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Dumbbell className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">小團體訓練（2–4人）</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">親友一起練更有動力。適合新手入門、基礎體能與動作品質建立。</p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Monitor className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold">線上諮詢＋客製化課表</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">適合已有運動習慣但需要更有效規劃的人。可搭配影片回饋與調整。</p>
          </div>
        </div>

        {/* 🆕 動態價目表 (插入在服務之後) */}
        {pricing && pricing.length > 0 && (
            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-6 md:p-8 shadow-sm mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Coins className="h-6 w-6 text-zinc-700"/> 詳細價目表</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 text-zinc-500 text-sm"><th className="py-3 px-2 font-medium">方案名稱</th><th className="py-3 px-2 font-medium">價格</th><th className="py-3 px-2 font-medium">說明</th></tr>
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

      {/* 🆕 合作場館區 (可縮放 Accordion 版) */}
      {venues && venues.length > 0 && (
          <section id="locations" className="py-20 bg-zinc-900 text-white">
            <div className="mx-auto max-w-5xl px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">合作場館</h2>
                <div className="space-y-4">
                  {/* 把分組好的資料印出來 */}
                  {Object.entries(groupedVenues).map(([area, areaVenues]: [string, any]) => (
                    <details key={area} className="group border border-zinc-700 rounded-xl bg-zinc-800/30 overflow-hidden">
                      {/* 標題列：顯示地區 + 數量 (點這裡展開) */}
                      <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-zinc-800 transition-colors list-none">
                        <div className="flex items-center gap-4">
                           <h3 className="text-xl font-bold border-l-4 border-orange-600 pl-3 text-zinc-100">{area}</h3>
                           <span className="text-xs bg-zinc-700 px-3 py-1 rounded-full text-zinc-300">
                             {areaVenues.length} 間
                           </span>
                        </div>
                        {/* 箭頭圖示 */}
                        <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                      </summary>
                      
                      {/* 展開後的內容 */}
                      <div className="p-6 pt-0 border-t border-zinc-700/50">
                          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {areaVenues.map((v:any, i:number) => (
                              <div key={i} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-orange-500/50 transition-colors">
                                  <h3 className="text-lg font-bold mb-2">{v.name}</h3>
                                  <p className="text-zinc-400 text-sm mb-4">{v.description || "歡迎預約"}</p>
                                  {v.address && (
                                    <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                                      <MapPin className="h-3 w-3"/>{v.address}
                                    </div>
                                  )}
                                  {v.url && (
                                    <a href={v.url} target="_blank" className="text-xs text-orange-400 hover:underline flex gap-1 items-center">
                                      查看地圖 <ArrowRight className="h-3 w-3"/>
                                    </a>
                                  )}
                              </div>
                            ))}
                          </div>
                      </div>
                    </details>
                  ))}
                </div>
            </div>
          </section>
      )}

      {/* --- 部落格專區 --- */}
      {posts && posts.length > 0 && (
        <section className="py-20 bg-white border-t border-zinc-100">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex items-end justify-between mb-10">
              <div><h2 className="text-3xl font-bold mb-2">教練專欄</h2><p className="text-zinc-600">最新知識分享</p></div>
              <Link href="/blog" className="hidden md:flex items-center gap-1 text-orange-600 font-bold hover:gap-2 transition-all">
                看所有文章 <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post:any) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group cursor-pointer">
                  <div className="bg-zinc-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col border border-zinc-100">
                    <div className="relative aspect-video w-full bg-zinc-200 overflow-hidden">
                       {post.mainImageUrl ? (
                         <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                       ) : (
                         <div className="flex items-center justify-center h-full text-zinc-400"><Dumbbell className="h-8 w-8"/></div>
                       )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">{post.title}</h3>
                      <div className="mt-auto pt-4 flex items-center text-sm font-medium text-orange-600">閱讀更多 <ChevronRight className="h-4 w-4"/></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Media Section --- */}
      <section id="media" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row gap-10">
             <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <PlayCircle className="h-6 w-6"/> YouTube 精選影片
                </h2>
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
                <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/ccMlUs1t0-E"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                </div>
             </div>

             <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">影片與社群</h2>
                <div className="space-y-3">
                    <a className="flex items-center gap-4 rounded-xl bg-white border border-zinc-200 px-5 py-4 transition-all hover:bg-white hover:shadow-md hover:border-pink-200 group" href="https://www.instagram.com/trainingken12/" target="_blank" rel="noopener">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 group-hover:bg-pink-100"><Instagram className="h-5 w-5" /></div>
                        <div className="font-medium text-zinc-900">Instagram 連結</div>
                    </a>
                    <a className="flex items-center gap-4 rounded-xl bg-white border border-zinc-200 px-5 py-4 transition-all hover:bg-white hover:shadow-md hover:border-blue-200 group" href="https://www.facebook.com/profile.php?id=100064015244172" target="_blank" rel="noopener">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100"><Facebook className="h-5 w-5" /></div>
                        <div className="font-medium text-zinc-900">Facebook 粉專連結</div>
                    </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-sm text-zinc-500">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-4 max-w-sm">
                <div className="font-bold text-zinc-900 text-lg">© {new Date().getFullYear()} 阿Ken教練｜高雄・屏東專業健身教練</div>
                <a className="hover:underline text-zinc-900 font-medium" href={bookingUrl} target="_blank" rel="noopener">填寫表單預約課程</a>
            </div>
            {/* ✅ 這裡！您最在意的服務範圍區塊，我100%保留了！ */}
            <div className="flex flex-col gap-2 bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                <h4 className="font-bold text-zinc-900">服務範圍｜Service Area</h4>
                <p>高雄（鳳山、三民、左營、鼓山等）與屏東地區皆可安排一對一私人教練課、小團體訓練；也提供線上諮詢與課表規劃。</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}