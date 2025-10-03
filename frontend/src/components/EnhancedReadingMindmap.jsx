import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
// Base style for nodes
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

// Color map for node backgrounds
const nodeBgColors = {
  readingCenter: '#e3f2fd',
  orientation: '#b3e5fc',
  purpose: '#fff9c4',
  format: '#c8e6c9',
  academicReading: '#c8e6c9',
  generalTraining: '#c8e6c9',
  challenges: '#ffe0b2',
  vocabularyDensity: '#ffe0b2',
  paraphrasing: '#ede7f6',
  timeManagement: '#fff8e1',
  trapAnswers: '#ffebee',
};

// Icons for different node types
const BookIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="20" height="40" rx="4" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <rect x="36" y="12" width="20" height="40" rx="4" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
    <path d="M28 16H12M28 24H12M28 32H12M28 40H12" stroke="#1976d2" strokeWidth="2"/>
    <path d="M52 16H40M52 24H40M52 32H40M52 40H40" stroke="#1976d2" strokeWidth="2"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#1976d2" strokeWidth="3"/>
    <circle cx="32" cy="32" r="20" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
    <circle cx="32" cy="32" r="12" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <circle cx="32" cy="32" r="4" fill="#1976d2"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="28" rx="18" ry="20" fill="#fffde7" stroke="#fbc02d" strokeWidth="2"/>
    <rect x="26" y="48" width="12" height="10" rx="3" fill="#fbc02d"/>
    <rect x="28" y="58" width="8" height="4" rx="2" fill="#ffe082"/>
    <path d="M32 8v6M16 16l4 4M48 16l-4 4" stroke="#fbc02d" strokeWidth="2"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff3cd" stroke="#ff9800" strokeWidth="3"/>
    <rect x="29" y="18" width="6" height="24" rx="3" fill="#ff9800"/>
    <rect x="29" y="46" width="6" height="6" rx="3" fill="#ff9800"/>
  </svg>
);

// Utility to strip markdown formatting
// Child map definition - must be defined before use
const getChildMap = () => {
  return {
    readingCenter: ["orientation"],
    orientation: ["purpose", "format", "challenges"],
    format: ["academicReading", "generalTraining"],
    challenges: ["vocabularyDensity", "paraphrasing", "timeManagement", "trapAnswers"],
  };
};
// Node details for modal rendering
// Collapsible node component for parent nodes  
const CollapsibleNode = memo((props) => {
  const { id, data, style, className } = props;
  const { isExpanded, onToggle, hasChildren, label } = data;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(style || {}) }} className={className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{label}</div>
      {hasChildren && (
        <button
          style={{
            marginLeft: 8,
            padding: '2px 10px',
            borderRadius: 6,
            background: '#e3f2fd',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => onToggle(id)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
const nodeDetails = {
  vocabularyDensity: {
    title: "Vocabulary Density",
  details: "IELTS Reading passages are packed with challenging vocabulary, technical terms, and topic-specific words.\n\nKey Skills:\nRecognize synonyms and paraphrases\nBuild a strong Academic Word List (AWL) foundation\nUse context clues to infer meaning\nSkim for main ideas, scan for key terms\n\nStrategies:\nPractice reading science, history, and social science texts\nCreate personal vocabulary lists\nUse flashcards and spaced repetition\nReview word families and collocations\n\nCommon Pitfalls:\nIgnoring unfamiliar words\nFocusing only on word-for-word matches\n\nPro Tip:\nHighlight new words and review them regularly.",
    icon: BookIcon,
    bg: '#ffe0b2',
  },
  paraphrasing: {
    title: "Paraphrasing & Synonyms",
  details: "Most IELTS Reading questions require you to spot paraphrased information. The test rarely repeats exact words from the passage.\n\nKey Skills:\nIdentify synonyms and reworded phrases\nNotice changes in sentence structure\nMatch meaning, not just words\n\nStrategies:\nPractice transforming sentences\nCompare question wording to passage\nLook for subtle shifts in meaning\n\nCommon Pitfalls:\nMissing answers due to unfamiliar phrasing\nOverlooking paraphrased ideas\n\nPro Tip:\nAlways check if the question uses different words for the same idea in the text.",
    icon: BookIcon,
    bg: '#ede7f6',
  },
  timeManagement: {
    title: "Time Management",
  details: "You have 60 minutes for 3 passages (~900 words each) and 40 questions.\n\nRecommended Strategy:\nSpend about 20 minutes per passage\nSkim first for overall structure\nRead questions before the passage\nAnswer easy questions first, return to hard ones later\nLeave 2-3 minutes at the end to review answers\n\nCommon Pitfalls:\nGetting stuck on difficult questions\nNot leaving time for review\n\nPro Tip:\nPractice with a timer to build automatic time awareness.",
    icon: TargetIcon,
    bg: '#fff8e1',
  },
  trapAnswers: {
    title: "Trap Answers & Distractors",
  details: "IELTS Reading is full of trap answers designed to mislead.\n\nTrap Types:\nDistractors use similar words but different meanings\nExtreme language (always, never) is often incorrect\nMinor details presented as main ideas\nOut-of-scope information that sounds logical but isn’t in the text\n\nStrategies:\nAlways find evidence in the passage\nDon’t rely on outside knowledge\nWatch for word matching traps\n\nCommon Pitfalls:\nChoosing answers based on familiar words\nIgnoring context\n\nPro Tip:\nRead carefully and verify every answer with passage evidence.",
    icon: WarningIcon,
    bg: '#ffebee',
  },
  academicReading: {
    title: "Academic Reading Format",
  details: "Academic Reading consists of 3 long passages (about 900 words each) from books, journals, magazines, and newspapers.\n\nFeatures:\n40 questions in 60 minutes\nTopics: science, social science, humanities\nQuestion types: multiple choice, matching, completion, TFNG, YNNG\nIncreasing difficulty from Passage 1 to Passage 3\n\nStrategies:\nPractice with authentic academic texts\nBuild reading stamina\nReview all question types\n\nPro Tip:\nStart with Passage 1 to build confidence, save more time for Passage 3.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  generalTraining: {
    title: "General Training Format",
  details: "General Training Reading includes:\n\nSections:\nSection 1: Short social survival texts (notices, advertisements)\nSection 2: Workplace texts (instructions, job descriptions)\nSection 3: One long passage (similar to Academic)\n40 questions, 60 minutes\n\nStrategies:\nPractice with everyday documents and workplace materials\nReview workplace vocabulary\nFocus on practical reading skills\n\nPro Tip:\nSection 3 is most similar to Academic—prepare for longer, more complex texts.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  purpose: {
    title: "Purpose of Reading Module",
  details: "The IELTS Reading module assesses your ability to:\n\nCore Skills:\nUnderstand academic texts\nLocate specific information quickly\nProcess paraphrased details\nManage time under pressure\nDistinguish main ideas from supporting details\n\nStrategies:\nDevelop both speed and accuracy\nPractice with a variety of text types\nReview question types and answer formats\n\nPro Tip:\nSuccess comes from balancing comprehension, speed, and exam technique.",
    icon: BookIcon,
    bg: '#fff9c4',
  },
};

// Node types for ReactFlow (must be after CollapsibleNode definition)
const nodeTypes = { collapsible: CollapsibleNode };

// Node structure definition
const baseNodes = [
  // Center node
  { id: "readingCenter", data: { label: "IELTS Reading Orientation" }, position: { x: 0, y: 0 }, draggable: true },
  
  // Main branch - Orientation only
  { id: "orientation", type: "collapsible", data: { label: "Orientation" }, position: { x: 0, y: 150 }, draggable: true },
  
  // Orientation sub-nodes
  { id: "purpose", data: { label: "Purpose of Reading Module" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "format", type: "collapsible", data: { label: "Format" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "challenges", type: "collapsible", data: { label: "Key Challenges" }, position: { x: 300, y: 250 }, draggable: true },
  
  // Format sub-nodes
  { id: "academicReading", data: { label: "Academic Reading" }, position: { x: -150, y: 350 }, draggable: true },
  { id: "generalTraining", data: { label: "General Training" }, position: { x: 150, y: 350 }, draggable: true },
  
  // Challenges sub-nodes
  { id: "vocabularyDensity", data: { label: "Vocabulary Density" }, position: { x: 100, y: 350 }, draggable: true },
  { id: "paraphrasing", data: { label: "Paraphrasing & Synonyms" }, position: { x: 300, y: 350 }, draggable: true },
  { id: "timeManagement", data: { label: "Time Management" }, position: { x: 500, y: 350 }, draggable: true },
  { id: "trapAnswers", data: { label: "Trap Answers & Distractors" }, position: { x: 700, y: 350 }, draggable: true },
];

const initialEdges = [
  // Main branch from center
  { id: 'e-center-orientation', source: 'readingCenter', target: 'orientation' },
  
  // Orientation sub-branches
  { id: 'e-orientation-purpose', source: 'orientation', target: 'purpose' },
  { id: 'e-orientation-format', source: 'orientation', target: 'format' },
  { id: 'e-orientation-challenges', source: 'orientation', target: 'challenges' },
  
  // Format sub-branches
  { id: 'e-format-academic', source: 'format', target: 'academicReading' },
  { id: 'e-format-general', source: 'format', target: 'generalTraining' },
  
  // Challenges sub-branches
  { id: 'e-challenges-vocab', source: 'challenges', target: 'vocabularyDensity' },
  { id: 'e-challenges-paraphrase', source: 'challenges', target: 'paraphrasing' },
  { id: 'e-challenges-time', source: 'challenges', target: 'timeManagement' },
  { id: 'e-challenges-traps', source: 'challenges', target: 'trapAnswers' },
];

// Collapsible logic
const COLLAPSIBLE_IDS = ["orientation", "format", "challenges"];

const EnhancedReadingMindmap = ({ section = 'orientation' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  // Calculate visible nodes based on expanded state
  const childMapMain = useMemo(() => getChildMap(), []);
  
  // Calculate visible nodes with React useMemo for performance
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["readingCenter"]);
    
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    
    childMapMain.readingCenter.forEach(addVisible);
    return visibleIds;
  }, [expanded, childMapMain]);

  // Handle toggle function
  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Generate visible nodes with proper state
  const visibleNodes = useMemo(() => {
    return baseNodes
      .filter(n => visibleNodeIds.has(n.id))
      .map(n => {
        const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
        return {
          ...n,
          type: hasChildren ? "collapsible" : undefined,
          data: {
            ...n.data,
            isExpanded: expanded[n.id] ?? true,
            onToggle: handleToggle,
            hasChildren: hasChildren,
          },
        };
      });
  }, [visibleNodeIds, expanded, childMapMain, handleToggle]);

  // Generate visible edges
  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds]);

  // Use React Flow's state hooks with initial values
  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  // Update nodes and edges when visibility changes
  useEffect(() => {
    setNodes(prevNodes => {
      // Only update if there's an actual change in visible nodes
      const prevNodeIds = new Set(prevNodes.map(n => n.id));
      const newNodeIds = new Set(visibleNodes.map(n => n.id));
      
      const nodesChanged = prevNodeIds.size !== newNodeIds.size || 
        [...prevNodeIds].some(id => !newNodeIds.has(id)) ||
        [...newNodeIds].some(id => !prevNodeIds.has(id));
      
      if (!nodesChanged) {
        // Just update the data without changing positions
        return prevNodes.map(prevNode => {
          const newNode = visibleNodes.find(n => n.id === prevNode.id);
          return newNode ? { ...newNode, position: prevNode.position, selected: prevNode.selected } : prevNode;
        });
      }
      
      // Nodes have changed, add/remove as needed
      return visibleNodes.map(newNode => {
        const existingNode = prevNodes.find(n => n.id === newNode.id);
        return {
          ...newNode,
          position: existingNode ? existingNode.position : newNode.position,
          selected: existingNode ? existingNode.selected : false,
        };
      });
    });
    
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  // Custom node click handler to open info modal for leaf nodes
  const onNodeClick = useCallback((event, node) => {
    // Don't show modal for nodes that have children (parent nodes)
    const hasChildren = childMapMain[node.id] && childMapMain[node.id].length > 0;
    
    // Show modal if node has details and is not a parent node (or if it's a parent with content)
    if (nodeDetails[node.id] && !hasChildren) {
      setModal(node.id);
    } else if (nodeDetails[node.id] && hasChildren) {
      // For parent nodes, still show modal if they have content
      setModal(node.id);
    }
  }, [childMapMain]);

  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes.map(n => ({
          ...n,
          draggable: true,
          style: {
            ...nodeBaseStyle,
            background: nodeBgColors[n.id] || nodeBaseStyle.background,
          },
        }))}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div style={{position:'absolute',top:8,left:8,zIndex:9999,padding:'8px 16px',background:'#ffeb3b',color:'#222',fontWeight:700,borderRadius:8,fontSize:18,boxShadow:'0 2px 8px #0002'}}>EnhancedReadingMindmap Rendered: section = {section}</div>
      {!detached && (
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
            onClick={() => setDetached(true)}
          >
            Detach (Full Screen)
          </button>
        </div>
      )}
      {!detached && Mindmap}
      {detached && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.98)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 3100 }}>
            <button
              onClick={() => setDetached(false)}
              style={{
                background: '#e53e3e',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
              }}
            >
              Close Full Screen
            </button>
          </div>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0004', padding: 18, position: 'relative', zIndex: 3050 }}>
            {Mindmap}
          </div>
        </div>
      )}
      {modal && nodeDetails[modal] && (
        <div style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: 'auto',
          background: 'rgba(255,255,255,0.98)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          boxShadow: '0 -4px 32px #0003',
          padding: 0
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px #0004',
            padding: 28,
            minWidth: '900px',
            maxWidth: '1400px',
            width: '80vw',
            height: 'auto',
            minHeight: 260,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 32,
            position: 'relative',
            transition: 'all 0.3s ease-out'
          }}>
            {/* Visual on the left */}
            <div style={{
              flex: '0 0 120px',
              maxWidth: 120,
              minWidth: 120,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}>
              {nodeDetails[modal].icon && (
                <div style={{
                  width: 90,
                  height: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: nodeDetails[modal].bg || '#e3f2fd',
                  borderRadius: 12
                }}>
                  {React.createElement(nodeDetails[modal].icon)}
                </div>
              )}
            </div>
            {/* Info on the right, two columns for rich layout */}
            <div style={{
              flex: 1,
              minWidth: 320,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              wordBreak: 'break-word',
              height: '100%'
            }}>
              <div style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8
              }}>
                <div style={{
                  color: '#1976d2',
                  fontSize: 22,
                  fontWeight: 600
                }}>
                  {nodeDetails[modal].title}
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    background: '#e53e3e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #0002',
                    position: 'absolute',
                    right: 24,
                    zIndex: 10
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
                width: '100%',
                minHeight: 0,
                alignItems: 'flex-start',
                marginTop: 8
              }}>
                <div style={{ fontSize: 17, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                  {nodeDetails[modal].details.split(/\n\n/)[0]}
                </div>
                <div style={{ fontSize: 17, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                  {nodeDetails[modal].details.split(/\n\n/).slice(1).join('\n\n')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(EnhancedReadingMindmap);