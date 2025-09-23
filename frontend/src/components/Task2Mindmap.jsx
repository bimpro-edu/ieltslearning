import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { MiniBarChart } from "./MiniCharts";

// Task 2 Mindmap node details (imported from Task1Mindmap.jsx for now)
const nodeDetails = {
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
    details: `Intro (paraphrase, thesis), Body (topic, explain, example), Conclusion (summary, opinion).\n\nInteractive: Paragraph builder game.`
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
  border: '2px solid #a5d6a7',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 180,
  minHeight: 40,
  cursor: 'pointer',
};

const initialNodes = [
  { id: "t2", data: { label: "Task 2 Mastery (Essay Writing)" }, position: { x: 0, y: 0 }, draggable: true, style: nodeBaseStyle },
  { id: "essayTypes", data: { label: "Essay Types" }, position: { x: -300, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "essayStructure", data: { label: "Essay Structure" }, position: { x: 0, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "skills", data: { label: "Skills & Strategies" }, position: { x: 300, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "vocab", data: { label: "Vocabulary Banks" }, position: { x: -150, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "pitfalls", data: { label: "Common Pitfalls" }, position: { x: 150, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "practice", data: { label: "Practice & Mock Tests" }, position: { x: 0, y: 450 }, draggable: true, style: nodeBaseStyle },
  { id: "interactive", data: { label: "Extra Interactive Layer" }, position: { x: 0, y: 600 }, draggable: true, style: nodeBaseStyle },
];

const initialEdges = [
  { id: "e1", source: "t2", target: "essayTypes" },
  { id: "e2", source: "t2", target: "essayStructure" },
  { id: "e3", source: "t2", target: "skills" },
  { id: "e4", source: "essayTypes", target: "vocab" },
  { id: "essayStructure-pitfalls", source: "essayStructure", target: "pitfalls" },
  { id: "skills-practice", source: "skills", target: "practice" },
  { id: "practice-interactive", source: "practice", target: "interactive" },
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

  const Mindmap = (
    <div style={{ width: "100%", height: "700px", minHeight: 500, position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm font-semibold shadow" onClick={() => setDetached(true)}>
          Detach (Full Screen)
        </button>
      </div>
      <div className="mb-6" style={{ maxHeight: 720, overflowY: "auto" }}>{Mindmap}</div>
      <div style={{ marginTop: 24, background: '#f9f9f9', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001', border: '1px solid #e3e3e3', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', minHeight: 120 }}>
        {details ? (
          <>
            <div className="font-bold text-lg mb-2" style={{ color: '#1b5e20' }}>{details.title}</div>
            <div className="text-sm whitespace-pre-line">{details.details}</div>
            {details.chart && <div className="mt-4">{details.chart}</div>}
            <button className="mt-4 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm font-semibold shadow" onClick={() => setSelected(null)}>Close</button>
          </>
        ) : (
          <div className="text-gray-500 text-base" style={{textAlign:'center',padding:'32px 0'}}>Click a node to see details here.</div>
        )}
      </div>
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
