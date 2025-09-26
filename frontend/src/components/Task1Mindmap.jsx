// Book SVG icon for default visuals
const BookIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="20" height="40" rx="4" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <rect x="36" y="12" width="20" height="40" rx="4" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
    <path d="M28 16H12M28 24H12M28 32H12M28 40H12" stroke="#1976d2" strokeWidth="2"/>
    <path d="M52 16H40M52 24H40M52 32H40M52 40H40" stroke="#1976d2" strokeWidth="2"/>
  </svg>
);
import React, { useState, useCallback, useEffect, memo } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from "reactflow";
// SVG icon for warning nodes (e.g., pitfalls)
const WarningIcon = () => (
  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff3cd" stroke="#ff9800" strokeWidth="3" />
    <rect x="29" y="18" width="6" height="24" rx="3" fill="#ff9800" />
    <rect x="29" y="46" width="6" height="6" rx="3" fill="#ff9800" />
  </svg>
);
// Collapsible node component for parent nodes
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

// Memoized nodeTypes outside the component to avoid React Flow warning
const nodeTypes = { collapsible: CollapsibleNode };
import "reactflow/dist/style.css";
import { MiniLineChart, MiniBarChart, MiniPieChart, AreaChart, ScatterChart, StackedBarChart, MixedChart, ProcessDiagram } from "./MiniCharts";

const nodeBaseStyle = {
  border: '2px solid #90caf9',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#e3f2fd', // default blue for main nodes
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 180,
  minHeight: 40,
  cursor: 'pointer',
};

// Color map for node backgrounds
const nodeBgColors = {
  t1: '#e3f2fd', // main
  charts: '#c8e6c9', // green
  line: '#c8e6c9',
  bar: '#c8e6c9',
  pie: '#c8e6c9',
  table: '#c8e6c9',
  mixed: '#c8e6c9',
  stacked: '#c8e6c9',
  area: '#c8e6c9',
  scatter: '#c8e6c9',
  process: '#fff9c4', // yellow
  natural: '#fff9c4',
  manufacturing: '#fff9c4',
  mechanical: '#fff9c4',
  maps: '#fff9c4',
  mixedTableChart: '#fff9c4',
  vocabBank: '#ede7f6', // purple
  pitfalls: '#ffe0b2', // orange
  overDescribe: '#ffe0b2',
  missingOverview: '#ffe0b2',
  weakSequence: '#ffe0b2',
  tenseConfusion: '#ffe0b2',
  repetition: '#ffe0b2',
  strategy: '#ede7f6', // purple
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
  details: `A complete roadmap for IELTS Academic Task 1 visuals and skills.\n\n1. Graphs & Charts\n- Learn to identify and describe all major visual types: line graphs, bar charts, pie charts, tables, mixed and stacked charts, area and scatter graphs.\n- Master the language of trends, comparisons, and proportions.\n- Practice grouping data, summarizing key features, and writing clear overviews.\n\n2. Processes & Diagrams\n- Understand how to describe both natural and man-made processes.\n- Use sequence connectors (first, next, after that, finally) and passive voice.\n- Practice breaking down complex diagrams into clear, logical steps.\n\n3. Maps & Spatial Representations\n- Compare maps across time (before/after development) and describe spatial changes.\n- Use prepositions (north of, adjacent to, across from) and change language (was replaced by, expanded into, converted into).\n\n4. Mini-Tests & Feedback\n- Timed practice with real IELTS-style prompts.\n- Use auto-word counters and get instant AI or peer feedback on your writing.\n\nTip: Always start with a clear overview, group similar data, and avoid describing every detail!`
  },
  charts: { title: "Charts Overview", details: `IELTS Task 1 charts include line, bar, pie, table, mixed, stacked, area, and scatter types.\n\n- Identify the chart type and what it shows (trends, comparisons, proportions, etc.).\n- Look for the main features: highest/lowest, biggest changes, overall patterns.\n- Use appropriate vocabulary for each chart type.\n- Practice writing overviews and grouping data logically.\n\nTip: Always mention the time period, units, and categories shown in the chart!` },
  line: { title: "Line Graphs", details: `Line graphs show changes over time.\n\n- Focus on trends: rising, falling, fluctuating, peaking, dipping, remaining steady.\n- Use time phrases (from 2000 to 2020, over the next decade).\n- Highlight the most significant increases/decreases and periods of stability.\n- Example: "The number of students rose sharply from 2010 to 2015, then plateaued."\n\nTip: Always mention the highest and lowest points, and compare lines if there are multiple!` },
  bar: { title: "Bar Charts", details: `Bar charts compare quantities across categories.\n\n- Rank and compare: "Country A had the highest sales, while Country B had the lowest."\n- Use comparatives/superlatives (more than, less than, the most, the least).\n- Group similar bars and summarize key findings.\n- Example: "Sales in 2022 were twice as high as in 2020."\n\nTip: Avoid listing every bar—focus on patterns and extremes!` },
  pie: { title: "Pie Charts", details: `Pie charts show proportions or percentages of a whole.\n\n- Identify the largest and smallest segments.\n- Use vocabulary like majority, minority, just under/over half, a quarter.\n- Compare segments and mention the most significant categories.\n- Example: "The majority of spending was on food, while only a small fraction went to transport."\n\nTip: Always check if the total is 100% and mention it!` },
  table: { title: "Tables", details: `Tables present raw numbers for multiple variables.\n\n- Compare values, identify highs/lows, and summarize key data.\n- Look for patterns, not just individual numbers.\n- Use phrases like the most/least, highest/lowest, similar to.\n- Example: "The population of City A was similar to City B in 2010, but much higher by 2020."\n\nTip: Group similar rows/columns and avoid copying numbers directly!` },
  mixed: { title: "Mixed Graphs", details: `Mixed graphs combine two or more chart types (e.g., line + bar, pie + table).\n\n- Integrate information from all visuals.\n- Compare and contrast data, and always refer to both/all visuals in your overview.\n- Example: "While the bar chart shows a steady increase, the line graph reveals a sharp drop in 2015."\n\nTip: Write a single overview that covers all chart types!` },
  stacked: { title: "Stacked Bar/Column Charts", details: `Stacked charts show breakdowns by subcategories within each bar/column.\n\n- Analyze composition and changes over time.\n- Use vocabulary like segment, portion, breakdown.\n- Refer to the legend if given.\n- Example: "The blue segment accounted for the largest share in 2020."\n\nTip: Compare both the total and the individual segments!` },
  area: { title: "Area Graphs", details: `Area graphs display cumulative trends and totals over time.\n\n- Emphasize overall growth or decline.\n- Focus on the area under the curve, not just the line.\n- Use vocabulary like cumulative, total, overall.\n- Example: "The total production increased steadily, with a sharp rise after 2018."\n\nTip: Mention both the trend and the total values!` },
  scatter: { title: "Scatter/Bubble Charts", details: `Scatter and bubble charts show relationships between two or three variables.\n\n- Identify correlations, outliers, and clusters.\n- Use vocabulary like correlation, positive/negative relationship, cluster, outlier.\n- Example: "There was a strong positive correlation between income and education level."\n\nTip: Always mention the overall pattern and any exceptions!` },
  process: { title: "Processes & Diagrams", details: `Process diagrams describe steps, flows, or cycles (e.g., water cycle, manufacturing).\n\n- Use sequence language (first, next, then, finally) and passive forms (is/are + past participle).\n- Describe each stage and use arrows/flow language.\n- Example: "First, the raw materials are collected. Next, they are processed and filtered."\n\nTip: Focus on the sequence and avoid unnecessary details!` },
  natural: { title: "Natural Processes", details: `Natural processes include cycles or flows in nature (e.g., water cycle, life cycle of a frog).\n\n- Use sequence language and passive forms.\n- Describe each stage and use appropriate vocabulary (begins with, ends with, cycle, stage, process).\n- Example: "The cycle begins with evaporation and ends with rainfall."\n\nTip: Use clear, logical steps and connect each stage!` },
  manufacturing: { title: "Manufacturing Processes", details: `Manufacturing processes describe industrial steps (e.g., making bricks, coffee production).\n\n- Use sequence language and passive forms.\n- Describe each stage, machinery, inputs, and outputs.\n- Example: "The clay is shaped, dried, and then fired in a kiln."\n\nTip: Mention all key materials and equipment!` },
  mechanical: { title: "Mechanical Diagrams", details: `Mechanical diagrams show how a machine or system works.\n\n- Explain function, describe parts, and use technical vocabulary (consists of, powered by, connected to, rotates, moves).\n- Example: "The engine is powered by fuel, which turns the crankshaft."\n\nTip: Focus on the main function and how the parts interact!` },
  maps: { title: "Maps & Spatial Representations", details: `Maps may show changes over time (before/after development), static layouts, or comparisons between locations.\n\n- Use prepositions (north of, adjacent to, across from), describe changes (was replaced by, expanded into), and mention key features.\n- Example: "The park was replaced by a shopping mall, and a new road was constructed to the north."\n\nTip: Always compare the two maps and highlight the biggest changes!` },
  mixedTableChart: { title: "Mixed Table + Chart", details: `Some IELTS tasks combine a table and a chart.\n\n- Synthesize information from both sources.\n- Compare, contrast, and summarize data across formats.\n- Example: "The table shows a steady increase, while the chart highlights a sharp drop in 2018."\n\nTip: Write a single overview that covers both visuals!` },
  vocabBank: { title: "Key Vocabulary Bank", details: `Essential vocabulary for each task type.\n\n- Practice using these words in context: increase, decline, plateau, fluctuate, peak, dip, surge, plummet, remain steady, is heated, is produced, is filtered, is collected, is transported, next to, north of, replaced by, adjacent to, expanded, demolished, constructed.\n- Try to use a variety of vocabulary in your writing.\n- Example: "The number of visitors surged in 2022, then plateaued the following year."\n\nTip: Avoid repeating the same words—use synonyms and paraphrasing!` },
  pitfalls: { title: "Pitfalls & Mistakes", details: `Common mistakes in Task 1:\n\n- Over-describing every number instead of summarizing trends.\n- Missing the overall trend or overview.\n- Not using sequence connectors or passive voice in processes.\n- Confusing tenses or using unclear spatial language.\n- Repeating vocabulary or copying from the prompt.\n\nHow to avoid them:\n- Focus on key features and main trends.\n- Use a range of grammar and vocabulary.\n- Always write a clear overview and group similar data.\n\nTip: Proofread your answer and check for repetition or missing information!` },
  overDescribe: {
    title: "Over-describing Numbers",
    details: `Listing every number or detail makes your report hard to follow.\n\nTips:\n- Summarize trends and group similar data.\n- Focus on the most significant changes or features.\n\nExample: Instead of 'A was 20, B was 21, C was 22...', write 'All three categories were similar, around 20–22.'`
  },
  missingOverview: {
    title: "Missing the Overview",
    details: `Not including a clear overview lowers your score.\n\nTips:\n- Always write a summary sentence after the introduction.\n- Highlight the main trend, biggest change, or overall pattern.\n\nExample: 'Overall, sales increased in all regions, but the growth was strongest in Asia.'`
  },
  weakSequence: {
    title: "No Sequence Connectors (Processes)",
    details: `For process diagrams, you must use sequence words and passive voice.\n\nTips:\n- Use 'first', 'next', 'then', 'finally'.\n- Use passive forms: 'is heated', 'are collected'.\n\nExample: 'First, the raw materials are collected. Next, they are processed.'`
  },
  tenseConfusion: {
    title: "Confusing Tenses/Spatial Language",
    details: `Mixing up tenses or unclear spatial language confuses the reader.\n\nTips:\n- Use past, present, or future tense as shown in the chart.\n- Use clear prepositions: 'north of', 'adjacent to', 'replaced by'.\n\nExample: 'The park was replaced by a shopping mall to the north.'`
  },
  repetition: {
    title: "Repetition/Copied Language",
    details: `Repeating vocabulary or copying from the prompt lowers your lexical score.\n\nTips:\n- Paraphrase the question.\n- Use synonyms and a range of vocabulary.\n\nExample: Instead of repeating 'increase', use 'rise', 'grow', 'climb', 'surge'.`
  },
  strategy: { title: "Strategy Nodes", details: `How to group data, compare key features, and write an effective overview.\n\n- Group logical categories or time periods.\n- Use comparative structures (more than, less than, as much as).\n- Summarize main trends, differences, or changes without unnecessary detail.\n- Example: "Overall, sales increased in all regions, but the growth was strongest in Asia."\n\nTip: Plan your answer before you write—identify the main groups and trends first!` },
};


const initialNodes = [
  { id: "t1", data: { label: "Task 1 Mastery (Academic)" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "charts", type: "collapsible", data: { label: "Charts" }, position: { x: -120, y: 100 }, draggable: true },
  { id: "line", data: { label: "Line Chart" }, position: { x: -220, y: 200 }, draggable: true },
  { id: "bar", data: { label: "Bar Chart" }, position: { x: -110, y: 200 }, draggable: true },
  { id: "pie", data: { label: "Pie Chart" }, position: { x: 0, y: 200 }, draggable: true },
  { id: "table", data: { label: "Table" }, position: { x: 110, y: 200 }, draggable: true },
  { id: "mixed", data: { label: "Mixed Chart" }, position: { x: 220, y: 200 }, draggable: true },
  { id: "stacked", data: { label: "Stacked Bar Chart" }, position: { x: 330, y: 200 }, draggable: true },
  { id: "area", data: { label: "Area Chart" }, position: { x: 440, y: 200 }, draggable: true },
  { id: "scatter", data: { label: "Scatter Chart" }, position: { x: 550, y: 200 }, draggable: true },
  { id: "process", type: "collapsible", data: { label: "Process Diagram" }, position: { x: 120, y: 100 }, draggable: true },
  { id: "natural", data: { label: "Natural Diagram" }, position: { x: 240, y: 100 }, draggable: true },
  { id: "manufacturing", data: { label: "Manufacturing Diagram" }, position: { x: 360, y: 100 }, draggable: true },
  { id: "mechanical", data: { label: "Mechanical Diagram" }, position: { x: 480, y: 100 }, draggable: true },
  { id: "maps", data: { label: "Maps & Spatial Representations" }, position: { x: 600, y: 100 }, draggable: true },
  { id: "mixedTableChart", data: { label: "Mixed Table + Chart" }, position: { x: -60, y: 320 }, draggable: true },
  { id: "vocabBank", data: { label: "Key Vocabulary Bank" }, position: { x: 120, y: 320 }, draggable: true },
  { id: "pitfalls", type: "collapsible", data: { label: "Pitfalls & Mistakes" }, position: { x: 300, y: 320 }, draggable: true },
  { id: "overDescribe", data: { label: "Over-describing Numbers" }, position: { x: 480, y: 400 }, draggable: true },
  { id: "missingOverview", data: { label: "Missing the Overview" }, position: { x: 480, y: 440 }, draggable: true },
  { id: "weakSequence", data: { label: "No Sequence Connectors" }, position: { x: 480, y: 480 }, draggable: true },
  { id: "tenseConfusion", data: { label: "Confusing Tenses/Spatial" }, position: { x: 480, y: 520 }, draggable: true },
  { id: "repetition", data: { label: "Repetition/Copied Language" }, position: { x: 480, y: 560 }, draggable: true },
  { id: "strategy", data: { label: "Strategy" }, position: { x: 480, y: 320 }, draggable: true },
].map(n => ({
  ...n,
  style: {
    ...nodeBaseStyle,
    background: nodeBgColors[n.id] || nodeBaseStyle.background,
  },
}));
function Task1Mindmap() {
  // Start with all parent nodes expanded by default
  const [expanded, setExpanded] = useState({
    charts: true,
    process: true,
    pitfalls: true,
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const initialEdges = [
    { id: 'e-t1-charts', source: 't1', target: 'charts' },
    { id: 'e-t1-process', source: 't1', target: 'process' },
    { id: 'e-t1-maps', source: 't1', target: 'maps' },
    { id: 'e-t1-mixedTableChart', source: 't1', target: 'mixedTableChart' },
    { id: 'e-t1-vocabBank', source: 't1', target: 'vocabBank' },
    { id: 'e-t1-pitfalls', source: 't1', target: 'pitfalls' },
    { id: 'e-t1-strategy', source: 't1', target: 'strategy' },
    // Pitfalls sub-branches
    { id: 'e-pitfalls-overDescribe', source: 'pitfalls', target: 'overDescribe' },
    { id: 'e-pitfalls-missingOverview', source: 'pitfalls', target: 'missingOverview' },
    { id: 'e-pitfalls-weakSequence', source: 'pitfalls', target: 'weakSequence' },
    { id: 'e-pitfalls-tenseConfusion', source: 'pitfalls', target: 'tenseConfusion' },
    { id: 'e-pitfalls-repetition', source: 'pitfalls', target: 'repetition' },
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

  // Map of parent node IDs to their children node IDs
  const parentToChildren = {
    charts: ['line', 'bar', 'pie', 'table', 'mixed', 'stacked', 'area', 'scatter'],
    process: ['natural', 'manufacturing', 'mechanical'],
    pitfalls: ['overDescribe', 'missingOverview', 'weakSequence', 'tenseConfusion', 'repetition'],
  };

  // Filter nodes/edges based on expanded state for all parent nodes with sub-nodes
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

  // Toggle expand/collapse for collapsible nodes
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
              {selected === 'vocabBank' && (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
                </div>
              )}
              {selected === 'pitfalls' && (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3e0', borderRadius: 12 }}>
                  <WarningIcon />
                </div>
              )}
              {selected === 'strategy' && (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8f5e9', borderRadius: 12 }}>
                  {/* Lightbulb SVG icon */}
                  <svg width="90" height="90" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="28" rx="18" ry="20" fill="#fffde7" stroke="#fbc02d" strokeWidth="2"/>
                    <rect x="26" y="48" width="12" height="10" rx="3" fill="#fbc02d"/>
                    <rect x="28" y="58" width="8" height="4" rx="2" fill="#ffe082"/>
                    <path d="M32 8v6M16 16l4 4M48 16l-4 4" stroke="#fbc02d" strokeWidth="2"/>
                  </svg>
                </div>
              )}
              {/* Default visual for nodes without a chart or special icon */}
              {!(selected === 'line' || selected === 'bar' || selected === 'pie' || selected === 'table' || selected === 'mixed' || selected === 'stacked' || selected === 'area' || selected === 'scatter' || ['process', 'natural', 'manufacturing', 'mechanical'].includes(selected) || selected === 'charts' || selected === 'vocabBank' || selected === 'pitfalls' || selected === 'strategy' || selected === 'mixedTableChart' || selected === 'maps') && (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e3f2fd', borderRadius: 12 }}>
                  <BookIcon />
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
              {selected === 'vocabBank' ? (
                <div style={{ fontSize: 20, marginBottom: 12 }}>{nodeDetails[selected].details.split('Practice using these words in context:')[0]}</div>
              ) : null}
              {selected === 'vocabBank' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {[
                    'increase', 'decline', 'plateau', 'fluctuate', 'peak', 'dip', 'surge', 'plummet', 'remain steady',
                    'is heated', 'is produced', 'is filtered', 'is collected', 'is transported',
                    'next to', 'north of', 'replaced by', 'adjacent to', 'expanded', 'demolished', 'constructed'
                  ].map((word, idx) => (
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
              ) : (
                <div style={{ fontSize: 24, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{nodeDetails[selected].details}</div>
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

export default Task1Mindmap;
