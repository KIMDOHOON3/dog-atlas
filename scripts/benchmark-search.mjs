// Local CPU microbenchmark, not page-load timing. Index construction is measured
// separately because React reuses it until the breed options change.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
const testRequire = createRequire(require.resolve("vitest/package.json"));
const { createServer } = await import(pathToFileURL(testRequire.resolve("vite")).href);
const root = fileURLToPath(new URL("../", import.meta.url));
const server = await createServer({ root, configFile: false, resolve: { alias: { "@": path.join(root, "src") } }, server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true } });
try {
  const { breeds } = await server.ssrLoadModule("/src/content/breeds/data.ts");
  const { getMasterBreed } = await server.ssrLoadModule("/src/content/breeds/master-catalog.ts");
  const { createBreedSearchIndex, normalizeBreedQuery: normalize, searchBreedIndex } = await server.ssrLoadModule("/src/lib/breed-search-index.ts");
  const options = breeds.map(({ slug, nameKo, nameEn, illustration }) => {
    const master = getMasterBreed(slug);
    return { slug, nameKo, nameEn, imageSrc: illustration, aliases: [...(master?.aliasesKo ?? []), ...(master?.aliasesEn ?? [])] };
  });
  function originalSearch(query) {
    return options.map((breed) => {
      const terms = [breed.nameKo, breed.nameEn, ...breed.aliases];
      const matchingAlias = breed.aliases.find((alias) => normalize(alias).includes(query));
      const exact = terms.some((term) => normalize(term) === query);
      const startsWith = terms.some((term) => normalize(term).startsWith(query));
      return { ...breed, matchingAlias, exact, startsWith, matches: terms.some((term) => normalize(term).includes(query)) };
    }).filter((breed) => breed.matches)
      .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.startsWith) - Number(a.startsWith) || a.nameKo.localeCompare(b.nameKo, "ko"))
      .slice(0, 6);
  }
  const indexStart = performance.now();
  const index = createBreedSearchIndex(options);
  const indexBuildMs = performance.now() - indexStart;
  const queries = ["스", "스피츠", "코기", "불독", "골든", "리트리버", "잉글리시", "mastiff", "terrier", "poodle", "samoyed", "없는견종"].map(normalize);
  for (const query of queries) assert.deepEqual(searchBreedIndex(index, query).map((item) => item.slug), originalSearch(query).map((item) => item.slug));
  const rounds = 100;
  function measure(search) {
    const start = performance.now();
    for (let round = 0; round < rounds; round++) for (const query of queries) search(query);
    return performance.now() - start;
  }
  measure(originalSearch);
  measure((query) => searchBreedIndex(index, query));
  const before = [], after = [];
  for (let sample = 0; sample < 7; sample++) {
    if (sample % 2 === 0) { before.push(measure(originalSearch)); after.push(measure((query) => searchBreedIndex(index, query))); }
    else { after.push(measure((query) => searchBreedIndex(index, query))); before.push(measure(originalSearch)); }
  }
  const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
  console.log(JSON.stringify({ breeds: breeds.length, searchesPerSample: rounds * queries.length, samples: 7, indexBuildMs, beforeMedianMs: median(before), afterMedianMs: median(after), before, after }, null, 2));
} finally { await server.close(); }
