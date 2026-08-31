export const breedContentAuditStatuses = [
  "needs-review",
  "awaiting-owner-review",
  "approved",
] as const;

export type BreedContentAuditStatus = (typeof breedContentAuditStatuses)[number];

export const breedContentAuditStatusLabels: Record<BreedContentAuditStatus, string> = {
  "needs-review": "검수 필요",
  "awaiting-owner-review": "확인 대기",
  approved: "확인 완료",
};

const breedContentAuditOverrides: Readonly<Partial<Record<string, Exclude<BreedContentAuditStatus, "needs-review">>>> = {};

export function getBreedContentAuditStatus(
  slug: string,
  isEditorialReviewComplete: boolean,
): BreedContentAuditStatus | null {
  if (!isEditorialReviewComplete) return null;
  return breedContentAuditOverrides[slug] ?? "needs-review";
}
