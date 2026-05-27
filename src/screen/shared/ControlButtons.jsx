export function ControlButtons({ meter }) {
  return (
    <nav className="button-grid" aria-label="미터기 조작">
      <button
        type="button"
        className={`ctrl-btn btn-empty${meter.activeButton === "empty" ? " active" : ""}`}
        onClick={meter.handleEmpty}
      >
        빈차
      </button>
      <button
        type="button"
        className="ctrl-btn btn-driving"
        onClick={meter.handleDriving}
      >
        주행
      </button>
      <button
        type="button"
        className={`ctrl-btn btn-surcharge${meter.activeButton === "surcharge" ? " active" : ""}`}
        onClick={meter.handleSurcharge}
      >
        할증
      </button>
      <button
        type="button"
        className={`ctrl-btn btn-payment${meter.activeButton === "payment" ? " active" : ""}`}
        onClick={meter.handlePayment}
      >
        지불
      </button>
    </nav>
  );
}
