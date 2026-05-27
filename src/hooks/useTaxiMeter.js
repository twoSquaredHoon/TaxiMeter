import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG, STATUS_LABELS } from "../config.js";

function formatNumber(n) {
  return String(Math.round(n));
}

export function useTaxiMeter({ manualSpeedKmh = null } = {}) {
  const [mode, setMode] = useState("empty");
  const [fare, setFare] = useState(CONFIG.initialFare);
  const [countdown, setCountdown] = useState(CONFIG.countdownStart);
  const [surcharge, setSurcharge] = useState(false);
  const [speedKmh, setSpeedKmh] = useState(0);
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

  const applySpeed = useCallback((kmh) => {
    setSpeedKmh(kmh);
    setSpeed(`${kmh.toFixed(1)} Km/h`);
  }, []);

  const updateSpeed = useCallback(
    (currentMode) => {
      if (manualSpeedKmh !== null) {
        applySpeed(manualSpeedKmh);
        return;
      }

      if (currentMode === "driving") {
        const wobble = Math.sin(Date.now() / 400) * 2;
        applySpeed(CONFIG.simulatedSpeedKmh + wobble);
      } else {
        applySpeed(0);
      }
    },
    [manualSpeedKmh, applySpeed],
  );

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

    const countdownTimer = setInterval(() => {
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
    }, CONFIG.countdownStepMs);

    let speedTimer;

    if (manualSpeedKmh === null) {
      speedTimer = setInterval(() => {
        if (modeRef.current !== "driving") return;
        updateSpeed("driving");
      }, CONFIG.speedUpdateMs);
    }

    return () => {
      clearInterval(countdownTimer);
      if (speedTimer) clearInterval(speedTimer);
    };
  }, [mode, manualSpeedKmh, getIncrement, updateSpeed]);

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
    speedKmh,
    speed,
    activeButton,
    handleEmpty,
    handleDriving,
    handleSurcharge,
    handlePayment,
  };
}
