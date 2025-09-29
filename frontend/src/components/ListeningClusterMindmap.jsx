
import React, { useMemo, useState, useCallback } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

// Info for lesson nodes (tips, examples, explanations)
const lessonDetails = {
  predicting: {
    title: 'Predicting Answers from Context',
    details: 'Learn to anticipate answers by analyzing question context and speaker cues. Practice predicting what type of information (number, name, place, etc.) is needed before you listen.'
  },
  signpost: {
    title: 'Listening for Signpost Words',
    details: 'Identify key transition words and phrases that guide you through the recording. Listen for words like "first", "however", "finally" to follow the structure.'
  },
  distractors: {
    title: 'Identifying Key Information vs Distractors',
    details: 'Practice distinguishing between essential information and misleading details. Be alert for corrections and changes in the audio.'
  },
  paraphrase: {
    title: 'Paraphrase Recognition',
    details: 'Recognize synonyms and paraphrases between questions and recordings. The answer may not use the exact words from the question.'
  },
  'multi-speaker': {
    title: 'Multi-Speaker Tracking',
    details: 'Track who is speaking in multi-speaker recordings. Note speaker changes and their opinions.'
  },
  form: {
    title: 'Form Completion',
    details: 'Strategies for completing notes, tables, and summaries accurately. Listen for spelling, numbers, and word limits.'
  },
  mcq: {
    title: 'Multiple Choice Strategy',
    details: 'Approaches for tackling multiple choice questions efficiently. Eliminate wrong options and listen for paraphrased choices.'
  },
  matching: {
    title: 'Matching',
    details: 'Techniques for matching names, speakers, and features. Listen for synonyms and order of information.'
  },
  map: {
    title: 'Map & Plan Labeling',
    details: 'Tips for labeling maps and plans correctly. Visualize the layout and follow directions in the audio.'
  },
  sentence: {
    title: 'Sentence Completion / Short Answer',
    details: 'Best practices for sentence completion and short answer questions. Check grammar and word limits.'
  },
  flowchart: {
    title: 'Flow Chart & Diagram Completion',
    details: 'How to complete flow charts and diagrams in listening tasks. Listen for sequence and process words.'
  },
  spelling: {
    title: 'Spelling & Numbers Training',
    details: 'Master spelling, numbers, dates, and addresses as they appear in the test. Practice writing as you listen.'
  },
  accents: {
    title: 'Dealing with Accents',
    details: 'Familiarize yourself with UK, US, Australian, and Canadian accents. Practice with a variety of recordings.'
  },
  timing: {
    title: 'Time Management',
    details: 'Learn when to read ahead and when to focus on listening. Use the time before each section wisely.'
  },
  error: {
    title: 'Error Checking',
    details: 'Check spelling, word count, and grammar fit before submitting answers. Review your answers if time allows.'
  },
  calm: {
    title: 'Staying Calm After Missing an Answer',
    details: 'Strategies to stay focused and recover after missing a question. Move on quickly and don\'t dwell on mistakes.'
  },
};

const clusterColors = {
  'Core Listening Skills': '#bae6fd',
  'Question Types & Strategies': '#bbf7d0',
  'Test Skills & Mindset': '#fef9c3',
};


export default function ListeningClusterMindmap({ cluster }) {
  const [detached, setDetached] = useState(false);
  const [modal, setModal] = useState(null);

  const nodes = useMemo(() => [
    {
      id: 'root',
      data: { label: cluster.title },
      position: { x: 0, y: 0 },
      style: {
        background: clusterColors[cluster.title] || '#e0e7ef',
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 12,
        padding: 12,
        minWidth: 200,
      },
    },
    ...cluster.lessons.map((lesson, idx) => ({
      id: lesson.key,
      data: { label: lesson.title },
      position: { x: (idx - (cluster.lessons.length-1)/2) * 220, y: 120 },
      style: {
        background: '#fff',
        color: '#334155',
        borderRadius: 10,
        fontWeight: 500,
        minWidth: 180,
        boxShadow: '0 2px 8px #0001',
        cursor: 'pointer',
      },
    })),
  ], [cluster]);

  const edges = useMemo(() =>
    cluster.lessons.map(lesson => ({
      id: `e-root-${lesson.key}`,
      source: 'root',
      target: lesson.key,
      animated: true,
    })),
    [cluster]
  );

  // Node click handler for modal info
  const onNodeClick = useCallback((event, node) => {
    if (lessonDetails[node.id]) {
      setModal(node.id);
    }
  }, []);

  const Mindmap = (
    <div style={{ width: '100%', minHeight: 260, marginBottom: 24 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        panOnDrag
        zoomOnScroll
        nodesDraggable={false}
        style={{ background: '#f8fafc', borderRadius: 12, minHeight: 220 }}
        onNodeClick={onNodeClick}
      >
        <Background variant="dots" gap={14} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: 8, textAlign: 'right' }}>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      {Mindmap}
      {modal && lessonDetails[modal] && (
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', height: 'auto', background: 'rgba(255,255,255,0.98)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', boxShadow: '0 -4px 32px #0003', padding: 0 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0004', padding: 28, minWidth: '400px', maxWidth: '700px', width: '80vw', height: 'auto', minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, position: 'relative', animation: 'fadeInUp .4s cubic-bezier(.4,0,.2,1)' }}>
            <div style={{ color: '#1976d2', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{lessonDetails[modal].title}</div>
            <div style={{ fontSize: 17, color: '#333', marginTop: 0, whiteSpace: 'pre-wrap', maxHeight: '320px', overflowY: 'auto', width: '100%' }}>{lessonDetails[modal].details}</div>
            <button
              onClick={() => setModal(null)}
              style={{ background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0002', zIndex: 10, alignSelf: 'flex-end' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,40,60,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0006', position: 'relative', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setDetached(false)}
              style={{ position: 'absolute', top: 16, right: 24, zIndex: 10, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0002' }}
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
}
