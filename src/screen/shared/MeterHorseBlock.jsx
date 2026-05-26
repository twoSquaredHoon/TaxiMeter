import { HorseIcon } from "./HorseIcon.jsx";

export function MeterHorseBlock({ percent }) {
  return (
    <div className="meter-horse-block">
      <div className="meter-horse" aria-hidden="true">
        <HorseIcon />
      </div>
      <span className="meter-percent">{percent}</span>
    </div>
  );
}
