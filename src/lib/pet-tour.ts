import { z } from "zod";

export type TourRecord = Record<string, string>;
export const PLACE_TYPES: Record<string, string> = {
  "12": "산책·관광",
  "14": "문화시설",
  "15": "축제·행사",
  "25": "여행코스",
  "28": "레포츠",
  "32": "숙박",
  "38": "쇼핑",
  "39": "카페·음식점",
};

// Preserve textual links as text; never render upstream markup or image URLs.
export function plainTourText(value: string): string {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(
      /<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
      "$2 ($1)",
    )
    .replace(/<br\s*\/?>|<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(
      /https?:\/\/[^\s<>"()]+\.(?:jpe?g|png|webp|gif)(?:\?[^\s<>"()]*)?/gi,
      "",
    )
    .trim();
}

const recordSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.null()]),
);
const bodySchema = z.object({
  response: z.object({
    header: z.object({ resultCode: z.string() }),
    body: z.object({
      items: z.union([
        z.literal(""),
        z.object({
          item: z.union([z.array(recordSchema), recordSchema]).optional(),
        }),
      ]),
      totalCount: z.coerce.number().int().nonnegative(),
    }),
  }),
});
export function parseTourResponse(value: unknown) {
  const { response } = bodySchema.parse(value);
  if (!["0000", "00"].includes(response.header.resultCode))
    throw new Error("Tour API unavailable");
  const raw =
    typeof response.body.items === "string"
      ? []
      : (response.body.items.item ?? []);
  const items = (Array.isArray(raw) ? raw : [raw]).map((item): TourRecord =>
    Object.fromEntries(
      Object.entries(item)
        .filter(
          ([key, val]) =>
            !/image|photo|img|servicekey/i.test(key) && val !== null,
        )
        .map(([key, val]) => [key, plainTourText(String(val))]),
    ),
  );
  return { items, total: response.body.totalCount };
}

export const FIELD_LABELS: Record<string, string> = {
  title: "장소명",
  addr1: "주소",
  addr2: "상세 주소",
  zipcode: "우편번호",
  tel: "연락처",
  telname: "문의처",
  homepage: "홈페이지",
  overview: "장소 소개",
  createdtime: "최초 등록",
  modifiedtime: "정보 수정",
  contentid: "콘텐츠 번호",
  contenttypeid: "장소 유형 코드",
  mapx: "경도",
  mapy: "위도",
  mlevel: "지도 수준",
  cpyrhtDivCd: "공공누리 유형",
  areacode: "지역 코드",
  sigungucode: "시군구 코드",
  lDongRegnCd: "법정동 시도 코드",
  lDongSignguCd: "법정동 시군구 코드",
  cat1: "대분류 코드",
  cat2: "중분류 코드",
  cat3: "소분류 코드",
  lclsSystm1: "분류체계 대분류",
  lclsSystm2: "분류체계 중분류",
  lclsSystm3: "분류체계 소분류",
  acmpyTypeCd: "반려동물 동반 구역",
  acmpyPsblCpam: "동반 가능한 동물",
  acmpyNeedMtr: "동반 시 준비사항",
  relaAcdntRiskMtr: "주의사항",
  relaPosesFclty: "반려동물 관련 시설",
  relaFrnshPrdlst: "구비 물품",
  relaPurcPrdlst: "구매 가능 물품",
  relaRntlPrdlst: "대여 물품",
  etcAcmpyInfo: "추가 동반 안내",
  infoname: "항목",
  infotext: "안내",
  fldgubun: "정보 구분",
  serialnum: "순번",
  subname: "코스명",
  subdetailoverview: "코스 소개",
  subnum: "코스 순서",
  subcontentid: "코스 콘텐츠 번호",
  infocenter: "문의·안내",
  infocenterfood: "문의·안내",
  infocenterculture: "문의·안내",
  infocenterleports: "문의·안내",
  infocenterlodging: "예약·문의",
  infocentershopping: "문의·안내",
  usetime: "이용시간",
  usetimeculture: "이용시간",
  usetimeleports: "이용시간",
  opentime: "영업시간",
  opentimefood: "영업시간",
  restdate: "쉬는 날",
  restdatefood: "쉬는 날",
  restdateculture: "쉬는 날",
  restdateleports: "쉬는 날",
  restdateshopping: "쉬는 날",
  parking: "주차",
  parkingfood: "주차",
  parkingculture: "주차",
  parkingleports: "주차",
  parkinglodging: "주차",
  parkingshopping: "주차",
  parkingfee: "주차요금",
  usefee: "이용요금",
  usefeeculture: "이용요금",
  accomcount: "수용인원",
  accomcountleports: "수용인원",
  accomcountlodging: "수용인원",
  useage: "이용 연령",
  useageleports: "이용 연령",
  expagerange: "체험 연령",
  expguide: "체험 안내",
  heritage1: "세계문화유산",
  heritage2: "세계자연유산",
  heritage3: "세계기록유산",
  chkbabycarriage: "유모차 대여",
  chkpet: "반려동물 안내",
  chkcreditcard: "신용카드",
  chkbabycarriageshopping: "유모차 대여",
  chkpetshopping: "반려동물 안내",
  chkcreditcardshopping: "신용카드",
  chkcreditcardfood: "신용카드",
  firstmenu: "대표 메뉴",
  treatmenu: "취급 메뉴",
  kidsfacility: "어린이 놀이방",
  smoking: "금연·흡연",
  packing: "포장",
  reservationfood: "예약",
  seat: "좌석",
  scalefood: "규모",
  opendatefood: "개업일",
  lcnsno: "인허가 번호",
  saleitem: "판매 품목",
  saleitemcost: "가격",
  fairday: "영업일",
  opendateshopping: "개업일",
  shopguide: "매장 안내",
  culturecenter: "문화시설",
  restroom: "화장실",
  scaleshopping: "규모",
  reservation: "예약",
  reservationurl: "예약 홈페이지",
  checkintime: "입실시간",
  checkouttime: "퇴실시간",
  roomcount: "객실 수",
  roomtype: "객실 종류",
  subfacility: "부대시설",
  foodplace: "식음료장",
  barbecue: "바비큐",
  campfire: "캠프파이어",
  fitness: "운동시설",
  sauna: "사우나",
  publicbath: "공용 목욕실",
  publicpc: "공용 PC",
  seminar: "세미나실",
  sports: "스포츠시설",
  refundregulation: "환불규정",
  eventstartdate: "행사 시작",
  eventenddate: "행사 종료",
  eventplace: "행사 장소",
  playtime: "공연시간",
  usetimefestival: "이용요금",
  program: "프로그램",
  eventhomepage: "행사 홈페이지",
  sponsor1: "주최",
  sponsor1tel: "주최 문의",
  sponsor2: "주관",
  sponsor2tel: "주관 문의",
  agelimit: "관람 연령",
  bookingplace: "예매처",
  spendtimefestival: "관람 소요시간",
  distance: "거리",
  taketime: "소요시간",
  theme: "테마",
};
