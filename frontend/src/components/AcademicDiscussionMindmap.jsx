import React, { useState, useCallback, useEffect, memo } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Position, Handle } from "reactflow";
import "reactflow/dist/style.css";

// Color palette for nodes (matching Part 2)
const nodeBgColors = {
  orientation: '#b3e5fc', // blue
  foundations: '#f8bbd0', // pink
  mastery: '#c8e6c9', // green
  advanced: '#ffe082', // yellow
  leaf: '#e3f2fd', // light blue for leaves
};

// Collapsible node component
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle } = data;
  const style = props.style || {};
  const background = style.background || '#e3f2fd';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, background, borderRadius: 12, border: '2px solid #90caf9', padding: '8px 16px', fontSize: 16, minWidth: 180, minHeight: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <Handle type="target" position={Position.Left} />
      <span>{data.label}</span>
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

// Node details for modal
const nodeDetails = {
  orientation: {
    title: 'Orientation',
    details: `Purpose: Tests ability to follow multiple speakers (2–4), often in an academic/semi-formal context.\n\nCommon contexts:\n- Students discussing assignments/projects\n- Seminar discussions with a tutor\n- Group planning meetings\n\nTypical question types:\n- Multiple Choice Questions (MCQs)\n- Matching ideas to speakers\n- Table/Flowchart completion\n- Sentence completion`
  },
  foundations: {
    title: 'Foundations',
    details: `Multi-Speaker Awareness:\n- Recognize changes in speaker by tone/intonation.\n- Track opinions of different speakers (agreement, disagreement, hesitation).\n\nIdentifying stance:\n- Agreement signals: “Yes, I think so too…”\n- Disagreement signals: “I’m not sure about that…”\n- Neutral: “It depends on…”\n\nCommon academic language:\n- Referring to research: “According to the study…”\n- Suggesting: “We could look at…”\n- Evaluating: “That might not work because…”`
  },
  mastery: {
    title: 'Task Mastery',
    details: `By Question Type:\n\nMCQs:\n- Focus on gist vs detail.\n- Watch out for answers spread across multiple speakers.\n\nMatching:\n- Identify which speaker says what — listen for names or pronouns.\n- Note differences in opinions.\n\nTable/Flowchart Completion:\n- Track sequence of discussion (who suggests what).\n- Predict type of missing word (noun/verb).\n\nSentence Completion:\n- Predict grammar before listening.\n- Expect paraphrasing of the given statement.\n\nStep-by-Step Strategy:\n- Skim questions and underline keywords.\n- Anticipate possible synonyms/paraphrases.\n- Note speaker changes quickly (use initials: S1, S2).\n- Focus on differences in opinion, not just repeated ideas.\n- Double-check logical flow when transferring answers.`
  },
  advanced: {
    title: 'Advanced Listening Skills',
    details: `Tracking multiple perspectives:\n- Train with debates, panel discussions, academic group talks.\n\nNoticing subtle cues:\n- Politeness vs disagreement.\n- Shifts in focus (topic changed suddenly).\n\nAvoiding distractors:\n- Sometimes one speaker proposes a wrong idea, later corrected.\n- Don’t choose first mention — wait for confirmation.\n\nHigh-level skill: Distinguishing between agreement with addition vs partial disagreement.`
  },
  // Leaf nodes for Foundations
  awareness: {
    title: 'Multi-Speaker Awareness',
    details: `- Recognize changes in speaker by tone/intonation.\n- Track opinions of different speakers (agreement, disagreement, hesitation).`
  },
  stance: {
    title: 'Identifying Stance',
    details: `- Agreement signals: “Yes, I think so too…”\n- Disagreement signals: “I’m not sure about that…”\n- Neutral: “It depends on…”`
  },
  language: {
    title: 'Common Academic Language',
    details: `- Referring to research: “According to the study…”\n- Suggesting: “We could look at…”\n- Evaluating: “That might not work because…”`
  },
  // Leaf nodes for Mastery
  mcq: {
    title: 'MCQs',
    details: `- Focus on gist vs detail.\n- Watch out for answers spread across multiple speakers.`
  },
  matching: {
    title: 'Matching',
    details: `- Identify which speaker says what — listen for names or pronouns.\n- Note differences in opinions.`
  },
  table: {
    title: 'Table/Flowchart Completion',
    details: `- Track sequence of discussion (who suggests what).\n- Predict type of missing word (noun/verb).`
  },
  sentence: {
    title: 'Sentence Completion',
    details: `- Predict grammar before listening.\n- Expect paraphrasing of the given statement.`
  },
  strategy: {
    title: 'Step-by-Step Strategy',
    details: `- Skim questions and underline keywords.\n- Anticipate possible synonyms/paraphrases.\n- Note speaker changes quickly (use initials: S1, S2).\n- Focus on differences in opinion, not just repeated ideas.\n- Double-check logical flow when transferring answers.`
  },
  // Leaf nodes for Advanced
  perspectives: {
    title: 'Tracking Multiple Perspectives',
    details: `- Train with debates, panel discussions, academic group talks.`
  },
  cues: {
    title: 'Noticing Subtle Cues',
    details: `- Politeness vs disagreement.\n- Shifts in focus (topic changed suddenly).`
  },
  distractors: {
    title: 'Avoiding Distractors',
    details: `- Sometimes one speaker proposes a wrong idea, later corrected.\n- Don’t choose first mention — wait for confirmation.`
  },
  highlevel: {
    title: 'High-level Skill',
    details: `- Distinguishing between agreement with addition vs partial disagreement.`
  },
};

function AcademicDiscussionMindmap() {
  const [modal, setModal] = useState(null);
  const [detached, setDetached] = useState(false);
  const nodeTypes = React.useMemo(() => ({}), []);

  // Initial nodes and edges (stateful, draggable)
  const initialNodes = [
    // Root node
    { id: 'root', type: 'collapsible', data: { label: 'Listening Part 3: Academic Discussion' }, position: { x: 450, y: -120 }, style: { background: '#bae6fd', fontWeight: 'bold', fontSize: 20 } },
    // Main nodes
    { id: 'orientation', type: 'collapsible', data: { label: nodeDetails.orientation.title }, position: { x: 0, y: 0 }, style: { background: nodeBgColors.orientation } },
    { id: 'foundations', type: 'collapsible', data: { label: nodeDetails.foundations.title }, position: { x: 300, y: 0 }, style: { background: nodeBgColors.foundations } },
    { id: 'mastery', type: 'collapsible', data: { label: nodeDetails.mastery.title }, position: { x: 600, y: 0 }, style: { background: nodeBgColors.mastery } },
    { id: 'advanced', type: 'collapsible', data: { label: nodeDetails.advanced.title }, position: { x: 900, y: 0 }, style: { background: nodeBgColors.advanced } },

    // Orientation sub-nodes
    { id: 'orientation-purpose', data: { label: 'Purpose', description: 'Tests ability to follow multiple speakers (2–4), often in an academic/semi-formal context.' }, position: { x: -200, y: 100 }, parentNode: 'orientation', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-contexts', data: { label: 'Common contexts' }, position: { x: 0, y: 100 }, parentNode: 'orientation', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-contexts-1', data: { label: 'Students discussing assignments/projects' }, position: { x: 0, y: 180 }, parentNode: 'orientation-contexts', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-contexts-2', data: { label: 'Seminar discussions with a tutor' }, position: { x: 0, y: 220 }, parentNode: 'orientation-contexts', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-contexts-3', data: { label: 'Group planning meetings' }, position: { x: 0, y: 260 }, parentNode: 'orientation-contexts', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-types', data: { label: 'Typical question types' }, position: { x: 200, y: 100 }, parentNode: 'orientation', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-types-1', data: { label: 'Multiple Choice Questions (MCQs)' }, position: { x: 200, y: 180 }, parentNode: 'orientation-types', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-types-2', data: { label: 'Matching ideas to speakers' }, position: { x: 200, y: 220 }, parentNode: 'orientation-types', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-types-3', data: { label: 'Table/Flowchart completion' }, position: { x: 200, y: 260 }, parentNode: 'orientation-types', style: { background: nodeBgColors.leaf } },
    { id: 'orientation-types-4', data: { label: 'Sentence completion' }, position: { x: 200, y: 300 }, parentNode: 'orientation-types', style: { background: nodeBgColors.leaf } },

    // Foundations leaf nodes
    { id: 'awareness', data: { label: nodeDetails.awareness.title }, position: { x: 300, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'stance', data: { label: nodeDetails.stance.title }, position: { x: 420, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'language', data: { label: nodeDetails.language.title }, position: { x: 540, y: 120 }, style: { background: nodeBgColors.leaf } },
    // Mastery leaf nodes
    { id: 'mcq', data: { label: nodeDetails.mcq.title }, position: { x: 600, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'matching', data: { label: nodeDetails.matching.title }, position: { x: 720, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'table', data: { label: nodeDetails.table.title }, position: { x: 840, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'sentence', data: { label: nodeDetails.sentence.title }, position: { x: 960, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'strategy', data: { label: nodeDetails.strategy.title }, position: { x: 1080, y: 120 }, style: { background: nodeBgColors.leaf } },
    // Advanced leaf nodes
    { id: 'perspectives', data: { label: nodeDetails.perspectives.title }, position: { x: 900, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'cues', data: { label: nodeDetails.cues.title }, position: { x: 1020, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'distractors', data: { label: nodeDetails.distractors.title }, position: { x: 1140, y: 120 }, style: { background: nodeBgColors.leaf } },
    { id: 'highlevel', data: { label: nodeDetails.highlevel.title }, position: { x: 1260, y: 120 }, style: { background: nodeBgColors.leaf } },
  ];
  // Collapsible logic
  const [expanded, setExpanded] = useState({
    orientation: true,
    foundations: true,
    mastery: true,
    advanced: true,
  });
  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Map of parent node IDs to their children node IDs
  const parentToChildren = {
    orientation: [],
    foundations: ['awareness', 'stance', 'language'],
    mastery: ['mcq', 'matching', 'table', 'sentence', 'strategy'],
    advanced: ['perspectives', 'cues', 'distractors', 'highlevel'],
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    // Root to main nodes
    { id: 'e-root-orientation', source: 'root', target: 'orientation', animated: true },
    { id: 'e-root-foundations', source: 'root', target: 'foundations', animated: true },
    { id: 'e-root-mastery', source: 'root', target: 'mastery', animated: true },
    { id: 'e-root-advanced', source: 'root', target: 'advanced', animated: true },

    // Orientation sub-nodes
    { id: 'e-orientation-purpose', source: 'orientation', target: 'orientation-purpose', animated: true },
    { id: 'e-orientation-contexts', source: 'orientation', target: 'orientation-contexts', animated: true },
    { id: 'e-orientation-contexts-1', source: 'orientation-contexts', target: 'orientation-contexts-1', animated: true },
    { id: 'e-orientation-contexts-2', source: 'orientation-contexts', target: 'orientation-contexts-2', animated: true },
    { id: 'e-orientation-contexts-3', source: 'orientation-contexts', target: 'orientation-contexts-3', animated: true },
    { id: 'e-orientation-types', source: 'orientation', target: 'orientation-types', animated: true },
    { id: 'e-orientation-types-1', source: 'orientation-types', target: 'orientation-types-1', animated: true },
    { id: 'e-orientation-types-2', source: 'orientation-types', target: 'orientation-types-2', animated: true },
    { id: 'e-orientation-types-3', source: 'orientation-types', target: 'orientation-types-3', animated: true },
    { id: 'e-orientation-types-4', source: 'orientation-types', target: 'orientation-types-4', animated: true },

    // Foundations to leaf
    { id: 'e4', source: 'foundations', target: 'awareness', animated: true },
    { id: 'e5', source: 'foundations', target: 'stance', animated: true },
    { id: 'e6', source: 'foundations', target: 'language', animated: true },
    // Mastery to leaf
    { id: 'e7', source: 'mastery', target: 'mcq', animated: true },
    { id: 'e8', source: 'mastery', target: 'matching', animated: true },
    { id: 'e9', source: 'mastery', target: 'table', animated: true },
    { id: 'e10', source: 'mastery', target: 'sentence', animated: true },
    { id: 'e11', source: 'mastery', target: 'strategy', animated: true },
    // Advanced to leaf
    { id: 'e12', source: 'advanced', target: 'perspectives', animated: true },
    { id: 'e13', source: 'advanced', target: 'cues', animated: true },
    { id: 'e14', source: 'advanced', target: 'distractors', animated: true },
    { id: 'e15', source: 'advanced', target: 'highlevel', animated: true },
  ]);

  // Filter nodes/edges based on expanded state
  const getVisibleNodesAndEdges = () => {
    let visibleNodes = [...nodes];
    let visibleEdges = [...edges];
    Object.entries(parentToChildren).forEach(([parent, children]) => {
      if (!expanded[parent]) {
        visibleNodes = visibleNodes.filter(n => !children.includes(n.id));
        visibleEdges = visibleEdges.filter(e => e.source !== parent);
      }
    });
    return { visibleNodes, visibleEdges };
  };


  // Modal rendering for node details
  let modalDetailsLines = null;
  if (modal && nodeDetails[modal] && nodeDetails[modal].details) {
    modalDetailsLines = nodeDetails[modal].details.split(/\n|•/g).map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      return (
        <div key={idx} style={{ marginBottom: 6, display: 'flex', alignItems: 'flex-start' }}>
          {line.startsWith(' ') || line.startsWith('-') || line.startsWith('•') ? (
            <span style={{ marginRight: 8, color: '#1976d2', fontWeight: 700 }}>•</span>
          ) : null}
          <span>{trimmed}</span>
        </div>
      );
    });
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setDetached(true)}>
          Detach (Full Screen)
        </button>
      </div>
      <div style={{ maxHeight: 820, overflowY: 'auto' }}>
        <div style={{ width: '100%', minHeight: 600, position: 'relative' }}>
          {(() => {
            const { visibleNodes, visibleEdges } = getVisibleNodesAndEdges();
            const nodeTypes = React.useMemo(() => ({ collapsible: CollapsibleNode }), []);
            return (
              <ReactFlow
                nodes={visibleNodes.map(n =>
                  n.type === 'collapsible'
                    ? { ...n, data: { ...n.data, isExpanded: !!expanded[n.id], onToggle: handleToggle } }
                    : { ...n, style: { ...n.style, cursor: 'pointer' } }
                )}
                edges={visibleEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                style={{ background: '#f8fafc', borderRadius: 12, minHeight: 600 }}
                onNodeClick={(_, node) => setModal(node.id)}
                panOnDrag={true}
                zoomOnScroll={true}
                nodesDraggable={true}
                nodeTypes={nodeTypes}
              >
                <Background variant="dots" gap={12} size={1} />
                <Controls />
              </ReactFlow>
            );
          })()}
          {modal && (
            <div style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,40,60,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0004', padding: 28, minWidth: 320, maxWidth: 600, width: '90vw', minHeight: 180, position: 'relative', animation: 'fadeInUp .4s cubic-bezier(.4,0,.2,1)' }}>
                <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{nodeDetails[modal].title}</div>
                <button
                  onClick={() => setModal(null)}
                  style={{ position: 'absolute', top: 16, right: 24, zIndex: 10, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0002' }}
                >
                  Close
                </button>
                <div style={{ fontSize: 17, color: '#333', marginTop: 12, whiteSpace: 'pre-line', width: '100%', lineHeight: 1.7 }}>
                  {modalDetailsLines}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
              <ReactFlow
                nodes={nodes.map(n => ({ ...n, style: { ...n.style, cursor: 'pointer' } }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                style={{ background: '#f8fafc', borderRadius: 12, minHeight: '100%' }}
                onNodeClick={(_, node) => setModal(node.id)}
                panOnDrag={true}
                zoomOnScroll={true}
                nodesDraggable={true}
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AcademicDiscussionMindmap;

