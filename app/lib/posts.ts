import {createClient} from 'next-sanity'
import type {PortableTextBlock} from '@portabletext/types'

export type PostSummary = {
  title: string
  slug: string
  category?: string
  excerpt?: string
  coverImageUrl?: string
  publishedAt?: string
}

export type PostDetail = PostSummary & {
  body?: PortableTextBlock[]
}

export const fallbackPosts: PostDetail[] = [
  {
    title: '別讓身體生鏽！從「提菜籃」到「六角槓」，銀髮族重獲新生的關鍵一步',
    slug: 'senior-strength-training-first-step',
    category: '銀髮族訓練',
    excerpt:
      '年紀增長不代表只能少動。用安全、循序的肌力訓練，長輩也能重新找回穩定、力量與日常自信。',
    coverImageUrl:
      'https://cdn.sanity.io/images/4z692qnu/production/4a91895d8505d076ea90770c7a4ef2b8108f5a3f-1206x2128.jpg',
    publishedAt: '2026-06-01T00:00:00.000Z',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '銀髮族訓練的目標不是把強度推到極限，而是讓日常生活變得更穩、更安全、更有餘裕。',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '從提菜籃、爬樓梯、起身坐下，到六角槓硬舉與分腿蹲，每一步都可以被拆解、練習並累積。重點是找到適合身體狀況的起點。',
          },
        ],
      },
    ],
  },
  {
    title: '《美國飲食指南》（1）什麼是美國飲食指南',
    slug: 'what-are-the-dietary-guidelines-for-americans',
    category: '飲食營養',
    excerpt:
      '飲食建議不該只剩下少吃或不能吃。先理解大型飲食指南的用途，才能把營養知識轉成可執行的生活選擇。',
    coverImageUrl:
      'https://cdn.sanity.io/images/4z692qnu/production/762ebe4c600e72e5811bf7c8a297c14e1462f38c-1024x559.jpg',
    publishedAt: '2026-06-01T00:00:00.000Z',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '美國飲食指南是一份定期更新的公共健康建議，目標是幫助一般人用更清楚的方向安排日常飲食。',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '對健身與健康管理來說，它不是一份菜單，而是一個理解飲食結構、份量與長期習慣的參考框架。',
          },
        ],
      },
    ],
  },
]

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    title,
    "slug": slug.current,
    category,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    publishedAt
  }`

  const posts = await client.fetch<PostSummary[]>(query, {}, {next: {revalidate: 0}})
  const safePosts = posts?.filter((post) => post.title && post.slug) || []
  return safePosts.length > 0 ? safePosts : fallbackPosts.slice(0, limit)
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    body
  }`

  const post = await client.fetch<PostDetail | null>(query, {slug}, {next: {revalidate: 0}})
  if (post?.title && post.slug) {
    return post
  }

  return fallbackPosts.find((item) => item.slug === slug) || null
}
