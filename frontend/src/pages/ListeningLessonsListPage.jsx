import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Placeholder for future listening lessons data
const listeningLessons = [
  {
    title: 'Predicting Answers from Context',
    description: 'Learn to anticipate answers by analyzing question context and speaker cues.'
  },
  {
    title: 'Listening for Signpost Words',
    description: 'Identify key transition words and phrases that guide you through the recording.'
  },
  {
    title: 'Identifying Key Information vs Distractors',
    description: 'Practice distinguishing between essential information and misleading details.'
  },
  {
    title: 'Spelling & Numbers Training',
    description: 'Master spelling, numbers, dates, and addresses as they appear in the test.'
  },
  {
    title: 'Paraphrase Recognition',
    description: 'Recognize synonyms and paraphrases between questions and recordings.'
  },
  {
    title: 'Form Completion',
    description: 'Strategies for completing notes, tables, and summaries accurately.'
  },
  {
    title: 'Multiple Choice Strategy',
    description: 'Approaches for tackling multiple choice questions efficiently.'
  },
  {
    title: 'Matching',
    description: 'Techniques for matching names, speakers, and features.'
  },
  {
    title: 'Map & Plan Labeling',
    description: 'Tips for labeling maps and plans correctly.'
  },
  {
    title: 'Sentence Completion / Short Answer',
    description: 'Best practices for sentence completion and short answer questions.'
  },
  {
    title: 'Flow Chart & Diagram Completion',
    description: 'How to complete flow charts and diagrams in listening tasks.'
  },
  {
    title: 'Dealing with Accents',
    description: 'Familiarize yourself with UK, US, Australian, and Canadian accents.'
  },
  {
    title: 'Multi-Speaker Tracking',
    description: 'Track who is speaking in multi-speaker recordings.'
  },
  {
    title: 'Time Management',
    description: 'Learn when to read ahead and when to focus on listening.'
  },
  {
    title: 'Error Checking',
    description: 'Check spelling, word count, and grammar fit before submitting answers.'
  },
  {
    title: 'Staying Calm After Missing an Answer',
    description: 'Strategies to stay focused and recover after missing a question.'
  },
];

const ListeningLessonsList = () => (
  <div className="w-full max-w-3xl mx-auto mt-8">
    <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">Listening Lesson Library</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {listeningLessons.map((lesson, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">{lesson.title}</h3>
          <p className="text-gray-600 text-base flex-1">{lesson.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ListeningLessonsList;
