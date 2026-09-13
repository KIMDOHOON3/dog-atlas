import styles from "./places.module.css";
export default function Loading() {
  return (
    <main className={styles.page}>
      <p className={styles.notice} role="status">
        함께 갈 곳을 불러오고 있어요…
      </p>
    </main>
  );
}
