import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Icons for different node types
const TargetIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#dc2626" strokeWidth="3"/>
    <circle cx="32" cy="32" r="20" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
    <circle cx="32" cy="32" r="12" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
    <circle cx="32" cy="32" r="4" fill="#dc2626"/>
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

const CheckIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#059669" strokeWidth="3"/>
    <path d="M20 32l8 8 16-16" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
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
    taskMasteryCenter: ["precisionTasks", "complexMatching", "advancedMCQ"],
    precisionTasks: ["tfngPrecision", "ynngPrecision", "completionPrecision"],
    complexMatching: ["headingMastery", "infoMatching", "featureMatching"],
    advancedMCQ: ["singleMCQ", "multiMCQ", "shortAnswer"],
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
  taskMasteryCenter: '#fef2f2', // light red
  precisionTasks: '#f87171', // red
  complexMatching: '#a855f7', // purple
  advancedMCQ: '#10b981', // green
  
  // Precision Tasks sub-nodes
  tfngPrecision: '#f87171', // red
  ynngPrecision: '#f87171', // red
  completionPrecision: '#f87171', // red
  
  // Complex Matching sub-nodes
  headingMastery: '#a855f7', // purple
  infoMatching: '#a855f7', // purple
  featureMatching: '#a855f7', // purple
  
  // Advanced MCQ sub-nodes
  singleMCQ: '#10b981', // green
  multiMCQ: '#10b981', // green
  shortAnswer: '#10b981', // green
};

// Detailed node information
const nodeDetails = {
  taskMasteryCenter: {
    title: "Task Type Mastery 2025",
    details: `Advanced techniques for all IELTS Reading question types.\n\n**Precision Tasks:**\n• T/F/NG: Micro-analysis for exact matching\n• Y/N/NG: Author stance vs reported views\n• Completion: Grammatical slot prediction\n\n**Complex Matching:**\n• Heading matching: Main idea vs details\n• Information matching: Cross-paragraph synthesis\n• Feature matching: Entity-attribute relationships\n\n**Advanced MCQ:**\n• Single answer: Distractor elimination\n• Multiple answer: Systematic evaluation\n• Short answer: Concise extraction\n\n**Strategy Application:**\n- Question type identification (2 seconds)\n- Approach selection and execution\n- Evidence verification techniques\n- Time allocation optimization\n\n**Mastery Indicators:**\n- 90%+ accuracy on familiar types\n- Automatic strategy selection\n- Efficient time management\n- Consistent performance under pressure`,
    icon: TargetIcon,
    bg: '#fef2f2',
  },
  
  precisionTasks: {
    title: "Precision Tasks",
    details: `Master high-accuracy question types requiring exact analysis.\n\n**Key Characteristics:**\n• Require precise understanding of text\n• No room for interpretation errors\n• Exact word matching or logical deduction\n• High penalty for mistakes\n\n**Success Factors:**\n• Careful reading of instructions\n• Word-by-word comparison\n• Understanding of qualifying language\n• Attention to scope and context\n\nClick on specific precision tasks to learn detailed techniques.`,
    icon: TargetIcon,
    bg: '#f87171',
  },

  tfngPrecision: {
    title: "True/False/Not Given Precision",
    details: `**Micro-Level Analysis Techniques:**\n\n**TRUE Requirements:**\n• Statement must match passage exactly\n• All parts of statement must be confirmed\n• Check scope, timing, and conditions\n• Verify numerical accuracy if mentioned\n\n**FALSE Requirements:**\n• Direct contradiction must exist\n• Cannot be based on assumptions\n• Look for opposite meanings\n• Check negation and contrasting information\n\n**NOT GIVEN Requirements:**\n• No evidence in either direction\n• Cannot be inferred from given information\n• Avoid using external knowledge\n• Must be genuinely absent from text\n\n**Advanced Analysis:**\n• Qualifying adverb impact (always, sometimes, rarely)\n• Statistical precision vs approximation\n• Temporal accuracy verification\n• Exception and condition identification\n• Scope limitation recognition\n\n**Common Traps:**\n• Partial information presented as complete\n• Mixing factual statements with opinions\n• Assuming logical connections not stated\n• Missing subtle qualifying language\n\n**Success Framework:**\n1. Identify key terms in statement\n2. Locate exact passage section\n3. Compare word-by-word with text\n4. Check for paraphrases and synonyms\n5. Verify scope and context match exactly\n6. Consider qualifying language impact`,
    icon: TargetIcon,
    bg: '#f87171',
  },

  ynngPrecision: {
    title: "Yes/No/Not Given Opinion Analysis",
    details: `**Author Stance vs Reported Views:**\n\n**YES - Author Agrees:**\n• Author expresses personal agreement\n• Clear endorsement of the view\n• Positive evaluation language\n• Supporting evidence provided by author\n\n**NO - Author Disagrees:**\n• Author expresses disagreement\n• Criticism or negative evaluation\n• Counter-arguments presented\n• Evidence against the view\n\n**NOT GIVEN - No Clear Stance:**\n• Author reports views neutrally\n• No personal opinion expressed\n• Presents information without evaluation\n• Multiple viewpoints without taking sides\n\n**Advanced Techniques:**\n• Hedging language interpretation (might, could, seems)\n• Attitude marker recognition (fortunately, surprisingly)\n• Evaluative adjective analysis (impressive, concerning)\n• Modality and certainty levels (definitely, probably)\n• Perspective shift identification within texts\n\n**Linguistic Indicators:**\n• Opinion markers: I believe, in my view, clearly\n• Evaluation: effective, problematic, beneficial\n• Certainty: undoubtedly, possibly, apparently\n• Reporting: according to, research shows, critics argue\n\n**Analysis Steps:**\n1. Identify whose opinion is being questioned\n2. Look for author's personal stance markers\n3. Distinguish between reporting and endorsing\n4. Check for evaluative language\n5. Consider context and overall author position",
    icon: LightbulbIcon,
    bg: '#f87171',
  },

  completionPrecision: {
    title: "Completion Task Accuracy",
    details: `**Grammatical Slot Prediction:**\n\n**Word Form Analysis:**\n• Identify required part of speech (noun, verb, adjective)\n• Check singular/plural requirements\n• Verify tense and form consistency\n• Ensure grammatical coherence\n\n**Context-Driven Selection:**\n• Parallel structure completion\n• Ellipsis and reference resolution\n• Technical term accuracy maintenance\n• Semantic field consistency\n\n**Word Limit Optimization:**\n• Follow instructions exactly (NO MORE THAN TWO WORDS)\n• Articles (a, an, the) count as words\n• Hyphenated words count as one word\n• Numbers can be written as digits or words\n• Compound nouns may be one or two words\n\n**Extraction Strategies:**\n• Exact word extraction without modification\n• Maintain original capitalization\n• Preserve technical terminology\n• Keep compound expressions intact\n\n**Common Completion Types:**\n• Summary completion: main ideas and key details\n• Note completion: factual information\n• Table completion: categorized data\n• Flow-chart completion: process steps\n• Sentence completion: logical flow\n\n**Success Framework:**\n1. Read incomplete text for context understanding\n2. Predict information type and grammatical form\n3. Scan passage for relevant section\n4. Extract exact words respecting limits\n5. Verify grammatical and logical fit\n6. Double-check spelling and form",
    icon: CheckIcon,
    bg: '#f87171',
  },

  complexMatching: {
    title: "Complex Matching Strategies",
    details: `Master sophisticated matching tasks requiring deep comprehension.\n\n**Types of Matching:**\n• Heading matching: paragraph themes\n• Information matching: detail location\n• Feature matching: entity relationships\n\n**Advanced Strategies:**\n• Paraphrase relationship identification\n• Cross-paragraph information synthesis\n• Multiple occurrence management\n• Distractor elimination techniques\n\n**Success Factors:**\n• Understanding abstraction levels\n• Recognizing main vs supporting ideas\n• Managing multiple relationships\n• Systematic approach to options\n\nExplore specific matching types for detailed techniques.`,
    icon: LightbulbIcon,
    bg: '#a855f7',
  },

  headingMastery: {
    title: "Heading Matching Excellence",
    details: `**Main Idea vs Supporting Details:**\n\n**Paragraph Unity Assessment:**\n• Identify the single main theme\n• Distinguish central topic from examples\n• Recognize topic development vs digression\n• Understand paragraph coherence\n\n**Abstraction Level Matching:**\n• Match specific content to general headings\n• Avoid too broad or too narrow options\n• Consider hierarchical relationships\n• Balance detail level appropriately\n\n**Thematic Progression:**\n• Follow argument development\n• Identify cause-effect relationships\n• Recognize problem-solution patterns\n• Track chronological vs logical organization\n\n**Advanced Techniques:**\n• Topic sentence vs concluding sentence analysis\n• Multiple paragraph narrative flow\n• Implicit theme identification\n• Distractor elimination through scope analysis\n\n**Common Paragraph Patterns:**\n• Problem-solution structure\n• Cause-effect explanation\n• Compare-contrast analysis\n• Process description\n• Classification system\n• Example-generalization\n\n**Distractor Types:**\n• Too specific (mentions detail, not main idea)\n• Too broad (covers multiple paragraphs)\n• Partially correct (some elements match)\n• Wrong focus (emphasizes minor point)\n\n**Success Strategy:**\n1. Read paragraph for overall theme\n2. Identify main vs supporting information\n3. Look for topic sentences and key phrases\n4. Match abstraction level to heading options\n5. Eliminate obvious distractors\n6. Choose most comprehensive match",
    icon: TargetIcon,
    bg: '#a855f7',
  },

  infoMatching: {
    title: "Information Matching Strategies",
    details: `**Cross-Paragraph Synthesis:**\n\n**Specific Detail Location:**\n• Paraphrase relationship identification\n• Synonym and concept matching\n• Multiple occurrence management\n• Evidence-claim relationship mapping\n\n**Information Types:**\n• Factual details and statistics\n• Examples and case studies\n• Research findings and data\n• Historical events and dates\n• Technical processes and methods\n\n**Advanced Techniques:**\n• Cross-referencing between sections\n• Chronological vs thematic organization\n• Comparative and contrastive information\n• Implicit vs explicit information\n\n**Search Strategies:**\n• Keyword transformation techniques\n• Scanning for proper nouns and numbers\n• Following pronoun references\n• Tracking subject development\n\n**Multiple Occurrence Handling:**\n• Distinguish between different contexts\n• Identify most relevant mention\n• Check scope and specificity\n• Verify exact match requirements\n\n**Verification Techniques:**\n• Confirm information accuracy\n• Check context appropriateness\n• Verify complete information match\n• Ensure no contradictory evidence\n\n**Success Framework:**\n1. Analyze what type of information is needed\n2. Identify key terms and concepts\n3. Scan systematically through text\n4. Verify match accuracy and completeness\n5. Check for alternative expressions\n6. Confirm contextual appropriateness",
    icon: CheckIcon,
    bg: '#a855f7',
  },

  featureMatching: {
    title: "Feature Matching Expertise",
    details: `**Entity-Attribute Relationships:**\n\n**Complex Relationship Types:**\n• Person-opinion-action linkage\n• Cause-effect-solution correlation\n• Research-finding-implication connection\n• Process-outcome-evaluation chains\n\n**Multiple Attribution Handling:**\n• Track multiple people/sources\n• Distinguish direct vs reported speech\n• Identify primary vs secondary attribution\n• Manage overlapping characteristics\n\n**Advanced Analysis:**\n• Indirect reference resolution\n• Complex relationship network mapping\n• Temporal relationship tracking\n• Conditional relationship identification\n\n**Entity Types in IELTS:**\n• Researchers and their findings\n• Countries and their policies\n• Companies and their innovations\n• Historical figures and their contributions\n• Studies and their conclusions\n\n**Feature Categories:**\n• Characteristics and properties\n• Actions and behaviors\n• Opinions and attitudes\n• Achievements and failures\n• Methods and approaches\n• Results and consequences\n\n**Tracking Techniques:**\n• Create mental relationship maps\n• Note pronoun references\n• Follow subject-verb patterns\n• Track attribution chains\n• Identify relationship signals\n\n**Success Strategy:**\n1. Identify all entities mentioned\n2. Track features/attributes for each\n3. Note relationship indicators\n4. Map complex attribution chains\n5. Verify direct vs indirect connections\n6. Match based on strongest evidence",
    icon: LightbulbIcon,
    bg: '#a855f7',
  },

  advancedMCQ: {
    title: "Advanced Multiple Choice",
    details: `Excel in sophisticated multiple choice questions.\n\n**Question Types:**\n• Single best answer\n• Multiple correct answers\n• Short answer questions\n\n**Advanced Techniques:**\n• Distractor analysis and elimination\n• Evidence strength evaluation\n• Option ranking by likelihood\n• Strategic guessing methods\n\n**Success Factors:**\n• Systematic option evaluation\n• Understanding question requirements\n• Recognizing partial vs complete truth\n• Managing time efficiently\n\nExplore specific MCQ types for detailed strategies.`,
    icon: CheckIcon,
    bg: '#10b981',
  },

  singleMCQ: {
    title: "Single Answer MCQ Mastery",
    details: `**Distractor Analysis Framework:**\n\n**Option Evaluation Process:**\n• Eliminate obviously wrong answers first\n• Identify partially correct but incomplete options\n• Distinguish between facts and opinions\n• Check scope and context requirements\n\n**Distractor Categories:**\n• Complete opposite of correct answer\n• Partially true but incomplete\n• True but from wrong part of text\n• Logical but not supported by passage\n• Contains correct words but wrong meaning\n\n**Evidence Strength Assessment:**\n• Direct statement vs inference\n• Primary vs secondary evidence\n• Recent vs historical information\n• Specific vs general examples\n\n**Advanced Techniques:**\n• Inference vs explicit information distinction\n• Scope and context consideration\n• Partial truth vs complete accuracy\n• Time and condition limitations\n\n**Strategic Approach:**\n• Read question stem carefully\n• Predict answer before looking at options\n• Eliminate wrong answers systematically\n• Compare remaining options carefully\n• Verify answer against passage\n\n**Common Question Types:**\n• Main idea identification\n• Detail verification\n• Inference and implication\n• Author attitude and purpose\n• Vocabulary in context\n\n**Success Framework:**\n1. Understand exactly what's being asked\n2. Locate relevant passage section\n3. Eliminate obviously incorrect options\n4. Compare remaining choices carefully\n5. Select most completely correct answer\n6. Verify against original text",
    icon: TargetIcon,
    bg: '#10b981',
  },

  multiMCQ: {
    title: "Multiple Answer MCQ Excellence",
    details: `**Systematic Evaluation Approach:**\n\n**Requirement Analysis:**\n• Understand how many answers needed\n• Check for minimum/maximum guidelines\n• Identify evaluation criteria\n• Determine relationship between options\n\n**Option Independence:**\n• Evaluate each option separately\n• Avoid assuming mutual exclusivity\n• Check for overlapping categories\n• Consider partial vs complete matches\n\n**Combination Assessment:**\n• Test different answer combinations\n• Verify completeness of selected options\n• Check for contradictory selections\n• Ensure comprehensive coverage\n\n**Advanced Strategies:**\n• Cross-option relationship identification\n• Hierarchical vs equal importance\n• Comprehensive vs selective approach\n• Evidence distribution analysis\n\n**Common Formats:**\n• Choose TWO/THREE from options A-F\n• Select ALL that apply\n• Choose the BEST options\n• Identify MAIN factors\n\n**Verification Techniques:**\n• Check each selected answer independently\n• Verify against question requirements\n• Ensure no contradictions exist\n• Confirm answer completeness\n\n**Success Strategy:**\n1. Read instructions for number required\n2. Evaluate each option against passage\n3. Mark clearly correct options first\n4. Consider borderline cases carefully\n5. Check final selection for completeness\n6. Verify no contradictory answers chosen",
    icon: CheckIcon,
    bg: '#10b981',
  },

  shortAnswer: {
    title: "Short Answer Excellence",
    details: `**Concise Information Extraction:**\n\n**Question Type Analysis:**\n• WHO: Person identification\n• WHAT: Object, concept, or action\n• WHEN: Time, date, or period\n• WHERE: Location or place\n• WHY: Reason or cause\n• HOW: Method or process\n\n**Word Limit Compliance:**\n• Follow exact word limits strictly\n• Count articles and prepositions\n• Use abbreviations when appropriate\n• Maintain essential meaning in fewer words\n\n**Information Prioritization:**\n• Essential vs optional details\n• Specific vs general information\n• Primary vs secondary factors\n• Direct vs indirect responses\n\n**Extraction Accuracy:**\n• Exact word extraction requirements\n• Grammatical accuracy in responses\n• Spelling and capitalization precision\n• Context-appropriate detail level\n\n**Answer Format Guidelines:**\n• Use passage words when possible\n• Maintain original terminology\n• Preserve technical accuracy\n• Keep grammatical consistency\n\n**Common Answer Types:**\n• Single words (names, places, numbers)\n• Short phrases (technical terms, concepts)\n• Brief descriptions (methods, processes)\n• Specific details (dates, quantities, locations)\n\n**Success Framework:**\n1. Identify question type (who, what, where, etc.)\n2. Determine specific information required\n3. Locate relevant passage section\n4. Extract exact words respecting limits\n5. Check grammatical accuracy\n6. Verify spelling and capitalization",
    icon: LightbulbIcon,
    bg: '#10b981',
  },
};

// Node structure definition
const baseNodes = [
  // Center node
  { id: "taskMasteryCenter", data: { label: "Task Type Mastery" }, position: { x: 0, y: 0 }, draggable: true },
  
  // Main branches
  { id: "precisionTasks", type: "collapsible", data: { label: "Precision Tasks" }, position: { x: -300, y: 150 }, draggable: true },
  { id: "complexMatching", type: "collapsible", data: { label: "Complex Matching" }, position: { x: 0, y: 150 }, draggable: true },
  { id: "advancedMCQ", type: "collapsible", data: { label: "Advanced MCQ" }, position: { x: 300, y: 150 }, draggable: true },
  
  // Precision Tasks sub-nodes
  { id: "tfngPrecision", data: { label: "TFNG Precision" }, position: { x: -500, y: 250 }, draggable: true },
  { id: "ynngPrecision", data: { label: "Y/N/NG Mastery" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "completionPrecision", data: { label: "Completion Accuracy" }, position: { x: -100, y: 250 }, draggable: true },
  
  // Complex Matching sub-nodes
  { id: "headingMastery", data: { label: "Heading Mastery" }, position: { x: -150, y: 250 }, draggable: true },
  { id: "infoMatching", data: { label: "Information Matching" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "featureMatching", data: { label: "Feature Matching" }, position: { x: 150, y: 250 }, draggable: true },
  
  // Advanced MCQ sub-nodes
  { id: "singleMCQ", data: { label: "Single Answer MCQ" }, position: { x: 100, y: 250 }, draggable: true },
  { id: "multiMCQ", data: { label: "Multiple Answer MCQ" }, position: { x: 300, y: 250 }, draggable: true },
  { id: "shortAnswer", data: { label: "Short Answer Excellence" }, position: { x: 500, y: 250 }, draggable: true },
];

const initialEdges = [
  // Main branches from center
  { id: 'e-center-precision', source: 'taskMasteryCenter', target: 'precisionTasks' },
  { id: 'e-center-matching', source: 'taskMasteryCenter', target: 'complexMatching' },
  { id: 'e-center-mcq', source: 'taskMasteryCenter', target: 'advancedMCQ' },
  
  // Precision Tasks sub-branches
  { id: 'e-precision-tfng', source: 'precisionTasks', target: 'tfngPrecision' },
  { id: 'e-precision-ynng', source: 'precisionTasks', target: 'ynngPrecision' },
  { id: 'e-precision-completion', source: 'precisionTasks', target: 'completionPrecision' },
  
  // Complex Matching sub-branches
  { id: 'e-matching-heading', source: 'complexMatching', target: 'headingMastery' },
  { id: 'e-matching-info', source: 'complexMatching', target: 'infoMatching' },
  { id: 'e-matching-feature', source: 'complexMatching', target: 'featureMatching' },
  
  // Advanced MCQ sub-branches
  { id: 'e-mcq-single', source: 'advancedMCQ', target: 'singleMCQ' },
  { id: 'e-mcq-multi', source: 'advancedMCQ', target: 'multiMCQ' },
  { id: 'e-mcq-short', source: 'advancedMCQ', target: 'shortAnswer' },
];

// Collapsible logic
const COLLAPSIBLE_IDS = ["precisionTasks", "complexMatching", "advancedMCQ"];

const ReadingMindmapTaskMastery = ({ section = 'taskMastery' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  // Calculate visible nodes based on expanded state
  const childMapMain = useMemo(() => getChildMap(), []);
  
  // Calculate visible nodes with React useMemo for performance
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["taskMasteryCenter"]);
    
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    
    childMapMain.taskMasteryCenter.forEach(addVisible);
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

export default memo(ReadingMindmapTaskMastery);