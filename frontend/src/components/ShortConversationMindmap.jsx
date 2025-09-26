
import React, { memo, useState, useCallback } from "react";
import ReactFlow, { Background, Controls, Handle, Position, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "root", data: { label: "Short Conversation" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "types", data: { label: "Short Conversation Types / Category" }, position: { x: -220, y: 120 }, draggable: true },
  { id: "lessonSeq", data: { label: "Lesson Sequence" }, position: { x: 220, y: 120 }, draggable: true },
  // Types/Category children
  { id: "orientation", data: { label: "A. Orientation" }, position: { x: -340, y: 240 }, draggable: true },
  { id: "foundations", data: { label: "B. Foundations" }, position: { x: -220, y: 240 }, draggable: true },
  { id: "taskMastery", data: { label: "C. Task Mastery" }, position: { x: -100, y: 240 }, draggable: true },
  { id: "drills", data: { label: "D. Question Type Drills" }, position: { x: -340, y: 360 }, draggable: true },
  { id: "advanced", data: { label: "E. Advanced Skills" }, position: { x: -220, y: 360 }, draggable: true },
  { id: "practice", data: { label: "F. Interactive Practice" }, position: { x: -100, y: 360 }, draggable: true },
  { id: "assessment", data: { label: "G. Assessment" }, position: { x: -340, y: 480 }, draggable: true },
  { id: "resources", data: { label: "H. Resources" }, position: { x: -220, y: 480 }, draggable: true },
  { id: "differentiation", data: { label: "I. Differentiation & Scaffolding" }, position: { x: -100, y: 480 }, draggable: true },
  // Lesson Sequence children
  { id: "lesson0", data: { label: "Lesson 0: Orientation" }, position: { x: 100, y: 240 }, draggable: true },
  { id: "lesson1", data: { label: "Lesson 1: Predicting & Question Analysis" }, position: { x: 220, y: 240 }, draggable: true },
  { id: "lesson2", data: { label: "Lesson 2: Keyword Spotting & Paraphrase Recognition" }, position: { x: 340, y: 240 }, draggable: true },
  { id: "lesson3", data: { label: "Lesson 3: Numbers, Dates, Spelling & Format Rules" }, position: { x: 100, y: 360 }, draggable: true },
  { id: "lesson4", data: { label: "Lesson 4: Form & Table Completion Tactics" }, position: { x: 220, y: 360 }, draggable: true },
  { id: "lesson5", data: { label: "Lesson 5: Distractors & Self-correction Handling" }, position: { x: 340, y: 360 }, draggable: true },
  { id: "lesson6", data: { label: "Lesson 6: Accent & Reduced Forms Practice" }, position: { x: 100, y: 480 }, draggable: true },
  { id: "lesson7", data: { label: "Lesson 7: Speed, Focus & Recovery" }, position: { x: 220, y: 480 }, draggable: true },
  { id: "lesson8", data: { label: "Lesson 8: Integration & Mini-Test 1" }, position: { x: 340, y: 480 }, draggable: true },
];

const edges = [
  { id: "e-root-types", source: "root", target: "types" },
  { id: "e-root-lessonSeq", source: "root", target: "lessonSeq" },
  // Types/Category children
  { id: "e-types-orientation", source: "types", target: "orientation" },
  { id: "e-types-foundations", source: "types", target: "foundations" },
  { id: "e-types-taskMastery", source: "types", target: "taskMastery" },
  { id: "e-types-drills", source: "types", target: "drills" },
  { id: "e-types-advanced", source: "types", target: "advanced" },
  { id: "e-types-practice", source: "types", target: "practice" },
  { id: "e-types-assessment", source: "types", target: "assessment" },
  { id: "e-types-resources", source: "types", target: "resources" },
  { id: "e-types-differentiation", source: "types", target: "differentiation" },
  // Lesson Sequence children
  { id: "e-lessonSeq-lesson0", source: "lessonSeq", target: "lesson0" },
  { id: "e-lessonSeq-lesson1", source: "lessonSeq", target: "lesson1" },
  { id: "e-lessonSeq-lesson2", source: "lessonSeq", target: "lesson2" },
  { id: "e-lessonSeq-lesson3", source: "lessonSeq", target: "lesson3" },
  { id: "e-lessonSeq-lesson4", source: "lessonSeq", target: "lesson4" },
  { id: "e-lessonSeq-lesson5", source: "lessonSeq", target: "lesson5" },
  { id: "e-lessonSeq-lesson6", source: "lessonSeq", target: "lesson6" },
  { id: "e-lessonSeq-lesson7", source: "lessonSeq", target: "lesson7" },
  { id: "e-lessonSeq-lesson8", source: "lessonSeq", target: "lesson8" },
];

// Color map for node backgrounds by category
const nodeBgColors = {
  root: '#e3f2fd',
  types: '#b2ebf2',
  lessonSeq: '#ede7f6',
  orientation: '#c8e6c9',
  foundations: '#c8e6c9',
  taskMastery: '#c8e6c9',
  drills: '#f8bbd0',
  advanced: '#d1c4e9',
  practice: '#ffe0b2',
  assessment: '#fff9c4',
  resources: '#b3e5fc',
  differentiation: '#f8bbd0',
  lesson0: '#c8e6c9',
  lesson1: '#f8bbd0',
  lesson2: '#d1c4e9',
  lesson3: '#ffe0b2',
  lesson4: '#ede7f6',
  lesson5: '#fff9c4',
  lesson6: '#b3e5fc',
  lesson7: '#f8bbd0',
  lesson8: '#c8e6c9',
};

const nodeBaseStyle = {
  border: '2px solid #90caf9',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 200,
  minHeight: 40,
  cursor: 'pointer',
};

// Map parentId -> [childIds]
const getChildMap = () => ({
  root: ['types', 'lessonSeq'],
  types: ['orientation', 'foundations', 'taskMastery', 'drills', 'advanced', 'practice', 'assessment', 'resources', 'differentiation'],
  lessonSeq: ['lesson0', 'lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7', 'lesson8'],
  orientation: [], foundations: [], taskMastery: [], drills: [], advanced: [], practice: [], assessment: [], resources: [], differentiation: [],
  lesson0: [], lesson1: [], lesson2: [], lesson3: [], lesson4: [], lesson5: [], lesson6: [], lesson7: [], lesson8: [],
});

// Info for leaf nodes
const nodeDetails = {
  orientation: {
    title: "A. Orientation",
  details: `Purpose & Format\n- Short Conversation = everyday, practical dialogue (e.g., booking, registration, enquiry)\n- Usually 2 speakers, 1–2 minutes\n- Question types: form/table completion, short answer, multiple choice\n\nWhat to Expect:\n- Context: Who? Where? Why?\n- Listen for names, numbers, dates, places\n- Accents: UK, AU, US, etc.\n\nTips:\n- Skim questions before audio\n- Underline keywords (name, date, address, price)\n- Predict answer type (number, name, place)\n- Listen for corrections ("No, sorry, that's..."), and speaker roles\n\nExample:\nYou will hear a conversation between a student and a librarian about joining the library.\n\nVisual:\n🗣️ Two people talking, notepad, calendar, phone`
  },
  foundations: {
    title: "B. Foundations",
  details: `Instructions & Prediction\n- Always read the instructions (e.g., "NO MORE THAN TWO WORDS AND/OR A NUMBER")\n- Predict what kind of answer is needed: number, name, date, place\n- Underline keywords in the question\n- Spot tricky spelling (names, addresses, numbers)\n\nTips:\n- Write answers in CAPITAL LETTERS for clarity\n- Double-check word limits\n- Practice spelling common names and places\n- Listen for paraphrases ("fee" = "cost", "book" = "reserve")\n\nExample:\nQ: What is the man's phone number?\nA: Listen for numbers, check for corrections.\n\nVisual:\n📝 Underlined prompt, highlighter, phone number`
  },
  taskMastery: {
    title: "C. Task Mastery",
  details: `Step-by-Step Approach\n1. Underline keywords in each question\n2. Predict possible answers (type, format)\n3. Listen for signpost words ("first", "then", "finally")\n4. Enter/check answers quickly\n5. Move on if you miss one—don't freeze\n\nTips:\n- Use process of elimination for multiple choice\n- Listen for time expressions, numbers, and corrections\n- Write short forms/abbreviations if needed\n- Check spelling and word limits\n\nExample:\nQ: What time will the meeting start?\nA: Listen for "at 3:30" or "half past three"\n\nVisual:\n⏰ Clock, checklist, pencil`
  },
  drills: {
    title: "D. Question Type Drills",
  details: `Types of Questions:\n- Form/table completion: Fill in blanks with names, numbers, dates\n- Short answer: 1–3 words, often factual\n- Multiple choice: Choose the best option\n- Matching: Link speakers to information\n\nTips:\n- Scan for format clues (e.g., table headers, answer length)\n- Practice with sample tables and forms\n- For MCQ, listen for distractors and corrections\n- For matching, track who says what\n\nExample:\nTable: Name | Phone | Date\nListen for each detail in order\n\nVisual:\n📋 Table, checkboxes, arrows`
  },
  advanced: {
    title: "E. Advanced Skills",
  details: `Advanced Tactics\n- Listen for self-corrections ("Sorry, I meant...")\n- Watch for distractors (info that sounds right but is corrected)\n- Numbers: Listen for "fourteen" vs "forty"\n- Accent strategies: Practice with UK, AU, US audio\n- Fast speech: Focus on keywords, not every word\n\nTips:\n- If you miss an answer, refocus immediately\n- Practice with fast and accented audio\n- Note common distractor patterns\n\nExample:\n"The address is 14, not 40."\n\nVisual:\n🎧 Headphones, exclamation mark, waveform`
  },
  practice: {
    title: "F. Interactive Practice",
  details: `Practice Tools and Strategies\n- Dictation trainer: Type what you hear, check spelling\n- Drag-to-form: Drag numbers or words into blank fields\n- Accent toggle: Practice with different accents\n- Repeat or loop snippet: Listen to tricky parts multiple times\n\nHow to Use:\n1. Start with slow audio, then increase speed\n2. Use dictation for spelling and numbers\n3. Try accent toggle for UK, US, and AU differences\n4. Drag-to-form for table practice\n5. Use repeat or loop for difficult phrases\n\nPro Tips:\n- Track your errors (spelling, numbers, missed info)\n- Focus on your weakest question type\n- Practice with a timer for exam conditions\n\nExample:\nPractice filling a form with name, phone, and date. Use accent toggle to hear the same info in UK and US English.\n\nVisual:\n🖱️ Drag-and-drop, headphones, timer, accent flag`
  },
  assessment: {
    title: "G. Assessment",
  details: `Assessment and Self-Evaluation\n- Mini-test blueprint: 10-question practice sets\n- Error taxonomy: Track errors by type (spelling, number, missed keyword, distractor)\n- Progress metrics: Record scores and error patterns\n\nHow to Use:\n1. Take a mini-test (10 questions, timed)\n2. Mark your answers and check with transcript\n3. Log errors by type (for example, missed number, spelling error)\n4. Review which question types you miss most\n5. Set a goal for next practice (for example, reduce spelling errors to 1)\n\nPro Tips:\n- Use a progress chart to visualize improvement\n- Focus on error patterns, not just score\n- Review your error log weekly\n\nExample:\nTest 1: 7 out of 10, 2 spelling errors, 1 missed distractor\nTest 2: 9 out of 10, 1 number error\n\nVisual:\n📈 Progress chart, error log, checklist`
  },
  resources: {
    title: "H. Resources",
  details: `Resources for Success\n- Transcripts and audio library: Review after practice\n- Cheat-sheet: Key words, spelling, number formats\n- Instructor notes: Tips and common pitfalls\n- Model answers: Compare with your own\n\nTips:\n- Review transcripts after each practice\n- Use cheat-sheets for quick revision\n- Compare your answers to model answers\n- Note new vocabulary and paraphrases\n\nVisual:\n📚 Transcript, cheat-sheet, lightbulb`
  },
  differentiation: {
    title: "I. Differentiation & Scaffolding",
  details: `Scaffolding for All Levels\n- Beginner: Use slowed audio, transcripts, repeat\n- Intermediate: Normal speed, no transcript\n- Advanced: Fast, accent variants, one-play only\n\nTips:\n- Start with slowed audio and transcripts\n- Gradually increase speed and reduce support\n- Challenge yourself with one-play only\n- Try different accents for variety\n\nVisual:\n🎚️ Speed slider, transcript icon, accent flags`
  },
  lesson0: {
    title: "Lesson 0: Orientation",
  details: `Lesson Focus\n- Explain Part 1 purpose and scoring\n- Show example layout\n- Play sample short dialogue (30 to 40 seconds)\n- Provide cheat-sheet of common contexts\n\nTips:\n- Familiarize yourself with the test format\n- Listen to sample audio and follow along with a blank form\n- Review scoring chart to set goals\n\nVisual:\n📝 Sample layout, scoring chart, headphones`
  },
  lesson1: {
    title: "Lesson 1: Predicting & Question Analysis",
  details: `Lesson Focus\n- Read instructions quickly\n- Underline keywords\n- Predict answer types (number, name, date, time, price)\n- Annotate prompts for clarity\n\nTips:\n- Practice prediction with sample prompts\n- Annotate for clarity and focus\n- Set a timer for quick analysis\n\nVisual:\n🔍 Annotated prompt, highlighter, timer`
  },
  lesson2: {
    title: "Lesson 2: Keyword Spotting & Paraphrase Recognition",
  details: `Lesson Focus\n- Paraphrase patterns (fee means cost, book means reserve)\n- Synonyms in audio\n- Audio snippets for mapping\n- Mapping drill (connect audio to prompt)\n\nTips:\n- Listen for synonyms and paraphrases\n- Map audio to prompt visually\n- Practice with short audio clips\n\nVisual:\n🔗 Synonym map, audio icon, arrows`
  },
  lesson3: {
    title: "Lesson 3: Numbers, Dates, Spelling & Format Rules",
  details: `Lesson Focus\n- Number conventions (phone, price, address)\n- Date formats (1 June versus June 1)\n- British spelling and hyphenation\n- Dictation and format checker\n\nTips:\n- Practice dictation for numbers and dates\n- Review spelling rules for common words\n- Use a format checker for practice\n\nVisual:\n#️⃣ Date format table, spelling checklist, dictation icon`
  },
  lesson4: {
    title: "Lesson 4: Form & Table Completion Tactics",
  details: `Lesson Focus\n- Reading headers\n- Pre-filling when possible\n- Keeping consistent format\n- Drag-to-form interactive practice\n- Immediate feedback\n- Mini-assessment (10 items)\n\nTips:\n- Scan headers before listening\n- Use drag-to-form for practice\n- Check format and spelling\n\nVisual:\n📑 Table with headers, drag-to-form, feedback`
  },
  lesson5: {
    title: "Lesson 5: Distractors & Self-correction Handling",
  details: `Lesson Focus\n- Corrections and self-correction in audio\n- Distractors (misleading information)\n- Audio clips for practice\n- Marking the correct version\n- Stop and decide practice\n\nTips:\n- Listen for corrections ("No, actually...")\n- Mark the final correct answer\n- Practice with distractor-rich audio\n\nVisual:\n⚠️ Correction mark, distractor icon, audio clip`
  },
  lesson6: {
    title: "Lesson 6: Accent & Reduced Forms Practice",
  details: `Lesson Focus\n- Accent differences (UK, US, AU)\n- Reduced speech (gonna, I'll)\n- Compare same dialogue in different accents\n- Accent drills\n\nTips:\n- Practice with different accents\n- Listen for reduced forms and contractions\n- Note differences in pronunciation\n\nVisual:\n🏳️‍🌈 Accent flags, waveform, ear`
  },
  lesson7: {
    title: "Lesson 7: Speed, Focus & Recovery",
  details: `Lesson Focus\n- Strategies after missing an answer\n- Scanning for next question\n- Full simulation practice\n- Reflective checklist\n\nTips:\n- Use scanning to find your place\n- Practice recovery after a miss\n- Use a checklist to review performance\n\nVisual:\n✅ Checklist, scan icon, stopwatch`
  },
  lesson8: {
    title: "Lesson 8: Integration & Mini-Test 1",
  details: `Lesson Focus\n- Take a mini-test (10 questions)\n- Submit answers for feedback\n- Analytic feedback on errors\n\nTips:\n- Take the mini-test under timed conditions\n- Review analytic feedback and error types\n- Set a goal for next test\n\nVisual:\n📝 Test sheet, feedback chart, trophy`
  },
};

// Collapsible node component
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle } = data;
  const childMap = getChildMap();
  const showToggle = childMap[id] && childMap[id].length > 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(props.style || {}) }} className={props.className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{data.label}</div>
      {showToggle && (
        <button
          style={{ marginLeft: 8, padding: '2px 10px', borderRadius: 6, border: '1px solid #1976d2', background: isExpanded ? '#e3f2fd' : '#fff', color: '#1976d2', cursor: 'pointer', fontSize: 14 }}
          onClick={e => { e.stopPropagation(); onToggle(id); }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
const nodeTypes = { collapsible: CollapsibleNode };



const ShortConversationMindmap = memo(() => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => {
    const ids = Object.keys(getChildMap());
    return Object.fromEntries(ids.map(id => [id, true]));
  });
  // Always declare childMap before any use
  const childMap = getChildMap();
  // Keep all nodes in state, only filter for visibility when rendering
  const [flowNodes, setFlowNodes] = useState(nodes);
  // childMap already declared above
  // Only show children of expanded nodes
  const visibleIds = new Set(['root']);
  function addVisible(id) {
    visibleIds.add(id);
    if (expanded[id] && childMap[id]) childMap[id].forEach(addVisible);
  }
  childMap.root.forEach(addVisible);
  Object.keys(childMap).forEach(id => { if (expanded[id]) (childMap[id]||[]).forEach(addVisible); });
  // Only pass visible nodes to React Flow
  const visibleNodes = flowNodes.filter(n => visibleIds.has(n.id));

  // Info modal state
  const [modal, setModal] = useState(null);
  // Only true parent nodes (with children) should not show modal
  const parentIds = Object.keys(childMap).filter(id => childMap[id].length > 0);
  const onNodeClick = useCallback((event, node) => {
    if (!parentIds.includes(node.id) && nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);

  // React Flow controlled nodes handler
  const onNodesChange = useCallback(
    (changes) => setFlowNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const Mindmap = (
    <div style={{ width: '100%', height: '900px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc', marginBottom: 32 }}>
      <ReactFlow
        nodes={visibleNodes.map(n => ({
          ...n,
          draggable: true,
          type: childMap[n.id] && childMap[n.id].length > 0 ? 'collapsible' : undefined,
          style: { ...nodeBaseStyle, background: nodeBgColors[n.id] || nodeBaseStyle.background },
          data: {
            ...n.data,
            isExpanded: childMap[n.id] && childMap[n.id].length > 0 ? expanded[n.id] : undefined,
            onToggle: childMap[n.id] && childMap[n.id].length > 0 ? (id) => setExpanded(e => ({ ...e, [id]: !e[id] })) : undefined,
          },
        }))}
        edges={edges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target))}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={false}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      {Mindmap}
      {modal && (
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', height: 'auto', background: 'rgba(255,255,255,0.98)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', boxShadow: '0 -4px 32px #0003', padding: 0 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0004', padding: 28, minWidth: '700px', maxWidth: '1100px', width: '60vw', height: 'auto', minHeight: 260, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 32, position: 'relative', animation: 'fadeInUp .4s cubic-bezier(.4,0,.2,1)' }}>
            {/* Info on the right, horizontal layout, 2 columns */}
            <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', wordBreak: 'break-word', height: '100%' }}>
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600 }}>{nodeDetails[modal].title}</div>
                <button
                  onClick={() => setModal(null)}
                  style={{ background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0002', zIndex: 10 }}
                >
                  Close
                </button>
              </div>
              <div style={{ fontSize: 17, color: '#333', marginTop: 0, whiteSpace: 'pre-wrap', columnCount: 2, columnGap: 40, maxHeight: '480px', overflowY: 'auto', width: '100%' }}>{nodeDetails[modal].details}</div>
            </div>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,40,60,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0006', position: 'relative', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setDetached(false)}
              style={{ position: 'absolute', top: 16, right: 24, zIndex: 10, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0002' }}
            >
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>
              {Mindmap}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default ShortConversationMindmap;
