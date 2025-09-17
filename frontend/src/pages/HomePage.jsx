import React from 'react';
import { Link } from 'react-router-dom';

const cardData = [
  {
    title: 'Listening',
    to: '/tasks/listening',
    color: 'bg-blue-600 text-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6a3 3 0 016 0v13m-9 0a9 9 0 0118 0m-9 0v2m0-2a9 9 0 00-9 0" /></svg>
    ),
    description: 'Practice your listening skills with interactive audio exercises.'
  },
  {
    title: 'Reading',
    to: '/tasks/reading',
    color: 'bg-blue-400 text-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5zm0 0v-5" /></svg>
    ),
    description: 'Sharpen your reading comprehension with engaging texts.'
  },
  {
    title: 'Speaking',
    to: '/tasks/speaking',
    color: 'bg-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2m0-2a6 6 0 100-12 6 6 0 000 12zm0 0v2m0-2a6 6 0 01-6-6" /></svg>
    ),
    description: 'Improve your speaking fluency and confidence.'
  },
  {
    title: 'Writing',
  to: '/lessons',
    color: 'bg-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
    ),
    description: 'Master essay and report writing for IELTS.'
  },
  {
    title: 'Vocabulary',
    to: '/tasks/vocabulary',
    color: 'bg-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" /></svg>
    ),
    description: 'Expand your vocabulary with targeted practice.'
  },
  {
    title: 'Grammar',
    to: '/tasks/grammar',
    color: 'bg-blue-600 text-white',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
    ),
    description: 'Strengthen your grammar for all sections.'
  }
];

const HomePage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
    <h1 className="text-4xl font-bold mb-10 text-primary-700">IELTS Prep</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
      {cardData.map((card, idx) => (
        <div key={card.title} className={`rounded-2xl shadow-lg p-8 flex flex-col justify-between ${card.color} transition-all duration-200 hover:shadow-2xl`}>
          {card.icon}
          <h2 className="text-2xl font-bold mb-2 text-center">{card.title}</h2>
          <p className="text-center mb-6 text-gray-200 lg:text-gray-700">{card.description}</p>
          <div className="flex justify-center gap-3 mt-auto">
            <Link to={card.to} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition">Start Learning</Link>
            <Link to={card.to} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-200 transition">Explore</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;