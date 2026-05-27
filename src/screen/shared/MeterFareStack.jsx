import { MeterFare } from "./MeterFare.jsx";
import { MeterBottom } from "./MeterBottom.jsx";

export function MeterFareStack({ fare, countdown }) {
  return (
    <div className="meter-fare-stack">
      <MeterFare fare={fare} />
      <MeterBottom countdown={countdown} />
    </div>
  );
}
