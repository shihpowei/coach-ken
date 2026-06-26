<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react"; 
import { Calendar, ArrowLeft, Home } from "lucide-react";

// 1. Sanity 連線
const client = createClient({
  projectId: "4z692qnu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// 2. 抓取單篇文章資料
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    body
  }`;
  
  const post = await client.fetch(query, { slug }, { cache: 'no-store' });
  return post;
}

// 3. 設定 PortableText 的樣式 (讓文章內的圖片和標題好看一點)
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden">
          <img
            src={`https://cdn.sanity.io/images/4z692qnu/production/${value.asset._ref.split('-')[1]}-${value.asset._ref.split('-')[2]}.${value.asset._ref.split('-')[3]}`}
            alt="文章圖片"
            className="object-cover w-full h-full"
          />
        </div>
      );
    }
  },
  block: {
    h2: ({children}: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-800 border-l-4 border-orange-500 pl-3">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-zinc-800">{children}</h3>,
    normal: ({children}: any) => <p className="mb-4 leading-relaxed text-zinc-700">{children}</p>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-4 bg-zinc-50 p-4 rounded-r-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc ml-5 space-y-2 mb-4 text-zinc-700">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal ml-5 space-y-2 mb-4 text-zinc-700">{children}</ol>,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ 需要 await params
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound(); // 如果找不到文章，顯示 404
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* 頂部 Hero 圖片區 */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-zinc-900">
        {post.mainImageUrl ? (
            <>
                <Image 
                    src={post.mainImageUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </>
        ) : <div className="absolute inset-0 bg-zinc-800"></div>}

        {/* 文章標題 (壓在圖片上) */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="mx-auto max-w-3xl">
                <Link href="/blog" className="inline-flex items-center gap-1 text-zinc-300 hover:text-white mb-4 text-sm font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4"/> 回文章列表
                </Link>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 text-shadow-sm">
                    {post.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <Calendar className="h-4 w-4"/>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '近期發布'}
                    <span className="mx-2">|</span>
                    <span>Ken 教練</span>
                </div>
            </div>
        </div>
      </div>

      {/* 文章內文區 */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="prose prose-lg prose-zinc max-w-none">
            {/* 這裡把後台的內容轉換成 HTML */}
            <PortableText value={post.body} components={ptComponents} />
        </div>

        {/* 底部導航 */}
        <div className="mt-16 pt-8 border-t flex justify-between items-center">
            <Link href="/blog" className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 font-bold transition-colors">
                <ArrowLeft className="h-4 w-4"/> 看更多文章
            </Link>
            <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                <Home className="h-4 w-4"/> 回首頁
            </Link>
        </div>
      </div>

    </article>
  );
}
=======
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {ArrowLeft, Dumbbell} from 'lucide-react'
import {fallbackPosts, getPost} from '../../lib/posts'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return fallbackPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params
  const post = await getPost(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title}｜阿Ken教練`,
    description: post.excerpt,
    alternates: {
      canonical: `https://coach-ken.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: post.coverImageUrl ? [{url: post.coverImageUrl}] : undefined,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {slug} = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.coverImageUrl,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Person',
              name: '阿Ken教練',
            },
            publisher: {
              '@type': 'Organization',
              name: '阿Ken教練',
            },
            mainEntityOfPage: `https://coach-ken.vercel.app/blog/${post.slug}`,
          }),
        }}
      />

      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Dumbbell className="h-6 w-6" />
            阿Ken教練
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-bold transition-colors hover:bg-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            回專欄
          </Link>
        </div>
      </header>

      <article>
        <section className="border-b bg-zinc-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            {post.category ? (
              <div className="mb-4 text-sm font-bold uppercase tracking-wider text-orange-600">
                {post.category}
              </div>
            ) : null}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-5 text-lg leading-relaxed text-zinc-600">{post.excerpt}</p>
            ) : null}
          </div>
        </section>

        {post.coverImageUrl ? (
          <div className="mx-auto max-w-5xl px-4 pt-10">
            <div className="relative aspect-video overflow-hidden bg-zinc-100">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        ) : null}

        <section className="mx-auto max-w-3xl px-4 py-12">
          <div className="space-y-6 text-lg leading-8 text-zinc-700">
            {post.body ? <PortableText value={post.body} /> : null}
          </div>
        </section>
      </article>
    </main>
  )
}
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
