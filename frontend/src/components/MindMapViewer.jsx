import React, { useCallback, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

// Helper function to convert mind map JSON to React Flow nodes and edges

const convertToReactFlow = (mindMapData) => {
  const initialNodes = [];
  const initialEdges = [];
  let id = 0;

  // Root node (Topic/Thesis)
  const rootNodeId = String(id++);
  initialNodes.push({
    id: rootNodeId,
    position: { x: 0, y: 0 },
    data: { label: mindMapData.topic + '\n(' + mindMapData.thesis + ')' },
    type: 'input',
    style: { backgroundColor: '#e0f2f7', border: '1px solid #0288d1', borderRadius: '5px', padding: '10px', width: '250px', textAlign: 'center' },
  });

  // Arguments
  mindMapData.arguments.forEach((arg, argIndex) => {
    const argNodeId = String(id++);
    const argColor = arg.side === 'Isolation' || arg.side === 'Drawbacks' || arg.side === 'Causes' || arg.side === 'Disadvantages' ? '#ffe0b2' : '#c8e6c9'; // Orange for negative, Green for positive
    const argBorder = arg.side === 'Isolation' || arg.side === 'Drawbacks' || arg.side === 'Causes' || arg.side === 'Disadvantages' ? '#fb8c00' : '#43a047';

    initialNodes.push({
      id: argNodeId,
      position: { x: (argIndex % 2 === 0 ? -200 : 200), y: 150 + (argIndex * 50) },
      data: { label: arg.side + '\n(' + arg.reason + ')' },
      style: { backgroundColor: argColor, border: `1px solid ${argBorder}`, borderRadius: '5px', padding: '10px', width: '200px', textAlign: 'center' },
    });
    initialEdges.push({ id: `e${rootNodeId}-${argNodeId}`, source: rootNodeId, target: argNodeId, animated: true });

    // Examples
    arg.examples.forEach((example, exIndex) => {
      const exNodeId = String(id++);
      initialNodes.push({
        id: exNodeId,
        position: { x: (argIndex % 2 === 0 ? -300 : 300), y: 250 + (argIndex * 100) + (exIndex * 50) },
        data: { label: example },
        style: { backgroundColor: '#fff9c4', border: '1px solid #fbc02d', borderRadius: '5px', padding: '8px', width: '180px', textAlign: 'center' },
      });
      initialEdges.push({ id: `e${argNodeId}-${exNodeId}`, source: argNodeId, target: exNodeId });
    });

    // Connectors
    arg.connectors.forEach((connector, connIndex) => {
      const connNodeId = String(id++);
      initialNodes.push({
        id: connNodeId,
        position: { x: (argIndex % 2 === 0 ? -100 : 100), y: 200 + (argIndex * 100) + (connIndex * 30) },
        data: { label: connector },
        style: { backgroundColor: '#bbdefb', border: '1px solid #1976d2', borderRadius: '5px', padding: '5px', width: '100px', textAlign: 'center' },
      });
      initialEdges.push({ id: `e${argNodeId}-${connNodeId}`, source: argNodeId, target: connNodeId, type: 'step' });
    });

    // Sample Sentences
    if (arg.sample_sentences && Array.isArray(arg.sample_sentences)) {
      arg.sample_sentences.forEach((sentence, sentIdx) => {
        const sentNodeId = String(id++);
        initialNodes.push({
          id: sentNodeId,
          position: { x: (argIndex % 2 === 0 ? -400 : 400), y: 350 + (argIndex * 100) + (sentIdx * 40) },
          data: { label: sentence },
          style: { backgroundColor: '#e1bee7', border: '1px solid #8e24aa', borderRadius: '5px', padding: '8px', width: '220px', textAlign: 'center', fontStyle: 'italic' },
        });
        initialEdges.push({ id: `e${argNodeId}-${sentNodeId}`, source: argNodeId, target: sentNodeId });
      });
    }
  });

  return { initialNodes, initialEdges };
};


export default function MindMapViewer({ mindMapData }) {
  const { initialNodes, initialEdges } = convertToReactFlow(mindMapData);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Reset nodes/edges when mindMapData changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    // eslint-disable-next-line
  }, [mindMapData]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        {/* MiniMap overlay in bottom-right */}
        <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          <MiniMap style={{ width: 120, height: 80 }} />
        </div>
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
