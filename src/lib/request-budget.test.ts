// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import {
  createRequestBudget,
  readBoundedJson,
  RequestBudgetExceeded,
} from "./request-budget";

describe("request budgets", () => {
  it("enforces throughput after releases and recovers at the next window", () => {
    let time = 0;
    const enter = createRequestBudget(
      { limit: 2, windowMs: 1000, concurrency: 1 },
      () => time,
    );
    enter()();
    enter()();
    expect(enter).toThrow(RequestBudgetExceeded);
    time = 1000;
    expect(() => enter()()).not.toThrow();
  });
  it("bounds concurrency and makes release idempotent", () => {
    const enter = createRequestBudget({
      limit: 10,
      windowMs: 1000,
      concurrency: 1,
    });
    const release = enter();
    expect(enter).toThrow(RequestBudgetExceeded);
    release();
    release();
    const second = enter();
    expect(enter).toThrow(RequestBudgetExceeded);
    second();
  });
});

describe("bounded request body", () => {
  it("accepts small JSON and rejects declared oversized payloads", async () => {
    await expect(
      readBoundedJson(
        new Request("https://test.local", {
          method: "POST",
          body: '{"ok":true}',
        }),
      ),
    ).resolves.toEqual({ ok: true });
    await expect(
      readBoundedJson(
        new Request("https://test.local", {
          method: "POST",
          headers: { "content-length": "9999" },
          body: "{}",
        }),
      ),
    ).rejects.toThrow("size");
  });
  it("counts UTF-8 bytes and cancels oversized chunked streams", async () => {
    const cancel = vi.fn();
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new TextEncoder().encode('"' + "가".repeat(400) + '"'));
      },
      cancel,
    });
    const request = new Request("https://test.local", {
      method: "POST",
      body: stream,
      duplex: "half",
    } as RequestInit);
    await expect(readBoundedJson(request)).rejects.toThrow("too large");
    expect(cancel).toHaveBeenCalledOnce();
  });
  it("times out an unfinished body without retaining the reader", async () => {
    vi.useFakeTimers();
    try {
      const cancel = vi.fn();
      const stream = new ReadableStream<Uint8Array>({ cancel });
      const request = new Request("https://test.local", {
        method: "POST",
        body: stream,
        duplex: "half",
      } as RequestInit);
      const result = expect(readBoundedJson(request)).rejects.toThrow();
      await vi.advanceTimersByTimeAsync(5000);
      await result;
      expect(cancel).toHaveBeenCalledOnce();
    } finally {
      vi.useRealTimers();
    }
  });
});
