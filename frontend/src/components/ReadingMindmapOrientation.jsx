import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Orientation' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Purpose' }, position: { x: 0, y: 100 } },
  { id: '3', data: { label: 'Format' }, position: { x: 250, y: 100 } },
  { id: '4', data: { label: 'Key Challenges' }, position: { x: 500, y: 100 } },
  { id: '2a', data: { label: 'Assess ability to understand academic texts, locate information, process paraphrased details under time pressure.' }, position: { x: -100, y: 200 } },
  { id: '3a', data: { label: 'Academic: 3 passages (~900 words), 40 Qs, 60 min' }, position: { x: 150, y: 200 } },
  { id: '3b', data: { label: 'General: Shorter, workplace/social + 1 long passage' }, position: { x: 350, y: 200 } },
  { id: '4a', data: { label: 'Vocabulary density' }, position: { x: 400, y: 200 } },
  { id: '4b', data: { label: 'Paraphrasing & synonyms' }, position: { x: 600, y: 200 } },
  { id: '4c', data: { label: 'Time management (20 min/passage)' }, position: { x: 800, y: 200 } },
  { id: '4d', data: { label: 'Trap answers & distractors' }, position: { x: 1000, y: 200 } }
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e3-3a', source: '3', target: '3a' },
  { id: 'e3-3b', source: '3', target: '3b' },
  { id: 'e4-4a', source: '4', target: '4a' },
  { id: 'e4-4b', source: '4', target: '4b' },
  { id: 'e4-4c', source: '4', target: '4c' },
  { id: 'e4-4d', source: '4', target: '4d' }
];

export default function ReadingMindmapOrientation() {
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
