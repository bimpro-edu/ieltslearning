
import React, { useState } from 'react';
import { getListeningTemplateForTopic } from '../utils/loadTemplates';
import ListeningClusterMindmap from './ListeningClusterMindmap';



// Example general tips/traps/predictions for the whole category (replace with real data as needed)
const generalTips = [
  'Read all questions before listening and underline keywords.',
  'Predict the type of answer (number, name, place, etc.) before the audio starts.',
  'Listen for signpost words and speaker changes.'
];
const generalTraps = [
  'Don\'t be misled by distractors or corrections in the audio.',
  'Don\'t assume the first answer you hear is always correct.'
];
const generalPredictions = [
  'Common traps include spelling errors and exceeding word limits.',
  'Answers may be paraphrased or given in a different order than the questions.'
];

// Canvas area for Listening topic: shows mindmap, template, tips, traps, etc.



export default function ListeningCategoryCanvas({ categoryKey, topicKey }) {
  const [tab, setTab] = useState('tips');
  const template = topicKey ? getListeningTemplateForTopic(categoryKey, topicKey) : null;

  let tabContent;
  if (tab === 'tips') {
    tabContent = (
      <ul className="list-disc ml-6 space-y-1 text-base text-gray-700">
        {generalTips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    );
  } else if (tab === 'traps') {
    tabContent = (
      <ul className="list-disc ml-6 space-y-1 text-base text-red-700">
        {generalTraps.map((trap, i) => <li key={i}>{trap}</li>)}
      </ul>
    );
  } else if (tab === 'predictions') {
    tabContent = (
      <ul className="list-disc ml-6 space-y-1 text-base text-blue-700">
        {generalPredictions.map((pred, i) => <li key={i}>{pred}</li>)}
      </ul>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
      {/* General Trap/Tips/Prediction tabs (always on top) */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          <button
            className={`px-4 py-1 rounded font-medium border ${tab === 'tips' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('tips')}
          >Tips</button>
          <button
            className={`px-4 py-1 rounded font-medium border ${tab === 'traps' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('traps')}
          >Traps</button>
          <button
            className={`px-4 py-1 rounded font-medium border ${tab === 'predictions' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('predictions')}
          >Predictions</button>
        </div>
        <div className="bg-gray-50 border rounded p-4 text-base">
          {tabContent}
        </div>
      </div>

      {/* Topic-specific content below */}
      {topicKey ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
          {(template.tips?.length || template.traps?.length || template.predictions?.length) && (
            <div className="flex flex-wrap gap-6 mb-8">
              {template.tips && template.tips.length > 0 && (
                <div className="min-w-[180px]">
                  <h3 className="text-lg font-semibold mb-2 text-primary-700">Tips</h3>
                  <ul className="list-disc ml-6 space-y-1 text-base text-gray-700">
                    {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
              {template.traps && template.traps.length > 0 && (
                <div className="min-w-[180px]">
                  <h3 className="text-lg font-semibold mb-2 text-red-700">Traps</h3>
                  <ul className="list-disc ml-6 space-y-1 text-base text-red-700">
                    {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
                  </ul>
                </div>
              )}
              {template.predictions && template.predictions.length > 0 && (
                <div className="min-w-[180px]">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Predictions</h3>
                  <ul className="list-disc ml-6 space-y-1 text-base text-blue-700">
                    {template.predictions.map((pred, i) => <li key={i}>{pred}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
          {template.mindmap && <div className="mb-8"><ListeningClusterMindmap data={template.mindmap} /></div>}
        </>
      ) : (
        <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>
      )}
    </div>
  );
}
