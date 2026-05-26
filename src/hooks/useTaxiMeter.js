import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG, STATUS_LABELS } from "../config.js";

function formatNumber(n) {
  return String(Math.round(n));
}

export function useTaxiMeter() {
  const [mode, setMode] = useState("driving");
  const [fare, setFare] = useState(CONFIG.initialFare);
  const [countdown, setCountdown] = useState(CONFIG.countdownStart);
  const [surcharge, setSurcharge] = useState(false);
  const [speed, setSpeed] = useState("0.0 Km/h");

  const modeRef = useRef(mode);
  const surchargeRef = useRef(surcharge);

  modeRef.current = mode;
  surchargeRef.current = surcharge;

  const resetMeter = useCallback(() => {
    setFare(CONFIG.initialFare);
    setCountdown(CONFIG.countdownStart);
  }, []);

  const getIncrement = useCallback(() => {
    const base = CONFIG.fareIncrement;
    return surchargeRef.current ? base * 1.5 : base;
  }, []);

  const updateSpeed = useCallback((currentMode) => {
    if (currentMode === "driving") {
      const wobble = Math.sin(Date.now() / 400) * 2;
      const nextSpeed = (CONFIG.simulatedSpeedKmh + wobble).toFixed(1);
      setSpeed(`${nextSpeed} Km/h`);
    } else {
      setSpeed("0.0 Km/h");
    }
  }, []);

  const setMeterMode = useCallback(
    (nextMode) => {
      if (nextMode === "surcharge") {
        setSurcharge((active) => !active);
        return;
      }

      setSurcharge(false);
      setMode(nextMode);

      if (nextMode === "driving") {
        return;
      }

      if (nextMode === "empty") {
        resetMeter();
      }
    },
    [resetMeter],
  );

  useEffect(() => {
    if (mode !== "driving") {
      updateSpeed(mode);
      return;
    }

    updateSpeed("driving");

    const tickTimer = setInterval(() => {
      if (modeRef.current !== "driving") return;

      setCountdown((currentCountdown) => {
        const nextCountdown =
          currentCountdown - CONFIG.countdownDecreasePerTick;

        if (nextCountdown <= 0) {
          setFare((currentFare) => currentFare + getIncrement());
          return CONFIG.countdownStart;
        }

        return nextCountdown;
      });

      updateSpeed("driving");
    }, CONFIG.countdownStepMs);

    return () => clearInterval(tickTimer);
  }, [mode, getIncrement, updateSpeed]);

  const handleEmpty = useCallback(() => setMeterMode("empty"), [setMeterMode]);

  const handleDriving = useCallback(() => {
    resetMeter();
    setMeterMode("driving");
  }, [resetMeter, setMeterMode]);

  const handleSurcharge = useCallback(() => {
    if (modeRef.current === "empty") {
      setMeterMode("driving");
    }
    setMeterMode("surcharge");
  }, [setMeterMode]);

  const handlePayment = useCallback(
    () => setMeterMode("payment"),
    [setMeterMode],
  );

  const progress = 1 - countdown / CONFIG.countdownStart;
  const horsePercent = `${Math.min(100, Math.max(0, Math.round(progress * 100)))}%`;

  const statusText = surcharge
    ? STATUS_LABELS.surcharge
    : (STATUS_LABELS[mode] ?? STATUS_LABELS.driving);

  const appClassName = [
    "app",
    mode === "empty" ? "state-empty" : "",
    mode === "payment" ? "state-payment" : "",
    surcharge ? "state-surcharge" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const activeButton =
    mode === "surcharge" || surcharge
      ? "surcharge"
      : mode !== "driving"
        ? mode
        : null;

  return {
    mode,
    surcharge,
    appClassName,
    statusText,
    fare: formatNumber(fare),
    countdown: formatNumber(Math.max(0, countdown)),
    horsePercent,
    speed,
    activeButton,
    handleEmpty,
    handleDriving,
    handleSurcharge,
    handlePayment,
  };
}
