type DogIconName = "discover" | "compare" | "history" | "unfamiliar" | "calm" | "active" | "social" | "independent" | "grooming" | "alert";

type IconProps = { name: DogIconName };

function Face({ variant = "plain" }: { variant?: "plain" | "profile" }) {
  return (
    <>
      <path d="M19 22 14 12l10 5c5-2 9-2 14 0l10-5-5 11c1 5-1 12-5 15-7 5-17 5-24 0-4-3-6-10-5-16Z" />
      {variant === "profile" ? <path d="M27 25c2-2 5-2 7 0M28 32c2 1 4 1 6 0" /> : <><path d="M25 25h.01M39 25h.01" /><path d="M29 32c2 2 5 2 7 0" /></>}
    </>
  );
}

const base = { viewBox: "0 0 64 64", fill: "none", "aria-hidden": true as const };

export function DogIcon({ name }: IconProps) {
  if (name === "discover") return <svg {...base}><Face /><circle cx="44" cy="43" r="10" /><path d="m51 50 7 7" /></svg>;
  if (name === "compare") return <svg {...base}><path d="M7 24 10 16l7 4c2-1 4-1 6 0l7-4 3 8c0 7-4 12-13 12S7 31 7 24Z" /><path d="M34 24 37 16l7 4c2-1 4-1 6 0l7-4 3 8c0 7-4 12-13 12s-13-5-13-12Z" /><path d="M22 25h.01M47 25h.01M25 31h-3M44 31h-3" /></svg>;
  if (name === "history") return <svg {...base}><path d="M10 35c0-14 9-24 23-24 7 0 13 2 18 7" /><path d="m44 10 8 8-11 2" /><path d="M12 43h14M12 51h25" /><path d="M22 27c-3 0-6 3-6 6s3 6 6 6 6-3 6-6-3-6-6-6Z" /></svg>;
  if (name === "unfamiliar") return <svg {...base}><Face /><path d="M49 9v12M43 15h12M53 29v7M49.5 32.5h7" /></svg>;
  if (name === "calm") return <svg {...base}><Face /><path d="M12 51h40" /><path d="M18 45c4 3 8 3 12 0M34 45c4 3 8 3 12 0" /></svg>;
  if (name === "active") return <svg {...base}><path d="M9 45c7-2 10-7 13-13l8 5 9-13" /><path d="m35 23 6 1-1 6" /><path d="M17 48c3-4 7-4 10 0M35 48c3-4 7-4 10 0" /><path d="m20 31-6-6" /></svg>;
  if (name === "social") return <svg {...base}><Face /><path d="M19 50c4-5 9-7 14-7s10 2 14 7" /><path d="M27 53c3-2 7-2 10 0" /></svg>;
  if (name === "independent") return <svg {...base}><Face /><path d="M9 52h46" /><path d="M15 45h7M42 45h7" /></svg>;
  if (name === "grooming") return <svg {...base}><Face /><path d="M11 49h42M18 45v10M25 45v10M32 45v10M39 45v10M46 45v10" /></svg>;
  return <svg {...base}><Face /><path d="M51 13v12M45 19h12M55 35v7M51.5 38.5h7" /></svg>;
}
