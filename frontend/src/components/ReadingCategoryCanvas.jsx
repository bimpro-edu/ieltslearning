import React from 'react';
import { getReadingTemplateForTopic } from '../utils/readingTemplates';
import MindMap from './MindMap';

/**
 * Renders the main content for a selected reading topic, including tips, traps, and predictions.
 * It is a synchronous component that gets data from a centralized source.
 */
export default function ReadingCategoryCanvas({ categoryKey, topicKey }) {
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

      {/* Tips */}
      {template.tips && template.tips.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-700">Tips</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-gray-700">
            {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}

      {/* Traps */}
      {template.traps && template.traps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-700">Common Mistakes</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-red-700">
            {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
          </ul>
        </div>
      )}

      {/* Predictions */}
      {template.predictions && template.predictions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Predictions</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-blue-700">
            {template.predictions.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

    </div>
  );
}