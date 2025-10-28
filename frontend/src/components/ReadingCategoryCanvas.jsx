import React, { useState } from 'react';
import { getReadingTemplateForTopic } from '../utils/readingTemplates';
import MindMap from './MindMap';

/**
 * Renders the main content for a selected reading topic, including tips, traps, and predictions.
 * It is a synchronous component that gets data from a centralized source.
 */
export default function ReadingCategoryCanvas({ categoryKey, topicKey }) {
  const [activeTab, setActiveTab] = useState('tips');

  // If no topic is selected, display a prompt.
  if (!topicKey) {
    return <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>;
  }

  // Fetch the template synchronously from the centralized data source.
  const template = getReadingTemplateForTopic(categoryKey, topicKey);

  // If no template data is found for the topic, display a message.
  if (!template) {
    return <div className="text-gray-500 text-lg mt-12 text-center">No data available for this topic.</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tips':
        return (
          <ul className="list-disc ml-6 space-y-2 text-base text-gray-700">
            {template.tips.map((tip, i) => (
              <li key={i}>
                {tip.statement}
                {tip.example && <p className="text-sm text-gray-500 ml-4">e.g., {tip.example}</p>}
              </li>
            ))}
          </ul>
        );
      case 'traps':
        return (
          <ul className="list-disc ml-6 space-y-2 text-base text-red-700">
            {template.traps.map((trap, i) => (
              <li key={i}>
                {trap.statement}
                {trap.example && <p className="text-sm text-gray-500 ml-4">e.g., {trap.example}</p>}
              </li>
            ))}
          </ul>
        );
      case 'predictions':
        return (
          <ul className="list-disc ml-6 space-y-2 text-base text-blue-700">
            {template.predictions.map((p, i) => (
              <li key={i}>
                {p.statement}
                {p.example && <p className="text-sm text-gray-500 ml-4">e.g., {p.example}</p>}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[calc(100vh-2rem)]">
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>

      {/* Mindmap (if available) */}
      {template.mindmap && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-700">Mind Map</h3>
          <MindMap data={template.mindmap} />
        </div>
      )}

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('tips')}
            className={`${activeTab === 'tips' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Tips
          </button>
          <button
            onClick={() => setActiveTab('traps')}
            className={`${activeTab === 'traps' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Common Mistakes
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`${activeTab === 'predictions' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Predictions
          </button>
        </nav>
      </div>

      <div>
        {renderContent()}
      </div>

    </div>
  );
}
