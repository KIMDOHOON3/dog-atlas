import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// The server-only boundary is enforced by Next's production compiler.
vi.mock("server-only", () => ({}));

const localStorageEntries = new Map<string, string>();
const testLocalStorage: Storage = {
  get length() {
    return localStorageEntries.size;
  },
  clear() {
    localStorageEntries.clear();
  },
  getItem(key) {
    return localStorageEntries.get(key) ?? null;
  },
  key(index) {
    return [...localStorageEntries.keys()][index] ?? null;
  },
  removeItem(key) {
    localStorageEntries.delete(key);
  },
  setItem(key, value) {
    localStorageEntries.set(key, String(value));
  },
};

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: testLocalStorage,
});

afterEach(() => cleanup());
