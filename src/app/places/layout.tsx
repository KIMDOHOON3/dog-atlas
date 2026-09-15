import { SiteHeader } from "@/components/site-header";
import styles from "./places.module.css";

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      {children}
    </div>
  );
}
