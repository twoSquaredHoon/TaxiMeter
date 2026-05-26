/**
 * Taxi meter phone app — basic interaction prototype.
 * Taxi meter phone UI prototype.
 */

const CONFIG = {
  initialFare: 3000,
  fareIncrement: 100,
  countdownStart: 2000,
  countdownStepMs: 120,
  countdownDecreasePerTick: 4,
  simulatedSpeedKmh: 42,
};

const STATUS_LABELS = {
  empty: "빈차",
  driving: "주행중",
  surcharge: "할증",
  payment: "지불",
};

const app = document.getElementById("app");
const statusText = document.getElementById("status-text");
const fareEl = document.getElementById("fare");
const countdownEl = document.getElementById("countdown");
const speedEl = document.getElementById("speed");
const horsePercentEl = document.getElementById("horse-percent");

const buttons = {
  empty: document.getElementById("btn-empty"),
  driving: document.getElementById("btn-driving"),
  surcharge: document.getElementById("btn-surcharge"),
  payment: document.getElementById("btn-payment"),
};

let state = {
  mode: "driving",
  fare: CONFIG.initialFare,
  countdown: CONFIG.countdownStart,
  surcharge: false,
  tickTimer: null,
};

function formatNumber(n) {
  return String(Math.round(n));
}

function setMode(mode) {
  state.mode = mode;
  app.className = "app";

  if (mode === "surcharge") {
    state.surcharge = !state.surcharge;
    app.classList.toggle("state-surcharge", state.surcharge);
    statusText.textContent = state.surcharge ? "할증" : STATUS_LABELS.driving;
    buttons.surcharge.classList.toggle("active", state.surcharge);
    return;
  }

  state.surcharge = false;
  app.classList.remove("state-surcharge");
  buttons.surcharge.classList.remove("active");

  if (mode !== "driving") {
    app.classList.add(`state-${mode}`);
  }

  statusText.textContent = STATUS_LABELS[mode] ?? STATUS_LABELS.driving;

  Object.entries(buttons).forEach(([key, btn]) => {
    btn.classList.toggle("active", key === mode && mode !== "driving");
  });

  if (mode === "driving") {
    startSimulation();
  } else {
    stopSimulation();
    if (mode === "empty") {
      resetMeter();
    }
  }
}

function resetMeter() {
  state.fare = CONFIG.initialFare;
  state.countdown = CONFIG.countdownStart;
  updateDisplay();
}

function getIncrement() {
  const base = CONFIG.fareIncrement;
  return state.surcharge ? base * 1.5 : base;
}

function tick() {
  if (state.mode !== "driving") return;

  state.countdown -= CONFIG.countdownDecreasePerTick;

  if (state.countdown <= 0) {
    state.fare += getIncrement();
    state.countdown = CONFIG.countdownStart;
  }

  updateDisplay();
}

function updateDisplay() {
  fareEl.textContent = formatNumber(state.fare);
  countdownEl.textContent = formatNumber(Math.max(0, state.countdown));

  const progress =
    1 - state.countdown / CONFIG.countdownStart;
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));
  horsePercentEl.textContent = `${pct}%`;

  if (state.mode === "driving") {
    const wobble = Math.sin(Date.now() / 400) * 2;
    const speed = (CONFIG.simulatedSpeedKmh + wobble).toFixed(1);
    speedEl.textContent = `${speed} Km/h`;
  } else {
    speedEl.textContent = "0.0 Km/h";
  }
}

function startSimulation() {
  stopSimulation();
  state.tickTimer = setInterval(tick, CONFIG.countdownStepMs);
}

function stopSimulation() {
  if (state.tickTimer) {
    clearInterval(state.tickTimer);
    state.tickTimer = null;
  }
}

buttons.empty.addEventListener("click", () => setMode("empty"));
buttons.driving.addEventListener("click", () => {
  resetMeter();
  setMode("driving");
});
buttons.surcharge.addEventListener("click", () => {
  if (state.mode === "empty") setMode("driving");
  setMode("surcharge");
});
buttons.payment.addEventListener("click", () => setMode("payment"));

setMode("driving");
updateDisplay();
