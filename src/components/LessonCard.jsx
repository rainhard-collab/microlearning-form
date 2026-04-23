import { useRef, useState } from 'react'

let _lid = 200
const newId = () => ++_lid

function BlockHeader({ icon, title, note, badge }) {
  return (
    <div className="block-header">
      <span className="block-icon">{icon}</span>
      <span className="block-title">{title}</span>
      {note && <span className="block-note">— {note}</span>}
      {badge && <span className="auto-badge">{badge}</span>}
    </div>
  )
}

function AutoGenCard({ icon, title, description, count, countLabel, onCountChange }) {
  return (
    <div className="autogen-card">
      <div className="autogen-card-icon">{icon}</div>
      <div className="autogen-card-body">
        <div className="autogen-card-title">{title}</div>
        <div className="autogen-card-desc">{description}</div>
      </div>
      {onCountChange && (
        <div className="autogen-card-count">
          <input
            className="input input-sm"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={e => onCountChange(Math.max(1, +e.target.value))}
            style={{ width: 52, textAlign: 'center' }}
          />
          <span className="num-unit" style={{ fontSize: 10 }}>{countLabel}</span>
        </div>
      )}
    </div>
  )
}

/* ── Duration parser: "mm:ss" or minutes number → total minutes ── */
function parseDuration(val) {
  if (!val) return null
  const s = String(val).trim()
  if (s.includes(':')) {
    const [m, sec] = s.split(':').map(Number)
    return m + (sec || 0) / 60
  }
  return parseFloat(s) || null
}

export default function LessonCard({ lesson, index, onChange, onDelete, canDelete }) {
  const imageRef = useRef()

  function update(key, value) { onChange({ ...lesson, [key]: value }) }

  /* ── Images ── */
  function handleImages(e) {
    const files = Array.from(e.target.files ?? [])
    const added = files.map(f => ({
      id: newId(), name: f.name,
      size: `${(f.size / 1048576).toFixed(1)} MB`,
      url: URL.createObjectURL(f), caption: '',
    }))
    update('images', [...lesson.images, ...added])
    e.target.value = ''
  }

  /* ── Video ── */
  function handleVideoUrl(url) {
    const isYT = url.includes('youtube.com') || url.includes('youtu.be')
    update('videoUrl', url)
    update('videoTitle', '')
    update('videoDescription', '')
    update('videoDuration', '')
    update('videoDurationError', null)
    if (isYT && url.length > 25) {
      update('videoFetching', true)
      setTimeout(() => {
        update('videoFetching', false)
        update('videoTitle', 'YouTube Video — title fetched automatically')
        update('videoDescription', 'A short instructional video demonstrating the key technique step-by-step. Covers the core concepts, shows real-world examples, and highlights common mistakes to avoid. AI will use this overview together with the learning objective to generate the key takeaways shown below.')
        update('videoDuration', '')
      }, 1600)
    }
  }

  function handleDurationInput(raw) {
    update('videoDuration', raw)
    const mins = parseDuration(raw)
    if (mins !== null && mins > 15) {
      update('videoDurationError', `Video is ${Math.round(mins)} min — exceeds the 15-minute limit for micro learning. Please use a shorter clip or split across lessons.`)
    } else {
      update('videoDurationError', null)
    }
  }

  const durationError = lesson.videoDurationError

  return (
    <div className={`lesson-card${lesson.collapsed ? ' collapsed' : ''}`}>

      {/* ── Header ── */}
      <div className="lesson-header" onClick={() => update('collapsed', !lesson.collapsed)}>
        <span className="lesson-chevron">{lesson.collapsed ? '▶' : '▼'}</span>
        <span className="lesson-num">Lesson {index + 1}</span>
        <input
          className="lesson-title-input"
          placeholder="Add lesson title (optional)…"
          value={lesson.lessonTitle}
          onClick={e => e.stopPropagation()}
          onChange={e => update('lessonTitle', e.target.value)}
        />
        {canDelete && (
          <button className="lesson-delete" title="Remove lesson"
            onClick={e => { e.stopPropagation(); onDelete() }}>✕</button>
        )}
      </div>

      {!lesson.collapsed && (
        <div className="lesson-body">

          {/* 1 · Text to Read — pages count */}
          <div className="lesson-block">
            <BlockHeader icon="📖" title="Text to Read" note="specify pages — AI generates the content" />
            <div className="num-row" style={{ marginBottom: 6 }}>
              <input className="input input-sm" type="number" min={1} max={10}
                value={lesson.numberOfReadingPages}
                onChange={e => update('numberOfReadingPages', Math.max(1, +e.target.value))} />
              <span className="num-unit">page{lesson.numberOfReadingPages !== 1 ? 's' : ''} of reading content</span>
            </div>
            <div className="pages-hint">
              AI will generate {lesson.numberOfReadingPages} page{lesson.numberOfReadingPages !== 1 ? 's' : ''} of structured reading content based on the module description, learning objectives, and knowledge base.
            </div>
          </div>

          {/* 2 · Image */}
          <div className="lesson-block">
            <BlockHeader icon="🖼" title="Image" note="visual aid or example to accompany the reading content" />
            <input ref={imageRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImages} />
            <div className="upload-area" onClick={() => imageRef.current.click()}>
              <span className="upload-area-icon">📷</span>
              <div>
                <div className="upload-area-main">Click to upload or drag & drop</div>
                <div className="upload-area-sub">PNG, JPG, WebP · multiple files · max 5 MB each</div>
              </div>
            </div>
            {lesson.images.length > 0 && (
              <div className="uploaded-items">
                {lesson.images.map(img => (
                  <div key={img.id} className="uploaded-item">
                    <div className="uploaded-thumb">
                      <img src={img.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:3 }} />
                    </div>
                    <div className="uploaded-info">
                      <div className="uploaded-name">{img.name}</div>
                      <div className="uploaded-meta">{img.size}</div>
                      <input className="caption-input" placeholder="Caption / alt text…" value={img.caption}
                        onChange={e => update('images', lesson.images.map(i => i.id === img.id ? { ...i, caption: e.target.value } : i))} />
                    </div>
                    <button className="btn-remove" onClick={() => update('images', lesson.images.filter(i => i.id !== img.id))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3 · Video — optional */}
          <div className="lesson-block">
            <BlockHeader icon="🎬" title="Video" note="optional — YouTube link embedded in the learner app" />
            <div className="video-url-row">
              <input className="video-url-input" type="text"
                placeholder="Paste YouTube URL… (optional)"
                value={lesson.videoUrl}
                onChange={e => handleVideoUrl(e.target.value)} />
              {lesson.videoUrl && (
                <button className="btn-remove" onClick={() => {
                  update('videoUrl', ''); update('videoTitle', ''); update('videoDuration', '')
                  update('videoFetching', false); update('videoDurationError', null)
                }}>✕</button>
              )}
            </div>

            {lesson.videoFetching && (
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#888', marginTop:6 }}>
                <span className="spinner" style={{ borderColor:'#888', borderTopColor:'transparent' }} />
                Fetching video info…
              </div>
            )}

            {lesson.videoTitle && (
              <>
                <div className="video-preview">
                  <div className="yt-thumb">▶</div>
                  <div className="video-preview-info">
                    <div className="video-preview-title">{lesson.videoTitle}</div>
                    <div className="video-preview-sub">YouTube</div>
                  </div>
                </div>
                {lesson.videoDescription && (
                  <div className="video-overview-card">
                    <div className="video-overview-label">
                      <span className="auto-badge">Auto-fetched</span> Video overview
                    </div>
                    <div className="video-overview-text">{lesson.videoDescription}</div>
                  </div>
                )}
              </>
            )}

            {/* Duration input — appears after URL entered */}
            {lesson.videoUrl && !lesson.videoFetching && (
              <div className="duration-row">
                <span className="duration-label">Video duration</span>
                <input className="input input-sm" placeholder="e.g. 12 or 12:30"
                  value={lesson.videoDuration}
                  onChange={e => handleDurationInput(e.target.value)} />
                <span className="num-unit">min</span>
              </div>
            )}

            {/* Duration error */}
            {durationError && (
              <div className="video-error-banner">
                ⚠ {durationError}
              </div>
            )}
          </div>

          {/* 4 · Key Takeaways — auto generated */}
          <div className="lesson-block">
            <BlockHeader icon="✨" title="Key Takeaways from Video" badge="Auto-generated by AI" />
            <AutoGenCard
              icon="🤖"
              title="AI will generate key takeaways from the video"
              description="After you add a video, AI analyses the content and extracts the most important points for learners to remember."
              count={lesson.numberOfTakeaways}
              countLabel="takeaways"
              onCountChange={val => update('numberOfTakeaways', val)}
            />
          </div>

          {/* 5 · Flashcard — auto generated */}
          <div className="lesson-block">
            <BlockHeader icon="🃏" title="Flashcard" badge="Auto-generated by AI" />
            <AutoGenCard
              icon="🤖"
              title="AI will generate flashcard Q&A pairs"
              description="AI creates spaced-repetition question and answer cards from the reading content, video takeaways, and lesson objectives."
              count={lesson.numberOfFlashcards}
              countLabel="flashcards"
              onCountChange={val => update('numberOfFlashcards', val)}
            />
          </div>

          {/* 6 · Final Key Takeaways — auto generated */}
          <div className="lesson-block lesson-block-muted">
            <BlockHeader icon="💡" title="Final Key Takeaways" badge="Auto-generated by AI" />
            <div className="auto-gen-note">
              AI generates a final summary from all lesson content — reading, video takeaways, and flashcards. Shown to the learner as a review at the end of the lesson. No input required.
            </div>
          </div>

          {/* 7 · Quiz */}
          <div className="lesson-block">
            <BlockHeader icon="✅" title="Quiz" note="AI generates questions from all lesson content" />
            <div className="num-row">
              <input className="input input-sm" type="number" min={0} max={20}
                value={lesson.numberOfQuiz}
                onChange={e => update('numberOfQuiz', +e.target.value)} />
              <span className="num-unit">questions per lesson</span>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
