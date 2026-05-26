export function MeterSection({ children }) {
  return (
    <section className="meter" aria-label="미터기 표시">
      <div className="meter-panel">{children}</div>
    </section>
  );
}
