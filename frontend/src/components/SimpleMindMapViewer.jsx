import React, { useCallback, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

export default function SimpleMindMapViewer({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState((data && data.nodes) || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState((data && data.edges) || []);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
    }
  }, [data, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
