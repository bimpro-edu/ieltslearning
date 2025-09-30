import React from 'react';
import { getReadingTopicsForCategory } from '../utils/loadTemplates';

export default function ReadingCategorySidebar({ categoryKey = 'core-reading-skills', selectedTopic, setSelectedTopic }) {
  const topics = getReadingTopicsForCategory(categoryKey);
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-700 mb-2">Reading Skills</h3>
        <p className="text-sm text-gray-600">Select a topic to explore tips, traps, and predictions</p>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {topics.map(topic => (
            <li key={topic.key}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedTopic === topic.key 
                    ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedTopic(topic.key)}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
