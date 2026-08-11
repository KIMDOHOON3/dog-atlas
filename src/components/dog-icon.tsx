type DogIconName = "discover" | "compare" | "history" | "unfamiliar" | "calm" | "active" | "social" | "independent" | "grooming" | "alert";

export function DogIcon({ name }: { name: DogIconName }) {
  const common = { viewBox: "0 0 48 48", fill: "none", "aria-hidden": true as const };

  if (name === "compare") return <svg {...common}><path d="M11 17 15 9l7 5v16l-7 5-4-8V17ZM37 17l-4-8-7 5v16l7 5 4-8V17Z" /><path d="M22 20h4M22 28h4" /></svg>;
  if (name === "history") return <svg {...common}><path d="M12 31c0-10 6-17 16-17 4 0 7 1 9 3" /><path d="m34 11 4 6-7 2" /><path d="M13 34h9M13 39h16" /><circle cx="18" cy="25" r="3" /></svg>;
  if (name === "unfamiliar") return <svg {...common}><path d="M14 18 11 9l9 5c3-1 5-1 8 0l9-5-3 10c1 3 1 8-1 12-3 5-16 5-19 0-2-4-2-9 0-13Z" /><path d="M19 25h.01M29 25h.01M21 31c2 1 4 1 6 0" /><path d="m39 9 .8 2.2L42 12l-2.2.8L39 15l-.8-2.2L36 12l2.2-.8L39 9Z" /></svg>;
  if (name === "calm") return <svg {...common}><path d="M14 18 11 9l9 5c3-1 5-1 8 0l9-5-3 10c1 3 1 8-1 12-3 5-16 5-19 0-2-4-2-9 0-13Z" /><path d="M19 25h.01M29 25h.01M20 31c3 2 5 2 8 0" /><path d="M10 40h28" /></svg>;
  if (name === "active") return <svg {...common}><path d="m10 31 7-8 6 4 7-10" /><path d="m27 17 3-1 1 3" /><path d="M13 36c3-5 7-5 10 0M28 36c2-4 5-4 8 0" /><path d="M17 25c-3-3-5-7-3-11l7 5" /></svg>;
  if (name === "social") return <svg {...common}><path d="M10 19 13 11l7 4c3-1 5-1 8 0l7-4 3 8c1 5-2 12-14 12S9 24 10 19Z" /><path d="M19 23h.01M29 23h.01M21 28c2 2 4 2 6 0" /><path d="M18 38c4-4 8-4 12 0" /></svg>;
  if (name === "independent") return <svg {...common}><path d="M14 19 11 10l9 5c3-1 5-1 8 0l9-5-3 10c1 4 0 9-2 12-4 4-15 4-19 0-2-3-3-8 1-13Z" /><path d="M19 25h.01M29 25h.01M21 31c2 1 4 1 6 0" /><path d="M7 39h34" /></svg>;
  if (name === "grooming") return <svg {...common}><path d="M13 18 10 10l9 5c3-1 7-1 10 0l9-5-3 10c1 4 0 9-2 12-4 4-15 4-19 0-2-3-3-8-1-14Z" /><path d="M19 25h.01M29 25h.01M22 31h4" /><path d="M8 39h15M27 39h13M25 35v8M29 35v8" /></svg>;
  if (name === "alert") return <svg {...common}><path d="M13 18 10 10l9 5c3-1 7-1 10 0l9-5-3 10c1 4 0 9-2 12-4 4-15 4-19 0-2-3-3-8-1-14Z" /><path d="M19 25h.01M29 25h.01M21 31c2 1 4 1 6 0" /><path d="M39 15V8M35 12l-4-4M43 12l4-4" /></svg>;
  return <svg {...common}><path d="M13 18 10 10l9 5c3-1 7-1 10 0l9-5-3 10c1 4 0 9-2 12-4 4-15 4-19 0-2-3-3-8-1-14Z" /><path d="M19 25h.01M29 25h.01M21 31c2 1 4 1 6 0" /><circle cx="36" cy="36" r="7" /><path d="m36 32-1 4 3 2" /></svg>;
}
