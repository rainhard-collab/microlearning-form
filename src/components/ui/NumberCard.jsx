export default function NumberCard({ label, value, onChange, sublabel }) {
  return (
    <div className="number-card">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      <div className="card-controls">
        <button className="btn-num" onClick={() => onChange(Math.max(0, value - 1))}>−</button>
        <button className="btn-num" onClick={() => onChange(value + 1)}>+</button>
      </div>
      {sublabel && <div className="card-sublabel">{sublabel}</div>}
    </div>
  )
}
