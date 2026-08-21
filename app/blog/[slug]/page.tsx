import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentProps, ReactNode } from "react";
import { notFound } from "next/navigation";
import { createClient } from "next-sanity";
import { PortableText, type PortableTextComponents } from "@portabletext/react"; 
import { Calendar, ArrowLeft, Home } from "lucide-react";

// 1. Sanity 連線
const client = createClient({
  projectId: "4z692qnu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const siteUrl = "https://coach-ken.vercel.app";

type BlogPost = {
  title?: string;
  publishedAt?: string;
  mainImageUrl?: string;
  excerpt?: string;
  body?: ComponentProps<typeof PortableText>["value"];
};

function buildPostDescription(post?: BlogPost | null) {
  const fallback =
    "阿Ken教練 施柏瑋分享健身訓練、動作品質、增肌減脂與運動習慣建立的專業文章。";
  const excerpt = post?.excerpt?.replace(/\s+/g, " ").trim();

  if (!excerpt) return fallback;
  return excerpt.length > 155 ? `${excerpt.slice(0, 152)}...` : excerpt;
}

// 2. 抓取單篇文章資料
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..155], ""),
    body
  }`;
  
  const post = await client.fetch<BlogPost | null>(query, { slug }, { cache: 'no-store' });
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  const postTitle = post.title || "教練專欄";
  const title = `${postTitle} | 阿Ken教練 施柏瑋`;
  const description = buildPostDescription(post);
  const url = `${siteUrl}/blog/${slug}`;
  const images = post.mainImageUrl
    ? [
        {
          url: post.mainImageUrl,
          alt: post.title || "阿Ken教練 施柏瑋文章圖片",
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "阿Ken教練 施柏瑋",
      type: "article",
      locale: "zh_TW",
      publishedTime: post.publishedAt,
      authors: ["阿Ken教練 施柏瑋"],
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: post.mainImageUrl ? [post.mainImageUrl] : undefined,
    },
  };
}

// 3. 設定 PortableText 的樣式 (讓文章內的圖片和標題好看一點)
type SanityInlineImage = {
  asset?: {
    _ref?: string;
  };
};

function portableImageUrl(value: SanityInlineImage) {
  const refParts = value.asset?._ref?.split("-");
  if (!refParts || refParts.length < 4) return null;

  return `https://cdn.sanity.io/images/4z692qnu/production/${refParts[1]}-${refParts[2]}.${refParts[3]}`;
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = portableImageUrl(value as SanityInlineImage);
      if (!imageUrl) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt="文章圖片"
            className="object-cover w-full h-full"
          />
        </div>
      );
    }
  },
  block: {
    h2: ({children}: { children?: ReactNode }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-800 border-l-4 border-orange-500 pl-3">{children}</h2>,
    h3: ({children}: { children?: ReactNode }) => <h3 className="text-xl font-bold mt-6 mb-3 text-zinc-800">{children}</h3>,
    normal: ({children}: { children?: ReactNode }) => <p className="mb-4 leading-relaxed text-zinc-700">{children}</p>,
    blockquote: ({children}: { children?: ReactNode }) => <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-4 bg-zinc-50 p-4 rounded-r-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: { children?: ReactNode }) => <ul className="list-disc ml-5 space-y-2 mb-4 text-zinc-700">{children}</ul>,
    number: ({children}: { children?: ReactNode }) => <ol className="list-decimal ml-5 space-y-2 mb-4 text-zinc-700">{children}</ol>,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ 需要 await params
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound(); // 如果找不到文章，顯示 404
  }

  const postTitle = post.title || "教練專欄";
  const postBody = post.body;

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* 頂部 Hero 圖片區 */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-zinc-900">
        {post.mainImageUrl ? (
            <>
                <Image 
                    src={post.mainImageUrl} 
                    alt={postTitle} 
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
                    {postTitle}
                </h1>
                <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <Calendar className="h-4 w-4"/>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '近期發布'}
                    <span className="mx-2">|</span>
                    <span>阿Ken教練 施柏瑋</span>
                </div>
            </div>
        </div>
      </div>

      {/* 文章內文區 */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="prose prose-lg prose-zinc max-w-none">
            {/* 這裡把後台的內容轉換成 HTML */}
            {postBody ? (
              <PortableText value={postBody} components={ptComponents} />
            ) : (
              <p className="text-zinc-600">文章內容整理中。</p>
            )}
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
