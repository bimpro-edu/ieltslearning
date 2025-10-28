

import { getListeningTopicsForCategory } from '../utils/listeningTemplates';

export default function ListeningCategorySidebar({ categoryKey, selectedTopic, setSelectedTopic }) {
  const topics = getListeningTopicsForCategory(categoryKey);
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <ul className="space-y-1">
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
