import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Node details for each node id
const nodeDetails = {
  t1: {
    title: "Task 1 Mastery (Academic)",
    details: `Covers all major IELTS Academic Task 1 visuals: charts, processes, maps, and integrated practice. Includes interactive tools and mini-tests to build real exam skills.`
  },
  charts: {
    title: "Graphs & Charts (Data Representation)",
    details: `Includes line graphs, bar charts, pie charts, tables, mixed/stacked/area/bubble/scatter charts. Focus: describing trends, comparisons, proportions, and relationships. Interactive: Match chart type to writing approach.`
  },
  line: {
    title: "Line Graphs",
    details: `Show trends over time (e.g., sales from 2000-2020). Key skills: describing increases, decreases, fluctuations, and overall patterns.`
  },
  bar: {
    title: "Bar Charts",
    details: `Compare quantities across categories (vertical/horizontal). Useful for group comparisons, ranking, and highlighting differences.`
  },
  pie: {
    title: "Pie Charts",
    details: `Show proportions/percentages of a whole. Focus on largest/smallest segments, majorities/minorities, and overall distribution.`
  },
  table: {
    title: "Tables",
    details: `Present raw numbers for multiple variables. Skills: comparing values, identifying highs/lows, and summarizing key data points.`
  },
  mixed: {
    title: "Mixed Graphs",
    details: `Combine two or more chart types (e.g., line + bar, pie + table). Requires integrating information from multiple visuals.`
  },
  stacked: {
    title: "Stacked Bar/Column Charts",
    details: `Show breakdowns by subcategories within each bar/column. Useful for analyzing composition and changes over time.`
  },
  area: {
    title: "Area Graphs",
    details: `Display cumulative trends and totals over time. Emphasize overall growth or decline.`
  },
  scatter: {
    title: "Scatter/Bubble Charts",
    details: `Show relationships/correlations between two (scatter) or three (bubble) variables. Less common, but test ability to describe patterns and outliers.`
  },
  process: {
    title: "Processes & Diagrams (Flow / Mechanisms)",
    details: `Covers natural, manufacturing, and mechanical processes. Focus: describing sequences, using connectors, and explaining mechanisms. Interactive: Drag sequencing words into diagram steps.`
  },
  natural: {
    title: "Natural Processes",
    details: `E.g., water cycle, animal life cycle. Skills: using passive voice, sequencing, and scientific vocabulary.`
  },
  manufacturing: {
    title: "Manufacturing Processes",
    details: `E.g., coffee production, brick making, recycling. Focus: describing machinery, materials, and step-by-step flow.`
  },
  mechanical: {
    title: "Mechanical Diagrams",
    details: `E.g., engine systems, solar panels, hydroelectric plants. Skills: explaining technical functions and cause-effect relationships.`
  },
  maps: {
    title: "Maps & Spatial Representations",
    details: `Includes static, before/after, and comparative maps. Focus: describing locations, changes, and spatial relationships. Interactive: Before/after slider with transformation writing.`
  },
  static: {
    title: "Static Maps",
    details: `Describe a single layout/location (e.g., a city center). Skills: using prepositions, directions, and spatial vocabulary.`
  },
  beforeafter: {
    title: "Before/After Maps",
    details: `Show development, modernization, or urban changes. Focus: describing transformations, additions, removals, and comparisons.`
  },
  comparative: {
    title: "Comparative Maps",
    details: `Compare different places or time periods. Skills: highlighting similarities, differences, and trends.`
  },
  test: {
    title: "Mini-Test 1 (Integrated Practice)",
    details: `Practice with a chart, process, and map under exam-like conditions. Write 150+ words, highlight key features, use a word counter, and compare with model answers.`
  },
  testFeatures: {
    title: "Highlight Key Features",
    details: `Identify and highlight 3–5 essential features before writing. System checks coverage for feedback.`
  },
  testCounter: {
    title: "Word Counter (150+)",
    details: `Live word count tool to ensure you meet the minimum requirement. Encourages concise, complete writing.`
  },
  testComparison: {
    title: "Band Comparison Tool",
    details: `Unlock model answers at Band 5, 7, and 9 for comparison after submission. Learn what makes a high-scoring response.`
  }
};

const nodes = [
  { id: "t1", data: { label: "Task 1 Mastery (Academic)" }, position: { x: 0, y: 0 }, style: { borderRadius: 12, padding: 10, background: "#e0f7fa", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" } },
  { id: "charts", data: { label: "Graphs & Charts" }, position: { x: -300, y: -100 }, style: { background: "#fff3e0", borderRadius: 10, padding: 8 } },
  { id: "line", data: { label: "Line Graphs" }, position: { x: -500, y: -200 } },
  { id: "bar", data: { label: "Bar Charts" }, position: { x: -500, y: -150 } },
  { id: "pie", data: { label: "Pie Charts" }, position: { x: -500, y: -100 } },
  { id: "table", data: { label: "Tables" }, position: { x: -500, y: -50 } },
  { id: "mixed", data: { label: "Mixed Graphs" }, position: { x: -500, y: 0 } },
  { id: "stacked", data: { label: "Stacked Bar/Column" }, position: { x: -500, y: 50 } },
  { id: "area", data: { label: "Area Graphs" }, position: { x: -500, y: 100 } },
  { id: "scatter", data: { label: "Scatter/Bubble Charts" }, position: { x: -500, y: 150 } },
  { id: "process", data: { label: "Processes & Diagrams" }, position: { x: 300, y: -100 }, style: { background: "#f1f8e9", borderRadius: 10, padding: 8 } },
  { id: "natural", data: { label: "Natural (Life Cycle, Water Cycle)" }, position: { x: 500, y: -200 } },
  { id: "manufacturing", data: { label: "Manufacturing (Coffee, Bricks)" }, position: { x: 500, y: -150 } },
  { id: "mechanical", data: { label: "Mechanical Systems" }, position: { x: 500, y: -100 } },
  { id: "maps", data: { label: "Maps & Spatial" }, position: { x: 0, y: 200 }, style: { background: "#ede7f6", borderRadius: 10, padding: 8 } },
  { id: "static", data: { label: "Static Maps" }, position: { x: -200, y: 250 } },
  { id: "beforeafter", data: { label: "Before/After Maps" }, position: { x: 0, y: 300 } },
  { id: "comparative", data: { label: "Comparative Maps" }, position: { x: 200, y: 250 } },
  { id: "test", data: { label: "✅ Mini-Test 1" }, position: { x: 0, y: 400 }, style: { background: "#fff9c4", borderRadius: 10, padding: 8 } },
  { id: "testFeatures", data: { label: "Highlight Key Features" }, position: { x: -200, y: 450 } },
  { id: "testCounter", data: { label: "Word Counter (150+)" }, position: { x: 0, y: 500 } },
  { id: "testComparison", data: { label: "Band Comparison Tool" }, position: { x: 200, y: 450 } }
];

const edges = [
  { id: "e1", source: "t1", target: "charts" },
  { id: "e2", source: "charts", target: "line" },
  { id: "e3", source: "charts", target: "bar" },
  { id: "e4", source: "charts", target: "pie" },
  { id: "e5", source: "charts", target: "table" },
  { id: "e6", source: "charts", target: "mixed" },
  { id: "e7", source: "charts", target: "stacked" },
  { id: "e8", source: "charts", target: "area" },
  { id: "e9", source: "charts", target: "scatter" },
  { id: "e10", source: "t1", target: "process" },
  { id: "e11", source: "process", target: "natural" },
  { id: "e12", source: "process", target: "manufacturing" },
  { id: "e13", source: "process", target: "mechanical" },
  { id: "e14", source: "t1", target: "maps" },
  { id: "e15", source: "maps", target: "static" },
  { id: "e16", source: "maps", target: "beforeafter" },
  { id: "e17", source: "maps", target: "comparative" },
  { id: "e18", source: "t1", target: "test" },
  { id: "e19", source: "test", target: "testFeatures" },
  { id: "e20", source: "test", target: "testCounter" },
  { id: "e21", source: "test", target: "testComparison" }
];

export default function Task1MindmapWithDetach() {
  const [detached, setDetached] = useState(false);
  const [selected, setSelected] = useState(null);

  // Node click handler
  const onNodeClick = (_event, node) => setSelected(node.id);

  // Details panel
  const details = selected ? nodeDetails[selected] : null;

  const Mindmap = (
    <div style={{ width: "100%", height: 600, position: "relative" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
        <Background />
        <Controls />
      </ReactFlow>
      {details && (
        <div style={{ position: "absolute", top: 20, right: 20, width: 340, background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px #0002", padding: 20, zIndex: 10 }}>
          <div className="font-bold text-lg mb-2">{details.title}</div>
          <div className="text-sm whitespace-pre-line">{details.details}</div>
          <button className="mt-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setSelected(null)}>Close</button>
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
