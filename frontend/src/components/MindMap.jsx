import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define node styles based on type
const nodeStyles = {
  mainTopic: {
    background: '#e8f4ff',
    border: '1px solid #90caf9',
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '14px',
    minWidth: 180,
    maxWidth: 250,
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  example: {
    background: '#fff9c4', // Light yellow for examples
    border: '1px solid #90caf9',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    minWidth: 160,
    maxWidth: 220,
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  detail: {
    background: '#e8f5e9', // Light green for details/steps
    border: '1px solid #90caf9',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    minWidth: 160,
    maxWidth: 220,
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  connector: {
    background: '#f3f6f9', // Very light blue for connectors
    border: '1px solid #90caf9',
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '13px',
    minWidth: 80,
    maxWidth: 120,
    textAlign: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  }
};

const processNode = (node, startX = 300, startY = 50) => {
  const nodes = [];
  const edges = [];
  const levelWidth = 280; // Width between nodes in the same level
  const levelHeight = 80; // Height between levels
  
  // Add main topic node
  const mainNode = {
    id: node.id.toString(),
    type: 'default',
    position: { x: startX, y: startY },
    data: { label: node.text || node.title },
    style: nodeStyles.mainTopic,
  };
  nodes.push(mainNode);

  if (node.children) {
    const centerY = startY + levelHeight;
    const numChildren = node.children.length;
    const totalWidth = (numChildren - 1) * levelWidth;
    let startLeft = startX - totalWidth / 2;

    node.children.forEach((child, index) => {
      const childX = startLeft + index * levelWidth;
      const childY = centerY;

      // Add connector node if needed
      if (child.connector) {
        const connectorNode = {
          id: `connector-${child.id}`,
          type: 'default',
          position: { 
            x: (childX + startX) / 2,
            y: (childY + startY) / 2 
          },
          data: { label: child.connector },
          style: nodeStyles.connector,
        };
        nodes.push(connectorNode);
        edges.push({
          id: `e-${node.id}-${connectorNode.id}`,
          source: node.id.toString(),
          target: connectorNode.id,
          type: 'default',
          animated: true,
          style: { 
            stroke: '#94a3b8',
            strokeWidth: 1,
            strokeDasharray: '5,5'
          },
          markerEnd: { 
            type: MarkerType.ArrowClosed,
            color: '#94a3b8'
          },
        });
      }

      // Add child node
      const childNode = {
        id: child.id.toString(),
        type: 'default',
        position: { x: childX, y: childY },
        data: { label: child.text },
        style: child.type === 'example' ? nodeStyles.example : nodeStyles.detail,
      };
      nodes.push(childNode);

      // Connect to parent or connector
      edges.push({
        id: `e-${child.connector ? 'connector-' : ''}${node.id}-${child.id}`,
        source: child.connector ? `connector-${child.id}` : node.id.toString(),
        target: child.id.toString(),
        type: 'default',
        animated: true,
        style: { 
          stroke: '#94a3b8',
          strokeWidth: 1,
          strokeDasharray: '5,5'
        },
        markerEnd: { 
          type: MarkerType.ArrowClosed,
          color: '#94a3b8'
        },
      });

      // Process child's children if any
      if (child.children) {
        const [childNodes, childEdges] = processNode(
          child,
          childX,
          childY + levelHeight
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
      }
    });
  }

  return [nodes, edges];
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { 
    stroke: '#90caf9',
    strokeWidth: 1.5
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 15,
    height: 15,
    color: '#94a3b8',
  }
};

export default function MindMap({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  React.useEffect(() => {
    if (data) {
      const [processedNodes, processedEdges] = processNode(data);
      setNodes(processedNodes);
      setEdges(processedEdges);
    }
  }, [data, setNodes, setEdges]);

  if (!data) {
    return <div className="text-gray-500 text-center p-4">No mindmap data available</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Background variant="dots" gap={12} size={1} color="#94a3b8" />
        <Controls />
      </ReactFlow>
    </div>
  );
}