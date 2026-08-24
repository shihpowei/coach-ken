import type { MetadataRoute } from "next";
import { createClient } from "next-sanity";

const baseUrl = "https://coach-ken.vercel.app";

const client = createClient({
  projectId: "4z692qnu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

type SitemapPost = {
  slug?: {
    current?: string;
  };
  publishedAt?: string;
  _updatedAt?: string;
};

async function getBlogPostUrls() {
  const posts = await client.fetch<SitemapPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`,
    {},
    { cache: "no-store" }
  );

  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug!.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/kaohsiung-personal-trainer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pingtung-personal-trainer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/beginner-training`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...(await getBlogPostUrls()),
  ];
}
