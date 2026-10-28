import Link from "next/link";
import Image from "next/image";
import { withAndParticle } from "@/lib/korean-particles";
import styles from "./beginner-guide-link.module.css";

export function BeginnerGuideLink({ slug, nameKo }: { slug: string; nameKo: string }) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={`/beginner-guide?breed=${encodeURIComponent(slug)}`}>
        <span aria-hidden="true">
          <Image src="/illustrations/ui/action-icons/readiness-checklist-3d.png" alt="" width={256} height={256} />
        </span>
        맞이 준비 가이드 읽기
      </Link>
      <span className={styles.hint}>{withAndParticle(nameKo)} 함께할 첫 생활을 알아보세요.</span>
    </div>
  );
}
