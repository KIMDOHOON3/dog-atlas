export type CategoryDogIconName = "calm" | "active" | "social" | "independent" | "grooming" | "unfamiliar";

export function CategoryDogIcon({ name, className }: { name: CategoryDogIconName; className?: string }) {
  return (
    <span className={className} data-dog-icon={name} aria-hidden="true">
      {name === "calm" ? (
        <>
          <span data-motion-layer="calm-base" />
          <span data-motion-layer="calm-z" />
        </>
      ) : null}
      {name === "active" ? <span data-motion-layer="active-run" /> : null}
      {name === "social" ? <span data-motion-layer="social-pet" /> : null}
      {name === "independent" ? <span data-motion-layer="independent-idle" /> : null}
      {name === "grooming" ? (
        <>
          <span data-motion-layer="grooming-base" />
          <span data-motion-layer="grooming-sparkles" />
        </>
      ) : null}
      {name === "unfamiliar" ? (
        <>
          <span data-motion-layer="unfamiliar-base" />
          <span data-motion-layer="unfamiliar-question" />
        </>
      ) : null}
    </span>
  );
}
