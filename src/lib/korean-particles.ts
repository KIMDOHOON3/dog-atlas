function getLastHangulSyllable(value: string) {
  return [...value.trim()].reverse().find((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && codePoint >= 0xac00 && codePoint <= 0xd7a3;
  });
}

export function hasFinalConsonant(value: string) {
  const lastSyllable = getLastHangulSyllable(value);
  if (!lastSyllable) return false;

  return (lastSyllable.codePointAt(0)! - 0xac00) % 28 !== 0;
}

export function withTopicParticle(value: string) {
  return `${value}${hasFinalConsonant(value) ? "은" : "는"}`;
}

export function withObjectParticle(value: string) {
  return `${value}${hasFinalConsonant(value) ? "을" : "를"}`;
}
