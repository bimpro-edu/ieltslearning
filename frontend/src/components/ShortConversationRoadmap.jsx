import React from "react";

const roadmap = [
  {
    title: "A. Orientation",
    items: [
      "Purpose of Part 1",
      "Typical formats (booking, registration, enquiry)",
      "Question types (form, table, short answer)",
      "Audio length & speaker types",
    ],
  },
  {
    title: "B. Foundations",
    items: [
      "Reading instructions & question frames pre-listen",
      "Predicting expected answer type (number/name/date)",
      "Keyword spotting & paraphrase recognition",
      "Spelling & number formatting rules",
    ],
  },
  {
    title: "C. Task Mastery (Step-by-step)",
    items: [
      "Read instructions → underline keywords",
      "Predict answer types & possible words",
      "Listen for signposts & corrections",
      "Enter answer, check spelling/format quickly",
      "Move on (don’t freeze after miss)",
    ],
  },
  {
    title: "D. Question Type Drills",
    items: [
      "Form completion",
      "Table completion",
      "Short answer (1–3 words)",
      "Multiple choice (short options)",
      "Matching (simple)",
    ],
  },
  {
    title: "E. Advanced Skills",
    items: [
      "Handling self-corrections & distractors",
      "Processing numbers (dates/phone/currencies)",
      "Accent coping strategies (UK/US/AU)",
      "Fast speech & reduced forms (gonna, I’ll)",
    ],
  },
  {
    title: "F. Interactive Practice",
    items: [
      "Dictation trainer (type & check)",
      "Drag-to-form (drag numbers/words into blank fields)",
      "Accent toggle & speed control",
      "Repeat-last-utterance & loop snippet",
    ],
  },
  {
    title: "G. Assessment",
    items: [
      "Mini-Test blueprint (10 qs)",
      "Error taxonomy & feedback",
      "Progress metrics (accuracy, spelling, types missed)",
    ],
  },
  {
    title: "H. Resources",
    items: [
      "Sample transcripts & audio library",
      "Spelling/number cheat-sheet",
      "Instructor notes & model answers",
    ],
  },
  {
    title: "I. Differentiation & Scaffolding",
    items: [
      "Beginner → slowed audio + transcripts",
      "Intermediate → normal speed, no transcripts",
      "Advanced → fast + accent variants + one-play only",
    ],
  },
];

const lessons = [
  {
    title: "Lesson 0 — (Orientation)",
    duration: "20–30 min",
    objectives: "Explain Part 1 purpose & scoring; show example layout.",
    activity: "Teacher plays 1 sample short dialogue (30–40s). Student follows a blank form and sees final answers.",
    deliverables: "Cheat-sheet of common contexts.",
  },
  {
    title: "Lesson 1 — Predicting & Question Analysis",
    duration: "30–40 min",
    teach: "How to read instructions fast, underline keywords, predict answer types (N / Name / Date / Time / Price).",
    activity: "Show 8 sample question prompts; students annotate predicted categories in 60s.",
    homework: "10 quick prompts to predict.",
  },
  {
    title: "Lesson 2 — Keyword Spotting & Paraphrase Recognition",
    duration: "40–50 min",
    teach: "Paraphrase patterns (fee → cost, book → reserve), synonyms used in audio.",
    activity: "Audio snippets where target words are paraphrased; students identify mapping.",
    drill: "5 items.",
  },
  {
    title: "Lesson 3 — Numbers, Dates, Spelling & Format Rules",
    duration: "40–50 min",
    teach: "Number conventions (e.g., phone formatting variants), date formats (1 June vs June 1), British spellings where applicable, hyphenation.",
    activity: "Dictation of numbers + automated format checker.",
    drill: "12 number/date items.",
  },
  {
    title: "Lesson 4 — Form & Table Completion Tactics",
    duration: "40–50 min",
    teach: "Reading headers, pre-filling when possible, keeping consistent format.",
    activity: "Drag-to-form interactive practice; immediate feedback.",
    assessment: "Mini-set of 10 form-fill items.",
  },
  {
    title: "Lesson 5 — Distractors & Self-correction Handling",
    duration: "40–50 min",
    teach: "How speakers correct themselves and how examiners include distractors.",
    activity: "Played clips with corrections; students mark final correct version.",
    drill: "Stop & decide practice.",
  },
  {
    title: "Lesson 6 — Accent & Reduced Forms Practice",
    duration: "40–50 min",
    teach: "Typical accent differences for numbers and common words, reduced speech.",
    activity: "Same short dialogue in UK/US/AU; students compare results and note differences.",
    drill: "8 items each accent.",
  },
  {
    title: "Lesson 7 — Speed, Focus & Recovery",
    duration: "30–45 min",
    teach: "Mental strategies after missing an answer ('drop it and keep listening'), quick scanning for next item.",
    activity: "1 full Part 1 simulation under strict time; immediate reflective checklist.",
  },
  {
    title: "Lesson 8 — Integration & Mini-Test 1 (Assessment)",
    duration: "40–60 min",
    activity: "Admin Mini-Test (10 questions). Students submit answers; system/teacher provides analytic feedback with error categories.",
  },
];

export default function ShortConversationRoadmap() {
  return (
    <div style={{ marginTop: 40, marginBottom: 40 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1976d2', marginBottom: 16 }}>Short Conversation — Guided Roadmap</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 340, maxWidth: 480 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Mindmap Branches</h3>
          <ul style={{ paddingLeft: 18 }}>
            {roadmap.map((branch, i) => (
              <li key={branch.title} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, color: '#1565c0', fontSize: 18 }}>{branch.title}</div>
                <ul style={{ marginLeft: 12, marginTop: 4 }}>
                  {branch.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 16, color: '#333', marginBottom: 2 }}>• {item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 2, minWidth: 420, maxWidth: 700 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Lesson Sequence</h3>
          <ul style={{ paddingLeft: 18 }}>
            {lessons.map((lesson, i) => (
              <li key={lesson.title} style={{ marginBottom: 18, background: '#e3f2fd', borderRadius: 10, padding: 16, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 18 }}>{lesson.title} <span style={{ color: '#333', fontWeight: 400, fontSize: 15 }}>({lesson.duration})</span></div>
                {lesson.objectives && <div style={{ marginTop: 4, color: '#333' }}><b>Objectives:</b> {lesson.objectives}</div>}
                {lesson.teach && <div style={{ marginTop: 4, color: '#333' }}><b>Teach:</b> {lesson.teach}</div>}
                {lesson.activity && <div style={{ marginTop: 4, color: '#333' }}><b>Activity:</b> {lesson.activity}</div>}
                {lesson.deliverables && <div style={{ marginTop: 4, color: '#333' }}><b>Deliverables:</b> {lesson.deliverables}</div>}
                {lesson.homework && <div style={{ marginTop: 4, color: '#333' }}><b>Homework:</b> {lesson.homework}</div>}
                {lesson.drill && <div style={{ marginTop: 4, color: '#333' }}><b>Drill:</b> {lesson.drill}</div>}
                {lesson.assessment && <div style={{ marginTop: 4, color: '#333' }}><b>Assessment:</b> {lesson.assessment}</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
