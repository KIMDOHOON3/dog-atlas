// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";
vi.mock("@/lib/pet-tour-server", () => ({ nearbyPetPlaces: vi.fn() }));
import { nearbyPetPlaces } from "@/lib/pet-tour-server";
import { POST } from "./route";
const query = vi.mocked(nearbyPetPlaces);
const request = (body: unknown, origin = "https://example.com") =>
  new Request("https://example.com/api/places/nearby", {
    method: "POST",
    headers: { Origin: origin },
    body: JSON.stringify(body),
  });
beforeEach(() => {
  query.mockReset();
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
