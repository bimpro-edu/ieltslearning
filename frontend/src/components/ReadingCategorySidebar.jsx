import React from 'react';

const readingTopics = [
  { key: 'skimming', title: 'Skimming & Scanning' },
  { key: 'main-ideas', title: 'Identifying Main Ideas' },
  { key: 'detailed', title: 'Detailed Comprehension' },
  { key: 'inference', title: 'Inference Questions' },
  { key: 'mock-tests', title: 'Mock Reading Tests' },
  { key: 'band-comparison', title: 'Band 5 → 9 Comparisons' },
  { key: 'checklists', title: 'Evaluation Checklists' }
];

export default function ReadingCategorySidebar({ selected, onSelect }) {
  return (
    <aside className="w-64 border-r bg-white h-full p-4">
      <nav>
        <ul className="space-y-2">
          {readingTopics.map(topic => (
            <li key={topic.key}>
              <button
                className={`w-full text-left px-3 py-2 rounded ${selected === topic.key ? 'bg-primary-100 font-bold text-primary-700' : 'hover:bg-primary-50 text-gray-700'}`}
                onClick={() => onSelect(topic.key)}
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
