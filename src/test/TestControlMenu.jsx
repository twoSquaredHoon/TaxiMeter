import { useState } from "react";

const SPEED_PRESETS = [0, 20, 40, 60, 80];
const PERCENT_PRESETS = [0, 25, 50, 75, 100];

function PresetRow({ values, suffix, onSelect }) {
  return (
    <div className="test-menu__presets">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className="test-menu__btn"
          onClick={() => onSelect(value)}
        >
          {value}
          {suffix}
        </button>
      ))}
    </div>
  );
}

function CustomRow({ placeholder, value, onChange, onApply, applyLabel = "적용" }) {
  return (
    <div className="test-menu__custom">
      <input
        type="number"
        className="test-menu__input"
        min="0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onApply();
        }}
      />
      <button type="button" className="test-menu__btn test-menu__btn--apply" onClick={onApply}>
        {applyLabel}
      </button>
    </div>
  );
}

export function TestControlMenu({ meter }) {
  const [speedInput, setSpeedInput] = useState("");
  const [percentInput, setPercentInput] = useState("");

  const applyCustomSpeed = () => {
    const parsed = Number.parseFloat(speedInput);
    if (Number.isNaN(parsed) || parsed < 0) return;
    meter.setManualSpeed(parsed);
  };

  const applyCustomPercent = () => {
    const parsed = Number.parseFloat(percentInput);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 100) return;
    meter.setManualPercent(parsed);
  };

  return (
    <aside className="test-menu" aria-label="테스트 제어 메뉴">
      <p className="test-menu__title">테스트 메뉴</p>

      <section className="test-menu__section">
        <header className="test-menu__section-head">
          <span className="test-menu__label">속도</span>
          <span className="test-menu__value">
            {meter.speedKmh.toFixed(1)} km/h
            {meter.isManualSpeed ? " · 수동" : " · 자동"}
          </span>
        </header>
        <PresetRow values={SPEED_PRESETS} suffix="" onSelect={meter.setManualSpeed} />
        <CustomRow
          placeholder="km/h"
          value={speedInput}
          onChange={setSpeedInput}
          onApply={applyCustomSpeed}
        />
        <button
          type="button"
          className="test-menu__btn test-menu__btn--reset"
          onClick={meter.useAutoSpeed}
          disabled={!meter.isManualSpeed}
        >
          자동 속도
        </button>
      </section>

      <section className="test-menu__section">
        <header className="test-menu__section-head">
          <span className="test-menu__label">퍼센트</span>
          <span className="test-menu__value test-menu__value--percent">
            {meter.horsePercent}
            {meter.isManualPercent ? " · 수동" : " · 자동"}
          </span>
        </header>
        <PresetRow
          values={PERCENT_PRESETS}
          suffix="%"
          onSelect={meter.setManualPercent}
        />
        <CustomRow
          placeholder="%"
          value={percentInput}
          onChange={setPercentInput}
          onApply={applyCustomPercent}
        />
        <button
          type="button"
          className="test-menu__btn test-menu__btn--reset"
          onClick={meter.useAutoPercent}
          disabled={!meter.isManualPercent}
        >
          자동 %
        </button>
      </section>

      <p className="test-menu__hint">
        말 속도: 0% 느림 · 50% 보통 · 100% 빠름
      </p>
    </aside>
  );
}
