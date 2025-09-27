
import React from 'react';

// Sidebar topics as shown in the provided image
const sidebarTopics = [
  { key: 'technology', title: 'Technology and Society' },
  { key: 'education', title: 'Education – Online vs Traditional' },
  { key: 'work', title: 'Working from Home' },
  { key: 'environment', title: 'Environment and Climate Change' },
  { key: 'health', title: 'Health and Lifestyle' },
  { key: 'crime', title: 'Crime and Punishment' },
  { key: 'globalization', title: 'Globalization' },
  { key: 'youth', title: 'Youth and Society' },
  { key: 'media', title: 'Media and Advertising' },
  { key: 'urbanization', title: 'Urbanization / City Life' },
];

export default function ListeningCategorySidebar({ categoryKey, selectedTopic, setSelectedTopic }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <ul className="space-y-1">
        {sidebarTopics.map(topic => (
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
