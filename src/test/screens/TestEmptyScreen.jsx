import { ScreenLayout } from "../../screen/shared/ScreenLayout.jsx";
import { MeterSection } from "../../screen/shared/MeterSection.jsx";
import { MeterMeta } from "../../screen/shared/MeterMeta.jsx";
import { MeterFareStack } from "../../screen/shared/MeterFareStack.jsx";
import { TestMeterHorseBlock } from "../TestMeterHorseBlock.jsx";

export function TestEmptyScreen({ meter }) {
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
        <MeterFareStack fare={meter.fare} countdown={meter.countdown} />
      </MeterSection>
    </ScreenLayout>
  );
}
