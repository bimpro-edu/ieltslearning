import React, { useState, useCallback, useMemo, memo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

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

const nodeBgColors = {
  taskMasteryCenter: '#e3f2fd',
  tfng: '#f8bbd0',
  matchingHeadings: '#c8e6c9',
  summaryCompletion: '#ffe0b2',
  mcq: '#ede7f6',
  matchingInfo: '#fff9c4',
  shortAnswer: '#b3e5fc',
};

const CollapsibleNode = memo((props) => {
  const { id, data, style, className } = props;
  const { isExpanded, onToggle, hasChildren, label, onNodeClick } = data;
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', ...(style || {}) }}
      className={className}
      onClick={e => {
        // Only open modal for left click, and not when dragging or clicking button
        if (e.target.tagName === 'BUTTON') return;
        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && onNodeClick) {
          e.stopPropagation();
          onNodeClick(id);
        }
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600 }}>{label}</div>
      {hasChildren && (
        <button
          style={{ marginLeft: 8, padding: '2px 10px', borderRadius: 6, background: '#e3f2fd', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          onClick={e => { e.stopPropagation(); onToggle(id); }}
        >
          {isExpanded ? '−' : '+'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
// Move nodeTypes outside component to avoid React Flow error
const nodeTypes = { collapsible: CollapsibleNode };

const COLLAPSIBLE_IDS = ["taskMastery", "tfng", "matching", "summaryCompletion", "mcq", "shortAnswer"];

const nodeDetails = {
  prediction: {
    title: "Prediction, Paraphrase, Grammar",
    details: "Step-by-Step Strategy:\n- Predict possible answers based on context and grammar.\n- Recognize paraphrased information and synonyms.\n- Apply grammar awareness to select or write correct answers.\n\nTips:\n- Practice identifying paraphrases and synonyms.\n- Review grammar rules for completion and choice tasks.\n- Use prediction to anticipate answer types and formats.",
    bg: '#ffe0b2',
  },
  matchingHeadings: {
    title: "Matching Headings",
    details: "Step-by-Step Strategy:\n- Skim each paragraph for the main idea.\n- Match the paragraph to the most suitable heading.\n- Eliminate headings that don't fit.\n\nTips:\n- Focus on topic sentences and overall theme.\n- Watch for paraphrased headings and synonyms.\n- Practice with sample texts for speed and accuracy.",
    bg: '#c8e6c9',
  },
  skimming: {
    title: "Skimming, Recognizing paragraph focus",
    details: "Step-by-Step Strategy:\n- Quickly read for the main idea of each paragraph.\n- Identify topic sentences and paragraph focus.\n- Use skimming to answer organization and structure questions.\n\nTips:\n- Don't get stuck on details—look for the big picture.\n- Practice skimming for speed.\n- Use skimming to save time on test day.",
    bg: '#c8e6c9',
  },
  ynng: {
    title: "Yes/No/Not Given",
    details: "Step-by-Step Strategy:\n- Read the question carefully to determine what is being asked.\n- Scan the passage for keywords and synonyms.\n- Decide if the statement matches (Yes), contradicts (No), or is not mentioned (Not Given).\n\nTips:\n- Answers must be based only on the passage, not your own knowledge.\n- Watch for paraphrasing and subtle differences.\n- Practice with sample Y/N/NG questions.",
    bg: '#ffcdd2',
  },
  scanning: {
    title: "Scanning, Literal comprehension",
    details: "Step-by-Step Strategy:\n- Quickly look for specific words, numbers, or phrases in the passage.\n- Focus on finding exact matches or closely related information.\n- Use scanning to answer factual and localized questions.\n\nTips:\n- Practice scanning for keywords.\n- Don't read every word—move your eyes quickly over the text.\n- Use scanning to save time on test day.",
    bg: '#bbdefb',
  },
  part1_walkthrough: {
    title: "Example Walkthrough (Part 1)",
    details: "See a step-by-step example with text and audio readout for factual & localized information tasks.",
    bg: '#e3f2fd',
  },
  part1_test: {
    title: "Interactive Test (Part 1)",
    details: "Try a drag-drop or highlight test for factual & localized information skills.",
    bg: '#e3f2fd',
  },
  part1_drill: {
    title: "Timed Drill (Part 1)",
    details: "Practice a timed drill (10–12 min) for factual & localized information tasks.",
    bg: '#e3f2fd',
  },
  part2_walkthrough: {
    title: "Example Walkthrough (Part 2)",
    details: "See a step-by-step example with text and audio readout for structural understanding tasks.",
    bg: '#e3f2fd',
  },
  part2_test: {
    title: "Interactive Test (Part 2)",
    details: "Try a drag-drop or highlight test for structural understanding skills.",
    bg: '#e3f2fd',
  },
  part2_drill: {
    title: "Timed Drill (Part 2)",
    details: "Practice a timed drill (10–12 min) for structural understanding tasks.",
    bg: '#e3f2fd',
  },
  part3_walkthrough: {
    title: "Example Walkthrough (Part 3)",
    details: "See a step-by-step example with text and audio readout for completion & choice tasks.",
    bg: '#e3f2fd',
  },
  part3_test: {
    title: "Interactive Test (Part 3)",
    details: "Try a drag-drop or highlight test for completion & choice skills.",
    bg: '#e3f2fd',
  },
  part3_drill: {
    title: "Timed Drill (Part 3)",
    details: "Practice a timed drill (10–12 min) for completion & choice tasks.",
    bg: '#e3f2fd',
  },
  part1: {
    title: "Part 1: Factual & Localized Information",
    details: `Focus: Locating precise data in short sections\n\nKey Question Types:\n- True/False/Not Given\n- Yes/No/Not Given\n- Short Answers\n\nTypical Skills:\n- Scanning\n- Literal comprehension\n\nEach part can have:\n🎧 Example walkthrough (with text + audio readout)\n🧩 Interactive test (drag-drop, highlight)\n🕓 Timed drill (10–12 min)`,
    bg: nodeBgColors.tfng,
  },
  part2: {
    title: "Part 2: Structural Understanding",
    details: `Focus: Understanding passage organization\n\nKey Question Types:\n- Matching Headings\n- Matching Information/Features\n\nTypical Skills:\n- Skimming for main idea\n- Recognizing paragraph focus\n\nEach part can have:\n🎧 Example walkthrough (with text + audio readout)\n🧩 Interactive test (drag-drop, highlight)\n🕓 Timed drill (10–12 min)`,
    bg: nodeBgColors.matchingHeadings,
  },
  part3: {
    title: "Part 3: Completion & Choice Tasks",
    details: `Focus: Synthesizing multiple ideas\n\nKey Question Types:\n- Summary/Note/Table Completion\n- Multiple Choice Questions\n\nTypical Skills:\n- Prediction\n- Paraphrase recognition\n- Grammar awareness\n\nEach part can have:\n🎧 Example walkthrough (with text + audio readout)\n🧩 Interactive test (drag-drop, highlight)\n🕓 Timed drill (10–12 min)`,
    bg: nodeBgColors.summaryCompletion,
  },
  tfng: {
    title: "True/False/Not Given",
    details: "Step-by-Step Strategy:\n- Look for factual statements in the question.\n- Beware of paraphrasing in the passage.\n- Always stick to the text, not your own knowledge.\n\nTrap: Assuming your knowledge—answers must be based only on the passage.\n\nTips:\n- Scan for keywords and match meaning, not just words.\n- Watch for synonyms and paraphrases.\n- Practice with sample TFNG questions.",
    bg: nodeBgColors.tfng,
  },
  headingMatching: {
    title: "Heading Matching",
    details: `**Purpose:**\nMatch each paragraph to the most suitable heading by identifying main ideas.\n\n**Key Techniques:**\n• Skim for topic sentences and main ideas\n• Distinguish between main idea and supporting details\n• Eliminate headings that don't fit\n• Look for paraphrased headings and synonyms\n\n**Practice Tips:**\n• Read all headings before starting\n• Skim each paragraph quickly\n• Focus on overall theme, not minor details\n• Practice with sample texts for speed and accuracy`,
    bg: nodeBgColors.matchingHeadings,
  },
  informationMatching: {
    title: "Information Matching",
    details: `**Purpose:**\nFind specific information in the passage and match it to the correct paragraph or section.\n\n**Key Techniques:**\n• Scan for keywords and synonyms\n• Read surrounding sentences for context\n• Use process of elimination\n• Manage multiple occurrences\n\n**Practice Tips:**\n• Highlight keywords in the question\n• Scan passage for matches\n• Double-check context to avoid traps\n• Practice with tables and lists`,
    bg: nodeBgColors.matchingInfo,
  },
  featureMatching: {
    title: "Feature Matching",
    details: `**Purpose:**\nMatch entities (people, places, things) to their features, actions, or opinions.\n\n**Key Techniques:**\n• Identify entity-attribute relationships\n• Track cause-effect and solution links\n• Use cross-referencing for multiple features\n• Look for paraphrased information\n\n**Practice Tips:**\n• Read all features before scanning\n• Use tables or charts to organize matches\n• Practice with sample feature matching tasks`,
    bg: nodeBgColors.matchingInfo,
  },
  summaryCompletion: {
    title: "Summary/Note/Table Completion",
    details: "Step-by-Step Strategy:\n- Predict the grammar and type of missing word (noun, verb, adjective).\n- Skim the summary/table for structure.\n- Scan the text for matching information.\n- Watch the word limit (one word / two words).\n\nTips:\n- Answers may be paraphrased.\n- Follow instructions carefully.\n- Practice with different formats.",
    bg: nodeBgColors.summaryCompletion,
  },
  mcq: {
    title: "Multiple Choice",
    details: "Step-by-Step Strategy:\n- Read all options before choosing.\n- Locate the relevant part of the text.\n- Eliminate wrong answers by spotting subtle differences.\n\nTips:\n- Watch for distractors.\n- Answers may be paraphrased.\n- Practice with MCQ samples.",
    bg: nodeBgColors.mcq,
  },
  matchingInfo: {
    title: "Matching Information/Features",
    details: "Step-by-Step Strategy:\n- Match details to paragraphs (look for synonyms, not exact matches).\n- Scan for keywords and read surrounding sentences for context.\n- Use process of elimination.\n\nTips:\n- Information may be paraphrased.\n- Double-check your matches.\n- Practice with tables and lists.",
    bg: nodeBgColors.matchingInfo,
  },
  shortAnswer: {
    title: "Short Answers",
    details: "Step-by-Step Strategy:\n- Write concise answers using information from the text.\n- Use only the required number of words.\n- Check spelling and grammar—spelling errors = wrong.\n\nTips:\n- Answers must come from the passage.\n- Follow word limits strictly.\n- Practice with sample short answer tasks.",
    bg: nodeBgColors.shortAnswer,
  },
};

const baseNodes = [
  // Main Part nodes
  { id: "taskMastery", type: "collapsible", data: { label: "Task Mastery (Reorganized into 3 Parts)" }, position: { x: 0, y: 0 }, draggable: true, style: { background: nodeBgColors.taskMasteryCenter } },
  { id: "part1", type: "collapsible", data: { label: "Part 1: Factual & Localized Information" }, position: { x: -400, y: 100 }, draggable: true, style: { background: '#bbdefb' } },
  { id: "part2", type: "collapsible", data: { label: "Part 2: Structural Understanding" }, position: { x: 0, y: 100 }, draggable: true, style: { background: '#c8e6c9' } },
  { id: "part3", type: "collapsible", data: { label: "Part 3: Completion & Choice Tasks" }, position: { x: 400, y: 100 }, draggable: true, style: { background: '#ffe0b2' } },
  // Part 1 children
  { id: "tfng", data: { label: "True/False/Not Given" }, position: { x: -600, y: 220 }, draggable: true, style: { background: '#ffcdd2' } },
  { id: "ynng", data: { label: "Yes/No/Not Given" }, position: { x: -500, y: 220 }, draggable: true, style: { background: '#ffcdd2' } },
  { id: "shortAnswer", data: { label: "Short Answers" }, position: { x: -400, y: 220 }, draggable: true, style: { background: '#bbdefb' } },
  { id: "scanning", data: { label: "Scanning, Literal comprehension" }, position: { x: -300, y: 220 }, draggable: true, style: { background: '#bbdefb' } },
  { id: "part1_walkthrough", data: { label: "🎧 Example Walkthrough" }, position: { x: -600, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part1_test", data: { label: "🧩 Interactive Test" }, position: { x: -500, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part1_drill", data: { label: "🕓 Timed Drill" }, position: { x: -400, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  // Part 2 children
  { id: "matchingHeadings", data: { label: "Matching Headings" }, position: { x: -100, y: 220 }, draggable: true, style: { background: '#c8e6c9' } },
  { id: "matchingInfo", data: { label: "Matching Information/Features" }, position: { x: 0, y: 220 }, draggable: true, style: { background: '#c8e6c9' } },
  { id: "skimming", data: { label: "Skimming, Recognizing paragraph focus" }, position: { x: 100, y: 220 }, draggable: true, style: { background: '#c8e6c9' } },
  { id: "part2_walkthrough", data: { label: "🎧 Example Walkthrough" }, position: { x: -100, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part2_test", data: { label: "🧩 Interactive Test" }, position: { x: 0, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part2_drill", data: { label: "🕓 Timed Drill" }, position: { x: 100, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  // Part 3 children
  { id: "summaryCompletion", data: { label: "Summary/Note/Table Completion" }, position: { x: 200, y: 220 }, draggable: true, style: { background: '#ffe0b2' } },
  { id: "mcq", data: { label: "Multiple Choice Questions" }, position: { x: 300, y: 220 }, draggable: true, style: { background: '#ffe0b2' } },
  { id: "prediction", data: { label: "Prediction, Paraphrase, Grammar" }, position: { x: 400, y: 220 }, draggable: true, style: { background: '#ffe0b2' } },
  { id: "part3_walkthrough", data: { label: "🎧 Example Walkthrough" }, position: { x: 200, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part3_test", data: { label: "🧩 Interactive Test" }, position: { x: 300, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
  { id: "part3_drill", data: { label: "🕓 Timed Drill" }, position: { x: 400, y: 320 }, draggable: true, style: { background: '#e3f2fd' } },
];

const initialEdges = [
  // Only unique edges
  { id: 'e-taskMastery-part1', source: 'taskMastery', target: 'part1' },
  { id: 'e-taskMastery-part2', source: 'taskMastery', target: 'part2' },
  { id: 'e-taskMastery-part3', source: 'taskMastery', target: 'part3' },
  // Part 1 edges
  { id: 'e-part1-tfng', source: 'part1', target: 'tfng' },
  { id: 'e-part1-ynng', source: 'part1', target: 'ynng' },
  { id: 'e-part1-shortAnswer', source: 'part1', target: 'shortAnswer' },
  { id: 'e-part1-scanning', source: 'part1', target: 'scanning' },
  { id: 'e-part1-walkthrough', source: 'part1', target: 'part1_walkthrough' },
  { id: 'e-part1-test', source: 'part1', target: 'part1_test' },
  { id: 'e-part1-drill', source: 'part1', target: 'part1_drill' },
  // Part 2 edges
  { id: 'e-part2-matchingHeadings', source: 'part2', target: 'matchingHeadings' },
  { id: 'e-part2-matchingInfo', source: 'part2', target: 'matchingInfo' },
  { id: 'e-part2-skimming', source: 'part2', target: 'skimming' },
  { id: 'e-part2-walkthrough', source: 'part2', target: 'part2_walkthrough' },
  { id: 'e-part2-test', source: 'part2', target: 'part2_test' },
  { id: 'e-part2-drill', source: 'part2', target: 'part2_drill' },
  // Part 3 edges
  { id: 'e-part3-summaryCompletion', source: 'part3', target: 'summaryCompletion' },
  { id: 'e-part3-mcq', source: 'part3', target: 'mcq' },
  { id: 'e-part3-prediction', source: 'part3', target: 'prediction' },
  { id: 'e-part3-walkthrough', source: 'part3', target: 'part3_walkthrough' },
  { id: 'e-part3-test', source: 'part3', target: 'part3_test' },
  { id: 'e-part3-drill', source: 'part3', target: 'part3_drill' },
];

const getChildMap = () => ({
  taskMastery: ["part1", "part2", "part3"],
  part1: ["tfng", "ynng", "shortAnswer", "scanning", "part1_walkthrough", "part1_test", "part1_drill"],
  part2: ["matchingHeadings", "matchingInfo", "skimming", "part2_walkthrough", "part2_test", "part2_drill"],
  part3: ["summaryCompletion", "mcq", "prediction", "part3_walkthrough", "part3_test", "part3_drill"],
  matching: ["headingMatching", "informationMatching", "featureMatching"],
});

const TaskMasteryMindmap = () => {
  const [expanded, setExpanded] = useState(() => ({
    taskMastery: true,
    part1: true,
    part2: true,
    part3: true,
    tfng: true,
    ynng: true,
    shortAnswer: true,
    matchingHeadings: true,
    matchingInfo: true,
    summaryCompletion: true,
    mcq: true,
    scanning: true,
    skimming: true,
    prediction: true,
  }));
  const [modal, setModal] = useState(null);
  const [detached, setDetached] = useState(false);
  const childMapMain = useMemo(() => getChildMap(), []);
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["taskMastery"]);
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    childMapMain.taskMastery.forEach(addVisible);
    return visibleIds;
  }, [expanded, childMapMain]);
  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);
  const visibleNodes = useMemo(() => {
    return baseNodes.filter(n => visibleNodeIds.has(n.id)).map(n => {
      const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
      return {
        ...n,
        type: "collapsible",
        data: {
          ...n.data,
          isExpanded: expanded[n.id] ?? true,
          onToggle: handleToggle,
          hasChildren: hasChildren,
          onNodeClick: (id) => {
            if (nodeDetails[id]) setModal(id);
          },
        },
      };
    });
  }, [visibleNodeIds, expanded, childMapMain, handleToggle]);
  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds]);
  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);
  React.useEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);
  const onNodeClick = useCallback((event, node) => {
    if (nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);
  return (
    <>
      {!detached && (
        <div style={{ width: '100%', height: '700px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
          <button style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: '#e3f2fd', border: 'none', borderRadius: 8, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setDetached(true)}>
            Detached View
          </button>
          <ReactFlow
            nodes={nodes.map(n => ({
              ...n,
              draggable: true,
              style: {
                ...nodeBaseStyle,
                background: n.style?.background || nodeBaseStyle.background,
              },
            }))}
            edges={edges}
            nodeTypes={nodeTypes}
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
      )}
      {modal && nodeDetails[modal] && (
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', background: 'rgba(255,255,255,0.98)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #90caf980', padding: 32, maxWidth: 800, width: '100%', textAlign: 'left', position: 'relative', display: 'flex', gap: 24 }}>
            {/* Left icon area */}
            <div style={{ flex: '0 0 80px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: 80 }}>
              {/* Placeholder for icon, can be replaced with actual icon if available */}
              <div style={{ width: 64, height: 64, borderRadius: 16, background: nodeDetails[modal].bg || '#f8bbd0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* You can add an SVG or icon here if available */}
              </div>
            </div>
            {/* Right content area */}
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>{nodeDetails[modal].title}</h2>
              {/* Parse details into sections: Purpose, How to do it, When to use, Pro Tips */}
              {parseModalDetails(nodeDetails[modal].details)}
            </div>
            <button style={{ position: 'absolute', top: 24, right: 24, background: '#ef5350', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer', zIndex: 10 }} onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(255,255,255,0.98)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 16, boxShadow: '0 2px 32px #90caf980', position: 'relative', padding: 24 }}>
            <button style={{ position: 'absolute', top: 24, right: 24, background: '#e3f2fd', border: 'none', borderRadius: 8, padding: '4px 12px', fontWeight: 600, cursor: 'pointer', zIndex: 10 }} onClick={() => setDetached(false)}>
              Close Detached
            </button>
            <ReactFlow
              nodes={nodes.map(n => ({
                ...n,
                draggable: true,
                style: {
                  ...nodeBaseStyle,
                  background: n.style?.background || nodeBaseStyle.background,
                },
              }))}
              edges={edges}
              nodeTypes={nodeTypes}
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
        </div>
      )}
    </>
  );
}

// (moved export to end of file)

// Helper to parse modal details into formatted sections
function parseModalDetails(details) {
  const sectionTitles = ["Purpose:", "How to do it:", "When to use:", "Pro Tips:"];
  const lines = details.split(/\n|\r\n/);
  let sections = [];
  let current = null;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const found = sectionTitles.find(t => trimmed.startsWith(t) || trimmed.startsWith("**" + t));
    if (found) {
      if (current) sections.push(current);
      current = { title: found.replace("**", ""), content: [] };
      current.content.push(trimmed.replace(/\*\*/g, "").replace(found, "").trim());
    } else if (current) {
      current.content.push(trimmed.replace(/\*\*/g, ""));
    } else {
      current = { title: "Purpose:", content: [trimmed.replace(/\*\*/g, "")] };
    }
  });
  if (current) sections.push(current);
  return (
    <div>
      {sections.map((sec, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          {sec.title && <div style={{ color: '#1976d2', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{sec.title}</div>}
          {sec.content.map((c, i) => (
            <div key={i} style={{ fontSize: 16, marginLeft: 8 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(TaskMasteryMindmap);
