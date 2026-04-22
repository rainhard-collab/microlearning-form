export default function BottomStrip({ onGenerate }) {
  return (
    <div className="bottom-strip">
      <div className="completion-hint">
        Fill in <b>Description</b>, <b>Learning Objective</b>, <b>Lesson content</b>, and <b>Knowledge Base</b> before generating.
      </div>
      <button className="btn-generate" onClick={onGenerate}>
        ✦ Generate Training Module
      </button>
    </div>
  )
}
