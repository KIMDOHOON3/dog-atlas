"use client";

import Image from "next/image";
import Link from "next/link";
import { flushSync } from "react-dom";
import {
  useEffect,
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import {
  createCardTransitionRenderer,
  type CardTransitionRenderer,
} from "@/lib/card-transition";
import { createFoilRenderer } from "@/lib/card-foil";
import { giantCards } from "@/content/giant-cards";
import { CardFront } from "./card-front";
import { CardBack } from "./card-back";
import styles from "./foil-card.module.css";

type Motion = {
  aim: (x: number, y: number) => void;
  point: (x: number, y: number) => void;
  demo: () => void;
  stop: () => void;
  flip: () => void;
  reset: () => void;
  slide: (direction: number, commit: (animate: boolean) => void) => void;
};
const limit = (value: number) => Math.min(1, Math.max(-1, value));

export function FoilCard() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [flipTarget, setFlipTarget] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [meshAvailable, setMeshAvailable] = useState(false);
  const [textureTarget, setTextureTarget] = useState(0);
  const transitionCanvas = useRef<HTMLCanvasElement>(null);
  const transition = useRef<CardTransitionRenderer | null>(null);
  const textureSources = useRef<HTMLDivElement>(null);
  const transitionKeys = useRef<[string, string] | null>(null);
  const [outgoing, setOutgoing] = useState<{
    index: number;
    back: boolean;
    direction: "next" | "previous";
  } | null>(null);
  const departingCard = useRef<HTMLDivElement>(null);
  const selecting = useRef(false);
  const pagination = useRef<HTMLElement>(null);
  const imageReady = useRef(new Map<string, Promise<unknown>>());
  const breed = giantCards[active];
  const canvas = useRef<HTMLCanvasElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const frontFace = useRef<HTMLDivElement>(null);
  const backFace = useRef<HTMLDivElement>(null);
  const glint = useRef<HTMLDivElement>(null);
  const motion = useRef<Motion | null>(null);
  const [foil, setFoil] = useState(true);
  const [strength, setStrength] = useState(70);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [demo, setDemo] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [turning, setTurning] = useState(false);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [contextVersion, setContextVersion] = useState(0);
  const settings = useRef({
    foil: true,
    strength: 70,
    flipped: false,
    woodland: false,
  });

  function prepareImage(src: string) {
    let ready = imageReady.current.get(src);
    if (!ready) {
      const image = new window.Image();
      image.src = src;
      ready = (image.decode?.() ?? Promise.resolve()).catch(() => {});
      imageReady.current.set(src, ready);
    }
    return ready;
  }

  const textureKey = useCallback((index: number, back = false) => {
    const source = textureSources.current;
    return `${index}-${back ? "back" : "front"}-${source?.offsetWidth}-${source?.offsetHeight}-${window.innerWidth}`;
  }, []);

  const prepareTexture = useCallback(
    async (index: number, back = false) => {
      const face = textureSources.current?.querySelector<HTMLElement>(
        `[data-snapshot="${index}-${back ? "back" : "front"}"]`,
      );
      if (!face || !transition.current) return false;
      return transition.current.prepare(textureKey(index, back), face);
    },
    [textureKey],
  );

  async function selectBreed(index: number) {
    if (index === active || selecting.current || !giantCards[index]) return;
    const preparationStart = performance.now();
    selecting.current = true;
    setSliding(true);
    setSelected(index);
    flushSync(() => setTextureTarget(index));
    await prepareImage(giantCards[index].front.src);
    if (!motion.current) return;
    transitionKeys.current = null;
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      transition.current
    ) {
      const from = textureKey(active, settings.current.flipped);
      const to = textureKey(index);
      const ready = await prepareTexture(active, settings.current.flipped);
      const nextReady = await prepareTexture(index);
      await transition.current?.settle();
      if (!motion.current) return;
      if (ready && nextReady) transitionKeys.current = [from, to];
    }
    if (card.current)
      card.current.dataset.slidePreparationMs = (
        performance.now() - preparationStart
      ).toFixed(2);
    motion.current.slide(index > active ? 1 : -1, (animate) => {
      setOutgoing(
        animate
          ? {
              index: active,
              back: settings.current.flipped,
              direction: index > active ? "next" : "previous",
            }
          : null,
      );
      settings.current.flipped = false;
      setFlipped(false);
      setFlipTarget(false);
      settings.current.woodland = giantCards[index].theme === "woodland";
      setActive(index);
    });
  }

  useEffect(() => {
    // Defer image decoding until the card has landed. Only warm nearby fronts
    // and the current reverse, rather than every neighboring reverse.
    if (sliding) return;
    void prepareImage(giantCards[active].back.src);
    giantCards.slice(Math.max(0, active - 1), active + 2).forEach((entry) => {
      void prepareImage(entry.front.src);
    });
  }, [active, sliding]);

  useEffect(() => {
    if (sliding || reduced) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      for (const [index, back] of [
        [active, false],
        [active, true],
        [active + 1, false],
        [active - 1, false],
      ] as const) {
        if (cancelled || selecting.current) break;
        if (!giantCards[index]) continue;
        await prepareTexture(index, back);
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, sliding, reduced, prepareTexture]);

  useEffect(() => {
    const nav = pagination.current;
    const selected = nav?.querySelector<HTMLElement>('[data-selected="true"]');
    if (!nav || !selected || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo?.({
      left: selected.offsetLeft - (nav.clientWidth - selected.offsetWidth) / 2,
      behavior: reduced ? "instant" : "smooth",
    });
  }, [selected, reduced]);

  useEffect(() => {
    if (sliding) return;
    card.current?.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      void img.decode?.().catch(() => {});
    });
  }, [active, sliding]);

  useEffect(() => {
    settings.current.foil = foil;
    settings.current.strength = strength;
    motion.current?.stop();
  }, [foil, strength]);

  useEffect(() => {
    const element = canvas.current;
    const surface = card.current;
    if (!element || !surface) return;
    surface.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      void img.decode?.().catch(() => {});
    });
    let renderer: ReturnType<typeof createFoilRenderer> = null;
    const meshCanvas = transitionCanvas.current;
    transition.current = meshCanvas
      ? createCardTransitionRenderer(meshCanvas)
      : null;
    let meshSlide = false;
    let slideFrames: number[] = [];
    let meshDrawMs: number[] = [];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let currentX = 0.18,
      currentY = -0.16;
    let targetX = currentX,
      targetY = currentY;
    let demoStart: number | null = null;
    let lastTime = 0;
    let nextFrameAt = 0;
    let lastFoilTime = -Infinity;
    let inView = true;
    let pendingPoint: [number, number] | null = null;
    let shaderDraws = 0;
    let textureFailed = false;
    let turnStart: number | null = null;
    let turnSwapped = false;
    let turnDirection = 1;
    let turnAngle = 0;
    let lift = 0;
    let turnSamples: number[] = [];
    let slideStart: number | null = null;
    let slideProgress = -1;
    const finishSlide = () => {
      if (slideStart === null) return;
      slideStart = null;
      slideProgress = -1;
      if (meshSlide && slideFrames.length > 1) {
        const gaps = slideFrames
          .slice(1)
          .map((time, i) => time - slideFrames[i])
          .sort((a, b) => a - b);
        surface.dataset.slideProfile = JSON.stringify({
          renderer: "webgl-mesh",
          frames: slideFrames.length,
          p95Ms: +gaps[Math.floor(gaps.length * 0.95)].toFixed(2),
          over33ms: gaps.filter((n) => n > 33.4).length,
          maxDrawMs: +Math.max(0, ...meshDrawMs).toFixed(2),
          canvas: [meshCanvas?.width, meshCanvas?.height],
        });
      }
      meshSlide = false;
      transition.current?.stop();
      surface.parentElement!.style.opacity = "1";
      surface.dataset.sliding = "false";
      delete surface.parentElement!.dataset.slideDirection;
      element.style.opacity = "1";
      if (departingCard.current) departingCard.current.style.opacity = "0";
      setOutgoing(null);
      selecting.current = false;
      setSliding(false);
    };
    const swapFace = () => {
      const back = !settings.current.flipped;
      settings.current.flipped = back;
      // Swap at the edge before the same frame paints, without mounting a new canvas.
      if (frontFace.current) frontFace.current.hidden = back;
      if (backFace.current) backFace.current.hidden = !back;
      setFlipped(back);
      setFlipTarget(back);
    };
    const finishTurn = () => {
      if (turnStart !== null && !turnSwapped) swapFace();
      if (turnStart !== null && turnSamples.length > 1) {
        const gaps = turnSamples
          .slice(1)
          .map((time, i) => time - turnSamples[i]);
        const sorted = [...gaps].sort((a, b) => a - b);
        surface.dataset.flipProfile = JSON.stringify({
          frames: turnSamples.length,
          p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
          over33ms: gaps.filter((gap) => gap > 33.4).length,
          side: settings.current.flipped ? "back" : "front",
        });
      }
      turnStart = null;
      turnAngle = lift = 0;
      surface.dataset.turning = "false";
      setTurning(false);
    };
    const profiling = new URLSearchParams(window.location.search).has(
      "profile",
    );
    let intervals: number[] = [];
    const render = (time: number, force = false) => {
      if (document.hidden || !inView) return;
      const tilt = media.matches ? 0 : 1;
      const movingCard = slideProgress >= 0;
      if (movingCard && meshSlide) {
        const before = performance.now();
        transition.current?.draw(
          slideProgress,
          settings.current.foil ? settings.current.strength / 100 : 0,
        );
        meshDrawMs.push(performance.now() - before);
        return;
      }
      const travel = movingCard ? Math.min(1, (slideProgress * 960) / 650) : 1;
      // Slide transforms belong to compositor animations on the wrapper.
      // Keep its child tilt surface stable while those layers are moving.
      if (!movingCard) {
        surface.style.transform = `translateY(${-lift * 10}px) rotateX(${(-currentY * 12 + lift * 5) * tilt}deg) rotateY(${(currentX * 15 * (1 - lift) + turnAngle) * tilt}deg) rotateZ(${-turnDirection * lift * 4}deg) scale(${1 + lift * 0.035})`;
      }
      element.style.opacity = movingCard && travel < 1 ? "0" : "1";
      const shine = movingCard
        ? Math.max(0, Math.min(1, (slideProgress * 960 - 620) / 340))
        : 0;
      const sheen =
        settings.current.foil && !media.matches ? Math.sin(shine * Math.PI) : 0;
      if (glint.current) {
        glint.current.style.opacity = String(
          Math.pow(lift, 8) * 0.45 +
            (sheen * 0.24 * settings.current.strength) / 100,
        );
        glint.current.style.transform = movingCard
          ? `translateX(${(shine * 2 - 1) * 70}%)`
          : "none";
      }
      if (
        settings.current.foil &&
        settings.current.strength > 0 &&
        (!movingCard || travel >= 1) &&
        (turnStart === null || force) &&
        (force || time - lastFoilTime >= 32)
      ) {
        renderer?.draw(
          currentX + sheen * 0.3,
          currentY,
          settings.current.strength / 100,
          settings.current.flipped,
          settings.current.woodland,
        );
        lastFoilTime = time;
        shaderDraws++;
      }
    };
    const tick = (time: number) => {
      frame = 0;
      if (disposed || document.hidden || !inView) return;
      // A 144/240Hz display must not multiply shader work or pointer processing.
      if (time + 0.5 < nextFrameAt) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (!nextFrameAt || nextFrameAt < time - 1000 / 60) nextFrameAt = time;
      nextFrameAt += 1000 / 60;
      let faceChanged = false;
      if (slideStart !== null) {
        if (meshSlide) slideFrames.push(time);
        slideProgress = Math.min(
          1,
          Math.max(0, (time - slideStart) / (meshSlide ? 820 : 960)),
        );

        if (slideProgress >= 1) finishSlide();
      }
      if (turnStart !== null) {
        if (profiling) turnSamples.push(time);
        const progress = Math.min(1, Math.max(0, (time - turnStart) / 480));
        const rotation = (1 - Math.cos(progress * Math.PI)) * 90;
        lift = Math.sin(progress * Math.PI);
        turnAngle = turnDirection * (rotation < 90 ? rotation : rotation - 180);
        if (progress >= 0.5 && !turnSwapped) {
          swapFace();
          turnSwapped = true;
          faceChanged = true;
        }
        if (progress >= 1) finishTurn();
      }
      if (pendingPoint) {
        const box = surface.parentElement!.getBoundingClientRect();
        targetX = limit(
          ((pendingPoint[0] - box.left) / Math.max(box.width, 1)) * 2 - 1,
        );
        targetY = limit(
          ((pendingPoint[1] - box.top) / Math.max(box.height, 1)) * 2 - 1,
        );
        pendingPoint = null;
      }
      if (profiling && demoStart !== null && lastTime)
        intervals.push(time - lastTime);
      const elapsed = Math.min(64, time - (lastTime || time));
      lastTime = time;
      if (demoStart !== null) {
        const progress = (time - demoStart) / 4400;
        if (progress >= 1 || media.matches) {
          if (profiling && intervals.length) {
            const sorted = [...intervals].sort((a, b) => a - b);
            surface.dataset.motionProfile = JSON.stringify({
              frames: intervals.length,
              shaderDraws,
              meanMs: +(
                intervals.reduce((sum, n) => sum + n, 0) / intervals.length
              ).toFixed(2),
              p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
              over33ms: intervals.filter((n) => n > 33.4).length,
              canvas: [element.width, element.height],
            });
          }
          demoStart = null;
          targetX = 0.18;
          targetY = -0.16;
          setDemo(false);
        } else {
          targetX = Math.sin(progress * Math.PI * 2) * 0.85;
          targetY = -Math.cos(progress * Math.PI * 2) * 0.65;
        }
      }
      const ease = 1 - Math.exp(-Math.max(elapsed, 8) / 65);
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      const moving =
        slideStart !== null ||
        turnStart !== null ||
        demoStart !== null ||
        Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.002;
      render(time, faceChanged || !moving);
      if (moving) frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame && !document.hidden && inView) {
        lastTime = 0;
        nextFrameAt = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      demoStart = null;
      setDemo(false);
      render(performance.now(), true);
      wake();
    };
    motion.current = {
      slide(direction, commit) {
        setTurning(false);
        cancelAnimationFrame(frame);
        frame = 0;
        turnStart = null;
        turnAngle = lift = 0;
        surface.dataset.turning = "false";
        demoStart = null;
        setDemo(false);
        pendingPoint = null;
        gesture.current = null;
        targetX = currentX;
        targetY = currentY;
        surface.style.transform = `rotateX(${-currentY * 12}deg) rotateY(${currentX * 15}deg)`;

        slideStart = performance.now();
        slideProgress = 0;
        const animate = !media.matches && !document.hidden && inView;
        const keys = transitionKeys.current;
        const width = surface.parentElement!.offsetWidth,
          height = surface.parentElement!.offsetHeight;
        meshSlide = Boolean(
          animate &&
          keys &&
          transition.current?.start(
            keys[0],
            keys[1],
            direction,
            width,
            height,
            (-currentY * 12 * Math.PI) / 180,
            (currentX * 15 * Math.PI) / 180,
          ),
        );
        slideFrames = [];
        meshDrawMs = [];
        // All uploads/decodes finished before the transition clock begins.
        flushSync(() => commit(animate && !meshSlide));
        slideStart = performance.now();
        if (!animate) {
          finishSlide();
          render(performance.now(), true);
          return;
        }
        surface.dataset.sliding = "true";
        if (meshSlide) {
          surface.parentElement!.style.opacity = "0";
        } else {
          surface.parentElement!.dataset.slideDirection =
            direction > 0 ? "next" : "previous";
        }
        render(performance.now());
        wake();
      },
      reset() {
        setTurning(false);
        cancelAnimationFrame(frame);
        frame = 0;
        turnStart = null;
        turnAngle = lift = 0;
        turnSamples = [];
        surface.dataset.turning = "false";
        pendingPoint = null;
        gesture.current = null;
        suppressClick.current = false;
        settings.current.flipped = false;
        setFlipped(false);
        setFlipTarget(false);
        if (frontFace.current) frontFace.current.hidden = false;
        if (backFace.current) backFace.current.hidden = true;
        targetX = currentX = 0.18;
        targetY = currentY = -0.16;
        stop();
      },
      aim(x, y) {
        if (media.matches || turnStart !== null || slideStart !== null) return;
        if (demoStart !== null) setDemo(false);
        demoStart = null;
        pendingPoint = null;
        targetX = limit(x);
        targetY = limit(y);
        wake();
      },
      point(x, y) {
        if (media.matches || turnStart !== null || slideStart !== null) return;
        if (demoStart !== null) setDemo(false);
        demoStart = null;
        pendingPoint = [x, y];
        wake();
      },
      demo() {
        if (media.matches || turnStart !== null || slideStart !== null) return;
        intervals = [];
        shaderDraws = 0;
        pendingPoint = null;
        demoStart = performance.now();
        setDemo(true);
        wake();
      },
      stop,
      flip() {
        if (turnStart !== null || selecting.current) return;
        demoStart = null;
        setDemo(false);
        pendingPoint = null;
        targetX = currentX;
        targetY = currentY;
        setFlipTarget(!settings.current.flipped);
        if (media.matches) {
          swapFace();
          render(performance.now(), true);
          return;
        }
        turnStart = performance.now();
        turnSamples = [];
        turnSwapped = false;
        turnDirection = settings.current.flipped ? -1 : 1;
        surface.dataset.turning = "true";
        setTurning(true);
        wake();
      },
    };
    renderer = createFoilRenderer(
      element,
      () => {
        element.dataset.materialReady = "true";
        render(performance.now(), true);
      },
      () => {
        textureFailed = true;
        setAvailable(false);
      },
    );
    renderer?.resize(element.clientWidth, element.clientHeight);
    const initial = requestAnimationFrame(() => {
      setAvailable(Boolean(renderer) && !textureFailed);
      setMeshAvailable(Boolean(transition.current));
      setReduced(media.matches);
      render(performance.now(), true);
    });
    const changePreference = () => {
      setReduced(media.matches);
      if (media.matches) {
        finishSlide();
        finishTurn();
        targetX = currentX;
        targetY = currentY;
      }
      stop();
    };
    const visibility = () => {
      if (document.hidden) {
        finishSlide();
        finishTurn();
        cancelAnimationFrame(frame);
        frame = 0;
        demoStart = null;
        setDemo(false);
      } else wake();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      setAvailable(false);
      finishSlide();
      finishTurn();
      cancelAnimationFrame(frame);
      frame = 0;
      demoStart = null;
      setDemo(false);
    };
    const meshLost = (event: Event) => {
      event.preventDefault();
      finishSlide();
      transition.current?.dispose();
      transition.current = null;
      wake();
    };
    const restored = () => setContextVersion((v) => v + 1);
    const observer = new ResizeObserver((entries) => {
      const size = entries[0]?.contentRect;
      if (size && slideStart !== null) finishSlide();
      if (size) renderer?.resize(size.width, size.height);
      render(performance.now(), true);
    });
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) {
        finishSlide();
        finishTurn();
        cancelAnimationFrame(frame);
        frame = 0;
        if (demoStart !== null) setDemo(false);
        demoStart = null;
      } else wake();
    });
    intersection.observe(surface);
    media.addEventListener("change", changePreference);
    document.addEventListener("visibilitychange", visibility);
    meshCanvas?.addEventListener("webglcontextlost", meshLost);
    meshCanvas?.addEventListener("webglcontextrestored", restored);
    element.addEventListener("webglcontextlost", lost);
    element.addEventListener("webglcontextrestored", restored);
    return () => {
      disposed = true;
      transition.current?.dispose();
      transition.current = null;
      meshCanvas?.removeEventListener("webglcontextlost", meshLost);
      meshCanvas?.removeEventListener("webglcontextrestored", restored);
      cancelAnimationFrame(initial);
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", changePreference);
      document.removeEventListener("visibilitychange", visibility);
      element.removeEventListener("webglcontextlost", lost);
      element.removeEventListener("webglcontextrestored", restored);
      renderer?.dispose();
      motion.current = null;
    };
  }, [contextVersion]);

  function point(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (
      start &&
      start.id === event.pointerId &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8
    ) {
      start.moved = true;
    }
    if (
      event.pointerType !== "mouse" &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;
    motion.current?.point(event.clientX, event.clientY);
  }
  function flip() {
    motion.current?.flip();
  }
  function keys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) flip();
      return;
    }
    if (event.key === "Escape" && flipped) {
      event.preventDefault();
      flip();
      return;
    }
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-0.8, 0],
      ArrowRight: [0.8, 0],
      ArrowUp: [0, -0.8],
      ArrowDown: [0, 0.8],
      Escape: [0.18, -0.16],
    };
    if (directions[event.key]) {
      event.preventDefault();
      motion.current?.aim(...directions[event.key]);
    }
  }

  return (
    <div className={styles.page} data-theme={breed.theme}>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="살아 있는 견종도감 홈"
        >
          <Image
            className={styles.brandWordmark}
            src="/images/brand/wordmark-l01.webp"
            alt="견종도감"
            width={624}
            height={208}
            unoptimized
            loading="eager"
          />
        </Link>
        <Link href="/discover" className={styles.back}>
          견종 둘러보기 <span>↗</span>
        </Link>
      </header>
      <main id="main" className={styles.main} aria-label="초대형견 카드 도감">
        <h1 className={styles.srOnly}>살아 있는 견종도감</h1>
        <div className={styles.collectionLabel}>초대형견</div>
        <div className={styles.exhibit}>
          <button
            className={styles.previousCard}
            onClick={() => selectBreed(active - 1)}
            disabled={active === 0}
            aria-disabled={sliding || active === 0}
            aria-label="이전 견종"
          >
            ←
          </button>
          <div className={styles.stage} aria-busy={sliding}>
            <div className={styles.shadow} />
            <canvas
              ref={transitionCanvas}
              className={styles.meshCanvas}
              aria-hidden="true"
              data-transition-canvas="true"
            />
            <div
              ref={textureSources}
              className={styles.textureSources}
              aria-hidden="true"
            >
              {meshAvailable &&
                [...new Set([active, active - 1, active + 1, textureTarget])]
                  .filter((index) => giantCards[index])
                  .map((index) => (
                    <div
                      className={styles.face}
                      key={index}
                      data-snapshot={`${index}-front`}
                      data-theme={giantCards[index].theme}
                    >
                      <CardFront breed={giantCards[index]} />
                    </div>
                  ))}
              {meshAvailable && (
                <div
                  className={styles.face}
                  data-snapshot={`${active}-back`}
                  data-theme={breed.theme}
                >
                  <CardBack breed={breed} />
                </div>
              )}
            </div>
            <div className={styles.deckPreview} aria-hidden="true">
              {[2, 1].map((depth) =>
                giantCards[active + depth] ? (
                  <div
                    key={depth}
                    className={styles.deckCard}
                    data-depth={depth}
                  />
                ) : null,
              )}
            </div>
            {outgoing && (
              <div
                className={styles.departingCard}
                data-departing="true"
                data-slide-direction={outgoing.direction}
                ref={departingCard}
                aria-hidden="true"
                data-theme={giantCards[outgoing.index].theme}
              >
                <div className={styles.face}>
                  {outgoing.back ? (
                    <CardBack breed={giantCards[outgoing.index]} />
                  ) : (
                    <CardFront breed={giantCards[outgoing.index]} />
                  )}
                </div>
              </div>
            )}
            <div
              className={styles.interaction}
              tabIndex={0}
              role="group"
              aria-label={`${breed.name} 홀로그램 카드`}
              aria-describedby="card-instructions"
              data-side={flipped ? "back" : "front"}
              onPointerMove={point}
              onClick={(e) => {
                if (e.detail === 0 || !suppressClick.current) flip();
                suppressClick.current = false;
              }}
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                if (gesture.current) {
                  gesture.current.moved = true;
                  suppressClick.current = true;
                  return;
                }
                suppressClick.current = false;
                gesture.current = {
                  id: e.pointerId,
                  x: e.clientX,
                  y: e.clientY,
                  moved: false,
                };
                e.currentTarget.setPointerCapture(e.pointerId);
                point(e);
              }}
              onPointerUp={(e) => {
                const start = gesture.current;
                if (!start || start.id !== e.pointerId) return;
                suppressClick.current =
                  start.moved ||
                  Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8;
                gesture.current = null;
                if (e.currentTarget.hasPointerCapture(e.pointerId))
                  e.currentTarget.releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={() => {
                gesture.current = null;
                suppressClick.current = true;
                motion.current?.aim(0.18, -0.16);
              }}
              onLostPointerCapture={() => {
                if (gesture.current) {
                  gesture.current = null;
                  suppressClick.current = true;
                }
              }}
              onPointerLeave={(e) => {
                if (!e.currentTarget.hasPointerCapture(e.pointerId))
                  motion.current?.aim(0.18, -0.16);
              }}
              onKeyDown={keys}
            >
              <div
                className={styles.card}
                ref={card}
                data-foil={foil && strength > 0 && available === true}
              >
                <div className={styles.turner} data-flipped={flipped}>
                  <div
                    className={styles.face}
                    data-theme={breed.theme}
                    ref={frontFace}
                    hidden={flipped}
                    aria-hidden={flipped}
                  >
                    <CardFront breed={breed} priority />
                  </div>
                  <div
                    className={styles.face}
                    data-theme={breed.theme}
                    ref={backFace}
                    hidden={!flipped}
                    aria-hidden={!flipped}
                  >
                    <CardBack breed={breed} />
                  </div>
                  <div className={styles.coating} aria-hidden="true">
                    <canvas
                      ref={canvas}
                      className={styles.foil}
                      data-renderer={
                        available === null
                          ? "loading"
                          : available
                            ? "webgl"
                            : "unavailable"
                      }
                    />
                    <div className={styles.flipGlint} ref={glint} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className={styles.nextCard}
            onClick={() => selectBreed(active + 1)}
            disabled={active === giantCards.length - 1}
            aria-disabled={sliding || active === giantCards.length - 1}
            aria-label="다음 견종"
          >
            →
          </button>
        </div>
        <nav
          ref={pagination}
          className={styles.cardPagination}
          aria-label="초대형견 선택"
        >
          <div className={styles.paginationTrack}>
            <span
              className={styles.paginationLine}
              aria-hidden="true"
              style={{ transform: `translateX(${selected * 48}px)` }}
            />
            {giantCards.map((entry, index) => (
              <button
                key={entry.slug}
                aria-label={entry.name}
                aria-current={active === index ? "true" : undefined}
                data-selected={selected === index}
                aria-disabled={sliding}
                onClick={() => selectBreed(index)}
              >
                <span>{entry.number}</span>
                <span className={styles.srOnly}>{entry.name}</span>
              </button>
            ))}
          </div>
        </nav>
        <span className={styles.srOnly} aria-live="polite">
          {breed.name}, {active + 1} / {giantCards.length}
        </span>
        <div className={styles.cardActions}>
          <button
            className={styles.flipButton}
            onClick={flip}
            aria-pressed={flipped}
            aria-label={flipped ? "그림으로 돌아가기" : "뒤집어서 알아보기"}
            data-turning={turning}
            data-back={flipTarget}
            disabled={sliding}
          >
            <Image
              className={styles.flipIcon}
              src="/images/card-controls/flip-f08.webp"
              alt=""
              aria-hidden="true"
              width={192}
              height={192}
              unoptimized
              loading="eager"
              draggable={false}
            />
            <span className={styles.flipLabels} aria-hidden="true">
              <span data-visible={!flipTarget}>뒤집어서 알아보기</span>
              <span data-visible={flipTarget}>그림으로 돌아가기</span>
            </span>
          </button>
          <Link
            className={styles.detailLink}
            href={`/breeds/${breed.slug}`}
            aria-label={`${breed.name} 자세히 보기`}
            prefetch={false}
          >
            <Image
              className={styles.detailIcon}
              src="/images/card-controls/detail-d10.webp"
              alt=""
              width={192}
              height={192}
              unoptimized
              loading="eager"
              draggable={false}
            />
            견종 자세히 보기
          </Link>
        </div>
        <p className={styles.srOnly} id="card-instructions">
          방향키로 기울이기 · Enter 또는 Space로 뒤집기
        </p>
        <div className={styles.controls} aria-label="카드 질감 조절">
          <button
            aria-pressed={foil}
            onClick={() => setFoil((value) => !value)}
            disabled={available === false}
          >
            <i className={styles.indicator} aria-hidden="true" />
            홀로그램 <span>{foil ? "켜짐" : "꺼짐"}</span>
          </button>
          <label className={styles.strength}>
            빛의 강도
            <input
              type="range"
              min="0"
              max="100"
              value={strength}
              disabled={!foil || available === false}
              onChange={(event) => setStrength(Number(event.target.value))}
            />
            <output>{strength}%</output>
          </label>
          <button
            onClick={() =>
              demo ? motion.current?.stop() : motion.current?.demo()
            }
            disabled={reduced || available === false}
          >
            {demo ? "움직임 멈추기" : "빛 움직여 보기"}
            <span aria-hidden="true">{demo ? "Ⅱ" : "↗"}</span>
          </button>
        </div>
        {(available === false || reduced) && (
          <p className={styles.status} role="status">
            {available === false
              ? "이 환경에서는 홀로그램을 사용할 수 없어 기본 그림을 보여드려요."
              : "기기의 움직임 줄이기 설정에 따라 카드를 고정했어요."}
          </p>
        )}
      </main>
      <footer className={styles.footer}>
        <span>살아 있는 견종도감</span>
        <span>ONE BREED. A CLOSER LOOK.</span>
      </footer>
    </div>
  );
}
