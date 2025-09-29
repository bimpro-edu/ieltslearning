import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Task Mastery' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'TFNG' }, position: { x: 0, y: 100 } },
  { id: '3', data: { label: 'Matching Headings' }, position: { x: 250, y: 100 } },
  { id: '4', data: { label: 'Summary/Note/Table Completion' }, position: { x: 500, y: 100 } },
  { id: '5', data: { label: 'Multiple Choice' }, position: { x: 0, y: 200 } },
  { id: '6', data: { label: 'Matching Information/Features' }, position: { x: 250, y: 200 } },
  { id: '7', data: { label: 'Short Answers' }, position: { x: 500, y: 200 } },
  { id: '2a', data: { label: 'Look for factual statements; beware paraphrasing.\nTrap: Stick to text, not your knowledge.' }, position: { x: -100, y: 300 } },
  { id: '3a', data: { label: 'Focus on main idea of each paragraph, not details.' }, position: { x: 150, y: 300 } },
  { id: '4a', data: { label: 'Predict grammar & type of missing word.\nWatch word limit.' }, position: { x: 350, y: 300 } },
  { id: '5a', data: { label: 'Eliminate wrong answers by spotting subtle differences.' }, position: { x: -100, y: 400 } },
  { id: '6a', data: { label: 'Match details to paragraphs (look for synonyms).' }, position: { x: 250, y: 400 } },
  { id: '7a', data: { label: 'Write concise; spelling errors = wrong.' }, position: { x: 500, y: 400 } }
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e3-3a', source: '3', target: '3a' },
  { id: 'e4-4a', source: '4', target: '4a' },
  { id: 'e1-5', source: '1', target: '5' },
  { id: 'e1-6', source: '1', target: '6' },
  { id: 'e1-7', source: '1', target: '7' },
  { id: 'e5-5a', source: '5', target: '5a' },
  { id: 'e6-6a', source: '6', target: '6a' },
  { id: 'e7-7a', source: '7', target: '7a' }
];

export default function ReadingMindmapTaskMastery() {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
