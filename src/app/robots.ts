import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl().origin;
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
