export default function PlaceIcon({ type = "pin" }: { type?: string }) {
  const paths: Record<string, React.ReactNode> = {
    all: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    "14": (
      <>
        <path d="m3 8 9-5 9 5H3Zm2 3v7m5-7v7m4-7v7m5-7v7M3 21h18" />
      </>
    ),
    "15": (
      <>
        <path d="M4 9h16v12H4ZM3 5h18v4H3Zm9 0v16" />
        <path d="M12 5C4 6 6-2 12 5Zm0 0c8 1 6-7 0 0Z" />
      </>
    ),
    "25": (
      <>
        <path d="m9 3 6 3 6-3v16l-6 3-6-3-6 3V6Zm0 0v16m6-13v16" />
      </>
    ),
    "28": (
      <>
        <path d="m3 19 6-10 4 6 3-5 5 9H3Z" />
        <circle cx="16" cy="5" r="2" />
      </>
    ),
    "38": (
      <>
        <path d="M5 7h14l2 14H3ZM9 7V5a3 3 0 0 1 6 0v2" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    directions: (
      <>
        <path d="m12 2 10 10-10 10L2 12Z" />
        <path d="M8 15v-4h8m-3-3 3 3-3 3" />
      </>
    ),
    "12": (
      <>
        <path d="m12 3-6 8h3l-4 6h14l-4-6h3Z" />
        <path d="M12 17v4" />
      </>
    ),
    "39": (
      <>
        <path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
        <path d="M16 9h2a3 3 0 0 1 0 6h-2M7 3v2m4-2v2" />
      </>
    ),
    "32": (
      <>
        <path d="M3 18v3m18-3v3M3 18V6m0 8h18v4H3Zm4-4h4v4H7Zm4 4V8h7a3 3 0 0 1 3 3v3" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    locate: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 1v4m0 14v4M1 12h4m14 0h4" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type] || paths.pin}
    </svg>
  );
}
