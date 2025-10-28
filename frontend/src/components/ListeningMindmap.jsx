import React from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node component
const CustomNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold">{data.label}</div>
      {data.description && (
        <div className="text-gray-500 text-sm mt-1">{data.description}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function ListeningMindmap({ data }) {
  if (!data || !data.nodes) {
    return <div>No mindmap data available</div>;
  }

  // Convert mindmap data to ReactFlow format
  const nodes = data.nodes.map(node => ({
    id: node.id,
    type: 'custom',
    position: { x: 0, y: 0 }, // You'll need to calculate positions
    data: { 
      label: node.label,
      description: node.data?.description
    }
  }));

  // Create edges from parent-child relationships
  const edges = data.nodes
    .filter(node => node.children)
    .flatMap(node => 
      node.children.map(childId => ({
        id: `${node.id}-${childId}`,
        source: node.id,
        target: childId,
        type: 'smoothstep'
      }))
    );

  // Auto-layout nodes in a tree structure
  const layoutNodes = (nodes, edges) => {
    const VERTICAL_SPACING = 100;
    const HORIZONTAL_SPACING = 200;
    
    // Find root nodes (nodes with no incoming edges)
    const hasIncoming = new Set(edges.map(e => e.target));
    const roots = nodes.filter(n => !hasIncoming.has(n.id));
    
    // Position nodes level by level
    let y = 0;
    const positioned = new Set();
    
    const positionLevel = (levelNodes) => {
      const x = -(levelNodes.length * HORIZONTAL_SPACING) / 2;
      levelNodes.forEach((node, i) => {
        node.position = {
          x: x + (i * HORIZONTAL_SPACING),
          y
        };
        positioned.add(node.id);
      });
      
      // Get next level nodes
      const nextLevel = edges
        .filter(e => levelNodes.some(n => n.id === e.source))
        .map(e => nodes.find(n => n.id === e.target))
        .filter(n => !positioned.has(n.id));
      
      if (nextLevel.length > 0) {
        y += VERTICAL_SPACING;
        positionLevel(nextLevel);
      }
    };
    
    positionLevel(roots);
    return nodes;
  };

  const positionedNodes = layoutNodes(nodes, edges);

  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        nodes={positionedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}