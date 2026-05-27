export const CONFIG = {
  initialFare: 3000,
  fareIncrement: 100,
  countdownStart: 2000,
  countdownStepMs: 1000,
  countdownDecreasePerTick: 100,
  surchargeCountdownMultiplier: 2,
  speedUpdateMs: 120,
  simulatedSpeedKmh: 42,
};

export const STATUS_LABELS = {
  empty: "빈차",
  driving: "주행중",
  surcharge: "할증",
  payment: "지불",
};
