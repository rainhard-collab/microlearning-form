import { useState } from 'react'
import FieldRow    from './ui/FieldRow'
import LessonCard  from './LessonCard'

const PRESETS = [
  { label: '— Pick a preset to auto-fill the form… —', value: '' },
  { label: 'New Staff Induction',       value: 'induction' },
  { label: 'Clinical Skills Refresher', value: 'clinical'  },
  { label: 'Infection Control',         value: 'infection' },
  { label: 'Manual Handling',           value: 'manual'    },
]
const PRESET_DEFAULTS = {
  induction: { description: 'Orientation programme for newly onboarded staff covering culture, policies, and procedures.', purposeUseCase: 'New Staff Training',     difficultyLevel: 'Beginner',     estimatedSessionLength: 60, passScore: 70 },
  clinical:  { description: 'Annual refresher on clinical skills and best practices for frontline care staff.',            purposeUseCase: 'Annual Refresher',       difficultyLevel: 'Intermediate', estimatedSessionLength: 75, passScore: 75 },
  infection: { description: 'Core infection prevention and control principles for healthcare environments.',               purposeUseCase: 'Compliance / Mandatory', difficultyLevel: 'Intermediate', estimatedSessionLength: 75, passScore: 80 },
  manual:    { description: 'Safe moving and handling techniques to prevent musculoskeletal injuries.',                    purposeUseCase: 'Compliance / Mandatory', difficultyLevel: 'Beginner',     estimatedSessionLength: 50, passScore: 70 },
}

/* ── 1. What is this module? ── */
function WhatIsThisModule({ formData, onChange }) {
  const { description, categories, purposeUseCase, learningObjective } = formData

  function addCategory(e) {
    if (e.key === 'Enter' && e.target.value.trim()) {
      onChange('categories', [...categories, e.target.value.trim()])
      e.target.value = ''
    }
  }

  return (
    <div className="form-group">
      <div className="section-label">What is this module?</div>
      <FieldRow label="Description" required help="A brief summary of the module topic. Used on the module card and for AI content generation.">
        <textarea className="textarea" placeholder="A short description of the module topic…" rows={3}
          value={description} onChange={e => onChange('description', e.target.value)} />
      </FieldRow>
      <FieldRow label="Categories" help="Helps learners discover the module. Also focuses AI on domain-specific knowledge.">
        <div className="tags-input">
          {categories.map(cat => (
            <span key={cat} className="tag">{cat}
              <button className="tag-remove" onClick={() => onChange('categories', categories.filter(c => c !== cat))}>×</button>
            </span>
          ))}
          <input style={{ border:'none', outline:'none', fontSize:11, minWidth:120, background:'transparent', fontFamily:'inherit' }}
            placeholder="Add category and press Enter…" onKeyDown={addCategory} />
        </div>
      </FieldRow>
      <FieldRow label="Purpose / Use Case" required help="Why this module is being created. Directs AI tone and framing.">
        <select className="select" value={purposeUseCase} onChange={e => onChange('purposeUseCase', e.target.value)}>
          <option>New Staff Training</option>
          <option>Annual Refresher</option>
          <option>CPD / Professional Development</option>
          <option>Compliance / Mandatory</option>
          <option>Skill Upskilling</option>
        </select>
      </FieldRow>
      <FieldRow label="Learning Objective" required help="By the end of this module, learners will be able to… (also used for AI alignment check with knowledge base)">
        <textarea className="textarea" placeholder="e.g. By the end of this module, learners will be able to…" rows={3}
          value={learningObjective} onChange={e => onChange('learningObjective', e.target.value)} />
      </FieldRow>
    </div>
  )
}

/* ── 2. Knowledge Source + Objective Alignment ── */
function KnowledgeSource({ formData, onChange }) {
  const { knowledgeBase, aiUsagePreference, showKBPreview, learningObjective } = formData
  const [analysisState, setAnalysisState] = useState('idle') // idle | loading | done
  const [analysisResult, setAnalysisResult] = useState(null)

  const canAnalyse = knowledgeBase && learningObjective.trim().length > 10

  function handleAnalyse() {
    setAnalysisState('loading')
    setAnalysisResult(null)
    setTimeout(() => {
      const kbLower  = knowledgeBase.toLowerCase()
      const objLower = learningObjective.toLowerCase()
      const hasMatch = kbLower.split(' ').some(w => w.length > 4 && objLower.includes(w))
      setAnalysisResult(hasMatch
        ? { score: 88, status: 'good',
            matched:    'Objective aligns well with document coverage in the selected knowledge base.',
            gap:        'Consider adding more specifics around procedural steps if this is compliance training.',
            suggestion: 'Your objective is well-formed. The AI can generate high-quality content from this combination.' }
        : { score: 42, status: 'warn',
            matched:    'Some general overlap found between the objective and knowledge base.',
            gap:        'The objective references topics not well covered in the selected knowledge base.',
            suggestion: 'Consider revising your objective to match the knowledge base content, or select a different knowledge base.' }
      )
      setAnalysisState('done')
    }, 2200)
  }

  return (
    <div className="form-group">
      <div className="section-label">Knowledge Source</div>
      <FieldRow label="Knowledge Base" required>
        <select className="select" value={knowledgeBase} onChange={e => { onChange('knowledgeBase', e.target.value); setAnalysisState('idle'); setAnalysisResult(null) }}>
          <option value="">Select a knowledge base</option>
          <option>Infection Control Policies</option>
          <option>Clinical Procedures Manual</option>
          <option>Staff Handbook 2024</option>
        </select>
      </FieldRow>
      <FieldRow label="How should AI use your documents?" required>
        <div className="radio-group">
          {[
            { val: 'prefer-docs', label: 'Prefer docs, fill gaps with AI' },
            { val: 'docs-only',   label: 'Use docs only — no AI invention' },
            { val: 'ai-only',     label: 'Use AI only (ignore docs)' },
          ].map(({ val, label }) => (
            <label key={val} className="radio-opt">
              <input type="radio" name="aiuse" checked={aiUsagePreference === val} onChange={() => onChange('aiUsagePreference', val)} />
              {label}
            </label>
          ))}
        </div>
      </FieldRow>

      {/* ── Objective Alignment Analysis ── */}
      <div className="alignment-section">
        <div className="alignment-header">
          <span className="alignment-icon">🔍</span>
          <span className="alignment-title">Objective Alignment Check</span>
        </div>
        {!canAnalyse
          ? <div className="alignment-hint">Fill in <strong>Learning Objective</strong> and select a <strong>Knowledge Base</strong> above to enable AI alignment analysis.</div>
          : analysisState === 'idle'
            ? <button className="btn-analyse" onClick={handleAnalyse}>✦ Analyse Objective vs Knowledge Base</button>
            : analysisState === 'loading'
              ? <div className="alignment-loading"><span className="spinner" style={{borderColor:'var(--teal)',borderTopColor:'transparent'}} /> Analysing alignment…</div>
              : null
        }
        {analysisState === 'done' && analysisResult && (
          <div className={`analysis-result ${analysisResult.status}`}>
            <div className="analysis-score-row">
              <div className="analysis-score-circle">
                <span className="analysis-score-val">{analysisResult.score}%</span>
                <span className="analysis-score-lbl">aligned</span>
              </div>
              <div className="analysis-notes">
                <div className="analysis-note match">✓ {analysisResult.matched}</div>
                <div className="analysis-note gap">⚠ {analysisResult.gap}</div>
                <div className="analysis-note tip">💡 {analysisResult.suggestion}</div>
              </div>
            </div>
            <button className="btn-reanalyse" onClick={handleAnalyse}>↻ Re-analyse</button>
          </div>
        )}
      </div>

      <FieldRow label="Show KB Preview" help="Preview matched document chunks before generating.">
        <label className="checkbox-row">
          <input type="checkbox" checked={showKBPreview} onChange={e => onChange('showKBPreview', e.target.checked)} />
          Show preview of matched document sections
        </label>
      </FieldRow>
    </div>
  )
}

/* ── 3. Number of Lessons (standalone) ── */
function LessonsCountField({ formData, onLessonsCountChange }) {
  return (
    <div className="form-group">
      <div className="section-label">Lesson Setup</div>
      <FieldRow label="Number of Lessons" required help="Set the count — lesson details appear below to fill in one by one.">
        <div className="num-row">
          <input className="input input-sm" type="number" min={1} max={20}
            value={formData.numberOfLessons}
            onChange={e => onLessonsCountChange(+e.target.value)} />
          <span className="num-unit">lessons</span>
        </div>
      </FieldRow>
      {formData.numberOfLessons > 0 && (
        <div className="lessons-jump-hint">
          ↓ Fill in lesson content below, then complete module settings at the bottom.
        </div>
      )}
    </div>
  )
}

/* ── 4. How Should It Feel? ── */
function HowShouldItFeel({ formData, onChange }) {
  return (
    <div className="form-group">
      <div className="section-label">How Should It Feel?</div>
      <FieldRow label="Target Audience" required>
        <select className="select" value={formData.targetAudience} onChange={e => onChange('targetAudience', e.target.value)}>
          <option>All Staff</option><option>Senior</option><option>Care Staff</option>
          <option>Nursing</option><option>Management</option><option>Volunteers</option>
        </select>
      </FieldRow>
      <FieldRow label="Tone" required>
        <select className="select" value={formData.tone} onChange={e => onChange('tone', e.target.value)}>
          <option>Professional</option><option>Friendly &amp; Conversational</option>
          <option>Clinical &amp; Formal</option><option>Encouraging</option>
        </select>
      </FieldRow>
      <FieldRow label="Language" required>
        <select className="select" value={formData.language} onChange={e => onChange('language', e.target.value)}>
          <option>English</option><option>Malay</option><option>Mandarin</option>
        </select>
      </FieldRow>
    </div>
  )
}

/* ── 5. Lessons parent-child ── */
function LessonsSection({ lessons, onChange }) {
  function updateLesson(i, updated) {
    const next = [...lessons]; next[i] = updated; onChange('lessons', next)
  }
  function deleteLesson(i) { onChange('lessons', lessons.filter((_, idx) => idx !== i)) }
  if (lessons.length === 0) return null
  return (
    <div className="lessons-section">
      <div className="lessons-section-head">
        <span className="lessons-section-title">Lesson Content</span>
        <span className="lessons-count-badge">{lessons.length} lesson{lessons.length !== 1 ? 's' : ''}</span>
      </div>
      {lessons.map((lesson, i) => (
        <LessonCard key={lesson.id} lesson={lesson} index={i}
          onChange={u => updateLesson(i, u)}
          onDelete={() => deleteLesson(i)}
          canDelete={lessons.length > 1} />
      ))}
    </div>
  )
}

/* ── 6. Module Settings (after lessons) ── */
function ModuleSettings({ formData, onChange }) {
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <div className="section-label">Module Settings</div>
      <div className="two-col-narrow">
        <FieldRow label="Difficulty Level" required>
          <select className="select" value={formData.difficultyLevel} onChange={e => onChange('difficultyLevel', e.target.value)}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </FieldRow>
        <FieldRow label="Estimated Length (min)" help="Total duration shown on the module card in the learner app.">
          <div className="num-row">
            <input className="input input-sm" type="number" min={5} value={formData.estimatedSessionLength}
              onChange={e => onChange('estimatedSessionLength', +e.target.value)} />
            <span className="num-unit">min</span>
          </div>
        </FieldRow>
        <FieldRow label="Pass Score (%)" required help="Minimum quiz score required to mark the module as passed.">
          <div className="num-row">
            <input className="input input-sm" type="number" min={0} max={100} value={formData.passScore}
              onChange={e => onChange('passScore', +e.target.value)} />
            <span className="num-unit">%</span>
          </div>
        </FieldRow>
      </div>
    </div>
  )
}

/* ── Main export ── */
export default function CourseSetupTab({ formData, onChange, onLessonsCountChange, onContinueToAudience }) {
  function handlePreset(e) {
    const preset = PRESET_DEFAULTS[e.target.value]
    if (!preset) return
    Object.entries(preset).forEach(([k, v]) => onChange(k, v))
    e.target.value = ''
  }

  const lessonsHaveContent = formData.lessons.some(l => l.videoUrl || l.images.length > 0)

  return (
    <>
      {/* Preset bar */}
      <div className="preset-bar">
        <span>✦</span>
        <strong style={{ fontSize: 12 }}>Start with a preset:</strong>
        <select className="preset-select" onChange={handlePreset} defaultValue="">
          {PRESETS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <span className="preset-note">Applying a preset overwrites matching fields. Customise afterwards.</span>
      </div>

      <div className="hint-bar">
        ℹ Fill in module info and knowledge source, then set your lessons, and finally complete module settings before continuing to Audience.
      </div>

      {/* ── Two-column: left = info/kb/lessons-count, right = how it feels ── */}
      <div className="two-col">
        <div>
          <WhatIsThisModule formData={formData} onChange={onChange} />
          <KnowledgeSource  formData={formData} onChange={onChange} />
          <LessonsCountField formData={formData} onLessonsCountChange={onLessonsCountChange} />
        </div>
        <div>
          <HowShouldItFeel formData={formData} onChange={onChange} />
        </div>
      </div>

      {/* ── Lesson cards (full width, appears after count is set) ── */}
      <LessonsSection lessons={formData.lessons} onChange={onChange} />

      {/* ── Module settings appear after lessons ── */}
      {formData.lessons.length > 0 && (
        <ModuleSettings formData={formData} onChange={onChange} />
      )}

      {/* ── Continue to Audience ── */}
      {formData.lessons.length > 0 && (
        <div className="continue-strip">
          <div className="continue-hint">
            Module setup complete — next, define <strong>who</strong> receives this module, then generate.
          </div>
          <button className="btn-continue" onClick={onContinueToAudience}>
            Continue to Audience →
          </button>
        </div>
      )}
    </>
  )
}
