"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { StandardBreedDetail } from "@/content/standard-breed-detail/schema";
import { withAndParticle } from "@/lib/korean-particles";
import styles from "./poodle-detail.module.css";

type StoryDetail = Pick<StandardBreedDetail, "slug" | "nameKo" | "story">;
type ReadinessDetail = Pick<StandardBreedDetail, "slug" | "nameKo" | "readinessQuestions">;

function useSnapCarousel(itemCount: number) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  function handleScroll() {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const index = Math.round(track.scrollLeft / (firstCard.offsetWidth + gap));
    setCurrent(Math.max(0, Math.min(index, itemCount - 1)));
  }

  function scrollTo(index: number) {
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    if (!card) return;
    card.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return { current, handleScroll, scrollTo, trackRef };
}

export function StandardStorySteps({ detail }: { detail: StoryDetail }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimerRef = useRef<number | null>(null);
  const {
    current: mobileStep,
    handleScroll: handleMobileScroll,
    scrollTo: scrollToMobileStep,
    trackRef: mobileTrackRef,
  } = useSnapCarousel(detail.story.steps.length);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
  }, []);

  function selectStep(index: number) {
    if (index === activeStep || isTransitioning) return;
    setActiveStep(index);
    buttonRefs.current[index]?.focus();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIsTransitioning(true);
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, 820);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % detail.story.steps.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + detail.story.steps.length) % detail.story.steps.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = detail.story.steps.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectStep(nextIndex);
  }

  return (
    <>
      <div className={styles.storyImageFrame}>
        {detail.story.steps.map((item, index) => (
          <Image
            className={styles.storyImage}
            src={item.image}
            alt={activeStep === index ? item.imageAlt : ""}
            aria-hidden={activeStep !== index}
            data-active={activeStep === index || undefined}
            width={1200}
            height={800}
            sizes="(max-width: 900px) calc(100vw - 32px), 46vw"
            key={item.image}
          />
        ))}
      </div>
      <div className={styles.storyInteraction} aria-busy={isTransitioning}>
        <div className={styles.stepTabs} role="tablist" aria-label={`${detail.nameKo}의 배경에서 오늘까지 세 단계`}>
          {detail.story.steps.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`${detail.slug}-step-tab-${index}`}
              aria-controls={`${detail.slug}-step-panel-${index}`}
              aria-selected={activeStep === index}
              aria-disabled={isTransitioning || undefined}
              tabIndex={activeStep === index ? 0 : -1}
              key={item.navLabel}
              ref={(node) => { buttonRefs.current[index] = node; }}
              onClick={() => selectStep(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <i aria-hidden="true">{index + 1}</i>
              <span>{item.navLabel}</span>
            </button>
          ))}
        </div>
        <div className={styles.stepPanel}>
          {detail.story.steps.map((item, index) => (
            <article
              className={styles.stepPanelContent}
              id={`${detail.slug}-step-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${detail.slug}-step-tab-${index}`}
              aria-hidden={activeStep !== index}
              tabIndex={activeStep === index ? 0 : -1}
              data-active={activeStep === index || undefined}
              key={item.navLabel}
            >
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={`${styles.storyCarousel} mobile-edge-to-edge`} aria-label={`${detail.nameKo}의 배경에서 오늘까지`} aria-roledescription="carousel">
        <div className={`${styles.storyTrack} mobile-edge-to-edge-track`} ref={mobileTrackRef} onScroll={handleMobileScroll}>
          {detail.story.steps.map((item, index) => (
            <article
              className={styles.storySlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${detail.story.steps.length}`}
              key={item.navLabel}
            >
              <Image src={item.image} alt={item.imageAlt} width={1200} height={800} sizes="calc(100vw - 56px)" />
              <div><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          ))}
        </div>
        <div className={styles.storyDots} aria-label="이야기 단계 선택">
          {detail.story.steps.map((item, index) => (
            <button
              type="button"
              aria-label={`${index + 1}단계 ${item.navLabel} 보기`}
              aria-current={mobileStep === index ? "step" : undefined}
              onClick={() => scrollToMobileStep(index)}
              key={item.navLabel}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function StandardRealityCards({ detail }: { detail: StandardBreedDetail }) {
  const {
    current,
    handleScroll,
    scrollTo,
    trackRef,
  } = useSnapCarousel(detail.realities.length);

  return (
    <div className={`${styles.realityCarousel} mobile-edge-to-edge`} aria-label={`${withAndParticle(detail.nameKo)} 살 때 체감하는 두 가지`} aria-roledescription="carousel">
      <div className={`${styles.realityGrid} mobile-edge-to-edge-track`} ref={trackRef} onScroll={handleScroll}>
        {detail.realities.map((reality) => (
          <article key={reality.id}>
            <Image src={reality.image} alt={reality.imageAlt} width={1200} height={900} sizes="(max-width: 767px) calc(100vw - 60px), 46vw" />
            <div className={styles.realityBody}><h3>{reality.title}</h3><p>{reality.body}</p></div>
          </article>
        ))}
      </div>
      <div className={styles.realityDots} aria-label="생활 현실 카드 선택">
        {detail.realities.map((reality, index) => (
          <button
            type="button"
            aria-label={`${index + 1}번째 ${reality.title} 보기`}
            aria-current={current === index ? "step" : undefined}
            onClick={() => scrollTo(index)}
            key={reality.id}
          />
        ))}
      </div>
    </div>
  );
}

export function StandardReadinessChecklist({ detail }: { detail: ReadinessDetail }) {
  const [checked, setChecked] = useState<boolean[]>(() => detail.readinessQuestions.map(() => false));
  const completed = checked.filter(Boolean).length;
  const allChecked = completed === checked.length;

  function toggleQuestion(index: number) {
    setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  return (
    <div className={styles.readinessChecklist}>
      <ul aria-label={`${withAndParticle(detail.nameKo)} 살기 전 생활 조건 확인`}>
        {detail.readinessQuestions.map((question, index) => (
          <li key={question} data-checked={checked[index] || undefined}>
            <label>
              <input type="checkbox" checked={checked[index]} onChange={() => toggleQuestion(index)} />
              <span aria-hidden="true">{checked[index] ? "✓" : ""}</span>
              <strong>{question}</strong>
            </label>
          </li>
        ))}
      </ul>
      <p className={styles.readinessProgress} aria-live="polite">
        {allChecked ? "세 가지 생활 조건을 모두 확인했어요." : `세 가지 중 ${completed}가지를 확인했어요.`}
      </p>
      <div className={styles.readinessActionSlot} data-visible={allChecked || undefined} aria-hidden={!allChecked}>
        <div>
          {allChecked && (
            <Link className={styles.readinessAction} href={`/beginner-guide?breed=${detail.slug}`}>
              더 자세한 맞이 준비 보기 <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
