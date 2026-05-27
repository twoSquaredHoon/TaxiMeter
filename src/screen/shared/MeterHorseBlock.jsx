import { HorseAnimation } from "./HorseAnimation.jsx";

export function MeterHorseBlock({ percent, speedKmh = 0 }) {
  return (
    <div className="meter-horse-block">
      <div className="meter-horse" aria-hidden="true">
        <HorseAnimation speedKmh={speedKmh} />
      </div>
      <span className="meter-percent">{percent}</span>
    </div>
  );
}
