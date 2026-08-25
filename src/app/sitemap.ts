import type { MetadataRoute } from "next";

const SITE_URL = "https://edenagency.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/douala", priority: 0.9, changeFrequency: "weekly" },
    { path: "/yaounde", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/comment-ca-marche", priority: 0.7, changeFrequency: "monthly" },
    { path: "/demande", priority: 0.8, changeFrequency: "monthly" },
    { path: "/postuler", priority: 0.8, changeFrequency: "monthly" },
    { path: "/temoignages", priority: 0.6, changeFrequency: "weekly" },
    { path: "/a-propos", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" },
    { path: "/conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
