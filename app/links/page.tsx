import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "next-sanity";
import {
  ArrowRight,
  BookOpenText,
  CalendarCheck,
  CheckCircle2,
  Dumbbell,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const client = createClient({
  projectId: "4z692qnu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const bookingFromIgUrl =
  "https://forms.gle/MQ3cZCcbwwv6RPXF8?utm_source=instagram&utm_medium=bio&utm_campaign=booking";

export const metadata: Metadata = {
  title: "阿Ken教練連結入口",
  description:
    "阿Ken教練 施柏瑋的預約入口、最新文章、高雄與屏東私人教練資訊。",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "阿Ken教練連結入口 | 施柏瑋",
    description: "預約訓練、閱讀最新文章、了解高雄與屏東私人教練服務。",
    url: "https://coach-ken.vercel.app/links",
    siteName: "阿Ken教練 施柏瑋",
    type: "website",
    locale: "zh_TW",
  },
};

type LinkPost = {
  _id: string;
  title?: string;
  slug?: {
    current?: string;
  };
  publishedAt?: string;
  mainImageUrl?: string;
};

type LinksData = {
  profile?: {
    portraitUrl?: string;
  };
  posts?: LinkPost[];
};

async function getLinksData() {
  const query = `{
    "profile": *[_type == "profile"][0] {
      "portraitUrl": portrait.asset->url
    },
    "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc)[0...4] {
      _id,
      title,
      slug,
      publishedAt,
      "mainImageUrl": mainImage.asset->url
    }
  }`;

  return client.fetch<LinksData>(query, {}, { cache: "no-store" });
}

function formatDate(date?: string) {
  if (!date) return "最新文章";
  return new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
  }).format(new Date(date));
}

export default async function LinksPage() {
  const data = await getLinksData();
  const portraitUrl = data.profile?.portraitUrl;
  const posts = data.posts || [];

  const serviceLinks = [
    {
      title: "高雄私人健身教練",
      desc: "一對一訓練、肌力建立、增肌減脂與動作品質調整。",
      href: "/kaohsiung-personal-trainer",
      icon: MapPin,
    },
    {
      title: "屏東私人健身教練",
      desc: "屏東地區想開始規律訓練，可以先從這裡了解。",
      href: "/pingtung-personal-trainer",
      icon: Dumbbell,
    },
    {
      title: "新手健身入門",
      desc: "第一次健身、不知道怎麼開始，先看這份入門整理。",
      href: "/beginner-training",
      icon: Sparkles,
    },
  ];

  const quickReasons = [
    "第一次健身也能從基礎開始",
    "高雄、屏東可安排一對一訓練",
    "以動作品質、肌力與長期維持為核心",
  ];

  return (
    <main className="min-h-screen bg-[#101312] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-6">
        <div className="flex flex-1 flex-col justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-zinc-800">
              {portraitUrl ? (
                <Image
                  src={portraitUrl}
                  alt="阿Ken教練 施柏瑋"
                  fill
                  priority
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Dumbbell className="h-8 w-8 text-orange-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-[#f7a15d]">
                高雄・屏東私人健身教練
              </p>
              <h1 className="mt-1 text-3xl font-black">
                阿Ken教練 施柏瑋
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                從學開始也可以，陪你用安全、有效的訓練，慢慢養成穩定運動習慣。
              </p>
            </div>
          </div>

          <section className="rounded-lg border border-white/10 bg-white px-5 py-5 text-zinc-950">
            <p className="text-xs font-black uppercase text-[#c95f28]">
              Start Here
            </p>
            <h2 className="mt-2 text-2xl font-black">
              想開始訓練，先填表單，我會再跟你確認適合的方式。
            </h2>
            <div className="mt-4 grid gap-2">
              {quickReasons.map((reason) => (
                <p
                  key={reason}
                  className="flex items-start gap-2 text-sm font-bold leading-relaxed text-zinc-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {reason}
                </p>
              ))}
            </div>
          </section>

          <div className="grid gap-3">
            <a
              href={bookingFromIgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-between rounded-lg bg-[#ec6b2e] px-5 py-4 text-base font-black text-white shadow-lg shadow-black/25 transition hover:bg-[#ff8447]"
            >
              <span className="flex items-center gap-3">
                <CalendarCheck className="h-5 w-5" />
                填寫表單，預約諮詢
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/#testimonials"
              className="flex min-h-14 items-center justify-between rounded-lg border border-white/12 bg-white/8 px-5 py-4 text-base font-bold text-white transition hover:bg-white/12"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-emerald-300" />
                看學員見證
              </span>
              <ArrowRight className="h-5 w-5 text-zinc-400" />
            </Link>
            <Link
              href="/beginner-training"
              className="flex min-h-14 items-center justify-between rounded-lg border border-white/12 bg-white/8 px-5 py-4 text-base font-bold text-white transition hover:bg-white/12"
            >
              <span className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-sky-300" />
                第一次健身先看這篇
              </span>
              <ArrowRight className="h-5 w-5 text-zinc-400" />
            </Link>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold text-zinc-300">
                <BookOpenText className="h-4 w-4 text-orange-300" />
                最新教練專欄
              </h2>
              <Link
                href="/blog"
                className="text-sm font-bold text-[#f7a15d] hover:text-orange-200"
              >
                全部文章
              </Link>
            </div>

            <div className="grid gap-3">
              {posts.length > 0 ? (
                posts.map((post) => {
                  if (!post.slug?.current) return null;

                  return (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="grid min-h-24 grid-cols-[88px_1fr] overflow-hidden rounded-lg border border-white/10 bg-white text-zinc-950 transition hover:translate-y-[-1px] hover:shadow-xl"
                    >
                      <div className="relative bg-zinc-200">
                        {post.mainImageUrl ? (
                          <Image
                            src={post.mainImageUrl}
                            alt={post.title || "教練專欄文章"}
                            fill
                            sizes="88px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <BookOpenText className="h-6 w-6 text-zinc-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center gap-1 px-4 py-3">
                        <p className="text-xs font-bold text-orange-600">
                          {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="line-clamp-2 text-sm font-black leading-snug text-zinc-900">
                          {post.title || "教練專欄"}
                        </h3>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <Link
                  href="/blog"
                  className="rounded-lg border border-white/10 bg-white/8 px-5 py-4 text-sm font-bold text-zinc-200"
                >
                  查看教練專欄
                </Link>
              )}
            </div>
          </section>

          <section className="grid gap-3">
            {serviceLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-20 items-center justify-between rounded-lg border border-white/10 bg-zinc-900 px-5 py-4 transition hover:bg-zinc-800"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-base font-black">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-zinc-400">
                        {item.desc}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="ml-3 h-5 w-5 shrink-0 text-zinc-500" />
                </Link>
              );
            })}
          </section>

          <p className="pb-2 text-center text-xs leading-relaxed text-zinc-500">
            IG 來的朋友可以先從預約表單開始；如果還在觀望，也可以先看文章和學員見證。
          </p>
        </div>
      </section>
    </main>
  );
}
