import Link from "next/link";
import { PLACE_TYPES, type TourRecord } from "@/lib/pet-tour";
import { distanceLabel, kakaoPlaceLinks } from "@/lib/place-visit";
import PlaceIcon from "./place-icon";
import styles from "@/app/places/place-browse.module.css";

export default function PlaceCard({
  place,
  nearby = false,
  closest = false,
}: {
  place: TourRecord;
  nearby?: boolean;
  closest?: boolean;
}) {
  const links = kakaoPlaceLinks(place);
  const distance = Number(place.dist);
  return (
    <li className={styles.card}>
      <Link
        prefetch={false}
        href={`/places/${place.contentid}`}
        className={styles.cardMain}
      >
        <div className={styles.cardTop}>
          <span className={styles.cardKind}>
            <PlaceIcon type={place.contenttypeid} />
            {PLACE_TYPES[place.contenttypeid] || "함께 갈 곳"}
          </span>
          {closest && (
            <span className={styles.closest}>검색 결과 중 가장 가까워요</span>
          )}
        </div>
        <h3>{place.title}</h3>
        <p className={styles.cardAddress}>
          {[place.addr1, place.addr2].filter(Boolean).join(" ") ||
            "주소 미제공"}
        </p>
        {place.tel && <p className={styles.cardPhone}>{place.tel}</p>}
        {nearby &&
          place.dist?.trim() &&
          Number.isFinite(distance) &&
          distance >= 0 && (
            <strong className={styles.distance}>
              직선거리 {distanceLabel(distance)}
            </strong>
          )}
        <span className={styles.cardMore}>
          동반 조건·이용 정보 <PlaceIcon type="arrow" />
        </span>
      </Link>
      <a
        className={styles.cardDirections}
        href={links.directions || links.map}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlaceIcon type="directions" />
        {links.directions ? "이동시간·길찾기 ↗" : "카카오맵 검색 ↗"}
      </a>
    </li>
  );
}
