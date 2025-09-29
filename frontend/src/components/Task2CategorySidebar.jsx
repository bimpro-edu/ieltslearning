import React from 'react';
import { getTopicsForCategory } from '../utils/loadTemplates';

// Sidebar for Task 2 category topics
export default function Task2CategorySidebar({ categoryKey, selectedTopic, setSelectedTopic }) {
  const topics = getTopicsForCategory(categoryKey);
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic.key}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${selectedTopic === topic.key ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTopic(topic.key)}
            >
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
