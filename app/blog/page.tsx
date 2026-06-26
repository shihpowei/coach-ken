<<<<<<< HEAD
// 檔案：app/blog/page.tsx (大廳：文章列表)
import Link from "next/link";
import Image from "next/image";
import { createClient } from "next-sanity";
import { Calendar, ArrowRight, Home } from "lucide-react";

const client = createClient({
  projectId: "4z692qnu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

export default async function BlogPage() {
  const posts = await getPosts() as any[];

  return (
    <div className="min-h-screen bg-zinc-50 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-4">教練專欄</h1>
            <p className="text-zinc-600 max-w-2xl mx-auto">最新訓練觀念分享。</p>
        </div>
        <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-orange-600 flex items-center gap-1"><Home className="h-4 w-4"/> 首頁</Link>
            <span>/</span>
            <span className="text-zinc-900 font-bold">所有文章</span>
        </div>

        {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group cursor-pointer">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col border border-zinc-100">
                    <div className="relative aspect-video w-full bg-zinc-200 overflow-hidden">
                        {post.mainImageUrl ? (
                            <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : <div className="flex items-center justify-center h-full text-zinc-400 text-sm">暫無圖片</div>}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '近期'}</span>
                        </div>
                        <h2 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 text-zinc-900">{post.title}</h2>
                        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center text-sm font-bold text-orange-600 group-hover:gap-2 transition-all">閱讀全文 <ArrowRight className="h-4 w-4 ml-1"/></div>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        ) : <div className="text-center py-20 text-zinc-400">目前還沒有文章...</div>}
      </div>
    </div>
  );
}
=======
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight, Dumbbell} from 'lucide-react'
import {getPosts} from '../lib/posts'

export const metadata: Metadata = {
  title: '教練專欄｜阿Ken教練',
  description: '阿Ken教練分享新手健身、銀髮族肌力訓練、飲食營養與高雄屏東私人教練課程觀念。',
  alternates: {
    canonical: 'https://coach-ken.vercel.app/blog',
  },
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Dumbbell className="h-6 w-6" />
            阿Ken教練
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-bold transition-colors hover:bg-zinc-100"
          >
            回首頁
          </Link>
        </div>
      </header>

      <section className="border-b bg-zinc-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="max-w-2xl">
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-500">
              Coach Notes
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
              教練專欄
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              整理訓練、飲食、銀髮族肌力與新手健身觀念，讓你在預約課程前也能先建立清楚方向。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden border border-zinc-200 bg-white transition-all hover:border-zinc-400 hover:shadow-lg"
            >
              <div className="relative aspect-video bg-zinc-100">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                ) : null}
              </div>
              <article className="p-6">
                {post.category ? (
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-orange-600">
                    {post.category}
                  </div>
                ) : null}
                <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
                {post.excerpt ? (
                  <p className="mt-3 leading-relaxed text-zinc-600">{post.excerpt}</p>
                ) : null}
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  閱讀文章 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
