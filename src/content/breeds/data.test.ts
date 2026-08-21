import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { behaviorContextSources, breeds, getBreed, getRelatedBreeds } from "./data";

function publicAssetExists(publicPath: string) {
  return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}

describe("breed content", () => {
  it("loads the 376 currently published schema-validated MVP entries", () => {
    expect(breeds).toHaveLength(376);
    expect(breeds.every((breed) => breed.contentStatus === "mvp-editorial-draft")).toBe(true);
  });

  it("resolves every related breed", () => {
    for (const breed of breeds) {
      expect(breed.related.length, breed.slug).toBeGreaterThan(0);
      expect(breed.related.every((relation) => getBreed(relation.slug)), breed.slug).toBe(true);
      expect(getRelatedBreeds(breed), breed.slug).toHaveLength(Math.max(4, breed.related.length));
    }
  });

  it("provides a dedicated history illustration for every breed", () => {
    for (const breed of breeds) {
      expect(breed.historyVisual?.src).toBe(`/illustrations/v3/${breed.slug}-history.webp`);
      expect(breed.historyVisual?.alt).toContain("편집");
    }
  });

  it("keeps every published card and history image reference on disk", () => {
    for (const breed of breeds) {
      expect(publicAssetExists(breed.illustration), `${breed.slug} card`).toBe(true);
      expect(publicAssetExists(breed.historyVisual!.src), `${breed.slug} history`).toBe(true);
    }
  });

  it("provides role-to-present behavior context without individual guarantees", () => {
    for (const breed of breeds) {
      expect(breed.behaviorClues.originalRole.length).toBeGreaterThan(20);
      expect(breed.behaviorClues.today.length).toBeGreaterThan(20);
      expect(breed.behaviorClues.guardianContext.length).toBeGreaterThan(20);
    }
    expect(behaviorContextSources).toHaveLength(4);
  });

  it("keeps source URLs secure and only shares an FCI standard across explicit varieties", () => {
    const fciUrls = new Map<string, string[]>();

    for (const breed of breeds) {
      for (const source of breed.sources) {
        expect(source.url, `${breed.slug} source`).toMatch(/^https:\/\//);
        if (source.organization !== "Fédération Cynologique Internationale") continue;
        const fileName = new URL(source.url).pathname.split("/").at(-1) ?? "";
        if (/^\d+-/u.test(fileName)) continue;
        fciUrls.set(source.url, [...(fciUrls.get(source.url) ?? []), breed.slug]);
      }
    }

    const duplicates = [...fciUrls.entries()].filter(([, slugs]) => slugs.length > 1);
    expect(duplicates).toEqual([[
      "https://www.fci.be/en/nomenclature/BELGIAN-SHEPHERD-DOG-15.html",
      ["belgian-groenendael", "belgian-laekenois", "belgian-malinois", "belgian-tervueren"],
    ]]);
  });

  it("finds the Japanese Spitz detail entry", () => {
    expect(getBreed("japanese-spitz")?.nameKo).toBe("재패니즈 스피츠");
  });

  it("limits the hidden history pilot to Poodle", () => {
    expect(breeds.filter((breed) => breed.historyVisibility === "hidden").map((breed) => breed.slug))
      .toEqual(["poodle"]);
  });
});
