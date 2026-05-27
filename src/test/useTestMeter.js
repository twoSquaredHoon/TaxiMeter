import { useCallback, useState } from "react";
import { useTaxiMeter } from "../hooks/useTaxiMeter.js";

export function useTestMeter() {
  const base = useTaxiMeter();
  const [manualSpeedKmh, setManualSpeedKmh] = useState(null);
  const [manualPercent, setManualPercentValue] = useState(null);

  const setManualSpeed = useCallback((kmh) => {
    setManualSpeedKmh(Math.max(0, kmh));
  }, []);

  const useAutoSpeed = useCallback(() => {
    setManualSpeedKmh(null);
  }, []);

  const setManualPercent = useCallback((percent) => {
    setManualPercentValue(Math.min(100, Math.max(0, Math.round(percent))));
  }, []);

  const useAutoPercent = useCallback(() => {
    setManualPercentValue(null);
  }, []);

  const isEmpty = base.mode === "empty";

  const speedKmh = isEmpty ? 0 : (manualSpeedKmh ?? base.speedKmh);
  const horseProgress = isEmpty ? 0 : (manualPercent ?? base.horseProgress);
  const horsePercent = `${horseProgress}%`;
  const horseIsRunning = !isEmpty && (speedKmh > 0 || horseProgress > 0);

  return {
    ...base,
    speedKmh,
    speed: `${speedKmh.toFixed(1)} Km/h`,
    horseProgress,
    horsePercent,
    horseIsRunning,
    isManualSpeed: manualSpeedKmh !== null,
    isManualPercent: manualPercent !== null,
    setManualSpeed,
    useAutoSpeed,
    setManualPercent,
    useAutoPercent,
  };
}
