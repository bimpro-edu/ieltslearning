import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import ReactMarkdown from 'react-markdown';

    data: {
      label: 'Lexical Resource (LR)',
      content: '* **Band 5:** Limited range, frequent errors, repetitive vocabulary; meaning sometimes impeded.\n* **Band 6:** Reasonable range; some errors and odd word choice but meaning clear.\n* **Band 7:** Good range with flexibility; occasional inaccuracies but ideas expressed precisely.\n* **Band 8:** Wide range with precision and appropriate collocations; minor slips only.'
    },
    position: { x: 600, y: 350 },
  },
  {
    id: '2-gra',
    type: 'custom',
    data: {
      label: 'Grammatical Range & Accuracy (GRA)',
      content: '* **Band 5:** Frequent grammatical errors which may cause confusion; limited range of structures.\n* **Band 6:** Mix of simple and complex structures; some errors but meaning usually clear.\n* **Band 7:** Good control of complex grammar; occasional mistakes but do not impede communication.\n* **Band 8:** Wide range, accurate use of complex structures; very few errors.'
    },
    position: { x: 600, y: 400 },
  },
  {
    id: '2-scoring',
    type: 'custom',
    data: {
      label: 'Scoring rule',
      content: '**Scoring rule to explain to learners:** each criterion is scored 0–9, then the four scores are averaged and **rounded to the nearest 0.5 or whole band**: .25 → .5, .75 → next whole.\nExamples: 6.25 → 6.5 ; 6.75 → 7.0.'
    },
    position: { x: 600, y: 450 },
  },
  {
    id: '3',
    type: 'custom',
    data: {
      label: '3) Common Misconceptions & Pitfalls',
      content: ''
    },
    position: { x: 200, y: 550 },
  },
  {
    id: '3-1',
    type: 'custom',
    data: {
      label: 'Misconception: “Using rare words = higher band.”',
      content: '* Fix: clarity + appropriate use wins. Teach collocations and precise usage.'
    },
    position: { x: 600, y: 500 },
  },
  {
    id: '3-2',
    type: 'custom',
    data: {
      label: 'Pitfall: Spending 40 minutes on Task 1 for Academic.',
      content: '* Fix: practice timed splits; do many timed Task-1 drills emphasising "overview + key features".'
    },
    position: { x: 600, y: 550 },
  },
  {
    id: '3-3',
    type: 'custom',
    data: {
      label: 'Pitfall: Writing long introductions that repeat the prompt and leave no time for development.',
      content: '* Fix: introduce the 3-sentence intro technique (paraphrase + overview + thesis/position) and practise.'
    },
    position: { x: 600, y: 600 },
  },
  {
    id: '3-4',
    type: 'custom',
    data: {
      label: 'Pitfall: Weak paragraph structure → low CC band.',
      content: '* Fix: teach paragraph plan formula: Topic sentence -> 2 supporting sentences -> example -> mini-conclusion.'
    },
    position: { x: 600, y: 650 },
  },
  {
    id: '4',
    type: 'custom',
    data: {
      label: '4) Placement & Goal-Setting — Diagnostic + SMART plan',
      content: ''
    },
    position: { x: 200, y: 800 },
  },
  {
    id: '4-1',
    type: 'custom',
    data: {
      label: 'Diagnostic design',
      content: '**Diagnostic design (recommended)**\n\n* **Task 1 (Academic):** Describe a chart/graph in **20 minutes**, 150–200 words.\n* **Task 2:** Full essay in **40 minutes**, 250+ words.\n* **Optional:** a short language questionnaire (self-rated areas of strength/weakness).'
    },
    position: { x: 600, y: 700 },
  },
  {
    id: '4-2',
    type: 'custom',
    data: {
      label: 'How to mark the diagnostic',
      content: '**How to mark the diagnostic (teacher step-by-step)**\n1. Score TR, CC, LR, GRA individually using the descriptors.\n2. Record **evidence** for each (quote problem areas).\n3. Compute mean and round to nearest 0.5/1.0.\n4. Produce a short feedback note (what to keep, top 3 targets, first-week drills).'
    },
    position: { x: 600, y: 750 },
  },
  {
    id: '4-3',
    type: 'custom',
    data: {
      label: 'Scoring sheet template',
      content: '**Scoring sheet template (copy/paste):**\n\n* Student:\n* Task: (1/2)\n* TR: __ /9 — Evidence: __________\n* CC: __ /9 — Evidence: __________\n* LR: __ /9 — Evidence: __________\n* GRA: __ /9 — Evidence: __________\n* Average: __ → Final writing band: __\n* Top 3 priorities & drills: 1) ___ 2) ___ 3) ___'
    },
    position: { x: 600, y: 800 },
  },
  {
    id: '4-4',
    type: 'custom',
    data: {
      label: 'Suggested placement mapping',
      content: '**Suggested placement mapping (use as a guide)**\n\n* Avg ≤ 5.0 → **Focused foundation**: grammar building, basic paragraphing.\n* Avg 5.0–6.0 → **Core practice**: cohesive devices, essay planning, vocabulary building.\n* Avg 6.0–7.0 → **Band upgrade**: refine lexical precision, sophisticated coherence, accuracy under timed conditions.\n* Avg ≥ 7.0 → **Polish + exam technique**: micro-targeted error correction and timed full tests.'
    },
    position: { x: 600, y: 850 },
  },
  {
    id: '4-5',
    type: 'custom',
    data: {
      label: 'SMART goal template',
      content: '**SMART goal template (give to each learner)**\n\n* Specific: Target band __ for Writing by __ (date).\n* Measurable: Take monthly full-writing mock tests.\n* Achievable: Based on diagnostic + planned weekly hours.\n* Relevant: Linked to university/job requirement.\n* Time-bound: Achieve target by (date).\n\n**Sample:** “Reach **Band 6.5** in Writing by **Dec 15, 2025** with 3 x 40-min timed essays and weekly feedback for 10 weeks.”'
    },
    position: { x: 600, y: 900 },
  },
  {
    id: '5',
    type: 'custom',
    data: {
      label: '5) Diagnostic example + annotated feedback',
      content: '**Prompt (Task 2):** *Some people say students should only study subjects useful for jobs. To what extent do you agree or disagree?*\n\n**Student sample (short)** — *200 words*\n\n> Many students think that only job-related subjects are necessary because they believe it helps them find work quickly. I partly agree that practical classes help but also think general subjects give important background for thinking and creativity. For example subjects like history help to understand culture and make better decisions. Moreover, mathematics and science teach problem solving skills used in many jobs. However vocational training is very useful for learn specific jobs. In conclusion, both types are important and school should balance them.\n\n(This short sample intentionally shows typical mid-level features: partial development, small range vocab, grammar slips.)'
    },
    position: { x: 200, y: 1000 },
  },
  {
    id: '5-1',
    type: 'custom',
    data: {
      label: 'Annotated scoring',
      content: '**Annotated scoring (example):**\n\n* TR: **6.0** — Position present and task addressed, but development thin and few specific examples.\n* CC: **6.0** — Basic paragraphing; ideas mostly connected but some jumpy sentences.\n* LR: **5.5** — Basic vocabulary; repetition (“help” used many times), limited collocations.\n* GRA: **5.5** — Frequent small errors (“learn” → “learn”, verb forms; missing articles; sentence fragments).\n* **Average = (6 + 6 + 5.5 + 5.5) / 4 = 5.75 → rounded to 6.0 overall.**'
    },
    position: { x: 600, y: 975 },
  },
  {
    id: '5-2',
    type: 'custom',
    data: {
      label: 'Feedback & first-week plan',
      content: '**Feedback & first-week plan (example):**\n\n1. TR: add 1 concrete example + short data or scenario (drill: write 2 supporting examples in 10 minutes × 3).\n2. LR: build 20 collocations around education & work (drill: flashcards + use 5/day).\n3. GRA: focus on verb forms and articles (drill: 10 error-correction sentences/day).\n4. CC: practise paragraph cohesion: add linking phrases and transition sentences (drill: rewrite a paragraph using signals).'
    },
    position: { x: 600, y: 1025 },
  },
  {
    id: '6',
    type: 'custom',
    data: {
      label: '6) Study Habits, Tools & Portfolio setup',
      content: ''
    },
    position: { x: 200, y: 1100 },
  },
  {
    id: '6-1',
    type: 'custom',
    data: {
      label: 'Daily / weekly routine',
      content: '**Daily / weekly routine (recommended)**\n\n* **Daily micro-writing (15–20 min):** paraphrase exercises, single-paragraph responses, collocations.\n* **2x weekly:** focus drill (grammar or vocabulary) 30 min.\n* **1x weekly:** timed Task 1 or Task 2 practice + self-review.\n* **1x fortnight:** teacher feedback on one full timed Task.'
    },
    position: { x: 600, y: 1050 },
  },
  {
    id: '6-2',
    type: 'custom',
    data: {
  label: 'Portfolio / tracker',
  content: '**Portfolio / tracker (columns you can paste into a spreadsheet)**\n\n`Date,TaskType,Prompt,Timed(min),WordCount,SelfBandEstimate,TeacherBand,TR,CC,LR,GRA,TopErrors,ActionItems,Notes`\n\n**Example row:**\n\n`2025-09-20,Task 2,"Job-related subjects prompt",40,260,6.0,6.0,6,6,5.5,5.5,"repetition; article errors","LR: collocation drill", "Used 2 examples"`'
    },
    position: { x: 600, y: 1100 },
  },
  {
    id: '6-3',
    type: 'custom',
    data: {
      label: 'Tools & templates',
      content: '**Tools & templates**\n\n* Notebook (digital or paper) for **lexical bank**: collocations, synonyms, word families, model phrases.\n* Checklist for each practice essay: (Intro? Overview? 2–3 developed body paragraphs? Conclusion? Word count? Timing?).\n* Simple feedback template teachers should use (see scoring sheet above).'
    },
    position: { x: 600, y: 1150 },
  },
  {
    id: '7',
    type: 'custom',
    data: {
      label: '7) Orientation Session-by-session plan',
      content: 'You can run Orientation as 2 × 90-minute live sessions or 3 × 60-minute micro-sessions. Example 2-session plan:'
    },
    position: { x: 200, y: 1200 },
  },
  {
    id: '7-1',
    type: 'custom',
    data: {
      label: 'Session 1 (90 min)',
      content: '* 0–10: Welcome + objectives.\n* 10–25: Test format + timing + quick quiz.\n* 25–50: Band descriptors explained with sample essays.\n* 50–70: Time-management exercise: plan 1 Task 2 (group activity).\n* 70–90: Diagnostic Task 1 (20-min in-class) + collection.'
    },
    position: { x: 600, y: 1175 },
  },
  {
    id: '7-2',
    type: 'custom',
    data: {
      label: 'Session 2 (90 min)',
      content: '* 0–15: Review Task 1 common problems + mini-lesson.\n* 15–50: Diagnostic Task 2 (40-min in-class).\n* 50–75: Rapid marking demo: teacher scores one Task 2 live; discuss.\n* 75–90: Goal setting + setting up portfolio + next steps.'
    },
    position: { x: 600, y: 1225 },
  },
  {
    id: '8',
    type: 'custom',
    data: {
      label: '8) Orientation Deliverables & Success Criteria',
      content: ''
    },
    position: { x: 200, y: 1300 },
  },
  {
    id: '8-1',
    type: 'custom',
    data: {
      label: 'Each learner should submit',
      content: 'Each learner should submit:\n\n1. One timed Task 1 (Academic/General) — teacher annotated.\n2. One timed Task 2 — teacher annotated.\n3. Completed SMART goal sheet.\n4. Portfolio with first 3-5 micro-writing entries.'
    },
    position: { x: 600, y: 1275 },
  },
  {
    id: '8-2',
    type: 'custom',
    data: {
      label: 'Success criteria to move to FOUNDATION',
      content: '**Success criteria to move to FOUNDATION:**\n\n* Has a realistic target band and a baseline diagnostic.\n* Understands four marking criteria and how they map to personal weaknesses.\n* Has portfolio + tracker set up.'
    },
    position: { x: 600, y: 1325 },
  },
  {
    id: '9',
    type: 'custom',
    data: {
      label: '9) Quick-fix drills by weakness',
      content: ''
    },
    position: { x: 200, y: 1400 },
  },
  {
    id: '9-1',
    type: 'custom',
    data: {
      label: 'TR weak',
      content: '* **TR weak:** 10-minute planning: identify 3 main points + supporting detail for 10 prompts.'
    },
    position: { x: 600, y: 1350 },
  },
  {
    id: '9-2',
    type: 'custom',
    data: {
      label: 'CC weak',
      content: '* **CC weak:** Paragraph re-ordering drills; combine 5 short sentences into 1 coherent paragraph.'
    },
    position: { x: 600, y: 1400 },
  },
  {
    id: '9-3',
    type: 'custom',
    data: {
      label: 'LR weak',
      content: '* **LR weak:** Collocation chase — pick 10 topic words & make 3 collocations each.'
    },
    position: { x: 600, y: 1450 },
  },
  {
    id: '9-4',
    type: 'custom',
    data: {
      label: 'GRA weak',
      content: '* **GRA weak:** Sentence-combining drills — transform 10 simple sentences into 5 complex ones.'
    },
    position: { x: 600, y: 1500 },
  },
  {
    id: '10',
    type: 'custom',
    data: {
      label: '10) Teacher / Coach checklist for Orientation',
      content: '* Prepare 2 model essays (Band 6 and Band 7) annotated to highlight TR/CC/LR/GRA.\n* Print scoring sheets & portfolio templates.\n* Have 5 sample prompts ready for in-class diagnostics.\n* Set clear feedback deadlines (e.g., feedback on diagnostic within 72 hours).\n* Plan individualized “first-week” drills after diagnostics.'
    },
    position: { x: 200, y: 1550 },
  },
  {
    id: '11',
    type: 'custom',
    data: {
      label: '11) Mini-resources',
      content: ''
    },
    position: { x: 200, y: 1650 },
  },
  {
    id: '11-1',
    type: 'custom',
    data: {
      label: 'SMART goal example',
      content: '**SMART goal example**\n\n* Specific: Achieve Writing Band **6.5** by **Dec 15, 2025**.\n* Measurable: Monthly mock tests and weekly essays.\n* Achievable: Current diagnostic 5.75; plan 10 weeks with guided feedback.\n* Relevant: Required for university application.\n* Time-bound: Target date Dec 15, 2025.'
    },
    position: { x: 600, y: 1600 },
  },
  {
    id: '11-2',
    type: 'custom',
    data: {
      label: 'Feedback phrasing template',
      content: '**Feedback phrasing template (teacher → learner)**\n\n* “TR (6.0): Clear position but add specific examples — try 3 short supporting facts next time.”\n* “CC (6.0): Paragraphs mostly fine; work on transitions (however, moreover, in contrast).”\n* “LR (5.5): Vocabulary repetitive — add synonyms and collocations listed in your portfolio.”\n* “GRA (5.5): Frequent verb-form errors; focus on ten common verb patterns this week.”'
    },
    position: { x: 600, y: 1650 },
  },
  {
    id: '11-3',
    type: 'custom',
    data: {
      label: '15-day micro-writing starter prompts',
      content: '**15-day micro-writing starter prompts (15 × 15–20 min)**\n\n1. Paraphrase: “Some people prefer to work for themselves…” (paraphrase exercise)\n2. One-paragraph: advantages of online learning.\n3. Collocation list: “education” (10 collocations + sentences)\n   ... (you can build 15 quickly using common IELTS topics: education, technology, environment, health, work, culture, travel, crime, housing, media, sport, government, youth, fashion, food.)'
    },
    position: { x: 600, y: 1700 },
  },
  {
    id: '12',
    type: 'custom',
    data: {
      label: '12) What next? After Orientation — short roadmap',
      content: '* Move learners to **Foundation** with tailored groupings (Beginner / Intermediate / Advanced).\n* Provide the first week’s prioritized drills based on diagnostic.\n* Schedule first teacher-checked timed essay within 7–10 days.'
    },
    position: { x: 200, y: 1750 },
  },
];

const edges = [
  { id: 'e-root-purpose', source: 'root', target: 'purpose', animated: true },
  { id: 'e-root-where', source: 'root', target: 'where', animated: true },
  { id: 'e-root-1', source: 'root', target: '1', animated: true },
  { id: 'e-1-1-cover', source: '1', target: '1-cover', animated: true },
  { id: 'e-1-1-activities', source: '1', target: '1-activities', animated: true },
  { id: 'e-1-1-deliverables', source: '1', target: '1-deliverables', animated: true },
  { id: 'e-root-2', source: 'root', target: '2', animated: true },
  { id: 'e-2-2-tr', source: '2', target: '2-tr', animated: true },
  { id: 'e-2-2-cc', source: '2', target: '2-cc', animated: true },
  { id: 'e-2-2-lr', source: '2', target: '2-lr', animated: true },
  { id: 'e-2-2-gra', source: '2', target: '2-gra', animated: true },
  { id: 'e-2-2-scoring', source: '2', target: '2-scoring', animated: true },
  { id: 'e-root-3', source: 'root', target: '3', animated: true },
  { id: 'e-3-3-1', source: '3', target: '3-1', animated: true },
  { id: 'e-3-3-2', source: '3', target: '3-2', animated: true },
  { id: 'e-3-3-3', source: '3', target: '3-3', animated: true },
  { id: 'e-3-3-4', source: '3', target: '3-4', animated: true },
  { id: 'e-root-4', source: 'root', target: '4', animated: true },
  { id: 'e-4-4-1', source: '4', target: '4-1', animated: true },
  { id: 'e-4-4-2', source: '4', target: '4-2', animated: true },
  { id: 'e-4-4-3', source: '4', target: '4-3', animated: true },
  { id: 'e-4-4-4', source: '4', target: '4-4', animated: true },
  { id: 'e-4-4-5', source: '4', target: '4-5', animated: true },
  { id: 'e-root-5', source: 'root', target: '5', animated: true },
  { id: 'e-5-5-1', source: '5', target: '5-1', animated: true },
  { id: 'e-5-5-2', source: '5', target: '5-2', animated: true },
  { id: 'e-root-6', source: 'root', target: '6', animated: true },
  { id: 'e-6-6-1', source: '6', target: '6-1', animated: true },
  { id: 'e-6-6-2', source: '6', target: '6-2', animated: true },
  { id: 'e-6-6-3', source: '6', target: '6-3', animated: true },
  { id: 'e-root-7', source: 'root', target: '7', animated: true },
  { id: 'e-7-7-1', source: '7', target: '7-1', animated: true },
  { id: 'e-7-7-2', source: '7', target: '7-2', animated: true },
  { id: 'e-root-8', source: 'root', target: '8', animated: true },
  { id: 'e-8-8-1', source: '8', target: '8-1', animated: true },
  { id: 'e-8-8-2', source: '8', target: '8-2', animated: true },
  { id: 'e-root-9', source: 'root', target: '9', animated: true },
  { id: 'e-9-9-1', source: '9', target: '9-1', animated: true },
  { id: 'e-9-9-2', source: '9', target: '9-2', animated: true },
  { id: 'e-9-9-3', source: '9', target: '9-3', animated: true },
  { id: 'e-9-9-4', source: '9', target: '9-4', animated: true },
  { id: 'e-root-10', source: 'root', target: '10', animated: true },
  { id: 'e-root-11', source: 'root', target: '11', animated: true },
  { id: 'e-11-11-1', source: '11', target: '11-1', animated: true },
  { id: 'e-11-11-2', source: '11', target: '11-2', animated: true },
  { id: 'e-11-11-3', source: '11', target: '11-3', animated: true },
  { id: 'e-root-12', source: 'root', target: '12', animated: true },
];

const InteractiveMindmap = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

// Mindmap component removed as requested.
export default function InteractiveMindmap() {
  return null;
}
