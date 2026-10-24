/** In-memory protection for one server process, not a distributed quota. */
export class RequestBudgetExceeded extends Error {
  constructor(public readonly retryAfter: number) {
    super("요청이 많아요. 잠시 후 다시 시도해 주세요.");
    this.name = "RequestBudgetExceeded";
  }
}

export function createRequestBudget(
  {
    limit,
    windowMs,
    concurrency,
  }: { limit: number; windowMs: number; concurrency: number },
  now = Date.now,
) {
  let started = now();
  let count = 0;
  let active = 0;
  return () => {
    const time = now();
    if (time - started >= windowMs) {
      started = time;
      count = 0;
    }
    if (count >= limit) {
      throw new RequestBudgetExceeded(
        Math.max(1, Math.ceil((started + windowMs - time) / 1000)),
      );
    }
    if (active >= concurrency) throw new RequestBudgetExceeded(2);
    count++;
    active++;
    let released = false;
    return () => {
      if (!released) active--;
      released = true;
    };
  };
}

/** Limit bytes while reading, rather than buffering an unlimited body first. */
export async function readBoundedJson(request: Request, maxBytes = 1024) {
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) {
    throw new Error("Invalid body size");
  }
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        void reader.cancel().catch(() => {});
        reject(new Error("Body timeout"));
      }, 5000);
    });
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        void reader.cancel().catch(() => {});
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
    const buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(buffer),
    ) as unknown;
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}
