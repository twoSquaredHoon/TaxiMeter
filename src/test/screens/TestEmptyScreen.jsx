import { ScreenLayout } from "../../screen/shared/ScreenLayout.jsx";
import { MeterSection } from "../../screen/shared/MeterSection.jsx";
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
        <MeterFareStack
          fare={meter.fare}
          countdown={meter.countdown}
          speed={meter.speed}
        />
      </MeterSection>
    </ScreenLayout>
  );
}
