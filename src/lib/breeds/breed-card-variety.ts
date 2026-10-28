type CardVariety = {
  id: string;
  label: string;
  description: string;
  otherLabel: string;
};

const cardVarieties: Record<string, CardVariety> = {
  poodle: {
    id: "toy",
    label: "토이푸들",
    description:
      "대표 그림과 메인 카드는 토이푸들이에요. 다른 크기 유형은 아래에서 함께 살펴볼 수 있어요.",
    otherLabel: "다른 푸들 크기 유형 보기",
  },
  "german-spitz": {
    id: "pomeranian",
    label: "포메라니안",
    description:
      "포메라니안의 크기를 먼저 안내해요. 같은 저먼 스피츠 계통의 다른 유형은 별도로 구분했어요.",
    otherLabel: "다른 저먼 스피츠 유형 보기",
  },
  dachshund: {
    id: "miniature",
    label: "미니어처 닥스훈트",
    description:
      "대표 그림과 메인 카드는 미니어처 유형이에요. 닥스훈트의 크기 유형은 성견 가슴둘레로 구분해요.",
    otherLabel: "다른 닥스훈트 크기 유형 보기",
  },
};

export function getBreedCardVariety(slug: string): CardVariety | undefined {
  return cardVarieties[slug];
}
