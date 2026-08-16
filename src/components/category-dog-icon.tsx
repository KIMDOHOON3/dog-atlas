export type CategoryDogIconName = "calm" | "active" | "social" | "independent" | "grooming" | "unfamiliar";

export function CategoryDogIcon({ name, className }: { name: CategoryDogIconName; className?: string }) {
  return <span className={className} data-dog-icon={name} aria-hidden="true" />;
}
