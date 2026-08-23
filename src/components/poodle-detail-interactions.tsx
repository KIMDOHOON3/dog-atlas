"use client";

import Image from "next/image";
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
  const step = poodleDetail.story.steps[activeStep];

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
      <Image
        className={styles.storyImage}
        src={step.image}
        alt={step.imageAlt}
        width={1200}
        height={800}
        sizes="(max-width: 900px) calc(100vw - 32px), 46vw"
        key={step.image}
      />
      <div className={styles.storyInteraction}>
        <div className={styles.stepTabs} role="tablist" aria-label="푸들의 과거에서 오늘까지 세 단계">
          {poodleDetail.story.steps.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`poodle-step-tab-${index}`}
              aria-controls="poodle-step-panel"
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
        <article
          className={styles.stepPanel}
          id="poodle-step-panel"
          role="tabpanel"
          aria-labelledby={`poodle-step-tab-${activeStep}`}
          tabIndex={0}
          key={step.navLabel}
        >
          <span>{step.eyebrow}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </article>
      </div>
      <div className={styles.storyCarousel} aria-label="푸들의 과거에서 오늘까지" aria-roledescription="carousel">
        <div className={styles.storyTrack} ref={mobileTrackRef} onScroll={handleMobileScroll}>
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
  const size = poodleDetail.sizes[activeSize];

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
      <output aria-live="polite"><strong>{size.label}</strong><span>{size.range}</span></output>
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
  const size = poodleDetail.sizes[activeSize];
  const sizeReality = poodleDetail.realities.find((reality) => reality.id === "sizes");
  const coatReality = poodleDetail.realities.find((reality) => reality.id === "coat");

  if (!sizeReality || !coatReality) return null;

  return (
    <div className={styles.realityCarousel} aria-label="푸들과 살 때 체감하는 두 가지" aria-roledescription="carousel">
      <div className={styles.realityGrid} ref={mobileTrackRef} onScroll={handleMobileScroll}>
        <article className={styles.sizeReality}>
          <div
            className={styles.sizeVisual}
            data-size={size.id}
            role="img"
            aria-label={`${size.label} 푸들을 중심으로 보여주는 네 가지 크기 비교 삽화`}
          >
            <span><strong>{size.label}</strong><small>{size.range}</small></span>
          </div>
          <div className={styles.realityBody}>
            <h3>{sizeReality.title}</h3>
            <p>{sizeReality.body}</p>
            <PoodleSizePicker activeSize={activeSize} onSelect={setActiveSize} />
          </div>
        </article>
        <article>
          <Image
            src={coatReality.image}
            alt={coatReality.imageAlt}
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
