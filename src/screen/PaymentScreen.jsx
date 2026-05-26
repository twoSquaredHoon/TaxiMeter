import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterMeta } from "./shared/MeterMeta.jsx";
import { MeterFare } from "./shared/MeterFare.jsx";
import { MeterBottom } from "./shared/MeterBottom.jsx";

/** 지불 — fare held for payment, simulation stopped */
export function PaymentScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <MeterHorseBlock percent={meter.horsePercent} />
        <MeterMeta speed="0.0 Km/h" />
        <MeterFare fare={meter.fare} />
        <MeterBottom countdown={meter.countdown} />
      </MeterSection>
    </ScreenLayout>
  );
}
