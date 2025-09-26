import React, { useState } from 'react';


import Header from '../components/Header';
import Footer from '../components/Footer';
import ListeningSkillMindmap from '../components/ListeningSkillMindmap';
import ListeningLessonsListPage from './ListeningLessonsListPage';
import ShortConversationRoadmap from '../components/ShortConversationRoadmap';
import ShortConversationMindmap from '../components/ShortConversationMindmap';

const roadmap = [
  { title: 'Orientation', items: ['What IELTS Listening tests', 'Band descriptors explained', 'Listening strategies'] },
  { title: 'Part 1: Short Conversations', items: ['Everyday topics', 'Identifying key information'] },
  { title: 'Part 2: Monologues', items: ['Note-taking', 'Predicting answers'] },
  { title: 'Part 3: Academic Discussions', items: ['Multiple speakers', 'Complex question types'] },
  { title: 'Practice & Assessment', items: ['Mock Listening tests', 'Band 5 → 9 comparisons', 'Evaluation checklists'] },
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
              {section.title === 'Orientation' && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-700">Orientation Mind Map</h3>
                  <ListeningSkillMindmap />
                </div>
              )}
              {section.title === 'Part 1: Short Conversations' && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-700">Short Conversation Mind Map</h3>
                  <ShortConversationMindmap />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const ListeningPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <Header />
      <div className="w-full max-w-5xl mx-auto px-2 py-8">
        <h1 className="text-3xl font-extrabold text-primary-700 mb-8 text-center">IELTS Listening Course</h1>
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
          {tab === 0 && <RoadmapAccordion />}
          {tab === 1 && <ListeningLessonsListPage />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListeningPage;
