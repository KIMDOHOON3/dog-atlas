export function presentBreedOrigin(origin: string) {
  const parts = origin
    .split(/\s*·\s*/u)
    .filter((part) => !/(?:FCI|후원)/iu.test(part))
    .map((part) => part.replace(/^역사적 뿌리는\s*/u, "").trim())
    .filter(Boolean);

  return parts.join(" · ");
}
