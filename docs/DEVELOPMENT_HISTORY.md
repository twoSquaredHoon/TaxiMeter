# Development History

Chronological record of how TaxiMeter evolved. Use with [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for full context.

## 1. Vanilla prototype

- Single `prototype/` folder: `index.html`, `app.js`, `styles.css`
- Dark portrait UI, status banner, meter readouts, 2×2 buttons
- Countdown 2000 → 0 with fare ticks; horse was a green SVG
- Default mode was driving

## 2. React + Vite migration

- Root `index.html` + `src/` React app
- `useTaxiMeter` hook for state and timers
- `screen/` folder with one file per mode
- `dist/` documented as build-only (not committed)

## 3. Screen-based structure

- `EmptyScreen`, `DrivingScreen`, `SurchargeScreen`, `PaymentScreen`
- `screen/shared/` for reusable pieces
- `MeterScreen` router in `screen/index.jsx`

## 4. Test harness

- `test/` Vite entry and `src/test/` for manual speed override
- Later expanded to **speed + percent** menu (`TestControlMenu`)
- Test screens kept separate from production to avoid polluting main hook

## 5. Horse animation (PNG)

- User-provided frames in `horse running/` (12 green + 12 hurry)
- Copied to `src/assets/horse/horse-1…12.png`, `hurry-1…12.png`
- `HorseAnimation.jsx` cycles frames; speed tied first to km/h, then to **horse %**

## 6. Mode behavior refinements

| Change | Reason |
| --- | --- |
| Default mode → **빈차** | Match parked / empty taxi |
| 빈차 forces 0 km/h, 0% horse | Clear “off” state |
| 할증 countdown **2×** faster | Product rule |
| 주행 from 할증 **without** countdown reset | Avoid fare timer jump |
| 지불: dim horse/countdown, **blue fare** held | Payment UX |
| 지불 / 빈차 reset countdown display to 2000 | Visual reset |

## 7. UI cleanup

- Removed trip number `34` and secondary `0`
- Removed **(시외)** from 주행 button
- `MeterFareStack` — fare and countdown grouped with small gap
- Large fare typography (`42cqw` in meter panel)

## 8. Horse layout & performance

- **할증 stutter fix:** stop swapping `DrivingScreen` / `SurchargeScreen`; one screen, toggle sprites
- Dual-layer horse images (green + hurry) always mounted, opacity swap
- Speed moved **left of horse** so horse can be wider
- Horse size tuned: ~44% of row (after iterations too big → reduced)

## 9. Sizing model (phone frame)

- Problem: `vw`/`vh` scaled against browser window on wide monitors
- Fix: `container-type: size` on `.device-frame`; in-app units → `cqw`/`cqh` and `%`
- Documented `--phone-max: 420px`, `--phone-max-height: 860px`
- README + this docs folder for iOS handoff

## 10. Current file map (production)

```
screen/index.jsx     → empty | payment | driving (surcharge = driving + flag)
DrivingScreen.jsx    → driving + 할증 (shared)
MeterHorseBlock.jsx  → speed + HorseAnimation + %
HorseAnimation.jsx   → green / hurry PNG layers
MeterFareStack.jsx   → fare + countdown
useTaxiMeter.js      → all meter state
```

## Removed / obsolete

- `prototype/` HTML app (deleted; React is canonical)
- `SurchargeScreen.jsx` (merged into driving flow)
- `HorseIcon.jsx` SVG (replaced by PNG animation)
- `MeterMeta` as separate row in main screens (speed lives in `MeterHorseBlock`)
- Browser-`vw` sizing for in-app elements (replaced by `cqw`/`cqh`)
