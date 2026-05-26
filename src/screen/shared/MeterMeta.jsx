export function MeterMeta({ tripNumber = "34", speed }) {
  return (
    <div className="meter-meta">
      <span className="meter-trip">{tripNumber}</span>
      <span className="meter-speed">{speed}</span>
    </div>
  );
}
