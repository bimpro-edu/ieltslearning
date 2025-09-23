import React, { useState, useCallback, useEffect, memo } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const BookIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="20" height="40" rx="4" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <rect x="36" y="12" width="20" height="40" rx="4" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
    <path d="M28 16H12M28 24H12M28 32H12M28 40H12" stroke="#1976d2" strokeWidth="2"/>
    <path d="M52 16H40M52 24H40M52 32H40M52 40H40" stroke="#1976d2" strokeWidth="2"/>
  </svg>
);
const WarningIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff3cd" stroke="#ff9800" strokeWidth="3" />
    <rect x="29" y="18" width="6" height="24" rx="3" fill="#ff9800" />
    <rect x="29" y="46" width="6" height="6" rx="3" fill="#ff9800" />
  </svg>
);
const LightbulbIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="28" rx="18" ry="20" fill="#fffde7" stroke="#fbc02d" strokeWidth="2"/>
    <rect x="26" y="48" width="12" height="10" rx="3" fill="#fbc02d"/>
    <rect x="28" y="58" width="8" height="4" rx="2" fill="#ffe082"/>
    <path d="M32 8v6M16 16l4 4M48 16l-4 4" stroke="#fbc02d" strokeWidth="2"/>
  </svg>
);

const nodeBaseStyle = {
  border: '2px solid #90caf9',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#fff', // default
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 180,
  minHeight: 40,
  cursor: 'pointer',
};

// Color map for node backgrounds by category
const nodeBgColors = {
  practiceAssessment: '#e3f2fd', // main node (blue)
  timedTests: '#c8e6c9', // timed tests (green)
  task1Practice: '#c8e6c9',
  task2Practice: '#c8e6c9',
  fullTest: '#c8e6c9',
  bandComparisons: '#fff9c4', // band comparisons (yellow)
  sideBySide: '#fff9c4',
  slider: '#b2ebf2', // interactive/game (cyan)
  rewriteChallenge: '#b2ebf2', // interactive/game (cyan)
  checklists: '#ede7f6', // checklists (purple)
  task1Checklist: '#ede7f6',
  task2Checklist: '#ede7f6',
  selfScoring: '#ede7f6',
  peerAI: '#f8bbd0', // feedback (pink)
  miniTest: '#f8bbd0', // assessment (pink)
};

const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle } = data;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(props.style || {}) }} className={props.className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{data.label}</div>
      <button
        style={{ marginLeft: 8, padding: '2px 10px', borderRadius: 6, border: '1px solid #1976d2', background: isExpanded ? '#e3f2fd' : '#fff', color: '#1976d2', cursor: 'pointer', fontSize: 14 }}
        onClick={e => { e.stopPropagation(); onToggle(id); }}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
const nodeTypes = { collapsible: CollapsibleNode };

const nodeDetails = {
  practiceAssessment: {
    title: "Practice & Assessment",
    details: `A comprehensive module for timed practice, band comparisons, and self/AI evaluation.\n\nExpand each branch for interactive tools, model answers, and actionable feedback to maximize your IELTS Writing performance.`
  },
  // Timed Mock Tests
  timedTests: { title: "Timed Mock Tests", details: `Simulate real exam conditions for Task 1, Task 2, or both.\n\nFeatures:\n- Countdown timer\n- Autosave\n- Randomized prompts\n- Instant feedback after submission\n\nTip: Practice under timed conditions to build exam stamina.` },
  task1Practice: { title: "Task 1 Practice (20 min)", details: `Practice Task 1 with a new data set every time (charts, processes, maps).\n\n- 20-minute timer\n- Autosave your work\n- Get instant feedback on structure and data accuracy\n\nExample prompt:\n"The chart below shows the percentage of households with internet access in five countries. Summarize the information..."` },
  task2Practice: { title: "Task 2 Practice (40 min)", details: `Practice Task 2 with randomized essay questions by topic (education, environment, technology, etc.).\n\n- 40-minute timer\n- Built-in word counter\n- “Time’s up” lock prevents further editing\n\nExample prompt:\n"Some people believe that technology has made our lives more complicated. To what extent do you agree or disagree?"` },
  fullTest: { title: "Full Writing Test Simulation (60 min)", details: `Take a full IELTS Writing test: Task 1 + Task 2 in one go.\n\n- 60-minute timer\n- Auto-export your answers for review\n- Simulates real exam pressure\n\nTip: Review your answers and note areas for improvement after each simulation.` },
  // Band Comparisons
  bandComparisons: { title: "Band 5 → 9 Comparisons", details: `See side-by-side model answers for the same prompt at different band levels.\n\n- Vocabulary richness\n- Cohesion & coherence\n- Grammar range & accuracy\n- Task response quality\n\nUse the slider and rewrite challenge to learn how to upgrade your writing.` },
  sideBySide: { title: "Side-by-Side Model Answers", details: `Compare Band 5, 6, 7, 8, and 9 responses to the same prompt.\n\nHighlighted differences:\n- Band 5: Simple vocabulary, weak structure\n- Band 7: Varied vocabulary, clear progression\n- Band 9: Sophisticated language, flawless logic\n\nTip: Study the differences and apply them to your own writing.` },
  slider: { title: "Interactive Slider", details: `Drag the slider to visually “upgrade” an essay from Band 5 to Band 9.\n\nSee how improvements in vocabulary, grammar, and structure raise the score.\n\nExample: Watch "important" become "crucial", "bad" become "detrimental", and sentences become more complex.` },
  rewriteChallenge: { title: "Rewrite Challenge", details: `Try to “upgrade” a Band 6 answer into Band 7+.\n\n- Edit the sample answer\n- Get instant feedback on your changes\n- Focus on vocabulary, cohesion, and grammar\n\nTip: Use the Band 7+ model as inspiration, but write in your own words.` },
  // Evaluation Checklists
  checklists: { title: "Evaluation Checklists", details: `Use detailed checklists for Task 1 and Task 2.\n\n- Self-score your work\n- Peer or AI feedback\n- Identify strengths and weaknesses\n\nTip: Use the checklist after every practice essay.` },
  task1Checklist: { title: "Task 1 Checklist", details: `Task 1 must-haves:\n- Overview present?\n- Key trends/changes highlighted?\n- Clear comparisons?\n- Data accuracy?\n\nExample: "Overall, internet access increased in all countries, with the UK leading."` },
  task2Checklist: { title: "Task 2 Checklist", details: `Task 2 must-haves:\n- Clear position throughout?\n- Balanced arguments/examples?\n- Logical progression of ideas?\n- Range of structures and vocabulary?\n\nExample: "While technology has brought challenges, its benefits outweigh the drawbacks."` },
  selfScoring: { title: "Self-Scoring Rubric", details: `Tick boxes to estimate your Band.\n\n- Use after each practice\n- Honest self-assessment helps you target weak areas\n\nTip: Compare your self-score with teacher or AI feedback for accuracy.` },
  peerAI: { title: "Peer/AI Feedback Mode", details: `Upload your answer for instant annotated feedback.\n\n- Grammar errors highlighted\n- Vague vocabulary flagged\n- Missing overview or unclear position noted\n\nTip: Use feedback to make targeted improvements before your next attempt.` },
  miniTest: { title: "✅ Mini-Test (Assessment Mode)", details: `5 timed prompts (mix of Task 1 & 2).\n\n- Each prompt timed\n- Auto-generated report: strengths, weaknesses, band estimate, and next-step recommendation\n\nTip: Use the report to plan your next study session.` },
};

const initialNodes = [
  { id: "practiceAssessment", data: { label: "Practice & Assessment" }, position: { x: 0, y: 0 }, draggable: true },
  // Timed Mock Tests
  { id: "timedTests", type: "collapsible", data: { label: "Timed Mock Tests" }, position: { x: -220, y: 120 }, draggable: true },
  { id: "task1Practice", data: { label: "Task 1 Practice (20 min)" }, position: { x: -420, y: 220 }, draggable: true },
  { id: "task2Practice", data: { label: "Task 2 Practice (40 min)" }, position: { x: -220, y: 220 }, draggable: true },
  { id: "fullTest", data: { label: "Full Writing Test Simulation (60 min)" }, position: { x: -20, y: 220 }, draggable: true },
  // Band Comparisons
  { id: "bandComparisons", type: "collapsible", data: { label: "Band 5 → 9 Comparisons" }, position: { x: 0, y: 120 }, draggable: true },
  { id: "sideBySide", data: { label: "Side-by-Side Model Answers" }, position: { x: -200, y: 220 }, draggable: true },
  { id: "slider", data: { label: "Interactive Slider" }, position: { x: 0, y: 220 }, draggable: true },
  { id: "rewriteChallenge", data: { label: "Rewrite Challenge" }, position: { x: 200, y: 220 }, draggable: true },
  // Evaluation Checklists
  { id: "checklists", type: "collapsible", data: { label: "Evaluation Checklists" }, position: { x: 220, y: 120 }, draggable: true },
  { id: "task1Checklist", data: { label: "Task 1 Checklist" }, position: { x: 420, y: 220 }, draggable: true },
  { id: "task2Checklist", data: { label: "Task 2 Checklist" }, position: { x: 220, y: 220 }, draggable: true },
  { id: "selfScoring", data: { label: "Self-Scoring Rubric" }, position: { x: 20, y: 220 }, draggable: true },
  { id: "peerAI", data: { label: "Peer/AI Feedback Mode" }, position: { x: 220, y: 320 }, draggable: true },
  { id: "miniTest", data: { label: "✅ Mini-Test (Assessment Mode)" }, position: { x: 420, y: 320 }, draggable: true },
].map(n => ({
  ...n,
  style: {
    ...nodeBaseStyle,
    background: nodeBgColors[n.id] || nodeBaseStyle.background,
  },
}));
const initialEdges = [
  // Main branches
  { id: "e-practiceAssessment-timedTests", source: "practiceAssessment", target: "timedTests" },
  { id: "e-practiceAssessment-bandComparisons", source: "practiceAssessment", target: "bandComparisons" },
  { id: "e-practiceAssessment-checklists", source: "practiceAssessment", target: "checklists" },
  // Timed Mock Tests sub-nodes
  { id: "e-timedTests-task1Practice", source: "timedTests", target: "task1Practice" },
  { id: "e-timedTests-task2Practice", source: "timedTests", target: "task2Practice" },
  { id: "e-timedTests-fullTest", source: "timedTests", target: "fullTest" },
  // Band Comparisons sub-nodes
  { id: "e-bandComparisons-sideBySide", source: "bandComparisons", target: "sideBySide" },
  { id: "e-bandComparisons-slider", source: "bandComparisons", target: "slider" },
  { id: "e-bandComparisons-rewriteChallenge", source: "bandComparisons", target: "rewriteChallenge" },
  // Checklists sub-nodes
  { id: "e-checklists-task1Checklist", source: "checklists", target: "task1Checklist" },
  { id: "e-checklists-task2Checklist", source: "checklists", target: "task2Checklist" },
  { id: "e-checklists-selfScoring", source: "checklists", target: "selfScoring" },
  { id: "e-checklists-peerAI", source: "checklists", target: "peerAI" },
  { id: "e-checklists-miniTest", source: "checklists", target: "miniTest" },
];

function PracticeAssessment() {
  const [expanded, setExpanded] = useState({
    timedTests: true,
    bandComparisons: true,
    checklists: true,
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState(null);
  const [detached, setDetached] = useState(false);

  const parentToChildren = {
    timedTests: ["task1Practice", "task2Practice", "fullTest"],
    bandComparisons: ["sideBySide", "slider", "rewriteChallenge"],
    checklists: ["task1Checklist", "task2Checklist", "selfScoring", "peerAI", "miniTest"],
  };

  const getVisibleNodesAndEdges = () => {
    let visibleNodes = nodes;
    let visibleEdges = edges;
    Object.entries(parentToChildren).forEach(([parent, children]) => {
      if (!expanded[parent]) {
        visibleNodes = visibleNodes.filter(n => !children.includes(n.id));
        visibleEdges = visibleEdges.filter(e => e.source !== parent);
      }
    });
    return { visibleNodes, visibleEdges };
  };

  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    setSelected(sel => (sel === id ? null : sel));
  }, []);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.id);
  }, []);

  const { visibleNodes, visibleEdges } = getVisibleNodesAndEdges();
  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={visibleNodes.map(n =>
          n.type === 'collapsible'
            ? { ...n, data: { ...n.data, isExpanded: !!expanded[n.id], onToggle: handleToggle } }
            : n
        )}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {selected && nodeDetails[selected] && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100vw',
            background: 'rgba(255,255,255,0.98)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 -4px 32px #0003',
            padding: '32px 0 24px 0',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 8px 32px #0004',
              padding: 24,
              minWidth: 630,
              maxWidth: 1350,
              width: '95vw',
              minHeight: 390,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              position: 'relative',
              animation: 'fadeInUp .4s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: 18,
                right: 28,
                background: '#e53e3e',
                color: '#fff',
                border: 'none',
                borderRadius: 7,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
                zIndex: 10,
              }}
            >
              Close
            </button>
            {/* Visual on the left */}
            <div style={{ flex: '0 0 38%', maxWidth: '38%', minWidth: 320, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {selected === 'bandComparisons' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3e0', borderRadius: 12 }}>
                  <WarningIcon />
                </div>
              ) : selected === 'checklists' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <LightbulbIcon />
                </div>
              ) : (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              )}
            </div>
            {/* Info on the right */}
            <div style={{ flex: '0 0 62%', maxWidth: '62%', minWidth: 320, width: 'auto', marginLeft: 0, wordBreak: 'break-word', whiteSpace: 'pre-line', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{nodeDetails[selected].title}</div>
              <div style={{ fontSize: 24, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{nodeDetails[selected].details}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setDetached(true)}>
          Detach (Full Screen)
        </button>
      </div>
      <div className="mb-6" style={{ maxHeight: 820, overflowY: "auto" }}>{Mindmap}</div>
      {detached && (
        <div style={{ position: "fixed", zIndex: 1000, top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(30,40,60,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "90vw", height: "90vh", background: "#fff", borderRadius: 12, boxShadow: "0 4px 32px #0006", position: "relative", padding: 24, display: "flex", flexDirection: "column" }}>
            <button onClick={() => setDetached(false)} style={{ position: "absolute", top: 16, right: 24, zIndex: 10, background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px #0002" }}>
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>{Mindmap}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default PracticeAssessment;
