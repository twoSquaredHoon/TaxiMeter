import { MeterScreen } from "../screen/index.jsx";
import { ManualSpeedPanel } from "./ManualSpeedPanel.jsx";
import { useTestMeter } from "./useTestMeter.js";
import "./test.css";

export default function TestApp() {
  const meter = useTestMeter();

  return (
    <>
      <div className="device-frame device-frame--test">
        <MeterScreen meter={meter} />
        <ManualSpeedPanel
          currentSpeedKmh={meter.speedKmh}
          isManualSpeed={meter.isManualSpeed}
          onSetSpeed={meter.setManualSpeed}
          onAuto={meter.useAutoSpeed}
        />
      </div>

      <p className="prototype-hint prototype-hint--test">
        테스트 모드 · 우측 하단에서 속도를 수동으로 설정해 말 애니메이션을
        확인하세요.{" "}
        <a href="/">일반 앱으로 돌아가기</a>
      </p>
    </>
  );
}
