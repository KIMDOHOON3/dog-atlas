"use client";

import { useState } from "react";
import Link from "next/link";
import type { Breed } from "@/content/breeds/schema";
import styles from "./condition-explorer.module.css";

const conditions = [
  { key: "size", label: "체격과 이동 동선" },
  { key: "activity", label: "매일의 활동" },
  { key: "grooming", label: "털 관리" },
  { key: "socialConnection", label: "사람과의 교감" },
  { key: "independence", label: "혼자 쉬는 연습" },
  { key: "alerting", label: "소리와 알림 행동" },
] as const;

type ConditionKey = (typeof conditions)[number]["key"];

function getConditionValue(breed: Breed, key: ConditionKey) {
  if (key === "size") {
    return { label: breed.identity.size, note: "현관·계단·엘리베이터와 이동 수단까지 함께 확인하세요." };
  }
  if (key === "independence") {
    return { label: breed.tendencies.independence.label, note: breed.tendencies.independence.note };
  }
  return { label: breed.tendencies[key].label, note: breed.tendencies[key].note };
}

export function ConditionExplorer({ breeds }: { breeds: Breed[] }) {
  const [selected, setSelected] = useState<ConditionKey>("activity");

  return (
    <section className={styles.explorer} aria-labelledby="condition-title">
      <header>
        <div>
          <p>생활조건으로 다시 보기</p>
          <h2 id="condition-title">한 가지 기준으로 견종을 나란히 살펴보세요.</h2>
        </div>
        <span>견종을 거르는 필터가 아니라, 같은 기준으로 이해하는 보기입니다.</span>
      </header>

      <fieldset>
        <legend className={styles.srOnly}>살펴볼 생활조건</legend>
        {conditions.map((condition) => {
          const active = selected === condition.key;
          return (
            <button
              type="button"
              key={condition.key}
              aria-pressed={active}
              onClick={() => setSelected(condition.key)}
            >
              <span aria-hidden="true">{active ? "●" : "○"}</span>{condition.label}
            </button>
          );
        })}
      </fieldset>

      <p className={styles.contextNote}>주거 형태 하나만으로 적합성을 판단하지 않아요. 실제 공간, 소음 민감도, 이동 동선, 활동과 돌봄 시간을 함께 살펴야 합니다.</p>

      <div className={styles.results} aria-live="polite">
        {breeds.map((breed) => (
          <article key={breed.slug}>
            <div className={styles.breedHead}>
              <div><strong>{breed.nameKo}</strong><span>{breed.identity.origin}</span></div>
              <Link href={`/breeds/${breed.slug}`} aria-label={`${breed.nameKo} 상세 정보 보기`}>↗</Link>
            </div>
            <dl>
              <div>
                <dt>{conditions.find((item) => item.key === selected)!.label}</dt>
                <dd>
                  <strong>{getConditionValue(breed, selected).label}</strong>
                  <span>{getConditionValue(breed, selected).note}</span>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
