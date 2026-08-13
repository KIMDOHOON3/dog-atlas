"use client";

import { useEffect, useState } from "react";
import {
  BEGINNER_GUIDE_STEP_COUNT,
  getBeginnerGuideStorageKey,
  readBeginnerGuideProgress,
  writeBeginnerGuideProgress,
} from "@/lib/beginner-guide-progress";
import styles from "./beginner-guide.module.css";

const steps = [
  {
    title: "데려오기 전에 물어볼 것",
    description: "입양처에 네 가지만 확인하면 첫날의 혼란을 크게 줄일 수 있어요.",
    items: ["현재 먹는 사료와 하루 급여량", "예방접종·진료 기록", "평소 잠자리", "익숙한 배변 방식"],
    action: "입양처에 확인했어요",
    done: "확인 완료 ✓",
  },
  {
    title: "첫날 꼭 필요한 것만 준비하기",
    description: "처음부터 많은 용품을 살 필요는 없어요. 아래 다섯 가지로 시작해요.",
    items: ["기존에 먹던 사료", "물그릇과 밥그릇", "배변패드와 청소 도구", "조용하고 안전한 잠자리", "몸에 맞는 이동장 또는 이동 장비"],
    action: "첫날 준비를 마쳤어요",
    done: "준비 완료 ✓",
  },
  {
    title: "첫 3일 함께 보내기",
    description: "새로운 환경을 한꺼번에 보여주기보다 조용한 생활 리듬부터 만들어요.",
    items: ["낯선 사람과 외출을 서두르지 않기", "먹은 양과 배변 상태 기록하기", "혼내기보다 안전한 공간을 먼저 알려주기", "이상 신호가 보이면 동물병원에 문의하기"],
    action: "첫 생활 가이드를 확인했어요",
    done: "가이드 확인 완료 ✓",
  },
] as const;

export function BeginnerGuide({ slug, nameKo }: { slug: string; nameKo: string }) {
  const [completed, setCompleted] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setCompleted(readBeginnerGuideProgress(slug));
      setHydrated(true);
    });

    const storageKey = getBeginnerGuideStorageKey(slug);
    function syncStorage(event: StorageEvent) {
      if (event.key === storageKey) setCompleted(readBeginnerGuideProgress(slug));
    }
    window.addEventListener("storage", syncStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", syncStorage);
    };
  }, [slug]);

  function completeStep(stepNumber: number) {
    if (!hydrated || stepNumber !== completed + 1) return;
    setCompleted(writeBeginnerGuideProgress(slug, stepNumber));
  }

  return (
    <>
      <section className={styles.progress} aria-label={`${nameKo} 맞이 준비 진행률`}>
        <div><strong>맞이 준비</strong><span aria-live="polite">{completed} / {BEGINNER_GUIDE_STEP_COUNT} 확인</span></div>
        <div className={styles.track} aria-hidden="true"><span style={{ width: `${completed / BEGINNER_GUIDE_STEP_COUNT * 100}%` }} /></div>
      </section>

      <section className={styles.steps} aria-label="처음 함께 살기 위한 준비 단계">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const done = stepNumber <= completed;
          const unlocked = stepNumber <= completed + 1;
          return (
            <article
              className={`${styles.step} ${done ? styles.done : ""} ${unlocked && !done ? styles.active : ""} ${!unlocked ? styles.locked : ""}`}
              key={step.title}
              aria-labelledby={`guide-step-${stepNumber}`}
            >
              <span className={styles.number} aria-hidden="true">{done ? "✓" : stepNumber}</span>
              <div className={styles.stepBody}>
                <h2 id={`guide-step-${stepNumber}`}>{step.title}</h2>
                <p>{unlocked ? step.description : "앞 단계를 확인하면 준비 목록이 열려요."}</p>
                {unlocked && <ul>{step.items.map((item) => <li key={item}><span aria-hidden="true">{done ? "✓" : "○"}</span>{item}</li>)}</ul>}
              </div>
              {unlocked ? (
                <button type="button" disabled={done || !hydrated} onClick={() => completeStep(stepNumber)}>
                  {done ? step.done : step.action}
                </button>
              ) : <span className={styles.lockLabel}>아직 잠겨 있어요</span>}
            </article>
          );
        })}
      </section>

      <aside className={styles.safety} aria-labelledby="safety-title">
        <span className={styles.safetyMark} aria-hidden="true">＋</span>
        <div>
          <p className={styles.eyebrow}>진행 상태와 관계없이 확인하세요</p>
          <h2 id="safety-title">동물병원에 바로 문의해야 할 신호</h2>
          <p>반복되는 구토·설사, 피가 섞인 변이나 구토, 먹지 않으면서 축 처지는 모습, 호흡 곤란, 경련, 독성물질이나 이물 섭취가 의심되면 기다리지 말고 가까운 동물병원에 문의하세요.</p>
          <a href="https://vcahospitals.com/west-suburban/know-your-pet/common-emergencies-in-dogs" target="_blank" rel="noreferrer">응급 신호 참고 자료 보기 →</a>
        </div>
      </aside>
    </>
  );
}

