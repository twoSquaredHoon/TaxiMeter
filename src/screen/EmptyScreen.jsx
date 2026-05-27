import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterMeta } from "./shared/MeterMeta.jsx";
import { MeterFare } from "./shared/MeterFare.jsx";
import { MeterBottom } from "./shared/MeterBottom.jsx";

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
        <MeterMeta speed={meter.speed} />
        <MeterFare fare={meter.fare} />
        <MeterBottom countdown={meter.countdown} />
      </MeterSection>
    </ScreenLayout>
  );
}
