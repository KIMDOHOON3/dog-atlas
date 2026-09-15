import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
import { listPetPlaces, petPlaceDetail, placeFilters } from "./pet-tour-server";
const fetchMock = vi.fn();
beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  vi.stubEnv("DATA_PET_TOUR_SERVICE_KEY", "test%2Bkey");
});
const ok = (item: unknown) => ({
  ok: true,
  json: async () => ({
    response: {
      header: { resultCode: "0000" },
      body: { items: { item }, totalCount: 1 },
    },
  }),
});
describe("public place server boundary", () => {
  it("bounds query inputs and requests the pet-specific service", async () => {
    const filters = placeFilters({
      type: "39",
      q: " 카페 ",
      page: "-5",
      region: "41",
    });
    fetchMock.mockResolvedValue(ok([]));
    await listPetPlaces(filters);
    const url = fetchMock.mock.calls[0][0] as URL;
    expect(url.origin).toBe("https://apis.data.go.kr");
    expect(url.pathname).toBe("/B551011/KorPetTourService2/searchKeyword2");
    expect(url.searchParams.get("serviceKey")).toBe("test+key");
    expect(url.searchParams.get("pageNo")).toBe("1");
    expect(url.searchParams.get("lDongRegnCd")).toBe("41");
  });
  it("does not expose authenticated URL errors", async () => {
    fetchMock.mockRejectedValue(new Error("secret test+key https://upstream"));
    await expect(listPetPlaces(placeFilters({}))).rejects.toThrow(
      "장소 정보를 잠시",
    );
  });
  it("keeps successful detail groups when one endpoint fails", async () => {
    fetchMock
      .mockResolvedValueOnce(
        ok([{ contentid: "12", contenttypeid: "12", title: "공원" }]),
      )
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(ok([{ infoname: "요금", infotext: "무료" }]))
      .mockResolvedValueOnce(ok([{ acmpyTypeCd: "야외 동반" }]));
    const detail = await petPlaceDetail("12");
    expect(detail?.groups.map((g) => g.unavailable)).toEqual([
      true,
      false,
      false,
    ]);
    expect(detail?.groups[2].items[0].acmpyTypeCd).toBe("야외 동반");
  });
  it("never fetches invalid IDs", async () => {
    expect(await petPlaceDetail("../x")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
