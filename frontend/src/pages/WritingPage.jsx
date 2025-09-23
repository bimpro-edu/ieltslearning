// Detachable OrientationMindmap modal
function OrientationMindmapWithDetach() {
  const [detached, setDetached] = useState(false);
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
      <div className="mb-6" style={{ maxHeight: '820px', overflowY: 'auto' }}>
        <OrientationMindmap />
      </div>
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
              <OrientationMindmap />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import React, { useState, useRef } from 'react';
import LessonsListPage from './LessonsListPage';

import Header from '../components/Header';
import Footer from '../components/Footer';
import OrientationMindmap from '../components/OrientationMindmap';
import Task1Mindmap from "../components/Task1Mindmap";
import Task2Mindmap from "../components/Task2Mindmap";
import AdvancedWritingSkills from '../components/AdvancedWritingSkills';
import PracticeAssessment from '../components/PracticeAssessment';


const roadmap = [
  {
    title: 'Orientation',
    items: [
      'What IELTS Writing tests',
      'Band descriptors explained',
      'Time management & strategies',
    ],
  },
  {
    title: 'Task 1 Mastery (Academic)',
    items: [
      'Graphs & Charts (Line, Bar, Pie, Mixed)',
      'Processes & Diagrams',
      'Maps & Spatial Representations',
      '✅ Mini-Test 1',
    ],
  },
  {
    title: 'Task 2 Mastery (Essays)',
    items: [
      'Opinion-Based',
      'Comparison & Balance',
      'Problem–Cause–Solution',
      'Question-Based / Mixed',
      'Trend / Future-Oriented',
      '✅ Mini-Test 2',
    ],
  },
  {
    title: 'Advanced Writing Skills',
    items: [
      'Cohesion & Coherence',
      'Vocabulary & Paraphrasing',
      'Grammar for higher bands',
    ],
  },
  {
    title: 'Practice & Assessment',
    items: [
      'Timed Mock Tests',
      'Band 5 → 9 comparisons',
      'Evaluation checklists',
    ],
  },
];

function RoadmapAccordion() {
  const [open, setOpen] = useState(0);
  const contentRefs = useRef([]);
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {roadmap.map((section, idx) => (
        <div key={section.title} className="mb-4">
          <button
            className={`w-full text-left px-6 py-4 rounded-t-lg font-bold text-lg bg-primary-50 border border-border focus:outline-none text-body transition-colors duration-200 ${open === idx ? 'bg-primary-100' : ''}`}
            onClick={() => setOpen(open === idx ? -1 : idx)}
            aria-expanded={open === idx}
            aria-controls={`accordion-content-${idx}`}
          >
            {section.title}
          </button>
          <div
            id={`accordion-content-${idx}`}
            ref={el => (contentRefs.current[idx] = el)}
            style={{
              maxHeight: open === idx && contentRefs.current[idx] ? contentRefs.current[idx].scrollHeight + 'px' : '0px',
              opacity: open === idx ? 1 : 0,
              transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
              overflow: 'hidden',
            }}
            className="bg-content-bg border-x border-b border-border px-8 py-0 rounded-b-lg"
            aria-hidden={open !== idx}
          >
            <div className={`py-4 transition-opacity duration-300 ${open === idx ? 'opacity-100' : 'opacity-0'}`}>
              {/* If Orientation section, show mindmap above the list */}
              {section.title === 'Orientation' && open === idx && (
                <OrientationMindmapWithDetach />
              )}
              {/* If Task 1 Mastery (Academic), show Task1Mindmap above the list */}
              {section.title === 'Task 1 Mastery (Academic)' && open === idx && (
                <div className="mb-6"><Task1Mindmap /></div>
              )}
              {/* If Task 2 Mastery (Essays), show Task2Mindmap above the list */}
              {section.title === 'Task 2 Mastery (Essays)' && open === idx && (
                <div className="mb-6"><Task2Mindmap /></div>
              )}
              {/* If Advanced Writing Skills, show AdvancedWritingSkills mindmap above the list */}
              {section.title === 'Advanced Writing Skills' && open === idx && (
                <div className="mb-6"><AdvancedWritingSkills /></div>
              )}
              {/* If Practice & Assessment, show PracticeAssessment mindmap above the list */}
              {section.title === 'Practice & Assessment' && open === idx && (
                <div className="mb-6"><PracticeAssessment /></div>
              )}
              <ul className="list-disc ml-6 space-y-2">
                {section.items.map(item => (
                  <li key={item} className="text-base text-body">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


const WritingPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="min-h-screen flex flex-col bg-site-bg">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-2">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center">IELTS Writing Course</h1>
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${tab === 0 ? 'border-primary text-primary bg-primary-50' : 'border-transparent text-body bg-content-bg hover:bg-primary-50'}`}
            onClick={() => setTab(0)}
          >
            Guided Course Roadmap
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${tab === 1 ? 'border-primary text-primary bg-primary-50' : 'border-transparent text-body bg-content-bg hover:bg-primary-50'}`}
            onClick={() => setTab(1)}
          >
            Lesson Library
          </button>
        </div>
        <div className="bg-content-bg rounded-xl shadow p-6 min-h-[400px]">
          {tab === 0 ? <RoadmapAccordion /> : <div className="-mx-6 -my-6"><LessonsListPage hideHeaderFooter /></div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WritingPage;
