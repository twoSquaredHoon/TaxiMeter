import { HorseAnimation } from "../screen/shared/HorseAnimation.jsx";

export function TestMeterHorseBlock({ percent, isRunning, surcharge = false }) {
  const variant = surcharge ? "hurry" : "green";

  return (
    <div className="meter-horse-block">
      <div
        className={`meter-horse meter-horse--${variant}`}
        aria-hidden="true"
      >
        <HorseAnimation
          percent={percent}
          isRunning={isRunning}
          variant={variant}
        />
      </div>
      <span className="meter-percent">{percent}</span>
    </div>
  );
}
