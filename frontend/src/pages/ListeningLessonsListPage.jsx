
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// Helper component for styling cards
const LessonCard = ({ title, description, to }) => (
  <Link to={to || '#'} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:border-primary-500 hover:border-2">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-base flex-1">{description}</p>
  </Link>
);

// Grouped clusters for listening lessons
const listeningClusters = [
  {
    title: 'Core Listening Skills',
    categoryKey: 'core-skills',
    color: 'bg-blue-50',
    lessons: [
      { key: 'predicting', title: 'Predicting Answers from Context', description: 'Learn to anticipate answers by analyzing question context and speaker cues.' },
      { key: 'signpost', title: 'Listening for Signpost Words', description: 'Identify key transition words and phrases that guide you through the recording.' },
      { key: 'distractors', title: 'Identifying Key Information vs Distractors', description: 'Practice distinguishing between essential information and misleading details.' },
      { key: 'paraphrase', title: 'Paraphrase Recognition', description: 'Recognize synonyms and paraphrases between questions and recordings.' },
      { key: 'multi-speaker', title: 'Multi-Speaker Tracking', description: 'Track who is speaking in multi-speaker recordings.' },
    ]
  },
  {
    title: 'Question Types & Strategies',
    categoryKey: 'question-types',
    color: 'bg-green-50',
    lessons: [
      { key: 'form', title: 'Form Completion', description: 'Strategies for completing notes, tables, and summaries accurately.' },
      { key: 'mcq', title: 'Multiple Choice Strategy', description: 'Approaches for tackling multiple choice questions efficiently.' },
      { key: 'matching', title: 'Matching', description: 'Techniques for matching names, speakers, and features.' },
      { key: 'map', title: 'Map & Plan Labeling', description: 'Tips for labeling maps and plans correctly.' },
      { key: 'sentence', title: 'Sentence Completion / Short Answer', description: 'Best practices for sentence completion and short answer questions.' },
      { key: 'flowchart', title: 'Flow Chart & Diagram Completion', description: 'How to complete flow charts and diagrams in listening tasks.' },
    ]
  },
  {
    title: 'Test Skills & Mindset',
    categoryKey: 'test-skills',
    color: 'bg-yellow-50',
    lessons: [
      { key: 'spelling', title: 'Spelling & Numbers Training', description: 'Master spelling, numbers, dates, and addresses as they appear in the test.' },
      { key: 'accents', title: 'Dealing with Accents', description: 'Familiarize yourself with UK, US, Australian, and Canadian accents.' },
      { key: 'timing', title: 'Time Management', description: 'Learn when to read ahead and when to focus on listening.' },
      { key: 'error', title: 'Error Checking', description: 'Check spelling, word count, and grammar fit before submitting answers.' },
      { key: 'calm', title: 'Staying Calm After Missing an Answer', description: 'Strategies to stay focused and recover after missing a question.' },
    ]
  },
];

export default function ListeningLessonsListPage({ hideHeaderFooter }) {
  const [openClusterIdx, setOpenClusterIdx] = useState(0); // Accordion: first open by default

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">IELTS Listening Lesson Library</h1>
          <div className="space-y-12">
            {listeningClusters.map((cluster, idx) => {
              return (
                <div key={cluster.title} className={`rounded-lg shadow ${cluster.color}`}>
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none text-left text-2xl font-semibold text-primary-700 hover:bg-opacity-80 transition"
                    onClick={() => setOpenClusterIdx(openClusterIdx === idx ? -1 : idx)}
                    aria-expanded={openClusterIdx === idx}
                  >
                    <span>{cluster.title}</span>
                    <span className="ml-4 text-xl">{openClusterIdx === idx ? '−' : '+'}</span>
                  </button>
                  {openClusterIdx === idx && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <LessonCard
                          key={cluster.categoryKey}
                          title={`Explore ${cluster.title}`}
                          description={`View all topics, tips, and mindmaps for ${cluster.title}.`}
                          to={`/listening/${cluster.categoryKey}`}
                        />
                        {cluster.lessons.map(lesson => (
                          <LessonCard 
                            key={lesson.key} 
                            title={lesson.title} 
                            description={lesson.description} 
                            to={`/listening/${cluster.categoryKey}/${lesson.key}`} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
