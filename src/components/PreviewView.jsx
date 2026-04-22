import { useState } from 'react'
import TopBar    from './TopBar'
import StatusBar from './StatusBar'

function LessonContent({ lesson }) {
  const [pageIdx, setPageIdx] = useState(0)
  const [flipped, setFlipped] = useState({})

  const page          = lesson.pages[pageIdx]
  const revealedCount = Object.values(flipped).filter(Boolean).length

  function toggleCard(i) { setFlipped(s => ({ ...s, [i]: !s[i] })) }

  return (
    <div className="pv-lesson">
      <h2 className="pv-lesson-title">Lesson {lesson.id} · {lesson.title}</h2>

      {/* TEXT TO READ */}
      <section className="pv-section">
        <div className="pv-section-label">📖 TEXT TO READ</div>
        <div className="pv-read-card">
          <div className="pv-read-page-indicator">Page {pageIdx + 1} of {lesson.pages.length}</div>
          <h3 className="pv-read-title">{page.title}</h3>
          <p className="pv-read-body">{page.body}</p>
          <div className="pv-read-nav">
            <button className="pv-nav-btn" disabled={pageIdx === 0}
              onClick={() => setPageIdx(i => i - 1)}>← Previous</button>
            <div className="pv-read-dots">
              {lesson.pages.map((_, i) => (
                <span key={i} className={`pv-dot${i === pageIdx ? ' active' : ''}`} />
              ))}
            </div>
            <button className="pv-nav-btn" disabled={pageIdx === lesson.pages.length - 1}
              onClick={() => setPageIdx(i => i + 1)}>Next →</button>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="pv-section">
        <div className="pv-section-label">🖼 IMAGE — visual aid</div>
        <div className="pv-image-placeholder">
          <div className="pv-image-icon">🖼</div>
          <div className="pv-image-caption">{lesson.image.caption}</div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="pv-section">
        <div className="pv-section-label">🎬 VIDEO</div>
        <div className="pv-video-placeholder">
          <div className="pv-video-play">▶</div>
          <div className="pv-video-label">YouTube embed — placeholder</div>
        </div>
        <div className="pv-takeaway-strip">
          <div className="pv-takeaway-label">KEY TAKEAWAY</div>
          <div className="pv-takeaway-text">{lesson.video.takeaway}</div>
        </div>
      </section>

      {/* FLASHCARDS */}
      <section className="pv-section">
        <div className="pv-section-label">🃏 FLASHCARDS <span className="pv-label-sub">click a card to flip</span></div>
        <div className="pv-flashcards">
          {lesson.flashcards.map((fc, i) => (
            <div key={i} className={`pv-flashcard${flipped[i] ? ' flipped' : ''}`}
              onClick={() => toggleCard(i)}>
              <div className="pv-flashcard-inner">
                <div className="pv-flashcard-face pv-flashcard-front">
                  <div className="pv-flashcard-idx">Card {i + 1} of {lesson.flashcards.length}</div>
                  <div className="pv-flashcard-q">{fc.q}</div>
                  <div className="pv-flashcard-hint">Click to reveal answer</div>
                </div>
                <div className="pv-flashcard-face pv-flashcard-back">
                  <div className="pv-flashcard-idx">Answer · Card {i + 1}</div>
                  <div className="pv-flashcard-a">{fc.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pv-flashcard-counter">{revealedCount} of {lesson.flashcards.length} revealed</div>
      </section>

      {/* FINAL KEY TAKEAWAYS */}
      <section className="pv-section">
        <div className="pv-section-label">💡 FINAL KEY TAKEAWAYS <span className="pv-label-sub">auto-generated</span></div>
        <div className="pv-takeaways-card">
          <ul className="pv-takeaways-list">
            {lesson.takeaways.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* QUIZ */}
      <section className="pv-section">
        <div className="pv-section-label">✅ QUIZ PREVIEW <span className="pv-label-sub">correct answers shown for review</span></div>
        <div className="pv-quiz">
          {lesson.quiz.map((q, qi) => (
            <div key={qi} className="pv-quiz-q">
              <div className="pv-quiz-title">Q{qi + 1}. {q.question}</div>
              <div className="pv-quiz-opts">
                {q.options.map((opt, oi) => (
                  <label key={oi} className={`pv-quiz-opt${q.correct === oi ? ' correct' : ''}`}>
                    <input type="radio" disabled readOnly checked={q.correct === oi} />
                    <span className="pv-quiz-opt-letter">{String.fromCharCode(65 + oi)}.</span>
                    <span className="pv-quiz-opt-text">{opt}</span>
                    {q.correct === oi && <span className="pv-quiz-badge">✓ correct</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function PreviewView({ module, status, setStatus, onEdit, onDiscard }) {
  const [activeLessonId, setActiveLessonId] = useState(module.lessons[0].id)
  const [toast,          setToast]          = useState(null)

  const activeLesson  = module.lessons.find(l => l.id === activeLessonId) || module.lessons[0]
  const isPublished   = status === 'Published'

  function handlePublishToggle() {
    if (isPublished) {
      setStatus('Unpublished')
      setToast(null)
    } else {
      setStatus('Published')
      setToast(`Module published successfully. Learners can now access ${module.title}.`)
      setTimeout(() => setToast(null), 4000)
    }
  }

  return (
    <div className="preview-wrap">
      <TopBar />
      <StatusBar current={status} onChange={setStatus} />

      {/* Secondary action bar */}
      <div className="preview-subbar">
        <div className="preview-breadcrumb">
          <span className="preview-breadcrumb-parent">Learning Academy</span>
          <span className="preview-breadcrumb-sep">›</span>
          <span className="preview-breadcrumb-current">{module.title}</span>
        </div>
        <div className="preview-actions">
          <button className="btn-discard-pv" onClick={onDiscard}>Discard</button>
          <button className="btn-edit-pv" onClick={onEdit}>Edit</button>
          <button className={`btn-publish-pv${isPublished ? ' unpublish' : ''}`}
            onClick={handlePublishToggle}>
            {isPublished ? '↶ Unpublish' : '✦ Publish'}
          </button>
        </div>
      </div>

      <div className="preview-body">
        {/* Sidebar */}
        <aside className="preview-sidebar">
          <div className="preview-cover">
            <div className="preview-cover-icon">📘</div>
          </div>
          <div className="preview-sidebar-title">{module.title}</div>

          <div className="preview-badges">
            <span className="pv-badge pv-badge-mandatory">MANDATORY</span>
            <span className="pv-badge">{module.difficulty.toUpperCase()}</span>
            <span className="pv-badge">{module.duration} MIN</span>
            <span className="pv-badge">PASS {module.passScore}%</span>
          </div>

          <div className={`pv-status-chip${isPublished ? ' published' : ''}`}>
            {isPublished ? '● Published' : '● Unpublished'}
          </div>

          <div className="preview-sidebar-sec">LESSONS</div>
          <div className="preview-lesson-nav">
            {module.lessons.map(l => (
              <button key={l.id}
                className={`preview-lesson-item${l.id === activeLessonId ? ' active' : ''}`}
                onClick={() => setActiveLessonId(l.id)}>
                <div className="preview-lesson-item-num">LESSON {l.id}</div>
                <div className="preview-lesson-item-name">{l.title}</div>
              </button>
            ))}
          </div>

          <div className="preview-sidebar-sec">LEARNING OBJECTIVES</div>
          <ul className="preview-objectives">
            {module.objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ul>

          <div className="preview-sidebar-sec">MODULE INFO</div>
          <div className="preview-module-info">
            <div className="pv-info-row"><span className="pv-info-lbl">Target Audience</span><span className="pv-info-val">{module.targetAudience}</span></div>
            <div className="pv-info-row"><span className="pv-info-lbl">Tone</span><span className="pv-info-val">{module.tone}</span></div>
            <div className="pv-info-row"><span className="pv-info-lbl">Language</span><span className="pv-info-val">{module.language}</span></div>
          </div>
        </aside>

        {/* Main */}
        <main className="preview-main">
          <LessonContent key={activeLesson.id} lesson={activeLesson} />
        </main>
      </div>

      {toast && (
        <div className="toast-success">
          <span className="toast-icon">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
