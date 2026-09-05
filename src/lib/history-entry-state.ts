"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type SetStateAction,
} from "react";

type HistoryEntryState = {
  discoverVisibleCount?: number;
};

export type HistoryEntryStateKey = keyof HistoryEntryState;

const VIEW_STATE_KEY = "__dogAtlasView";
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

export function readHistoryEntryValue(key: HistoryEntryStateKey): unknown {
  if (typeof window === "undefined") return undefined;
  return asRecord(asRecord(window.history.state)[VIEW_STATE_KEY])[key];
}

export function writeHistoryEntryValue<T>(key: HistoryEntryStateKey, value: T) {
  if (typeof window === "undefined") return;

  const historyState = asRecord(window.history.state);
  const viewState = asRecord(historyState[VIEW_STATE_KEY]);

  try {
    window.history.replaceState(
      {
        ...historyState,
        [VIEW_STATE_KEY]: {
          ...viewState,
          [key]: value,
        },
      },
      "",
    );
  } catch {
    // History state is a progressive enhancement. Navigation still works if a
    // browser blocks replaceState in an embedded or restricted environment.
  }
}

export function useHistoryEntryState<T>(
  key: HistoryEntryStateKey,
  initialValue: T,
  isValid: (value: unknown) => value is T,
) {
  const [value, setLocalValue] = useState(initialValue);
  const valueRef = useRef(value);

  const restore = useCallback(() => {
    const savedValue = readHistoryEntryValue(key);
    const nextValue = isValid(savedValue) ? savedValue : initialValue;

    valueRef.current = nextValue;
    setLocalValue(nextValue);

    if (!isValid(savedValue)) {
      writeHistoryEntryValue(key, nextValue);
    }
  }, [initialValue, isValid, key]);

  useBrowserLayoutEffect(() => {
    restore();
  }, [restore]);

  useEffect(() => {
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [restore]);

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: T) => T)(valueRef.current)
          : nextValue;

      valueRef.current = resolvedValue;
      writeHistoryEntryValue(key, resolvedValue);
      setLocalValue(resolvedValue);
    },
    [key],
  );

  return [value, setValue] as const;
}
