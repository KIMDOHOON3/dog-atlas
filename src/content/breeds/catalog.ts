import { breeds } from "./data";
import type { Breed } from "./schema";

export const catalogGoal = 250;

export const catalogGroupLabels: Record<Breed["catalog"]["group"], string> = {
  companion: "사람 곁에서 살아온 반려견",
  herding: "움직임을 읽고 협력해 온 목양견",
  sighthound: "시각으로 추적해 온 하운드",
  "northern-working": "북방 환경에서 일해 온 작업견",
  dachshund: "땅속 사냥을 위해 발달한 닥스훈트",
  "scent-hound": "냄새의 길을 따라가는 후각 하운드",
  "retriever-spaniel": "찾고 운반하며 협력해 온 조렵견",
  "spitz-primitive": "오래된 지역의 삶을 간직한 스피츠·원시견",
  "guardian-working": "넓은 영역과 무리를 지켜 온 보호견",
  pointing: "사냥감의 위치를 알리며 협력해 온 포인팅견",
  terrier: "목표를 끈기 있게 찾아온 테리어",
};

export const catalogGroups = Object.entries(catalogGroupLabels).map(([key, label]) => ({
  key: key as Breed["catalog"]["group"],
  label,
  breeds: breeds.filter((breed) => breed.catalog.group === key),
}));

export function getCatalogProgress() {
  return {
    published: breeds.length,
    target: catalogGoal,
    remaining: Math.max(0, catalogGoal - breeds.length),
  };
}
