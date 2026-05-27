import { useCallback, useState } from "react";
import { useTaxiMeter } from "../hooks/useTaxiMeter.js";

export function useTestMeter() {
  const [manualSpeedKmh, setManualSpeedKmh] = useState(null);
  const meter = useTaxiMeter({ manualSpeedKmh });

  const setManualSpeed = useCallback((kmh) => {
    setManualSpeedKmh(Math.max(0, kmh));
  }, []);

  const useAutoSpeed = useCallback(() => {
    setManualSpeedKmh(null);
  }, []);

  return {
    ...meter,
    manualSpeedKmh,
    isManualSpeed: manualSpeedKmh !== null,
    setManualSpeed,
    useAutoSpeed,
  };
}
