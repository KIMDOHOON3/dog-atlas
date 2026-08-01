type StoryGlyphProps = {
  kind: "discover" | "compare" | "daily";
  className?: string;
};

export function StoryGlyph({ kind, className }: StoryGlyphProps) {
  if (kind === "compare") {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10v40M15 19h34M18 19l-8 16h16L18 19Zm28 0-8 16h16L46 19ZM22 52h20" />
      </svg>
    );
  }

  if (kind === "daily") {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="20" />
        <path d="M32 20v13l9 6M32 6v5M32 53v5M6 32h5M53 32h5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="28" cy="28" r="17" />
      <path d="m40 40 14 14M28 18v20M18 28h20" />
    </svg>
  );
}
