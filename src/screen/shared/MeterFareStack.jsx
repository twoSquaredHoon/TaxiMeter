import { MeterFare } from "./MeterFare.jsx";
import { MeterBottom } from "./MeterBottom.jsx";

export function MeterFareStack({ fare, countdown, speed }) {
  return (
    <div className="meter-fare-stack">
      <div className="meter-fare-group">
        {speed != null && (
          <span className="meter-speed meter-fare-stack__speed">{speed}</span>
        )}
        <MeterFare fare={fare} />
      </div>
      <MeterBottom countdown={countdown} />
    </div>
  );
}
