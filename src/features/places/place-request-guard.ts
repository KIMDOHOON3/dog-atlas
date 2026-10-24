import "server-only";
import { createRequestBudget } from "@/lib/request-budget";

// Aggregate limits intentionally do not trust client-supplied IP headers.
// Every uncached provider call (including server-rendered pages) shares this gate.
export const reserveProviderRequest = createRequestBudget({
  limit: 120,
  windowMs: 60_000,
  concurrency: 4,
});

export const reserveNearbyRequest = createRequestBudget({
  limit: 30,
  windowMs: 60_000,
  concurrency: 4,
});
