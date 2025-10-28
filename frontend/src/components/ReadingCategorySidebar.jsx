import React from 'react';
import { getReadingTopicsForCategory } from '../utils/readingTemplates';

/**
 * Renders a sidebar with a list of reading topics for a given category.
 * It is a synchronous component that gets data from a centralized source.
 */
export default function ReadingCategorySidebar({ categoryKey = 'core-reading-skills', selectedTopic, setSelectedTopic }) {
  // Fetch topics synchronously from the centralized data source
  const topics = getReadingTopicsForCategory(categoryKey);

  if (!topics || topics.length === 0) {
    return (
      <aside className="w-72 bg-gray-50 border-r border-gray-200 p-6 shadow-lg flex flex-col min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-primary">Reading Topics</h2>
        <p className="text-gray-500">No topics available for this category.</p>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-200 p-6 shadow-lg flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-primary">Reading Topics</h2>
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic.key}>
            <button
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedTopic === topic.key 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-200 hover:shadow-sm'
              }`}
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
