import Link from "next/link";
import {
  listPetPlaces,
  placeFilters,
  placeRegions,
} from "@/lib/pet-tour-server";
import { PLACE_TYPES } from "@/lib/pet-tour";
import styles from "./places.module.css";
import NearbyPlaces from "@/components/nearby-places";
import PlaceIcon from "@/components/place-icon";
import OutingSketch from "@/components/outing-sketch";
import journal from "./outing-journal.module.css";

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
    <main className={`${styles.page} ${journal.page}`}>
      <Link href="/" className={styles.back}>
        ← 견종도감으로
      </Link>
      <header className={journal.hero}>
        <div className={journal.chapter}>
          <span>견종도감의 산책 수첩</span>
          <span aria-hidden="true">함께 갈 곳 ↗</span>
        </div>
        <div className={journal.cover}>
          <div>
            <h1>
              도감 밖으로,
              <br />
              <em>함께 한 걸음.</em>
            </h1>
            <p>
              산책길, 쉬어 갈 카페, 하룻밤 머물 곳.
              <br />
              우리 강아지와 함께할 다음 장소를 찾아보세요.
            </p>
          </div>
          <div className={journal.sketch}>
            <OutingSketch />
            <span>목줄 챙겼나요? 이제 출발해요.</span>
          </div>
        </div>
      </header>
      <NearbyPlaces />
      <div className={styles.sectionHeading} id="region-search">
        <div>
          <span className={styles.eyebrow}>오늘 펼쳐 볼 곳</span>
          <h2 className={styles.regionTitle}>어떤 산책을 떠날까요?</h2>
        </div>
        <span className={styles.smallNote}>
          동반 조건까지 확인하고 출발해요
        </span>
      </div>
      <nav className={journal.categories} aria-label="장소 종류 빠른 선택">
        {[
          ["12", "산책·관광", "바깥 공기 한 모금"],
          ["39", "카페·음식점", "잠깐, 쉬어 가요"],
          ["32", "숙박", "하루 더 함께"],
          ["", "모든 장소", "발길 닿는 곳으로"],
        ].map(([type, label, caption]) => (
          <Link
            key={type}
            prefetch={false}
            href={`/places?${new URLSearchParams({ ...filters, type, page: "1" })}#region-search`}
            aria-current={filters.type === type ? "page" : undefined}
          >
            <PlaceIcon type={type} />
            <span>
              <strong>{label}</strong>
              <small>{caption}</small>
            </span>
          </Link>
        ))}
      </nav>
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
          <div className={styles.count}>
            <p>
              함께 갈 수 있는{" "}
              <strong>{result.total.toLocaleString("ko-KR")}곳</strong>
            </p>
            <span>{filters.page}페이지 · 이름순</span>
          </div>
          {result.items.length ? (
            <ul className={journal.places}>
              {result.items.map((p, index) => (
                <li key={p.contentid}>
                  <Link
                    prefetch={false}
                    href={`/places/${p.contentid}`}
                    className={journal.entry}
                  >
                    <span className={journal.number} aria-hidden="true">
                      {String((filters.page - 1) * 20 + index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                    <div className={journal.entryBody}>
                      <span className={journal.kind}>
                        {PLACE_TYPES[p.contenttypeid] ?? "함께 갈 곳"}
                      </span>
                      <h2>{p.title}</h2>
                      <p>
                        {[p.addr1, p.addr2].filter(Boolean).join(" ") ||
                          "주소 미제공"}
                      </p>
                      {p.tel && <p>{p.tel}</p>}
                      <span className={journal.entryMore}>
                        동반 조건 · 이용 정보
                      </span>
                    </div>
                    <span className={journal.entryArrow}>
                      <PlaceIcon type="arrow" />
                    </span>
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
