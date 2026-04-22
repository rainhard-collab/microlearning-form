import NumberCard from './ui/NumberCard'

const CARDS = [
  { key: 'flashcards',          label: 'Flashcards',         sublabel: 'spaced-repetition cards' },
  { key: 'choiceQuestions',     label: 'Choice Questions',   sublabel: 'multiple-choice quiz' },
  { key: 'trueFalseQuestions',  label: 'True / False',       sublabel: 'true / false quiz' },
  { key: 'selectAllQuestions',  label: 'Select All Relevant',sublabel: 'select-all-that-apply' },
]

export default function QuestionMix({ formData, onChange }) {
  return (
    <div style={{ marginTop: 28 }}>
      <div className="section-label">Question Mix — per Module</div>
      <div className="four-col">
        {CARDS.map(({ key, label, sublabel }) => (
          <NumberCard
            key={key}
            label={label}
            value={formData[key]}
            sublabel={sublabel}
            onChange={val => onChange(key, val)}
          />
        ))}
      </div>
    </div>
  )
}
