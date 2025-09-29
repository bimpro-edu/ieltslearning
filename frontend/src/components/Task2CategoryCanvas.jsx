import React from 'react';
import { getTemplateForTopic } from '../utils/loadTemplates';
import Task2Mindmap from './Task2Mindmap';

// Canvas area for Task 2 topic: shows mindmap, template, tips, traps, etc.
export default function Task2CategoryCanvas({ categoryKey, topicKey }) {
  if (!topicKey) {
    return <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>;
  }
  const template = getTemplateForTopic(categoryKey, topicKey);
  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
      {template.mindmap && <div className="mb-8"><Task2Mindmap data={template.mindmap} /></div>}
      {template.tips && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-700">Tips</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-gray-700">
            {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}
      {template.traps && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-700">Traps</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-red-700">
            {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
          </ul>
        </div>
      )}
      {template.predictions && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Predictions</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-blue-700">
            {template.predictions.map((pred, i) => <li key={i}>{pred}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
