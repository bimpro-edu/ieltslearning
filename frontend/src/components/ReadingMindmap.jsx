import React, { useState } from "react";

// Color palette for nodes
const nodeBgColors = {
  orientation: '#b3e5fc',
  foundations: '#f8bbd0',
  mastery: '#c8e6c9',
  advanced: '#ffe082',
  leaf: '#e3f2fd',
};

// Mindmap data for each section
const mindmapData = {
  orientation: {
    label: 'Orientation',
    color: nodeBgColors.orientation,
    children: [
      {
        label: 'Purpose',
        color: nodeBgColors.leaf,
        children: [
          {
            label: 'Assess ability to understand academic texts',
            color: nodeBgColors.leaf,
            details: 'You must read and comprehend complex academic texts.'
          },
          {
            label: 'Locate information',
            color: nodeBgColors.leaf,
            details: 'Find specific facts, details, and references in the text.'
          },
          {
            label: 'Process paraphrased details under time pressure',
            color: nodeBgColors.leaf,
            details: 'Recognize information even when it is reworded or paraphrased.'
          }
        ]
      },
      {
        label: 'Format',
        color: nodeBgColors.leaf,
        children: [
          {
            label: 'Academic Reading',
            color: nodeBgColors.leaf,
            children: [
              {
                label: '3 long passages (~900 words each)',
                color: nodeBgColors.leaf,
                details: 'Each passage is about 900 words, testing endurance and comprehension.'
              },
              {
                label: '40 questions',
                color: nodeBgColors.leaf,
                details: 'A total of 40 questions, covering a range of skills.'
              },
              {
                label: '60 minutes',
                color: nodeBgColors.leaf,
                details: 'You have 60 minutes to complete all passages and questions.'
              }
            ]
          },
          {
            label: 'General Training Reading',
            color: nodeBgColors.leaf,
            children: [
              {
                label: 'Shorter, workplace & social texts',
                color: nodeBgColors.leaf,
                details: 'Texts are shorter and based on everyday or workplace situations.'
              },
              {
                label: '1 long passage',
                color: nodeBgColors.leaf,
                details: 'The final passage is long and more complex, similar to Academic.'
              }
            ]
          }
        ]
      },
      {
        label: 'Key Challenges',
        color: nodeBgColors.leaf,
        children: [
          {
            label: 'Vocabulary density',
            color: nodeBgColors.leaf,
            details: 'Texts contain many academic and topic-specific words.'
          },
          {
            label: 'Paraphrasing & synonyms',
            color: nodeBgColors.leaf,
            details: 'Questions and answers often use different words with the same meaning.'
          },
          {
            label: 'Time management (20 min per passage guideline)',
            color: nodeBgColors.leaf,
            details: 'Aim to spend about 20 minutes per passage to finish on time.'
          },
          {
            label: 'Trap answers & distractors',
            color: nodeBgColors.leaf,
            details: 'Some options are designed to mislead; read carefully and check evidence.'
          }
        ]
      }
    ]
  },
  foundations: {
    label: 'Foundations',
    color: nodeBgColors.foundations,
    children: [
      {
        label: 'Reading Skills',
        color: nodeBgColors.leaf,
        details: 'Skimming: Main idea quickly. Scanning: Find facts. Close Reading: TFNG, inference, headings.'
      },
      {
        label: 'Question Types',
        color: nodeBgColors.leaf,
        details: 'TFNG, YNNG, Matching, MCQ, Short Answer, Completion.'
      },
      {
        label: 'Building Vocabulary',
        color: nodeBgColors.leaf,
        details: 'AWL (Academic Word List), Synonyms & collocations, Topic clusters.'
      }
    ]
  },
  mastery: {
    label: 'Task Mastery',
    color: nodeBgColors.mastery,
    children: [
      {
        label: 'TFNG',
        color: nodeBgColors.leaf,
        details: 'Look for factual statements; beware paraphrasing. Trap: Stick to text, not your knowledge.'
      },
      {
        label: 'Matching Headings',
        color: nodeBgColors.leaf,
        details: 'Focus on main idea of each paragraph, not details.'
      },
      {
        label: 'Summary/Note/Table Completion',
        color: nodeBgColors.leaf,
        details: 'Predict grammar & type of missing word. Watch word limit.'
      },
      {
        label: 'Multiple Choice',
        color: nodeBgColors.leaf,
        details: 'Eliminate wrong answers by spotting subtle differences.'
      },
      {
        label: 'Matching Information/Features',
        color: nodeBgColors.leaf,
        details: 'Match details to paragraphs (look for synonyms).'
      },
      {
        label: 'Short Answers',
        color: nodeBgColors.leaf,
        details: 'Write concise; spelling errors = wrong.'
      }
    ]
  },
  advanced: {
    label: 'Advanced Skills',
    color: nodeBgColors.advanced,
    children: [
      {
        label: 'Paraphrase Tracking',
        color: nodeBgColors.leaf,
        details: 'Spotting equivalent expressions.'
      },
      {
        label: 'Inference Skills',
        color: nodeBgColors.leaf,
        details: 'Reading beyond literal meaning.'
      },
      {
        label: 'Time Management',
        color: nodeBgColors.leaf,
        details: '20 min per passage guideline. Move on if stuck, return later.'
      },
      {
        label: 'Trap Awareness',
        color: nodeBgColors.leaf,
        details: 'Similar words ≠ correct answer. “Extreme” words often signal incorrect distractors.'
      }
    ]
  }
};

// Helper: recursive tree rendering
function renderTree(nodes, setModal, level = 0) {
  return (
    <div style={{ display: 'flex', flexDirection: level === 0 ? 'row' : 'column', justifyContent: 'center', alignItems: level === 0 ? 'center' : 'flex-start', gap: 32, marginTop: level === 0 ? 24 : 0 }}>
      {nodes.map((node, i) => (
        <div key={node.label + i} style={{ textAlign: 'center' }}>
          <div
            style={{
              background: node.color,
              borderRadius: 12,
              padding: '12px 20px',
              fontWeight: 600,
              fontSize: 16,
              boxShadow: '0 2px 8px #0001',
              border: '2px solid #90caf9',
              cursor: node.details ? 'pointer' : 'default',
              marginBottom: node.children ? 12 : 0,
              minWidth: 180,
              minHeight: 40
            }}
            onClick={() => node.details && setModal(node)}
          >
            {node.label}
          </div>
          {node.children && renderTree(node.children, setModal, level + 1)}
        </div>
      ))}
    </div>
  );
}

export default function ReadingMindmap({ section }) {
  const [detached, setDetached] = useState(false);
  const [modal, setModal] = useState(null);
  const data = mindmapData[section];
  const Mindmap = (
    <div className="flex flex-col items-center py-4">
      <div style={{ background: data.color, borderRadius: 16, padding: '12px 32px', fontWeight: 700, fontSize: 22, marginBottom: 24, boxShadow: '0 2px 8px #0001' }}>{data.label}</div>
      {renderTree(data.children, setModal)}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setDetached(true)}>
          Detach (Full Screen)
        </button>
      </div>
      <div className="mb-6" style={{ maxHeight: 500, overflowY: "auto" }}>{Mindmap}</div>
      {detached && (
        <div style={{ position: "fixed", zIndex: 1000, top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(30,40,60,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "90vw", height: "90vh", background: "#fff", borderRadius: 12, boxShadow: "0 4px 32px #0006", position: "relative", padding: 24, display: "flex", flexDirection: "column" }}>
            <button onClick={() => setDetached(false)} style={{ position: "absolute", top: 16, right: 24, zIndex: 10, background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px #0002" }}>
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>{Mindmap}</div>
          </div>
        </div>
      )}
      {modal && (
        <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 2000, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0003", padding: 24, minWidth: 320, maxWidth: 480, margin: 24, pointerEvents: "auto" }}>
            <div className="font-bold text-lg mb-2">{modal.label}</div>
            <div className="text-sm whitespace-pre-line">{modal.details}</div>
            <button className="mt-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
