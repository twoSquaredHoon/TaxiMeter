# 뉴·프로+ Taxi Meter — Complete Visual Specification

## Scope

This document describes the visible taxi-meter display, the physical screen housing, and the lower action-button strip shown in the reference image. The focus is the screen UI and the buttons directly beneath it.

---

## Overall Appearance

The meter uses a glossy, dark navy/black digital display set into a dark plastic housing. The screen background is close to `#0a0d1a`, with a slight blue tint instead of pure black. A faint scanline or low-resolution LCD texture is visible across the screen.

The display is reflective, with visible glare and soft reflections on the glass. The UI looks like an illuminated LCD: text and numbers have strong contrast, slight bloom, and soft antialiasing. The whole display is photographed at a slight angle, so the rectangular screen appears mildly skewed in perspective.

The housing is matte-to-semi-gloss black plastic. The screen has rounded corners and sits slightly recessed into the bezel. Small hardware details are visible around the lower left edge, including a screw/fastener and a cord or strap attachment.

---

## Screen Layout

The screen is divided visually into three main zones:

1. **Top status row** — brand, trip/sequence number, and speed.
2. **Left status column** — horse icon, percentage, countdown number, and mode badge.
3. **Main fare area** — large fare amount, currency labels, call/extra counter, and bottom ticker.

A translucent dark olive/yellow-green rectangle appears behind part of the main fare area, especially toward the lower-right side of the screen. This creates a subtle panel effect behind the large `3000` and the smaller `0` counter.

---

## Top Status Row

| Element | Visual Details |
|---|---|
| Brand text | `뉴·프로 +`, warm yellow-orange, approximately `#ffcc00`. Small, narrow, display-style text near the top-left/upper-center of the screen. |
| Trip/sequence number | `34`, muted purple/lavender, approximately `#9966cc`. Located below/right of the brand text and left of the speed. |
| Speed | `0.0 Km/h`, bright green, approximately `#00e676`. Bold digital/monospace style. Positioned along the top row to the right of `34`. |
| Currency unit | `원` with `(WON)` beneath or beside it, small pale text on the right side of the main fare area. The label is stacked vertically. |

---

## Left Status Column

| Element | Visual Details |
|---|---|
| Small top icon | A small circular blue/purple icon sits above the horse symbol. It appears like a small indicator light or status icon. |
| Horse icon | Neon green, approximately `#00e676`. Running horse silhouette facing right. Pixel/vector style, roughly 40×30 px in the source image. |
| Percentage | `0%`, white or very pale blue-white, bold, centered below the horse icon. |
| Distance countdown | `1988`, hot pink/magenta, approximately `#ff2299`. Large bold digital text, roughly 32–36 px relative to the screen. |
| Mode badge | Blue rounded rectangle, approximately `#1565c0`, with white Korean text that appears to read `주영`. Positioned below the countdown number. |

---

## Main Fare Area

| Element | Visual Details |
|---|---|
| Fare amount | `3000`, very large cyan/light blue, approximately `#00e5ff` to pale cyan. Largest text on the screen. Ultra-bold digital/monospace style with a slight glow. |
| Fare alignment | Horizontally centered in the right two-thirds of the display. Vertically placed slightly above center. |
| Currency label | Small stacked `원` and `(WON)` label appears to the right of the fare amount. White/pale gray text. |
| Call/extra counter | `0`, yellow-green, approximately `#ccff44`. Smaller than the fare amount and placed below/right of `3000`. |
| Call label | Small pale stacked Korean text near the `0`, reading as `호출` / `요금` or a similar call-fare label. |

---

## Dynamic Fare / Distance Behavior

The magenta countdown number shown as `1988` is a movement-based countdown value.

- The countdown starts at `2000`.
- As the taxi moves, this number decreases.
- When the countdown reaches `0`, the main fare amount on the right increases.
- After increasing the fare, the countdown resets back to `2000` and begins decreasing again.

This means the left magenta value is not static. It is a distance or movement interval counter that controls when the fare increments.

Example behavior:

```text
Countdown starts: 2000
Taxi moves:       1988 → 1987 → 1986 → ... → 0
At 0:             fare increases
Then:             countdown resets to 2000
```

The large cyan fare value, shown as `3000`, should update only when the countdown reaches zero or when another fare rule applies.

---

## Bottom Ticker Text

A thin line of very small text runs along the bottom of the screen above the physical buttons. It appears in dim gray-green, close to `#445544`, and is roughly 8–9 px tall.

Approximate visible content:

```text
1.총주행거리 km   2.영업거리 km   3.영업횟수   4.이후횟수   5.할인요금
```

The text is low-contrast and partially blurred by the photo, so it should be treated as a visual guide rather than exact confirmed copy.

---

## Serial Number

At the lower-left edge of the display area, a small serial number label appears:

```text
S.No: 114852
```

Visual details:

- Very small, approximately 8–9 px.
- Dark gray, close to `#333333`.
- Monospace or narrow digital-style text.
- Positioned at the absolute lower-left of the screen area, partly blending into the dark background.

---

## Lower Action-Button Strip

The button strip sits directly below the display. The buttons are short, wide rectangles with slight rounding and thin dark gaps between them. They appear like printed or laminated labels on physical buttons, with some glare and perspective distortion.

The visible buttons are:

| Button | Label | Background | Text Color | Notes |
|---|---|---|---|---|
| 1 | `빈차` | White / very light gray | Black or very dark navy | Widest and clearest visible button. |
| 2 | `주행` | Pale blue-white / blue-tinted | Dark blue | The source spec described this as royal blue, but the photo appears lighter because of glare and label material. |
| 3 | `할증` | Pink / hot pink, close to `#ff69b4` | Dark text | Centered bold Korean text. |
| 4 | `복합` | Yellow, close to `#ffdd00` | Dark text | The image appears to show `복합`, not `예약`. |
| 5 | Partially visible | Green, close to `#22bb44` | Dark or white text | Mostly covered by the finger; only part of the first character is visible. |
| 6 | Mostly obscured / out of clear view | Not reliably confirmed | Not reliably confirmed | Presence is implied by the strip layout, but the label and color are not clear from the image. |

The strip is slightly recessed into the black housing. The bottom edge of the screen and the top edge of the buttons are close together, with only a narrow black separator.

---

## Additional Visual Notes

- The screen content uses a digital, monospaced, high-legibility style.
- Major numbers use bright neon-like colors against the dark screen.
- The `3000` fare number has the strongest visual priority.
- The `1988` countdown is the second-most prominent number.
- The left column is visually balanced by the large fare area on the right.
- The display has a practical, utilitarian taxi-meter UI style rather than a modern flat-app style.
- The photographed finger covers part of the green button area, so hidden labels should not be guessed unless confirmed by another reference.
- For a pixel-perfect app recreation, the UI should preserve the dense spacing, small utility labels, muted bottom ticker, and bright neon numeric hierarchy.

---

## Color Reference

| Element | Approximate Color |
|---|---:|
| Screen background | `#0a0d1a` |
| Brand `뉴·프로 +` | `#ffcc00` |
| Trip number `34` | `#9966cc` |
| Speed `0.0 Km/h` | `#00e676` |
| Horse icon | `#00e676` |
| `0%` text | `#ffffff` |
| Countdown `1988` | `#ff2299` |
| Fare `3000` | `#00e5ff` |
| Call counter `0` | `#ccff44` |
| Mode badge background | `#1565c0` |
| Mode badge text | `#ffffff` |
| Ticker text | `#445544` |
| Serial number text | `#333333` |
| `빈차` button | White background / black text |
| `주행` button | Pale blue-white background / dark blue text |
| `할증` button | Pink background / dark text |
| `복합` button | Yellow background / dark text |
| Partially visible green button | `#22bb44` approximate |

---

## Implementation Notes for App Recreation

- Render the display on a dark, rounded rectangle with a subtle scanline overlay.
- Use a bold digital or monospaced font for numeric values.
- Add a faint glow or text shadow to the neon values, especially `3000`, `1988`, and `0.0 Km/h`.
- Keep the bottom ticker extremely small and low-contrast.
- Treat the `1988` field as a live countdown initialized at `2000`.
- Increment the fare when the countdown reaches `0`, then reset the countdown to `2000`.
- Do not over-modernize spacing; the UI should feel compact, dense, and hardware-like.
