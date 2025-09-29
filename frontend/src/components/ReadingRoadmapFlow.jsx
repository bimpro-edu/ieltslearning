import React, { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 'orientation',
    type: 'input',
    data: { label: 'Orientation\n- Purpose: Assess academic reading\n- Format: 3 passages, 40 Qs, 60 min\n- Challenges: Vocab, paraphrase, time, traps' },
    position: { x: 0, y: 0 },
    style: { width: 320 }
  },
  {
    id: 'foundations',
    data: { label: 'Foundations\n- Skimming, Scanning, Close Reading\n- Q Types: TFNG, YNNG, Matching, MCQ, Short Answer\n- Build vocab: AWL, synonyms, topics' },
    position: { x: 400, y: 0 },
    style: { width: 320 }
  },
  {
    id: 'task-mastery',
    data: { label: 'Task Mastery\n- TFNG: Stick to text, beware paraphrase\n- Headings: Main idea focus\n- Summary/Table: Predict grammar, word limit\n- MCQ: Eliminate by detail\n- Matching: Synonyms\n- Short: Concise, spelling' },
    position: { x: 0, y: 250 },
    style: { width: 320 }
  },
  {
    id: 'advanced',
    data: { label: 'Advanced Skills\n- Paraphrase tracking\n- Inference\n- Time: 20min/passage, move on if stuck\n- Trap: Similar/Extreme words' },
    position: { x: 400, y: 250 },
    style: { width: 320 }
  }
];

const initialEdges = [
  { id: 'e1-2', source: 'orientation', target: 'foundations', animated: true },
  { id: 'e1-3', source: 'orientation', target: 'task-mastery', animated: true },
  { id: 'e2-4', source: 'foundations', target: 'advanced', animated: true },
  { id: 'e3-4', source: 'task-mastery', target: 'advanced', animated: true }
];

export default function ReadingRoadmapFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
