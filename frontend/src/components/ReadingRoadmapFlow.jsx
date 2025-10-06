import React, { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const nodeColors = {
  foundations: '#fda4af', // pink
  'task-mastery': '#bfdbfe', // blue
  advanced: '#bbf7d0' // green
};

const initialNodes = [
  {
    id: 'foundations',
    type: 'input',
    data: {
      label:
        'Foundations\n' +
        '- Reading Skills:\n' +
        '  • Skimming: Grabbing main idea quickly.\n' +
        '  • Scanning: Locating specific facts (dates, names, numbers).\n' +
        '  • Close Reading: For True/False/Not Given, inference, matching headings.\n' +
        '\n' +
        '- Understanding Question Types:\n' +
        '  • True/False/Not Given (TFNG)\n' +
        '  • Yes/No/Not Given (YNNG)\n' +
        '  • Matching headings\n' +
        '  • Matching information/features\n' +
        '  • Sentence completion\n' +
        '  • Summary/Note/Table completion\n' +
        '  • Multiple Choice Questions (MCQs)\n' +
        '  • Short answer questions\n' +
        '\n' +
        '- Building Vocabulary for Reading:\n' +
        '  • Academic Word List (AWL)\n' +
        '  • Synonyms and collocations\n' +
        '  • Topic-based clusters (science, history, environment, society)'
    },
    position: { x: 0, y: 0 },
    style: { width: 320, background: nodeColors.foundations, color: '#111' }
  },
  {
    id: 'task-mastery',
    data: { label: 'Task Mastery\n- TFNG: Stick to text, beware paraphrase\n- Headings: Main idea focus\n- Summary/Table: Predict grammar, word limit\n- MCQ: Eliminate by detail\n- Matching: Synonyms\n- Short: Concise, spelling' },
    position: { x: 0, y: 250 },
    style: { width: 320, background: nodeColors['task-mastery'], color: '#042' }
  },
  {
    id: 'advanced',
    data: { label: 'Advanced Skills\n- Paraphrase tracking\n- Inference\n- Time: 20min/passage, move on if stuck\n- Trap: Similar/Extreme words' },
    position: { x: 400, y: 250 },
    style: { width: 320, background: nodeColors.advanced, color: '#063' }
  }
];

const initialEdges = [
  { id: 'e2-4', source: 'foundations', target: 'advanced', animated: true },
  { id: 'e3-4', source: 'task-mastery', target: 'advanced', animated: true }
];

export default function ReadingRoadmapFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  // Base style to apply for nodes that don't have custom styles
  const nodeBaseStyle = {
    border: '2px solid #90caf9',
    borderRadius: 8,
    padding: 8,
    background: '#fff',
    minWidth: 140,
    color: '#111',
  };

  // Map nodes so any node with an id matching our color map receives that background
  const styledNodes = nodes.map(n => ({
    ...n,
    style: {
      ...nodeBaseStyle,
      ...n.style,
      background: (n.style && n.style.background) || nodeColors[n.id] || nodeBaseStyle.background,
      color: (n.style && n.style.color) || nodeBaseStyle.color,
    }
  }));

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap nodeColor={(n) => {
          // Prefer any inline style background, then our mapping, then a neutral fallback
          return n.style?.background || nodeColors[n.id] || (n.type === 'input' ? '#fca5a5' : '#ddd');
        }} />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
