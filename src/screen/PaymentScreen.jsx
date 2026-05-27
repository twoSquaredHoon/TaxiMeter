import { ScreenLayout } from "./shared/ScreenLayout.jsx";
import { MeterSection } from "./shared/MeterSection.jsx";
import { MeterHorseBlock } from "./shared/MeterHorseBlock.jsx";
import { MeterFareStack } from "./shared/MeterFareStack.jsx";
import { CONFIG } from "../config.js";

/** 지불 — fare held for payment; horse and countdown reset and dimmed */
export function PaymentScreen({ meter }) {
  return (
    <ScreenLayout
      className={meter.appClassName}
      statusText={meter.statusText}
      meter={meter}
    >
      <MeterSection>
        <MeterHorseBlock percent="0%" speedKmh={0} surcharge={false} />
        <MeterFareStack
          fare={meter.fare}
          countdown={String(CONFIG.countdownStart)}
          speed="0.0 Km/h"
        />
      </MeterSection>
    </ScreenLayout>
  );
}
