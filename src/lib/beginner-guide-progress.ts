export const BEGINNER_GUIDE_STORAGE_PREFIX = "dog-atlas:beginner-guide:v1:";
export const BEGINNER_GUIDE_PROGRESS_EVENT = "dog-atlas:beginner-guide-progress";
export const BEGINNER_GUIDE_STEP_COUNT = 3;

export function getBeginnerGuideStorageKey(slug: string) {
  return `${BEGINNER_GUIDE_STORAGE_PREFIX}${slug}`;
}

export function readBeginnerGuideProgress(slug: string) {
  try {
    const value = Number(localStorage.getItem(getBeginnerGuideStorageKey(slug)) ?? 0);
    return Number.isInteger(value) ? Math.min(Math.max(value, 0), BEGINNER_GUIDE_STEP_COUNT) : 0;
  } catch {
    return 0;
  }
}

export function writeBeginnerGuideProgress(slug: string, completed: number) {
  const safeValue = Math.min(Math.max(Math.trunc(completed), 0), BEGINNER_GUIDE_STEP_COUNT);
  try {
    localStorage.setItem(getBeginnerGuideStorageKey(slug), String(safeValue));
  } catch {
    // The current page can keep working even when browser storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(BEGINNER_GUIDE_PROGRESS_EVENT, { detail: { slug, completed: safeValue } }));
  return safeValue;
}

