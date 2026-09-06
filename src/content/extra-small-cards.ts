import { z } from "zod";
import { cardSchema } from "./giant-cards";

export const extraSmallCards = z.array(cardSchema).parse([
  {
    slug: "chihuahua",
    name: "치와와",
    nameEn: "CHIHUAHUA",
    number: "01",
    edition: "COURTYARD EDITION",
    origin: "멕시코",
    originEn: "MEXICO",
    region: "멕시코의 마당과 집",
    flag: "mexico",
    role: "반려 · 동반견",
    tagline: "멕시코에서 사람 곁을 지켜 온 작은 친구.",
    historyTitle: "작은 몸으로 오래 함께한 친구",
    history: "멕시코의 치와와주에서 이름을 얻은 반려견이에요.",
    height: "15–23",
    heightLabel: "어깨 높이 · 참고",
    weight: "1–3",
    lifespan: "14–16",
    theme: "woodland",
    front: {
      src: "/illustrations/card-studies/chihuahua-front-v1.webp",
      alt: "멕시코의 따뜻한 돌마당에 서 있는 황갈색 치와와 전신 수채화",
      width: 1254,
      height: 1254,
    },
    back: {
      src: "/illustrations/card-studies/chihuahua-back-v1.webp",
      alt: "멕시코 마당에 앉은 여성의 신발 옆에 서 있는 작은 치와와. 같은 바닥에서 체구를 비교하는 수채화",
      width: 1060,
      height: 1477,
    },
  },
]);
