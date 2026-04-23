export const MOCK_LESSONS = [
  {
    id: 1,
    title: 'Hand Hygiene Fundamentals',
    pages: [
      {
        title: 'Why Hand Hygiene Matters',
        body: 'Hand hygiene is the single most effective way to prevent infection spread in care environments. Healthcare-associated infections affect millions globally each year, yet up to 70% are preventable through proper hand hygiene. Hands are the primary vehicle for transferring pathogens between residents, staff, and surfaces.',
      },
      {
        title: 'The 7-Step Technique',
        body: 'The WHO-recommended 7-step technique ensures complete hand coverage. Step 1: Wet hands. Step 2: Apply soap. Step 3: Rub palms together. Step 4: Rub back of each hand. Step 5: Rub between fingers. Step 6: Rub backs of fingers. Step 7: Rub each thumb. Rinse and dry with a single-use towel.',
      },
    ],
    image: { caption: 'WHO 7-Step Hand Hygiene Technique' },
    video: {
      description:
        'A 4-minute WHO training video demonstrating the full 7-step handwashing technique in real time. Features close-up footage of each step, narration explaining when each motion matters, and common mistakes highlighted with slow-motion replays. Ideal viewing before the practical hand hygiene assessment.',
      takeaway:
        'Wash hands for at least 20 seconds to effectively remove pathogens, especially after glove removal.',
    },
    flashcards: [
      { q: 'Minimum handwashing duration?', a: '20 seconds, full 7-step technique' },
      { q: 'When to wash before glove use?', a: 'Before any clinical procedure or direct resident contact' },
      { q: 'WHO Moment 1 applies when?', a: 'Before touching the patient' },
      { q: 'Hands visibly soiled — use what?', a: 'Soap and water, not alcohol gel' },
      { q: 'How many WHO hand hygiene steps?', a: '7 steps covering all surfaces' },
    ],
    takeaways: [
      'Hand hygiene is the most effective infection prevention measure',
      'Use full 7-step technique for at least 20 seconds',
      'Use soap and water (not gel) when hands are visibly soiled',
      'Follow the 5 WHO moments for every resident interaction',
    ],
    quiz: [
      { question: 'What % of HCAIs are preventable?', options: ['20%', '45%', '70%', '90%'], correct: 2 },
      { question: 'First step in hand hygiene?', options: ['Apply soap', 'Wet hands', 'Rub palms', 'Use gel'], correct: 1 },
      { question: 'When is alcohol gel NOT appropriate?', options: ['After toilet', 'Before contact', 'Visibly soiled hands', 'Between gloves'], correct: 2 },
      { question: 'How many WHO hand hygiene moments?', options: ['3', '5', '7', '9'], correct: 1 },
      { question: 'WHO moment after touching a patient?', options: ['Moment 1', 'Moment 2', 'Moment 3', 'Moment 4'], correct: 3 },
    ],
  },
  {
    id: 2,
    title: 'PPE Usage and Disposal',
    pages: [
      {
        title: 'Types of Personal Protective Equipment',
        body: 'Care staff commonly use four main PPE types: gloves, aprons, masks, and eye protection. Selection depends on task and risk level. Gloves are for contact with bodily fluids or non-intact skin, aprons protect clothing during close contact care, masks provide respiratory protection, and eye protection is worn for splash-risk procedures. Always risk-assess before choosing PPE.',
      },
      {
        title: 'Donning and Doffing Safely',
        body: 'Donning order: apron first, mask second, eye protection, then gloves last. Doffing reverses carefully — gloves first (peel off inside-out), then eye protection, apron (tear at neck and fold inward), mask last (pull by ear loops only). Perform hand hygiene before donning and immediately after doffing. Never reuse single-use PPE between residents.',
      },
    ],
    image: { caption: 'PPE Donning and Doffing Sequence' },
    video: {
      description:
        'A 6-minute practical demonstration filmed in a care setting. A clinical educator walks through donning four PPE items in sequence, then removes them using the safe doffing technique. Includes side-by-side comparisons of correct versus unsafe removal, and annotations showing where contamination typically occurs.',
      takeaway:
        'Doffing is when contamination happens — slow down and follow the exact reverse order to protect yourself and others.',
    },
    flashcards: [
      { q: 'Correct donning order?', a: 'Apron, mask, eye protection, gloves' },
      { q: 'First PPE to remove?', a: 'Gloves — peel off inside-out' },
      { q: 'When to do hand hygiene with PPE?', a: 'Before donning and after doffing' },
      { q: 'Can gloves be reused between residents?', a: 'Never — dispose after each resident' },
      { q: 'How is a mask removed safely?', a: 'By the ear loops only, without touching the front' },
    ],
    takeaways: [
      'Risk-assess before choosing PPE for the task',
      'Donning sequence: apron → mask → eye protection → gloves',
      'Doffing reverses the sequence and must be done slowly',
      'Hand hygiene bookends every PPE use',
    ],
    quiz: [
      { question: 'Which PPE item is donned first?', options: ['Gloves', 'Mask', 'Apron', 'Eye protection'], correct: 2 },
      { question: 'First step when removing PPE?', options: ['Remove apron', 'Remove gloves', 'Remove mask', 'Hand hygiene'], correct: 1 },
      { question: 'When should hand hygiene be performed?', options: ['Only after doffing', 'Only before donning', 'Before donning and after doffing', 'Only if visibly soiled'], correct: 2 },
      { question: 'Can gloves be reused between two residents?', options: ['Yes if wiped', 'Yes on same unit', 'No, always dispose', 'Yes for short visits'], correct: 2 },
      { question: 'How is a mask removed safely?', options: ['Touch the front', 'By ear loops only', 'Pull down and reuse', 'Let it drop'], correct: 1 },
    ],
  },
  {
    id: 3,
    title: 'Standard Precautions in Care Settings',
    pages: [
      {
        title: 'Blood and Bodily Fluids',
        body: 'Treat all blood and bodily fluids as potentially infectious regardless of diagnosis. Wear gloves for any direct contact. Use absorbent materials to contain spills, apply disinfectant per facility protocol, then dispose in the clinical waste stream. Report any exposure incident to occupational health immediately.',
      },
      {
        title: 'Sharps Safety and Linen Handling',
        body: 'Never recap needles. Dispose of sharps at point of use in a rigid yellow sharps bin — never more than three-quarters full. Handle soiled linen with gloves, minimise agitation, and place directly in red alginate bags for the laundry. Keep linen away from your uniform during transfer.',
      },
    ],
    image: { caption: 'Clinical Waste Streams — Colour Coded Bins' },
    video: {
      description:
        'A 5-minute scenario-based video following a care worker through a shift: managing a bodily fluid spill, disposing of sharps safely, and handling soiled linen. Each scenario pauses for a short quiz before revealing the correct action, reinforcing decision-making under real time pressure.',
      takeaway:
        'Every body fluid exposure is a potential bloodborne pathogen risk — there are no low-risk encounters.',
    },
    flashcards: [
      { q: 'How should all bodily fluids be treated?', a: 'As potentially infectious regardless of diagnosis' },
      { q: 'Maximum fill level for a sharps bin?', a: 'Three-quarters full — dispose before overflow' },
      { q: 'Can needles be recapped after use?', a: 'Never — dispose immediately at point of use' },
      { q: 'What colour bag holds soiled linen?', a: 'Red alginate bag, sealed before transfer' },
      { q: 'First action after a sharps injury?', a: 'Encourage bleeding, wash, and report immediately' },
    ],
    takeaways: [
      'All bodily fluids are treated as potentially infectious',
      'Sharps go directly into the yellow sharps bin — never recap',
      'Soiled linen goes into red alginate bags, away from the body',
      'Report any exposure incident to occupational health without delay',
    ],
    quiz: [
      { question: 'How should blood be treated?', options: ['Only if diagnosis known', 'As potentially infectious', 'Only if visible amount', 'Only in clinical settings'], correct: 1 },
      { question: 'Max fill level of a sharps bin?', options: ['Half', 'Two-thirds', 'Three-quarters', 'Full'], correct: 2 },
      { question: 'When may needles be recapped?', options: ['Always', 'If in a hurry', 'Never', 'Using gloves'], correct: 2 },
      { question: 'What colour bag for soiled linen?', options: ['Yellow', 'Red', 'Clear', 'Blue'], correct: 1 },
      { question: 'First action after a sharps injury?', options: ['Finish the task', 'Ignore if small', 'Encourage bleeding and report', 'Apply plaster only'], correct: 2 },
    ],
  },
]

export const MOCK_OBJECTIVES = [
  'Identify main routes of infection transmission in care settings',
  'Demonstrate correct hand hygiene using the 7-step method',
  'Apply standard precautions when handling bodily fluids or soiled linen',
  'Select and don appropriate PPE for different care scenarios',
]

export function buildModuleData(formData) {
  return {
    title:          (formData.moduleTitle || '').trim() || 'Infection Control Basics',
    difficulty:     formData.difficultyLevel || 'Beginner',
    duration:       formData.estimatedSessionLength || 20,
    passScore:      formData.passScore || 70,
    targetAudience: formData.targetAudience || 'Care Staff',
    tone:           formData.tone || 'Professional',
    language:       formData.language || 'English',
    lessonCount:    MOCK_LESSONS.length,
    objectives:     MOCK_OBJECTIVES,
    lessons:        MOCK_LESSONS,
  }
}
