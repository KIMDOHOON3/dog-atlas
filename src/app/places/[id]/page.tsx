import Link from "next/link";
import { notFound } from "next/navigation";
import { petPlaceDetail } from "@/lib/pet-tour-server";
import { FIELD_LABELS, PLACE_TYPES, type TourRecord } from "@/lib/pet-tour";
import styles from "../places.module.css";
import { kakaoPlaceLinks, phoneLink, visitSummary } from "@/lib/place-visit";
import CopyAddress from "@/components/place-visit-actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "장소 안내" };
const codes =
  /^(contentid|contenttypeid|createdtime|modifiedtime|mapx|mapy|mlevel|cpyrhtDivCd|areacode|sigungucode|lDong.*|lcls.*|cat\d|fldgubun|serialnum|subnum|subcontentid)$/;
function Facts({
  item,
  technical = false,
}: {
  item: TourRecord;
  technical?: boolean;
}) {
  return (
    <dl className={styles.facts}>
      {Object.entries(item)
        .filter(([key, value]) => value && codes.test(key) === technical)
        .map(([key, value]) => (
          <div key={key}>
            <dt>{FIELD_LABELS[key] ?? key}</dt>
            <dd>
              {/^(tel|infocenter|sponsor\d+tel)/.test(key) &&
              phoneLink(value) ? (
                <a href={phoneLink(value)!}>{value}</a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
    </dl>
  );
}
export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await petPlaceDetail(id);
  } catch {
    return (
      <main className={styles.page}>
        <Link href="/places" className={styles.back}>
          ← 함께 갈 곳
        </Link>
        <h1>장소 안내</h1>
        <div role="status" className={styles.notice}>
          장소 정보를 잠시 불러오지 못했어요.
          <br />
          <Link prefetch={false} href={`/places/${encodeURIComponent(id)}`}>
            다시 불러오기
          </Link>
        </div>
      </main>
    );
  }
  if (!data) notFound();
  const { common, groups } = data;
  const display = { ...common };
  delete display.title;
  const visit = visitSummary(common, groups);
  const phone = phoneLink(visit.phone);
  const links = kakaoPlaceLinks(common);
  const address = [common.addr1, common.addr2].filter(Boolean).join(" ");
  return (
    <main className={styles.page}>
      <Link href="/places" className={styles.back}>
        ← 함께 갈 곳
      </Link>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>
          {PLACE_TYPES[common.contenttypeid] ?? "함께 갈 곳"}
        </span>
        <h1>{common.title}</h1>
        <p>{address || "주소 정보 없음"}</p>
        <div className={styles.actions}>
          {phone && (
            <a href={phone} className={styles.primaryAction}>
              전화로 문의하기
            </a>
          )}
          <a
            href={links.directions || links.map}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryAction}
          >
            {links.directions ? "이동시간·길찾기 ↗" : "카카오맵에서 검색 ↗"}
          </a>
          <a
            href={links.map}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryAction}
          >
            지도에서 보기 ↗
          </a>
          {address && <CopyAddress address={address} />}
        </div>
        <p className={styles.resultNote}>
          {visit.phone ? `문의 ${visit.phone}` : "전화번호 정보가 없어요."}
          <br />
          실제 이동시간과 교통수단별 경로는 카카오맵에서 확인할 수 있어요.
        </p>
      </header>
      <section className={styles.section} aria-labelledby="visit-summary">
        <h2 id="visit-summary">가기 전에 한눈에</h2>
        <p className={styles.resultNote}>
          제공된 동반 조건과 운영 정보예요. 실시간 입장 가능 여부·영업 상태를
          확인한 것은 아니므로 방문 전에 문의해 주세요.
        </p>
        <dl className={styles.visitGrid}>
          {visit.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className={!fact.value ? styles.missing : undefined}>
                {fact.value || "제공된 정보가 없어요."}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className={styles.section}>
        <h2>장소 정보</h2>
        <Facts item={display} />
      </section>
      {[groups[2], groups[0], groups[1]].map((group) => (
        <section key={group.title} className={styles.section}>
          <h2>{group.title}</h2>
          {group.unavailable ? (
            <p>
              이 정보를 불러오지 못했어요.{" "}
              <Link prefetch={false} href={`/places/${id}`}>
                다시 확인
              </Link>
            </p>
          ) : group.items.some((item) =>
              Object.entries(item).some(([k, v]) => v && !codes.test(k)),
            ) ? (
            group.items.map((item, i) => <Facts key={i} item={item} />)
          ) : (
            <p>제공된 정보가 없어요.</p>
          )}
        </section>
      ))}
      <details className={styles.section}>
        <summary>출처와 데이터 정보</summary>
        <Facts item={common} technical />
        {groups
          .flatMap((group) => group.items)
          .map((item, i) => (
            <Facts key={i} item={item} technical />
          ))}
      </details>
      <footer className={styles.source}>
        정보 제공: <a href="https://www.data.go.kr/">공공데이터포털</a> ·
        한국관광공사 반려동물 동반여행 서비스
        <br />
        제공된 텍스트 정보를 표시하며, 빈 항목은 생략합니다. 방문 전 최신
        운영·동반 조건을 장소에 확인해 주세요.
      </footer>
    </main>
  );
}
