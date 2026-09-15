import { z } from "zod";
import { nearbyPetPlaces } from "@/lib/pet-tour-server";
import { PLACE_TYPES } from "@/lib/pet-tour";

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
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json(
      { error: "이 페이지에서 다시 검색해 주세요." },
      { status: 403, headers },
    );
  }
  let parsed;
  try {
    const body = await request.text();
    if (body.length > 1024) throw new Error("Too large");
    parsed = schema.safeParse(JSON.parse(body));
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
  try {
    const { lat, lng, radius, type } = parsed.data;
    return Response.json(await nearbyPetPlaces(lat, lng, radius, type), {
      headers,
    });
  } catch {
    return Response.json(
      { error: "주변 장소를 불러오지 못했어요. 잠시 후 다시 검색해 주세요." },
      { status: 502, headers },
    );
  }
}
