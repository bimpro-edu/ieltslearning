import React, { useState, useRef } from 'react';
import LessonLibrary from './LessonsListPage';


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
              {/* Mindmap removed as requested */}
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
    <div className="w-full max-w-5xl mx-auto px-2 py-8">
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
        {tab === 0 ? <RoadmapAccordion /> : <LessonLibrary />}
      </div>
    </div>
  );
};

export default WritingPage;
