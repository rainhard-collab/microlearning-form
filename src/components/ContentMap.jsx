const BLOCKS = [
  { icon: '📄', name: 'Text to Read',          desc: 'Main reading content per lesson',                      media: false },
  { icon: '🖼', name: 'Image Block',            desc: 'Lesson images uploaded per lesson',                    media: true,  badge: 'per lesson' },
  { icon: '▶',  name: 'Video Block',            desc: 'YouTube link embedded per lesson',                     media: true,  badge: 'per lesson' },
  { icon: '✨', name: 'Key Takeaways (Video)',  desc: 'AI-generated from video content',                      media: false },
  { icon: '🃏', name: 'Flashcard',             desc: 'Q&A pairs added per lesson',                           media: false },
  { icon: '💡', name: 'Final Key Takeaways',   desc: 'Auto-generated summary from flashcards',               media: false },
  { icon: '✅', name: 'Quiz',                   desc: 'AI-generated questions, count set per lesson',         media: false },
  { icon: '🎯', name: 'Learning Objectives',   desc: 'From Learning Objective field',                        media: false },
  { icon: '🏷', name: 'Module Card',           desc: 'Title, cover image, duration, difficulty',             media: true,  badge: 'from header' },
  { icon: '👤', name: 'Audience Filter',        desc: 'From Audience tab — controls who sees this module',   media: false },
]

export default function ContentMap() {
  return (
    <div className="content-map">
      <div className="content-map-title">
        🗺  Content Map — how form fields map to the learner app
        <span className="content-map-ref">Read-only reference</span>
      </div>
      <div className="content-map-grid">
        {BLOCKS.map(b => (
          <div key={b.name} className={`cb-card${b.media ? ' has-media' : ''}`}>
            <span className="cb-icon">{b.icon}</span>
            <div className="cb-name">{b.name}</div>
            <div className="cb-desc">{b.desc}</div>
            {b.badge && <div className="media-badge">{b.badge}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
