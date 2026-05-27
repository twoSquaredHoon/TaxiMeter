import { TestEmptyScreen } from "./screens/TestEmptyScreen.jsx";
import { TestDrivingScreen } from "./screens/TestDrivingScreen.jsx";
import { TestPaymentScreen } from "./screens/TestPaymentScreen.jsx";

export function TestMeterScreen({ meter }) {
  if (meter.mode === "empty") {
    return <TestEmptyScreen meter={meter} />;
  }

  if (meter.mode === "payment") {
    return <TestPaymentScreen meter={meter} />;
  }

  return <TestDrivingScreen meter={meter} />;
}
