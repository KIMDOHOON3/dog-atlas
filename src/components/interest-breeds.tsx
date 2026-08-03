"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const INTEREST_BREEDS_STORAGE_KEY = "dog-atlas:compare-shortlist:v1";
export const MAX_INTEREST_BREEDS = 3;

export type InterestBreedSummary = {
  slug: string;
  nameKo: string;
};

type AddResult = "added" | "limit" | "invalid";

type InterestBreedsContextValue = {
  breeds: InterestBreedSummary[];
  slugs: string[];
  hydrated: boolean;
  add: (slug: string) => AddResult;
  remove: (slug: string) => void;
  replaceAll: (slugs: string[]) => void;
  clear: () => void;
};

const InterestBreedsContext = createContext<InterestBreedsContextValue | null>(null);

function readStoredSlugs(allowedSlugs: Set<string>) {
  try {
    const stored = JSON.parse(localStorage.getItem(INTEREST_BREEDS_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(stored)) return [];

    return [...new Set(stored)]
      .filter((slug): slug is string => typeof slug === "string" && allowedSlugs.has(slug))
      .slice(0, MAX_INTEREST_BREEDS);
  } catch {
    return [];
  }
}

function writeStoredSlugs(slugs: string[]) {
  try {
    localStorage.setItem(INTEREST_BREEDS_STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // The in-memory selection still works when storage is unavailable.
  }
}

export function InterestBreedsProvider({
  breeds,
  children,
}: {
  breeds: InterestBreedSummary[];
  children: ReactNode;
}) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const allowedSlugs = useMemo(() => new Set(breeds.map((breed) => breed.slug)), [breeds]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setSlugs(readStoredSlugs(allowedSlugs));
      setHydrated(true);
    });

    function syncFromAnotherTab(event: StorageEvent) {
      if (event.key === INTEREST_BREEDS_STORAGE_KEY) {
        setSlugs(readStoredSlugs(allowedSlugs));
      }
    }

    window.addEventListener("storage", syncFromAnotherTab);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", syncFromAnotherTab);
    };
  }, [allowedSlugs]);

  const add = useCallback((slug: string): AddResult => {
    if (!allowedSlugs.has(slug)) return "invalid";
    if (slugs.includes(slug)) return "added";
    if (slugs.length >= MAX_INTEREST_BREEDS) return "limit";

    const next = [...slugs, slug];
    setSlugs(next);
    writeStoredSlugs(next);
    return "added";
  }, [allowedSlugs, slugs]);

  const remove = useCallback((slug: string) => {
    const next = slugs.filter((selectedSlug) => selectedSlug !== slug);
    setSlugs(next);
    writeStoredSlugs(next);
  }, [slugs]);

  const replaceAll = useCallback((nextSlugs: string[]) => {
    const next = [...new Set(nextSlugs)]
      .filter((slug) => allowedSlugs.has(slug))
      .slice(0, MAX_INTEREST_BREEDS);
    setSlugs((current) => current.length === next.length && current.every((slug, index) => slug === next[index]) ? current : next);
    writeStoredSlugs(next);
  }, [allowedSlugs]);

  const clear = useCallback(() => {
    setSlugs([]);
    writeStoredSlugs([]);
  }, []);

  const value = useMemo(() => ({ breeds, slugs, hydrated, add, remove, replaceAll, clear }), [add, breeds, clear, hydrated, remove, replaceAll, slugs]);

  return <InterestBreedsContext.Provider value={value}>{children}</InterestBreedsContext.Provider>;
}

export function useInterestBreeds() {
  const context = useContext(InterestBreedsContext);
  if (!context) throw new Error("useInterestBreeds must be used within InterestBreedsProvider");
  return context;
}
