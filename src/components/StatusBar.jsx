const STEPS = ['Pending', 'Processing', 'Unpublished', 'Published']

export default function StatusBar({ current = 'Pending', onChange }) {
  const idx = STEPS.indexOf(current)
  return (
    <div className="statusbar">
      <div className="generate-label">Generate Training Module</div>
      <div className="statusbar-steps">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`step${s === current ? ' active' : ''}${i < idx ? ' done' : ''}`}
            onClick={() => onChange?.(s)}
          >
            {i < idx && '✓ '}{s}
          </button>
        ))}
      </div>
    </div>
  )
}
