import { useRef } from 'react'
import AiBadge from './ui/AiBadge'

let nextId = 100

function simulateAiAnalysis(description, learningObjective, label, onDone) {
  // In production this calls the backend AI endpoint
  setTimeout(() => {
    const topic = (description + ' ' + learningObjective).toLowerCase()
    const lbl   = label.toLowerCase()

    let status, note
    if (!topic.trim()) {
      status = 'partial'
      note   = '⚠ Fill in Description & Learning Objective for a better analysis'
    } else if (lbl.includes('lunch') || lbl.includes('food') || lbl.includes('menu')) {
      status = 'irrelevant'
      note   = "✗ This doesn't appear related to the course topic"
    } else if (lbl.includes('stat') || lbl.includes('chart') || lbl.includes('graph')) {
      status = 'partial'
      note   = '⚠ Statistics visual — check it matches the target audience level'
    } else {
      status = 'relevant'
      note   = '✓ Aligns with the course topic and learning objectives'
    }
    onDone(status, note)
  }, 1800 + Math.random() * 800)
}

/* ── Cover Image ── */
function CoverUpload({ coverImage, onChange, description, learningObjective }) {
  const ref = useRef()

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const item = { id: ++nextId, name: file.name, size: `${(file.size / 1048576).toFixed(1)} MB`, url, aiStatus: 'analyzing', aiNote: null }
    onChange(item)
    simulateAiAnalysis(description, learningObjective, file.name, (status, note) => {
      onChange({ ...item, aiStatus: status, aiNote: note })
    })
  }

  return (
    <div className="upload-box">
      <div className="upload-box-header">
        <span className="field-no">1</span>
        Module Cover Image
        <span className="sub">— shown on module card in learner app</span>
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      {!coverImage ? (
        <div className="upload-area" onClick={() => ref.current.click()}>
          <span className="upload-area-icon">🖼</span>
          <div>
            <div className="upload-area-main">Click to upload or drag & drop</div>
            <div className="upload-area-sub">PNG, JPG, WebP · max 5 MB · recommended 800×500 px</div>
          </div>
        </div>
      ) : (
        <div className="uploaded-items">
          <div className="uploaded-item">
            <div className="uploaded-thumb">
              {coverImage.url ? <img src={coverImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} /> : '🖼'}
            </div>
            <div className="uploaded-info">
              <div className="uploaded-name">{coverImage.name}</div>
              <div className="uploaded-meta">Image · {coverImage.size}</div>
            </div>
            <AiBadge status={coverImage.aiStatus} note={coverImage.aiNote} />
            <button className="btn-remove" onClick={() => onChange(null)}>✕</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <button className="btn-add-video" onClick={() => ref.current.click()}>↑ Replace image</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Lesson Images ── */
function LessonImages({ images, onAdd, onRemove, onCaptionChange, description, learningObjective }) {
  const ref = useRef()

  function handleFiles(e) {
    Array.from(e.target.files ?? []).forEach(file => {
      const url  = URL.createObjectURL(file)
      const item = { id: ++nextId, emoji: '📷', name: file.name, size: `${(file.size / 1048576).toFixed(1)} MB`, url, caption: '', aiStatus: 'analyzing', aiNote: null }
      onAdd(item)
      simulateAiAnalysis(description, learningObjective, file.name, (status, note) => {
        onAdd({ ...item, aiStatus: status, aiNote: note }, true)
      })
    })
    e.target.value = ''
  }

  return (
    <div className="upload-box">
      <div className="upload-box-header">
        <span className="field-no">2</span>
        Lesson Images
        <span className="sub">— used in Image content blocks inside lessons</span>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
      <div className="upload-area" onClick={() => ref.current.click()}>
        <span className="upload-area-icon">📷</span>
        <div>
          <div className="upload-area-main">Upload supporting images</div>
          <div className="upload-area-sub">Multiple files allowed · PNG, JPG, WebP · max 5 MB each</div>
        </div>
      </div>
      {images.length > 0 && (
        <div className="uploaded-items">
          {images.map(img => (
            <div key={img.id} className="uploaded-item">
              <div className="uploaded-thumb">
                {img.url
                  ? <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                  : img.emoji}
              </div>
              <div className="uploaded-info">
                <div className="uploaded-name">{img.name}</div>
                <div className="uploaded-meta">Image · {img.size}</div>
                <input
                  className="caption-input"
                  placeholder="Caption / alt text for this image…"
                  value={img.caption}
                  onChange={e => onCaptionChange(img.id, e.target.value)}
                />
              </div>
              <AiBadge status={img.aiStatus} note={img.aiNote} />
              <button className="btn-remove" onClick={() => onRemove(img.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Video References ── */
function VideoReferences({ videos, onAdd, onRemove, onUrlChange, description, learningObjective }) {
  function handleUrlChange(id, url) {
    onUrlChange(id, url, 'pending', null)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      onUrlChange(id, url, 'analyzing', null)
      simulateAiAnalysis(description, learningObjective, url, (status, note) => {
        onUrlChange(id, url, status, note)
      })
    }
  }

  return (
    <div className="upload-box">
      <div className="upload-box-header">
        <span className="field-no">3</span>
        Video References
        <span className="sub">— embedded in Video content blocks inside lessons</span>
      </div>
      <div className="video-rows">
        {videos.map(v => (
          <div key={v.id}>
            <div className="video-url-row">
              <input
                className="video-url-input"
                type="text"
                placeholder="Paste YouTube URL…"
                value={v.url}
                onChange={e => handleUrlChange(v.id, e.target.value)}
              />
              <AiBadge status={v.aiStatus} />
              <button className="btn-remove" onClick={() => onRemove(v.id)}>✕</button>
            </div>
            {v.title && (
              <div className="video-preview">
                <div className="yt-thumb">▶</div>
                <div className="video-preview-info">
                  <div className="video-preview-title">{v.title}</div>
                  <div className="video-preview-sub">YouTube · {v.duration} · Fetched automatically</div>
                </div>
                {v.aiNote && <div className="video-preview-note">{v.aiNote}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn-add-video" onClick={onAdd}>+ Add another video</button>
      <div className="video-hint">AI analyses the video title and description against your Learning Objective. Review is advisory — you can keep any video.</div>
    </div>
  )
}

/* ── Main Export ── */
export default function MediaAssetsSection({ formData, onFieldChange }) {
  const { coverImage, lessonImages, videoRefs, description, learningObjective } = formData

  /* Lesson image handlers */
  function handleAddLessonImage(item, isUpdate = false) {
    if (isUpdate) {
      onFieldChange('lessonImages', lessonImages.map(i => i.id === item.id ? item : i))
    } else {
      onFieldChange('lessonImages', [...lessonImages, item])
    }
  }
  function handleRemoveLessonImage(id) {
    onFieldChange('lessonImages', lessonImages.filter(i => i.id !== id))
  }
  function handleCaptionChange(id, caption) {
    onFieldChange('lessonImages', lessonImages.map(i => i.id === id ? { ...i, caption } : i))
  }

  /* Video handlers */
  function handleAddVideo() {
    onFieldChange('videoRefs', [...videoRefs, { id: ++nextId, url: '', aiStatus: 'pending', aiNote: null, title: '', duration: '' }])
  }
  function handleRemoveVideo(id) {
    onFieldChange('videoRefs', videoRefs.filter(v => v.id !== id))
  }
  function handleVideoUrlChange(id, url, aiStatus, aiNote) {
    onFieldChange('videoRefs', videoRefs.map(v =>
      v.id === id
        ? { ...v, url, aiStatus, aiNote, title: url.includes('youtube') ? 'Hand Hygiene — WHO 5 Moments' : '', duration: url.includes('youtube') ? '3:24' : '' }
        : v
    ))
  }

  return (
    <div className="media-section">
      <div className="media-header">
        <span className="badge-ai">AI</span>
        <span className="media-header-title">
          Media Assets for Micro Learning
          <span className="badge-new">NEW</span>
        </span>
        <span className="media-header-subtitle">AI checks relevance against your course topic</span>
      </div>
      <div className="media-body">
        <CoverUpload
          coverImage={coverImage}
          onChange={item => onFieldChange('coverImage', item)}
          description={description}
          learningObjective={learningObjective}
        />
        <LessonImages
          images={lessonImages}
          onAdd={handleAddLessonImage}
          onRemove={handleRemoveLessonImage}
          onCaptionChange={handleCaptionChange}
          description={description}
          learningObjective={learningObjective}
        />
        <VideoReferences
          videos={videoRefs}
          onAdd={handleAddVideo}
          onRemove={handleRemoveVideo}
          onUrlChange={handleVideoUrlChange}
          description={description}
          learningObjective={learningObjective}
        />
      </div>
    </div>
  )
}
