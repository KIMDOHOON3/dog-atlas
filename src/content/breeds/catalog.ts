import { breeds } from "./data";
import type { Breed } from "./schema";

export const catalogGoal = 20;

export const catalogGroupLabels: Record<Breed["catalog"]["group"], string> = {
  companion: "사람 곁에서 살아온 반려견",
  herding: "움직임을 읽고 협력해 온 목양견",
  sighthound: "시각으로 추적해 온 하운드",
  "northern-working": "북방 환경에서 일해 온 작업견",
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
