import { useState } from 'react'

const DUMMY_PROFILE_GROUPS = [
  { id: 1, groupName: 'Senior Care Staff',   description: 'All senior-level care staff across centres',    centres: 'Residential Aged Care, Dementia Unit', members: 45 },
  { id: 2, groupName: 'New Joiners',          description: 'Staff who joined in the last 3 months',          centres: 'All Centres',                          members: 12 },
  { id: 3, groupName: 'Nursing Team',         description: 'Registered nurses and enrolled nurses',          centres: 'Residential Aged Care',                members: 28 },
]
const DUMMY_DYNAMIC_GROUPS = [
  { id: 1, name: 'Active Caregivers',    criteria: 'Role = Care Worker  AND  Status = Active',             members: 67 },
  { id: 2, name: 'Full-Time RNs',        criteria: 'Role = Registered Nurse  AND  Employment = Full-Time', members: 15 },
  { id: 3, name: 'Dementia Specialists', criteria: 'Unit = Dementia  AND  Certification = Dementia Care',  members: 9  },
]
const DUMMY_INDIVIDUALS = [
  { id: 1, name: 'Sarah Johnson', role: 'Registered Nurse', centre: 'Residential Aged Care' },
  { id: 2, name: 'Michael Chen',  role: 'Care Worker',      centre: 'Dementia Unit'         },
  { id: 3, name: 'Emma Williams', role: 'Team Leader',      centre: 'Home Care'             },
  { id: 4, name: 'James Okafor', role: 'Support Worker',    centre: 'Day Program'           },
]

function ProfileGroupTable({ rows, onAdd, onRemove }) {
  return (
    <div className="aud-table-wrap">
      <div className="aud-section-label">Profile Groups (Members)</div>
      <table className="aud-table">
        <thead><tr>
          <th>Group Name</th><th>Description</th><th>Centre(s)</th>
          <th style={{ textAlign:'right' }}>No. of Members</th><th style={{ width:32 }} />
        </tr></thead>
        <tbody>{rows.map(row => (
          <tr key={row.id}>
            <td className="aud-td-name">{row.groupName}</td>
            <td>{row.description}</td>
            <td className="aud-td-muted">{row.centres}</td>
            <td style={{ textAlign:'right', fontWeight:600 }}>{row.members}</td>
            <td><button className="btn-remove" onClick={() => onRemove(row.id)}>✕</button></td>
          </tr>
        ))}</tbody>
        <tfoot><tr><td colSpan={5}><button className="aud-add-line" onClick={onAdd}>Add a line</button></td></tr></tfoot>
      </table>
    </div>
  )
}

function DynamicGroupTable({ rows, onAdd, onRemove }) {
  return (
    <div className="aud-table-wrap">
      <div className="aud-section-label">Dynamic Groups (Auto-populated)</div>
      <table className="aud-table">
        <thead><tr>
          <th>Group Name</th><th>Filter Criteria</th>
          <th style={{ textAlign:'right' }}>Matched Members</th><th style={{ width:32 }} />
        </tr></thead>
        <tbody>{rows.map(row => (
          <tr key={row.id}>
            <td className="aud-td-name">{row.name}</td>
            <td><span className="criteria-pill">{row.criteria}</span></td>
            <td style={{ textAlign:'right', fontWeight:600 }}>{row.members}</td>
            <td><button className="btn-remove" onClick={() => onRemove(row.id)}>✕</button></td>
          </tr>
        ))}</tbody>
        <tfoot><tr><td colSpan={4}><button className="aud-add-line" onClick={onAdd}>Add a line</button></td></tr></tfoot>
      </table>
    </div>
  )
}

function IndividualTable({ rows, onAdd, onRemove }) {
  return (
    <div className="aud-table-wrap">
      <div className="aud-section-label">Individuals</div>
      <table className="aud-table">
        <thead><tr>
          <th>Name</th><th>Role</th><th>Centre</th><th style={{ width:32 }} />
        </tr></thead>
        <tbody>{rows.map(row => (
          <tr key={row.id}>
            <td className="aud-td-name">{row.name}</td>
            <td>{row.role}</td>
            <td className="aud-td-muted">{row.centre}</td>
            <td><button className="btn-remove" onClick={() => onRemove(row.id)}>✕</button></td>
          </tr>
        ))}</tbody>
        <tfoot><tr><td colSpan={4}><button className="aud-add-line" onClick={onAdd}>Add a line</button></td></tr></tfoot>
      </table>
    </div>
  )
}

export default function AudienceTab({ formData, onChange, onGenerate }) {
  const { targetAudienceType, profileGroups, dynamicGroups, individuals } = formData
  const [generating, setGenerating] = useState(false)

  function removeRow(key, id) { onChange(key, formData[key].filter(r => r.id !== id)) }
  function addDummy(key, template) { onChange(key, [...formData[key], { ...template, id: Date.now() }]) }

  function handleGenerate() {
    if (onGenerate) { onGenerate(); return }
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      alert('✦ Training module sent for generation!')
    }, 500)
  }

  return (
    <>
      <div className="form-group">
        <div className="aud-info-bar">
          ℹ Choose who will receive this module. The selector below switches based on the <strong>Target Audience</strong> picked in <strong>Module Setup</strong>.
        </div>

        <div className="field-row" style={{ marginBottom: 20 }}>
          <div className="field-label">Target Audience Type <span className="req">*</span></div>
          <div className="field-value">
            <select className="select" style={{ maxWidth: 240 }}
              value={targetAudienceType} onChange={e => onChange('targetAudienceType', e.target.value)}>
              <option value="profile-group">Profile Group</option>
              <option value="dynamic-group">Dynamic Group</option>
              <option value="individual">Individual</option>
            </select>
          </div>
        </div>

        {targetAudienceType === 'profile-group' && (
          <ProfileGroupTable rows={profileGroups}
            onRemove={id => removeRow('profileGroups', id)}
            onAdd={() => addDummy('profileGroups', { groupName: 'New Group', description: '', centres: '', members: 0 })} />
        )}
        {targetAudienceType === 'dynamic-group' && (
          <DynamicGroupTable rows={dynamicGroups}
            onRemove={id => removeRow('dynamicGroups', id)}
            onAdd={() => addDummy('dynamicGroups', { name: 'New Dynamic Group', criteria: '', members: 0 })} />
        )}
        {targetAudienceType === 'individual' && (
          <IndividualTable rows={individuals}
            onRemove={id => removeRow('individuals', id)}
            onAdd={() => addDummy('individuals', { name: 'New Staff', role: '', centre: '' })} />
        )}
      </div>

      {/* Generate strip */}
      <div className="generate-strip">
        <div className="generate-strip-hint">
          Audience is set. Click <strong>Generate</strong> to create the full training module with AI.
        </div>
        <button className="btn-generate" onClick={handleGenerate} disabled={generating}>
          {generating
            ? <><span className="spinner" style={{ borderColor:'#fff', borderTopColor:'transparent' }} /> Generating…</>
            : '✦ Generate Training Module'
          }
        </button>
      </div>
    </>
  )
}
