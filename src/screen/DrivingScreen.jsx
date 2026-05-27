import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterFareStack } from "./shared/MeterFareStack.jsx";

/** 주행 — live fare, countdown, and speed simulation */
export function DrivingScreen({ meter }) {
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
          surcharge={meter.surcharge}
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
