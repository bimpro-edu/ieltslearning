import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { MiniLineChart, MiniBarChart, MiniPieChart, AreaChart, ScatterChart, StackedBarChart, MixedChart, ProcessDiagram } from "./MiniCharts";

// Base style for all mind map nodes
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

// Example nodeDetails (replace with your full object as needed)
const nodeDetails = {
  t1: {
    title: "Task 1 Mastery (Academic)",
    details: `A complete roadmap for IELTS Academic Task 1 visuals and skills.\n\n1. Graphs & Charts\n\n- Line Graphs: Describe trends (rise, fall, plateau, fluctuate).\n- Bar Charts: Compare categories at one point in time.\n- Pie Charts: Percentages & proportions.\n- Tables: Raw numbers, comparisons.\n- Mixed Graphs: Combination tasks (e.g., bar + line).\n- Stacked Bar/Column: Breakdown of subcategories.\n- Area Graphs: Cumulative trends.\n- Bubble/Scatter: Relationships between variables.\n\n👉 Interactive: Drag-and-drop “trend vocabulary” (increase, surge, decline, dip, plateau) into a line graph, or fill-the-gap chart-based sentences.\n\n2. Processes & Diagrams\n\n- Academic Task 1 sometimes gives a process flow (e.g., how coffee is produced).\n- Focus: Sequence connectors (first, next, after that, finally).\n- Highlight passive voice: “The beans are roasted,” “The liquid is filtered.”\n\n👉 Interactive: Clickable process diagram where each step shows a model sentence. Learners can reorder shuffled steps to practice logical sequence.\n\n3. Maps & Spatial Representations\n\n- Comparing maps across time (before/after development).\n- Key skills: Using prepositions (north of, adjacent to, across from). Noticing changes (was replaced by, expanded into, converted into).\n\n👉 Interactive: Before/after map slider: learners drag a slider to reveal changes, then write sentences to describe. Or a spot the difference exercise with vocabulary hints.\n\n4. ✅ Mini-Test 1\n\n- Timed practice with a real IELTS-style Task 1 prompt.\n- Auto-word counter to encourage 150+ words.\n- Learners write, then get either AI instant feedback (Task Achievement, CC, LR, GRA) or peer/teacher review.\n\n👉 Interactive: Model answer reveal button (locked until student submits). Band comparison tool: show Band 5 vs Band 7 response to same prompt.\n\n💡 Summary of Interactive Factors\n- Drag-and-drop vocab → charts & trends.\n- Clickable process diagrams with reveal steps.\n- Map slider / spot-the-difference tool.\n- Timed mini-test with model answer + band comparison.`
  },
  charts: {
    title: "Graphs & Charts (Data Representation)",
    details: `Includes line graphs, bar charts, pie charts, tables, mixed/stacked/area/bubble/scatter charts.\n\nFocus: Describing trends, comparisons, proportions, and relationships.\n\nInteractive: Match chart type to writing approach.\n\nIELTS Tips:\n- Identify the type of chart and what it shows\n- Use the correct language for trends, comparisons, or proportions\n- Group information logically (overview, details)\n\nCommon Mistakes:\n- Listing data without summarizing\n- Ignoring the biggest/smallest changes\n- Not writing an overview paragraph\n\nSample Band 9 Overview:\n"Overall, the line graph shows a steady increase in internet usage, while the bar chart highlights significant differences between age groups."`
  },
  line: {
    title: "Line Graphs",
    details: `Show trends over time (e.g., sales from 2000-2020).\n\nKey skills:\n- Describing increases, decreases, fluctuations, and overall patterns\n- Using time phrases (from 2000 to 2020, over the period)\n- Vocabulary: rise, fall, peak, dip, remain steady, fluctuate\n\nSample Band 8 Sentences:\n"The number of users increased steadily from 2000 to 2010, peaking at 500,000 before declining."\n"There was a sharp drop in 2012, followed by a gradual recovery."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main trend(s)\n- Details: Describe specific changes, use data\n\nIELTS Tip:\nAlways mention the highest and lowest points, and any periods of stability or rapid change.`
  },
  bar: {
    title: "Bar Charts",
    details: `Compare quantities across categories (vertical/horizontal).\n\nKey skills:\n- Group comparisons, ranking, highlighting differences\n- Vocabulary: the highest, the lowest, more than, less than\n\nSample Band 8 Sentences:\n"Sales of product A were higher than product B in all years except 2018."\n"The tallest bar represents the USA, with over 2 million units sold."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main comparison(s)\n- Details: Use data to compare categories\n\nIELTS Tip:\nUse superlatives and comparatives to highlight differences.`
  },
  pie: {
    title: "Pie Charts",
    details: `Show proportions/percentages of a whole.\n\nKey skills:\n- Focusing on largest/smallest segments, majorities/minorities\n- Vocabulary: majority, minority, just under/over half, a quarter\n\nSample Band 8 Sentences:\n"The majority of spending was on food, accounting for 45% of the total budget."\n"Only a small minority (5%) was spent on entertainment."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main proportions\n- Details: Compare segments\n\nIELTS Tip:\nAlways mention the largest and smallest segments.`
  },
  table: {
    title: "Tables",
    details: `Present raw numbers for multiple variables.\n\nKey skills:\n- Comparing values, identifying highs/lows, summarizing key data\n- Vocabulary: the most/least, highest/lowest, similar to\n\nSample Band 8 Sentences:\n"Table 1 shows that the UK had the highest population, while New Zealand had the lowest."\n"The figures for 2010 and 2015 are almost identical."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main findings\n- Details: Compare and summarize\n\nIELTS Tip:\nLook for patterns, not just individual numbers.`
  },
  mixed: {
    title: "Mixed Graphs",
    details: `Combine two or more chart types (e.g., line + bar, pie + table).\n\nKey skills:\n- Integrating information from multiple visuals\n- Comparing and contrasting data\n\nSample Band 8 Sentences:\n"While the bar chart shows a steady increase, the line graph indicates a sharp drop in 2015."\n"The pie chart and table together reveal a shift in spending habits."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main trends and contrasts\n- Details: Integrate data from both visuals\n\nIELTS Tip:\nAlways refer to both/all visuals in your overview.`
  },
  stacked: {
    title: "Stacked Bar/Column Charts",
    details: `Show breakdowns by subcategories within each bar/column.\n\nKey skills:\n- Analyzing composition and changes over time\n- Vocabulary: segment, portion, breakdown\n\nSample Band 8 Sentences:\n"The blue segment represents online sales, which grew steadily as a proportion of total sales."\n"The proportion of children increased, while adults decreased."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main breakdowns\n- Details: Compare subcategories\n\nIELTS Tip:\nUse color/legend references if given.`
  },
  area: {
    title: "Area Graphs",
    details: `Display cumulative trends and totals over time.\n\nKey skills:\n- Emphasizing overall growth or decline\n- Vocabulary: cumulative, total, overall\n\nSample Band 8 Sentences:\n"The total number of users increased cumulatively, reaching 1 million by 2020."\n"There was a gradual rise in the shaded area, indicating steady growth."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main cumulative trend\n- Details: Use totals and changes\n\nIELTS Tip:\nFocus on the area under the curve, not just the line.`
  },
  scatter: {
    title: "Scatter/Bubble Charts",
    details: `Show relationships between two variables (scatter) or three (bubble).\n\nKey skills:\n- Identifying correlations, outliers, clusters\n- Vocabulary: correlation, positive/negative relationship, cluster, outlier\n\nSample Band 8 Sentences:\n"There is a strong positive correlation between age and income."\n"The largest bubble represents the USA, with the highest GDP and population."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main relationship(s)\n- Details: Describe clusters, outliers, trends\n\nIELTS Tip:\nAlways mention the overall pattern and any exceptions.`
  },
  process: {
    title: "Processes & Diagrams",
    details: `Describe steps, flows, or cycles (e.g., water cycle, manufacturing).\n\nKey skills:\n- Sequencing, using passive voice, describing inputs/outputs\n- Vocabulary: first, next, then, finally, is/are + past participle\n\nSample Band 8 Sentences:\n"First, the raw materials are delivered to the factory. Next, they are processed and assembled."\n"The cycle begins with evaporation and ends with precipitation."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main stages/steps\n- Details: Describe each stage, use arrows/flow language\n\nIELTS Tip:\nUse clear sequence language and passive forms.`
  },
  natural: {
    title: "Natural Processes (Life/Water Cycle)",
    details: `Describe natural cycles or flows (e.g., water cycle, life cycle of a frog).\n\nKey skills:\n- Sequencing, using passive voice, describing natural phenomena\n- Vocabulary: begins with, ends with, cycle, stage, process\n\nSample Band 8 Sentences:\n"The cycle begins with eggs hatching into tadpoles, which then develop into adult frogs."\n"Water evaporates, condenses, and falls as precipitation."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main stages/steps\n- Details: Describe each stage, use arrows/flow language\n\nIELTS Tip:\nUse clear sequence language and passive forms.`
  },
  manufacturing: {
    title: "Manufacturing Processes",
    details: `Describe industrial/manufacturing steps (e.g., making bricks, coffee production).\n\nKey skills:\n- Sequencing, using passive voice, describing machinery/inputs/outputs\n- Vocabulary: is/are + past participle, processed, assembled, delivered\n\nSample Band 8 Sentences:\n"First, the clay is dug up and delivered to the factory. Next, it is processed and shaped into bricks."\n"The beans are roasted, ground, and packaged for sale."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main stages/steps\n- Details: Describe each stage, use arrows/flow language\n\nIELTS Tip:\nUse clear sequence language and passive forms.`
  },
  mechanical: {
    title: "Mechanical Diagrams",
    details: `Describe mechanical systems (e.g., how a machine works).\n\nKey skills:\n- Explaining function, describing parts, using technical vocabulary\n- Vocabulary: consists of, powered by, connected to, rotates, moves\n\nSample Band 8 Sentences:\n"The system consists of a motor connected to a series of gears."\n"When the button is pressed, the lever moves and activates the pump."\n\nHow to Structure:\n- Introduction: Paraphrase the question\n- Overview: Main components/functions\n- Details: Describe each part and its function\n\nIELTS Tip:\nUse technical vocabulary and clear explanations.`
  },
  maps: {
    title: "Maps & Spatial Representations",
    details: `IELTS Task 1 may present maps showing changes over time (before/after development), static layouts, or comparisons between locations.\n\nKey skills:\n- Using prepositions: north of, adjacent to, across from, to the east of, etc.\n- Describing changes: was replaced by, expanded into, converted into, demolished, constructed, added, removed.\n- Comparing layouts: similarities, differences, and transformations.\n\nInteractive ideas:\n- Before/after map slider: Drag to reveal changes, then write sentences to describe transformations.\n- Spot the difference: Find and label changes with vocabulary hints.\n- Sentence builder: Arrange words/phrases to describe a map change.\n\nCommon mistakes:\n- Forgetting to use passive voice for changes ("A park was built...").\n- Not mentioning directions or locations clearly.\n- Missing key features or transformations.\n\nSample sentence:\n"The playground, which was located north of the school, was replaced by a new car park after the redevelopment."`
  },
  mixedTableChart: {
    title: "Mixed Table + Chart Practice",
    details: `IELTS sometimes combines a table and a chart (e.g., pie + table, bar + table).\nKey skill: Synthesize information from both sources.\nPractice: Compare, contrast, and summarize data across formats.\n\nInteractive: Drag-and-drop matching, fill-the-gap synthesis tasks.`
  },
  vocabBank: {
    title: "Key Vocabulary Bank",
    details: `Essential vocabulary for each task type.\n\n- Trends: increase, decline, plateau, fluctuate, peak, dip, surge, plummet, remain steady.\n- Processes: is heated, is produced, is filtered, is collected, is transported.\n- Maps: next to, north of, replaced by, adjacent to, expanded, demolished, constructed.\n\nInteractive: Drag-and-drop vocab into correct blanks in sample sentences or charts.`
  },
  pitfalls: {
    title: "🚨 Pitfalls & Mistakes",
    details: `Common mistakes in Task 1.\n\n- Charts: Over-describing every number, missing overall trends.\n- Processes: Missing sequence connectors, not using passive voice.\n- Maps: Confusing tenses (past/present/future), unclear spatial language.\n\nTip: Focus on key features, use correct grammar, and avoid repetition.`
  },
  strategy: {
    title: "Strategy Nodes",
    details: `How to group data, compare key features, and write an effective overview.\n\n- Grouping: Find logical categories or time periods.\n- Comparing: Use comparative structures (more than, less than, as much as).\n- Overview: Summarize main trends, differences, or changes without details.\n\nInteractive: Sentence builder game to practice grouping and overview writing.`
  },
  // Removed Task 2 nodeDetails
};

const initialNodes = [
  { id: "t1", data: { label: "Task 1 Mastery (Academic)" }, position: { x: 0, y: 0 }, draggable: true, style: nodeBaseStyle },
  { id: "charts", data: { label: "Charts" }, position: { x: -200, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "line", data: { label: "Line Chart" }, position: { x: -400, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "bar", data: { label: "Bar Chart" }, position: { x: -200, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "pie", data: { label: "Pie Chart" }, position: { x: 0, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "table", data: { label: "Table" }, position: { x: 200, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "mixed", data: { label: "Mixed Chart" }, position: { x: 400, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "stacked", data: { label: "Stacked Bar Chart" }, position: { x: 600, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "area", data: { label: "Area Chart" }, position: { x: 800, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "scatter", data: { label: "Scatter Chart" }, position: { x: 1000, y: 300 }, draggable: true, style: nodeBaseStyle },
  { id: "process", data: { label: "Process Diagram" }, position: { x: 200, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "natural", data: { label: "Natural Diagram" }, position: { x: 400, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "manufacturing", data: { label: "Manufacturing Diagram" }, position: { x: 600, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "mechanical", data: { label: "Mechanical Diagram" }, position: { x: 800, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "maps", data: { label: "Maps & Spatial Representations" }, position: { x: 1000, y: 150 }, draggable: true, style: nodeBaseStyle },
  { id: "mixedTableChart", data: { label: "Mixed Table + Chart" }, position: { x: 100, y: 600 }, draggable: true, style: nodeBaseStyle },
  { id: "vocabBank", data: { label: "Key Vocabulary Bank" }, position: { x: 350, y: 600 }, draggable: true, style: nodeBaseStyle },
  { id: "pitfalls", data: { label: "Pitfalls & Mistakes" }, position: { x: 600, y: 600 }, draggable: true, style: nodeBaseStyle },
  { id: "strategy", data: { label: "Strategy" }, position: { x: 850, y: 600 }, draggable: true, style: nodeBaseStyle },
  // Removed Task 2 nodes
];

const initialEdges = [
  { id: "e1", source: "t1", target: "charts" },
  { id: "e2", source: "charts", target: "line" },
  { id: "e3", source: "charts", target: "bar" },
  { id: "e4", source: "charts", target: "pie" },
  { id: "e5", source: "charts", target: "table" },
  { id: "e6", source: "charts", target: "mixed" },
  { id: "e7", source: "charts", target: "stacked" },
  { id: "e8", source: "charts", target: "area" },
  { id: "e9", source: "charts", target: "scatter" },
  { id: "e10", source: "charts", target: "process" },
  { id: "e11", source: "charts", target: "natural" },
  { id: "e12", source: "charts", target: "manufacturing" },
  { id: "e13", source: "charts", target: "mechanical" },
  { id: "e14", source: "charts", target: "maps" },
  { id: "e15", source: "charts", target: "mixedTableChart" },
  { id: "e16", source: "charts", target: "vocabBank" },
  { id: "e17", source: "charts", target: "pitfalls" },
  { id: "e18", source: "charts", target: "strategy" },
  // Removed aiFeedback edge
  { id: 't1-mixedTableChart', source: 't1', target: 'mixedTableChart', type: 'smoothstep' },
  { id: 't1-vocabBank', source: 't1', target: 'vocabBank', type: 'smoothstep' },
  { id: 't1-pitfalls', source: 't1', target: 'pitfalls', type: 'smoothstep' },
  { id: 't1-strategy', source: 't1', target: 'strategy', type: 'smoothstep' },
  // Removed Task 2 nodes/edges
];

// AreaChart fallback for debugging
function AreaChartWithFallback(props) {
  try {
    return <AreaChart {...props} />;
  } catch (e) {
    return <div style={{color: 'red'}}>Area chart failed to render: {e.message}</div>;
  }
}


function Task1Mindmap() {
  const [detached, setDetached] = useState(false);
  const [selected, setSelected] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  // Only allow Task 1 node ids for details
  const allowedNodeIds = [
    "t1", "charts", "line", "bar", "pie", "table", "mixed", "stacked", "area", "scatter",
    "process", "natural", "manufacturing", "mechanical", "maps", "mixedTableChart", "vocabBank", "pitfalls", "strategy"
  ];

  const details = selected && allowedNodeIds.includes(selected) ? nodeDetails[selected] : null;

  const Mindmap = (
    <div style={{ width: "100%", height: "1000px", minHeight: 700, position: "relative", background: "#f8fafc", border: "1px solid #ccc", borderRadius: 8 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_event, node) => setSelected(node.id)}
        nodesDraggable={true}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
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
      <div style={{ marginTop: 24, background: '#f9f9f9', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001', border: '1px solid #e3e3e3', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', minHeight: 120 }}>
        {selected && nodeDetails[selected] !== undefined ? (
          <>
            <div className="font-bold text-lg mb-2" style={{ color: '#1976d2' }}>{nodeDetails[selected].title}</div>
            {selected === 'line' && (
              <div className="mb-8 flex justify-center w-full">
                <MiniLineChart width={"100%"} height={340} />
              </div>
            )}
            {selected === 'bar' && (
              <div className="mb-8 flex justify-center w-full">
                <MiniBarChart width={"100%"} height={340} />
              </div>
            )}
            {selected === 'pie' && (
              <div className="mb-8 flex justify-center w-full">
                <MiniPieChart width={"100%"} height={400} />
              </div>
            )}
            {selected === 'table' && (
              <div className="mb-8 flex justify-center w-full">
                <table style={{ width: '90%', borderCollapse: 'collapse', fontSize: 20 }}>
                  <thead>
                    <tr style={{ background: '#e3f2fd' }}>
                      <th style={{ border: '1px solid #90caf9', padding: 8 }}>Country</th>
                      <th style={{ border: '1px solid #90caf9', padding: 8 }}>2010</th>
                      <th style={{ border: '1px solid #90caf9', padding: 8 }}>2015</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>UK</td>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>62M</td>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>64M</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>New Zealand</td>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>4.3M</td>
                      <td style={{ border: '1px solid #90caf9', padding: 8 }}>4.5M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {selected === 'mixed' && (
              <div className="mb-8 flex flex-col items-center w-full gap-8">
                <MixedChart width={"100%"} height={520} />
              </div>
            )}
            {selected === 'stacked' && (
              <div className="mb-8 flex justify-center w-full">
                <StackedBarChart width={"100%"} height={480} />
              </div>
            )}
            {selected === 'area' && (
              <div className="mb-8 flex justify-center w-full">
                <AreaChartWithFallback width={"100%"} height={480} />
              </div>
            )}
            {selected === 'scatter' && (
              <div className="mb-8 flex justify-center w-full">
                <ScatterChart width={"100%"} height={480} />
              </div>
            )}
            {['process', 'natural', 'manufacturing', 'mechanical'].includes(selected) && (
              <div className="mb-8 flex justify-center w-full">
                <ProcessDiagram width={420} height={180} />
              </div>
            )}
            <div className="text-sm whitespace-pre-line">{nodeDetails[selected].details}</div>
            <button className="mt-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setSelected(null)}>Close</button>
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

export default Task1Mindmap;
