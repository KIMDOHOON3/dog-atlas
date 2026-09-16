import Link from "next/link";
import {
  listPetPlaces,
  placeFilters,
  placeRegions,
} from "@/lib/pet-tour-server";
import { PLACE_TYPES } from "@/lib/pet-tour";
import NearbyPlaces from "@/components/nearby-places";
import PlaceIcon from "@/components/place-icon";
import styles from "./places.module.css";
import browse from "./place-browse.module.css";

export const metadata = {
  title: "함께 갈 곳",
  description:
    "반려동물과 함께 갈 수 있는 장소의 주소, 이용 정보와 동반 조건을 확인하세요.",
};
const mainTypes = ["12", "39", "32", ""];
export default async function PlacesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = placeFilters(params);
  const mode = params.mode === "nearby" ? "nearby" : "region";
  const [places, regions] = await Promise.allSettled([
    mode === "region" ? listPetPlaces(filters) : Promise.resolve(null),
    mode === "region" ? placeRegions() : Promise.resolve([]),
  ]);
  const result = places.status === "fulfilled" ? places.value : null;
  const options = regions.status === "fulfilled" ? regions.value : [];
  const regionName =
    options.find((region) => region.code === filters.region)?.name || "전국";
  const url = (changes: Record<string, string> = {}, hash = "place-search") =>
    `/places?${new URLSearchParams({ ...filters, page: "1", mode, ...changes })}#${hash}`;
  return (
    <main className={`${styles.page} ${browse.page}`}>
      <Link href="/" className={styles.back}>
        ← 견종도감으로
      </Link>
      <header className={browse.header}>
        <h1>함께 갈 곳</h1>
        <p>반려견과 방문할 장소를 찾고, 동반 조건을 확인하세요.</p>
      </header>
      <div id="place-search" className={browse.finder}>
        <nav className={browse.modes} aria-label="장소 검색 방식">
          <Link
            prefetch={false}
            href={url({ mode: "region" })}
            aria-current={mode === "region" ? "page" : undefined}
          >
            지역으로 찾기
          </Link>
          <Link
            prefetch={false}
            href={url({ mode: "nearby" })}
            aria-current={mode === "nearby" ? "page" : undefined}
          >
            <PlaceIcon type="locate" />내 주변
          </Link>
        </nav>
        <nav className={browse.categories} aria-label="장소 종류">
          {mainTypes.map((type) => (
            <Link
              key={type}
              prefetch={false}
              href={url({ type })}
              aria-current={filters.type === type ? "page" : undefined}
            >
              {PLACE_TYPES[type] || "전체"}
            </Link>
          ))}
          <details
            className={browse.moreTypes}
            open={!mainTypes.includes(filters.type) || undefined}
          >
            <summary>다른 종류</summary>
            <div>
              {Object.entries(PLACE_TYPES)
                .filter(([type]) => !mainTypes.includes(type))
                .map(([type, label]) => (
                  <Link
                    key={type}
                    prefetch={false}
                    href={url({ type })}
                    aria-current={filters.type === type ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ))}
            </div>
          </details>
        </nav>
        {mode === "nearby" ? (
          <NearbyPlaces type={filters.type} />
        ) : (
          <>
            <form
              key={`${filters.q}:${filters.region}:${filters.type}`}
              action="/places#place-results"
              className={browse.form}
            >
              <input type="hidden" name="type" value={filters.type} />
              <input type="hidden" name="mode" value="region" />
              <label className={browse.regionField}>
                지역
                <select name="region" defaultValue={filters.region}>
                  <option value="">전국</option>
                  {options.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={browse.searchField}>
                장소 이름
                <input
                  name="q"
                  defaultValue={filters.q}
                  placeholder="장소 이름 검색"
                  maxLength={80}
                />
              </label>
              <button type="submit">검색</button>
            </form>
            <section
              id="place-results"
              className={browse.results}
              aria-label="장소 검색 결과"
            >
              {result ? (
                <>
                  <div className={browse.resultHeading}>
                    <h2>
                      {regionName}
                      <span> · {PLACE_TYPES[filters.type] || "모든 장소"}</span>
                      <strong>{result.total.toLocaleString("ko-KR")}</strong>
                    </h2>
                    <span>이름순 · {filters.page}페이지</span>
                  </div>
                  {filters.q && (
                    <p className={browse.queryNote}>
                      ‘{filters.q}’ 검색 결과{" "}
                      <Link
                        prefetch={false}
                        href={url({ q: "" }, "place-results")}
                      >
                        검색어 지우기
                      </Link>
                    </p>
                  )}
                  {result.items.length ? (
                    <ul className={browse.places}>
                      {result.items.map((place) => (
                        <li key={place.contentid}>
                          <Link
                            prefetch={false}
                            href={`/places/${place.contentid}`}
                            className={browse.entry}
                          >
                            <div className={browse.entryBody}>
                              <span className={browse.kind}>
                                {PLACE_TYPES[place.contenttypeid] ||
                                  "함께 갈 곳"}
                              </span>
                              <h3>{place.title}</h3>
                              <p>
                                {[place.addr1, place.addr2]
                                  .filter(Boolean)
                                  .join(" ") || "주소 미제공"}
                              </p>
                              {place.tel && <p>{place.tel}</p>}
                            </div>
                            <span className={browse.entryArrow}>
                              <PlaceIcon type="arrow" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.notice}>
                      해당 조건의 장소가 없어요. 지역이나 장소 종류를 바꿔
                      보세요.
                    </p>
                  )}
                  <nav aria-label="장소 페이지" className={styles.pager}>
                    {filters.page > 1 && (
                      <Link
                        prefetch={false}
                        href={url(
                          { page: String(filters.page - 1) },
                          "place-results",
                        )}
                      >
                        ← 이전
                      </Link>
                    )}
                    <span>{filters.page}</span>
                    {filters.page * 20 < result.total && (
                      <Link
                        prefetch={false}
                        href={url(
                          { page: String(filters.page + 1) },
                          "place-results",
                        )}
                      >
                        다음 →
                      </Link>
                    )}
                  </nav>
                </>
              ) : (
                <div className={styles.notice} role="status">
                  장소 정보를 잠시 불러오지 못했어요.{" "}
                  <Link
                    prefetch={false}
                    href={url({ page: String(filters.page) }, "place-results")}
                  >
                    다시 불러오기
                  </Link>
                </div>
              )}
            </section>
          </>
        )}
      </div>
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
