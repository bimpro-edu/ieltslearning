import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { MiniLineChart, MiniBarChart, MiniPieChart, AreaChart, ScatterChart, StackedBarChart, MixedChart, ProcessDiagram } from "./MiniCharts";

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

// Simple SVG map illustration for demo
function MiniMapSVG({ width = 320, height = 180 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 320 180" style={{ background: '#e3f2fd', borderRadius: 12 }}>
      <rect x="20" y="40" width="80" height="60" fill="#90caf9" stroke="#1976d2" strokeWidth="2" />
      <rect x="120" y="60" width="60" height="40" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
      <rect x="200" y="30" width="90" height="90" fill="#ffe082" stroke="#fbc02d" strokeWidth="2" />
      <circle cx="70" cy="120" r="18" fill="#ab47bc" stroke="#6a1b9a" strokeWidth="2" />
      <text x="60" y="75" fontSize="16" fill="#1976d2">Park</text>
      <text x="130" y="85" fontSize="16" fill="#2e7d32">School</text>
      <text x="220" y="80" fontSize="16" fill="#f9a825">Mall</text>
      <text x="55" y="130" fontSize="14" fill="#6a1b9a">Lake</text>
    </svg>
  );
}

// Example nodeDetails (replace with your full object as needed)
const nodeDetails = {
  // ...existing nodeDetails...
  t1: {
    title: "Task 1 Mastery (Academic)",
    details: `A complete roadmap for IELTS Academic Task 1 visuals and skills.\n\n1. Graphs & Charts\n- Line Graphs: Describe trends (rise, fall, plateau, fluctuate).\n- Bar Charts: Compare categories at one point in time.\n- Pie Charts: Percentages & proportions.\n- Tables: Raw numbers, comparisons.\n- Mixed Graphs: Combination tasks (e.g., bar + line).\n- Stacked Bar/Column: Breakdown of subcategories.\n- Area Graphs: Cumulative trends.\n- Bubble/Scatter: Relationships between variables.\n\n2. Processes & Diagrams\n- Academic Task 1 sometimes gives a process flow (e.g., how coffee is produced).\n- Focus: Sequence connectors (first, next, after that, finally).\n- Highlight passive voice: “The beans are roasted,” “The liquid is filtered.”\n\n3. Maps & Spatial Representations\n- Comparing maps across time (before/after development).\n- Key skills: Using prepositions (north of, adjacent to, across from). Noticing changes (was replaced by, expanded into, converted into).\n\n4. ✅ Mini-Test 1\n- Timed practice with a real IELTS-style Task 1 prompt.\n- Auto-word counter to encourage 150+ words.\n- Learners write, then get either AI instant feedback (Task Achievement, CC, LR, GRA) or peer/teacher review.\n\n💡 Summary of Interactive Factors\n- Drag-and-drop vocab → charts & trends.\n- Clickable process diagrams with reveal steps.\n- Map slider / spot-the-difference tool.\n- Timed mini-test with model answer + band comparison.`
  },
  charts: { title: "Charts", details: "Covers all chart types: line, bar, pie, table, mixed, stacked, area, scatter. Charts are used to visually represent data and trends in IELTS Task 1. Understanding the type of chart and the best way to describe it is crucial for a high score. Click a specific chart node for more info and demo." },
  line: { title: "Line Graphs", details: "Line graphs show trends over time, such as changes in population, sales, or temperature. Key skills: describing increases, decreases, fluctuations, and periods of stability. Use time phrases and trend vocabulary (rise, fall, peak, dip, remain steady, fluctuate). Always mention the highest and lowest points. Demo chart below." },
  bar: { title: "Bar Charts", details: "Bar charts compare quantities across categories, such as countries, products, or years. Focus on ranking, highlighting differences, and using comparatives/superlatives (the highest, the lowest, more than, less than). Group similar bars and summarize key findings. Demo chart below." },
  pie: { title: "Pie Charts", details: "Pie charts show proportions or percentages of a whole. Focus on the largest and smallest segments, and use vocabulary like majority, minority, just under/over half, a quarter. Compare segments and mention the most significant categories. Demo chart below." },
  table: { title: "Tables", details: "Tables present raw numbers for multiple variables. Compare values, identify highs/lows, and summarize key data. Look for patterns, not just individual numbers. Use phrases like the most/least, highest/lowest, similar to. Demo table below." },
  mixed: { title: "Mixed Graphs", details: "Mixed graphs combine two or more chart types (e.g., line + bar, pie + table). Integrate information from multiple visuals, compare and contrast data, and always refer to both/all visuals in your overview. Demo chart below." },
  stacked: { title: "Stacked Bar/Column Charts", details: "Stacked charts show breakdowns by subcategories within each bar/column. Analyze composition and changes over time. Use vocabulary like segment, portion, breakdown. Refer to the legend if given. Demo chart below." },
  area: { title: "Area Graphs", details: "Area graphs display cumulative trends and totals over time. Emphasize overall growth or decline, and focus on the area under the curve, not just the line. Use vocabulary like cumulative, total, overall. Demo chart below." },
  scatter: { title: "Scatter/Bubble Charts", details: "Scatter and bubble charts show relationships between two or three variables. Identify correlations, outliers, and clusters. Use vocabulary like correlation, positive/negative relationship, cluster, outlier. Always mention the overall pattern and any exceptions. Demo chart below." },
  process: { title: "Processes & Diagrams", details: "Process diagrams describe steps, flows, or cycles (e.g., water cycle, manufacturing). Use sequence language (first, next, then, finally) and passive forms (is/are + past participle). Describe each stage and use arrows/flow language. Demo diagram below." },
  natural: { title: "Natural Processes", details: "Natural processes include cycles or flows in nature (e.g., water cycle, life cycle of a frog). Use sequence language and passive forms. Describe each stage and use appropriate vocabulary (begins with, ends with, cycle, stage, process). Demo diagram below." },
  manufacturing: { title: "Manufacturing Processes", details: "Manufacturing processes describe industrial steps (e.g., making bricks, coffee production). Use sequence language and passive forms. Describe each stage, machinery, inputs, and outputs. Demo diagram below." },
  mechanical: { title: "Mechanical Diagrams", details: "Mechanical diagrams show how a machine or system works. Explain function, describe parts, and use technical vocabulary (consists of, powered by, connected to, rotates, moves). Demo diagram below." },
  maps: { title: "Maps & Spatial Representations", details: "Maps may show changes over time (before/after development), static layouts, or comparisons between locations. Use prepositions (north of, adjacent to, across from), describe changes (was replaced by, expanded into), and mention key features. Demo map below." },
  mixedTableChart: { title: "Mixed Table + Chart", details: "Some IELTS tasks combine a table and a chart. Synthesize information from both sources, compare, contrast, and summarize data across formats." },
  vocabBank: { title: "Key Vocabulary Bank", details: "Essential vocabulary for each task type. Practice using these words in context: increase, decline, plateau, fluctuate, peak, dip, surge, plummet, remain steady, is heated, is produced, is filtered, is collected, is transported, next to, north of, replaced by, adjacent to, expanded, demolished, constructed." },
  pitfalls: { title: "Pitfalls & Mistakes", details: "Common mistakes in Task 1: over-describing every number, missing overall trends, missing sequence connectors, not using passive voice, confusing tenses, unclear spatial language. Focus on key features, use correct grammar, and avoid repetition." },
  strategy: { title: "Strategy Nodes", details: "How to group data, compare key features, and write an effective overview. Group logical categories or time periods, use comparative structures (more than, less than, as much as), and summarize main trends, differences, or changes without details." },
};


const initialNodes = [
  { id: "t1", data: { label: "Task 1 Mastery (Academic)" }, position: { x: 0, y: 0 }, draggable: true, style: nodeBaseStyle },
  { id: "charts", data: { label: "Charts" }, position: { x: -120, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "line", data: { label: "Line Chart" }, position: { x: -220, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "bar", data: { label: "Bar Chart" }, position: { x: -110, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "pie", data: { label: "Pie Chart" }, position: { x: 0, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "table", data: { label: "Table" }, position: { x: 110, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "mixed", data: { label: "Mixed Chart" }, position: { x: 220, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "stacked", data: { label: "Stacked Bar Chart" }, position: { x: 330, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "area", data: { label: "Area Chart" }, position: { x: 440, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "scatter", data: { label: "Scatter Chart" }, position: { x: 550, y: 200 }, draggable: true, style: nodeBaseStyle },
  { id: "process", data: { label: "Process Diagram" }, position: { x: 120, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "natural", data: { label: "Natural Diagram" }, position: { x: 240, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "manufacturing", data: { label: "Manufacturing Diagram" }, position: { x: 360, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "mechanical", data: { label: "Mechanical Diagram" }, position: { x: 480, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "maps", data: { label: "Maps & Spatial Representations" }, position: { x: 600, y: 100 }, draggable: true, style: nodeBaseStyle },
  { id: "mixedTableChart", data: { label: "Mixed Table + Chart" }, position: { x: -60, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "vocabBank", data: { label: "Key Vocabulary Bank" }, position: { x: 120, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "pitfalls", data: { label: "Pitfalls & Mistakes" }, position: { x: 300, y: 320 }, draggable: true, style: nodeBaseStyle },
  { id: "strategy", data: { label: "Strategy" }, position: { x: 480, y: 320 }, draggable: true, style: nodeBaseStyle },
];
function Task1Mindmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const initialEdges = [
    { id: 'e-t1-charts', source: 't1', target: 'charts' },
    { id: 'e-t1-process', source: 't1', target: 'process' },
    { id: 'e-t1-maps', source: 't1', target: 'maps' },
    { id: 'e-t1-mixedTableChart', source: 't1', target: 'mixedTableChart' },
    { id: 'e-t1-vocabBank', source: 't1', target: 'vocabBank' },
    { id: 'e-t1-pitfalls', source: 't1', target: 'pitfalls' },
    { id: 'e-t1-strategy', source: 't1', target: 'strategy' },
    // Charts branch
    { id: 'e-charts-line', source: 'charts', target: 'line' },
    { id: 'e-charts-bar', source: 'charts', target: 'bar' },
    { id: 'e-charts-pie', source: 'charts', target: 'pie' },
    { id: 'e-charts-table', source: 'charts', target: 'table' },
    { id: 'e-charts-mixed', source: 'charts', target: 'mixed' },
    { id: 'e-charts-stacked', source: 'charts', target: 'stacked' },
    { id: 'e-charts-area', source: 'charts', target: 'area' },
    { id: 'e-charts-scatter', source: 'charts', target: 'scatter' },
    // Process branch
    { id: 'e-process-natural', source: 'process', target: 'natural' },
    { id: 'e-process-manufacturing', source: 'process', target: 'manufacturing' },
    { id: 'e-process-mechanical', source: 'process', target: 'mechanical' },
  ];
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
            {/* Chart or demo on the left (30% width, larger) */}
              <div style={{ flex: '0 0 38%', maxWidth: '38%', minWidth: 320, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {selected === 'line' && <MiniLineChart width={390} height={270} />}
              {selected === 'bar' && <MiniBarChart width={390} height={270} />}
              {selected === 'pie' && <MiniPieChart width={390} height={270} />}
              {selected === 'table' && (
                <table style={{ width: 330, borderCollapse: 'collapse', fontSize: 24 }}>
                  <thead>
                    <tr style={{ background: '#e3f2fd' }}>
                      <th style={{ border: '1px solid #90caf9', padding: 5 }}>Country</th>
                      <th style={{ border: '1px solid #90caf9', padding: 5 }}>2010</th>
                      <th style={{ border: '1px solid #90caf9', padding: 5 }}>2015</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>UK</td>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>62M</td>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>64M</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>New Zealand</td>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>4.3M</td>
                      <td style={{ border: '1px solid #90caf9', padding: 5 }}>4.5M</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {selected === 'mixed' && (
                <div style={{ maxWidth: 330, maxHeight: 270, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MixedChart width={300} height={225} />
                </div>
              )}
              {selected === 'stacked' && <StackedBarChart width={390} height={270} />}
              {selected === 'area' && <AreaChart width={570} height={360} />}
              {selected === 'scatter' && <ScatterChart width={390} height={270} />}
              {['process', 'natural', 'manufacturing', 'mechanical'].includes(selected) && <ProcessDiagram width={330} height={180} />}
              {/* For nodes that are chart-related but missing a demo, show a placeholder */}
              {selected === 'charts' && (
                <div style={{ width: 300, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 8, color: '#1976d2', fontWeight: 500 }}>
                  Chart Overview
                </div>
              )}
              {selected === 'mixedTableChart' && (
                <div style={{ display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center', justifyContent: 'center' }}>
                  <table style={{ width: 270, borderCollapse: 'collapse', fontSize: 24, marginRight: 24 }}>
                    <thead>
                      <tr style={{ background: '#e3f2fd' }}>
                        <th style={{ border: '1px solid #90caf9', padding: 9 }}>Year</th>
                        <th style={{ border: '1px solid #90caf9', padding: 9 }}>Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>2020</td>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>120</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>2021</td>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>150</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>2022</td>
                        <td style={{ border: '1px solid #90caf9', padding: 9 }}>180</td>
                      </tr>
                    </tbody>
                  </table>
                  <MiniBarChart width={180} height={210} />
                </div>
              )}
              {selected === 'maps' && (
                <div style={{ width: 320, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                  <MiniMapSVG width={320} height={180} />
                </div>
              )}
            </div>
            {/* Info on the right (60% width, larger font) */}
              <div style={{ flex: '0 0 62%', maxWidth: '62%', minWidth: 320, width: 'auto', marginLeft: 0, wordBreak: 'break-word', whiteSpace: 'pre-line', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{nodeDetails[selected].title}</div>
              <div style={{ fontSize: 20, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{nodeDetails[selected].details}</div>
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

export default Task1Mindmap;
