import React, { useState } from 'react';

const roadmap = [
  { title: 'Orientation', items: ['Why use tips & strategies?', 'Band descriptors explained', 'General test-taking strategies'] },
  { title: 'IELTS Tips', items: ['Time management', 'Answering different question types', 'Avoiding common mistakes'] },
  { title: 'Advanced Strategies', items: ['Band 7+ hacks', 'Personalized study plans', 'Self-evaluation'] },
  { title: 'Practice & Assessment', items: ['Strategy quizzes', 'Band 5 → 9 comparisons', 'Evaluation checklists'] },
];

function RoadmapAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {roadmap.map((section, idx) => (
        <div key={section.title} className="mb-4">
          <button
            className={`w-full text-left px-6 py-4 rounded-t-lg font-bold text-lg bg-primary-50 border border-primary-200 focus:outline-none ${open === idx ? 'bg-primary-100' : ''}`}
            onClick={() => setOpen(open === idx ? -1 : idx)}
          >
            {section.title}
          </button>
          {open === idx && (
            <div className="bg-white border-x border-b border-primary-200 px-8 py-4 rounded-b-lg">
              <ul className="list-disc ml-6 space-y-2">
                {section.items.map(item => (
                  <li key={item} className="text-base text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const TipsPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-extrabold text-primary-700 mb-8 text-center">IELTS Tips & Strategies</h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${tab === 0 ? 'border-primary-600 text-primary-700 bg-primary-50' : 'border-transparent text-gray-500 bg-white hover:bg-primary-50'}`}
          onClick={() => setTab(0)}
        >
          Guided Course Roadmap
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${tab === 1 ? 'border-primary-600 text-primary-700 bg-primary-50' : 'border-transparent text-gray-500 bg-white hover:bg-primary-50'}`}
          onClick={() => setTab(1)}
        >
          Lesson Library
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
        {tab === 0 ? <RoadmapAccordion /> : <div className="text-center text-gray-400">(Lesson Library coming soon)</div>}
      </div>
    </div>
  );
};

export default TipsPage;
