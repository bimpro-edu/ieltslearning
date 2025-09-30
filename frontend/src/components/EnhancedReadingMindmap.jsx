import React, { useState, useRef, useEffect } from 'react';

// Enhanced IELTS Reading content for 2025
const mindmapData = {
  orientation: {
    title: 'IELTS Reading Orientation',
    centerNode: {
      id: 'center',
      label: 'IELTS Reading 2025',
      type: 'center',
      position: { x: 400, y: 300 },
      color: '#6366f1'
    },
    nodes: [
      {
        id: 'purpose',
        label: 'Purpose & Format',
        type: 'branch',
        position: { x: 200, y: 150 },
        color: '#3b82f6',
        children: [
          {
            id: 'academic-format',
            label: 'Academic Reading',
            type: 'leaf',
            position: { x: 50, y: 50 },
            color: '#60a5fa',
            info: {
              title: 'Academic Reading Format 2025',
              content: [
                '• 3 long passages (900-1000 words each)',
                '• 40 questions total across all passages',
                '• 60 minutes (no transfer time)',
                '• Texts from books, journals, magazines, newspapers',
                '• Topics: academic subjects suitable for university students',
                '• Increased focus on digital literacy and data interpretation',
                '• New question types include interactive elements'
              ]
            }
          },
          {
            id: 'general-format',
            label: 'General Training',
            type: 'leaf',
            position: { x: 50, y: 150 },
            color: '#60a5fa',
            info: {
              title: 'General Training Reading 2025',
              content: [
                '• Section 1: 2-3 short factual texts (workplace/social)',
                '• Section 2: 2 workplace-related texts',
                '• Section 3: 1 longer text on general interest topic',
                '• 40 questions, 60 minutes total',
                '• Enhanced digital workplace scenarios',
                '• Focus on practical communication skills',
                '• Integration with modern workplace technologies'
              ]
            }
          },
          {
            id: 'scoring-2025',
            label: '2025 Scoring Updates',
            type: 'leaf',
            position: { x: 50, y: 250 },
            color: '#60a5fa',
            info: {
              title: 'IELTS Reading Scoring Changes 2025',
              content: [
                '• Band descriptors updated for digital literacy',
                '• Enhanced assessment of critical thinking',
                '• Improved recognition of inference abilities',
                '• New criteria for data interpretation skills',
                '• Band 9: Demonstrates sophisticated understanding of complex texts',
                '• Band 7-8: Shows clear comprehension with minor gaps',
                '• Focus on practical application of reading skills'
              ]
            }
          }
        ]
      },
      {
        id: 'challenges',
        label: 'Key Challenges',
        type: 'branch',
        position: { x: 600, y: 150 },
        color: '#ef4444',
        children: [
          {
            id: 'vocab-density',
            label: 'Vocabulary Complexity',
            type: 'leaf',
            position: { x: 750, y: 50 },
            color: '#f87171',
            info: {
              title: 'Vocabulary Challenges in 2025',
              content: [
                '• Academic Word List (AWL) remains crucial',
                '• Increased technical vocabulary in digital contexts',
                '• Subject-specific terminology (AI, sustainability, biotechnology)',
                '• Cross-cultural academic expressions',
                '• Etymology-based word recognition strategies',
                '• Collocation patterns in academic writing',
                '• Register variation between formal and semi-formal texts'
              ]
            }
          },
          {
            id: 'paraphrasing',
            label: 'Advanced Paraphrasing',
            type: 'leaf',
            position: { x: 750, y: 150 },
            color: '#f87171',
            info: {
              title: 'Paraphrasing Complexity 2025',
              content: [
                '• Sophisticated synonym substitution',
                '• Grammatical structure transformation',
                '• Concept-level paraphrasing (not just word-level)',
                '• Abstract idea reformulation',
                '• Cause-effect relationship rephrasing',
                '• Temporal and logical connector variations',
                '• Implicit vs explicit information distinction'
              ]
            }
          },
          {
            id: 'time-pressure',
            label: 'Time Management',
            type: 'leaf',
            position: { x: 750, y: 250 },
            color: '#f87171',
            info: {
              title: 'Strategic Time Management 2025',
              content: [
                '• 20-minute guideline per passage (flexible allocation)',
                '• Strategic question ordering for maximum efficiency',
                '• Skimming techniques for rapid content preview',
                '• Scanning optimization for specific information',
                '• Question type prioritization strategies',
                '• Mental stamina building for sustained concentration',
                '• Stress management during high-pressure sections'
              ]
            }
          }
        ]
      },
      {
        id: 'strategies',
        label: '2025 Strategies',
        type: 'branch',
        position: { x: 400, y: 500 },
        color: '#10b981',
        children: [
          {
            id: 'pre-reading',
            label: 'Pre-Reading Phase',
            type: 'leaf',
            position: { x: 200, y: 600 },
            color: '#34d399',
            info: {
              title: 'Pre-Reading Strategies 2025',
              content: [
                '• Rapid title and subtitle analysis',
                '• Visual element interpretation (graphs, diagrams)',
                '• Question type identification and categorization',
                '• Keyword prediction and relationship mapping',
                '• Text structure recognition patterns',
                '• Prior knowledge activation techniques',
                '• Strategic reading path planning'
              ]
            }
          },
          {
            id: 'active-reading',
            label: 'Active Reading',
            type: 'leaf',
            position: { x: 400, y: 600 },
            color: '#34d399',
            info: {
              title: 'Active Reading Techniques 2025',
              content: [
                '• Annotation strategies for key information',
                '• Mental mapping of argument structure',
                '• Real-time inference generation',
                '• Contradiction and consistency checking',
                '• Evidence evaluation and source credibility',
                '• Perspective and bias identification',
                '• Synthesizing information across paragraphs'
              ]
            }
          },
          {
            id: 'post-reading',
            label: 'Answer Strategy',
            type: 'leaf',
            position: { x: 600, y: 600 },
            color: '#34d399',
            info: {
              title: 'Answer Strategy Optimization 2025',
              content: [
                '• Systematic elimination techniques',
                '• Evidence-based answer validation',
                '• Trap answer recognition patterns',
                '• Confidence level assessment',
                '• Strategic guessing for uncertain answers',
                '• Answer sheet accuracy verification',
                '• Time allocation for review and correction'
              ]
            }
          }
        ]
      }
    ]
  },
  foundations: {
    title: 'Reading Foundations',
    centerNode: {
      id: 'center',
      label: 'Reading Foundations',
      type: 'center',
      position: { x: 400, y: 300 },
      color: '#8b5cf6'
    },
    nodes: [
      {
        id: 'skills',
        label: 'Core Skills',
        type: 'branch',
        position: { x: 200, y: 150 },
        color: '#a78bfa',
        children: [
          {
            id: 'skimming',
            label: 'Skimming Mastery',
            type: 'leaf',
            position: { x: 50, y: 50 },
            color: '#c4b5fd',
            info: {
              title: 'Advanced Skimming Techniques 2025',
              content: [
                '• Topic sentence identification in 3-5 seconds',
                '• Discourse marker recognition for text flow',
                '• Main idea extraction from complex paragraphs',
                '• Hierarchical information processing',
                '• Speed reading with comprehension retention',
                '• Visual pattern recognition for text organization',
                '• Selective attention training for relevant content'
              ]
            }
          },
          {
            id: 'scanning',
            label: 'Strategic Scanning',
            type: 'leaf',
            position: { x: 50, y: 150 },
            color: '#c4b5fd',
            info: {
              title: 'Strategic Scanning Methods 2025',
              content: [
                '• Keyword transformation and synonym anticipation',
                '• Numerical data location and verification',
                '• Proper noun identification and cross-referencing',
                '• Date and time expression recognition',
                '• Cause-effect relationship tracking',
                '• Comparison and contrast signal detection',
                '• Sequential information ordering'
              ]
            }
          },
          {
            id: 'close-reading',
            label: 'Analytical Reading',
            type: 'leaf',
            position: { x: 50, y: 250 },
            color: '#c4b5fd',
            info: {
              title: 'Close Reading for Complex Questions 2025',
              content: [
                '• Sentence-level grammatical analysis',
                '• Implicit meaning inference techniques',
                '• Author intention and tone identification',
                '• Logical relationship mapping',
                '• Contradiction detection and resolution',
                '• Supporting evidence evaluation',
                '• Critical thinking application'
              ]
            }
          }
        ]
      },
      {
        id: 'question-types',
        label: 'Question Mastery',
        type: 'branch',
        position: { x: 600, y: 150 },
        color: '#f59e0b',
        children: [
          {
            id: 'tfng-advanced',
            label: 'TFNG Excellence',
            type: 'leaf',
            position: { x: 750, y: 50 },
            color: '#fbbf24',
            info: {
              title: 'True/False/Not Given Mastery 2025',
              content: [
                '• Factual statement vs opinion distinction',
                '• Paraphrase recognition at concept level',
                '• Qualifying language impact assessment',
                '• Scope and limitation identification',
                '• Temporal context consideration',
                '• Statistical accuracy verification',
                '• Logical consistency evaluation'
              ]
            }
          },
          {
            id: 'matching-advanced',
            label: 'Matching Strategies',
            type: 'leaf',
            position: { x: 750, y: 150 },
            color: '#fbbf24',
            info: {
              title: 'Advanced Matching Techniques 2025',
              content: [
                '• Heading-paragraph relationship analysis',
                '• Information-location cross-referencing',
                '• Feature-entity connection mapping',
                '• Distractor elimination strategies',
                '• Multiple correct answer identification',
                '• Partial match vs complete match distinction',
                '• Systematic approach for complex passages'
              ]
            }
          },
          {
            id: 'completion-expert',
            label: 'Completion Expertise',
            type: 'leaf',
            position: { x: 750, y: 250 },
            color: '#fbbf24',
            info: {
              title: 'Completion Task Excellence 2025',
              content: [
                '• Grammatical slot prediction accuracy',
                '• Word form and function identification',
                '• Context-appropriate term selection',
                '• Word limit compliance strategies',
                '• Spelling and capitalization precision',
                '• Synonym and paraphrase integration',
                '• Flow and coherence maintenance'
              ]
            }
          }
        ]
      },
      {
        id: 'vocabulary',
        label: 'Vocabulary Power',
        type: 'branch',
        position: { x: 400, y: 500 },
        color: '#06b6d4',
        children: [
          {
            id: 'awl-mastery',
            label: 'AWL Mastery',
            type: 'leaf',
            position: { x: 200, y: 600 },
            color: '#22d3ee',
            info: {
              title: 'Academic Word List Excellence 2025',
              content: [
                '• 570 word families with full derivations',
                '• Contextual meaning differentiation',
                '• Collocation patterns and restrictions',
                '• Register and formality awareness',
                '• Cross-linguistic interference management',
                '• Frequency-based priority learning',
                '• Active vs passive vocabulary development'
              ]
            }
          },
          {
            id: 'topics-vocab',
            label: 'Topic Clusters',
            type: 'leaf',
            position: { x: 400, y: 600 },
            color: '#22d3ee',
            info: {
              title: 'Subject-Specific Vocabulary 2025',
              content: [
                '• Science & Technology: AI, biotechnology, quantum computing',
                '• Environment: Climate change, sustainability, renewable energy',
                '• Society: Urbanization, demographics, cultural studies',
                '• Education: Digital learning, pedagogy, assessment methods',
                '• Economics: Globalization, markets, financial systems',
                '• Health: Public health, medical advances, wellness',
                '• Arts & Culture: Digital media, cultural preservation'
              ]
            }
          },
          {
            id: 'morphology',
            label: 'Word Formation',
            type: 'leaf',
            position: { x: 600, y: 600 },
            color: '#22d3ee',
            info: {
              title: 'Morphological Awareness 2025',
              content: [
                '• Prefix and suffix pattern recognition',
                '• Root word identification across languages',
                '• Word family expansion techniques',
                '• Etymology-based meaning prediction',
                '• Compound word analysis strategies',
                '• Conversion and derivation processes',
                '• False friend identification and avoidance'
              ]
            }
          }
        ]
      }
    ]
  },
  taskMastery: {
    title: 'Task Mastery',
    centerNode: {
      id: 'center',
      label: 'Task Mastery 2025',
      type: 'center',
      position: { x: 400, y: 300 },
      color: '#dc2626'
    },
    nodes: [
      {
        id: 'precision-tasks',
        label: 'Precision Tasks',
        type: 'branch',
        position: { x: 200, y: 150 },
        color: '#ef4444',
        children: [
          {
            id: 'tfng-precision',
            label: 'TFNG Precision',
            type: 'leaf',
            position: { x: 50, y: 50 },
            color: '#f87171',
            info: {
              title: 'True/False/Not Given Precision 2025',
              content: [
                '• Micro-level text analysis for exact matching',
                '• Qualifying adverb impact assessment',
                '• Statistical precision vs approximation',
                '• Temporal accuracy verification',
                '• Scope limitation recognition',
                '• Exception and condition identification',
                '• Evidence sufficiency evaluation for definitive answers'
              ]
            }
          },
          {
            id: 'ynng-precision',
            label: 'Yes/No/NG Mastery',
            type: 'leaf',
            position: { x: 50, y: 150 },
            color: '#f87171',
            info: {
              title: 'Yes/No/Not Given Opinion Analysis 2025',
              content: [
                '• Author stance vs reported view distinction',
                '• Implicit opinion identification techniques',
                '• Hedging language interpretation',
                '• Attitude marker recognition',
                '• Evaluative adjective analysis',
                '• Modality and certainty levels',
                '• Perspective shift identification within texts'
              ]
            }
          },
          {
            id: 'completion-precision',
            label: 'Completion Accuracy',
            type: 'leaf',
            position: { x: 50, y: 250 },
            color: '#f87171',
            info: {
              title: 'Completion Task Accuracy 2025',
              content: [
                '• Exact word extraction without modification',
                '• Grammatical slot prediction using syntax knowledge',
                '• Context-driven term selection',
                '• Parallel structure completion',
                '• Ellipsis and reference resolution',
                '• Technical term accuracy maintenance',
                '• Word limit optimization strategies'
              ]
            }
          }
        ]
      },
      {
        id: 'complex-matching',
        label: 'Complex Matching',
        type: 'branch',
        position: { x: 600, y: 150 },
        color: '#7c3aed',
        children: [
          {
            id: 'heading-mastery',
            label: 'Heading Mastery',
            type: 'leaf',
            position: { x: 750, y: 50 },
            color: '#a855f7',
            info: {
              title: 'Heading Matching Excellence 2025',
              content: [
                '• Main idea vs supporting detail distinction',
                '• Paragraph unity and coherence assessment',
                '• Topic sentence vs concluding sentence analysis',
                '• Abstraction level matching',
                '• Thematic progression identification',
                '• Distractor elimination through scope analysis',
                '• Multiple paragraph narrative flow understanding'
              ]
            }
          },
          {
            id: 'info-matching',
            label: 'Information Matching',
            type: 'leaf',
            position: { x: 750, y: 150 },
            color: '#a855f7',
            info: {
              title: 'Information Matching Strategies 2025',
              content: [
                '• Specific detail location and verification',
                '• Paraphrase relationship identification',
                '• Cross-paragraph information synthesis',
                '• Multiple occurrence management',
                '• Chronological vs thematic organization',
                '• Evidence-claim relationship mapping',
                '• Comparative and contrastive information handling'
              ]
            }
          },
          {
            id: 'feature-matching',
            label: 'Feature Matching',
            type: 'leaf',
            position: { x: 750, y: 250 },
            color: '#a855f7',
            info: {
              title: 'Feature Matching Expertise 2025',
              content: [
                '• Entity-attribute relationship identification',
                '• Person-opinion-action linkage',
                '• Cause-effect-solution correlation',
                '• Research-finding-implication connection',
                '• Multiple attribution handling',
                '• Indirect reference resolution',
                '• Complex relationship network mapping'
              ]
            }
          }
        ]
      },
      {
        id: 'advanced-mcq',
        label: 'Advanced MCQ',
        type: 'branch',
        position: { x: 400, y: 500 },
        color: '#059669',
        children: [
          {
            id: 'single-mcq',
            label: 'Single Answer MCQ',
            type: 'leaf',
            position: { x: 200, y: 600 },
            color: '#10b981',
            info: {
              title: 'Single Answer MCQ Mastery 2025',
              content: [
                '• Distractor analysis and elimination',
                '• Partial truth vs complete accuracy',
                '• Scope and context consideration',
                '• Inference vs explicit information',
                '• Option ranking by likelihood',
                '• Evidence strength evaluation',
                '• Strategic guessing with partial knowledge'
              ]
            }
          },
          {
            id: 'multi-mcq',
            label: 'Multiple Answer MCQ',
            type: 'leaf',
            position: { x: 400, y: 600 },
            color: '#10b981',
            info: {
              title: 'Multiple Answer MCQ Excellence 2025',
              content: [
                '• Requirement specification analysis',
                '• Systematic option evaluation',
                '• Combination possibility assessment',
                '• Minimum-maximum answer guidelines',
                '• Cross-option relationship identification',
                '• Comprehensive vs selective approach',
                '• Answer completeness verification'
              ]
            }
          },
          {
            id: 'short-answer',
            label: 'Short Answer Excellence',
            type: 'leaf',
            position: { x: 600, y: 600 },
            color: '#10b981',
            info: {
              title: 'Short Answer Question Excellence 2025',
              content: [
                '• Question type identification (who, what, when, where, why, how)',
                '• Exact word extraction requirements',
                '• Grammatical accuracy in responses',
                '• Spelling and capitalization precision',
                '• Word limit compliance strategies',
                '• Context-appropriate detail level',
                '• Information prioritization for conciseness'
              ]
            }
          }
        ]
      }
    ]
  },
  advanced: {
    title: 'Advanced Skills',
    centerNode: {
      id: 'center',
      label: 'Advanced Skills 2025',
      type: 'center',
      position: { x: 400, y: 300 },
      color: '#0891b2'
    },
    nodes: [
      {
        id: 'inference-mastery',
        label: 'Inference Mastery',
        type: 'branch',
        position: { x: 200, y: 150 },
        color: '#0ea5e9',
        children: [
          {
            id: 'logical-inference',
            label: 'Logical Inference',
            type: 'leaf',
            position: { x: 50, y: 50 },
            color: '#38bdf8',
            info: {
              title: 'Logical Inference Skills 2025',
              content: [
                '• Premise-conclusion relationship analysis',
                '• Implicit assumption identification',
                '• Causal chain reasoning',
                '• Conditional logic application',
                '• Analogical reasoning patterns',
                '• Deductive vs inductive inference',
                '• Probability assessment for uncertain conclusions'
              ]
            }
          },
          {
            id: 'contextual-inference',
            label: 'Contextual Inference',
            type: 'leaf',
            position: { x: 50, y: 150 },
            color: '#38bdf8',
            info: {
              title: 'Contextual Inference Techniques 2025',
              content: [
                '• Cultural context integration',
                '• Historical background consideration',
                '• Subject domain expertise application',
                '• Pragmatic meaning interpretation',
                '• Situational context influence',
                '• Genre convention awareness',
                '• Register and formality implications'
              ]
            }
          },
          {
            id: 'predictive-inference',
            label: 'Predictive Inference',
            type: 'leaf',
            position: { x: 50, y: 250 },
            color: '#38bdf8',
            info: {
              title: 'Predictive Inference Development 2025',
              content: [
                '• Trend extrapolation from data',
                '• Outcome prediction from process description',
                '• Consequence anticipation from action',
                '• Future scenario construction',
                '• Risk assessment from current conditions',
                '• Hypothesis generation from evidence',
                '• Alternative possibility consideration'
              ]
            }
          }
        ]
      },
      {
        id: 'critical-analysis',
        label: 'Critical Analysis',
        type: 'branch',
        position: { x: 600, y: 150 },
        color: '#be185d',
        children: [
          {
            id: 'bias-detection',
            label: 'Bias Detection',
            type: 'leaf',
            position: { x: 750, y: 50 },
            color: '#ec4899',
            info: {
              title: 'Bias Detection Skills 2025',
              content: [
                '• Author perspective identification',
                '• Source credibility evaluation',
                '• Selection bias recognition',
                '• Language choice impact assessment',
                '• Statistical manipulation detection',
                '• Confirmation bias awareness',
                '• Balanced vs biased presentation analysis'
              ]
            }
          },
          {
            id: 'argument-evaluation',
            label: 'Argument Evaluation',
            type: 'leaf',
            position: { x: 750, y: 150 },
            color: '#ec4899',
            info: {
              title: 'Argument Evaluation Mastery 2025',
              content: [
                '• Claim-evidence relationship strength',
                '• Logical fallacy identification',
                '• Counter-argument consideration',
                '• Evidence quality assessment',
                '• Reasoning chain validity',
                '• Alternative explanation possibility',
                '• Conclusion justification adequacy'
              ]
            }
          },
          {
            id: 'synthesis',
            label: 'Information Synthesis',
            type: 'leaf',
            position: { x: 750, y: 250 },
            color: '#ec4899',
            info: {
              title: 'Information Synthesis Excellence 2025',
              content: [
                '• Multi-source integration techniques',
                '• Contradiction resolution strategies',
                '• Hierarchical information organization',
                '• Pattern recognition across sources',
                '• Perspective convergence identification',
                '• Gap analysis and missing information',
                '• Comprehensive understanding construction'
              ]
            }
          }
        ]
      },
      {
        id: 'strategic-mastery',
        label: 'Strategic Mastery',
        type: 'branch',
        position: { x: 400, y: 500 },
        color: '#ea580c',
        children: [
          {
            id: 'meta-cognitive',
            label: 'Meta-cognitive Skills',
            type: 'leaf',
            position: { x: 200, y: 600 },
            color: '#fb923c',
            info: {
              title: 'Meta-cognitive Reading Skills 2025',
              content: [
                '• Reading strategy selection and adaptation',
                '• Comprehension monitoring techniques',
                '• Strategy effectiveness evaluation',
                '• Self-regulation during reading',
                '• Cognitive load management',
                '• Learning from reading mistakes',
                '• Performance optimization through reflection'
              ]
            }
          },
          {
            id: 'efficiency-optimization',
            label: 'Efficiency Optimization',
            type: 'leaf',
            position: { x: 400, y: 600 },
            color: '#fb923c',
            info: {
              title: 'Reading Efficiency Optimization 2025',
              content: [
                '• Question-text interaction optimization',
                '• Cognitive resource allocation',
                '• Attention focus and switching',
                '• Memory strategy integration',
                '• Speed-accuracy balance optimization',
                '• Fatigue management techniques',
                '• Peak performance maintenance'
              ]
            }
          },
          {
            id: 'adaptive-strategies',
            label: 'Adaptive Strategies',
            type: 'leaf',
            position: { x: 600, y: 600 },
            color: '#fb923c',
            info: {
              title: 'Adaptive Reading Strategies 2025',
              content: [
                '• Text difficulty assessment and adjustment',
                '• Strategy modification based on performance',
                '• Genre-specific approach selection',
                '• Time pressure adaptation techniques',
                '• Question type priority adjustment',
                '• Stress response management',
                '• Recovery from reading comprehension failures'
              ]
            }
          }
        ]
      }
    ]
  }
};

// Draggable Node Component
const DraggableNode = ({ node, onDrag, onNodeClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onDrag(node.id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const getNodeStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: node.position.x,
      top: node.position.y,
      cursor: isDragging ? 'grabbing' : 'grab',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: node.color,
      border: '2px solid rgba(255,255,255,0.2)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: isDragging ? 'none' : 'all 0.2s ease',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      zIndex: isDragging ? 1000 : node.type === 'center' ? 100 : 10,
      userSelect: 'none',
      maxWidth: node.type === 'leaf' ? '200px' : '180px',
      minWidth: node.type === 'center' ? '160px' : '120px',
      textAlign: 'center',
      wordWrap: 'break-word'
    };

    if (node.type === 'center') {
      baseStyle.fontSize = '18px';
      baseStyle.padding = '20px 24px';
      baseStyle.fontWeight = '700';
      baseStyle.border = '3px solid rgba(255,255,255,0.3)';
    } else if (node.type === 'branch') {
      baseStyle.fontSize = '16px';
      baseStyle.padding = '14px 18px';
      baseStyle.fontWeight = '600';
    }

    return baseStyle;
  };

  return (
    <div
      ref={nodeRef}
      style={getNodeStyle()}
      onMouseDown={handleMouseDown}
      onClick={() => onNodeClick && onNodeClick(node)}
    >
      {node.label}
    </div>
  );
};

// Connection Line Component
const ConnectionLine = ({ from, to, color = '#cbd5e1' }) => {
  const x1 = from.position.x + 90; // Approximate center of node
  const y1 = from.position.y + 20;
  const x2 = to.position.x + 90;
  const y2 = to.position.y + 20;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.6"
      />
    </svg>
  );
};

// Info Modal Component
const InfoModal = ({ node, onClose }) => {
  if (!node || !node.info) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 max-h-80 overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{node.info.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="space-y-2">
          {node.info.content.map((item, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Enhanced Mindmap Component
const EnhancedReadingMindmap = ({ section = 'orientation' }) => {
  const [nodes, setNodes] = useState(() => {
    const data = mindmapData[section];
    if (!data) return [];
    
    const allNodes = [data.centerNode];
    data.nodes.forEach(branch => {
      allNodes.push(branch);
      if (branch.children) {
        allNodes.push(...branch.children);
      }
    });
    return allNodes;
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [detached, setDetached] = useState(false);

  const handleNodeDrag = (nodeId, newPosition) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, position: newPosition }
          : node
      )
    );
  };

  const handleNodeClick = (node) => {
    if (node.type === 'leaf' && node.info) {
      setSelectedNode(node);
    }
  };

  const renderConnections = () => {
    const data = mindmapData[section];
    if (!data) return null;

    const connections = [];
    const centerNode = nodes.find(n => n.type === 'center');
    
    data.nodes.forEach(branch => {
      const branchNode = nodes.find(n => n.id === branch.id);
      if (centerNode && branchNode) {
        connections.push(
          <ConnectionLine
            key={`center-${branch.id}`}
            from={centerNode}
            to={branchNode}
            color={branch.color}
          />
        );
      }

      if (branch.children) {
        branch.children.forEach(child => {
          const childNode = nodes.find(n => n.id === child.id);
          if (branchNode && childNode) {
            connections.push(
              <ConnectionLine
                key={`${branch.id}-${child.id}`}
                from={branchNode}
                to={childNode}
                color={child.color}
              />
            );
          }
        });
      }
    });

    return connections;
  };

  const MindmapContent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {renderConnections()}
      {nodes.map(node => (
        <DraggableNode
          key={node.id}
          node={node}
          onDrag={handleNodeDrag}
          onNodeClick={handleNodeClick}
        />
      ))}
      <InfoModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );

  if (detached) {
    return (
      <>
        <div className="mb-4 flex justify-end">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
            onClick={() => setDetached(true)}
          >
            Detach (Full Screen)
          </button>
        </div>
        <div className="mb-6" style={{ height: '500px' }}>
          <MindmapContent />
        </div>
        <div style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,40,60,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0006', position: 'relative', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setDetached(false)}
              style={{ position: 'absolute', top: 16, right: 24, zIndex: 10, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0002' }}
            >
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>
              <MindmapContent />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      <div className="mb-6" style={{ height: '500px' }}>
        <MindmapContent />
      </div>
    </>
  );
};

export default EnhancedReadingMindmap;