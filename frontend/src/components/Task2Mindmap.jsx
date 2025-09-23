import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { MiniBarChart } from "./MiniCharts";

// SVG icons for non-chart nodes
const EssayIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="48" height="40" rx="6" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
    <rect x="16" y="20" width="32" height="4" rx="2" fill="#1976d2"/>
    <rect x="16" y="28" width="24" height="4" rx="2" fill="#90caf9"/>
    <rect x="16" y="36" width="20" height="4" rx="2" fill="#90caf9"/>
    <rect x="16" y="44" width="12" height="4" rx="2" fill="#90caf9"/>
  </svg>
);
const WarningIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <polygon points="32,8 60,56 4,56" fill="#ffb300" stroke="#f57c00" strokeWidth="2"/>
    <rect x="29" y="28" width="6" height="16" rx="3" fill="#f57c00"/>
    <circle cx="32" cy="50" r="3" fill="#f57c00"/>
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
const BookIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="20" height="40" rx="4" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <rect x="36" y="12" width="20" height="40" rx="4" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
    <path d="M28 16H12M28 24H12M28 32H12M28 40H12" stroke="#1976d2" strokeWidth="2"/>
    <path d="M52 16H40M52 24H40M52 32H40M52 40H40" stroke="#1976d2" strokeWidth="2"/>
  </svg>
);

// Task 2 Mindmap node details (imported from Task1Mindmap.jsx for now)
const nodeDetails = {
  discussion: {
    title: "Discussion Essay (Discuss Both Views)",
    details: `Present both sides of the argument fairly.\nGive your own opinion clearly.\n\nTips:\n- Use linking words: 'On the one hand...', 'On the other hand...'.\n- State your opinion in the introduction or conclusion.\n- Support both views with examples.\n\nExample: 'While some people think X, others believe Y. In my view, ...'`
  },
  problemSolution: {
    title: "Problem–Solution Essay",
    details: `Identify the main problem(s) and suggest practical solutions.\nExplain why the problem exists and how your solution works.\n\nTips:\n- Use phrases: 'One major problem is...', 'A possible solution is...'.\n- Support solutions with examples.\n\nExample: 'To tackle traffic congestion, cities should improve public transport.'`
  },
  advantagesDisadvantages: {
    title: "Advantages–Disadvantages Essay",
    details: `Discuss both the benefits and drawbacks of a topic.\nGive your opinion if asked.\n\nTips:\n- Use balanced language: 'On the plus side...', 'However, a drawback is...'.\n- Summarize your view in the conclusion.\n\nExample: 'While online learning is convenient, it can reduce social interaction.'`
  },
  doubleQuestion: {
    title: "Double Question Essay",
    details: `Answer both questions fully and equally.\nPlan your structure so each part is clear.\n\nTips:\n- Use clear topic sentences for each part.\n- Avoid mixing answers together.\n\nExample: 'The first issue is..., while another important aspect is...'`
  },
  hybrid: {
    title: "Hybrid Essay",
    details: `Some questions combine types (e.g., Problem + Opinion).\nIdentify all parts and address each clearly.\n\nTips:\n- Plan your answer before writing.\n- Use headings or clear transitions.\n\nExample: 'While X is a problem, I believe Y is the best solution.'`
  },
  planning: {
    title: "Planning & Brainstorming",
    details: `Spend 3–5 minutes planning ideas and structure.\nUse mindmaps, lists, or quick outlines.\n\nTips:\n- Identify main points and supporting examples.\n- Decide your position before writing.\n\nExample: 'Before writing, I list 2–3 main ideas for each body paragraph.'`
  },
  thesis: {
    title: "Thesis & Opinion Clarity",
    details: `Make your position clear in the introduction and maintain it throughout.\nRestate your thesis in the conclusion.\n\nTips:\n- Use direct statements: 'This essay will argue that...'.\n- Avoid vague or contradictory opinions.\n\nExample: 'This essay will argue that stricter laws are needed.'`
  },
  coherence: {
    title: "Coherence & Cohesion",
    details: `Use linking words and logical progression.\nConnect ideas within and between paragraphs.\n\nTips:\n- Use connectors: 'Furthermore', 'However', 'For example'.\n- Start each paragraph with a topic sentence.\n\nExample: 'Furthermore, this trend has led to...'`
  },
  lexical: {
    title: "Lexical Resource",
    details: `Use a range of academic and topic-specific vocabulary.\nParaphrase the question and avoid repetition.\n\nTips:\n- Learn synonyms for common words.\n- Use collocations and precise terms.\n\nExample: 'The government should implement effective policies.'`
  },
  grammar: {
    title: "Grammar Range",
    details: `Use complex sentences, passive voice, and conditionals.\nVary your sentence structures.\n\nTips:\n- Mix simple, compound, and complex sentences.\n- Check for subject-verb agreement.\n\nExample: 'If more people used public transport, pollution would decrease.'`
  },
  miniPractice: {
    title: "Mini-Practice",
    details: `Short, focused writing tasks for each essay type.\nPractice introductions, body paragraphs, or conclusions.\n\nTips:\n- Set a timer for 10–15 minutes.\n- Focus on one skill at a time.\n\nExample: 'Write a body paragraph for an opinion essay on technology.'`
  },
  mockTest: {
    title: "Mock Test",
    details: `Write a full Task 2 essay under exam conditions (40 minutes, 250+ words).\nCheck your timing and structure.\n\nTips:\n- Use a real IELTS prompt.\n- Review your essay for structure, grammar, and vocabulary.\n\nExample: 'Write an essay on the impact of tourism.'`
  },
  bandBenchmark: {
    title: "Band Benchmarking",
    details: `Compare your writing to Band 5–9 sample essays.\nIdentify strengths and areas for improvement.\n\nTips:\n- Read model answers and note their structure and vocabulary.\n- Ask a teacher or peer for feedback.\n\nExample: 'My essay is similar to a Band 7 because it has clear arguments and good vocabulary.'`
  },
  opinion: {
    title: "Opinion Essay (Agree/Disagree)",
    details: `State your opinion clearly in the introduction and conclusion.\nSupport your view with strong arguments and relevant examples.\n\nTips:\n- Use phrases like 'I believe', 'In my opinion'.\n- Address the opposite view briefly.\n- Stay focused on your position throughout.\n\nExample: 'I strongly believe that technology improves our lives.'`
  },
  t2: {
    title: "Task 2 Mastery (Essay Writing)",
    details: `A complete roadmap for IELTS Writing Task 2 essays.\n\nA. Essay Types\n- Opinion Essay (Agree/Disagree)\n- Discussion Essay (Discuss both views + opinion)\n- Problem–Solution Essay\n- Advantages–Disadvantages Essay\n- Double Question Essay (2-part question)\n- (Optional: Hybrid types, e.g., Problem + Opinion)\n\n🎮 Interactive: Essay Classifier Game — drag IELTS questions into the right essay type category.\n\nB. Essay Structure\n- Introduction: Paraphrasing, thesis\n- Body Paragraphs: Topic, explanation, example\n- Conclusion: Summary, restated opinion\n\n🎮 Interactive: Paragraph Builder — reorder sentences into a logical essay paragraph.\n\nC. Skills & Strategies\n- Planning & Brainstorming\n- Thesis & Opinion Clarity\n- Coherence & Cohesion (linking words)\n- Lexical Resource (academic vocab)\n- Grammar Range (complex sentences)\n\n🎮 Interactive: Linking Word Selector — choose best linking phrase for flow.\n\nD. Vocabulary Banks\n- Opinion: I strongly believe, It is widely argued…\n- Cause & Effect: leads to, results in…\n- Solutions: implement, enforce…\n- Comparisons: whereas, in contrast…\n\n🎮 Interactive: Vocab Fill-in Game — fill blanks in sentences with academic words.\n\nE. Common Pitfalls\n- Off-topic, too general, unclear thesis, word count < 250, repetition, grammar slips.\n\nF. Practice & Tests\n- Mini-practice by essay type\n- Full mock test (timed, 250+ words)\n- Band benchmarking: compare to Band 5–9 samples\n\nG. 🚀 Extra Interactive Layer\n- AI Essay Scoring, Peer Review Swap, Highlighting Exercise.\n\n✅ Flow: Essay Types → Structure → Skills → Vocab → Pitfalls → Practice/Mock Test.`
  },
  essayTypes: {
    title: "Essay Types",
    details: `Opinion, Discussion, Problem–Solution, Advantages–Disadvantages, Double Question, Hybrid.\n\nInteractive: Classifier game for essay questions.`, 
    chart: <MiniBarChart height={200} />
  },
  essayStructure: {
    title: "Essay Structure",
    details: `A clear structure is essential for a high-scoring Task 2 essay.\n\n- Introduction: Paraphrase the question and state your thesis.\n- Body Paragraphs: Each covers one main idea, with explanation and example.\n- Conclusion: Summarize your main points and restate your opinion.\n\nExplore each part below.`
  },
  introduction: {
    title: "Introduction",
    details: `1. Paraphrase the question using your own words.\n2. Clearly state your opinion or thesis.\n\nTips:\n- Avoid copying the prompt directly.\n- Keep it concise (2–3 sentences).\n\nExample:\nPrompt: 'Some people think... others believe... Discuss both views and give your opinion.'\nIntro: 'While some argue X, others believe Y. This essay will discuss both perspectives and explain why I support Y.'`
  },
  bodyParagraph: {
    title: "Body Paragraph",
    details: `Each body paragraph should focus on one main idea.\n\nStructure:\n- Topic sentence (main idea)\n- Explanation (why/how)\n- Example (real or hypothetical)\n\nTips:\n- Start with a clear topic sentence.\n- Use linking words (Firstly, Moreover, However, For example).\n\nExample:\n'The main reason is that technology improves efficiency. For instance, many companies use software to automate tasks, saving time and money.'`
  },
  conclusion: {
    title: "Conclusion",
    details: `Summarize your main points and restate your opinion.\n\nTips:\n- Do not add new ideas.\n- Use summary phrases (In conclusion, To sum up).\n\nExample:\n'In conclusion, while both views have merit, I believe that... because...'.`
  },
  skills: {
    title: "Skills & Strategies",
    details: `Planning, thesis clarity, cohesion, vocab, grammar.\n\nInteractive: Linking word selector.`
  },
  vocab: {
    title: "Vocabulary Banks",
    details: `Opinion, cause/effect, solutions, comparisons.\n\nInteractive: Vocab fill-in game.`
  },
  pitfalls: {
    title: "Common Pitfalls",
    details: `Off-topic, too general, unclear thesis, word count < 250, repetition, grammar slips.`
  },
  offTopic: {
    title: "Off-topic / Not Answering",
    details: `A common reason for low scores is not fully addressing the question.\n\nTips:\n- Carefully analyze the prompt.\n- Underline keywords.\n- Check your thesis and topic sentences match the question.\n\nExample: If the question is about 'advantages and disadvantages', don't just write your opinion.`
  },
  weakThesis: {
    title: "Weak or Unclear Thesis",
    details: `Your thesis should clearly state your position or answer the question.\n\nTips:\n- Avoid vague statements.\n- Make your main idea obvious in the introduction.\n\nExample: 'This essay will discuss both views and give my opinion.' (Too vague)\nBetter: 'This essay will argue that stricter laws are needed to reduce pollution.'`
  },
  noExamples: {
    title: "No or Weak Examples",
    details: `Examples support your arguments and make them convincing.\n\nTips:\n- Use specific, relevant examples.\n- Avoid generic phrases like 'for example, people...'.\n\nExample: 'For instance, Singapore reduced littering by introducing fines.'`
  },
  repetition: {
    title: "Repetition",
    details: `Repeating ideas or words lowers your score for lexical resource and coherence.\n\nTips:\n- Use synonyms and paraphrase.\n- Plan your main points to avoid repeating them.\n\nExample: Instead of repeating 'important', use 'crucial', 'vital', 'significant'.`
  },
  underWordCount: {
    title: "Under Word Count (<250)",
    details: `Essays under 250 words are penalized.\n\nTips:\n- Always check your word count.\n- Add an extra example or explanation if short.\n\nExample: Practice writing essays to 270–290 words to be safe.`
  },
  grammarErrors: {
    title: "Grammar / Spelling Errors",
    details: `Frequent grammar or spelling mistakes reduce clarity and band score.\n\nTips:\n- Review common grammar points (tenses, agreement, articles).\n- Proofread your essay if time allows.\n\nExample: 'He go to school' (incorrect) → 'He goes to school' (correct).`
  },
  practice: {
    title: "Practice & Mock Tests",
    details: `Mini-practice by type, full mock test, band benchmarking.`
  },
  interactive: {
    title: "Extra Interactive Layer",
    details: `AI scoring, peer review, highlighting exercise.`
  },
};

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

// Mindmap node and edge arrays
const initialNodes = [
  // Sub-nodes for pitfalls
  { id: "offTopic", data: { label: "Off-topic/Not Answering" }, position: { x: 420, y: 400 }, draggable: true, style: nodeBaseStyle },
  { id: "weakThesis", data: { label: "Weak/Unclear Thesis" }, position: { x: 420, y: 440 }, draggable: true, style: nodeBaseStyle },
  { id: "noExamples", data: { label: "No/Weak Examples" }, position: { x: 420, y: 480 }, draggable: true, style: nodeBaseStyle },
  { id: "repetition", data: { label: "Repetition" }, position: { x: 420, y: 520 }, draggable: true, style: nodeBaseStyle },
  { id: "underWordCount", data: { label: "Under Word Count" }, position: { x: 420, y: 560 }, draggable: true, style: nodeBaseStyle },
  { id: "grammarErrors", data: { label: "Grammar/Spelling Errors" }, position: { x: 420, y: 600 }, draggable: true, style: nodeBaseStyle },
  { id: "t2", data: { label: "Task 2 Mastery (Essay Writing)" }, position: { x: 0, y: 0 }, draggable: true, style: nodeBaseStyle },
  { id: "essayTypes", data: { label: "Essay Types" }, position: { x: -220, y: 120 }, draggable: true, style: nodeBaseStyle },
  { id: "essayStructure", data: { label: "Essay Structure" }, position: { x: 220, y: 120 }, draggable: true, style: nodeBaseStyle },
  { id: "introduction", data: { label: "Introduction" }, position: { x: 420, y: 80 }, draggable: true, style: nodeBaseStyle },
  { id: "bodyParagraph", data: { label: "Body Paragraph" }, position: { x: 420, y: 120 }, draggable: true, style: nodeBaseStyle },
  { id: "conclusion", data: { label: "Conclusion" }, position: { x: 420, y: 160 }, draggable: true, style: nodeBaseStyle },
  { id: "skills", data: { label: "Skills & Strategies" }, position: { x: 0, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "vocab", data: { label: "Vocabulary Banks" }, position: { x: -220, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "pitfalls", data: { label: "Common Pitfalls" }, position: { x: 220, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "practice", data: { label: "Practice & Mock Tests" }, position: { x: 0, y: 420 }, draggable: true, style: nodeBaseStyle },
  { id: "interactive", data: { label: "Extra Interactive Layer" }, position: { x: 0, y: 540 }, draggable: true, style: nodeBaseStyle },
  // Sub-nodes for essay types
  { id: "opinion", data: { label: "Opinion Essay" }, position: { x: -420, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "discussion", data: { label: "Discussion Essay" }, position: { x: -320, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "problemSolution", data: { label: "Problem–Solution Essay" }, position: { x: -220, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "advantagesDisadvantages", data: { label: "Advantages–Disadvantages" }, position: { x: -120, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "doubleQuestion", data: { label: "Double Question Essay" }, position: { x: -20, y: 220 }, draggable: true, style: nodeBaseStyle },
  { id: "hybrid", data: { label: "Hybrid Essay" }, position: { x: 80, y: 220 }, draggable: true, style: nodeBaseStyle },
  // Sub-nodes for skills
  { id: "planning", data: { label: "Planning & Brainstorming" }, position: { x: -120, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "thesis", data: { label: "Thesis & Opinion Clarity" }, position: { x: 0, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "coherence", data: { label: "Coherence & Cohesion" }, position: { x: 120, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "lexical", data: { label: "Lexical Resource" }, position: { x: -120, y: 420 }, draggable: true, style: nodeBaseStyle },
  { id: "grammar", data: { label: "Grammar Range" }, position: { x: 120, y: 420 }, draggable: true, style: nodeBaseStyle },
  // Sub-nodes for practice
  { id: "miniPractice", data: { label: "Mini-Practice" }, position: { x: -120, y: 520 }, draggable: true, style: nodeBaseStyle },
  { id: "mockTest", data: { label: "Mock Test" }, position: { x: 0, y: 520 }, draggable: true, style: nodeBaseStyle },
  { id: "bandBenchmark", data: { label: "Band Benchmarking" }, position: { x: 120, y: 520 }, draggable: true, style: nodeBaseStyle },
];

const initialEdges = [
  // Pitfalls sub-branches
  { id: "e-pitfalls-offTopic", source: "pitfalls", target: "offTopic" },
  { id: "e-pitfalls-weakThesis", source: "pitfalls", target: "weakThesis" },
  { id: "e-pitfalls-noExamples", source: "pitfalls", target: "noExamples" },
  { id: "e-pitfalls-repetition", source: "pitfalls", target: "repetition" },
  { id: "e-pitfalls-underWordCount", source: "pitfalls", target: "underWordCount" },
  { id: "e-pitfalls-grammarErrors", source: "pitfalls", target: "grammarErrors" },
  { id: "e-t2-essayTypes", source: "t2", target: "essayTypes" },
  { id: "e-t2-essayStructure", source: "t2", target: "essayStructure" },
  // Essay Structure sub-branches
  { id: "e-essayStructure-introduction", source: "essayStructure", target: "introduction" },
  { id: "e-essayStructure-bodyParagraph", source: "essayStructure", target: "bodyParagraph" },
  { id: "e-essayStructure-conclusion", source: "essayStructure", target: "conclusion" },
  { id: "e-t2-skills", source: "t2", target: "skills" },
  { id: "e-t2-vocab", source: "t2", target: "vocab" },
  { id: "e-t2-pitfalls", source: "t2", target: "pitfalls" },
  { id: "e-t2-practice", source: "t2", target: "practice" },
  { id: "e-t2-interactive", source: "t2", target: "interactive" },
  // Essay types sub-branches
  { id: "e-essayTypes-opinion", source: "essayTypes", target: "opinion" },
  { id: "e-essayTypes-discussion", source: "essayTypes", target: "discussion" },
  { id: "e-essayTypes-problemSolution", source: "essayTypes", target: "problemSolution" },
  { id: "e-essayTypes-advantagesDisadvantages", source: "essayTypes", target: "advantagesDisadvantages" },
  { id: "e-essayTypes-doubleQuestion", source: "essayTypes", target: "doubleQuestion" },
  { id: "e-essayTypes-hybrid", source: "essayTypes", target: "hybrid" },
  // Skills sub-branches
  { id: "e-skills-planning", source: "skills", target: "planning" },
  { id: "e-skills-thesis", source: "skills", target: "thesis" },
  { id: "e-skills-coherence", source: "skills", target: "coherence" },
  { id: "e-skills-lexical", source: "skills", target: "lexical" },
  { id: "e-skills-grammar", source: "skills", target: "grammar" },
  // Practice sub-branches
  { id: "e-practice-miniPractice", source: "practice", target: "miniPractice" },
  { id: "e-practice-mockTest", source: "practice", target: "mockTest" },
  { id: "e-practice-bandBenchmark", source: "practice", target: "bandBenchmark" },
];

function Task2Mindmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState(null);
  const [detached, setDetached] = useState(false);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.id);
  }, []);

  const details = selected ? nodeDetails[selected] : null;

  // Visual element for each node
  function getVisual(selected) {
    if (selected === 'essayTypes') return <EssayIcon />;
    if (selected === 'essayStructure') return <BookIcon />;
    if (selected === 'skills') return <LightbulbIcon />;
    if (selected === 'vocab') return <BookIcon />;
    if (selected === 'pitfalls') return <WarningIcon />;
    if (selected === 'practice') return <EssayIcon />;
    if (selected === 'interactive') return <LightbulbIcon />;
    if (selected === 't2') return <EssayIcon />;
    return null;
  }

  // Chips for vocab node
  const vocabChips = [
    'I strongly believe', 'It is widely argued', 'In my view', 'leads to', 'results in', 'due to', 'as a result',
    'implement', 'enforce', 'address', 'tackle', 'whereas', 'in contrast', 'similarly', 'on the other hand',
    'significant', 'considerable', 'controversial', 'perspective', 'justify'
  ];

  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={onNodeClick}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {selected && details && (
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
              {/* Show chart if present in nodeDetails, else show icon */}
              {details.chart ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  {details.chart}
                </div>
              ) : selected === 'vocab' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'opinion' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'discussion' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'problemSolution' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <LightbulbIcon />
                </div>
              ) : selected === 'advantagesDisadvantages' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'doubleQuestion' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'hybrid' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffde7', borderRadius: 12 }}>
                  <LightbulbIcon />
                </div>
              ) : selected === 'planning' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <LightbulbIcon />
                </div>
              ) : selected === 'thesis' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'coherence' ? (
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
              ) : selected === 'miniPractice' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'mockTest' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'bandBenchmark' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'offTopic' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <WarningIcon />
                </div>
              ) : selected === 'weakThesis' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'noExamples' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'repetition' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              ) : selected === 'underWordCount' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <EssayIcon />
                </div>
              ) : selected === 'grammarErrors' ? (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffecb3', borderRadius: 12 }}>
                  <WarningIcon />
                </div>
              ) : getVisual(selected)}
            </div>
            {/* Info on the right */}
            <div style={{ flex: '0 0 62%', maxWidth: '62%', minWidth: 320, width: 'auto', marginLeft: 0, wordBreak: 'break-word', whiteSpace: 'pre-line', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{details.title}</div>
              {selected === 'vocab' ? (
                <>
                  <div style={{ fontSize: 20, marginBottom: 12 }}>{details.details.split('Essential vocabulary for Task 2 essays.')[1]?.trim().split('Tips:')[0]}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    {vocabChips.map(word => (
                      <span key={word} style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: 8,
                        padding: '6px 14px',
                        fontSize: 18,
                        fontWeight: 500,
                        border: '1px solid #90caf9',
                        marginBottom: 4
                      }}>{word}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 18, color: '#333', marginTop: 8 }}>{details.details.split('Tips:')[1]}</div>
                </>
              ) : (
                <div style={{ fontSize: 24, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{details.details}</div>
              )}
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

export default Task2Mindmap;
