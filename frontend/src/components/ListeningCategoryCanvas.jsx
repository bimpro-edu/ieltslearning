
import React, { useState } from 'react';
import { getListeningTemplateForTopic } from '../utils/loadTemplates';
import ListeningClusterMindmap from './ListeningClusterMindmap';



// Example general tips/traps/predictions for the whole category (replace with real data as needed)
const generalTips = [
  'Read all questions before listening and underline keywords. This helps you focus on what information to listen for.',
  'Predict the type of answer (number, name, place, etc.) before the audio starts. Write your prediction next to the question.',
  'Listen for signpost words (first, however, finally) and speaker changes to follow the structure of the recording.',
  'Pay attention to instructions: word limits, number of words, and spelling all matter for your score.',
  'Use the time before each section to scan questions and highlight key information.',
  'Practice with a variety of accents (British, Australian, American, Canadian) to improve comprehension.',
  'If you miss an answer, move on quickly—don’t let it affect your focus for the next question.',
  'Check your answers for spelling, grammar, and word count before submitting.',
  'Take notes as you listen, especially for names, numbers, and dates.',
  'Familiarize yourself with common distractors and paraphrasing techniques used in IELTS recordings.',
  'Practice listening for synonyms and paraphrases, as the audio rarely uses the exact words from the questions.',
  'Use process of elimination for multiple choice questions—cross out obviously wrong answers as you listen.',
  'For map and diagram questions, visualize the layout and follow directions carefully.',
  'Review your mistakes after practice tests and note patterns in your errors.'
];
const generalTraps = [
  'Don\'t be misled by distractors or corrections in the audio. Speakers may change their answers or correct themselves.',
  'Don\'t assume the first answer you hear is always correct—listen for changes or clarifications.',
  'Be careful with spelling: even a small mistake can cost you a mark.',
  'Watch out for word limit instructions (e.g., NO MORE THAN TWO WORDS). Exceeding the limit means no mark.',
  'Don\'t get stuck on one question. If you miss it, move on and stay focused for the next.',
  'Don\'t write answers too early—wait until you are sure, as information may be repeated or corrected.',
  'Don\'t ignore the context of the conversation. Sometimes the answer is implied, not directly stated.',
  'Don\'t forget to transfer your answers carefully to the answer sheet (for paper-based tests).',
  'Don\'t rely solely on keywords—listen for synonyms and paraphrased information.',
  'Don\'t panic if you hear unfamiliar vocabulary. Focus on the overall meaning and context.',
  'Don\'t leave blanks—always make an educated guess if you are unsure.'
];
const generalPredictions = [
  'Expect to hear a range of accents and speeds. Practice with different recordings to build confidence.',
  'Questions may not follow the order of the information in the audio, especially in matching and map tasks.',
  'Answers are often paraphrased—be ready to match meaning, not just words.',
  'Some questions will have distractors: information that sounds correct but is later changed or clarified.',
  'You may need to write numbers, dates, or names—practice listening for these details.',
  'In multiple choice, all options may be mentioned, but only one is correct. Listen for subtle clues.',
  'For form/note/table completion, answers are usually short and factual.',
  'In map/diagram questions, directions and spatial language (left, right, next to, opposite) are important.',
  'Expect some questions to test your ability to follow a sequence or process.',
  'Some sections will require you to track multiple speakers—note who says what.',
  'Prediction: The test will include both straightforward and challenging questions. Stay calm and use strategies for both.'
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
