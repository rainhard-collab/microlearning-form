import { useState } from 'react'
import TopBar         from './components/TopBar'
import StatusBar      from './components/StatusBar'
import ModuleHeader   from './components/ModuleHeader'
import CourseSetupTab from './components/CourseSetupTab'
import AudienceTab    from './components/AudienceTab'
import PreviewView    from './components/PreviewView'
import { buildModuleData } from './mockPreview'

let _lid = 0
const newId = () => ++_lid

function createLesson(index) {
  return {
    id: newId(),
    lessonTitle: '',
    collapsed: index > 0,
    numberOfReadingPages: 2,
    images: [],
    videoUrl: '',
    videoTitle: '',
    videoDuration: '',
    videoDurationError: null,
    videoFetching: false,
    numberOfTakeaways: 3,
    numberOfFlashcards: 5,
    numberOfQuiz: 5,
  }
}

const INITIAL = {
  moduleTitle: '',
  description: '',
  categories: ['Infection Control', 'Nutrition'],
  purposeUseCase: 'New Staff Training',
  learningObjective: '',

  numberOfLessons: 3,
  difficultyLevel: 'Intermediate',
  estimatedSessionLength: 75,
  passScore: 70,

  targetAudience: 'Care Staff',
  tone: 'Professional',
  language: 'English',
  coverImage: null,

  knowledgeBase: '',
  aiUsagePreference: 'prefer-docs',
  showKBPreview: false,

  lessons: [createLesson(0), createLesson(1), createLesson(2)],

  targetAudienceType: 'profile-group',
  profileGroups: [
    { id: newId(), groupName: 'Senior Care Staff',  description: 'All senior-level care staff across centres',    centres: 'Residential Aged Care, Dementia Unit', members: 45 },
    { id: newId(), groupName: 'New Joiners',         description: 'Staff who joined in the last 3 months',          centres: 'All Centres',                          members: 12 },
    { id: newId(), groupName: 'Nursing Team',        description: 'Registered nurses and enrolled nurses',          centres: 'Residential Aged Care',                members: 28 },
  ],
  dynamicGroups: [
    { id: newId(), name: 'Active Caregivers',    criteria: 'Role = Care Worker  AND  Status = Active',             members: 67 },
    { id: newId(), name: 'Full-Time RNs',        criteria: 'Role = Registered Nurse  AND  Employment = Full-Time', members: 15 },
    { id: newId(), name: 'Dementia Specialists', criteria: 'Unit = Dementia  AND  Certification = Dementia Care',  members: 9  },
  ],
  individuals: [
    { id: newId(), name: 'Sarah Johnson', role: 'Registered Nurse', centre: 'Residential Aged Care' },
    { id: newId(), name: 'Michael Chen',  role: 'Care Worker',      centre: 'Dementia Unit'         },
    { id: newId(), name: 'Emma Williams', role: 'Team Leader',      centre: 'Home Care'             },
    { id: newId(), name: 'James Okafor', role: 'Support Worker',    centre: 'Day Program'           },
  ],
}

export default function App() {
  const [view,       setView]       = useState('form')
  const [processing, setProcessing] = useState(false)
  const [activeTab,  setActiveTab]  = useState('setup')
  const [status,     setStatus]     = useState('Pending')
  const [formData,   setFormData]   = useState(INITIAL)
  const [moduleData, setModuleData] = useState(null)

  function onChange(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  function onLessonsCountChange(n) {
    const count   = Math.max(1, Math.min(20, n || 1))
    const current = formData.lessons
    const next    = count > current.length
      ? [...current, ...Array.from({ length: count - current.length }, (_, i) => createLesson(current.length + i))]
      : current.slice(0, count)
    setFormData(prev => ({ ...prev, numberOfLessons: count, lessons: next }))
  }

  function onContinueToAudience() {
    setActiveTab('audience')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onGenerate() {
    setStatus('Processing')
    setProcessing(true)
    setTimeout(() => {
      setModuleData(buildModuleData(formData))
      setProcessing(false)
      setStatus('Unpublished')
      setView('preview')
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 2500)
  }

  function onEdit() {
    setView('form')
    setStatus('Pending')
    setActiveTab('setup')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function onDiscard() {
    if (!window.confirm('Discard this generated module and return to the form?')) return
    setView('form')
    setStatus('Pending')
    setModuleData(null)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (view === 'preview' && moduleData) {
    return (
      <PreviewView
        module={moduleData}
        status={status}
        setStatus={setStatus}
        onEdit={onEdit}
        onDiscard={onDiscard}
      />
    )
  }

  return (
    <div>
      <TopBar />
      <StatusBar current={status} onChange={setStatus} />

      <div className="form-body">
        <ModuleHeader formData={formData} onChange={onChange} />

        <div className="banner-draft">
          ⊙ <strong>Draft</strong> — fill in <em>Module Info</em>, <em>Lesson Content</em>, then continue to <em>Audience</em> and <strong>Generate</strong>.
        </div>

        <div className="tabs">
          <div className={`tab${activeTab === 'setup'    ? ' active' : ''}`} onClick={() => setActiveTab('setup')}>Module Setup</div>
          <div className={`tab${activeTab === 'audience' ? ' active' : ''}`} onClick={() => setActiveTab('audience')}>
            Audience
            {activeTab === 'setup' && <span className="tab-arrow"> →</span>}
          </div>
        </div>

        {activeTab === 'setup' && (
          <CourseSetupTab
            formData={formData}
            onChange={onChange}
            onLessonsCountChange={onLessonsCountChange}
            onContinueToAudience={onContinueToAudience}
          />
        )}
        {activeTab === 'audience' && (
          <AudienceTab formData={formData} onChange={onChange} onGenerate={onGenerate} />
        )}
      </div>

      {processing && (
        <div className="processing-overlay">
          <div className="processing-card">
            <div className="processing-spinner" />
            <div className="processing-title">AI is generating your module content…</div>
            <div className="processing-sub">Analysing your inputs, drafting reading pages, flashcards, and quiz questions.</div>
            <div className="processing-steps">
              <div className="processing-step done">✓ Reading objectives and knowledge base</div>
              <div className="processing-step done">✓ Drafting reading pages per lesson</div>
              <div className="processing-step active">↻ Generating flashcards and quiz…</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
