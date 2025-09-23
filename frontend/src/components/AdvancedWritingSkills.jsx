import React, { useState, useCallback, useEffect, memo } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

// SVG icons
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
  advanced: '#e3f2fd', // main node (blue)
  cohesion: '#c8e6c9', // cohesion branch (green)
  logicalFlow: '#c8e6c9',
  avoidRepetition: '#c8e6c9',
  paragraphUnity: '#c8e6c9',
  linkingDevices: '#c8e6c9',
  linkingGame: '#b2ebf2', // game (cyan)
  reorderChallenge: '#b2ebf2', // game (cyan)
  lexical: '#fff9c4', // lexical branch (yellow)
  vocabFunction: '#fff9c4',
  collocations: '#fff9c4',
  paraphrasing: '#fff9c4',
  avoidRepetitionLex: '#fff9c4',
  paraphraseGame: '#b2ebf2', // game (cyan)
  wordCloud: '#b2ebf2', // game (cyan)
  grammar: '#ede7f6', // grammar branch (purple)
  complexSentences: '#ede7f6',
  passiveVoice: '#ede7f6',
  conditionals: '#ede7f6',
  nominalClauses: '#ede7f6',
  accuracy: '#ede7f6',
  grammarGame: '#b2ebf2', // game (cyan)
  errorQuiz: '#b2ebf2', // game (cyan)
  pitfalls: '#ffe0b2', // pitfalls (orange)
  overuseConnectors: '#ffe0b2',
  vocabMisuse: '#ffe0b2',
  complexClarity: '#ffe0b2',
  bandWash: '#ffe0b2',
  practice: '#f8bbd0', // practice (pink)
  microPractice: '#f8bbd0',
  paragraphRewrites: '#f8bbd0',
  essayRefinement: '#f8bbd0',
  timedTest: '#f8bbd0',
  aiBooster: '#f8bbd0',
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
  advanced: {
    title: "Advanced Writing Skills (IELTS Writing)",
    details: `A comprehensive roadmap for mastering advanced cohesion, vocabulary, grammar, and essay refinement.\n\nExplore each branch for in-depth strategies, practical examples, and interactive activities to boost your IELTS Writing band score.`
  },
  // Cohesion & Coherence
  cohesion: { title: "Cohesion & Coherence", details: `Cohesion and coherence are the glue that holds your essay together.\n\n• Cohesion: How sentences and ideas are linked.\n• Coherence: How logically your ideas flow.\n\nMastering both is essential for Band 7+.\n\nExpand this branch for practical skills and games.` },
  logicalFlow: { title: "Logical Flow of Ideas", details: `Present your arguments in a logical order.\n\nTips:\n- Start with your strongest point.\n- Use clear topic sentences.\n- Each paragraph should build on the previous one.\n\nExample:\n1. Introduce the main idea.\n2. Explain it.\n3. Give an example.\n4. Link to the next idea.` },
  avoidRepetition: { title: "Avoiding Repetition", details: `Repeating the same words or ideas makes your writing dull.\n\nHow to avoid:\n- Use synonyms ("important" → "crucial").\n- Vary sentence structure.\n- Use pronouns and substitutions.\n\nExample:\n❌ Pollution is a problem. Pollution affects health.\n✅ Pollution is a problem. It affects health in many ways.` },
  paragraphUnity: { title: "Paragraph Unity", details: `Each paragraph should focus on one clear idea.\n\nHow to achieve unity:\n- Start with a topic sentence.\n- Support with explanations and examples.\n- End with a concluding sentence.\n\nExample:\n"One major cause of pollution is traffic emissions. These emissions... (support)... In summary, reducing car use is vital."` },
  linkingDevices: { title: "Linking Devices", details: `Connectors help guide the reader.\n\nTypes:\n- Adding: furthermore, moreover\n- Contrasting: however, whereas\n- Cause/Effect: therefore, as a result\n- Sequencing: firstly, finally\n\nTip: Don’t overuse! Use naturally.` },
  linkingGame: { title: "🎮 Linking Word Match Game", details: `Practice using connectors by dragging the correct linking word into blank spaces in sentences.\n\nExample:\n"The number of cars increased, ____, pollution worsened." (Answer: consequently)` },
  reorderChallenge: { title: "🎮 Paragraph Reorder Challenge", details: `Test your sense of logical flow!\n\nArrange shuffled sentences into a coherent paragraph.\n\nTip: Look for topic sentences, connectors, and logical progression.` },
  // Lexical Resource
  lexical: { title: "Lexical Resource (Vocabulary & Paraphrasing)", details: `A wide range of vocabulary and paraphrasing skills are key for Band 7+.\n\nExpand for techniques, examples, and interactive games.` },
  vocabFunction: { title: "Academic Vocabulary by Function", details: `Use precise vocabulary for different functions:\n- Cause/Effect: result in, lead to, due to\n- Comparison: similarly, in contrast\n- Evaluation: significant, negligible\n- Solutions: implement, address, tackle\n\nExample:\n"The government implemented strict regulations to tackle pollution."` },
  collocations: { title: "Collocations", details: `Collocations are word pairs that naturally go together.\n\nExamples:\n- play a vital role\n- impose strict regulations\n- rapid growth\n\nTip: Use collocations to sound more natural and academic.` },
  paraphrasing: { title: "Paraphrasing Techniques", details: `Show variety by paraphrasing.\n\nTechniques:\n- Synonyms: "important" → "crucial"\n- Nominalisation: "pollute" → "pollution"\n- Sentence transformation: "The government should ban X" → "X should be banned by the government."\n\nPractice paraphrasing every main idea in your essay.` },
  avoidRepetitionLex: { title: "Avoiding Repetition (Lexical)", details: `Don’t repeat the same words.\n\nHow to avoid:\n- Use pronouns: "it", "they"\n- Use substitutions: "this issue", "such problems"\n- Use advanced synonyms: "increase" → "surge", "problem" → "challenge"` },
  paraphraseGame: { title: "🎮 Paraphrase Generator Game", details: `Rewrite sentences in your own words.\n\nThe system will score your variety and give feedback.\n\nExample:\nOriginal: "The city has many problems."\nParaphrase: "The urban area faces numerous challenges."` },
  wordCloud: { title: "🎮 Word Cloud Explorer", details: `Click on a key term (e.g., “problem”) to see synonyms and collocations.\n\nTip: Use the word cloud to expand your vocabulary for each essay topic.` },
  // Grammar
  grammar: { title: "Grammar for Higher Bands", details: `Advanced grammar is essential for Band 7+.\n\nExpand for complex structures, accuracy tips, and interactive games.` },
  complexSentences: { title: "Complex Sentences", details: `Use subordination and relative clauses to show range.\n\nExamples:\n- Subordination: "Although pollution is rising, governments..."\n- Relative clause: "The law, which was passed in 2020, reduced emissions."\n\nTip: Don’t make sentences too long or confusing.` },
  passiveVoice: { title: "Passive Voice", details: `Use passive voice for formality and focus.\n\nExamples:\n- "The data was collected by researchers."\n- "Strict laws have been implemented."\n\nTip: Use passive especially in Task 1 and for general statements.` },
  conditionals: { title: "Conditional Sentences", details: `Show hypotheticals and advanced grammar.\n\nExamples:\n- "If governments invested more, pollution would decrease."\n- "Should the government act, results will follow."` },
  nominalClauses: { title: "Nominal Clauses", details: `Use nominal clauses to add complexity.\n\nExample:\n- "It is widely believed that stricter laws are needed."` },
  accuracy: { title: "Common Accuracy Issues", details: `Watch for:\n- Articles: a/an/the\n- Subject–verb agreement\n- Tense consistency\n- Plural forms\n\nTip: Always proofread for these errors!` },
  grammarGame: { title: "🎮 Grammar Transformation Game", details: `Practice changing sentences from active to passive, or from simple to complex.\n\nExample:\n"People pollute rivers." → "Rivers are polluted by people."` },
  errorQuiz: { title: "🎮 Error Correction Quizzes", details: `Find and correct mistakes in Band 5 essays.\n\nExample:\n❌ "He go to school every day."\n✅ "He goes to school every day."` },
  // Pitfalls
  pitfalls: { title: "Common Pitfalls", details: `Avoid these common mistakes that lower your band score.\n\nExpand for details and examples.` },
  overuseConnectors: { title: "Overuse of Connectors", details: `Don’t use a connector in every sentence.\n\nExample:\n❌ "Firstly, pollution is bad. Secondly, it is harmful. Thirdly, it is dangerous."\n✅ Use connectors only when needed to guide the reader.` },
  vocabMisuse: { title: "Vocabulary Misuse", details: `Don’t force synonyms or use collocations incorrectly.\n\nExample:\n❌ "Make a strict regulation" (should be "impose a strict regulation")` },
  complexClarity: { title: "Overly Complex Sentences", details: `Complexity should not reduce clarity.\n\nTip: If a sentence is too long, break it up.\n\nExample:\n❌ "Although pollution is rising and governments are trying to solve it and people are concerned, the problem continues because..."\n✅ Use one main idea per sentence.` },
  bandWash: { title: "Grammar 'Band-Wash'", details: `Don’t use advanced grammar forms unless you can do so accurately.\n\nTip: Simpler and correct is better than complex and wrong.` },
  // Practice
  practice: { title: "Practice & Application", details: `Apply your skills with targeted practice, rewrites, and AI feedback.\n\nExpand for activities and tips.` },
  microPractice: { title: "Targeted Micro-Practice", details: `Drills for linking words, sentence transformation, and vocabulary substitution.\n\nTip: Practice little and often for best results.` },
  paragraphRewrites: { title: "Paragraph Rewrites", details: `Take a weak paragraph and rewrite it to improve coherence, variety, and accuracy.\n\nExample:\nOriginal: "Pollution is bad. It affects people. It is everywhere."\nRewrite: "Pollution is a serious issue that affects people worldwide, causing health and environmental problems."` },
  essayRefinement: { title: "Full Essay Refinement", details: `Take a Band 6 essay and rewrite it to reach Band 7–8.\n\nFocus on improving cohesion, vocabulary, and grammar.\n\nTip: Compare your essay to high-band samples.` },
  timedTest: { title: "Timed Advanced Test", details: `Simulate the real exam: write Task 1 + Task 2 in 1 hour.\n\nFocus on using advanced language and structure.\n\nTip: Review your work after the timer ends.` },
  aiBooster: { title: "AI Band Booster", details: `Upload your essay and get AI-powered suggestions for advanced improvements.\n\nExample feedback:\n- "Replace 'good' with 'beneficial' for higher lexical resource."\n- "Try a complex sentence here for Band 7 grammar."` },
};

const initialNodes = [
  { id: "advanced", data: { label: "Advanced Writing Skills" }, position: { x: 0, y: 0 }, draggable: true },
  // Cohesion & Coherence
  { id: "cohesion", type: "collapsible", data: { label: "Cohesion & Coherence" }, position: { x: -220, y: 120 }, draggable: true },
  { id: "logicalFlow", data: { label: "Logical Flow of Ideas" }, position: { x: -420, y: 220 }, draggable: true },
  { id: "avoidRepetition", data: { label: "Avoiding Repetition" }, position: { x: -220, y: 220 }, draggable: true },
  { id: "paragraphUnity", data: { label: "Paragraph Unity" }, position: { x: -20, y: 220 }, draggable: true },
  { id: "linkingDevices", data: { label: "Linking Devices" }, position: { x: -220, y: 320 }, draggable: true },
  { id: "linkingGame", data: { label: "🎮 Linking Word Match Game" }, position: { x: -420, y: 320 }, draggable: true },
  { id: "reorderChallenge", data: { label: "🎮 Paragraph Reorder Challenge" }, position: { x: -20, y: 320 }, draggable: true },
  // Lexical Resource
  { id: "lexical", type: "collapsible", data: { label: "Lexical Resource" }, position: { x: 0, y: 120 }, draggable: true },
  { id: "vocabFunction", data: { label: "Academic Vocabulary by Function" }, position: { x: -200, y: 220 }, draggable: true },
  { id: "collocations", data: { label: "Collocations" }, position: { x: 0, y: 220 }, draggable: true },
  { id: "paraphrasing", data: { label: "Paraphrasing Techniques" }, position: { x: 200, y: 220 }, draggable: true },
  { id: "avoidRepetitionLex", data: { label: "Avoiding Repetition (Lexical)" }, position: { x: 0, y: 320 }, draggable: true },
  { id: "paraphraseGame", data: { label: "🎮 Paraphrase Generator Game" }, position: { x: -200, y: 320 }, draggable: true },
  { id: "wordCloud", data: { label: "🎮 Word Cloud Explorer" }, position: { x: 200, y: 320 }, draggable: true },
  // Grammar
  { id: "grammar", type: "collapsible", data: { label: "Grammar for Higher Bands" }, position: { x: 220, y: 120 }, draggable: true },
  { id: "complexSentences", data: { label: "Complex Sentences" }, position: { x: 420, y: 220 }, draggable: true },
  { id: "passiveVoice", data: { label: "Passive Voice" }, position: { x: 220, y: 220 }, draggable: true },
  { id: "conditionals", data: { label: "Conditional Sentences" }, position: { x: 20, y: 220 }, draggable: true },
  { id: "nominalClauses", data: { label: "Nominal Clauses" }, position: { x: 220, y: 320 }, draggable: true },
  { id: "accuracy", data: { label: "Common Accuracy Issues" }, position: { x: 420, y: 320 }, draggable: true },
  { id: "grammarGame", data: { label: "🎮 Grammar Transformation Game" }, position: { x: 20, y: 320 }, draggable: true },
  { id: "errorQuiz", data: { label: "🎮 Error Correction Quizzes" }, position: { x: 220, y: 420 }, draggable: true },
  // Pitfalls
  { id: "pitfalls", type: "collapsible", data: { label: "Common Pitfalls" }, position: { x: -120, y: 320 }, draggable: true },
  { id: "overuseConnectors", data: { label: "Overuse of Connectors" }, position: { x: -320, y: 420 }, draggable: true },
  { id: "vocabMisuse", data: { label: "Vocabulary Misuse" }, position: { x: -120, y: 420 }, draggable: true },
  { id: "complexClarity", data: { label: "Overly Complex Sentences" }, position: { x: 80, y: 420 }, draggable: true },
  { id: "bandWash", data: { label: "Grammar 'Band-Wash'" }, position: { x: -120, y: 520 }, draggable: true },
  // Practice
  { id: "practice", type: "collapsible", data: { label: "Practice & Application" }, position: { x: 120, y: 320 }, draggable: true },
  { id: "microPractice", data: { label: "Targeted Micro-Practice" }, position: { x: 320, y: 420 }, draggable: true },
  { id: "paragraphRewrites", data: { label: "Paragraph Rewrites" }, position: { x: 120, y: 420 }, draggable: true },
  { id: "essayRefinement", data: { label: "Full Essay Refinement" }, position: { x: 320, y: 520 }, draggable: true },
  { id: "timedTest", data: { label: "Timed Advanced Test" }, position: { x: 120, y: 520 }, draggable: true },
  { id: "aiBooster", data: { label: "AI Band Booster" }, position: { x: 320, y: 620 }, draggable: true },
].map(n => ({
  ...n,
  style: {
    ...nodeBaseStyle,
    background: nodeBgColors[n.id] || nodeBaseStyle.background,
  },
}));
const initialEdges = [
  // Main branches
  { id: "e-advanced-cohesion", source: "advanced", target: "cohesion" },
  { id: "e-advanced-lexical", source: "advanced", target: "lexical" },
  { id: "e-advanced-grammar", source: "advanced", target: "grammar" },
  { id: "e-advanced-pitfalls", source: "advanced", target: "pitfalls" },
  { id: "e-advanced-practice", source: "advanced", target: "practice" },
  // Cohesion sub-nodes
  { id: "e-cohesion-logicalFlow", source: "cohesion", target: "logicalFlow" },
  { id: "e-cohesion-avoidRepetition", source: "cohesion", target: "avoidRepetition" },
  { id: "e-cohesion-paragraphUnity", source: "cohesion", target: "paragraphUnity" },
  { id: "e-cohesion-linkingDevices", source: "cohesion", target: "linkingDevices" },
  { id: "e-cohesion-linkingGame", source: "cohesion", target: "linkingGame" },
  { id: "e-cohesion-reorderChallenge", source: "cohesion", target: "reorderChallenge" },
  // Lexical sub-nodes
  { id: "e-lexical-vocabFunction", source: "lexical", target: "vocabFunction" },
  { id: "e-lexical-collocations", source: "lexical", target: "collocations" },
  { id: "e-lexical-paraphrasing", source: "lexical", target: "paraphrasing" },
  { id: "e-lexical-avoidRepetitionLex", source: "lexical", target: "avoidRepetitionLex" },
  { id: "e-lexical-paraphraseGame", source: "lexical", target: "paraphraseGame" },
  { id: "e-lexical-wordCloud", source: "lexical", target: "wordCloud" },
  // Grammar sub-nodes
  { id: "e-grammar-complexSentences", source: "grammar", target: "complexSentences" },
  { id: "e-grammar-passiveVoice", source: "grammar", target: "passiveVoice" },
  { id: "e-grammar-conditionals", source: "grammar", target: "conditionals" },
  { id: "e-grammar-nominalClauses", source: "grammar", target: "nominalClauses" },
  { id: "e-grammar-accuracy", source: "grammar", target: "accuracy" },
  { id: "e-grammar-grammarGame", source: "grammar", target: "grammarGame" },
  { id: "e-grammar-errorQuiz", source: "grammar", target: "errorQuiz" },
  // Pitfalls sub-nodes
  { id: "e-pitfalls-overuseConnectors", source: "pitfalls", target: "overuseConnectors" },
  { id: "e-pitfalls-vocabMisuse", source: "pitfalls", target: "vocabMisuse" },
  { id: "e-pitfalls-complexClarity", source: "pitfalls", target: "complexClarity" },
  { id: "e-pitfalls-bandWash", source: "pitfalls", target: "bandWash" },
  // Practice sub-nodes
  { id: "e-practice-microPractice", source: "practice", target: "microPractice" },
  { id: "e-practice-paragraphRewrites", source: "practice", target: "paragraphRewrites" },
  { id: "e-practice-essayRefinement", source: "practice", target: "essayRefinement" },
  { id: "e-practice-timedTest", source: "practice", target: "timedTest" },
  { id: "e-practice-aiBooster", source: "practice", target: "aiBooster" },
];

function AdvancedWritingSkills() {
  const [expanded, setExpanded] = useState({
    cohesion: true,
    lexical: true,
    grammar: true,
    pitfalls: true,
    practice: true,
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState(null);
  const [detached, setDetached] = useState(false);

  // Sub-nodes for each parent
  const parentToChildren = {
    cohesion: ["logicalFlow", "avoidRepetition", "paragraphUnity", "linkingDevices", "linkingGame", "reorderChallenge"],
    lexical: ["vocabFunction", "collocations", "paraphrasing", "avoidRepetitionLex", "paraphraseGame", "wordCloud"],
    grammar: ["complexSentences", "passiveVoice", "conditionals", "nominalClauses", "accuracy", "grammarGame", "errorQuiz"],
    pitfalls: ["overuseConnectors", "vocabMisuse", "complexClarity", "bandWash"],
    practice: ["microPractice", "paragraphRewrites", "essayRefinement", "timedTest", "aiBooster"],
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
              {selected === 'pitfalls' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3e0', borderRadius: 12 }}>
                  <WarningIcon />
                </div>
              ) : selected === 'practice' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <LightbulbIcon />
                </div>
              ) : selected === 'cohesion' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'lexical' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'grammar' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
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

export default AdvancedWritingSkills;
