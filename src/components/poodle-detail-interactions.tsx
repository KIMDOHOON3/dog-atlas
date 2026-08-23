"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { poodleDetail } from "@/content/poodle-detail/data";
import styles from "./poodle-detail.module.css";

export function PoodleStorySteps() {
  const [activeStep, setActiveStep] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
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
    </>
  );
}

export function PoodleSizePicker() {
  const [activeSize, setActiveSize] = useState(0);
  const size = poodleDetail.sizes[activeSize];

  return (
    <div className={styles.sizePicker} aria-label="푸들 크기별 체고 보기">
      <div>
        {poodleDetail.sizes.map((item, index) => (
          <button
            type="button"
            aria-pressed={activeSize === index}
            key={item.id}
            onClick={() => setActiveSize(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <output aria-live="polite"><strong>{size.label}</strong><span>{size.range}</span></output>
    </div>
  );
}
