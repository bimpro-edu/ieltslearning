import React, { memo, useState, useCallback } from "react";
import ReactFlow, { Background, Controls, Handle, Position, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";

// Node definitions for Part 3: Monologue/Map/Plan/Diagram
const nodes = [
  { id: "root", data: { label: "Monologue / Map / Plan / Diagram" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "orientation", data: { label: "1. Orientation" }, position: { x: -220, y: 120 }, draggable: true },
  { id: "foundations", data: { label: "2. Foundations" }, position: { x: 0, y: 120 }, draggable: true },
  { id: "taskMastery", data: { label: "3. Task Mastery" }, position: { x: 220, y: 120 }, draggable: true },
  { id: "advanced", data: { label: "4. Advanced Listening Skills" }, position: { x: -110, y: 260 }, draggable: true },
  { id: "practice", data: { label: "5. Practice & Assessment" }, position: { x: 110, y: 260 }, draggable: true },
  // Orientation sub-nodes
  { id: "orientation_contexts", data: { label: "Contexts" }, position: { x: -340, y: 220 }, draggable: true },
  { id: "orientation_questionTypes", data: { label: "Question Types" }, position: { x: -220, y: 220 }, draggable: true },
  // Foundations sub-nodes
  { id: "foundations_prediction", data: { label: "Prediction" }, position: { x: -60, y: 220 }, draggable: true },
  { id: "foundations_contextMarkers", data: { label: "Context Markers" }, position: { x: 60, y: 220 }, draggable: true },
  // Task Mastery sub-nodes
  { id: "taskMastery_map", data: { label: "Map/Plan/Diagram" }, position: { x: 120, y: 220 }, draggable: true },
  { id: "taskMastery_matching", data: { label: "Matching" }, position: { x: 220, y: 220 }, draggable: true },
  { id: "taskMastery_completion", data: { label: "Completion" }, position: { x: 320, y: 220 }, draggable: true },
  { id: "taskMastery_mcq", data: { label: "MCQ" }, position: { x: 420, y: 220 }, draggable: true },
  // Advanced sub-nodes
  { id: "advanced_cognitive", data: { label: "Cognitive Tracking" }, position: { x: -210, y: 340 }, draggable: true },
  { id: "advanced_accent", data: { label: "Accent Awareness" }, position: { x: -110, y: 340 }, draggable: true },
  { id: "advanced_memory", data: { label: "Memory Strategies" }, position: { x: -10, y: 340 }, draggable: true },
  { id: "advanced_distraction", data: { label: "Distraction Resistance" }, position: { x: 90, y: 340 }, draggable: true },
  // Practice sub-nodes
  { id: "practice_drills", data: { label: "Targeted Drills" }, position: { x: 10, y: 340 }, draggable: true },
  { id: "practice_tests", data: { label: "Mini-Tests" }, position: { x: 110, y: 340 }, draggable: true },
  { id: "practice_bands", data: { label: "Band Comparisons" }, position: { x: 210, y: 340 }, draggable: true },
  { id: "practice_selfeval", data: { label: "Self-Evaluation" }, position: { x: 310, y: 340 }, draggable: true },
];

const edges = [
  { id: "e-root-orientation", source: "root", target: "orientation" },
  { id: "e-root-foundations", source: "root", target: "foundations" },
  { id: "e-root-taskMastery", source: "root", target: "taskMastery" },
  { id: "e-root-advanced", source: "root", target: "advanced" },
  { id: "e-root-practice", source: "root", target: "practice" },
  // Orientation sub-edges
  { id: "e-orientation-contexts", source: "orientation", target: "orientation_contexts" },
  { id: "e-orientation-questionTypes", source: "orientation", target: "orientation_questionTypes" },
  // Foundations sub-edges
  { id: "e-foundations-prediction", source: "foundations", target: "foundations_prediction" },
  { id: "e-foundations-contextMarkers", source: "foundations", target: "foundations_contextMarkers" },
  // Task Mastery sub-edges
  { id: "e-taskMastery-map", source: "taskMastery", target: "taskMastery_map" },
  { id: "e-taskMastery-matching", source: "taskMastery", target: "taskMastery_matching" },
  { id: "e-taskMastery-completion", source: "taskMastery", target: "taskMastery_completion" },
  { id: "e-taskMastery-mcq", source: "taskMastery", target: "taskMastery_mcq" },
  // Advanced sub-edges
  { id: "e-advanced-cognitive", source: "advanced", target: "advanced_cognitive" },
  { id: "e-advanced-accent", source: "advanced", target: "advanced_accent" },
  { id: "e-advanced-memory", source: "advanced", target: "advanced_memory" },
  { id: "e-advanced-distraction", source: "advanced", target: "advanced_distraction" },
  // Practice sub-edges
  { id: "e-practice-drills", source: "practice", target: "practice_drills" },
  { id: "e-practice-tests", source: "practice", target: "practice_tests" },
  { id: "e-practice-bands", source: "practice", target: "practice_bands" },
  { id: "e-practice-selfeval", source: "practice", target: "practice_selfeval" },
];

const nodeBgColors = {
  root: '#e3f2fd',
  orientation: '#b2ebf2',
  foundations: '#ede7f6',
  taskMastery: '#c8e6c9',
  advanced: '#f8bbd0',
  practice: '#ffe0b2',
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

const getChildMap = () => ({
  root: ['orientation', 'foundations', 'taskMastery', 'advanced', 'practice'],
  orientation: ['orientation_contexts', 'orientation_questionTypes'],
  foundations: ['foundations_prediction', 'foundations_contextMarkers'],
  taskMastery: ['taskMastery_map', 'taskMastery_matching', 'taskMastery_completion', 'taskMastery_mcq'],
  advanced: ['advanced_cognitive', 'advanced_accent', 'advanced_memory', 'advanced_distraction'],
  practice: ['practice_drills', 'practice_tests', 'practice_bands', 'practice_selfeval'],
  orientation_contexts: [],
  orientation_questionTypes: [],
  foundations_prediction: [],
  foundations_contextMarkers: [],
  taskMastery_map: [],
  taskMastery_matching: [],
  taskMastery_completion: [],
  taskMastery_mcq: [],
  advanced_cognitive: [],
  advanced_accent: [],
  advanced_memory: [],
  advanced_distraction: [],
  practice_drills: [],
  practice_tests: [],
  practice_bands: [],
  practice_selfeval: [],
});

const nodeDetails = {
  orientation_contexts: {
    title: "Contexts",
    details: "What to expect:\n- Guided tours\n- Public announcements\n- Academic talks\n- Service information\n\nTips:\n- Listen for the speaker’s role and setting (museum, campus, city, workplace)\n- Predict the context from question prompts\n\nExample:\nA museum guide describing the layout and rules.\n\nVisual: Map, speaker, audience, exhibit signs\n\nStrategy:\n- Before listening, guess the context\n- Practice: Listen to short clips and identify the context in 10 seconds."
  },
  orientation_questionTypes: {
    title: "Question Types",
    details: "Types you may face:\n- Map/plan/diagram labeling\n- Matching\n- Multiple choice\n- Note/sentence completion\n\nTips:\n- Skim all questions before audio\n- Underline keywords\n- Predict answer type (place, number, name, direction)\n\nExample:\nLabeling a campus map with building names.\n\nVisual: Map with labels, checkboxes, arrows\n\nStrategy:\n- For maps, find the starting point\n- For matching, listen for paraphrases\n- Practice: Try sample questions for each type."
  },
  foundations_prediction: {
    title: "Prediction",
    details: "How to predict:\n- Read all questions and options before audio\n- Look for clues: numbers, places, directions, time\n\nTips:\n- Predict what kind of word or number will fill each blank\n- Write your predictions in the margin\n\nExample:\nPrompt: 'The main entrance is on the ___' (expect a direction)\n\nVisual: Magnifying glass, question mark, compass\n\nPractice:\n- Pause sample audios and predict the next answer before listening."
  },
  foundations_contextMarkers: {
    title: "Context Markers",
    details: "Key phrases to listen for:\n- 'First, let's move to...'\n- 'Now, I’d like to talk about...'\n- 'Next, we’ll visit...'\n\nTips:\n- These signal a change in topic or sequence\n- Note down every time you hear a context marker\n\nExample:\nSpeaker moves from one room to another\n\nVisual: Arrow, signpost, room icons\n\nPractice:\n- Listen to monologues and highlight all context markers you hear."
  },
  taskMastery_map: {
    title: "Map/Plan/Diagram",
    details: "How to approach:\n- Use orientation clues (north, south, left, right)\n- Track reference points (entrance, landmarks, stairs)\n- Trace the route with your finger as you listen\n\nExample:\nDirections on a campus map from entrance to library\n\nVisual: Compass, map, entrance icon, path arrows\n\nStrategy:\n- Mark all reference points before audio\n- Practice: Draw your own map and have someone give you directions to label it."
  },
  taskMastery_matching: {
    title: "Matching",
    details: "What to do:\n- Listen for descriptive phrases and paraphrases\n- Watch for distractors (info that sounds right but isn’t)\n- Eliminate options as you hear them\n\nExample:\nMatching speakers to locations in a tour\n\nVisual: List, arrows, people icons, colored lines\n\nPractice:\n- Listen to audio and match items in real time, then check your answers."
  },
  taskMastery_completion: {
    title: "Completion",
    details: "How to succeed:\n- Predict grammar form (noun, verb, number) before listening\n- Focus on content words, ignore filler words\n- Write short forms or abbreviations as you listen\n\nExample:\nCompleting a note with a missing date or name\n\nVisual: Blank form, pencil, calendar\n\nPractice:\n- Fill in the blanks on sample forms while listening to audio."
  },
  taskMastery_mcq: {
    title: "MCQ",
    details: "How to handle MCQs:\n- Eliminate obviously wrong answers as you listen\n- Pay attention to qualifiers ('only', 'mainly', 'especially')\n- Mark all options as you listen, then select the best one at the end\n\nExample:\nChoosing the main reason for a talk from three options\n\nVisual: Multiple choice bubbles, checkmarks\n\nPractice:\n- Listen to short talks and answer MCQs, then review the transcript."
  },
  advanced_cognitive: {
    title: "Cognitive Tracking",
    details: "What it means:\n- Following long stretches of speech without losing focus\n\nTips:\n- Practice with longer audio clips\n- Take notes on main points\n- Break audio into sections and summarize each\n\nExample:\nListen to a 3-minute monologue and summarize it\n\nVisual: Brain, timer, notepad\n\nPractice:\n- Listen to TED talks or podcasts and write a summary after."
  },
  advanced_accent: {
    title: "Accent Awareness",
    details: "How to build accent awareness:\n- Practice with British, Australian, and other English accents\n- Note differences in pronunciation, stress, intonation\n- Make a list of common accent differences\n\nExample:\n'Car park' (UK) vs 'parking lot' (US)\n\nVisual: Flag icons, ear, sound waves\n\nPractice:\n- Use online resources to listen to different accents and repeat phrases aloud."
  },
  advanced_memory: {
    title: "Memory Strategies",
    details: "How to remember details:\n- Chunk information into small units\n- Repeat key details to yourself\n- Use visualization (draw a quick sketch or diagram)\n\nExample:\nRemembering a list of places in order\n\nVisual: List, memory icon, arrows\n\nPractice:\n- Listen to a list and recall it in order after the audio ends."
  },
  advanced_distraction: {
    title: "Distraction Resistance",
    details: "How to resist distractions:\n- Ignore self-corrections and extra details\n- Refocus quickly if you miss something\n- Don’t dwell on mistakes\n\nExample:\nSpeaker says 'left' then corrects to 'right'\n\nVisual: Exclamation mark, arrow, cross-out\n\nPractice:\n- Practice with audio that includes corrections and distractions\n- If you miss an answer, move on and return later if possible."
  },
  practice_drills: {
    title: "Targeted Drills",
    details: "How to drill effectively:\n- Focus on one skill at a time (map reading, following directions, main ideas)\n- Use real-life audio (museum tours, campus guides)\n- Set a timer and complete as many drills as possible in 10 minutes\n\nExample:\nListening to a museum guide and labeling a map\n\nVisual: Headphones, checklist, map\n\nPractice:\n- Alternate between different drill types to build all skills."
  },
  practice_tests: {
    title: "Mini-Tests",
    details: "How to use mini-tests:\n- Take short, timed tests with increasing difficulty\n- Review your answers and the transcript to find errors\n- Track your score and error types after each test\n\nExample:\n10-question monologue test with a 10-minute limit\n\nVisual: Test sheet, clock, red pen\n\nPractice:\n- Repeat tests and aim to reduce errors each time."
  },
  practice_bands: {
    title: "Band Comparisons",
    details: "How to use band comparisons:\n- Compare your performance to IELTS band descriptors\n- Set a target band and focus on the skills needed to reach it\n\nExample:\nBand 5: misses spatial relations and details\nBand 7: follows main flow but misses some distractors\nBand 9: nearly perfect\n\nVisual: Score chart, arrow up, band scale\n\nPractice:\n- Review band descriptors after each test."
  },
  practice_selfeval: {
    title: "Self-Evaluation",
    details: "How to self-evaluate:\n- Use a checklist after each practice session\n- Log errors by type (spelling, missed info, distractors)\n- Set specific goals for next time\n- Review your error log weekly and adjust your practice plan\n\nExample:\nDid I use map clues? Did I get distracted?\n\nVisual: Checklist, pencil, progress chart\n\nPractice:\n- Share your self-evaluation with a teacher or study partner for feedback."
  },
  orientation: {
    title: "1. Orientation",
    details: `Purpose: Tests ability to follow a single speaker giving information in a semi-formal or academic setting.\n\nCommon contexts:\n- Guided tours\n- Public announcements\n- Speeches (school, university, workplace)\n- Local services information\n\nTypical question types:\n- Map/Plan/Diagram labeling\n- Matching\n- Multiple Choice Questions (MCQs)\n- Sentence/Note completion`
  },
  foundations: {
    title: "2. Foundations",
    details: `Predictive Listening:\n- Read questions ahead of time to anticipate order.\n- Identify spatial/organizational keywords (\"on the left\", \"next to\", \"after that\").\n\nUnderstanding context markers:\n- \"First, let’s move to…\" (ordering clues)\n- \"Now, I’d like to talk about…\" (topic shift signals)\n\nCore listening skills:\n- Recognizing linking words in monologues\n- Identifying synonyms and paraphrases for directions & descriptions\n- Noticing stress/intonation for emphasis`
  },
  taskMastery: {
    title: "3. Task Mastery",
    details: `Strategies by question type:\n\nMap/Plan/Diagram Labeling\n- Use orientation clues (north, south, left, right).\n- Track reference points (entrance, landmarks).\n\nMatching\n- Listen for descriptive phrases that correspond to options.\n- Be aware of distractors with partially correct info.\n\nNote/Sentence Completion\n- Predict grammar form before listening.\n- Focus on key content words (nouns, verbs, adjectives).\n\nMCQs\n- Eliminate wrong answers by listening for corrections/contradictions.\n- Pay attention to qualifiers (\"only\", \"mainly\", \"especially\").\n\nStep-by-Step Monologue Handling:\n- Skim questions quickly (time is given before audio).\n- Identify sequence or spatial flow (map/plan).\n- Keep eyes moving with the audio — do not pause too long on one question.\n- Write short forms/abbreviations while listening.\n- Transfer and check spelling in final 10 minutes.`
  },
  advanced: {
    title: "4. Advanced Listening Skills",
    details: `Cognitive tracking: Training your brain to follow longer stretches of speech without losing focus.\n\nAccent awareness: British/Australian English is often used in this part — practice unfamiliar accents.\n\nMemory strategies: Chunking information (breaking long phrases into manageable units).\n\nDistraction resistance: Speakers may self-correct (\"… actually, it’s not on the left, it’s opposite the entrance\").`
  },
  practice: {
    title: "5. Practice & Assessment",
    details: `Targeted Drills:\n- Plan/Map listening exercises (campus tour, museum guide).\n- Real-life audio (YouTube tours, podcasts).\n\nMini-Tests:\n- 2–3 monologue-based tests with increasing difficulty.\n\nBand 5 → 9 Comparisons:\nBand 5: Missing many spatial relations, losing focus mid-speech.\nBand 7: Following main flow but occasional misses in distractors.\nBand 9: Near-perfect accuracy, even with corrections/accents.\n\nSelf-Evaluation Checklist:\n- Did I anticipate the structure before listening?\n- Did I use map orientation clues effectively?\n- Did I avoid being misled by corrections or extra details?`
  },
};

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

const MonologueMindmap = memo(() => {

  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => {
    const ids = Object.keys(getChildMap());
    return Object.fromEntries(ids.map(id => [id, true]));
  });
  // Always keep all nodes in state
  const [flowNodes, setFlowNodes] = useState(nodes);
  const childMap = getChildMap();
  // Compute visible node ids for rendering only
  const visibleIds = new Set(['root']);
  function addVisible(id) {
    visibleIds.add(id);
    if (expanded[id] && childMap[id]) childMap[id].forEach(addVisible);
  }
  addVisible('root');

  const [modal, setModal] = useState(null);
  const parentIds = Object.keys(childMap).filter(id => childMap[id].length > 0);
  const onNodeClick = useCallback((event, node) => {
    if (nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);

  const onNodesChange = useCallback(
    (changes) => setFlowNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const Mindmap = (
    <div style={{ width: '100%', height: '700px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc', marginBottom: 32 }}>
      <ReactFlow
        nodes={flowNodes.map(n => ({
          ...n,
          hidden: !visibleIds.has(n.id),
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
              <div style={{
                fontSize: 17,
                color: '#333',
                marginTop: 0,
                whiteSpace: 'pre-wrap',
                width: '100%',
                columnCount: 2,
                columnGap: 40,
                transition: 'opacity 0.25s cubic-bezier(.4,0,.2,1)',
                opacity: 1
              }}>{nodeDetails[modal].details}</div>
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

export default MonologueMindmap;
