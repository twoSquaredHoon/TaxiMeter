import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterMeta } from "./shared/MeterMeta.jsx";
import { MeterFare } from "./shared/MeterFare.jsx";
import { MeterBottom } from "./shared/MeterBottom.jsx";

/** 할증 — driving meter with 1.5× fare increment and surcharge styling */
export function SurchargeScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <MeterHorseBlock
          percent={meter.horsePercent}
          speedKmh={meter.speedKmh}
        />
        <MeterMeta speed={meter.speed} />
        <MeterFare fare={meter.fare} />
        <MeterBottom countdown={meter.countdown} />
      </MeterSection>
    </ScreenLayout>
  );
}
