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
