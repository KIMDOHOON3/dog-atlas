import type { MetadataRoute } from "next";
import { breedNameStories } from "@/content/breed-name-stories";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import { resolveSiteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl().origin;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/discover`, changeFrequency: "weekly", priority: 0.9 },
    ...breeds.map((breed) => ({ url: `${base}/breeds/${breed.slug}`, changeFrequency: "monthly" as const, priority: breed.slug === "japanese-spitz" ? 0.9 : 0.7 })),
    ...breedNameStories.map((story) => ({ url: `${base}/breed-names/${story.key}`, changeFrequency: "monthly" as const, priority: 0.65 })),
    ...homeCuriosityThemes.map((theme) => ({ url: `${base}/curiosity/${theme.key}`, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
