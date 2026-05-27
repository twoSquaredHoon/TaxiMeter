import { ScreenLayout } from "../../screen/shared/ScreenLayout.jsx";
import { MeterSection } from "../../screen/shared/MeterSection.jsx";
import { MeterFareStack } from "../../screen/shared/MeterFareStack.jsx";
import { TestMeterHorseBlock } from "../TestMeterHorseBlock.jsx";
import { CONFIG } from "../../config.js";

export function TestPaymentScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <TestMeterHorseBlock percent="0%" isRunning={false} surcharge={false} />
        <MeterFareStack
          fare={meter.fare}
          countdown={String(CONFIG.countdownStart)}
          speed="0.0 Km/h"
        />
      </MeterSection>
    </ScreenLayout>
  );
}
