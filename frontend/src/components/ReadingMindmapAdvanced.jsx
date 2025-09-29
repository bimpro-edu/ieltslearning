import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Advanced Reading Skills' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Paraphrase Tracking' }, position: { x: 0, y: 100 } },
  { id: '3', data: { label: 'Inference Skills' }, position: { x: 250, y: 100 } },
  { id: '4', data: { label: 'Time Management' }, position: { x: 500, y: 100 } },
  { id: '5', data: { label: 'Trap Awareness' }, position: { x: 750, y: 100 } },
  { id: '2a', data: { label: 'Spotting equivalent expressions' }, position: { x: -100, y: 200 } },
  { id: '3a', data: { label: 'Reading beyond literal meaning' }, position: { x: 250, y: 200 } },
  { id: '4a', data: { label: '20 min per passage guideline' }, position: { x: 500, y: 200 } },
  { id: '4b', data: { label: 'Move on if stuck, return later' }, position: { x: 600, y: 200 } },
  { id: '5a', data: { label: 'Similar words ≠ correct answer' }, position: { x: 750, y: 200 } },
  { id: '5b', data: { label: '“Extreme” words often signal incorrect distractors' }, position: { x: 900, y: 200 } }
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },
  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e3-3a', source: '3', target: '3a' },
  { id: 'e4-4a', source: '4', target: '4a' },
  { id: 'e4-4b', source: '4', target: '4b' },
  { id: 'e5-5a', source: '5', target: '5a' },
  { id: 'e5-5b', source: '5', target: '5b' }
];

export default function ReadingMindmapAdvanced() {
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
