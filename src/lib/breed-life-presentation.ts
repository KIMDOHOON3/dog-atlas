import type { Breed } from "@/content/breeds/schema";

export const lifestyleIconIds = [
  "rest",
  "grooming",
  "safety",
  "walk",
  "sofa-rest",
  "hygiene",
  "enrichment",
  "connection",
  "climate",
  "health-check",
  "feeding",
  "calm-alert",
] as const;

export type LifestyleIconId = (typeof lifestyleIconIds)[number];

export type BreedLifePoint = {
  icon: LifestyleIconId;
  label: string;
  title: string;
  description: string;
};

const conceptTitles: Record<LifestyleIconId, string> = {
  rest: "편안히 쉬는 연습 만들기",
  grooming: "피모 관리 시간을 생활에 넣기",
  safety: "안전한 생활 경계 준비하기",
  walk: "필요한 움직임을 매일 채우기",
  "sofa-rest": "차분히 쉬는 시간을 지켜주기",
  hygiene: "위생 관리를 익숙한 일상으로",
  enrichment: "머리를 쓰는 활동 마련하기",
  connection: "교감과 혼자 있는 시간 맞추기",
  climate: "기온 변화에 맞춰 돌보기",
  "health-check": "몸 상태를 꾸준히 살펴보기",
  feeding: "식사와 체중을 함께 관리하기",
  "calm-alert": "소리와 알림 행동 차분히 다루기",
};

const conceptLabels: Record<LifestyleIconId, string> = {
  rest: "혼자 쉬는 연습",
  grooming: "피모 관리",
  safety: "안전한 생활 환경",
  walk: "필요한 활동량",
  "sofa-rest": "차분한 휴식",
  hygiene: "위생 관리",
  enrichment: "정신적 자극",
  connection: "사람과의 교감",
  climate: "기온과 환경",
  "health-check": "몸 상태 확인",
  feeding: "식사와 체중",
  "calm-alert": "알림 행동",
};

const keywordGroups: Array<{ id: LifestyleIconId; keywords: string[] }> = [
  { id: "climate", keywords: ["더운", "더위", "추운", "추위", "기온", "온도", "날씨", "열사병", "한랭"] },
  { id: "grooming", keywords: ["털갈이", "빗질", "브러시", "엉킴", "그루밍", "미용", "피모", "털"] },
  { id: "hygiene", keywords: ["치아", "귀 관리", "위생", "목욕", "샴푸", "발톱", "눈물"] },
  { id: "feeding", keywords: ["식사", "급여", "음식", "간식", "식욕", "먹는", "먹이"] },
  { id: "health-check", keywords: ["관절", "호흡", "체중", "건강", "통증", "척추", "슬개", "고관절", "몸 상태", "컨디션"] },
  { id: "calm-alert", keywords: ["짖", "소리", "알림", "방문객", "초인종", "경계 행동"] },
  { id: "safety", keywords: ["안전", "울타리", "리드", "탈출", "낙상", "추적", "쫓", "교통", "거친 상호작용", "생활 경계", "환경 관리", "모는 듯한 행동"] },
  { id: "rest", keywords: ["혼자", "분리", "안정", "휴식", "쉬는", "쉬기", "차분"] },
  { id: "enrichment", keywords: ["정신", "자극", "문제 해결", "과제", "훈련", "학습", "후각", "냄새", "놀이", "탐색", "역할"] },
  { id: "connection", keywords: ["사람", "가족", "교감", "사회화", "낯선", "다른 동물", "함께", "관계"] },
  { id: "walk", keywords: ["산책", "운동", "활동", "달리", "질주", "움직", "에너지"] },
];

const groupFallbacks: Record<Breed["catalog"]["group"], LifestyleIconId> = {
  companion: "connection",
  herding: "enrichment",
  sighthound: "walk",
  "northern-working": "climate",
  dachshund: "safety",
  "scent-hound": "enrichment",
  "retriever-spaniel": "walk",
  "spitz-primitive": "calm-alert",
  "guardian-working": "safety",
  pointing: "walk",
  terrier: "enrichment",
};

const tendencyLabels: Record<keyof Breed["tendencies"], string> = {
  activity: "활동량",
  mentalStimulation: "정신적 자극",
  independence: "독립성",
  socialConnection: "사람과의 교감",
  alerting: "알림 행동",
  grooming: "털 관리",
};

const tendencyConcepts: Record<keyof Breed["tendencies"], LifestyleIconId> = {
  activity: "walk",
  mentalStimulation: "enrichment",
  independence: "rest",
  socialConnection: "connection",
  alerting: "calm-alert",
  grooming: "grooming",
};

const tendencyTieBreak: Record<keyof Breed["tendencies"], number> = {
  grooming: 0,
  activity: 1,
  mentalStimulation: 2,
  independence: 3,
  alerting: 4,
  socialConnection: 5,
};

function includesKeyword(text: string, keyword: string) {
  return text.includes(keyword);
}

export function classifyLifestyleConcept(text: string, fallback: LifestyleIconId): LifestyleIconId {
  let best: { id: LifestyleIconId; score: number } | undefined;

  for (const group of keywordGroups) {
    const score = group.keywords.reduce((total, keyword) => total + (includesKeyword(text, keyword) ? keyword.length : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { id: group.id, score };
  }

  return best?.id ?? fallback;
}

function createPoint(icon: LifestyleIconId, label: string, description: string): BreedLifePoint {
  return { icon, label, title: conceptTitles[icon], description };
}

export function getBreedLifePoints(breed: Breed): BreedLifePoint[] {
  const fallback = groupFallbacks[breed.catalog.group];
  const classifiedTags = breed.catalog.discoveryTags.map((tag) => ({
    tag,
    icon: classifyLifestyleConcept(tag, fallback),
  }));
  const candidates: BreedLifePoint[] = breed.careNotes.map((description, index) => {
    const indexedTag = breed.catalog.discoveryTags[index];
    const icon = classifyLifestyleConcept(`${indexedTag ?? ""} ${description}`, fallback);
    const matchingTag = classifiedTags.find((candidate) => candidate.icon === icon);
    return createPoint(icon, matchingTag?.tag ?? conceptLabels[icon], description);
  });

  const tendencyEntries = Object.entries(breed.tendencies) as Array<[
    keyof Breed["tendencies"],
    Breed["tendencies"][keyof Breed["tendencies"]],
  ]>;
  const tendencyPriority = { "높은 편": 0, "낮은 편": 1, 중간: 2, "개체별 확인 필요": 3 } as const;

  tendencyEntries
    .sort(([leftName, left], [rightName, right]) => (
      tendencyPriority[left.label] - tendencyPriority[right.label]
      || tendencyTieBreak[leftName] - tendencyTieBreak[rightName]
    ))
    .forEach(([name, tendency]) => {
      candidates.push(createPoint(tendencyConcepts[name], tendencyLabels[name], tendency.note));
    });

  candidates.push(createPoint(
    classifyLifestyleConcept(breed.behaviorClues.guardianContext, fallback),
    breed.identity.originalRole,
    breed.behaviorClues.guardianContext,
  ));

  const selected: BreedLifePoint[] = [];
  for (const candidate of candidates) {
    if (!selected.some((point) => point.icon === candidate.icon)) selected.push(candidate);
    if (selected.length === 3) return selected;
  }

  for (const candidate of candidates) {
    if (!selected.includes(candidate)) selected.push(candidate);
    if (selected.length === 3) return selected;
  }

  return selected;
}

const dayFallbacks: LifestyleIconId[] = ["walk", "enrichment", "sofa-rest"];

export function getBreedDayIcons(breed: Breed): LifestyleIconId[] {
  return breed.daySnapshot.map((step, index) => classifyLifestyleConcept(
    `${step.time} ${step.title} ${step.description}`,
    dayFallbacks[index] ?? "sofa-rest",
  ));
}
