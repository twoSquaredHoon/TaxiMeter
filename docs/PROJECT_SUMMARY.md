# TaxiMeter — Project Summary

Handoff document for continuing work on this prototype. Read this before starting a new session or porting to iOS.

## What this project is

A **web prototype** of a Korean taxi meter phone UI. It is not a production app yet. The goal is to validate layout, interaction, and animation before an **iOS native** implementation.

- **Stack:** React 19, Vite 6, plain CSS (no UI framework)
- **Language:** Korean labels (`빈차`, `주행`, `할증`, `지불`)
- **Origin:** Migrated from a vanilla HTML/CSS/JS prototype in `prototype/` (removed); logic now lives in React under `src/`

## Target device (prototype frame)

All in-app sizing is relative to **`.device-frame`** (the phone box), not the browser window.

| Token | Value |
| --- | --- |
| Max width | `420px` (`--phone-max`) |
| Max height | `860px` (`--phone-max-height`) |
| Sizing inside frame | `cqw` / `cqh` (container query units), `%` |
| Avoid for in-app UI | `vw` / `vh` (browser viewport) |

`.device-frame` uses `container-type: size` so `cqw`/`cqh` match the mock phone. Only the outer frame height uses `dvh` so the box fits on desktop browsers.

**iOS port:** Use the same logical dimensions (e.g. 390×844 pt) or rebuild in SwiftUI with points — do not copy web `vw`/`vh` for meter layout.

## Repository layout

```
TaxiMeter/
├── index.html              # Main app entry → src/main.jsx
├── test/index.html         # Test harness entry → src/test/main.jsx
├── docs/                   # Handoff & history (this folder)
├── src/
│   ├── App.jsx             # device-frame + MeterScreen
│   ├── config.js           # Simulation constants
│   ├── index.css             # All production styles
│   ├── hooks/useTaxiMeter.js
│   ├── screen/             # Per-mode views + shared components
│   ├── assets/horse/       # horse-1…12.png, hurry-1…12.png
│   └── test/               # Isolated test app (speed / % overrides)
├── horse running/          # Original artist PNGs (source); copies in src/assets/horse
└── package.json
```

`dist/` and `node_modules/` are generated — not source of truth.

## UI regions (top to bottom)

1. **Status banner** — mode label; dimmed on 빈차; green tint on 지불
2. **Meter panel** — horse + % + speed (left of horse) + large fare + countdown
3. **Control grid** — 2×2: 빈차 | 주행, 할증 | 지불

Removed from UI (by design): trip number `34`, secondary green `0` next to countdown.

## Four modes (control buttons)

| Button | `mode` / flags | Behavior |
| --- | --- | --- |
| **빈차** | `empty` | Default on load. Fare/countdown reset. Speed `0`, horse `0%`, meter dimmed. |
| **주행** | `driving` | Starts simulation. Resets meter only when entering from non-driving. Toggling off **할증** does **not** reset countdown. |
| **할증** | `surcharge` toggle while `driving` | 2× countdown speed, 1.5× fare increment, pink fare, **hurry** horse sprites. Same `DrivingScreen` (no screen remount). |
| **지불** | `payment` | Stops simulation. Fare stays **bright blue**. Horse, speed, countdown reset visually and dimmed; countdown shows `2000`. |

## Simulation (`src/config.js` + `useTaxiMeter.js`)

| Setting | Value |
| --- | --- |
| Initial fare | 3000 |
| Fare increment | 100 (150 with surcharge) |
| Countdown start | 2000 |
| Tick interval | 1000 ms |
| Countdown step | −100 per tick (normal) |
| Surcharge countdown | 2× decrease per tick |
| Speed update | every 120 ms while driving |
| Simulated speed | ~42 km/h ± wobble |

**Horse animation**

- 12-frame PNG cycles (`horse-*` green, `hurry-*` surcharge)
- Both sets preloaded; visibility toggle (no remount) to avoid 할증 stutter
- Gallop interval from **horse %** (countdown progress): slow at 0%, normal at 50%, fast at 100%
- Runs when `speedKmh > 0` or % > 0

**Horse layout**

- Speed text: absolute left of horse row (does not steal width)
- Horse column: ~44% of meter row width, right-aligned

**Fare display**

- Large fare via `MeterFareStack` (fare + countdown grouped, tight gap)
- `font-size: clamp(4.5rem, 42cqw, 11rem)` on `.meter-fare`

## Architecture

```
App
 └── useTaxiMeter()          # single source of truth
 └── MeterScreen             # router: empty | payment | driving (+ surcharge styling)
      └── ScreenLayout       # banner + children + ControlButtons
           └── screen-specific meter content
```

**Driving** handles both normal driving and surcharge (`meter.surcharge`, `appClassName` includes `state-surcharge`). There is no separate `SurchargeScreen` file anymore (avoids remount flicker).

**Shared components** (`src/screen/shared/`):

| Component | Role |
| --- | --- |
| `ScreenLayout` | Banner + content + button grid |
| `MeterSection` | Right-aligned stack container |
| `MeterHorseBlock` | Speed (optional) + horse row + % |
| `HorseAnimation` | Dual-layer PNG frame cycling |
| `MeterFareStack` | Fare + countdown (tight spacing) |
| `MeterFare` / `MeterBottom` | Used inside stack |
| `ControlButtons` | Four mode buttons (주행 label only — no “시외”) |

## Test app (`src/test/`)

Separate Vite entry at `/test/`. Does not affect main app.

- `useTestMeter` wraps `useTaxiMeter` with manual **speed** and **%** overrides
- `TestControlMenu` — bottom-right panel: presets + custom input for km/h and %
- Own screen copies under `test/screens/` using `TestMeterHorseBlock`

Use for tuning horse animation without driving the full meter simulation.

## npm scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Main app at `/` |
| `npm run dev:test` | Test app at `/test/` |
| `npm run build` | Outputs `dist/` (main + test HTML) |
| `npm run preview` | Serve production build |

## Known constraints & decisions

1. **Prototype only** — no backend, GPS, or real fare rules
2. **Portrait phone frame** — not responsive for tablet/desktop as a real app
3. **Container queries** — required for correct scaling inside `.device-frame`; test by resizing browser but verify inside the box
4. **할증 / 주행** share one screen component — state toggles sprites and CSS, not route swap
5. **Assets** — 24 PNGs bundled via Vite; update `src/assets/horse/` and keep `horse-*` / `hurry-*` naming for glob import in `HorseAnimation.jsx`

## Planned next step (out of scope here)

- **iOS app** — reimplement UI and `useTaxiMeter` logic in Swift/SwiftUI
- Match phone frame logical size and safe areas
- Replace CSS `cqw`/`cqh` with layout relative to root view

## Related docs

- [Development history](./DEVELOPMENT_HISTORY.md) — chronological changes from initial prototype to now
- [README](../README.md) — quick start and config reference
