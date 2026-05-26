export function MeterFare({ fare }) {
  return (
    <div className="meter-fare-block">
      <span className="meter-fare">{fare}</span>
      <span className="meter-unit">원</span>
    </div>
  );
}
