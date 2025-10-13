import React, { useState, useCallback, useEffect, memo, useMemo, useRef } from 'react';
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
    .replace(/\b(.*?)\((.*?)\)/g, '$1')
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
    advancedAccordion: ["grammaticalRange", "lexicalResource", "taskResponse"],
    grammaticalRange: ["complexStructures", "variedTenses", "conditionalClauses"],
    lexicalResource: ["topicSpecificVocab", "collocations", "idiomaticLanguage"],
    taskResponse: ["addressingThePrompt", "developingIdeas", "clearPosition"],
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
  advancedAccordion: '#e3f2fd', // light blue
  grammaticalRange: '#d1c4e9', // light purple
  lexicalResource: '#c8e6c9', // light green
  taskResponse: '#fff9c4', // light yellow

  complexStructures: '#d1c4e9',
  variedTenses: '#d1c4e9',
  conditionalClauses: '#d1c4e9',

  topicSpecificVocab: '#c8e6c9',
  collocations: '#c8e6c9',
  idiomaticLanguage: '#c8e6c9',

  addressingThePrompt: '#fff9c4',
  developingIdeas: '#fff9c4',
  clearPosition: '#fff9c4',
};

// Detailed node information
const nodeDetails = {
    advancedAccordion: {
        title: "Advanced Writing Skills",
        details: `This section focuses on elevating your writing from good to great. We will explore three core pillars of advanced writing: **Grammatical Range & Accuracy**, **Lexical Resource**, and **Task Response**. Mastering these areas is key to achieving a high band score in IELTS Writing.`,
        icon: TargetIcon,
        bg: '#e3f2fd',
    },
    grammaticalRange: {
        title: "Grammatical Range & Accuracy",
        details: `Demonstrating a wide range of grammatical structures is crucial. This involves using complex sentences, a variety of tenses, and conditional clauses accurately and appropriately. Examiners look for a mix of simple, compound, and complex sentences. Over-reliance on simple sentences will result in a lower score.`,
        icon: LightbulbIcon,
        bg: '#d1c4e9',
    },
    lexicalResource: {
        title: "Lexical Resource",
        details: "A rich vocabulary is essential for high-level writing. This includes using topic-specific vocabulary, natural collocations, and idiomatic language effectively.",
        icon: CheckIcon,
        bg: '#c8e6c9',
    },
    topicSpecificVocab: {
        title: "Topic-Specific Vocabulary",
        details: `Using precise and topic-relevant vocabulary is a hallmark of a high-band score. Instead of using general words, aim for words and phrases that are specific to the topic of the essay.

**General vs. Specific:**
- *General:* The problem of pollution is getting worse.
- *Specific:* The issue of **environmental degradation**, driven by **carbon emissions** and **industrial waste**, is reaching a critical point.

**Examples by Topic:**
- *Environment:* biodiversity, deforestation, sustainable agriculture, renewable energy, carbon footprint.
- *Technology:* artificial intelligence, automation, cybersecurity, digital divide, data privacy.
- *Education:* pedagogical approaches, curriculum development, lifelong learning, standardized testing, virtual classrooms.`,
        icon: CheckIcon,
        bg: '#c8e6c9',
    },
    collocations: {
        title: "Collocations",
        details: `Collocations are words that naturally go together. Using them makes your language sound more fluent and natural to a native speaker.

**Common Collocations:**
- *make* a decision, *make* progress
- *take* an exam, *take* a break
- *heavy* traffic, *heavy* rain
- *strong* opinion, *strong* accent

**Adverb-Adjective:**
- *highly* successful
- *deeply* concerned
- *fully* aware

**Verb-Noun:**
- *commit* a crime
- *express* an opinion
- *pose* a threat`,
        icon: CheckIcon,
        bg: '#c8e6c9',
    },
    idiomaticLanguage: {
        title: "Idiomatic Language",
        details: `Idiomatic language involves using phrases where the meaning is not obvious from the individual words. Use them sparingly and only when you are confident of their meaning and context.

**Examples:**
- *a double-edged sword:* something that has both advantages and disadvantages.
  - "Globalization is a **double-edged sword**; it promotes cultural exchange but can also lead to the loss of local traditions."
- *on the other hand:* to present a contrasting point.
  - "On the one hand, technology connects us. **On the other hand**, it can lead to social isolation."
- *play a crucial role:* to be very important.
  - "Education **plays a crucial role** in a country's development."`,
        icon: CheckIcon,
        bg: '#c8e6c9',
    },
    taskResponse: {
        title: "Task Response",
        details: "This assesses how well you have addressed the task. It involves fully addressing all parts of the prompt, developing and supporting your ideas, and presenting a clear and consistent position.",
        icon: TargetIcon,
        bg: '#fff9c4',
    },
    complexStructures: {
        title: "Complex Structures",
        details: `Using a variety of complex sentence structures, such as relative clauses, subordinate clauses, and participle phrases, demonstrates your grammatical proficiency. 

**Relative Clauses:**
- *Defining:* The man **who is standing over there** is my brother.
- *Non-defining:* My brother, **who is a doctor**, lives in London.

**Subordinate Clauses:**
- *Adverbial:* **Although it was raining**, we went for a walk.
- *Noun:* I don't know **what you mean**.

**Participle Phrases:**
- *Present:* **Feeling tired**, I went to bed early.
- *Past:* **Built in the 19th century**, the house is now a museum.`,
        icon: LightbulbIcon,
        bg: '#d1c4e9',
    },
    variedTenses: {
        title: "Varied Tenses",
        details: `Using a range of tenses appropriately shows your control over grammar. 

**Present Perfect vs. Past Simple:**
- *Present Perfect:* I **have visited** Paris three times. (experience)
- *Past Simple:* I **visited** Paris last year. (specific time)

**Future Forms:**
- *will:* I think it **will rain** tomorrow. (prediction)
- *be going to:* I **am going to study** abroad next year. (plan)
- *Future Continuous:* This time next week, I **will be sitting** on a beach. (action in progress in the future)

**Past Perfect:**
- By the time I arrived, the train **had already left**. (action that happened before another past action)`,
        icon: LightbulbIcon,
        bg: '#d1c4e9',
    },
    conditionalClauses: {
        title: "Conditional Clauses",
        details: `Conditionals (if-clauses) are a key feature of advanced grammar. They allow you to express hypothetical situations, consequences, and possibilities.

**Zero Conditional:** (General truths)
- If you **heat** water to 100 degrees, it **boils**.

**First Conditional:** (Real future possibilities)
- If I **study** hard, I **will pass** the exam.

**Second Conditional:** (Unreal present or future situations)
- If I **had** a million dollars, I **would travel** the world.

**Third Conditional:** (Unreal past situations)
- If I **had studied** harder, I **would have passed** the exam.`,
        icon: LightbulbIcon,
        bg: '#d1c4e9',
    },
    addressingThePrompt: {
        title: "Addressing the Prompt",
        details: "It is crucial to answer all parts of the question in the prompt. Underline the key words in the prompt to ensure you have covered everything. For example, if the prompt asks for 'advantages and disadvantages', you must discuss both.",
        icon: TargetIcon,
        bg: '#fff9c4',
    },
    developingIdeas: {
        title: "Developing Ideas",
        details: "Your ideas should be well-supported with explanations, examples, and evidence. Each paragraph should have a clear main idea, which is then developed with supporting details.",
        icon: TargetIcon,
        bg: '#fff9c4',
    },
    clearPosition: {
        title: "Clear Position",
        details: "Your position or point of view should be clear throughout the essay. This is especially important in opinion and discussion essays. The reader should not be left wondering what your opinion is.",
        icon: TargetIcon,
        bg: '#fff9c4',
    },
};

// Node structure definition
const baseNodes = [
  // Center node
  { id: "advancedAccordion", data: { label: "Advanced Writing Skills" }, position: { x: 0, y: 0 }, draggable: true },
  
  // Main branches
  { id: "grammaticalRange", type: "collapsible", data: { label: "Grammatical Range" }, position: { x: -300, y: 150 }, draggable: true },
  { id: "lexicalResource", type: "collapsible", data: { label: "Lexical Resource" }, position: { x: 0, y: 150 }, draggable: true },
  { id: "taskResponse", type: "collapsible", data: { label: "Task Response" }, position: { x: 300, y: 150 }, draggable: true },
  
  // Grammatical Range sub-nodes
  { id: "complexStructures", data: { label: "Complex Structures" }, position: { x: -500, y: 250 }, draggable: true },
  { id: "variedTenses", data: { label: "Varied Tenses" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "conditionalClauses", data: { label: "Conditional Clauses" }, position: { x: -100, y: 250 }, draggable: true },
  
  // Lexical Resource sub-nodes
  { id: "topicSpecificVocab", data: { label: "Topic-Specific Vocab" }, position: { x: -150, y: 250 }, draggable: true },
  { id: "collocations", data: { label: "Collocations" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "idiomaticLanguage", data: { label: "Idiomatic Language" }, position: { x: 150, y: 250 }, draggable: true },
  
  // Task Response sub-nodes
  { id: "addressingThePrompt", data: { label: "Addressing the Prompt" }, position: { x: 100, y: 250 }, draggable: true },
  { id: "developingIdeas", data: { label: "Developing Ideas" }, position: { x: 300, y: 250 }, draggable: true },
  { id: "clearPosition", data: { label: "Clear Position" }, position: { x: 500, y: 250 }, draggable: true },
];

const initialEdges = [
  // Main branches from center
  { id: 'e-center-grammar', source: 'advancedAccordion', target: 'grammaticalRange' },
  { id: 'e-center-lexical', source: 'advancedAccordion', target: 'lexicalResource' },
  { id: 'e-center-task', source: 'advancedAccordion', target: 'taskResponse' },
  
  // Grammatical Range sub-branches
  { id: 'e-grammar-complex', source: 'grammaticalRange', target: 'complexStructures' },
  { id: 'e-grammar-tenses', source: 'grammaticalRange', target: 'variedTenses' },
  { id: 'e-grammar-conditionals', source: 'grammaticalRange', target: 'conditionalClauses' },
  
  // Lexical Resource sub-branches
  { id: 'e-lexical-vocab', source: 'lexicalResource', target: 'topicSpecificVocab' },
  { id: 'e-lexical-collocations', source: 'lexicalResource', target: 'collocations' },
  { id: 'e-lexical-idiomatic', source: 'lexicalResource', target: 'idiomaticLanguage' },
  
  // Task Response sub-branches
  { id: 'e-task-addressing', source: 'taskResponse', target: 'addressingThePrompt' },
  { id: 'e-task-developing', source: 'taskResponse', target: 'developingIdeas' },
  { id: 'e-task-position', source: 'taskResponse', target: 'clearPosition' },
];

// Collapsible logic
const COLLAPSIBLE_IDS = ["grammaticalRange", "lexicalResource", "taskResponse"];

const AdvancedAccordion = ({ section = 'advanced' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);
  const allNodesRef = useRef(baseNodes.map(n => ({ ...n })));

  const childMapMain = useMemo(() => getChildMap(), []);

  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(['advancedAccordion']);
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    childMapMain.advancedAccordion.forEach(addVisible);
    return visibleIds;
  }, [expanded, childMapMain]);

  const handleToggle = useCallback(id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const visibleNodes = useMemo(() => {
    return baseNodes
      .filter(n => visibleNodeIds.has(n.id))
      .map(n => {
        const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
        const existingNode = allNodesRef.current.find(refNode => refNode.id === n.id);
        return {
          ...n,
          position: existingNode ? existingNode.position : n.position,
          type: hasChildren ? 'collapsible' : undefined,
          data: {
            ...n.data,
            isExpanded: expanded[n.id] ?? true,
            onToggle: handleToggle,
            hasChildren: hasChildren,
          },
        };
      });
  }, [visibleNodeIds, expanded, childMapMain, handleToggle]);

  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  useEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  const handleNodesChange = changes => {
    onNodesChange(changes);
    changes.forEach(change => {
      if (change.type === 'position' && change.position) {
        const nodeToUpdate = allNodesRef.current.find(n => n.id === change.id);
        if (nodeToUpdate) {
          nodeToUpdate.position = change.position;
        }
      }
    });
  };

  const onNodeClick = useCallback((event, node) => {
    const hasChildren = childMapMain[node.id] && childMapMain[node.id].length > 0;
    if (nodeDetails[node.id] && !hasChildren) {
      setModal(node.id);
    } else if (nodeDetails[node.id] && hasChildren) {
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
        onNodesChange={handleNodesChange}
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

export default memo(AdvancedAccordion);
