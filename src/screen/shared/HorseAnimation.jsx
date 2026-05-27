import { useEffect, useState } from "react";
import { CONFIG } from "../../config.js";

const frameModules = import.meta.glob("../../assets/horse/horse-*.png", {
  eager: true,
  import: "default",
});

const FRAMES = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = Number.parseInt(a.match(/horse-(\d+)\.png$/)?.[1] ?? "0", 10);
    const numB = Number.parseInt(b.match(/horse-(\d+)\.png$/)?.[1] ?? "0", 10);
    return numA - numB;
  })
  .map((path) => frameModules[path]);

const MIN_FRAME_MS = 55;
const MAX_FRAME_MS = 500;
const BASE_FRAME_MS = 95;

function frameIntervalMs(speedKmh) {
  if (speedKmh <= 0) return null;

  const reference = CONFIG.simulatedSpeedKmh;
  const scaled = (reference / speedKmh) * BASE_FRAME_MS;

  return Math.min(MAX_FRAME_MS, Math.max(MIN_FRAME_MS, scaled));
}

export function HorseAnimation({ speedKmh = 0 }) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (speedKmh <= 0) {
      setFrameIndex(0);
      return undefined;
    }

    const intervalMs = frameIntervalMs(speedKmh);

    const timer = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAMES.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [speedKmh]);

  if (FRAMES.length === 0) {
    return null;
  }

  return (
    <img
      className="horse-animation__frame"
      src={FRAMES[frameIndex]}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
