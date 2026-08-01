import styles from "./origin-mark.module.css";

export function OriginMark({ slug }: { slug: string }) {
  if (slug === "japanese-spitz") {
    return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label="일본 국기"><rect width="24" height="18" fill="#fff" /><circle cx="12" cy="9" r="4.5" fill="#bc002d" /></svg>;
  }
  if (slug === "maltese") {
    return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label="몰타 국기"><rect width="12" height="18" fill="#fff" /><rect x="12" width="12" height="18" fill="#cf142b" /><path d="M3 2h4v1.2H5.6v1.4H4.4V3.2H3z" fill="#9aa09d" /></svg>;
  }
  if (slug === "border-collie") {
    return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label="영국 국기"><rect width="24" height="18" fill="#21468b" /><path d="M0 0l24 18M24 0L0 18" stroke="#fff" strokeWidth="4" /><path d="M0 0l24 18M24 0L0 18" stroke="#cf142b" strokeWidth="1.5" /><path d="M12 0v18M0 9h24" stroke="#fff" strokeWidth="5" /><path d="M12 0v18M0 9h24" stroke="#cf142b" strokeWidth="2.5" /></svg>;
  }
  if (slug === "samoyed") {
    return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label="러시아 국기"><rect width="24" height="6" fill="#fff" /><rect y="6" width="24" height="6" fill="#1c57a7" /><rect y="12" width="24" height="6" fill="#d52b1e" /></svg>;
  }
  return <svg className={styles.symbol} viewBox="0 0 24 18" role="img" aria-label="고대 기원 상징"><path d="M8 3h8M9 3c0 2-2 3-2 6 0 3 2 5 5 5s5-2 5-5c0-3-2-4-2-6M8 15h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 6H5v4h2M16 6h3v4h-2" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
