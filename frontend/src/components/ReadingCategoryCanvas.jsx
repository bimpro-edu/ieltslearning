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
          <ul className="space-y-4">
            {template.tips.map((tip, i) => (
              <li key={i} className="flex">
                <span className="text-green-500 mr-2">&#9679;</span>
                <div>
                  {tip.statement}
                  {tip.example && <p className="text-sm text-gray-500 ml-4 italic">e.g., {tip.example}</p>}
                </div>
              </li>
            ))}
          </ul>
        );
      case 'traps':
        return (
          <ul className="space-y-4">
            {template.traps.map((trap, i) => (
              <li key={i} className="flex">
                <span className="text-red-500 mr-2">&#9679;</span>
                <div>
                  {trap.statement}
                  {trap.example && <p className="text-sm text-gray-500 ml-4 italic">e.g., {trap.example}</p>}
                </div>
              </li>
            ))}
          </ul>
        );
      case 'predictions':
        return (
          <ul className="space-y-4">
            {template.predictions.map((p, i) => (
              <li key={i} className="flex">
                <span className="text-blue-500 mr-2">&#9679;</span>
                <div>
                  {p.statement}
                  {p.example && <p className="text-sm text-gray-500 ml-4 italic">e.g., {p.example}</p>}
                </div>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 min-h-[calc(100vh-2rem)]">
      <h2 className="text-3xl font-bold mb-6 text-primary">{template.title}</h2>

      {/* Mindmap (if available) */}
      {template.mindmap && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">Mind Map</h3>
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <MindMap data={template.mindmap} />
          </div>
        </div>
      )}

      <div className="flex space-x-1 rounded-lg bg-gray-200 p-1 mb-4">
        <button
          onClick={() => setActiveTab('tips')}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white transition-all duration-200 ${activeTab === 'tips' ? 'bg-primary shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-black'}`}>
          Tips
        </button>
        <button
          onClick={() => setActiveTab('traps')}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white transition-all duration-200 ${activeTab === 'traps' ? 'bg-primary shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-black'}`}>
          Common Mistakes
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white transition-all duration-200 ${activeTab === 'predictions' ? 'bg-primary shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-black'}`}>
          Predictions
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner">
        {renderContent()}
      </div>

    </div>
  );
}