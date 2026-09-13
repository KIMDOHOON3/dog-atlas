import Link from "next/link";
import {
  listPetPlaces,
  placeFilters,
  placeRegions,
} from "@/lib/pet-tour-server";
import { PLACE_TYPES } from "@/lib/pet-tour";
import styles from "./places.module.css";

export const metadata = {
  title: "함께 갈 곳",
  description:
    "반려동물과 함께 갈 수 있는 장소의 주소, 이용 정보와 동반 조건을 확인하세요.",
};
export default async function PlacesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = placeFilters(await searchParams);
  const [places, regions] = await Promise.allSettled([
    listPetPlaces(filters),
    placeRegions(),
  ]);
  const result = places.status === "fulfilled" ? places.value : null;
  const pageUrl = (page: number) =>
    `/places?${new URLSearchParams({ ...filters, page: String(page) })}`;
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        ← 견종도감으로
      </Link>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>함께 나서는 하루</span>
        <h1>오늘은 어디로 갈까요?</h1>
        <p>
          산책할 곳부터 잠시 쉬어 갈 카페까지.
          <br />
          우리 강아지와 함께할 수 있는 장소를 살펴보세요.
        </p>
      </header>
      <form action="/places" className={styles.form}>
        <label className={styles.search}>
          장소 이름
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="장소 이름을 검색해 보세요"
            maxLength={80}
          />
        </label>
        <label>
          지역
          <select name="region" defaultValue={filters.region}>
            <option value="">전국</option>
            {regions.status === "fulfilled" &&
              regions.value.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          어떤 곳
          <select name="type" defaultValue={filters.type}>
            <option value="">모든 장소</option>
            {Object.entries(PLACE_TYPES).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">찾기</button>
      </form>
      {result ? (
        <>
          <p className={styles.count}>
            {result.total.toLocaleString("ko-KR")}곳 · {filters.page}페이지
          </p>
          {result.items.length ? (
            <ul className={styles.list}>
              {result.items.map((p) => (
                <li key={p.contentid}>
                  <Link
                    prefetch={false}
                    href={`/places/${p.contentid}`}
                    className={styles.card}
                  >
                    <span className={styles.tag}>
                      {PLACE_TYPES[p.contenttypeid] ?? "함께 갈 곳"}
                    </span>
                    <h2>
                      {p.title} <span aria-hidden="true">↗</span>
                    </h2>
                    <p>
                      {[p.addr1, p.addr2].filter(Boolean).join(" ") ||
                        "주소 미제공"}
                    </p>
                    {p.tel && <p>{p.tel}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.notice}>
              해당 조건의 장소가 없어요. 지역이나 장소 종류를 바꿔 보세요.
            </p>
          )}
          <nav aria-label="장소 페이지" className={styles.pager}>
            {filters.page > 1 && (
              <Link prefetch={false} href={pageUrl(filters.page - 1)}>
                ← 이전
              </Link>
            )}
            <span>{filters.page}</span>
            {filters.page * 20 < result.total && (
              <Link prefetch={false} href={pageUrl(filters.page + 1)}>
                다음 →
              </Link>
            )}
          </nav>
        </>
      ) : (
        <div className={styles.notice} role="status">
          장소 정보를 잠시 불러오지 못했어요. 잠시 후 다시 확인해 주세요.
          <br />
          <Link prefetch={false} href={pageUrl(filters.page)}>
            다시 불러오기
          </Link>
        </div>
      )}
      <footer className={styles.source}>
        정보 제공: <a href="https://www.data.go.kr/">공공데이터포털</a> ·
        한국관광공사 반려동물 동반여행 서비스
        <br />
        동반 조건과 영업 정보는 달라질 수 있어요. 방문 전에 해당 장소에 확인해
        주세요.
      </footer>
    </main>
  );
}
