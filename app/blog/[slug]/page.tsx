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
