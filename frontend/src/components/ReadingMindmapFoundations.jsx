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
    .replace(/^- /gm, '• ')
    .trim();
}

function removeVisual(text) {
  if (!text) return '';
  return text.replace(/\n?Visual:([\s\S]*)$/i, '').trim();
}

// Child map definition - must be defined before use
const getChildMap = () => {
  return {
    foundationsCenter: ["readingSkills", "questionTypes", "vocabulary"],
    readingSkills: ["skimming", "scanning", "closeReading"],
    questionTypes: ["tfngAdvanced", "matchingAdvanced", "completionExpert"],
    vocabulary: ["awlMastery", "topicClusters", "morphology"],
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
  foundationsCenter: '#c8e6c9', // green
  readingSkills: '#a78bfa', // purple
  questionTypes: '#fbbf24', // orange
  vocabulary: '#22d3ee', // cyan
  
  // Reading Skills sub-nodes
  skimming: '#c4b5fd', // light purple
  scanning: '#c4b5fd', // light purple
  closeReading: '#c4b5fd', // light purple
  
  // Question Types sub-nodes
  tfngAdvanced: '#fbbf24', // orange
  matchingAdvanced: '#fbbf24', // orange
  completionExpert: '#fbbf24', // orange
  
  // Vocabulary sub-nodes
  awlMastery: '#22d3ee', // cyan
  topicClusters: '#22d3ee', // cyan
  morphology: '#22d3ee', // cyan
};

// Detailed node information
const nodeDetails = {
  foundationsCenter: {
    title: "Reading Foundation Skills 2025",
    details: `Core skills essential for IELTS Reading success.\n\n**A. Reading Skills Mastery:**\n• Advanced skimming techniques (3-5 seconds per paragraph)\n• Strategic scanning with keyword transformation\n• Close reading for complex inference\n• Speed-accuracy optimization\n\n**B. Question Type Excellence:**\n• True/False/Not Given precision\n• Matching strategies (headings, information, features)\n• Completion task accuracy\n• Multiple choice elimination techniques\n\n**C. Vocabulary Power:**\n• Academic Word List (570 families) mastery\n• Subject-specific terminology\n• Morphological analysis skills\n• Contextual meaning inference\n\n**Practice Framework:**\n- Daily vocabulary building (20 words)\n- Timed skill practice (15 minutes)\n- Error pattern analysis\n- Progressive difficulty increase\n\n**Key Indicators:**\n- 80%+ accuracy on practice questions\n- Consistent timing within limits\n- Confident strategy application`,
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  
  readingSkills: {
    title: "Core Reading Skills",
    details: `Master the fundamental reading techniques for IELTS success.\n\n**Essential Skills:**\n• Skimming for main ideas\n• Scanning for specific information\n• Close reading for detailed comprehension\n\nEach skill serves different purposes and question types. Click on individual skills to learn specific techniques and practice strategies.`,
    icon: BookIcon,
    bg: '#a78bfa',
  },

  skimming: {
    title: "Advanced Skimming Techniques",
    details: `**Purpose:**\nQuickly identify main ideas and overall text structure in 3-5 seconds per paragraph.\n\n**Key Techniques:**\n• Topic sentence identification (usually first or last sentence)\n• Discourse marker recognition for text flow\n• Main idea extraction from complex paragraphs\n• Hierarchical information processing\n• Speed reading with comprehension retention\n• Visual pattern recognition for text organization\n• Selective attention training for relevant content\n\n**When to Use:**\n• Getting overall understanding before detailed reading\n• Matching headings to paragraphs\n• Understanding text structure and organization\n• Time-pressured overview of all passages\n\n**Practice Tips:**\n• Read only first and last sentences of paragraphs\n• Look for topic words and repeated concepts\n• Identify transition signals between ideas\n• Practice with timer: 30 seconds per paragraph\n• Focus on nouns and main verbs, skip descriptive details`,
    icon: LightbulbIcon,
    bg: '#c4b5fd',
  },

  scanning: {
    title: "Strategic Scanning Methods",
    details: `**Purpose:**\nLocate specific information quickly using keyword transformation and synonym recognition.\n\n**Advanced Techniques:**\n• Keyword transformation and synonym anticipation\n• Numerical data location and verification\n• Proper noun identification and cross-referencing\n• Date and time expression recognition\n• Cause-effect relationship tracking\n• Comparison and contrast signal detection\n• Sequential information ordering\n\n**Scanning Strategies:**\n• Move eyes in Z-pattern across text\n• Look for visual cues (capitals, numbers, punctuation)\n• Use finger or cursor to maintain focus\n• Don't read every word - jump between keywords\n• Stop only when you find the target information\n\n**Common Targets:**\n• Names, places, dates, numbers\n• Technical terms and definitions\n• Examples and specific details\n• Statistics and research findings`,
    icon: TargetIcon,
    bg: '#c4b5fd',
  },

  closeReading: {
    title: "Analytical Close Reading",
    details: `**Purpose:**\nDetailed analysis for complex questions requiring inference and precise understanding.\n\n**Close Reading Skills:**\n• Sentence-level grammatical analysis\n• Implicit meaning inference techniques\n• Author intention and tone identification\n• Logical relationship mapping\n• Contradiction detection and resolution\n• Supporting evidence evaluation\n• Critical thinking application\n\n**When to Use:**\n• True/False/Not Given questions\n• Questions requiring inference\n• Author's opinion and attitude questions\n• Complex multiple choice with subtle differences\n• Detail-oriented completion tasks\n\n**Analysis Framework:**\n1. Read the relevant section 2-3 times\n2. Identify key relationships and connections\n3. Look for qualifying words (some, most, all, never)\n4. Consider context and implications\n5. Check for author's stance vs. reported information\n6. Verify exact meaning matches question requirements`,
    icon: BookIcon,
    bg: '#c4b5fd',
  },

  questionTypes: {
    title: "Question Type Excellence",
    details: `Master advanced techniques for all IELTS Reading question types.\n\n**Precision Tasks:**\n• T/F/NG: Micro-analysis for exact matching\n• Y/N/NG: Author stance vs reported views\n• Completion: Grammatical slot prediction\n\n**Complex Matching:**\n• Heading matching: Main idea vs details\n• Information matching: Cross-paragraph synthesis\n• Feature matching: Entity-attribute relationships\n\n**Strategy Application:**\n- Question type identification (2 seconds)\n- Approach selection and execution\n- Evidence verification techniques\n- Time allocation optimization\n\nClick on specific question types to learn detailed strategies.`,
    icon: TargetIcon,
    bg: '#fbbf24',
  },

  tfngAdvanced: {
    title: "True/False/Not Given Excellence",
    details: `**Advanced TFNG Strategies:**\n\n**TRUE:** Statement matches the passage exactly or is a valid paraphrase\n• Look for exact factual correspondence\n• Verify all parts of the statement\n• Check scope and limitations\n\n**FALSE:** Statement contradicts information in the passage\n• Find direct contradiction\n• Check for opposite meaning\n• Verify timing and conditions\n\n**NOT GIVEN:** Information is not mentioned in the passage\n• No evidence either way\n• Cannot be inferred from given information\n• Not stated explicitly or implicitly\n\n**Common Traps:**\n• Mixing personal knowledge with passage content\n• Assuming logical connections not stated\n• Confusing partial truth with complete accuracy\n• Missing qualifying language (some, most, often)\n\n**Analysis Steps:**\n1. Identify key terms in the statement\n2. Locate relevant passage section\n3. Compare statement word-by-word with passage\n4. Check for paraphrases and synonyms\n5. Verify scope and context match exactly`,
    icon: TargetIcon,
    bg: '#fbbf24',
  },

  matchingAdvanced: {
    title: "Advanced Matching Strategies",
    details: `**Heading Matching Excellence:**\n• Main idea vs supporting detail distinction\n• Paragraph unity and coherence assessment\n• Topic sentence vs concluding sentence analysis\n• Abstraction level matching\n• Thematic progression identification\n\n**Information Matching:**\n• Specific detail location and verification\n• Paraphrase relationship identification\n• Cross-paragraph information synthesis\n• Multiple occurrence management\n• Chronological vs thematic organization\n\n**Feature Matching:**\n• Entity-attribute relationship identification\n• Person-opinion-action linkage\n• Cause-effect-solution correlation\n• Research-finding-implication connection\n\n**Strategy Framework:**\n1. Read all options first to understand categories\n2. Skim passage to identify main themes\n3. Work systematically through each paragraph/section\n4. Look for paraphrases, not exact word matches\n5. Use process of elimination\n6. Double-check answers for logical consistency`,
    icon: LightbulbIcon,
    bg: '#fbbf24',
  },

  completionExpert: {
    title: "Completion Task Excellence",
    details: `**Completion Task Mastery:**\n\n**Types of Completion:**\n• Summary completion\n• Note completion\n• Table completion\n• Flow-chart completion\n• Sentence completion\n\n**Key Strategies:**\n• Grammatical slot prediction using syntax knowledge\n• Context-driven term selection\n• Parallel structure completion\n• Word limit compliance (critical!)\n• Exact word extraction without modification\n\n**Grammar Analysis:**\n• Identify required word type (noun, verb, adjective)\n• Check for singular/plural requirements\n• Verify tense and form consistency\n• Ensure grammatical coherence\n\n**Word Limit Rules:**\n• Follow instructions exactly (NO MORE THAN TWO WORDS)\n• Articles (a, an, the) count as words\n• Hyphenated words count as one word\n• Numbers can be written as digits or words\n\n**Success Steps:**\n1. Read the incomplete text to understand context\n2. Predict what type of information is missing\n3. Scan passage for relevant section\n4. Check word limit and grammatical requirements\n5. Verify answer fits logically and grammatically`,
    icon: BookIcon,
    bg: '#fbbf24',
  },

  vocabulary: {
    title: "Vocabulary Power Development",
    details: `Build comprehensive vocabulary for IELTS Reading success.\n\n**Three Pillars:**\n• Academic Word List (AWL) mastery\n• Subject-specific topic clusters\n• Morphological analysis skills\n\n**Vocabulary Strategies:**\n• Contextual meaning inference\n• Word family expansion\n• Collocation patterns\n• Register awareness\n\nSystematic vocabulary development is crucial for handling the dense academic language in IELTS Reading passages. Click on each area to explore specific techniques.`,
    icon: BookIcon,
    bg: '#22d3ee',
  },

  awlMastery: {
    title: "Academic Word List Excellence",
    details: `**AWL Foundation:**\n570 word families essential for academic success\n\n**Mastery Components:**\n• Word families with full derivations\n• Contextual meaning differentiation\n• Collocation patterns and restrictions\n• Register and formality awareness\n• Cross-linguistic interference management\n• Frequency-based priority learning\n• Active vs passive vocabulary development\n\n**Study Strategy:**\n• Learn word families, not individual words\n• Focus on high-frequency AWL words first\n• Study words in context, not isolation\n• Practice recognizing different word forms\n• Build collocational knowledge\n\n**Priority AWL Words for IELTS:**\n• analysis, approach, area, assessment, assume\n• concept, consist, constitute, context, create\n• data, define, derive, distribute, economy\n• environment, establish, estimate, factor, function\n• identify, indicate, individual, interpret, involve\n• method, occur, percent, period, policy\n• principle, procedure, process, require, research\n• significant, similar, source, specific, structure\n\n**Practice Methods:**\n• Flashcards with word families\n• Reading academic texts with AWL focus\n• Vocabulary journals with example sentences\n• Regular self-testing and review`,
    icon: BookIcon,
    bg: '#22d3ee',
  },

  topicClusters: {
    title: "Subject-Specific Vocabulary",
    details: `**IELTS Reading Topic Areas:**\n\n**Science & Technology:**\n• AI, biotechnology, quantum computing\n• Research methodology, scientific process\n• Innovation, breakthrough, development\n\n**Environment & Sustainability:**\n• Climate change, renewable energy\n• Conservation, biodiversity, ecosystem\n• Carbon footprint, greenhouse effect\n\n**Society & Culture:**\n• Urbanization, demographics, migration\n• Cultural preservation, globalization\n• Social institutions, community development\n\n**Education & Learning:**\n• Digital learning, pedagogy, curriculum\n• Assessment methods, educational psychology\n• Literacy, educational technology\n\n**Economics & Business:**\n• Globalization, markets, financial systems\n• Economic indicators, trade, commerce\n• Entrepreneurship, corporate responsibility\n\n**Health & Medicine:**\n• Public health, medical advances, wellness\n• Healthcare systems, preventive medicine\n• Mental health, nutrition, exercise\n\n**Study Approach:**\n• Read articles in each topic area regularly\n• Build topic-specific word banks\n• Learn common academic collocations\n• Practice with IELTS-style passages in each area`,
    icon: LightbulbIcon,
    bg: '#22d3ee',
  },

  morphology: {
    title: "Word Formation Analysis",
    details: `**Morphological Awareness Benefits:**\nUnderstand word structure to decode unfamiliar vocabulary\n\n**Key Components:**\n• Prefix and suffix pattern recognition\n• Root word identification across languages\n• Word family expansion techniques\n• Etymology-based meaning prediction\n• Compound word analysis strategies\n• Conversion and derivation processes\n• False friend identification and avoidance\n\n**Common Prefixes:**\n• un-, dis-, in-/im-/ir-/il- (not, opposite)\n• pre-, post-, ante- (before, after)\n• sub-, super-, inter-, trans- (position/direction)\n• re-, de-, ex- (again, reverse, out)\n\n**Common Suffixes:**\n• -tion, -sion, -ment (nouns from verbs)\n• -ity, -ness, -ism (abstract nouns)\n• -ful, -less, -ous, -ive (adjectives)\n• -ly, -ward, -wise (adverbs)\n• -ize, -ify, -ate (verbs)\n\n**Word Formation Patterns:**\n• analyze → analysis → analytical → analytically\n• create → creation → creative → creatively\n• develop → development → developmental\n• significant → significance → significantly\n\n**Practice Strategy:**\n• Study word families systematically\n• Identify patterns in academic texts\n• Build morphological awareness through etymology\n• Practice breaking down complex words into parts`,
    icon: TargetIcon,
    bg: '#22d3ee',
  },
};

// Node structure definition
const baseNodes = [
  // Center node
  { id: "foundationsCenter", data: { label: "Reading Foundation Skills" }, position: { x: 0, y: 0 }, draggable: true },
  
  // Main branches
  { id: "readingSkills", type: "collapsible", data: { label: "Core Reading Skills" }, position: { x: -300, y: 150 }, draggable: true },
  { id: "questionTypes", type: "collapsible", data: { label: "Question Type Excellence" }, position: { x: 0, y: 150 }, draggable: true },
  { id: "vocabulary", type: "collapsible", data: { label: "Vocabulary Power" }, position: { x: 300, y: 150 }, draggable: true },
  
  // Reading Skills sub-nodes
  { id: "skimming", data: { label: "Advanced Skimming" }, position: { x: -500, y: 250 }, draggable: true },
  { id: "scanning", data: { label: "Strategic Scanning" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "closeReading", data: { label: "Analytical Reading" }, position: { x: -100, y: 250 }, draggable: true },
  
  // Question Types sub-nodes
  { id: "tfngAdvanced", data: { label: "TFNG Excellence" }, position: { x: -150, y: 250 }, draggable: true },
  { id: "matchingAdvanced", data: { label: "Matching Strategies" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "completionExpert", data: { label: "Completion Expertise" }, position: { x: 150, y: 250 }, draggable: true },
  
  // Vocabulary sub-nodes
  { id: "awlMastery", data: { label: "AWL Mastery" }, position: { x: 100, y: 250 }, draggable: true },
  { id: "topicClusters", data: { label: "Topic Clusters" }, position: { x: 300, y: 250 }, draggable: true },
  { id: "morphology", data: { label: "Word Formation" }, position: { x: 500, y: 250 }, draggable: true },
];

const initialEdges = [
  // Main branches from center
  { id: 'e-center-readingSkills', source: 'foundationsCenter', target: 'readingSkills' },
  { id: 'e-center-questionTypes', source: 'foundationsCenter', target: 'questionTypes' },
  { id: 'e-center-vocabulary', source: 'foundationsCenter', target: 'vocabulary' },
  
  // Reading Skills sub-branches
  { id: 'e-readingSkills-skimming', source: 'readingSkills', target: 'skimming' },
  { id: 'e-readingSkills-scanning', source: 'readingSkills', target: 'scanning' },
  { id: 'e-readingSkills-closeReading', source: 'readingSkills', target: 'closeReading' },
  
  // Question Types sub-branches
  { id: 'e-questionTypes-tfng', source: 'questionTypes', target: 'tfngAdvanced' },
  { id: 'e-questionTypes-matching', source: 'questionTypes', target: 'matchingAdvanced' },
  { id: 'e-questionTypes-completion', source: 'questionTypes', target: 'completionExpert' },
  
  // Vocabulary sub-branches
  { id: 'e-vocabulary-awl', source: 'vocabulary', target: 'awlMastery' },
  { id: 'e-vocabulary-topics', source: 'vocabulary', target: 'topicClusters' },
  { id: 'e-vocabulary-morphology', source: 'vocabulary', target: 'morphology' },
];

// Collapsible logic
const COLLAPSIBLE_IDS = ["readingSkills", "questionTypes", "vocabulary"];

const ReadingMindmapFoundations = ({ section = 'foundations' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  // Calculate visible nodes based on expanded state
  const childMapMain = useMemo(() => getChildMap(), []);
  
  // Calculate visible nodes with React useMemo for performance
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["foundationsCenter"]);
    
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    
    childMapMain.foundationsCenter.forEach(addVisible);
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

export default memo(ReadingMindmapFoundations);