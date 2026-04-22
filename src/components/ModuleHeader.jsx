import { useRef } from 'react'

export default function ModuleHeader({ formData, onChange }) {
  const fileRef = useRef()
  const { moduleTitle, coverImage, numberOfLessons, difficultyLevel, estimatedSessionLength, passScore } = formData

  function handleCoverChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange('coverImage', { name: file.name, url: URL.createObjectURL(file) })
  }

  return (
    <div className="module-header">
      <div>
        <input
          className="module-title-input"
          type="text"
          placeholder="🎓  e.g. Infection Control Basics"
          value={moduleTitle}
          onChange={e => onChange('moduleTitle', e.target.value)}
        />
        <div className="module-meta">
          <span className="meta-pill">☰ {numberOfLessons} lesson{numberOfLessons !== 1 ? 's' : ''}</span>
          <span className="meta-pill">📊 {difficultyLevel}</span>
          <span className="meta-pill">⏱ ~{estimatedSessionLength} min</span>
          <span className="meta-pill">🏆 Pass {passScore}%</span>
        </div>
        <span className="centres-note">★ Assign at least one centre</span>
      </div>

      <div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverChange} />
        {coverImage ? (
          <div className="cover-preview" onClick={() => fileRef.current.click()}>
            <img src={coverImage.url} alt="cover" />
            <div className="cover-preview-overlay">Change</div>
          </div>
        ) : (
          <div className="cover-upload" onClick={() => fileRef.current.click()}>
            <span className="cover-upload-icon">🖼</span>
            <span>Cover Photo</span>
          </div>
        )}
      </div>
    </div>
  )
}
