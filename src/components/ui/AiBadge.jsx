const CONFIGS = {
  analyzing: { label: 'Analysing…', spinner: true },
  relevant:  { label: 'Relevant',           dot: true },
  partial:   { label: 'Partially Relevant', dot: true },
  irrelevant:{ label: 'Not Relevant',       dot: true },
  pending:   { label: 'Pending' },
}

export default function AiBadge({ status, note }) {
  const cfg = CONFIGS[status] ?? CONFIGS.pending

  return (
    <div className="ai-badge-wrap">
      <span className={`ai-badge ${status ?? 'pending'}`}>
        {cfg.spinner && <span className="spinner" />}
        {cfg.dot     && <span className="dot" />}
        {cfg.label}
      </span>
      {note && <span className="ai-explain">{note}</span>}
    </div>
  )
}
