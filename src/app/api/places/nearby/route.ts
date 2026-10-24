import { z } from "zod";
import { nearbyPetPlaces } from "@/features/places/pet-tour-server";
import { PLACE_TYPES } from "@/features/places/pet-tour";
import { reserveNearbyRequest } from "@/features/places/place-request-guard";
import { readBoundedJson, RequestBudgetExceeded } from "@/lib/request-budget";

const schema = z.object({
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180),
  radius: z.union([
    z.literal(1000),
    z.literal(5000),
    z.literal(10000),
    z.literal(20000),
  ]),
  type: z.string().refine((v) => v === "" || Object.hasOwn(PLACE_TYPES, v)),
});
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    (origin && origin !== new URL(request.url).origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return Response.json(
      { error: "이 페이지에서 다시 검색해 주세요." },
      { status: 403, headers },
    );
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return Response.json(
      { error: "JSON 형식으로 요청해 주세요." },
      { status: 415, headers },
    );
  }
  let release: (() => void) | undefined;
  try {
    release = reserveNearbyRequest();
    let parsed;
    try {
      parsed = schema.safeParse(await readBoundedJson(request));
    } catch {
      return Response.json(
        { error: "검색 조건을 확인해 주세요." },
        { status: 400, headers },
      );
    }
    if (!parsed.success)
      return Response.json(
        { error: "검색 조건을 확인해 주세요." },
        { status: 400, headers },
      );
    const { lat, lng, radius, type } = parsed.data;
    return Response.json(await nearbyPetPlaces(lat, lng, radius, type), {
      headers,
    });
  } catch (error) {
    if (error instanceof RequestBudgetExceeded) {
      return Response.json(
        { error: error.message },
        {
          status: 429,
          headers: { ...headers, "Retry-After": String(error.retryAfter) },
        },
      );
    }
    return Response.json(
      { error: "주변 장소를 불러오지 못했어요. 잠시 후 다시 검색해 주세요." },
      { status: 502, headers },
    );
  } finally {
    release?.();
  }
}
