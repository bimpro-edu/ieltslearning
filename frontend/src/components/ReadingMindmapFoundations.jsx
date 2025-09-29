import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Foundations' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Reading Skills' }, position: { x: 0, y: 100 } },
  { id: '3', data: { label: 'Question Types' }, position: { x: 250, y: 100 } },
  { id: '4', data: { label: 'Building Vocabulary' }, position: { x: 500, y: 100 } },
  { id: '2a', data: { label: 'Skimming: Main idea quickly' }, position: { x: -100, y: 200 } },
  { id: '2b', data: { label: 'Scanning: Find facts (dates, names, numbers)' }, position: { x: 0, y: 200 } },
  { id: '2c', data: { label: 'Close Reading: TFNG, inference, headings' }, position: { x: 100, y: 200 } },
  { id: '3a', data: { label: 'TFNG, YNNG, Matching, MCQ, Short Answer, Completion' }, position: { x: 250, y: 200 } },
  { id: '4a', data: { label: 'AWL (Academic Word List)' }, position: { x: 400, y: 200 } },
  { id: '4b', data: { label: 'Synonyms & collocations' }, position: { x: 500, y: 200 } },
  { id: '4c', data: { label: 'Topic clusters (science, history, etc.)' }, position: { x: 600, y: 200 } }
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e2-2b', source: '2', target: '2b' },
  { id: 'e2-2c', source: '2', target: '2c' },
  { id: 'e3-3a', source: '3', target: '3a' },
  { id: 'e4-4a', source: '4', target: '4a' },
  { id: 'e4-4b', source: '4', target: '4b' },
  { id: 'e4-4c', source: '4', target: '4c' }
];

export default function ReadingMindmapFoundations() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
