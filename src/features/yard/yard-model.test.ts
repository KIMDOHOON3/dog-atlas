import { afterEach, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

it("shares one download between preparation and the scene parser", async () => {
  const buffer = new ArrayBuffer(8);
  const fetch = vi
    .fn()
    .mockResolvedValue({ ok: true, arrayBuffer: async () => buffer });
  vi.stubGlobal("fetch", fetch);
  const { loadYardModel } = await import("./yard-model");
  const first = loadYardModel();
  expect(loadYardModel()).toBe(first);
  expect(await first).toBe(buffer);
  expect(await loadYardModel()).toBe(buffer);
  expect(fetch).toHaveBeenCalledOnce();
});

it("retries a failed preload instead of retaining a rejected promise", async () => {
  const buffer = new ArrayBuffer(8);
  const fetch = vi
    .fn()
    .mockResolvedValueOnce({ ok: false })
    .mockResolvedValueOnce({ ok: true, arrayBuffer: async () => buffer });
  vi.stubGlobal("fetch", fetch);
  const { loadYardModel } = await import("./yard-model");
  await expect(loadYardModel()).rejects.toThrow("Yard model unavailable");
  expect(await loadYardModel()).toBe(buffer);
  expect(fetch).toHaveBeenCalledTimes(2);
});
