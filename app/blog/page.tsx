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