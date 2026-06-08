import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.nameEn,
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    lang: "he",
    dir: "rtl",
    background_color: "#f4f1ec",
    theme_color: "#0f1b2d",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
