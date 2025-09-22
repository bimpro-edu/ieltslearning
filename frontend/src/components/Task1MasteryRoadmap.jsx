import React from "react";

const Task1MasteryRoadmap = () => (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-4">Task 1 Mastery (Academic) — Guided Roadmap</h1>

    {/* A. Graphs & Charts */}
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">A. Graphs & Charts (Data Representation)</h2>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Line Graphs</b> → trends over time</li>
        <li><b>Bar Charts</b> (vertical/horizontal) → comparisons across groups</li>
        <li><b>Pie Charts</b> → proportions/percentages</li>
        <li><b>Tables</b> → raw numerical comparisons</li>
        <li><b>Mixed Graphs</b> → e.g., line + bar, pie + table</li>
        <li><b>Stacked Bar/Column Charts</b> → breakdown by subcategories</li>
        <li><b>Area Graphs</b> → cumulative trends</li>
        <li><b>Scatter/Bubble Charts</b> → variable relationships (less common but possible)</li>
      </ul>
      <div className="mb-2">
        <span className="font-semibold">🎮 Interactive Idea:</span> <br />
        <span>“Chart-to-Approach Matcher” – students drag chart types to their best writing focus:</span>
        <ul className="list-disc ml-8 mt-1">
          <li>Trend → Line/Area</li>
          <li>Comparison → Bar/Table</li>
          <li>Proportion → Pie/Stacked</li>
          <li>Correlation → Scatter/Bubble</li>
        </ul>
      </div>
    </section>

    {/* B. Processes & Diagrams */}
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">B. Processes & Diagrams (Flow / Mechanisms)</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Natural Processes (water cycle, animal life cycle)</li>
        <li>Manufacturing/Industrial Processes (cement production, recycling, farming)</li>
        <li>Mechanical/Technical Diagrams (wind turbines, engines, solar power plants)</li>
      </ul>
      <div className="mb-2">
        <span className="font-semibold">🎮 Interactive Idea:</span> <br />
        <span>“Connector Drag & Drop” – students drag sequence connectors (First, Next, Then, After that, Finally) to correct places in a blank flow chart.</span>
      </div>
    </section>

    {/* C. Maps & Spatial Representations */}
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">C. Maps & Spatial Representations</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Static Maps (describing one layout/location)</li>
        <li>Before/After Maps (development, modernization, urban changes)</li>
        <li>Comparative Maps (different cities or different decades)</li>
      </ul>
      <div className="mb-2">
        <span className="font-semibold">🎮 Interactive Idea:</span> <br />
        <span>“Map Slider” – drag slider left/right to reveal before vs after → student types transformation sentences.</span>
      </div>
    </section>

    {/* D. Mini-Test 1 */}
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">D. <span className="inline-block align-middle">✅</span> Mini-Test 1 (Integrated Practice)</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Set 1: Chart (line/bar/pie)</li>
        <li>Set 2: Process diagram</li>
        <li>Set 3: Map (before/after)</li>
      </ul>
      <p className="mb-2">Students complete one or more tasks under exam-like conditions:</p>
      <ul className="list-disc ml-8 mb-2">
        <li>Write 150+ words</li>
        <li>Highlight key features before writing</li>
        <li>Use word counter</li>
        <li>Submit & compare with Band 5 vs Band 7 vs Band 9 model answers</li>
      </ul>
      <div className="mb-2">
        <span className="font-semibold">🎮 Interactive Idea:</span> <br />
        <span>“Key Feature Highlighter” → highlight 3–5 essential features before writing (system auto-checks coverage).</span>
      </div>
    </section>

    {/* Flow Summary */}
    <section className="mb-2">
      <h2 className="text-lg font-semibold mb-1">🚀 Flow Summary</h2>
      <ul className="list-disc ml-6">
        <li>Graphs & Charts → all data types + matcher game</li>
        <li>Processes & Diagrams → sequencing drag-drop</li>
        <li>Maps → before/after slider practice</li>
        <li>Mini-Test 1 → live exam simulation (word count + model answer comparison)</li>
      </ul>
    </section>
  </div>
);

export default Task1MasteryRoadmap;
