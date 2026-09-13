import { unstable_cache } from "next/cache";
import { parseTourResponse, PLACE_TYPES } from "./pet-tour";

type Method =
  | "areaBasedList2"
  | "searchKeyword2"
  | "detailCommon2"
  | "detailIntro2"
  | "detailInfo2"
  | "detailPetTour2"
  | "ldongCode2";
// Cache only the stripped response, never a key-bearing fetch URL or raw images.
const queryTour = unstable_cache(
  async (method: Method, params: Record<string, string>) => {
    try {
      const rawKey = process.env.PUBLIC_DATA_PET_TOUR_SERVICE_KEY?.trim();
      if (!rawKey) throw new Error("Missing configuration");
      const url = new URL(
        `https://apis.data.go.kr/B551011/KorPetTourService2/${method}`,
      );
      url.search = new URLSearchParams({
        serviceKey: decodeURIComponent(rawKey),
        MobileOS: "ETC",
        MobileApp: "DogAtlas",
        _type: "json",
        numOfRows: "100",
        pageNo: "1",
        ...params,
      }).toString();
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("Upstream unavailable");
      return parseTourResponse(await response.json());
    } catch {
      // Do not propagate upstream errors: they may include the authenticated URL.
      throw new Error(
        "장소 정보를 잠시 불러오지 못했어요. 잠시 후 다시 확인해 주세요.",
      );
    }
  },
  ["pet-tour-text-v1"],
  { revalidate: 3600 },
);

export function placeFilters(
  params: Record<string, string | string[] | undefined>,
) {
  const str = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  const type = str("type");
  return {
    q: str("q").trim().slice(0, 80),
    type: params.type === undefined ? "12" : PLACE_TYPES[type] ? type : "",
    region: /^\d{2}$/.test(str("region")) ? str("region") : "",
    page: Math.min(10000, Math.max(1, Number.parseInt(str("page"), 10) || 1)),
  };
}
export async function listPetPlaces(filters: ReturnType<typeof placeFilters>) {
  const params: Record<string, string> = {
    numOfRows: "20",
    pageNo: String(filters.page),
    arrange: "A",
  };
  if (filters.type) params.contentTypeId = filters.type;
  if (filters.region) params.lDongRegnCd = filters.region;
  if (filters.q) params.keyword = filters.q;
  return queryTour(filters.q ? "searchKeyword2" : "areaBasedList2", params);
}
export async function placeRegions() {
  return (await queryTour("ldongCode2", {})).items;
}
export async function petPlaceDetail(id: string) {
  if (!/^\d{1,12}$/.test(id)) return null;
  const common = (await queryTour("detailCommon2", { contentId: id })).items[0];
  if (!common) return null;
  const params = { contentId: id, contentTypeId: common.contenttypeid };
  const results = await Promise.allSettled([
    queryTour("detailIntro2", params),
    queryTour("detailInfo2", params),
    queryTour("detailPetTour2", { contentId: id }),
  ]);
  return {
    common,
    groups: results.map((result, i) => ({
      title: ["이용 정보", "추가 안내", "반려동물 동반 안내"][i],
      items: result.status === "fulfilled" ? result.value.items : [],
      unavailable: result.status === "rejected",
    })),
  };
}
