import { afterEach, describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { breeds } from "@/content/breeds/data";
import { breedNameStories } from "@/content/breed-name-stories";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import sitemap from "@/app/sitemap";
import { generateMetadata as breedMetadata } from "@/app/breeds/[slug]/page";
import { generateMetadata as nameMetadata } from "@/app/breed-names/[key]/page";
import { generateMetadata as themeMetadata } from "@/app/curiosity/[key]/page";
import { generateMetadata as guideMetadata } from "@/app/beginner-guide/page";
import { createPageMetadata, DEFAULT_SHARE_IMAGE, resolveSiteUrl, SITE_NAME } from "./site-metadata";

afterEach(() => vi.unstubAllEnvs());

describe("site origin", () => {
  it("uses explicit production origin before Vercel fallback", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: " https://dogs.example/ ", VERCEL_PROJECT_PRODUCTION_URL: "other.example" }).origin).toBe("https://dogs.example");
  });
  it("supports Vercel and local defaults", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "dogs.vercel.app" }).origin).toBe("https://dogs.vercel.app");
    expect(resolveSiteUrl({}).origin).toBe("http://localhost:3000");
  });
  it.each(["ftp://dogs.example", "https://user:secret@dogs.example", "https://dogs.example/path", "https://dogs.example?query=1", "https://dogs.example#hash"])("rejects invalid site origin %s", (value) => {
    expect(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: value })).toThrow();
  });
});

describe("page sharing and canonical metadata", () => {
  it("builds absolute URLs and preserves page identity", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://dogs.example");
    const result = createPageMetadata({ title: "견종 발견", description: "설명", path: "/discover" });
    expect(result.alternates?.canonical).toBe("https://dogs.example/discover");
    expect(result.openGraph).toMatchObject({ title: `견종 발견 | ${SITE_NAME}`, url: "https://dogs.example/discover", images: [{ url: `https://dogs.example${DEFAULT_SHARE_IMAGE}` }] });
    expect(result.twitter).toMatchObject({ card: "summary_large_image", title: `견종 발견 | ${SITE_NAME}` });
    expect(createPageMetadata({ title: SITE_NAME, description: "설명", path: "/" }).title).toEqual({ absolute: SITE_NAME });
  });

  it("includes all 390 canonical routes once in the sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://dogs.example");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(390);
    expect(new Set(urls).size).toBe(390);
    expect(urls).toContain("https://dogs.example/discover");
    expect(urls.every((url) => url.startsWith("https://dogs.example") && !url.includes("?"))).toBe(true);
    expect(urls.some((url) => url.includes("belgian-shepherd-dog"))).toBe(false);
  });

  it("gives every breed and menu detail its own canonical and existing share image", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://dogs.example");
    const cases = [
      ...breeds.map((breed) => ({ path: `/breeds/${breed.slug}`, result: breedMetadata({ params: Promise.resolve({ slug: breed.slug }) }) })),
      ...breedNameStories.map((story) => ({ path: `/breed-names/${story.key}`, result: nameMetadata({ params: Promise.resolve({ key: story.key }) }) })),
      ...homeCuriosityThemes.map((theme) => ({ path: `/curiosity/${theme.key}`, result: themeMetadata({ params: Promise.resolve({ key: theme.key }) }) })),
    ];
    expect(cases).toHaveLength(388);
    for (const entry of cases) {
      const result = await entry.result;
      expect(result.alternates?.canonical, entry.path).toBe(`https://dogs.example${entry.path}`);
      expect(result.openGraph?.title, entry.path).toBeTruthy();
      const images = result.openGraph?.images as Array<{ url: string }>;
      expect(images).toHaveLength(1);
      expect(existsSync(join(process.cwd(), "public", new URL(images[0].url).pathname)), entry.path).toBe(true);
    }
  });

  it("preserves breed-specific guide queries and skips invalid guides", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://dogs.example");
    const result = await guideMetadata({ searchParams: Promise.resolve({ breed: "poodle" }) });
    expect(result.alternates?.canonical).toBe("https://dogs.example/beginner-guide?breed=poodle");
    expect(result.title).toBe("푸들 맞이 준비 가이드");
    expect(await guideMetadata({ searchParams: Promise.resolve({ breed: "invalid" }) })).toEqual({});
    expect(await guideMetadata({ searchParams: Promise.resolve({ breed: ["poodle", "bulldog"] }) })).toEqual({});
  });
});
