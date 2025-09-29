import React, { useState } from 'react';
import { getListeningTemplateForTopic } from '../utils/loadTemplates';
import ListeningClusterMindmap from './ListeningClusterMindmap';
import Header from './Header';
import Footer from './Footer';

// Example general tips/traps/predictions for the whole category (replace with real data as needed)
const generalTips = [
  {
    icon: '💡',
    title: 'Preview Questions',
    text: 'Read all questions before listening and underline keywords. This helps you focus on what information to listen for.',
  example: 'E.g., Underline "date" and "location" in the question: "What date is the meeting? Where will it be held?" Also, circle verbs like "describe" or "explain" to know what kind of answer is needed.'
  },
  {
    icon: '🔍',
    title: 'Predict Answers',
    text: 'Predict the type of answer (number, name, place, etc.) before the audio starts. Write your prediction next to the question.',
  example: 'E.g., If the question is "How many people attended?", write "number" beside it. For "Who is responsible for the project?", write "person".'
  },
  {
    icon: '🗣️',
    title: 'Listen for Signposts',
    text: 'Listen for signpost words (first, however, finally) and speaker changes to follow the structure of the recording.',
  example: 'E.g., "First, we will discuss..." signals a new section. "However" or "on the other hand" may signal a change in opinion.'
  },
  {
    icon: '✍️',
    title: 'Follow Instructions',
    text: 'Pay attention to instructions: word limits, number of words, and spelling all matter for your score.',
  example: 'E.g., If the instruction says "NO MORE THAN TWO WORDS", write only one or two words. If it says "Write a number", do not write words.'
  },
  {
    icon: '⏳',
    title: 'Use Preparation Time',
    text: 'Use the time before each section to scan questions and highlight key information.',
  example: 'E.g., Skim all 5 questions in Section 2 before the audio starts. Highlight names, dates, or places that are likely to be answers.'
  },
  {
    icon: '🌍',
    title: 'Practice Accents',
    text: 'Practice with a variety of accents (British, Australian, American, Canadian) to improve comprehension.',
  example: 'E.g., Listen to BBC, ABC, and NPR podcasts. Try YouTube videos with different English speakers.'
  },
  {
    icon: '➡️',
    title: 'Move On Quickly',
    text: 'If you miss an answer, move on quickly—don’t let it affect your focus for the next question.',
  example: 'E.g., If you miss Q3, focus on Q4 instead of worrying. Mark the missed question and return to it at the end.'
  },
  {
    icon: '📝',
    title: 'Check Your Work',
    text: 'Check your answers for spelling, grammar, and word count before submitting.',
  example: 'E.g., Make sure "accommodation" is spelled correctly. Double-check for common mistakes like "recieve" instead of "receive".'
  },
  {
    icon: '🗒️',
    title: 'Take Notes',
    text: 'Take notes as you listen, especially for names, numbers, and dates.',
  example: 'E.g., Write down "May 14" and "Room 302" as you hear them. Jot down initials for speakers (e.g., J for John, S for Sarah) to keep track.'
  },
  {
    icon: '🔄',
    title: 'Spot Paraphrasing',
    text: 'Practice listening for synonyms and paraphrases, as the audio rarely uses the exact words from the questions.',
  example: 'E.g., "Children" in the question may be "kids" in the audio. "Purchase" in the audio may mean "buy" in the question.'
  },
  {
    icon: '❌',
    title: 'Eliminate Wrong Answers',
    text: 'Use process of elimination for multiple choice questions—cross out obviously wrong answers as you listen.',
  example: 'E.g., If the speaker says "I never take the bus", eliminate "bus" as an answer. If two options are mentioned but one is rejected, cross it out.'
  },
  {
    icon: '🗺️',
    title: 'Visualize Maps',
    text: 'For map and diagram questions, visualize the layout and follow directions carefully.',
  example: 'E.g., "The library is next to the cafeteria, opposite the gym." Draw a quick map or diagram to follow directions.'
  },
  {
    icon: '🔁',
    title: 'Review Mistakes',
    text: 'Review your mistakes after practice tests and note patterns in your errors.',
  example: 'E.g., If you often miss numbers, focus on listening for them in practice. Keep a notebook of your most common mistakes.'
  },
];
const generalTraps = [
  {
    icon: '⚠️',
    title: 'Distractors',
    text: 'Don\'t be misled by distractors or corrections in the audio. Speakers may change their answers or correct themselves.',
  example: 'E.g., "I think the answer is 12... oh no, sorry, it\'s 21." The speaker may say one thing, then immediately correct themselves.'
  },
  {
    icon: '🔄',
    title: 'Changed Answers',
    text: 'Don\'t assume the first answer you hear is always correct—listen for changes or clarifications.',
  example: 'E.g., The speaker says "I\'ll take the train" but later changes to "Actually, I\'ll drive." Listen for phrases like "No, wait..." or "Actually...".'
  },
  {
    icon: '📝',
    title: 'Spelling Errors',
    text: 'Be careful with spelling: even a small mistake can cost you a mark.',
  example: 'E.g., Writing "accomodation" instead of "accommodation" is marked wrong. "Enviroment" instead of "environment" is also incorrect.'
  },
  {
    icon: '🔢',
    title: 'Word Limits',
    text: 'Watch out for word limit instructions (e.g., NO MORE THAN TWO WORDS). Exceeding the limit means no mark.',
  example: 'E.g., Writing "a beautiful garden" (3 words) when only 2 are allowed. "The main entrance" (3 words) is not accepted if the limit is two.'
  },
  {
    icon: '⏩',
    title: 'Getting Stuck',
    text: 'Don\'t get stuck on one question. If you miss it, move on and stay focused for the next.',
  example: 'E.g., If you miss Q5, focus on Q6 instead of worrying. Put a star next to missed questions to revisit later.'
  },
  {
    icon: '⏱️',
    title: 'Answer Too Early',
    text: 'Don\'t write answers too early—wait until you are sure, as information may be repeated or corrected.',
  example: 'E.g., The speaker says "The meeting is at 3pm" but later corrects to "No, it\'s at 4pm." Wait for confirmation before writing your answer.'
  },
  {
    icon: '💬',
    title: 'Implied Answers',
    text: 'Don\'t ignore the context of the conversation. Sometimes the answer is implied, not directly stated.',
  example: 'E.g., "Bring your umbrella" implies it will rain. "Don\'t forget your coat" suggests cold weather.'
  },
  {
    icon: '📋',
    title: 'Transfer Errors',
    text: 'Don\'t forget to transfer your answers carefully to the answer sheet (for paper-based tests).',
  example: 'E.g., Writing the answer in the wrong box on the answer sheet. Double-check question numbers when transferring answers.'
  },
  {
    icon: '🔑',
    title: 'Keyword Reliance',
    text: 'Don\'t rely solely on keywords—listen for synonyms and paraphrased information.',
  example: 'E.g., The question says "children" but the audio says "kids". "Residence" in the audio may mean "home" in the question.'
  },
  {
    icon: '😨',
    title: 'Panic',
    text: 'Don\'t panic if you hear unfamiliar vocabulary. Focus on the overall meaning and context.',
  example: 'E.g., If you don\'t know "venue", listen for clues like "place" or "location". Focus on the main idea, not every word.'
  },
  {
    icon: '❓',
    title: 'Leaving Blanks',
    text: 'Don\'t leave blanks—always make an educated guess if you are unsure.',
  example: 'E.g., If you\'re not sure, write your best guess instead of leaving it blank. Use context clues to make an educated guess.'
  },
];
const generalPredictions = [
  {
    icon: '🔊',
    title: 'Varied Accents',
    text: 'Expect to hear a range of accents and speeds. Practice with different recordings to build confidence.',
  example: 'E.g., You may hear both British and Australian speakers in one test. Some speakers may talk quickly, others slowly.'
  },
  {
    icon: '🔀',
    title: 'Order of Questions',
    text: 'Questions may not follow the order of the information in the audio, especially in matching and map tasks.',
  example: 'E.g., Q5 may be answered before Q4 in the audio. In matching tasks, answers may jump around.'
  },
  {
    icon: '🔄',
    title: 'Paraphrased Answers',
    text: 'Answers are often paraphrased—be ready to match meaning, not just words.',
  example: 'E.g., "purchase" in the audio instead of "buy" in the question. "Depart" in the audio may mean "leave" in the question.'
  },
  {
    icon: '⚠️',
    title: 'Distractors',
    text: 'Some questions will have distractors: information that sounds correct but is later changed or clarified.',
  example: 'E.g., The speaker says "The meeting is on Monday... no, wait, it\'s Tuesday." Listen for corrections and clarifications.'
  },
  {
    icon: '🔢',
    title: 'Numbers and Names',
    text: 'You may need to write numbers, dates, or names—practice listening for these details.',
  example: 'E.g., "The code is 4732" or "Her name is Ms. Carter." Listen for numbers spelled out ("four seven three two") or names spelled letter by letter.'
  },
  {
    icon: '✅',
    title: 'Multiple Choice',
    text: 'In multiple choice, all options may be mentioned, but only one is correct. Listen for subtle clues.',
  example: 'E.g., The speaker mentions all three options but only recommends one. Listen for phrases like "the best choice is..." or "I would suggest...".'
  },
  {
    icon: '📋',
    title: 'Short Answers',
    text: 'For form/note/table completion, answers are usually short and factual.',
  example: 'E.g., "Date: 12th June" or "Location: Main Hall". Answers are usually short, like "blue" or "tennis".'
  },
  {
    icon: '🗺️',
    title: 'Spatial Language',
    text: 'In map/diagram questions, directions and spatial language (left, right, next to, opposite) are important.',
  example: 'E.g., "The café is opposite the library." Directions like "turn left at the entrance" are common.'
  },
  {
    icon: '🔗',
    title: 'Sequencing',
    text: 'Expect some questions to test your ability to follow a sequence or process.',
  example: 'E.g., "First, mix the flour. Then, add water." "After that, bake for 20 minutes."'
  },
  {
    icon: '👥',
    title: 'Multiple Speakers',
    text: 'Some sections will require you to track multiple speakers—note who says what.',
  example: 'E.g., "John: I agree. Sarah: I\'m not sure." Listen for names and voices to identify speakers.'
  },
  {
    icon: '🧘',
    title: 'Difficulty Mix',
    text: 'Prediction: The test will include both straightforward and challenging questions. Stay calm and use strategies for both.',
  example: 'E.g., Some questions will be direct, others will require inference. Be prepared for both easy and tricky questions.'
  },
];

// Canvas area for Listening topic: shows mindmap, template, tips, traps, etc.



export default function ListeningCategoryCanvas({ categoryKey, topicKey }) {
  const [tab, setTab] = useState('tips');
  const template = topicKey ? getListeningTemplateForTopic(categoryKey, topicKey) : null;

  // If a topic is selected and it has any data, show all topic-specific tips/traps/predictions/mindmap; otherwise show general info for the selected tab
  let tabContent;
  if (topicKey && template && template.title !== 'No data' && (template.tips?.length > 0 || template.traps?.length > 0 || template.predictions?.length > 0 || template.mindmap)) {
    tabContent = (
      <>
        <h2 className="text-2xl font-bold mb-6">{template.title}</h2>
        {template.mindmap && (
          <div className="mb-8"><ListeningClusterMindmap data={template.mindmap} /></div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h3 className="text-lg font-semibold text-blue-900">Tips</h3>
            </div>
            {template.tips && template.tips.length > 0 ? (
              <ul className="list-disc ml-5 space-y-2 text-base text-blue-900">
                {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            ) : (
              <div className="text-blue-700 italic">No tips for this topic.</div>
            )}
          </div>
          {/* Traps */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚠️</span>
              <h3 className="text-lg font-semibold text-red-700">Traps</h3>
            </div>
            {template.traps && template.traps.length > 0 ? (
              <ul className="list-disc ml-5 space-y-2 text-base text-red-700">
                {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
              </ul>
            ) : (
              <div className="text-red-700 italic">No traps for this topic.</div>
            )}
          </div>
          {/* Predictions */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔮</span>
              <h3 className="text-lg font-semibold text-blue-700">Predictions</h3>
            </div>
            {template.predictions && template.predictions.length > 0 ? (
              <ul className="list-disc ml-5 space-y-2 text-base text-blue-700">
                {template.predictions.map((pred, i) => <li key={i}>{pred}</li>)}
              </ul>
            ) : (
              <div className="text-blue-700 italic">No predictions for this topic.</div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    // Show general info for the tab
    if (tab === 'tips') {
      tabContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generalTips.map((tip, i) => (
            <div key={i} className="flex flex-col gap-2 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <div className="font-semibold text-blue-900 mb-1">{tip.title}</div>
                  <div className="text-blue-800 text-base">{tip.text}</div>
                </div>
              </div>
              <div className="text-xs text-blue-700 mt-1 italic">{tip.example}</div>
            </div>
          ))}
        </div>
      );
    } else if (tab === 'traps') {
      tabContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generalTraps.map((trap, i) => (
            <div key={i} className="flex flex-col gap-2 bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{trap.icon}</span>
                <div>
                  <div className="font-semibold text-red-900 mb-1">{trap.title}</div>
                  <div className="text-red-800 text-base">{trap.text}</div>
                </div>
              </div>
              <div className="text-xs text-red-700 mt-1 italic">{trap.example}</div>
            </div>
          ))}
        </div>
      );
    } else if (tab === 'predictions') {
      tabContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generalPredictions.map((pred, i) => (
            <div key={i} className="flex flex-col gap-2 bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{pred.icon}</span>
                <div>
                  <div className="font-semibold text-blue-900 mb-1">{pred.title}</div>
                  <div className="text-blue-800 text-base">{pred.text}</div>
                </div>
              </div>
              <div className="text-xs text-blue-700 mt-1 italic">{pred.example}</div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <div className="w-full max-w-5xl mx-auto px-2 py-8">
        {/* Trap/Tips/Prediction tabs (always on top) */}
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
      </div>
      <Footer />
    </>
  );
}
