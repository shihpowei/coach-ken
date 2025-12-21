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
  Info
} from "lucide-react";

// --- 1. Sanity 設定 (已幫您填好 ID) ---
const client = createClient({
  projectId: "4z692qnu", // 👈 您的專屬 ID 已經填好在這裡了
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

// --- 3. 抓取資料 ---
async function getAllData() {
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
    }
  }`;
  
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function Home() {
  const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";
  
  // 獲取所有資料
  const { profile, homepage } = await getAllData() as { profile: ProfileData, homepage: HomepageData };

  // --- 資料防呆處理 (如果後台沒填，顯示預設值) ---
  const heroTitle = homepage?.heroTitle || "阿Ken教練";
  const heroSubtitle = homepage?.heroSubtitle || "高雄・屏東專業健身教練";
  const heroDesc = homepage?.heroDescription || "從零開始也可以，陪你用安全、有效的訓練，慢慢養成穩定運動習慣。";
  const heroBg = homepage?.heroImageUrl; 

  const certifications = profile?.certifications || ["後台尚未輸入證照資料..."];
  const experience = profile?.experience || ["後台尚未輸入經歷資料..."];
  const achievements = profile?.achievements || ["後台尚未輸入成績資料..."];
  const specialties = profile?.specialties || ["肌力訓練", "增肌減脂"];
  const portrait = profile?.portraitUrl; 

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Dumbbell className="h-6 w-6" />
            {heroTitle}
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a className="hover:text-zinc-900 transition-colors" href="#about">關於我</a>
            <a className="hover:text-zinc-900 transition-colors" href="#services">服務</a>
            <a className="hover:text-zinc-900 transition-colors" href="#media">影片與社群</a>
            <a
              className="rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 transition-all shadow-sm"
              href={bookingUrl}
              target="_blank"
              rel="noopener"
            >
              填寫表單預約課程
            </a>
          </nav>
          
          <a
              className="md:hidden rounded-md bg-zinc-900 px-3 py-2 text-xs text-white"
              href={bookingUrl}
              target="_blank"
              rel="noopener"
            >
              預約
          </a>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
            {heroBg ? (
                <>
                  <Image 
                    src={heroBg} 
                    alt="Hero Background" 
                    fill 
                    className="object-cover object-center" 
                    priority 
                  />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                </>
            ) : (
                <div className="w-full h-full bg-zinc-900"></div>
            )}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 h-full">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-white drop-shadow-md">
                {heroTitle}<br/>
                <span className="text-zinc-200 text-2xl md:text-4xl block mt-2">{heroSubtitle}</span>
              </h1>
              <p className="text-lg leading-relaxed text-zinc-100 drop-shadow-sm">
                {heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-bold text-zinc-900 shadow-lg hover:bg-zinc-100 hover:scale-105 transition-all"
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener"
                >
                  填寫表單預約課程 <ArrowRight className="h-4 w-4"/>
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-base font-medium text-white hover:bg-white/20 transition-colors"
                  href="#services"
                >
                  看服務內容
                </a>
              </div>
              
              <div className="flex flex-col gap-1 text-sm text-zinc-300 pt-2">
                 <div className="flex items-center gap-2">
                   <MapPin className="h-4 w-4" /> 服務地區：高雄 / 屏東
                 </div>
                 <div className="text-xs text-zinc-400"></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-zinc-100 bg-white/95 backdrop-blur-sm p-6 shadow-xl shadow-zinc-900/20">
                  <div className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    適合對象
                  </div>
                  <ul className="space-y-3">
                    {[
                      "久坐、常覺得痠痛，但又不太敢自己亂練的上班族",
                      "完全沒有運動基礎、從零開始的新手",
                      "曾經運動過，想重新建立規律與體力的人",
                      "年長者（銀髮族），希望維持活動力、預防退化與跌倒的人"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-600">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
              </div>

               <div className="rounded-2xl bg-zinc-50/95 backdrop-blur-sm p-6 border border-zinc-100">
                  <div className="text-sm font-semibold text-zinc-500 mb-3">主要服務</div>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">1</span>
                      一對一私人教練課（高雄・屏東實體授課）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">2</span>
                      小團體訓練（2–4 人）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">3</span>
                      線上諮詢＋客製化訓練課表
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-zinc-400 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    按「填寫表單預約課程」後會開新分頁，不會離開你的網站。
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="md:flex md:gap-12">
             <div className="md:w-1/3 mb-8 md:mb-0">
                <div className="relative aspect-[3/4] w-full rounded-2xl bg-zinc-200 overflow-hidden shadow-lg">
                    {portrait ? (
                       <Image src={portrait} alt="阿Ken教練形象照" fill className="object-cover"/>
                    ) : (
                       <div className="flex h-full w-full items-center justify-center text-zinc-400">
                          <span className="text-sm text-center">請至後台<br/>上傳形象照</span>
                       </div>
                    )}
                </div>
             </div>
             
             <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">關於我</h2>
                <div className="space-y-4 text-zinc-700 text-lg leading-relaxed">
                    {profile?.bio ? (
                      <PortableText value={profile.bio} />
                    ) : (
                      <p>資料讀取中，或請至後台填寫自我介紹...</p>
                    )}
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
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800">
                                  <CheckCircle2 className="w-5 h-5 text-orange-600"/> 專業證照 Certifications
                                </h3>
                                <ul className="grid gap-2 md:grid-cols-2 list-disc pl-4 text-sm text-zinc-600">
                                    {certifications.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800">
                                  <Users className="w-5 h-5 text-blue-600"/> 經歷 Experience
                                </h3>
                                <ul className="grid gap-2 md:grid-cols-2 list-disc pl-4 text-sm text-zinc-600">
                                    {experience.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800">
                                  <Dumbbell className="w-5 h-5 text-zinc-700"/> 競技成績 Achievements
                                </h3>
                                <ul className="space-y-1 list-disc pl-4 text-sm text-zinc-600">
                                    {achievements.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-bold flex items-center gap-2 text-lg text-zinc-800">
                                  <CheckCircle2 className="w-5 h-5 text-green-600"/> 專長 Specialties
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {specialties.map((item, index) => (
                                        <span key={index} className="px-3 py-1 bg-zinc-100 rounded-full text-sm text-zinc-700 font-medium">{item}</span>
                                    ))}
                                </div>
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

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">一對一私人教練課</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              高雄/ 屏東實體授課。動作拆解、循序漸進、以安全與可持續為核心。
            </p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Dumbbell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">小團體訓練（2–4人）</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              親友一起練更有動力。適合新手入門、基礎體能與動作品質建立。
            </p>
          </div>
          <div className="group rounded-2xl border p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Monitor className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">線上諮詢＋客製化課表</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              適合已有運動習慣但需要更有效規劃的人。可搭配影片回饋與調整。
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between rounded-2xl bg-zinc-900 px-6 py-6 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/10 p-3">
                <MapPin className="h-6 w-6" />
            </div>
            <div>
                <div className="font-bold text-lg">上課地點與方式</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                  <li>高雄、屏東合作中的健身房或訓練工作室</li>
                  <li>你家或公司附近可場租的健身房或工作室</li>
                  <li>兩者都可以，依交通與時段安排</li>
                </ul>
            </div>
          </div>
          <a href={bookingUrl} target="_blank" className="mt-4 md:mt-0 whitespace-nowrap rounded-lg bg-white px-6 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-200 transition-colors">
            填寫表單預約課程
          </a>
        </div>
      </section>

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
                <p className="mb-6 text-zinc-600">
                    你可以先看我平常怎麼教，再決定要不要預約課程。<br/>
                    追蹤我 Follow：
                </p>
                <div className="space-y-3">
                    <a className="flex items-center gap-4 rounded-xl bg-white border border-zinc-200 px-5 py-4 transition-all hover:bg-white hover:shadow-md hover:border-pink-200 group" href="https://www.instagram.com/trainingken12/" target="_blank" rel="noopener">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-600 group-hover:bg-pink-100"><Instagram className="h-5 w-5" /></div>
                        <div className="font-medium text-zinc-900">Instagram 連結</div>
                    </a>
                    <a className="flex items-center gap-4 rounded-xl bg-white border border-zinc-200 px-5 py-4 transition-all hover:bg-white hover:shadow-md hover:border-blue-200 group" href="https://www.facebook.com/profile.php?id=100064015244172" target="_blank" rel="noopener">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100"><Facebook className="h-5 w-5" /></div>
                        <div className="font-medium text-zinc-900">Facebook 粉專連結</div>
                    </a>
                    <a className="flex items-center gap-4 rounded-xl bg-zinc-900 border border-zinc-900 px-5 py-4 transition-all hover:bg-zinc-800 shadow-md group" href={bookingUrl} target="_blank" rel="noopener">
                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"><Calendar className="h-5 w-5" /></div>
                         <div className="font-medium text-white">立即預約：填寫表單預約課程</div>
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