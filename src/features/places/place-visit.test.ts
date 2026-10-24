import { expect, it } from "vitest";
import {
  kakaoPlaceLinks,
  phoneLink,
  visitSummary,
  placeCoordinates,
} from "./place-visit";
it("makes coordinate-based Kakao links without confusing tourism and Kakao IDs", () => {
  const links = kakaoPlaceLinks({
    title: "공원 & 카페",
    contentid: "123",
    mapx: "127.1",
    mapy: "37.2",
  });
  expect(links.directions).toBe(
    `https://map.kakao.com/link/to/${encodeURIComponent("공원 & 카페")},37.2,127.1`,
  );
  expect(links.map).not.toContain("/map/123");
  expect(
    kakaoPlaceLinks({ title: "공원", mapx: "", mapy: "" }).directions,
  ).toBeNull();
  expect(placeCoordinates({ mapx: "NaN", mapy: "37" })).toBeNull();
  expect(placeCoordinates({ mapx: "0", mapy: "0" })).toBeNull();
});
it("extracts a dialable number without descriptions or a second phone", () => {
  expect(phoneLink("문의 0507-1303-3771 / 02-123-4567")).toBe(
    "tel:050713033771",
  );
  expect(phoneLink("예약 1588-1234")).toBe("tel:15881234");
  expect(phoneLink("홈페이지 문의")).toBeNull();
});
it("surfaces menus, actual size and pet restrictions without inventing availability", () => {
  const result = visitSummary({ contenttypeid: "39" }, [
    {
      items: [
        {
          firstmenu: "커피",
          scalefood: "200㎡",
          infocenterfood: "02-123-4567",
        },
        {
          acmpyTypeCd: "야외만 가능",
          acmpyPsblCpam: "10kg 이하",
          acmpyNeedMtr: "목줄",
        },
      ],
    },
  ]);
  expect(result.phone).toBe("02-123-4567");
  expect(result.facts.find((f) => f.label === "면적·규모")?.value).toBe(
    "200㎡",
  );
  expect(result.facts.find((f) => f.label === "동반 구역")?.value).toBe(
    "야외만 가능",
  );
  expect(result.facts.find((f) => f.label === "쉬는 날")?.value).toBe("");
});
