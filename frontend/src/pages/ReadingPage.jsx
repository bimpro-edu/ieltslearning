import React, { useState, useRef } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ReadingCategorySidebar from '../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../components/ReadingCategoryCanvas';
import EnhancedReadingMindmap from '../components/EnhancedReadingMindmap';

const roadmap = [
  {
    title: 'Orientation',
    items: [
      'What IELTS Reading tests',
      'Format and timing strategies',
      'Common question types overview',
      'Academic vs General Training differences'
    ],
  },
  {
    title: 'Foundations',
    items: [
      'Skimming & Scanning techniques',
      'Academic vocabulary building',
      'Understanding text structure',
      'Basic question type strategies'
    ],
  },
  {
    title: 'Task Mastery',
    items: [
      'True/False/Not Given mastery',
      'Matching exercises (headings, information, features)',
      'Completion tasks (sentence, summary, note)',
      'Multiple choice and short answer strategies'
    ],
  },
  {
    title: 'Advanced Skills',
    items: [
      'Paraphrase recognition',
      'Inference and implication',
      'Trap awareness and avoidance',
      'Time management optimization'
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
              {/* Enhanced mindmaps for each section */}
              {section.title === 'Orientation' && open === idx && (
                <EnhancedReadingMindmap section="orientation" />
              )}
              {section.title === 'Foundations' && open === idx && (
                <EnhancedReadingMindmap section="foundations" />
              )}
              {section.title === 'Task Mastery' && open === idx && (
                <EnhancedReadingMindmap section="taskMastery" />
              )}
              {section.title === 'Advanced Skills' && open === idx && (
                <EnhancedReadingMindmap section="advanced" />
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

const ReadingPage = () => {
  const [tab, setTab] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  return (
    <div className="min-h-screen flex flex-col bg-site-bg">
      <Header />
      <div className="flex flex-1">
        {tab === 1 && (
          <ReadingCategorySidebar
            categoryKey="core-reading-skills"
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        )}
        <main className={`flex-1 w-full max-w-5xl mx-auto py-8 px-2 ${tab === 1 ? 'ml-0' : ''}`}>
          <h1 className="text-3xl font-extrabold text-primary mb-8 text-center">IELTS Reading Course</h1>
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
            {tab === 0 ? <RoadmapAccordion /> : <ReadingCategoryCanvas categoryKey="core-reading-skills" topicKey={selectedTopic} />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ReadingPage;
