
import React, { useState } from 'react';
import { getListeningTemplateForTopic } from '../utils/loadTemplates';
import ListeningClusterMindmap from './ListeningClusterMindmap';



// Example general tips/traps/predictions for the whole category (replace with real data as needed)
const generalTips = [
  {
    icon: '💡',
    title: 'Preview Questions',
    text: 'Read all questions before listening and underline keywords. This helps you focus on what information to listen for.'
  },
  {
    icon: '🔍',
    title: 'Predict Answers',
    text: 'Predict the type of answer (number, name, place, etc.) before the audio starts. Write your prediction next to the question.'
  },
  {
    icon: '🗣️',
    title: 'Listen for Signposts',
    text: 'Listen for signpost words (first, however, finally) and speaker changes to follow the structure of the recording.'
  },
  {
    icon: '✍️',
    title: 'Follow Instructions',
    text: 'Pay attention to instructions: word limits, number of words, and spelling all matter for your score.'
  },
  {
    icon: '⏳',
    title: 'Use Preparation Time',
    text: 'Use the time before each section to scan questions and highlight key information.'
  },
  {
    icon: '🌍',
    title: 'Practice Accents',
    text: 'Practice with a variety of accents (British, Australian, American, Canadian) to improve comprehension.'
  },
  {
    icon: '➡️',
    title: 'Move On Quickly',
    text: 'If you miss an answer, move on quickly—don’t let it affect your focus for the next question.'
  },
  {
    icon: '📝',
    title: 'Check Your Work',
    text: 'Check your answers for spelling, grammar, and word count before submitting.'
  },
  {
    icon: '🗒️',
    title: 'Take Notes',
    text: 'Take notes as you listen, especially for names, numbers, and dates.'
  },
  {
    icon: '🔄',
    title: 'Spot Paraphrasing',
    text: 'Practice listening for synonyms and paraphrases, as the audio rarely uses the exact words from the questions.'
  },
  {
    icon: '❌',
    title: 'Eliminate Wrong Answers',
    text: 'Use process of elimination for multiple choice questions—cross out obviously wrong answers as you listen.'
  },
  {
    icon: '🗺️',
    title: 'Visualize Maps',
    text: 'For map and diagram questions, visualize the layout and follow directions carefully.'
  },
  {
    icon: '🔁',
    title: 'Review Mistakes',
    text: 'Review your mistakes after practice tests and note patterns in your errors.'
  },
];
const generalTraps = [
  {
    icon: '⚠️',
    title: 'Distractors',
    text: 'Don\'t be misled by distractors or corrections in the audio. Speakers may change their answers or correct themselves.'
  },
  {
    icon: '🔄',
    title: 'Changed Answers',
    text: 'Don\'t assume the first answer you hear is always correct—listen for changes or clarifications.'
  },
  {
    icon: '📝',
    title: 'Spelling Errors',
    text: 'Be careful with spelling: even a small mistake can cost you a mark.'
  },
  {
    icon: '🔢',
    title: 'Word Limits',
    text: 'Watch out for word limit instructions (e.g., NO MORE THAN TWO WORDS). Exceeding the limit means no mark.'
  },
  {
    icon: '⏩',
    title: 'Getting Stuck',
    text: 'Don\'t get stuck on one question. If you miss it, move on and stay focused for the next.'
  },
  {
    icon: '⏱️',
    title: 'Answer Too Early',
    text: 'Don\'t write answers too early—wait until you are sure, as information may be repeated or corrected.'
  },
  {
    icon: '💬',
    title: 'Implied Answers',
    text: 'Don\'t ignore the context of the conversation. Sometimes the answer is implied, not directly stated.'
  },
  {
    icon: '📋',
    title: 'Transfer Errors',
    text: 'Don\'t forget to transfer your answers carefully to the answer sheet (for paper-based tests).'
  },
  {
    icon: '🔑',
    title: 'Keyword Reliance',
    text: 'Don\'t rely solely on keywords—listen for synonyms and paraphrased information.'
  },
  {
    icon: '😨',
    title: 'Panic',
    text: 'Don\'t panic if you hear unfamiliar vocabulary. Focus on the overall meaning and context.'
  },
  {
    icon: '❓',
    title: 'Leaving Blanks',
    text: 'Don\'t leave blanks—always make an educated guess if you are unsure.'
  },
];
const generalPredictions = [
  {
    icon: '🔊',
    title: 'Varied Accents',
    text: 'Expect to hear a range of accents and speeds. Practice with different recordings to build confidence.'
  },
  {
    icon: '🔀',
    title: 'Order of Questions',
    text: 'Questions may not follow the order of the information in the audio, especially in matching and map tasks.'
  },
  {
    icon: '🔄',
    title: 'Paraphrased Answers',
    text: 'Answers are often paraphrased—be ready to match meaning, not just words.'
  },
  {
    icon: '⚠️',
    title: 'Distractors',
    text: 'Some questions will have distractors: information that sounds correct but is later changed or clarified.'
  },
  {
    icon: '🔢',
    title: 'Numbers and Names',
    text: 'You may need to write numbers, dates, or names—practice listening for these details.'
  },
  {
    icon: '✅',
    title: 'Multiple Choice',
    text: 'In multiple choice, all options may be mentioned, but only one is correct. Listen for subtle clues.'
  },
  {
    icon: '📋',
    title: 'Short Answers',
    text: 'For form/note/table completion, answers are usually short and factual.'
  },
  {
    icon: '🗺️',
    title: 'Spatial Language',
    text: 'In map/diagram questions, directions and spatial language (left, right, next to, opposite) are important.'
  },
  {
    icon: '🔗',
    title: 'Sequencing',
    text: 'Expect some questions to test your ability to follow a sequence or process.'
  },
  {
    icon: '👥',
    title: 'Multiple Speakers',
    text: 'Some sections will require you to track multiple speakers—note who says what.'
  },
  {
    icon: '🧘',
    title: 'Difficulty Mix',
    text: 'Prediction: The test will include both straightforward and challenging questions. Stay calm and use strategies for both.'
  },
];

// Canvas area for Listening topic: shows mindmap, template, tips, traps, etc.



export default function ListeningCategoryCanvas({ categoryKey, topicKey }) {
  const [tab, setTab] = useState('tips');
  const template = topicKey ? getListeningTemplateForTopic(categoryKey, topicKey) : null;

  let tabContent;
  if (tab === 'tips') {
    tabContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generalTips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <span className="text-2xl">{tip.icon}</span>
            <div>
              <div className="font-semibold text-blue-900 mb-1">{tip.title}</div>
              <div className="text-blue-800 text-base">{tip.text}</div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (tab === 'traps') {
    tabContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generalTraps.map((trap, i) => (
          <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <span className="text-2xl">{trap.icon}</span>
            <div>
              <div className="font-semibold text-red-900 mb-1">{trap.title}</div>
              <div className="text-red-800 text-base">{trap.text}</div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (tab === 'predictions') {
    tabContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generalPredictions.map((pred, i) => (
          <div key={i} className="flex items-start gap-3 bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm">
            <span className="text-2xl">{pred.icon}</span>
            <div>
              <div className="font-semibold text-blue-900 mb-1">{pred.title}</div>
              <div className="text-blue-800 text-base">{pred.text}</div>
            </div>
          </div>
        ))}
      </div>
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
      {topicKey && template && template.title !== 'No data' && (
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
      )}
      {!topicKey && (
        <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>
      )}
    </div>
  );
}
