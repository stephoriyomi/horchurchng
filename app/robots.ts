import type { MetadataRoute } from "next";
import site from "@/config/site.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/design-system/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
