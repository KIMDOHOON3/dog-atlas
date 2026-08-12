import type { MetadataRoute } from "next";
import { breedNameStories } from "@/content/breed-name-stories";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/breed-names`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/curiosity`, changeFrequency: "monthly", priority: 0.8 },
    ...breeds.map((breed) => ({ url: `${base}/breeds/${breed.slug}`, changeFrequency: "monthly" as const, priority: breed.slug === "japanese-spitz" ? 0.9 : 0.7 })),
    ...breedNameStories.map((story) => ({ url: `${base}/breed-names/${story.key}`, changeFrequency: "monthly" as const, priority: 0.65 })),
    ...homeCuriosityThemes.map((theme) => ({ url: `${base}/curiosity/${theme.key}`, changeFrequency: "monthly" as const, priority: 0.65 })),
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
