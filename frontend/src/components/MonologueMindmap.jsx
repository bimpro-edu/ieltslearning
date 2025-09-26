import React, { memo, useState, useCallback } from "react";
import ReactFlow, { Background, Controls, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

// Node definitions for Part 3: Monologue/Map/Plan/Diagram
const nodes = [
  { id: "root", data: { label: "Monologue / Map / Plan / Diagram" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "orientation", data: { label: "1. Orientation" }, position: { x: -220, y: 120 }, draggable: true },
  { id: "foundations", data: { label: "2. Foundations" }, position: { x: 0, y: 120 }, draggable: true },
  { id: "taskMastery", data: { label: "3. Task Mastery" }, position: { x: 220, y: 120 }, draggable: true },
  { id: "advanced", data: { label: "4. Advanced Listening Skills" }, position: { x: -110, y: 260 }, draggable: true },
  { id: "practice", data: { label: "5. Practice & Assessment" }, position: { x: 110, y: 260 }, draggable: true },
];

const edges = [
  { id: "e-root-orientation", source: "root", target: "orientation" },
  { id: "e-root-foundations", source: "root", target: "foundations" },
  { id: "e-root-taskMastery", source: "root", target: "taskMastery" },
  { id: "e-root-advanced", source: "root", target: "advanced" },
  { id: "e-root-practice", source: "root", target: "practice" },
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
  orientation: [],
  foundations: [],
  taskMastery: [],
  advanced: [],
  practice: [],
});

const nodeDetails = {
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
  const [flowNodes, setFlowNodes] = useState(nodes);
  const childMap = getChildMap();
  const visibleIds = new Set(['root']);
  function addVisible(id) {
    visibleIds.add(id);
    if (expanded[id] && childMap[id]) childMap[id].forEach(addVisible);
  }
  childMap.root.forEach(addVisible);
  Object.keys(childMap).forEach(id => { if (expanded[id]) (childMap[id]||[]).forEach(addVisible); });

  const [modal, setModal] = useState(null);
  const parentIds = Object.keys(childMap).filter(id => childMap[id].length > 0);
  const onNodeClick = useCallback((event, node) => {
    if (!parentIds.includes(node.id) && nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);

  const onNodesChange = useCallback((changes) => {
    setFlowNodes(nds => nds.map(node => {
      const change = changes.find(c => c.id === node.id);
      if (!change) return node;
      if (change.type === 'position') {
        return { ...node, position: change.position };
      }
      if (change.type === 'dimensions') {
        return { ...node, dimensions: change.dimensions };
      }
      return node;
    }));
  }, []);

  const Mindmap = (
    <div style={{ width: '100%', height: '700px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc', marginBottom: 32 }}>
      <ReactFlow
        nodes={flowNodes.filter(n => visibleIds.has(n.id)).map(n => ({
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

export default MonologueMindmap;
