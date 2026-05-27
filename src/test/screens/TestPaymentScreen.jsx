import { ScreenLayout } from "../../screen/shared/ScreenLayout.jsx";
import { MeterSection } from "../../screen/shared/MeterSection.jsx";
import { MeterMeta } from "../../screen/shared/MeterMeta.jsx";
import { MeterFare } from "../../screen/shared/MeterFare.jsx";
import { MeterBottom } from "../../screen/shared/MeterBottom.jsx";
import { TestMeterHorseBlock } from "../TestMeterHorseBlock.jsx";

export function TestPaymentScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <TestMeterHorseBlock
          percent={meter.horsePercent}
          isRunning={meter.horseIsRunning}
          surcharge={false}
        />
        <MeterMeta speed={meter.speed} />
        <MeterFare fare={meter.fare} />
        <MeterBottom countdown={meter.countdown} />
      </MeterSection>
    </ScreenLayout>
  );
}
