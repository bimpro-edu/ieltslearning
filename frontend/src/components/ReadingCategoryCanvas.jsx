import React, { useState } from 'react';

const readingTemplates = {
  'skimming': {
    title: 'Skimming & Scanning',
    tips: [
      'Read headings, subheadings, and the first sentences quickly to get the gist.',
      'Look for keywords and repeated ideas.',
      'Don\'t read every word—move your eyes quickly over the text.'
    ],
    traps: [
      'Don\'t get stuck on unknown words.',
      'Don\'t waste time reading details at this stage.'
    ],
    predictions: [
      'Expect questions about the main topic or general idea.',
      'You may need to match headings to paragraphs.'
    ]
  },
  'main-ideas': {
    title: 'Identifying Main Ideas',
    tips: [
      'Focus on topic sentences and concluding sentences.',
      'Underline or highlight key points as you read.',
      'Summarize each paragraph in your own words.'
    ],
    traps: [
      'Don\'t confuse examples or details with the main idea.',
      'Be careful with distractors in the text.'
    ],
    predictions: [
      'Expect questions about the author\'s purpose or the main point.',
      'You may need to choose the best summary.'
    ]
  },
  'detailed': {
    title: 'Detailed Comprehension',
    tips: [
      'Read the questions first, then scan for answers.',
      'Look for synonyms and paraphrases in the text.',
      'Check each answer with evidence from the passage.'
    ],
    traps: [
      'Don\'t assume the answer uses the same words as the question.',
      'Watch for tricky wording or negatives.'
    ],
    predictions: [
      'Expect questions about specific facts, numbers, or names.',
      'You may need to find evidence for your answer.'
    ]
  },
  'inference': {
    title: 'Inference Questions',
    tips: [
      'Look for clues in the text that suggest something not directly stated.',
      'Ask yourself, "What does the author mean here?"',
      'Eliminate answers that are clearly wrong.'
    ],
    traps: [
      'Don\'t choose answers based only on your own knowledge.',
      'Be careful with answers that are too strong or absolute.'
    ],
    predictions: [
      'Expect questions that use words like "imply," "suggest," or "infer."',
      'You may need to read between the lines.'
    ]
  },
  'mock-tests': {
    title: 'Mock Reading Tests',
    tips: [
      'Simulate real test conditions: set a timer and avoid distractions.',
      'Review your answers and learn from mistakes.',
      'Practice with a variety of texts and question types.'
    ],
    traps: [
      'Don\'t skip the review step.',
      'Don\'t use your phone or notes during practice.'
    ],
    predictions: [
      'Expect to improve your speed and accuracy over time.',
      'You may notice patterns in your mistakes.'
    ]
  },
  'band-comparison': {
    title: 'Band 5 → 9 Comparisons',
    tips: [
      'Compare sample answers at different band levels.',
      'Notice differences in vocabulary, detail, and structure.',
      'Aim to use higher-level strategies in your own reading.'
    ],
    traps: [
      'Don\'t assume more words always means a higher band.',
      'Be careful with copying style without understanding.'
    ],
    predictions: [
      'Expect to see clear differences in answer quality.',
      'You may be asked to rate or compare answers.'
    ]
  },
  'checklists': {
    title: 'Evaluation Checklists',
    tips: [
      'Use a checklist to review your answers before submitting.',
      'Check for careless mistakes and missing information.',
      'Make sure you answered every question.'
    ],
    traps: [
      'Don\'t rush the review process.',
      'Don\'t ignore instructions or question types.'
    ],
    predictions: [
      'Expect to catch small errors and improve your score.',
      'You may develop your own personalized checklist.'
    ]
  }
};

export default function ReadingCategoryCanvas({ topicKey }) {
  const [tab, setTab] = useState('tips');
  const template = readingTemplates[topicKey];

  if (!template) {
    return <div className="text-gray-400 text-center py-16">Select a lesson from the sidebar.</div>;
  }

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button className={`px-4 py-2 rounded-t font-semibold ${tab === 'tips' ? 'bg-primary-200 text-primary-900' : 'bg-gray-100 text-gray-600'}`} onClick={() => setTab('tips')}>Tips</button>
        <button className={`px-4 py-2 rounded-t font-semibold ${tab === 'traps' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`} onClick={() => setTab('traps')}>Traps</button>
        <button className={`px-4 py-2 rounded-t font-semibold ${tab === 'predictions' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`} onClick={() => setTab('predictions')}>Predictions</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
      {tab === 'tips' && (
        <div className="bg-blue-50 rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Tips</h3>
          <ul className="list-disc ml-6 space-y-1">
            {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}
      {tab === 'traps' && (
        <div className="bg-red-50 rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Traps</h3>
          <ul className="list-disc ml-6 space-y-1">
            {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
          </ul>
        </div>
      )}
      {tab === 'predictions' && (
        <div className="bg-blue-50 rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Predictions</h3>
          <ul className="list-disc ml-6 space-y-1">
            {template.predictions.map((pred, i) => <li key={i}>{pred}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
