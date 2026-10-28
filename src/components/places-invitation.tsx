import Link from "next/link";
import styles from "./places-invitation.module.css";

export function PlacesInvitation() {
  return (
    <aside className={styles.invitation} aria-labelledby="places-invitation-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>함께 갈 곳</p>
          <h2 id="places-invitation-title">함께 나갈 곳도 찾아볼까요?</h2>
          <p className={styles.description}>
            카페부터 산책할 곳까지, 장소별 반려견 동반 조건을 살펴보세요.
          </p>
          <p className={styles.note}>방문 전에는 크기 제한과 이용 조건을 해당 장소에 확인해 주세요.</p>
        </div>
        <Link className={styles.link} href="/places" prefetch={false}>
          함께 갈 곳 찾기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
