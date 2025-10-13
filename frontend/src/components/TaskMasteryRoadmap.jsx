import React from 'react';

const TaskMasteryRoadmap = () => (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-4">Task Mastery — Guided Roadmap</h1>

    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Task Mastery (Reorganized into 3 Parts)</h2>
      <div className="mb-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-2 border-b">Part</th>
              <th className="pb-2 border-b">Focus</th>
              <th className="pb-2 border-b">Key Question Types</th>
              <th className="pb-2 border-b">Typical Skills</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="py-2 pr-4 font-semibold">Part 1: Factual & Localized Information</td>
              <td className="py-2 pr-4">Locating precise data in short sections</td>
              <td className="py-2 pr-4">- True/False/Not Given<br/>- Yes/No/Not Given<br/>- Short Answers</td>
              <td className="py-2">Scanning, literal comprehension</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-semibold">Part 2: Structural Understanding</td>
              <td className="py-2 pr-4">Understanding passage organization</td>
              <td className="py-2 pr-4">- Matching Headings<br/>- Matching Information/Features</td>
              <td className="py-2">Skimming for main idea, recognizing paragraph focus</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-semibold">Part 3: Completion & Choice Tasks</td>
              <td className="py-2 pr-4">Synthesizing multiple ideas</td>
              <td className="py-2 pr-4">- Summary/Note/Table Completion<br/>- Multiple Choice Questions</td>
              <td className="py-2">Prediction, paraphrase recognition, grammar awareness</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Each part can have</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>🎧 Example walkthrough (with text + audio readout)</li>
        <li>🧩 Interactive test (drag-drop, highlight)</li>
        <li>🕓 Timed drill (10–12 min)</li>
      </ul>
    </section>

    <section className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Implementation ideas</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li><b>Walkthroughs</b>: short passages + audio player + annotated steps showing how to locate answers.</li>
        <li><b>Interactive tests</b>: drag-and-drop matching and highlight tools with immediate feedback.</li>
        <li><b>Timed drills</b>: bundled 10–12 minute practices with progress tracking and suggested review items.</li>
      </ul>
    </section>
  </div>
);

export default TaskMasteryRoadmap;
