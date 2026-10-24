import type { TourRecord } from "./pet-tour";

export function placeCoordinates(place: TourRecord) {
  if (!place.mapx?.trim() || !place.mapy?.trim()) return null;
  const lng = Number(place.mapx),
    lat = Number(place.mapy);
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180 ||
    (lat === 0 && lng === 0)
  )
    return null;
  return { lat, lng };
}
export function kakaoPlaceLinks(place: TourRecord) {
  const point = placeCoordinates(place);
  const search = `https://map.kakao.com/link/search/${encodeURIComponent([place.title, place.addr1].filter(Boolean).join(" "))}`;
  if (!point) return { map: search, directions: null };
  const destination = `${encodeURIComponent(place.title || "목적지")},${point.lat},${point.lng}`;
  return {
    map: `https://map.kakao.com/link/map/${destination}`,
    directions: `https://map.kakao.com/link/to/${destination}`,
  };
}
export function phoneLink(value: string) {
  // Keep descriptions/multiple numbers visible but dial only the first number.
  const match = value.match(
    /(?:\+82[ -]?\d{1,2}|0\d{1,3})[- )]?\d{3,4}[- ]?\d{4}|\b1[568]\d{2}[- ]?\d{4}\b/,
  );
  return match ? `tel:${match[0].replace(/[^+\d]/g, "")}` : null;
}
export function visitSummary(
  common: TourRecord,
  groups: { items: TourRecord[] }[],
) {
  const records = [common, ...groups.flatMap((g) => g.items)];
  const first = (...keys: string[]) => {
    for (const key of keys)
      for (const record of records) if (record[key]?.trim()) return record[key];
    return "";
  };
  const extra = (...labels: string[]) =>
    records.find((r) =>
      labels.some((label) => r.infoname?.replace(/\s/g, "").includes(label)),
    )?.infotext || "";
  return {
    phone: first(
      "infocenterfood",
      "infocenter",
      "infocenterculture",
      "infocenterleports",
      "infocenterlodging",
      "infocentershopping",
      "sponsor1tel",
      "tel",
    ),
    facts: [
      { label: "동반 가능한 반려동물", value: first("acmpyPsblCpam") },
      { label: "동반 구역", value: first("acmpyTypeCd") },
      {
        label: "준비·주의사항",
        value: [
          first("acmpyNeedMtr"),
          first("relaAcdntRiskMtr"),
          first("etcAcmpyInfo"),
        ]
          .filter(Boolean)
          .join("\n"),
      },
      ...(common.contenttypeid === "39"
        ? [
            { label: "대표 메뉴", value: first("firstmenu") },
            { label: "그 외 메뉴", value: first("treatmenu") },
          ]
        : []),
      {
        label: "면적·규모",
        value:
          first("scalefood", "scaleshopping", "scale", "scaleculture") ||
          extra("규모", "면적"),
      },
      {
        label: "좌석·수용인원",
        value: first(
          "seat",
          "accomcount",
          "accomcountleports",
          "accomcountlodging",
        ),
      },
      {
        label: "이용시간",
        value: first(
          "opentimefood",
          "usetime",
          "usetimeculture",
          "usetimeleports",
          "opentime",
          "playtime",
          "checkintime",
        ),
      },
      {
        label: "쉬는 날",
        value: first(
          "restdatefood",
          "restdate",
          "restdateculture",
          "restdateleports",
          "restdateshopping",
        ),
      },
      {
        label: "주차",
        value: first(
          "parkingfood",
          "parking",
          "parkingculture",
          "parkingleports",
          "parkinglodging",
          "parkingshopping",
        ),
      },
      {
        label: "요금",
        value:
          first("usefee", "usefeeculture", "usetimefestival") ||
          extra("입장료", "이용요금"),
      },
    ],
  };
}
export function distanceLabel(metres: number) {
  return metres < 1000
    ? `약 ${Math.max(10, Math.round(metres / 10) * 10)}m`
    : `약 ${(metres / 1000).toFixed(1)}km`;
}
