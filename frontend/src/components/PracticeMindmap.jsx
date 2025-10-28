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
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 180,
  minHeight: 40,
  cursor: 'pointer',
};

const nodeBgColors = {
  practiceAssessment: '#e3f2fd',
  timedTests: '#c8e6c9',
  task1Practice: '#c8e6c9',
  task2Practice: '#c8e6c9',
  fullTest: '#c8e6c9',
  bandComparisons: '#fff9c4',
  sideBySide: '#fff9c4',
  slider: '#b2ebf2',
  rewriteChallenge: '#b2ebf2',
  checklists: '#ede7f6',
  task1Checklist: '#ede7f6',
  task2Checklist: '#ede7f6',
  selfScoring: '#ede7f6',
  peerAI: '#f8bbd0',
  miniTest: '#f8bbd0',
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
  // ... rest of the node details
};

const initialNodes = [
  { id: "practiceAssessment", data: { label: "Practice & Assessment" }, position: { x: 0, y: 0 }, draggable: true },
  // ... rest of the nodes
].map(n => ({
  ...n,
  style: {
    ...nodeBaseStyle,
    background: nodeBgColors[n.id] || nodeBaseStyle.background,
  },
}));

const initialEdges = [
  { id: "e-practiceAssessment-timedTests", source: "practiceAssessment", target: "timedTests" },
  // ... rest of the edges
];

export function PracticeMindmap() {
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <h3 className="text-xl font-bold text-blue-600 mb-4">{nodeDetails[selected].title}</h3>
            <p className="whitespace-pre-line">{nodeDetails[selected].details}</p>
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90vw] h-[90vh] relative">
            <button
              onClick={() => setDetached(false)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <div className="h-full">{Mindmap}</div>
          </div>
        </div>
      )}
    </>
  );
}