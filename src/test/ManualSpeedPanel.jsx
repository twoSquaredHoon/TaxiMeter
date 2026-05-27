import { useState } from "react";

const PRESET_SPEEDS = [0, 20, 40, 60, 80];

export function ManualSpeedPanel({
  currentSpeedKmh,
  isManualSpeed,
  onSetSpeed,
  onAuto,
}) {
  const [inputValue, setInputValue] = useState("");

  const applyCustomSpeed = () => {
    const parsed = Number.parseFloat(inputValue);
    if (Number.isNaN(parsed) || parsed < 0) return;
    onSetSpeed(parsed);
  };

  return (
    <aside className="manual-speed-panel" aria-label="수동 속도 테스트">
      <p className="manual-speed-panel__label">속도 테스트</p>
      <p className="manual-speed-panel__current">
        {currentSpeedKmh.toFixed(1)} km/h
        {isManualSpeed ? " · 수동" : " · 자동"}
      </p>

      <div className="manual-speed-panel__presets">
        {PRESET_SPEEDS.map((kmh) => (
          <button
            key={kmh}
            type="button"
            className="manual-speed-panel__btn"
            onClick={() => onSetSpeed(kmh)}
          >
            {kmh}
          </button>
        ))}
      </div>

      <div className="manual-speed-panel__custom">
        <input
          type="number"
          className="manual-speed-panel__input"
          min="0"
          step="0.1"
          placeholder="km/h"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") applyCustomSpeed();
          }}
        />
        <button
          type="button"
          className="manual-speed-panel__btn manual-speed-panel__btn--apply"
          onClick={applyCustomSpeed}
        >
          적용
        </button>
      </div>

      <button
        type="button"
        className="manual-speed-panel__btn manual-speed-panel__btn--auto"
        onClick={onAuto}
        disabled={!isManualSpeed}
      >
        자동 속도
      </button>
    </aside>
  );
}
