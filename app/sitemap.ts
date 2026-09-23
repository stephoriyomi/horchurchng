import type { MetadataRoute } from "next";
import { getSermons, getEvents, getBlogPosts } from "@/lib/content";
import ministries from "@/config/ministries.json";
import site from "@/config/site.json";

const base = site.url;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: base, priority: 1.0, changeFrequency: "weekly" },
  { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${base}/visit`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${base}/watch`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${base}/ministries`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${base}/events`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${base}/blog`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${base}/give`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${base}/prayer-request`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${base}/new`, priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sermonRoutes: MetadataRoute.Sitemap = getSermons().map((s) => ({
    url: `${base}/sermons/${s.slug}`,
    lastModified: new Date(s.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = getEvents().map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const ministryRoutes: MetadataRoute.Sitemap = ministries.map((m) => ({
    url: `${base}/ministries/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...sermonRoutes,
    ...eventRoutes,
    ...blogRoutes,
    ...ministryRoutes,
  ];
}
