export function MeterBottom({ countdown, secondary = "0" }) {
  return (
    <div className="meter-bottom">
      <span className="meter-countdown">{countdown}</span>
      <span className="meter-secondary">{secondary}</span>
    </div>
  );
}
