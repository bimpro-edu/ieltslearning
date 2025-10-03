import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Icons for different node types
const BrainIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M20 16c-4 0-8 3-8 8 0 2 1 4 2 6-3 1-6 4-6 8 0 6 4 10 10 10h2c0 3 2 6 6 6h8c4 0 6-3 6-6h2c6 0 10-4 10-10 0-4-3-7-6-8 1-2 2-4 2-6 0-5-4-8-8-8-2 0-4 1-6 2-2-1-4-2-6-2z" 
          fill="#e0e7ff" stroke="#0891b2" strokeWidth="2"/>
    <circle cx="26" cy="28" r="2" fill="#0891b2"/>
    <circle cx="38" cy="28" r="2" fill="#0891b2"/>
    <path d="M28 36h8" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AnalysisIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#fff" stroke="#be185d" strokeWidth="2"/>
    <path d="M16 24h32M16 32h24M16 40h28" stroke="#be185d" strokeWidth="2"/>
    <circle cx="48" cy="16" r="6" fill="#ec4899"/>
    <path d="M45 16l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StrategyIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <path d="M32 8l6 12h12l-10 8 4 12-12-8-12 8 4-12-10-8h12z" 
          fill="#fff3cd" stroke="#ea580c" strokeWidth="2"/>
    <circle cx="32" cy="32" r="8" fill="#ea580c"/>
    <path d="M28 32l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Utility functions
function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#+\s?(.*)/gm, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\!\[(.*?)\]\((.*?)\)/g, '')
    .replace(/^- /gm, '• ')
    .trim();
}

function removeVisual(text) {
  if (!text) return '';
  return text.replace(/\n?Visual:([\s\S]*)$/i, '').trim();
}

// Child map definition
const getChildMap = () => {
  return {
    advancedCenter: ["inferenceMastery", "criticalAnalysis", "strategicMastery"],
    inferenceMastery: ["logicalInference", "contextualInference", "predictiveInference"],
    criticalAnalysis: ["biasDetection", "argumentEvaluation", "informationSynthesis"],
    strategicMastery: ["metaCognitive", "efficiencyOptimization", "adaptiveStrategies"],
  };
};

// Collapsible node component
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle, hasChildren } = data;
  const showToggle = hasChildren;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(props.style || {}) }} className={props.className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{data.label}</div>
      {showToggle && (
        <button
          style={{ 
            marginLeft: 8, 
            padding: '2px 10px', 
            borderRadius: 6, 
            border: '1px solid #1976d2', 
            background: isExpanded ? '#e3f2fd' : '#fff', 
            color: '#1976d2', 
            cursor: 'pointer', 
            fontSize: 14 
          }}
          onClick={e => { e.stopPropagation(); onToggle(id); }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const nodeTypes = { collapsible: CollapsibleNode };

const nodeBaseStyle = {
  border: '2px solid #90caf9',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 200,
  minHeight: 40,
  cursor: 'pointer',
};

// Color map for node backgrounds
const nodeBgColors = {
  advancedCenter: '#e0e7ff',
  inferenceMastery: '#0ea5e9',
  criticalAnalysis: '#ec4899',
  strategicMastery: '#fb923c',
  logicalInference: '#38bdf8',
  contextualInference: '#38bdf8',
  predictiveInference: '#38bdf8',
  biasDetection: '#ec4899',
  argumentEvaluation: '#ec4899',
  informationSynthesis: '#ec4899',
  metaCognitive: '#fb923c',
  efficiencyOptimization: '#fb923c',
  adaptiveStrategies: '#fb923c',
};

// Detailed node information
const nodeDetails = {
  advancedCenter: {
    title: "Advanced Reading Strategies 2025",
    details: `High-level skills for Band 8+ performance.\n\n**Inference Mastery:**\n• Logical inference: Premise-conclusion analysis\n• Contextual inference: Cultural/historical integration\n• Predictive inference: Trend extrapolation\n\n**Critical Analysis:**\n• Bias detection and source evaluation\n• Argument structure analysis\n• Multi-source information synthesis\n\n**Strategic Mastery:**\n• Meta-cognitive reading awareness\n• Efficiency optimization techniques\n• Adaptive strategy modification\n\n**Performance Standards:**\n- 95%+ accuracy on complex texts\n- Superior time efficiency\n- Sophisticated reasoning demonstration`,
    icon: BrainIcon,
    bg: '#e0e7ff',
  },
  
  inferenceMastery: {
    title: "Inference Mastery",
    details: `Develop sophisticated inference skills for complex academic texts.\n\n**Three Types:**\n• Logical inference from evidence\n• Contextual inference from background\n• Predictive inference about outcomes\n\n**Applications:**\n• Scientific hypothesis evaluation\n• Historical cause-effect analysis\n• Economic trend prediction\n• Social phenomenon explanation`,
    icon: BrainIcon,
    bg: '#0ea5e9',
  },

  logicalInference: {
    title: "Logical Inference Skills",
    details: `**Premise-Conclusion Analysis:**\n\n**Logical Patterns:**\n• If-then conditional statements\n• Cause-effect relationships\n• Comparison and contrast logic\n• Classification and categorization\n• Generalization from examples\n\n**Advanced Skills:**\n• Implicit assumption identification\n• Logical gap recognition\n• Validity vs soundness assessment\n• Conditional logic application\n• Probability assessment\n\n**Framework:**\n1. Identify premises and conclusions\n2. Evaluate evidence quality\n3. Check logical connections\n4. Consider alternatives\n5. Assess conclusion strength`,
    icon: BrainIcon,
    bg: '#38bdf8',
  },

  contextualInference: {
    title: "Contextual Inference Techniques",
    details: `**Cultural and Historical Integration:**\n\n**Context Types:**\n• Historical background\n• Cultural norms and values\n• Geographic factors\n• Socioeconomic conditions\n• Political framework\n\n**Skills:**\n• Background knowledge activation\n• Cultural assumption recognition\n• Historical perspective integration\n• Cross-cultural comparison\n• Temporal context consideration\n\n**Success Strategy:**\n1. Activate relevant background\n2. Identify contextual indicators\n3. Consider multiple contexts\n4. Integrate with explicit info\n5. Evaluate context-dependent meanings`,
    icon: AnalysisIcon,
    bg: '#38bdf8',
  },

  predictiveInference: {
    title: "Predictive Inference Development",
    details: `**Trend Extrapolation:**\n\n**Prediction Types:**\n• Outcome forecasting\n• Consequence prediction\n• Trend extrapolation\n• Scenario development\n• Risk assessment\n\n**Skills:**\n• Pattern recognition\n• Multiple variable interaction\n• Uncertainty quantification\n• Alternative scenarios\n• Probability evaluation\n\n**Framework:**\n1. Identify current trends\n2. Analyze driving forces\n3. Consider multiple factors\n4. Evaluate constraints\n5. Develop scenarios\n6. Assess probabilities`,
    icon: StrategyIcon,
    bg: '#38bdf8',
  },

  criticalAnalysis: {
    title: "Critical Analysis Skills",
    details: `Develop sophisticated analytical skills.\n\n**Components:**\n• Bias detection and evaluation\n• Argument structure analysis\n• Multi-source synthesis\n\n**Applications:**\n• Research paper evaluation\n• Media content analysis\n• Policy document assessment\n• Academic debate understanding`,
    icon: AnalysisIcon,
    bg: '#ec4899',
  },

  biasDetection: {
    title: "Bias Detection Skills",
    details: `**Author Perspective Evaluation:**\n\n**Bias Types:**\n• Selection bias\n• Confirmation bias\n• Cultural bias\n• Institutional bias\n• Personal bias\n\n**Detection Techniques:**\n• Source credibility evaluation\n• Language choice analysis\n• Evidence selection patterns\n• Omission recognition\n\n**Success Framework:**\n1. Identify author background\n2. Analyze language choices\n3. Evaluate evidence patterns\n4. Consider omitted perspectives\n5. Compare alternative sources\n6. Assess credibility`,
    icon: AnalysisIcon,
    bg: '#ec4899',
  },

  argumentEvaluation: {
    title: "Argument Structure Analysis",
    details: `**Logical Structure Assessment:**\n\n**Components:**\n• Claims and evidence\n• Reasoning connections\n• Assumptions\n• Counter-arguments\n• Conclusions\n\n**Evaluation Criteria:**\n• Evidence relevance\n• Reasoning validity\n• Assumption validity\n• Logical fallacy detection\n• Conclusion justification\n\n**Success Strategy:**\n1. Identify main claims\n2. Map evidence to claims\n3. Evaluate reasoning\n4. Check for fallacies\n5. Assess evidence quality\n6. Consider alternatives`,
    icon: BrainIcon,
    bg: '#ec4899',
  },

  informationSynthesis: {
    title: "Information Synthesis Excellence",
    details: `**Multi-Source Integration:**\n\n**Techniques:**\n• Cross-source comparison\n• Pattern identification\n• Contradiction resolution\n• Gap analysis\n• Perspective convergence\n\n**Integration Strategies:**\n• Thematic organization\n• Chronological synthesis\n• Causal chain construction\n• Comparative analysis\n• System-level understanding\n\n**Framework:**\n1. Collect multiple sources\n2. Identify patterns\n3. Compare perspectives\n4. Resolve contradictions\n5. Identify gaps\n6. Construct integration`,
    icon: StrategyIcon,
    bg: '#ec4899',
  },

  strategicMastery: {
    title: "Strategic Reading Mastery",
    details: `Develop meta-cognitive awareness.\n\n**Components:**\n• Meta-cognitive awareness\n• Efficiency optimization\n• Adaptive modification\n\n**Applications:**\n• Complex text navigation\n• Multi-task coordination\n• Strategic time management\n• Error prevention`,
    icon: StrategyIcon,
    bg: '#fb923c',
  },

  metaCognitive: {
    title: "Meta-cognitive Reading Skills",
    details: `**Self-Awareness:**\n\n**Components:**\n• Strategy knowledge\n• Task awareness\n• Self-monitoring\n• Performance evaluation\n• Strategy modification\n\n**Skills:**\n• Comprehension checking\n• Strategy effectiveness\n• Error detection\n• Progress tracking\n• Resource allocation\n\n**Framework:**\n1. Assess task demands\n2. Select strategies\n3. Monitor progress\n4. Detect problems\n5. Adjust strategies\n6. Evaluate performance`,
    icon: BrainIcon,
    bg: '#fb923c',
  },

  efficiencyOptimization: {
    title: "Efficiency Optimization",
    details: `**Speed-Accuracy Balance:**\n\n**Principles:**\n• Resource allocation\n• Attention optimization\n• Energy conservation\n• Time prioritization\n\n**Techniques:**\n• Selective reading\n• Information prioritization\n• Cognitive shortcuts\n• Pattern recognition\n• Automatic processes\n\n**Strategies:**\n1. Analyze efficiency needs\n2. Identify bottlenecks\n3. Develop optimization\n4. Practice for automaticity\n5. Monitor performance\n6. Maintain quality`,
    icon: StrategyIcon,
    bg: '#fb923c',
  },

  adaptiveStrategies: {
    title: "Adaptive Strategy Modification",
    details: `**Flexible Application:**\n\n**Adaptation Triggers:**\n• Task complexity changes\n• Time pressure variations\n• Content difficulty shifts\n• Performance feedback\n\n**Modification Types:**\n• Approach adjustment\n• Technique refinement\n• Goal modification\n• Resource reallocation\n\n**Framework:**\n1. Monitor effectiveness\n2. Recognize adaptation needs\n3. Generate options\n4. Test changes\n5. Refine based on results\n6. Generalize successes`,
    icon: BrainIcon,
    bg: '#fb923c',
  },
};

// Node structure definition
const baseNodes = [
  { id: "advancedCenter", data: { label: "Advanced Reading Strategies" }, position: { x: 0, y: 0 }, draggable: true },
  { id: "inferenceMastery", type: "collapsible", data: { label: "Inference Mastery" }, position: { x: -300, y: 150 }, draggable: true },
  { id: "criticalAnalysis", type: "collapsible", data: { label: "Critical Analysis" }, position: { x: 0, y: 150 }, draggable: true },
  { id: "strategicMastery", type: "collapsible", data: { label: "Strategic Mastery" }, position: { x: 300, y: 150 }, draggable: true },
  { id: "logicalInference", data: { label: "Logical Inference" }, position: { x: -500, y: 250 }, draggable: true },
  { id: "contextualInference", data: { label: "Contextual Inference" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "predictiveInference", data: { label: "Predictive Inference" }, position: { x: -100, y: 250 }, draggable: true },
  { id: "biasDetection", data: { label: "Bias Detection" }, position: { x: -150, y: 250 }, draggable: true },
  { id: "argumentEvaluation", data: { label: "Argument Evaluation" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "informationSynthesis", data: { label: "Information Synthesis" }, position: { x: 150, y: 250 }, draggable: true },
  { id: "metaCognitive", data: { label: "Meta-cognitive Skills" }, position: { x: 100, y: 250 }, draggable: true },
  { id: "efficiencyOptimization", data: { label: "Efficiency Optimization" }, position: { x: 300, y: 250 }, draggable: true },
  { id: "adaptiveStrategies", data: { label: "Adaptive Strategies" }, position: { x: 500, y: 250 }, draggable: true },
];

const initialEdges = [
  { id: 'e-center-inference', source: 'advancedCenter', target: 'inferenceMastery' },
  { id: 'e-center-critical', source: 'advancedCenter', target: 'criticalAnalysis' },
  { id: 'e-center-strategic', source: 'advancedCenter', target: 'strategicMastery' },
  { id: 'e-inference-logical', source: 'inferenceMastery', target: 'logicalInference' },
  { id: 'e-inference-contextual', source: 'inferenceMastery', target: 'contextualInference' },
  { id: 'e-inference-predictive', source: 'inferenceMastery', target: 'predictiveInference' },
  { id: 'e-critical-bias', source: 'criticalAnalysis', target: 'biasDetection' },
  { id: 'e-critical-argument', source: 'criticalAnalysis', target: 'argumentEvaluation' },
  { id: 'e-critical-synthesis', source: 'criticalAnalysis', target: 'informationSynthesis' },
  { id: 'e-strategic-meta', source: 'strategicMastery', target: 'metaCognitive' },
  { id: 'e-strategic-efficiency', source: 'strategicMastery', target: 'efficiencyOptimization' },
  { id: 'e-strategic-adaptive', source: 'strategicMastery', target: 'adaptiveStrategies' },
];

const COLLAPSIBLE_IDS = ["inferenceMastery", "criticalAnalysis", "strategicMastery"];

const ReadingMindmapAdvanced = ({ section = 'advanced' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  const childMapMain = useMemo(() => getChildMap(), []);
  
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["advancedCenter"]);
    
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    
    childMapMain.advancedCenter.forEach(addVisible);
    return visibleIds;
  }, [expanded, childMapMain]);

  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const visibleNodes = useMemo(() => {
    return baseNodes
      .filter(n => visibleNodeIds.has(n.id))
      .map(n => {
        const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
        return {
          ...n,
          type: hasChildren ? "collapsible" : undefined,
          data: {
            ...n.data,
            isExpanded: expanded[n.id] ?? true,
            onToggle: handleToggle,
            hasChildren: hasChildren,
          },
        };
      });
  }, [visibleNodeIds, expanded, childMapMain, handleToggle]);

  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  useEffect(() => {
    setNodes(prevNodes => {
      const prevNodeIds = new Set(prevNodes.map(n => n.id));
      const newNodeIds = new Set(visibleNodes.map(n => n.id));
      
      const nodesChanged = prevNodeIds.size !== newNodeIds.size || 
        [...prevNodeIds].some(id => !newNodeIds.has(id)) ||
        [...newNodeIds].some(id => !prevNodeIds.has(id));
      
      if (!nodesChanged) {
        return prevNodes.map(prevNode => {
          const newNode = visibleNodes.find(n => n.id === prevNode.id);
          return newNode ? { ...newNode, position: prevNode.position, selected: prevNode.selected } : prevNode;
        });
      }
      
      return visibleNodes.map(newNode => {
        const existingNode = prevNodes.find(n => n.id === newNode.id);
        return {
          ...newNode,
          position: existingNode ? existingNode.position : newNode.position,
          selected: existingNode ? existingNode.selected : false,
        };
      });
    });
    
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((event, node) => {
    const hasChildren = childMapMain[node.id] && childMapMain[node.id].length > 0;
    
    if (nodeDetails[node.id] && !hasChildren) {
      setModal(node.id);
    } else if (nodeDetails[node.id] && hasChildren) {
      setModal(node.id);
    }
  }, [childMapMain]);

  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes.map(n => ({
          ...n,
          draggable: true,
          style: {
            ...nodeBaseStyle,
            background: nodeBgColors[n.id] || nodeBaseStyle.background,
          },
        }))}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      {Mindmap}
      {modal && nodeDetails[modal] && (
        <div style={{ 
          position: 'fixed', 
          left: 0, 
          bottom: 0, 
          width: '100vw', 
          height: 'auto', 
          background: 'rgba(255,255,255,0.98)', 
          zIndex: 2000, 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'center', 
          boxShadow: '0 -4px 32px #0003', 
          padding: 0 
        }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: 18, 
            boxShadow: '0 8px 32px #0004', 
            padding: 28, 
            minWidth: '900px', 
            maxWidth: '1400px', 
            width: '80vw', 
            height: 'auto', 
            minHeight: 260, 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            gap: 32, 
            position: 'relative', 
            transition: 'all 0.3s ease-out' 
          }}>
            <div style={{ 
              flex: '0 0 120px', 
              maxWidth: 120, 
              minWidth: 120, 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'flex-start' 
            }}>
              {nodeDetails[modal].icon && (
                <div style={{ 
                  width: 90, 
                  height: 90, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: nodeDetails[modal].bg || '#e3f2fd', 
                  borderRadius: 12 
                }}>
                  {React.createElement(nodeDetails[modal].icon)}
                </div>
              )}
            </div>
            
            <div style={{ 
              flex: 1, 
              minWidth: 320, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-start', 
              alignItems: 'flex-start', 
              wordBreak: 'break-word', 
              height: '100%' 
            }}>
              <div style={{ 
                display: 'flex', 
                width: '100%', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: 8 
              }}>
                <div style={{ 
                  color: '#1976d2', 
                  fontSize: 22, 
                  fontWeight: 600 
                }}>
                  {nodeDetails[modal].title}
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{ 
                    background: '#e53e3e', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 7, 
                    padding: '8px 18px', 
                    fontWeight: 600, 
                    fontSize: 18, 
                    cursor: 'pointer', 
                    boxShadow: '0 2px 8px #0002', 
                    zIndex: 10 
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{ 
                fontSize: 17, 
                color: '#333', 
                marginTop: 0, 
                whiteSpace: 'pre-wrap', 
                columnCount: 2, 
                columnGap: 40, 
                maxHeight: '480px', 
                overflowY: 'auto', 
                width: '100%' 
              }}>
                {stripMarkdown(removeVisual(nodeDetails[modal].details))}
              </div>
            </div>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ 
          position: 'fixed', 
          zIndex: 1000, 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          background: 'rgba(30,40,60,0.92)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            width: '90vw', 
            height: '90vh', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 4px 32px #0006', 
            position: 'relative', 
            padding: 24, 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <button
              onClick={() => setDetached(false)}
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 24, 
                zIndex: 10, 
                background: '#e53e3e', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 6, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer', 
                boxShadow: '0 2px 8px #0002' 
              }}
            >
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>
              {Mindmap}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ReadingMindmapAdvanced);