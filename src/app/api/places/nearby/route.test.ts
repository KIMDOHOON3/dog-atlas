// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";
vi.mock("@/features/places/pet-tour-server", () => ({
  nearbyPetPlaces: vi.fn(),
}));
vi.mock("@/features/places/place-request-guard", () => ({
  reserveNearbyRequest: vi.fn(),
}));
import { reserveNearbyRequest } from "@/features/places/place-request-guard";
import { RequestBudgetExceeded } from "@/lib/request-budget";
import { nearbyPetPlaces } from "@/features/places/pet-tour-server";
import { POST } from "./route";
const query = vi.mocked(nearbyPetPlaces);
const request = (body: unknown, origin = "https://example.com") =>
  new Request("https://example.com/api/places/nearby", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
beforeEach(() => {
  query.mockReset();
  vi.mocked(reserveNearbyRequest).mockReset().mockReturnValue(vi.fn());
});

it("returns 429 and Retry-After without contacting the provider when exhausted", async () => {
  vi.mocked(reserveNearbyRequest).mockImplementation(() => {
    throw new RequestBudgetExceeded(12);
  });
  const response = await POST(
    request({ lat: 37, lng: 127, radius: 5000, type: "12" }),
  );
  expect(response.status).toBe(429);
  expect(response.headers.get("retry-after")).toBe("12");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(query).not.toHaveBeenCalled();
});

it("rejects non-JSON bodies and releases capacity after validation failures", async () => {
  const release = vi.fn();
  vi.mocked(reserveNearbyRequest).mockReturnValue(release);
  expect(
    (
      await POST(
        new Request("https://example.com/api/places/nearby", {
          method: "POST",
          body: "{}",
        }),
      )
    ).status,
  ).toBe(415);
  expect((await POST(request({}))).status).toBe(400);
  expect(release).toHaveBeenCalledOnce();
  expect(query).not.toHaveBeenCalled();
});
it("rejects invalid coordinates, radius and category before using the provider", async () => {
  for (const body of [
    { lat: 999, lng: 127, radius: 5000, type: "12" },
    { lat: 37, lng: 127, radius: 1000000, type: "12" },
    { lat: "37", lng: 127, radius: 5000, type: "12" },
  ]) {
    expect((await POST(request(body))).status).toBe(400);
  }
  expect(query).not.toHaveBeenCalled();
});
it("rejects cross-origin requests and does not cache location results", async () => {
  const body = { lat: 37.566, lng: 126.978, radius: 5000, type: "39" };
  expect((await POST(request(body, "https://other.example"))).status).toBe(403);
  query.mockResolvedValue({ items: [], total: 0 });
  const response = await POST(request(body));
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe("private, no-store");
});
it("does not return provider credentials or location-bearing errors", async () => {
  query.mockRejectedValue(new Error("secret url coords"));
  const response = await POST(
    request({ lat: 37, lng: 127, radius: 5000, type: "12" }),
  );
  expect(response.status).toBe(502);
  expect(await response.text()).not.toContain("secret");
});

it("rejects cross-site fetch metadata even without Origin", async () => {
  const response = await POST(
    new Request("https://example.com/api/places/nearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Sec-Fetch-Site": "cross-site",
      },
      body: JSON.stringify({ lat: 37, lng: 127, radius: 5000, type: "12" }),
    }),
  );
  expect(response.status).toBe(403);
  expect(reserveNearbyRequest).not.toHaveBeenCalled();
  expect(query).not.toHaveBeenCalled();
});
