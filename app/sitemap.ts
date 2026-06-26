import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coach-ken.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/kaohsiung-personal-trainer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pingtung-personal-trainer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/beginner-training`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/senior-strength-training-first-step`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/blog/what-are-the-dietary-guidelines-for-americans`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
