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

export type BreedDayPoint = Pick<BreedLifePoint, "icon" | "title" | "description">;

const conceptTitles: Record<LifestyleIconId, string> = {
  rest: "편안히 쉬는 연습 만들기",
  grooming: "피모 관리 시간을 생활에 넣기",
  safety: "안전한 생활 경계 준비하기",
  walk: "필요한 움직임을 매일 채우기",
  "sofa-rest": "차분히 쉬는 시간을 지켜주기",
  hygiene: "위생 관리를 익숙한 일상으로",
  enrichment: "머리를 쓰는 활동 마련하기",
  connection: "사람과 교감하는 시간 만들기",
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
  { id: "feeding", keywords: ["식사", "급여", "음식", "간식", "식욕", "먹는", "먹이", "사료"] },
  { id: "health-check", keywords: ["관절", "호흡", "체중", "건강", "통증", "척추", "슬개", "고관절", "몸 상태", "컨디션"] },
  { id: "calm-alert", keywords: ["짖", "소리", "알림", "방문객", "초인종", "경계 행동"] },
  { id: "safety", keywords: ["안전", "울타리", "리드", "탈출", "낙상", "추적", "쫓", "교통", "거친 상호작용", "생활 경계", "환경 관리", "모는 듯한 행동"] },
  { id: "sofa-rest", keywords: ["침대", "쿠션", "자리", "바닥", "눕", "수면", "잠", "몸을 받쳐"] },
  { id: "rest", keywords: ["혼자", "분리", "독립", "안정", "휴식", "쉬는", "쉬기", "차분"] },
  { id: "enrichment", keywords: ["머리를 쓰", "정신", "자극", "문제 해결", "과제", "훈련", "학습", "후각", "냄새", "놀이", "탐색", "역할"] },
  { id: "connection", keywords: ["사람", "가족", "교감", "사회화", "낯선", "다른 동물", "함께", "관계"] },
  { id: "walk", keywords: ["산책", "운동", "신체 활동", "활동량", "달리", "질주", "움직", "에너지"] },
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

const tendencyLifeDescriptions: Record<
  keyof Breed["tendencies"],
  (label: Breed["tendencies"][keyof Breed["tendencies"]]["label"]) => string
> = {
  activity: (label) => `활동량은 ${label}으로 소개돼요. 산책 뒤의 회복 속도와 만족도를 살피며 하루 리듬을 조절하세요.`,
  mentalStimulation: (label) => `정신적 자극은 ${label}으로 소개돼요. 짧은 탐색과 학습에 보이는 반응을 관찰하세요.`,
  independence: (label) => `혼자 쉬는 성향은 ${label}으로 소개돼요. 짧은 휴식부터 편안함을 확인하며 시간을 늘려가세요.`,
  socialConnection: (label) => `사람과의 교감은 ${label}으로 소개돼요. 가까이 지내는 거리와 시간을 실제 반응에 맞춰주세요.`,
  alerting: (label) => `알림 행동은 ${label}으로 소개돼요. 소리와 움직임에 반응한 뒤 진정하는 시간을 살펴보세요.`,
  grooming: (label) => `털 관리는 ${label}으로 소개돼요. 빗질과 몸 만지기에 보이는 반응을 살피며 주기를 정하세요.`,
};

function includesKeyword(text: string, keyword: string) {
  return text.includes(keyword);
}

function normalizeCopy(text: string) {
  return text.replace(/[^\p{L}\p{N}]/gu, "").toLocaleLowerCase("ko-KR");
}

export function classifyLifestyleConcept(text: string, fallback: LifestyleIconId): LifestyleIconId {
  let best: { id: LifestyleIconId; score: number } | undefined;

  for (const group of keywordGroups) {
    const score = group.keywords.reduce((total, keyword) => total + (includesKeyword(text, keyword) ? keyword.length : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { id: group.id, score };
  }

  return best?.id ?? fallback;
}

export function scoreLifestyleConcept(text: string, icon: LifestyleIconId) {
  const group = keywordGroups.find((candidate) => candidate.id === icon);
  if (!group) return 0;

  return group.keywords.reduce(
    (total, keyword) => total + (includesKeyword(text, keyword) ? keyword.length + 2 : 0),
    0,
  );
}

type IconAssignmentInput = {
  title: string;
  description: string;
  fallback: LifestyleIconId;
};

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
    const tagFallback = indexedTag
      ? classifyLifestyleConcept(indexedTag, fallback)
      : fallback;
    const icon = classifyLifestyleConcept(description, tagFallback);
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
      candidates.push(createPoint(
        tendencyConcepts[name],
        tendencyLabels[name],
        tendencyLifeDescriptions[name](tendency.label),
      ));
    });

  [
    breed.behaviorClues.guardianContext,
    breed.story.reality,
    breed.behaviorClues.today,
    breed.behaviorClues.originalRole,
  ].forEach((description) => {
    const icon = classifyLifestyleConcept(description, fallback);
    candidates.push(createPoint(icon, conceptLabels[icon], description));
  });

  const selected: BreedLifePoint[] = [];
  const selectedDescriptions = new Set<string>();
  for (const candidate of candidates) {
    // The paw-in-magnifier asset is reserved for the behavior disclosure below
    // the life cards, so it does not repeat within the same detail page.
    if (candidate.icon === "health-check") continue;
    const normalizedDescription = normalizeCopy(candidate.description);
    if (
      !selected.some((point) => point.icon === candidate.icon)
      && !selectedDescriptions.has(normalizedDescription)
    ) {
      selected.push(candidate);
      selectedDescriptions.add(normalizedDescription);
    }
    if (selected.length === 3) return selected;
  }

  for (const candidate of candidates) {
    if (candidate.icon === "health-check") continue;
    const normalizedDescription = normalizeCopy(candidate.description);
    if (!selected.includes(candidate) && !selectedDescriptions.has(normalizedDescription)) {
      selected.push(candidate);
      selectedDescriptions.add(normalizedDescription);
    }
    if (selected.length === 3) return selected;
  }

  return selected;
}

const dayFallbacks: LifestyleIconId[] = ["walk", "sofa-rest", "enrichment"];

function getBestAvailableIcon(
  input: IconAssignmentInput,
  reserved: Set<LifestyleIconId>,
): LifestyleIconId | undefined {
  const ranked = lifestyleIconIds
    .map((icon) => ({
      icon,
      score: scoreLifestyleConcept(input.title, icon) * 4
        + scoreLifestyleConcept(input.description, icon),
    }))
    .sort((left, right) => right.score - left.score);

  const bestScore = ranked[0]?.score ?? 0;
  if (bestScore > 0) {
    return ranked.find((candidate) => (
      candidate.score === bestScore && !reserved.has(candidate.icon)
    ))?.icon;
  }
  return reserved.has(input.fallback) ? undefined : input.fallback;
}

export function getBreedDayPoints(
  breed: Breed,
  reservedIcons: LifestyleIconId[] = [],
  reservedCopy: string[] = [],
): BreedDayPoint[] {
  const reserved = new Set(reservedIcons);
  const usedCopy = new Set(reservedCopy.map(normalizeCopy));
  const selected: BreedDayPoint[] = [];

  const addPoint = (input: IconAssignmentInput) => {
    const normalizedTitle = normalizeCopy(input.title);
    const normalizedDescription = normalizeCopy(input.description);
    if (usedCopy.has(normalizedTitle) || usedCopy.has(normalizedDescription)) return;
    const icon = getBestAvailableIcon(input, reserved);
    if (!icon) return;
    selected.push({ icon, title: input.title, description: input.description });
    reserved.add(icon);
    usedCopy.add(normalizedTitle);
    usedCopy.add(normalizedDescription);
  };

  breed.daySnapshot.forEach((step, index) => {
    if (selected.length < 3) addPoint({
      title: step.title,
      description: step.description,
      fallback: dayFallbacks[index] ?? "sofa-rest",
    });
  });

  [
    breed.story.reality,
    breed.behaviorClues.today,
    breed.behaviorClues.originalRole,
    breed.behaviorClues.guardianContext,
  ].forEach((description) => {
    if (selected.length >= 3) return;
    const icon = classifyLifestyleConcept(description, groupFallbacks[breed.catalog.group]);
    addPoint({ title: conceptTitles[icon], description, fallback: icon });
  });

  (Object.keys(tendencyConcepts) as Array<keyof Breed["tendencies"]>).forEach((name) => {
    if (selected.length >= 3) return;
    const icon = tendencyConcepts[name];
    if (reserved.has(icon)) return;
    addPoint({
      title: conceptTitles[icon],
      description: tendencyLifeDescriptions[name](breed.tendencies[name].label),
      fallback: icon,
    });
  });

  return selected;
}

export function getBreedDayIcons(breed: Breed, reservedIcons: LifestyleIconId[] = []): LifestyleIconId[] {
  return getBreedDayPoints(breed, reservedIcons).map((point) => point.icon);
}

export function getBreedLifePresentation(breed: Breed) {
  const lifePoints = getBreedLifePoints(breed);
  const pageCopy = [
    breed.story.opening,
    breed.story.roleToHome,
    ...Object.values(breed.tendencies).map((tendency) => tendency.note),
  ];
  const dayPoints = getBreedDayPoints(breed, [
    "health-check",
    ...lifePoints.map((point) => point.icon),
  ], [
    ...pageCopy,
    ...lifePoints.flatMap((point) => [point.title, point.description]),
  ]);

  return { lifePoints, dayPoints, dayIcons: dayPoints.map((point) => point.icon) };
}
