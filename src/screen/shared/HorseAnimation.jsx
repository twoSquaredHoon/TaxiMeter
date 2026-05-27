import { useEffect, useState } from "react";

const greenModules = import.meta.glob("../../assets/horse/horse-*.png", {
  eager: true,
  import: "default",
});

const hurryModules = import.meta.glob("../../assets/horse/hurry-*.png", {
  eager: true,
  import: "default",
});

function loadFrames(modules, pattern) {
  return Object.keys(modules)
    .sort((a, b) => {
      const numA = Number.parseInt(a.match(pattern)?.[1] ?? "0", 10);
      const numB = Number.parseInt(b.match(pattern)?.[1] ?? "0", 10);
      return numA - numB;
    })
    .map((path) => modules[path]);
}

const GREEN_FRAMES = loadFrames(greenModules, /horse-(\d+)\.png$/);
const HURRY_FRAMES = loadFrames(hurryModules, /hurry-(\d+)\.png$/);
const FRAME_COUNT = Math.min(GREEN_FRAMES.length, HURRY_FRAMES.length);

for (const src of [...GREEN_FRAMES, ...HURRY_FRAMES]) {
  const img = new Image();
  img.src = src;
}

/** Frame duration (ms): slow at 0%, normal at 50%, fast at 100% */
const SLOW_FRAME_MS = 500;
const NORMAL_FRAME_MS = 95;
const FAST_FRAME_MS = 55;

export function parsePercentValue(percent) {
  if (typeof percent === "number") {
    return Math.min(100, Math.max(0, percent));
  }

  const parsed = Number.parseInt(String(percent).replace("%", ""), 10);
  return Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
}

export function frameIntervalMsFromPercent(percent) {
  const p = parsePercentValue(percent);

  if (p <= 50) {
    const t = p / 50;
    return SLOW_FRAME_MS - t * (SLOW_FRAME_MS - NORMAL_FRAME_MS);
  }

  const t = (p - 50) / 50;
  return NORMAL_FRAME_MS - t * (NORMAL_FRAME_MS - FAST_FRAME_MS);
}

export function HorseAnimation({
  percent = "0%",
  isRunning = false,
  variant = "green",
}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const percentValue = parsePercentValue(percent);
  const safeIndex = FRAME_COUNT === 0 ? 0 : frameIndex % FRAME_COUNT;

  useEffect(() => {
    if (!isRunning || FRAME_COUNT === 0) {
      setFrameIndex(0);
      return undefined;
    }

    const intervalMs = frameIntervalMsFromPercent(percentValue);

    const timer = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAME_COUNT);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isRunning, percentValue]);

  if (FRAME_COUNT === 0) {
    return null;
  }

  const showHurry = variant === "hurry";

  return (
    <div className="horse-animation">
      <img
        className={`horse-animation__frame horse-animation__frame--green${showHurry ? "" : " is-visible"}`}
        src={GREEN_FRAMES[safeIndex]}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <img
        className={`horse-animation__frame horse-animation__frame--hurry${showHurry ? " is-visible" : ""}`}
        src={HURRY_FRAMES[safeIndex]}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </div>
  );
}
