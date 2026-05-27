import { TestMeterScreen } from "./TestMeterScreen.jsx";
import { TestControlMenu } from "./TestControlMenu.jsx";
import { useTestMeter } from "./useTestMeter.js";
import "./test.css";

export default function TestApp() {
  const meter = useTestMeter();

  return (
    <>
      <div className="device-frame device-frame--test">
        <TestMeterScreen meter={meter} />
        <TestControlMenu meter={meter} />
      </div>

      <p className="prototype-hint prototype-hint--test">
        테스트 모드 · 우측 하단 메뉴에서 속도와 %를 수동 설정할 수 있습니다.{" "}
        <a href="/">일반 앱으로 돌아가기</a>
      </p>
    </>
  );
}
