import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterFareStack } from "./shared/MeterFareStack.jsx";

/** 빈차 — meter reset, dimmed display, speed at 0 */
export function EmptyScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <MeterHorseBlock percent="0%" speedKmh={0} />
        <MeterFareStack
          fare={meter.fare}
          countdown={meter.countdown}
          speed={meter.speed}
        />
      </MeterSection>
    </ScreenLayout>
  );
}
