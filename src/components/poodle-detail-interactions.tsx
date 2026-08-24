"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { poodleDetail } from "@/content/poodle-detail/data";
import styles from "./poodle-detail.module.css";

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

export function PoodleStorySteps() {
  const [activeStep, setActiveStep] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const {
    current: mobileStep,
    handleScroll: handleMobileScroll,
    scrollTo: scrollToMobileStep,
    trackRef: mobileTrackRef,
  } = useSnapCarousel(poodleDetail.story.steps.length);
  function selectStep(index: number) {
    setActiveStep(index);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % poodleDetail.story.steps.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + poodleDetail.story.steps.length) % poodleDetail.story.steps.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = poodleDetail.story.steps.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectStep(nextIndex);
  }

  return (
    <>
      <div className={styles.storyImageFrame}>
        {poodleDetail.story.steps.map((item, index) => (
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
      <div className={styles.storyInteraction}>
        <div className={styles.stepTabs} role="tablist" aria-label="푸들의 과거에서 오늘까지 세 단계">
          {poodleDetail.story.steps.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`poodle-step-tab-${index}`}
              aria-controls={`poodle-step-panel-${index}`}
              aria-selected={activeStep === index}
              tabIndex={activeStep === index ? 0 : -1}
              key={item.navLabel}
              ref={(node) => { buttonRefs.current[index] = node; }}
              onClick={() => setActiveStep(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <i aria-hidden="true">{index + 1}</i>
              <span>{item.navLabel}</span>
            </button>
          ))}
        </div>
        <div className={styles.stepPanel}>
          {poodleDetail.story.steps.map((item, index) => (
            <article
              className={styles.stepPanelContent}
              id={`poodle-step-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`poodle-step-tab-${index}`}
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
      <div className={`${styles.storyCarousel} mobile-edge-to-edge`} aria-label="푸들의 과거에서 오늘까지" aria-roledescription="carousel">
        <div className={`${styles.storyTrack} mobile-edge-to-edge-track`} ref={mobileTrackRef} onScroll={handleMobileScroll}>
          {poodleDetail.story.steps.map((item, index) => (
            <article
              className={styles.storySlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${poodleDetail.story.steps.length}`}
              key={item.navLabel}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={1200}
                height={800}
                sizes="calc(100vw - 56px)"
              />
              <div>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.storyDots} aria-label="이야기 단계 선택">
          {poodleDetail.story.steps.map((item, index) => (
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

export function PoodleSizePicker({
  activeSize: controlledActiveSize,
  onSelect,
}: {
  activeSize?: number;
  onSelect?: (index: number) => void;
} = {}) {
  const [localActiveSize, setLocalActiveSize] = useState(0);
  const activeSize = controlledActiveSize ?? localActiveSize;

  function selectSize(index: number) {
    if (onSelect) onSelect(index);
    else setLocalActiveSize(index);
  }

  return (
    <div className={styles.sizePicker} aria-label="푸들 크기별 체고 보기">
      <div>
        {poodleDetail.sizes.map((item, index) => (
          <button
            type="button"
            aria-pressed={activeSize === index}
            key={item.id}
            onClick={() => selectSize(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PoodleRealityCards() {
  const [activeSize, setActiveSize] = useState(0);
  const {
    current: mobileCard,
    handleScroll: handleMobileScroll,
    scrollTo: scrollToMobileCard,
    trackRef: mobileTrackRef,
  } = useSnapCarousel(poodleDetail.realities.length);
  const sizeReality = poodleDetail.realities.find((reality) => reality.id === "sizes");
  const coatReality = poodleDetail.realities.find((reality) => reality.id === "coat");

  if (!sizeReality || !coatReality) return null;

  return (
    <div className={`${styles.realityCarousel} mobile-edge-to-edge`} aria-label="푸들과 살 때 체감하는 두 가지" aria-roledescription="carousel">
      <div className={`${styles.realityGrid} mobile-edge-to-edge-track`} ref={mobileTrackRef} onScroll={handleMobileScroll}>
        <article className={styles.sizeReality}>
          <div className={styles.sizeVisual}>
            {poodleDetail.sizes.map((item, index) => (
              <Image
                className={styles.sizeImage}
                src={item.image}
                alt={activeSize === index ? item.imageAlt : ""}
                aria-hidden={activeSize !== index}
                data-active={activeSize === index || undefined}
                width={1200}
                height={900}
                sizes="(max-width: 767px) calc(100vw - 60px), 46vw"
                key={item.image}
              />
            ))}
            {poodleDetail.sizes.map((item, index) => (
              <span
                aria-hidden={activeSize !== index}
                aria-live={activeSize === index ? "polite" : undefined}
                data-active={activeSize === index || undefined}
                key={item.id}
              >
                <strong>{item.label}</strong><small>{item.range}</small>
              </span>
            ))}
          </div>
          <div className={styles.realityBody}>
            <h3>{sizeReality.title}</h3>
            <p>{sizeReality.body}</p>
            <PoodleSizePicker activeSize={activeSize} onSelect={setActiveSize} />
          </div>
        </article>
        <article>
          <Image
            src={coatReality.image!}
            alt={coatReality.imageAlt!}
            width={1200}
            height={900}
            sizes="(max-width: 767px) calc(100vw - 60px), 46vw"
          />
          <div className={styles.realityBody}>
            <h3>{coatReality.title}</h3>
            <p>{coatReality.body}</p>
          </div>
        </article>
      </div>
      <div className={styles.realityDots} aria-label="생활 현실 카드 선택">
        {poodleDetail.realities.map((reality, index) => (
          <button
            type="button"
            aria-label={`${index + 1}번째 ${reality.title} 보기`}
            aria-current={mobileCard === index ? "step" : undefined}
            onClick={() => scrollToMobileCard(index)}
            key={reality.id}
          />
        ))}
      </div>
    </div>
  );
}

export function PoodleReadinessChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => poodleDetail.readinessQuestions.map(() => false));
  const completed = checked.filter(Boolean).length;
  const allChecked = completed === checked.length;

  function toggleQuestion(index: number) {
    setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  return (
    <div className={styles.readinessChecklist}>
      <ul aria-label="푸들을 선택하기 전 생활 조건 확인">
        {poodleDetail.readinessQuestions.map((question, index) => (
          <li key={question} data-checked={checked[index] || undefined}>
            <label>
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggleQuestion(index)}
              />
              <span aria-hidden="true">{checked[index] ? "✓" : ""}</span>
              <strong>{question}</strong>
            </label>
          </li>
        ))}
      </ul>
      <p className={styles.readinessProgress} aria-live="polite">
        {allChecked ? "세 가지 생활 조건을 모두 확인했어요." : `세 가지 중 ${completed}가지를 확인했어요.`}
      </p>
      {allChecked && (
        <Link className={styles.readinessAction} href="/beginner-guide?breed=poodle">
          더 자세한 맞이 준비 보기 <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
