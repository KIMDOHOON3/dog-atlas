"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACE_TYPES, type TourRecord } from "@/lib/pet-tour";
import { distanceLabel, kakaoPlaceLinks } from "@/lib/place-visit";
import styles from "@/app/places/places.module.css";
import PlaceIcon from "./place-icon";

type Result = { items: TourRecord[]; total: number };
export default function NearbyPlaces() {
  const [type, setType] = useState("12");
  const [radius, setRadius] = useState(5000);
  const [result, setResult] = useState<Result | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);
  const requestId = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const position = useRef<{ lat: number; lng: number } | null>(null);
  useEffect(
    () => () => {
      requestId.current++;
      controller.current?.abort();
      position.current = null;
    },
    [],
  );
  const clearResults = () => {
    requestId.current++;
    controller.current?.abort();
    setBusy(false);
    setResult(null);
    setStatus("");
  };
  async function search() {
    const id = ++requestId.current;
    controller.current?.abort();
    setBusy(true);
    setResult(null);
    setStatus("현재 위치를 확인하고 있어요…");
    try {
      if (!position.current) {
        if (!navigator.geolocation)
          throw new Error(
            "이 브라우저는 위치 확인을 지원하지 않아요. 지역 검색을 이용해 주세요.",
          );
        const p = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) =>
              reject(
                new Error(
                  error.code === 1
                    ? "위치 권한이 꺼져 있어요. 브라우저에서 허용하거나 지역 검색을 이용해 주세요."
                    : "위치를 확인하지 못했어요. 다시 시도하거나 지역 검색을 이용해 주세요.",
                ),
              ),
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
          );
        });
        if (id !== requestId.current) return;
        position.current = {
          lat: Number(p.coords.latitude.toFixed(3)),
          lng: Number(p.coords.longitude.toFixed(3)),
        };
        setHasPosition(true);
      }
      setStatus("가까운 장소를 찾고 있어요…");
      controller.current = new AbortController();
      const response = await fetch("/api/places/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ ...position.current, radius, type }),
        signal: controller.current.signal,
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.error || "주변 장소를 불러오지 못했어요.");
      if (id !== requestId.current) return;
      setResult(body);
      setStatus("");
    } catch (error) {
      if (id === requestId.current)
        setStatus(
          error instanceof Error && /[가-힣]/.test(error.message)
            ? error.message
            : "주변 장소를 불러오지 못했어요. 연결을 확인하고 다시 시도해 주세요.",
        );
    } finally {
      if (id === requestId.current) setBusy(false);
    }
  }
  return (
    <section className={styles.nearby} aria-labelledby="nearby-title">
      <div className={styles.nearbyHeading}>
        <div>
          <span className={styles.eyebrow}>
            <PlaceIcon type="locate" /> 가까운 곳부터
          </span>
          <h2 id="nearby-title">
            멀리 가지 않아도,
            <br />
            함께라서 좋은 곳.
          </h2>
        </div>
        <a href="#region-search" className={styles.back}>
          지역으로 찾기 ↓
        </a>
      </div>
      <p>우리 동네 산책길과 카페를 가까운 순서로 찾아보세요.</p>
      <div className={styles.nearbyControls}>
        <label>
          찾을 장소
          <select
            value={type}
            onChange={(e) => {
              clearResults();
              setType(e.target.value);
            }}
          >
            <option value="12">산책·관광</option>
            <option value="39">카페·음식점</option>
            <option value="32">숙박</option>
            <option value="">모든 장소</option>
          </select>
        </label>
        <label>
          주변 범위
          <select
            value={radius}
            onChange={(e) => {
              clearResults();
              setRadius(Number(e.target.value));
            }}
          >
            {[1000, 5000, 10000, 20000].map((value) => (
              <option key={value} value={value}>
                반경 {value / 1000}km
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.primaryAction}
          disabled={busy}
          onClick={search}
        >
          <PlaceIcon type="locate" />
          {busy ? "찾는 중…" : "내 주변 가까운 곳 찾기"}
        </button>
        {hasPosition && !busy && (
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() => {
              clearResults();
              position.current = null;
              setHasPosition(false);
            }}
          >
            위치 초기화
          </button>
        )}
      </div>
      <p className={styles.privacyNote}>
        위치는 주변 검색에만 사용하고, 페이지를 떠나면 지워져요.
      </p>
      <p role="status" aria-live="polite">
        {status}
      </p>
      {result && (
        <>
          <p className={styles.resultNote}>
            반경 {radius / 1000}km · 등록된{" "}
            {result.total.toLocaleString("ko-KR")}곳 중 가까운{" "}
            {result.items.length}곳<br />약 100m 단위 위치 기준의 직선거리예요.
            실제 이동시간은 카카오맵 길찾기에서 확인해 주세요.
          </p>
          {result.items.length ? (
            <ul className={styles.list}>
              {result.items.map((place, index) => {
                const links = kakaoPlaceLinks(place);
                const distance = Number(place.dist);
                return (
                  <li key={place.contentid} className={styles.nearbyCard}>
                    <span className={styles.tag}>
                      {index === 0 ? "검색 결과 중 가장 가까워요 · " : ""}
                      {PLACE_TYPES[place.contenttypeid] || "함께 갈 곳"}
                    </span>
                    <Link
                      prefetch={false}
                      href={`/places/${place.contentid}`}
                      className={styles.resultTitle}
                    >
                      {place.title} ↗
                    </Link>
                    {place.dist?.trim() &&
                      Number.isFinite(distance) &&
                      distance >= 0 && (
                        <strong className={styles.distance}>
                          직선거리 {distanceLabel(distance)}
                        </strong>
                      )}
                    <p>
                      {[place.addr1, place.addr2].filter(Boolean).join(" ") ||
                        "주소 정보 없음"}
                    </p>
                    <div className={styles.actions}>
                      <Link
                        prefetch={false}
                        href={`/places/${place.contentid}`}
                        className={styles.secondaryAction}
                      >
                        동반 조건·이용 정보
                      </Link>
                      <a
                        href={links.directions || links.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryAction}
                      >
                        {links.directions
                          ? "이동시간·길찾기 ↗"
                          : "카카오맵 검색 ↗"}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.notice}>
              이 범위에서 등록된 장소를 찾지 못했어요. 범위를 넓히거나 다른
              종류를 선택해 보세요. 실제 주변의 모든 장소가 등록된 것은
              아니에요.
            </div>
          )}
        </>
      )}
    </section>
  );
}
