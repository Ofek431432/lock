import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { serviceAreas, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/areas", "/about", "/contact", "/articles"].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const areaRoutes = serviceAreas.map((area) => ({
    url: `${siteConfig.domain}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteConfig.domain}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...areaRoutes, ...articleRoutes];
}
