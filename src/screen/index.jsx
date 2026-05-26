import { EmptyScreen } from "./EmptyScreen.jsx";
import { DrivingScreen } from "./DrivingScreen.jsx";
import { SurchargeScreen } from "./SurchargeScreen.jsx";
import { PaymentScreen } from "./PaymentScreen.jsx";

export function MeterScreen({ meter }) {
  if (meter.mode === "empty") {
    return <EmptyScreen meter={meter} />;
  }

  if (meter.mode === "payment") {
    return <PaymentScreen meter={meter} />;
  }

  if (meter.surcharge) {
    return <SurchargeScreen meter={meter} />;
  }

  return <DrivingScreen meter={meter} />;
}
