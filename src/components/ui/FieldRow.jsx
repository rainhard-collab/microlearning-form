export default function FieldRow({ label, required, help, children }) {
  return (
    <div className="field-row">
      <div className="field-label">
        {label}
        {required && <span className="req"> *</span>}
        {help && <span className="help" title={help}>?</span>}
      </div>
      <div className="field-value">{children}</div>
    </div>
  )
}
