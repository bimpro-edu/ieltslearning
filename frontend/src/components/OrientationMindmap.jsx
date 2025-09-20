import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', data: { label: 'Orientation' }, position: { x: 0, y: 0 }, draggable: true, style: { borderRadius: 12, padding: 10, background: '#E3F2FD', boxShadow: '0 2px 8px #90caf940' } },
  { id: '2', data: { label: 'Exam Overview' }, position: { x: -300, y: -150 }, draggable: true, style: { background: '#FFFDE7', borderRadius: 10 } },
  { id: '3', data: { label: 'Writing Criteria' }, position: { x: 300, y: -150 }, draggable: true, style: { background: '#E8F5E9', borderRadius: 10 } },
  { id: '4', data: { label: 'Band Descriptions' }, position: { x: -300, y: 150 }, draggable: true, style: { background: '#F3E5F5', borderRadius: 10 } },
  { id: '5', data: { label: 'Task Types' }, position: { x: 300, y: 150 }, draggable: true, style: { background: '#E1F5FE', borderRadius: 10 } },
  { id: '6', data: { label: 'Common Pitfalls' }, position: { x: 0, y: 250 }, draggable: true, style: { background: '#FFEBEE', borderRadius: 10 } },
  { id: '2a', data: { label: 'Test Format' }, position: { x: -500, y: -200 }, draggable: true, style: { background: '#FFFDE7', borderRadius: 8 } },
  { id: '2b', data: { label: 'Timing (60 mins)' }, position: { x: -500, y: -150 }, draggable: true, style: { background: '#FFFDE7', borderRadius: 8 } },
  { id: '2c', data: { label: '2 Tasks' }, position: { x: -500, y: -100 }, draggable: true, style: { background: '#FFFDE7', borderRadius: 8 } },
  { id: '2d', data: { label: 'Weighting (Task 2 > Task 1)' }, position: { x: -500, y: -50 }, draggable: true, style: { background: '#FFFDE7', borderRadius: 8 } },
  { id: '3a', data: { label: 'Task Achievement' }, position: { x: 500, y: -200 }, draggable: true, style: { background: '#E8F5E9', borderRadius: 8 } },
  { id: '3b', data: { label: 'Coherence & Cohesion' }, position: { x: 500, y: -150 }, draggable: true, style: { background: '#E8F5E9', borderRadius: 8 } },
  { id: '3c', data: { label: 'Lexical Resource' }, position: { x: 500, y: -100 }, draggable: true, style: { background: '#E8F5E9', borderRadius: 8 } },
  { id: '3d', data: { label: 'Grammar Range & Accuracy' }, position: { x: 500, y: -50 }, draggable: true, style: { background: '#E8F5E9', borderRadius: 8 } },
  { id: '4a', data: { label: 'Band 5 – Limited' }, position: { x: -500, y: 100 }, draggable: true, style: { background: '#F3E5F5', borderRadius: 8 } },
  { id: '4b', data: { label: 'Band 6 – Competent' }, position: { x: -500, y: 150 }, draggable: true, style: { background: '#F3E5F5', borderRadius: 8 } },
  { id: '4c', data: { label: 'Band 7 – Good' }, position: { x: -500, y: 200 }, draggable: true, style: { background: '#F3E5F5', borderRadius: 8 } },
  { id: '4d', data: { label: 'Band 8 – Very Good' }, position: { x: -500, y: 250 }, draggable: true, style: { background: '#F3E5F5', borderRadius: 8 } },
  { id: '5a', data: { label: 'Task 1 – Reports (Graphs, Charts, Maps)' }, position: { x: 500, y: 100 }, draggable: true, style: { background: '#E1F5FE', borderRadius: 8 } },
  { id: '5b', data: { label: 'Task 2 – Essays (Opinion, Problem, Discussion)' }, position: { x: 500, y: 150 }, draggable: true, style: { background: '#E1F5FE', borderRadius: 8 } },
  { id: '6a', data: { label: 'Poor Time Management' }, position: { x: 0, y: 320 }, draggable: true, style: { background: '#FFEBEE', borderRadius: 8 } },
  { id: '6b', data: { label: 'Misreading the Question' }, position: { x: -150, y: 350 }, draggable: true, style: { background: '#FFEBEE', borderRadius: 8 } },
  { id: '6c', data: { label: 'Too Short Answers' }, position: { x: 150, y: 350 }, draggable: true, style: { background: '#FFEBEE', borderRadius: 8 } },
  { id: '6d', data: { label: 'Grammar Mistakes' }, position: { x: 0, y: 400 }, draggable: true, style: { background: '#FFEBEE', borderRadius: 8 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },
  { id: 'e1-6', source: '1', target: '6' },

  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e2-2b', source: '2', target: '2b' },
  { id: 'e2-2c', source: '2', target: '2c' },
  { id: 'e2-2d', source: '2', target: '2d' },

  { id: 'e3-3a', source: '3', target: '3a' },
  { id: 'e3-3b', source: '3', target: '3b' },
  { id: 'e3-3c', source: '3', target: '3c' },
  { id: 'e3-3d', source: '3', target: '3d' },

  { id: 'e4-4a', source: '4', target: '4a' },
  { id: 'e4-4b', source: '4', target: '4b' },
  { id: 'e4-4c', source: '4', target: '4c' },
  { id: 'e4-4d', source: '4', target: '4d' },

  { id: 'e5-5a', source: '5', target: '5a' },
  { id: 'e5-5b', source: '5', target: '5b' },

  { id: 'e6-6a', source: '6', target: '6a' },
  { id: 'e6-6b', source: '6', target: '6b' },
  { id: 'e6-6c', source: '6', target: '6c' },
  { id: 'e6-6d', source: '6', target: '6d' },
];

const nodeDetails = {
  '1': `Orientation: This is your starting point for IELTS Writing. Understand the test's structure, what is expected, and how to plan your preparation. Use this mind map to explore all key areas and avoid common mistakes.`,
  '2': `Exam Overview: IELTS Writing consists of two tasks (Task 1 and Task 2). You have 60 minutes in total. Task 2 is worth twice as much as Task 1. Know the format (Academic or General Training) and whether you are taking the paper-based or computer-based test.`,
  '2a': `Test Format: \n- Academic: Task 1 is a report based on visual data (graph, chart, map, process); Task 2 is an essay.\n- General Training: Task 1 is a letter (formal, semi-formal, or informal); Task 2 is an essay.\n- Both versions require clear, organized, and relevant writing.\n- Delivery: Paper-based or computer-based. Practice with your chosen format.`,
  '2b': `Timing (60 mins):\n- You have 60 minutes for both tasks.\n- Recommended: Spend ~20 minutes on Task 1, ~40 minutes on Task 2.\n- Task 2 is longer and more heavily weighted.\n- Practice writing under timed conditions to build speed and accuracy.`,
  '2c': `2 Tasks:\n- Task 1: (Academic) Summarize, describe, or explain visual information. (General) Write a letter.\n- Task 2: Write an essay responding to a point of view, argument, or problem.\n- Both tasks require clear structure, relevant content, and good language control.`,
  '2d': `Weighting (Task 2 > Task 1):\n- Task 2 is worth twice as many marks as Task 1.\n- Always complete Task 2, even if you run out of time for Task 1.\n- Plan your time to maximize your score.`,
  '3': `Writing Criteria: Examiners use four criteria for both tasks:\n1. Task Achievement/Response\n2. Coherence & Cohesion\n3. Lexical Resource\n4. Grammatical Range & Accuracy\nEach is worth 25% of your score.`,
  '3a': `Task Achievement (Task 1) / Task Response (Task 2):\n- Address all parts of the task.\n- Present a clear overview (Task 1) or position (Task 2).\n- Support ideas with evidence/examples.\n- Avoid irrelevance or repetition.`,
  '3b': `Coherence & Cohesion:\n- Organize ideas logically (paragraphs, topic sentences).\n- Use linking words (however, furthermore, for example, etc.) appropriately.\n- Make your writing easy to follow.\n- Avoid overusing connectors or making your writing mechanical.`,
  '3c': `Lexical Resource:\n- Use a wide range of vocabulary accurately.\n- Avoid repetition; use synonyms and paraphrasing.\n- Spell words correctly.\n- Use collocations and idiomatic expressions where appropriate.`,
  '3d': `Grammar Range & Accuracy:\n- Use a variety of sentence structures (simple, compound, complex).\n- Minimize errors in tense, agreement, articles, prepositions, etc.\n- Punctuate correctly.\n- Proofread to catch mistakes.`,
  '4': `Band Descriptions: IELTS bands range from 0 to 9. Each band describes a level of English proficiency. Understanding the descriptors helps you target your weaknesses and improve your score.`,
  '4a': `Band 5 – Limited:\n- Partial command of the language.\n- Frequent errors in grammar and vocabulary.\n- May not address all parts of the task.\n- Ideas may be unclear or not well developed.`,
  '4b': `Band 6 – Competent:\n- Generally effective command of English.\n- Some errors, but meaning is clear.\n- Addresses all parts of the task, but may have some lapses in organization or development.\n- Attempts to use a range of vocabulary and structures.`,
  '4c': `Band 7 – Good:\n- Good control of language, occasional errors.\n- Well-developed response, clear progression of ideas.\n- Uses a range of vocabulary and grammar accurately.\n- Presents a clear position throughout.`,
  '4d': `Band 8 – Very Good:\n- Very good command of English, only occasional unsystematic errors.\n- Fully addresses all parts of the task.\n- Well-structured, logical, and cohesive writing.\n- Wide range of vocabulary and structures used flexibly.`,
  '5': `Task Types: Know the types of writing you may be asked to produce.\n- Academic Task 1: Graphs, charts, maps, processes.\n- General Task 1: Letters (formal, informal, semi-formal).\n- Task 2: Essays (opinion, discussion, problem-solution, advantages/disadvantages, etc.).\nPractice each type to become familiar with their requirements.`,
  '5a': `Task 1 – Reports (Graphs, Charts, Maps):\n- Summarize and compare key features of the visual data.\n- Group information logically.\n- Avoid personal opinions.\n- Use appropriate vocabulary for describing trends, comparisons, and data.`,
  '5b': `Task 2 – Essays (Opinion, Problem, Discussion):\n- Present a clear position throughout the response.\n- Support ideas with relevant examples.\n- Organize ideas into paragraphs (introduction, body, conclusion).\n- Address all parts of the question.`,
  '6': `Common Pitfalls: Many candidates lose marks due to avoidable mistakes. Be aware of these pitfalls and practice strategies to avoid them.`,
  '6a': `Poor Time Management:\n- Failing to finish both tasks.\n- Spending too long on Task 1.\n- Not leaving time to check your work.\n- Solution: Practice with a timer, plan your writing, and stick to recommended timings.`,
  '6b': `Misreading the Question:\n- Not answering all parts of the prompt.\n- Misunderstanding the topic or requirements.\n- Solution: Read the question carefully, underline key words, and plan your answer before writing.`,
  '6c': `Too Short Answers:\n- Writing fewer than 150 words (Task 1) or 250 words (Task 2) results in penalties.\n- Short answers often lack development and detail.\n- Solution: Always check your word count and fully develop your ideas.`,
  '6d': `Grammar Mistakes:\n- Frequent errors reduce your score for Grammatical Range & Accuracy.\n- Solution: Review common grammar issues, proofread your work, and practice writing error-free sentences.`,
};

function OrientationMindmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.id);
  }, []);

  return (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={onNodeClick}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {selected && (
        <div style={{ marginTop: 24, background: '#f9f9f9', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #0001' }}>
          <strong>Details:</strong>
          <div style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{nodeDetails[selected]}</div>
        </div>
      )}
    </div>
  );
}

export default OrientationMindmap;
