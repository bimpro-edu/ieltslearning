
import React, { memo, useState, useCallback } from "react";

const HeadphonesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3z"></path></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-5 11.9l.3.6-.3 1.5h10.6l-.3-1.5.3-.6A7 7 0 0 0 12 2z"></path></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>;

// Utility to strip markdown formatting from a string
function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#+\s?(.*)/gm, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\!\[(.*?)\]\((.*?)\)/g, '')
    .replace(/^- /gm, '\u2022 ')
    .trim();
}

// Info for leaf nodes (tips, examples, explanations)
const nodeDetails = {
  practice: {
    title: "Practice & Mini Tests",
    details: `Regular practice is key to improving your IELTS Listening score. Mini tests help you focus on specific skills and question types.\n\n**How to use:**\n- Take short practice tests for each section\n- Focus on one question type at a time (e.g., multiple choice, matching)\n- Time yourself to simulate exam conditions\n- Review mistakes and note patterns\n\n**Pro Tips:**\n- Use official IELTS practice materials\n- Practice with different accents\n- Track your progress over time\n\n**Example:**\nTake a 10-question mini test on map labeling. Review which questions you missed and why.\n\n**Visual:**\n📝 Practice sheet, clock, headphones`,
    icon: HeadphonesIcon,
    bg: '#f8bbd0',
  },
  mockTests: {
    title: "Full Mock Tests & Assessment",
    details: `Full mock tests simulate the real IELTS Listening exam and help you assess your readiness.\n\n**How to use:**\n- Take a complete listening test (4 sections, 40 questions)\n- Use a timer and answer sheet\n- Transfer answers and check for errors\n- Calculate your raw score and band\n\n**Pro Tips:**\n- Take mock tests regularly before your exam\n- Analyze your mistakes (spelling, word limits, missing keywords)\n- Use band conversion charts to track progress\n\n**Example:**\nComplete a full test, score 32/40 (Band 7.5). Review errors and focus next practice on weak areas.\n\n**Visual:**\n📊 Score chart, answer sheet, timer`,
    icon: LightbulbIcon,
    bg: '#d1c4e9',
  },
  examFormat: {
    title: "Exam Format Overview",
    details: `The IELTS Listening test has 4 sections, about 30 minutes, and 40 questions.\n\n**Sections:**\n1. Social conversation\n2. Social monologue\n3. Academic conversation\n4. Academic monologue\n\n**Question types:**\n- Multiple choice\n- Matching\n- Map/diagram labeling\n- Form/note/table/flow-chart completion\n- Sentence completion\n\n**Timing:**\n- 30 minutes listening\n- 10 minutes to transfer answers (paper-based)\n\n**Example:**\nYou may hear: "Now turn to Section 2..."\n\n**Tips:**\n- Skim questions before listening\n- Predict possible answers\n- Underline keywords\n- Listen for synonyms\n- Check word limits\n\n**Visual:**\n🎧 Headphones, answer sheet, clock`,
    icon: HeadphonesIcon,
    bg: '#b2ebf2',
  },
  criteria: {
    title: "Listening Criteria",
    details: `Examiners focus on:\n- Accuracy (correct answers)\n- Spelling\n- Following instructions (e.g., word limits)\n- Understanding main ideas and details\n\n**Example:**\nIf the answer is "library" but you write "the library" or misspell it, it's wrong.\n\n**Tips:**\n- Always check spelling and answer format\n- Write answers in CAPITAL LETTERS for clarity\n- Don't leave blanks; guess if unsure\n\n**Visual:**\n💡 Lightbulb, checklist`,
    icon: LightbulbIcon,
    bg: '#fff9c4',
  },
  pitfalls: {
    title: "Common Pitfalls",
    details: `- Losing focus after missing one answer\n- Spelling mistakes\n- Writing more than allowed words\n- Not predicting answers\n- Not checking transferred answers\n\n**Example:**\nQ: Write NO MORE THAN TWO WORDS.\nA: "a beautiful garden" (WRONG, 3 words)\n\n**Tips:**\n- If you miss an answer, move on quickly\n- Double-check word limits\n- Review spelling\n- Use prediction strategies\n\n**Visual:**\n⚠️ Warning sign, exclamation mark`,
    icon: WarningIcon,
    bg: '#ffe0b2',
  },
  tracker: {
    title: "Progress Tracker",
    details: `Track your raw scores and band progression after each mock test.\n\n**How to use:**\n- After each test, record your score (e.g., 28/40)\n- Use a band conversion chart\n- Log errors by type (spelling, not predicting, missing synonyms, accent confusion)\n\n**Example:**\nTest 1: 26/40 (Band 6.5), 4 spelling errors\nTest 2: 30/40 (Band 7), 2 prediction errors\n\n**Tips:**\n- Review your error log weekly to spot patterns\n- Focus practice on your weak areas\n\n**Visual:**\n📈 Chart, notebook, pencil`,
    icon: LightbulbIcon,
    bg: '#b3e5fc',
  },
  activeListening: {
    title: "Active Listening Foundations",
    details: `Active listening is the foundation for success in IELTS Listening. It means focusing fully on the audio, anticipating what comes next, and using context clues to predict answers.\n\n**Key Strategies:**\n- Listen for signpost words (first, next, finally, however, for example)\n- Pay attention to tone, emphasis, and pauses\n- Practice with a variety of accents (UK, US, AU, CA)\n- Take notes on keywords, numbers, and names\n- Predict what information might come next\n\n**Practical Tips:**\n- Before audio starts, scan questions and underline keywords\n- During listening, jot down possible answers quickly\n- If you miss something, refocus and listen for the next clue\n\n**Example:**\nIf the speaker says, 'Let's move on to the next topic,' be ready for a new set of questions.\nIf you hear a change in tone, expect a shift in information.`,
    icon: HeadphonesIcon,
    bg: '#c8e6c9',
  },
  questionTypes: {
    title: "Focus by Question Types",
    details: `Each IELTS Listening section uses different question types. Recognizing them helps you listen for the right information.\n\n**Common Types:**\n- Multiple choice: Listen for specific details and eliminate wrong options\n- Matching: Track speakers and features, listen for synonyms\n- Map/plan labeling: Visualize locations, listen for directions\n- Form/note/table completion: Listen for facts, numbers, and names\n- Sentence completion: Focus on grammar and word limits\n\n**Advanced Tips:**\n- Skim all questions before audio starts\n- Predict possible answers and their format\n- Underline keywords and look for paraphrases\n- Listen for distractors (words that sound correct but aren't)\n\n**Example:**\nFor matching, note speaker names and features as you listen. For map labeling, sketch the map and mark locations as you hear them.`,
    icon: LightbulbIcon,
    bg: '#c8e6c9',
  },
  sectionPractice: {
    title: "Section-by-Section Practice",
    details: `Practice each section of the IELTS Listening test separately to master its unique challenges.\n\n**Section 1:** Everyday conversations (focus on basic info, numbers, dates)\n**Section 2:** Monologues (e.g., a tour guide; listen for sequence and details)\n**Section 3:** Academic discussions (track multiple speakers, opinions, and arguments)\n**Section 4:** Lectures (note main ideas, supporting details, and academic vocabulary)\n\n**Pro Tips:**\n- Note the context and speakers before each section\n- Listen for specific information and changes in topic\n- Practice with real test recordings and time yourself\n- Review mistakes and learn from them\n\n**Example:**\nIn Section 3, use initials to track who says what. In Section 4, outline the lecture structure as you listen.`,
    icon: WarningIcon,
    bg: '#c8e6c9',
  },
  strategies: {
    title: "Listening Strategies (Higher Band)",
    details: `To achieve a higher band score, you need to combine advanced strategies with consistent practice.

**Advanced Strategies:**
- **Predictive Listening:** Before the audio starts, don't just read the questions—try to predict the context, the speakers, and even the possible answers. Underline keywords to focus your listening.
- **Recognize Signposting Language:** Listen for words and phrases that guide you through the audio, such as "firstly," "however," "in addition," or "to sum up." These signal transitions, contrasts, and conclusions.
- **Identify Distractors:** Test makers often include "distractors"—information that seems correct but is actually wrong. Be wary of answers that are immediately corrected or modified (e.g., "I was going to... but then I decided...").
- **Paraphrase Recognition:** High-level questions rarely use the exact words from the audio. You must be able to recognize synonyms and paraphrased ideas quickly.
- **Note-Taking Skills:** Develop a personal shorthand for taking notes. Focus on capturing key concepts, names, and numbers without trying to write full sentences.

**Pro Tips:**
- If you miss an answer, let it go immediately and refocus on the next question.
- Use the short breaks between sections to prepare for the upcoming questions, not to check previous answers.
- Practice with a wide range of accents (British, Australian, American, etc.) to improve your adaptability.

**Visual:**
💡 Advanced techniques, brain, target`,
    icon: LightbulbIcon,
    bg: '#ede7f6',
  },
};
import ReactFlow, { Background, Controls, Handle, Position, useNodesState, useEdgesState } from "reactflow";
// Collapsible node component for parent nodes
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle } = data;
  // Only show toggle button for nodes with children
  const childMapLocal = getChildMap();
  const showToggle = childMapLocal[id] && childMapLocal[id].length > 0;
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
import "reactflow/dist/style.css";



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

// Color map for node backgrounds by category
const nodeBgColors = {
  orientation: '#e3f2fd', // blue
  examFormat: '#b2ebf2', // cyan
  criteria: '#fff9c4', // yellow
  pitfalls: '#ffe0b2', // orange
  coreSkills: '#c8e6c9', // green
  activeListening: '#c8e6c9',
  questionTypes: '#c8e6c9',
  sectionPractice: '#c8e6c9',
  strategies: '#ede7f6', // purple
  practice: '#f8bbd0', // pink
  mockTests: '#d1c4e9', // lavender
  assessment: '#f8bbd0', // pink
  tracker: '#b3e5fc', // light blue
};

const baseNodes = [
  // Orientation
  { id: "orientation", data: { label: "Orientation (Listening)" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "examFormat", data: { label: "Exam Format Overview" }, position: { x: -220, y: 100 }, draggable: true },
  { id: "criteria", data: { label: "Listening Criteria" }, position: { x: 0, y: 100 }, draggable: true },
  { id: "pitfalls", data: { label: "Common Pitfalls" }, position: { x: 220, y: 100 }, draggable: true },
  // Core Skills
  { id: "coreSkills", type: "collapsible", data: { label: "Core Listening Skills" }, position: { x: 0, y: 220 }, draggable: true },
  { id: "activeListening", type: "collapsible", data: { label: "A. Active Listening Foundations" }, position: { x: -220, y: 320 }, draggable: true },
  { id: "questionTypes", type: "collapsible", data: { label: "B. Focus by Question Types" }, position: { x: 0, y: 320 }, draggable: true },
  { id: "sectionPractice", type: "collapsible", data: { label: "C. Section-by-Section Practice" }, position: { x: 220, y: 320 }, draggable: true },
  // Strategies
  { id: "strategies", type: "collapsible", data: { label: "Listening Strategies (Higher Band)" }, position: { x: 0, y: 440 }, draggable: true },
  // Practice & Mini Tests
  { id: "practice", type: "collapsible", data: { label: "Practice & Mini Tests" }, position: { x: -220, y: 540 }, draggable: true },
  // Mock Tests & Assessment
  { id: "mockTests", type: "collapsible", data: { label: "Full Mock Tests & Assessment" }, position: { x: 220, y: 540 }, draggable: true },
  { id: "tracker", data: { label: "Progress Tracker" }, position: { x: 0, y: 640 }, draggable: true },
];

const initialEdges = [
  { id: "e-orientation-examFormat", source: "orientation", target: "examFormat" },
  { id: "e-orientation-criteria", source: "orientation", target: "criteria" },
  { id: "e-orientation-pitfalls", source: "orientation", target: "pitfalls" },
  { id: "e-orientation-coreSkills", source: "orientation", target: "coreSkills" },
  { id: "e-coreSkills-activeListening", source: "coreSkills", target: "activeListening" },
  { id: "e-coreSkills-questionTypes", source: "coreSkills", target: "questionTypes" },
  { id: "e-coreSkills-sectionPractice", source: "coreSkills", target: "sectionPractice" },
  { id: "e-orientation-strategies", source: "orientation", target: "strategies" },
  { id: "e-orientation-practice", source: "orientation", target: "practice" },
  { id: "e-orientation-mockTests", source: "orientation", target: "mockTests" },
  { id: "e-orientation-tracker", source: "orientation", target: "tracker" },
];



// Collapsible node logic
const COLLAPSIBLE_IDS = [
  "coreSkills", "activeListening", "questionTypes", "sectionPractice", "strategies", "practice", "mockTests"
];

const getChildMap = () => {
  // Map parentId -> [childIds]
    return {
      orientation: ["examFormat", "criteria", "pitfalls", "coreSkills", "strategies", "practice", "mockTests", "tracker"],
      coreSkills: ["activeListening", "questionTypes", "sectionPractice"],
      strategies: [],
      practice: [],
      mockTests: [],
      // Only 'coreSkills' and 'strategies' are parents; 'practice' and 'mockTests' are leaf nodes
    };
};

const ListeningSkillMindmap = () => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));

  // Hide children of collapsed nodes
  const childMapMain = getChildMap();
  const visibleIds = new Set(["orientation"]);
  function addVisible(id) {
    visibleIds.add(id);
    if (expanded[id] && childMapMain[id]) childMapMain[id].forEach(addVisible);
  }
  childMapMain.orientation.forEach(addVisible);
  COLLAPSIBLE_IDS.forEach(id => { if (expanded[id]) (childMapMain[id]||[]).forEach(addVisible); });

  // Use React Flow's state hooks for nodes/edges
  const [nodes, setNodes, onNodesChange] = useNodesState(
    baseNodes
      .filter(n => visibleIds.has(n.id))
      .map(n => {
        const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
        return {
          ...n,
          type: hasChildren ? "collapsible" : undefined,
          data: {
            ...n.data,
            isExpanded: hasChildren ? expanded[n.id] : undefined,
            onToggle: hasChildren ? (id) => setExpanded(e => ({ ...e, [id]: !e[id] })) : undefined,
          },
        };
      })
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target))
  );

  // Update nodes/edges when expanded/collapsed
  React.useEffect(() => {
    setNodes(
      baseNodes
        .filter(n => visibleIds.has(n.id))
        .map(n => ({
          ...n,
          type: COLLAPSIBLE_IDS.includes(n.id) ? "collapsible" : undefined,
          data: {
            ...n.data,
            isExpanded: expanded[n.id],
            onToggle: (id) => setExpanded(e => ({ ...e, [id]: !e[id] })),
          },
        }))
    );
    setEdges(
      initialEdges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target))
    );
  }, [expanded]);


  // Info modal state

  const [modal, setModal] = useState(null);
  // Custom node click handler to open info modal for leaf nodes
  // Only true parent nodes (with children) should not show modal
  const parentIds = Object.keys(childMapMain).filter(id => childMapMain[id].length > 0);
  const onNodeClick = useCallback((event, node) => {
    if (!parentIds.includes(node.id) && nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);


  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes.map(n => ({
          ...n,
          style: {
            ...nodeBaseStyle,
            background: nodeBgColors[n.id] || nodeBaseStyle.background,
          },
        }))}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
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
            {/* Visual on the left */}
            <div style={{ flex: '0 0 120px', maxWidth: 120, minWidth: 120, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {nodeDetails[modal].icon ? (
                <div style={{ width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: nodeDetails[modal].bg || '#e3f2fd', borderRadius: 12 }}>
                  {React.createElement(nodeDetails[modal].icon)}
                </div>
              ) : null}
            </div>
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
              <div style={{ fontSize: 17, color: '#333', marginTop: 0, whiteSpace: 'pre-wrap', columnCount: 2, columnGap: 40, maxHeight: '480px', overflowY: 'auto', width: '100%' }}>{stripMarkdown(removeVisual(nodeDetails[modal].details))}</div>

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
};


// Utility to remove 'Visual:' and everything after from a string
function removeVisual(text) {
  if (!text) return '';
  return text.replace(/\n?Visual:([\s\S]*)$/i, '').trim();
}

export default memo(ListeningSkillMindmap);
