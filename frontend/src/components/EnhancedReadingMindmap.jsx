import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

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

function removeVisual(text) {
  if (!text) return '';
  return text.replace(/\n?Visual:([\s\S]*)$/i, '').trim();
}

// Child map definition - must be defined before use
const getChildMap = () => {
  return {
    readingCenter: ["orientation"],
    orientation: ["purpose", "format", "challenges"],
    format: ["academicReading", "generalTraining"],
    challenges: ["vocabularyDensity", "paraphrasing", "timeManagement", "trapAnswers"],
  };
};

// Collapsible node component for parent nodes  
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle, hasChildren } = data;
  const showToggle = hasChildren;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(props.style || {}) }} className={props.className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{data.label}</div>
      {showToggle && (
        <button
          style={{ 
            marginLeft: 8, 
            padding: '2px 10px', 
            borderRadius: 6, 
            border: '1px solid #1976d2', 
            background: isExpanded ? '#e3f2fd' : '#fff', 
            color: '#1976d2', 
            cursor: 'pointer', 
            fontSize: 14 
          }}
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
  readingCenter: '#e3f2fd', // blue
  orientation: '#b2ebf2', // cyan
  
  // Orientation sub-nodes
  purpose: '#e1f5fe', // light blue
  format: '#f0f4f8', // light gray
  challenges: '#ffe0b2', // orange
  
  // Format sub-nodes
  academicReading: '#e8f5e9', // light green
  generalTraining: '#fff3e0', // light amber
  
  // Challenge sub-nodes
  vocabularyDensity: '#e1f5fe', // light blue
  paraphrasing: '#f3e5f5', // light purple
  timeManagement: '#fff8e1', // light yellow
  trapAnswers: '#ffebee', // light red
};

// Detailed node information
const nodeDetails = {
  readingCenter: {
    title: "IELTS Reading Mastery 2025",
    details: `Complete roadmap for IELTS Reading success.\n\nThis comprehensive guide covers:\n\n• Orientation and format understanding\n• Foundation skills development\n• Task-specific mastery techniques\n• Advanced critical thinking strategies\n\n**Key Features:**\n- Updated for 2025 test changes\n- Enhanced digital literacy components\n- Modern text types and topics\n- Advanced inference training\n- Strategic time management\n\n**Target Scores:**\n- Band 6.5-7: Foundation + Task Mastery\n- Band 7.5-8: + Advanced Strategies\n- Band 8.5-9: + Critical Analysis + Strategic Mastery\n\n**Study Path:**\n1. Start with Orientation\n2. Build Foundation Skills\n3. Master Task Types\n4. Develop Advanced Strategies\n5. Practice Strategic Application`,
    icon: BookIcon,
    bg: '#e3f2fd',
  },
  
  orientation: {
    title: "Reading Orientation 2025",
    details: `Understanding the IELTS Reading test format and key components.\n\nThis section covers:\n• Purpose of the Reading Module\n• Test Format (Academic vs General Training)\n• Key Challenges you'll face\n\nClick on each sub-topic to explore detailed information about the IELTS Reading test structure, challenges, and what you need to know to succeed.`,
    icon: TargetIcon,
    bg: '#b2ebf2',
  },

  purpose: {
    title: "Purpose of Reading Module",
    details: `**Primary Objective:**\nAssess ability to understand academic texts, locate information, and process paraphrased details under time pressure.\n\n**What IELTS Reading Tests:**\n• Comprehension of complex academic and general texts\n• Ability to identify main ideas and supporting details\n• Skill in locating specific information quickly\n• Understanding of paraphrased and synonymous expressions\n• Inference and deduction capabilities\n• Time management under pressure\n\n**Key Assessment Areas:**\n• Reading for gist (general understanding)\n• Reading for specific information\n• Reading for detailed understanding\n• Understanding logical argument\n• Recognizing writers' opinions and attitudes\n\n**Why These Skills Matter:**\n- Essential for academic study in English-speaking countries\n- Critical for workplace communication\n- Fundamental for daily life in English-speaking environments\n- Demonstrates readiness for higher education`,
    icon: TargetIcon,
    bg: '#e3f2fd',
  },

  format: {
    title: "Test Format",
    details: `Overview of IELTS Reading format variations.\n\n**Two Main Types:**\n• Academic Reading\n• General Training Reading\n\n**Common Features:**\n• 40 questions total\n• 60 minutes duration\n• No transfer time (write answers directly)\n• Multiple question types\n• Passages increase in difficulty\n\nClick on Academic or General Training to see specific format details.`,
    icon: BookIcon,
    bg: '#f0f4f8',
  },

  academicReading: {
    title: "Academic Reading Format",
    details: `**Structure:**\n3 long passages (~900 words each)\n40 questions total\n60 minutes\n\n**Passage Sources:**\n• Academic journals and research papers\n• University textbooks and course materials\n• Professional magazines (Scientific American, National Geographic)\n• Quality newspapers (opinion pieces, feature articles)\n• Online academic resources\n\n**Passage Topics:**\n• Natural sciences (biology, chemistry, physics)\n• Social sciences (psychology, sociology, anthropology)\n• Technology and engineering\n• Arts and humanities\n• Business and economics\n• Environmental studies\n\n**Text Characteristics:**\n• Complex sentence structures\n• Academic vocabulary and terminology\n• Abstract concepts and theories\n• Data interpretation requirements\n• Logical argumentation patterns\n\n**Difficulty Progression:**\n• Passage 1: Accessible academic content\n• Passage 2: Moderate complexity\n• Passage 3: Most challenging, specialist content`,
    icon: BookIcon,
    bg: '#e8f5e9',
  },

  generalTraining: {
    title: "General Training Format",
    details: `**Structure:**\nShorter, workplace & social texts + 1 long passage\n40 questions total\n60 minutes\n\n**Section Breakdown:**\n\n**Section 1: (2-3 short texts)**\n• Notices, advertisements, leaflets\n• Hotel bookings, course descriptions\n• Workplace memos, job advertisements\n• Social situations and everyday life\n\n**Section 2: (2 texts)**\n• Work-related documents\n• Training materials, staff handbooks\n• Professional correspondence\n• Workplace policies and procedures\n\n**Section 3: (1 long text)**\n• General interest topics\n• Newspaper/magazine articles\n• Academic-style content (but more accessible)\n• Opinion pieces and feature articles\n\n**Text Characteristics:**\n• Practical, real-world content\n• Workplace communication focus\n• Progressive difficulty increase\n• Mixture of factual and opinion-based texts`,
    icon: BookIcon,
    bg: '#fff3e0',
  },

  challenges: {
    title: "Key Challenges",
    details: `Major obstacles that test-takers face in IELTS Reading.\n\n**Primary Challenge Areas:**\n• Vocabulary density and academic terminology\n• Paraphrasing and synonym recognition\n• Time management pressure\n• Trap answers and distractors\n\nEach challenge requires specific strategies and practice. Click on individual challenges to learn detailed approaches for overcoming them.`,
    icon: WarningIcon,
    bg: '#ffe0b2',
  },

  vocabularyDensity: {
    title: "Vocabulary Density Challenge",
    details: `**The Challenge:**\nIELTS Reading passages contain high-density academic vocabulary that can overwhelm test-takers.\n\n**What Makes It Difficult:**\n• 15-20% of words may be unfamiliar to non-native speakers\n• Subject-specific terminology (scientific, technical, academic)\n• Abstract concepts requiring contextual understanding\n• Multiple meanings of common words in academic contexts\n• Complex noun phrases and technical descriptions\n\n**Impact on Performance:**\n• Slows down reading speed significantly\n• Causes panic and loss of confidence\n• Leads to misunderstanding of key concepts\n• Results in incorrect answer selection\n\n**Strategies to Overcome:**\n• Focus on understanding main ideas despite unknown words\n• Use context clues and word formation knowledge\n• Identify essential vs. non-essential vocabulary\n• Practice with academic texts regularly\n• Build systematic vocabulary through AWL (Academic Word List)\n• Learn to recognize word families and roots\n\n**Key Insight:**\nYou don't need to understand every word to answer correctly!`,
    icon: BookIcon,
    bg: '#e1f5fe',
  },

  paraphrasing: {
    title: "Paraphrasing & Synonyms Challenge",
    details: `**The Challenge:**\nIELTS deliberately uses different words in questions than in the passage, requiring synonym recognition.\n\n**How Paraphrasing Appears:**\n• Questions use synonyms of passage words\n• Grammatical structures are transformed\n• Ideas are expressed in different ways\n• Abstract concepts become concrete examples\n• Active voice becomes passive voice\n\n**Common Paraphrase Patterns:**\n• "increase" → "rise, grow, expand, surge"\n• "important" → "significant, crucial, essential"\n• "because of" → "due to, owing to, as a result of"\n• "many people think" → "it is widely believed"\n\n**Why It's Challenging:**\n• Requires extensive vocabulary knowledge\n• Tests conceptual understanding, not just word matching\n• Creates confusion between similar but different meanings\n• Demands flexible thinking patterns\n\n**Success Strategies:**\n• Learn word families and semantic groups\n• Practice identifying concept matches vs. word matches\n• Read question first, then scan for concepts (not exact words)\n• Develop paraphrase awareness through practice\n• Study common IELTS synonym patterns`,
    icon: LightbulbIcon,
    bg: '#f3e5f5',
  },

  timeManagement: {
    title: "Time Management Challenge",
    details: `**The Pressure:**\nTime management (20 min per passage guideline) creates intense pressure affecting performance.\n\n**Time Allocation Breakdown:**\n• **Passage 1:** 18-20 minutes (easier, build confidence)\n• **Passage 2:** 20 minutes (moderate difficulty)\n• **Passage 3:** 20-22 minutes (most challenging, may need extra time)\n\n**Why Time Pressure Is Difficult:**\n• 60 minutes for 40 questions = 1.5 minutes per question\n• Need time for reading passages (900 words each)\n• Must process complex information quickly\n• Anxiety increases under time pressure\n• Easy to get stuck on difficult questions\n\n**Time Management Strategies:**\n• **Skim first** (1-2 minutes): Get overall idea\n• **Read questions first**: Know what to look for\n• **Strategic approach**: Easy questions first\n• **Don't get stuck**: Move on if uncertain\n• **Leave time for review**: 2-3 minutes at end\n\n**Critical Time-Savers:**\n• Skip difficult vocabulary, focus on answerable questions\n• Use elimination technique for multiple choice\n• Guess intelligently rather than leave blanks\n• Practice builds automatic time awareness`,
    icon: TargetIcon,
    bg: '#fff8e1',
  },

  trapAnswers: {
    title: "Trap Answers & Distractors",
    details: `**The Challenge:**\nIELTS includes deliberate wrong answers designed to trick test-takers.\n\n**Common Trap Types:**\n\n**1. Word Matching Traps:**\n• Option contains same words as passage but wrong meaning\n• Right words, wrong context or relationship\n• Partial information presented as complete answer\n\n**2. Extreme Language Traps:**\n• "always, never, all, none" when passage says "often, usually"\n• Absolute statements when passage expresses probability\n• Overgeneralization of specific examples\n\n**3. Detail vs. Main Idea Traps:**\n• Minor detail presented as main point\n• Supporting example given as primary argument\n• Opposite of what passage actually states\n\n**4. Out-of-Scope Traps:**\n• Information not mentioned in passage\n• Logical but unsupported conclusions\n• Common knowledge not stated in text\n\n**How to Avoid Traps:**\n• **Read carefully**: Don't jump to conclusions\n• **Check context**: Ensure full understanding\n• **Verify in passage**: Find exact supporting evidence\n• **Question extreme language**: Usually incorrect\n• **Stay within passage scope**: Don't add outside knowledge\n\n**Success Mindset:**\nThe correct answer is ALWAYS supported by passage evidence!`,
    icon: WarningIcon,
    bg: '#ffebee',
  },

};

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
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      {Mindmap}
      {modal && nodeDetails[modal] && (
        <div style={{ 
          position: 'fixed', 
          left: 0, 
          bottom: 0, 
          width: '100vw', 
          height: 'auto', 
          background: 'rgba(255,255,255,0.98)', 
          zIndex: 2000, 
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
            
            {/* Info on the right, horizontal layout, 2 columns */}
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
                    borderRadius: 7, 
                    padding: '8px 18px', 
                    fontWeight: 600, 
                    fontSize: 18, 
                    cursor: 'pointer', 
                    boxShadow: '0 2px 8px #0002', 
                    zIndex: 10 
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{ 
                fontSize: 17, 
                color: '#333', 
                marginTop: 0, 
                whiteSpace: 'pre-wrap', 
                columnCount: 2, 
                columnGap: 40, 
                maxHeight: '480px', 
                overflowY: 'auto', 
                width: '100%' 
              }}>
                {stripMarkdown(removeVisual(nodeDetails[modal].details))}
              </div>
            </div>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ 
          position: 'fixed', 
          zIndex: 1000, 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          background: 'rgba(30,40,60,0.92)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            width: '90vw', 
            height: '90vh', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 4px 32px #0006', 
            position: 'relative', 
            padding: 24, 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <button
              onClick={() => setDetached(false)}
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 24, 
                zIndex: 10, 
                background: '#e53e3e', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 6, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer', 
                boxShadow: '0 2px 8px #0002' 
              }}
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

export default memo(EnhancedReadingMindmap);