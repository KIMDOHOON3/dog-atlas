import styles from "./origin-mark.module.css";

type CountryCode = "ca" | "cn" | "de" | "fr" | "gb" | "kr" | "mx";

const countryFlags: Record<string, { code: CountryCode; label: string }> = {
  chihuahua: { code: "mx", label: "멕시코 국기" },
  "shih-tzu": { code: "cn", label: "중국에서 품종으로 발전" },
  poodle: { code: "fr", label: "프랑스 표준 등록" },
  dachshund: { code: "de", label: "독일 국기" },
  beagle: { code: "gb", label: "영국 국기" },
  "english-cocker-spaniel": { code: "gb", label: "영국 국기" },
  "labrador-retriever": { code: "ca", label: "캐나다 뉴펀들랜드 기원" },
  "golden-retriever": { code: "gb", label: "스코틀랜드를 포함한 영국 국기" },
  "german-shepherd-dog": { code: "de", label: "독일 국기" },
  "korea-jindo-dog": { code: "kr", label: "대한민국 국기" },
  whippet: { code: "gb", label: "영국 국기" },
  "pyrenean-mountain-dog": { code: "fr", label: "프랑스 국기" },
  "french-bulldog": { code: "fr", label: "프랑스 국기" },
};

function CountryFlag({ code, label }: { code: CountryCode; label: string }) {
  if (code === "fr") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="8" height="18" fill="#0055a4" /><rect x="8" width="8" height="18" fill="#fff" /><rect x="16" width="8" height="18" fill="#ef4135" /></svg>;
  if (code === "de") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="24" height="6" fill="#1a1a1a" /><rect y="6" width="24" height="6" fill="#dd0000" /><rect y="12" width="24" height="6" fill="#ffce00" /></svg>;
  if (code === "gb") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="24" height="18" fill="#21468b" /><path d="M0 0l24 18M24 0L0 18" stroke="#fff" strokeWidth="4" /><path d="M0 0l24 18M24 0L0 18" stroke="#cf142b" strokeWidth="1.5" /><path d="M12 0v18M0 9h24" stroke="#fff" strokeWidth="5" /><path d="M12 0v18M0 9h24" stroke="#cf142b" strokeWidth="2.5" /></svg>;
  if (code === "mx") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="8" height="18" fill="#006847" /><rect x="8" width="8" height="18" fill="#fff" /><rect x="16" width="8" height="18" fill="#ce1126" /><circle cx="12" cy="9" r="1.7" fill="#8a6b38" /></svg>;
  if (code === "cn") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="24" height="18" fill="#de2910" /><path d="M5 3.1l.7 1.6 1.7.1-1.3 1.1.4 1.7L5 6.7 3.5 7.6l.4-1.7-1.3-1.1 1.7-.1z" fill="#ffde00" /></svg>;
  if (code === "ca") return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="6" height="18" fill="#d80621" /><rect x="6" width="12" height="18" fill="#fff" /><rect x="18" width="6" height="18" fill="#d80621" /><path d="M12 3.3l1 2.4 1.8-.8-.6 2.2 1.7.9-2.4 1.7.5 2.4-2-.5-2 .5.5-2.4L8.1 8l1.7-.9-.6-2.2 1.8.8z" fill="#d80621" /></svg>;
  return <svg className={styles.flag} viewBox="0 0 24 18" role="img" aria-label={label}><rect width="24" height="18" fill="#fff" /><circle cx="12" cy="9" r="4.2" fill="#cd2e3a" /><path d="M7.8 9a4.2 4.2 0 0 0 8.4 0 2.1 2.1 0 0 1-4.2 0 2.1 2.1 0 0 0-4.2 0z" fill="#0047a0" /><path d="M2.5 4l4 1.7M2 5.4l4 1.7M17.5 12.3l4 1.7M18 10.9l4 1.7" stroke="#111" strokeWidth=".7" /></svg>;
}

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
  const country = countryFlags[slug];
  if (country) {
    return <CountryFlag code={country.code} label={country.label} />;
  }
  return <svg className={styles.symbol} viewBox="0 0 24 18" role="img" aria-label="고대 기원 상징"><path d="M8 3h8M9 3c0 2-2 3-2 6 0 3 2 5 5 5s5-2 5-5c0-3-2-4-2-6M8 15h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 6H5v4h2M16 6h3v4h-2" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
