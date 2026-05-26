import { StatusBanner } from "./StatusBanner.jsx";
import { ControlButtons } from "./ControlButtons.jsx";

export function ScreenLayout({ className, statusText, meter, children }) {
  return (
    <main className={className} aria-label="택시 미터기 앱">
      <StatusBanner text={statusText} />
      {children}
      <ControlButtons meter={meter} />
    </main>
  );
}
