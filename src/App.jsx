import { useTaxiMeter } from "./hooks/useTaxiMeter.js";
import { MeterScreen } from "./screen/index.jsx";

export default function App() {
  const meter = useTaxiMeter();

  return (
    <>
      <div className="device-frame">
        <MeterScreen meter={meter} />
      </div>

      <p className="prototype-hint">
        프로토타입 · 주행 중 카운트다운이 감소하고 0에서 요금이 증가합니다
      </p>
    </>
  );
}
