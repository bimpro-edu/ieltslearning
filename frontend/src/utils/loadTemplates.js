import { getListeningTopicsForCategory as _getListeningTopicsForCategory, getListeningTemplateForTopic as _getListeningTemplateForTopic } from './listeningTemplates';

// Export function to get topics for a listening category (for sidebar)
export function getListeningTopicsForCategory(categoryKey) {
  return _getListeningTopicsForCategory(categoryKey);
}

// Export function for loading writing templates (for TaskPage and others)
export function loadTemplates({ taskType, category, band }) {
  return templateMap[taskType]?.[category]?.[band] || [];
}

// Export function to get all reading categories
export function getReadingCategories() {
  return readingCategories;
}

import task2_positiveNegativeDevelopment_band5 from '../templates/task2/positiveNegativeDevelopment/band5.js';
import task2_positiveNegativeDevelopment_band6 from '../templates/task2/positiveNegativeDevelopment/band6.js';
import task2_positiveNegativeDevelopment_band7 from '../templates/task2/positiveNegativeDevelopment/band7.js';
import task2_positiveNegativeDevelopment_band8 from '../templates/task2/positiveNegativeDevelopment/band8.js';
// Utility to dynamically import template data for modular, scalable management
// Import all templates statically
import task2_opinion_band5 from '../templates/task2/opinion/band5.js';
import task2_opinion_band6 from '../templates/task2/opinion/band6.js';
import task2_opinion_band7 from '../templates/task2/opinion/band7.js';
import task2_opinion_band8 from '../templates/task2/opinion/band8.js';

import task2_discussion_band5 from '../templates/task2/discussion/band5.js';
import task2_discussion_band6 from '../templates/task2/discussion/band6.js';
import task2_discussion_band7 from '../templates/task2/discussion/band7.js';
import task2_discussion_band8 from '../templates/task2/discussion/band8.js';

// Listening Templates
import listening_workplace from '../templates/listening/core-listening-skills/workplace.js';
import listening_shopping from '../templates/listening/core-listening-skills/shopping.js';
import listening_climate_change from '../templates/listening/core-listening-skills/climate-change.js';
import listening_music_impact from '../templates/listening/core-listening-skills/music-impact.js';
import listening_space_exploration from '../templates/listening/core-listening-skills/space-exploration.js';
import listening_renewable_energy from '../templates/listening/core-listening-skills/renewable-energy.js';
import listening_digital_privacy from '../templates/listening/core-listening-skills/digital-privacy.js';
import listening_sports_benefits from '../templates/listening/core-listening-skills/sports-benefits.js';
import listening_travel_culture from '../templates/listening/core-listening-skills/travel-culture.js';
import listening_history_internet from '../templates/listening/core-listening-skills/history-internet.js';
import listening_university_life from '../templates/listening/core-listening-skills/university-life.js';
import listening_accommodation from '../templates/listening/core-listening-skills/accommodation.js';
import listening_environmental_issues from '../templates/listening/core-listening-skills/environmental-issues.js';
import listening_family from '../templates/listening/core-listening-skills/family.js';
import listening_public_services from '../templates/listening/core-listening-skills/public-services.js';
import listening_healthcare from '../templates/listening/core-listening-skills/healthcare.js';
import listening_transport from '../templates/listening/core-listening-skills/transport.js';
import listening_leisure from '../templates/listening/core-listening-skills/leisure.js';

const listeningTemplateMap = {
  'core-listening-skills': {
    'workplace': listening_workplace,
    'shopping': listening_shopping,
    'climate-change': listening_climate_change,
    'music-impact': listening_music_impact,
    'space-exploration': listening_space_exploration,
    'renewable-energy': listening_renewable_energy,
    'digital-privacy': listening_digital_privacy,
    'sports-benefits': listening_sports_benefits,
    'travel-culture': listening_travel_culture,
    'history-internet': listening_history_internet,
    'university-life': listening_university_life,
    'accommodation': listening_accommodation,
    'environmental-issues': listening_environmental_issues,
    'family': listening_family,
    'public-services': listening_public_services,
    'healthcare': listening_healthcare,
    'transport': listening_transport,
    'leisure': listening_leisure,
  }
};

// Mapping: { [taskType]: { [category]: { [band]: templateData } } }
const templateMap = {
  task2: {
    opinion: {
      5: task2_opinion_band5,
      6: task2_opinion_band6,
      7: task2_opinion_band7,
      8: task2_opinion_band8,
    },
    discussion: {
      5: task2_discussion_band5,
      6: task2_discussion_band6,
      7: task2_discussion_band7,
      8: task2_discussion_band8,
    },
    positiveNegativeDevelopment: {
      5: task2_positiveNegativeDevelopment_band5,
      6: task2_positiveNegativeDevelopment_band6,
      7: task2_positiveNegativeDevelopment_band7,
      8: task2_positiveNegativeDevelopment_band8,
    }
  }
};

export function getListeningTemplateForTopic(categoryKey, topicKey) {
  return _getListeningTemplateForTopic(categoryKey, topicKey);
}

// Reading categories
const readingCategories = [
  { key: 'core-reading-skills', title: 'Core Reading Skills' },
  { key: 'advanced-skills', title: 'Advanced Reading Skills' },
  { key: 'question-types', title: 'Question Type Mastery' },
];

// Reading category topics for sidebar navigation
const readingCategoryTopics = {
  'core-reading-skills': [
    { key: 'diagram-label-completion', title: 'Diagram Label Completion' },
    { key: 'author-attitude', title: "Identifying Author's Attitude" },
    { key: 'main-idea', title: 'Identifying Main Idea' },
    { key: 'true-false-ng', title: 'True/False/Not Given' },
    { key: 'yes-no-ng', title: 'Yes/No/Not Given' },
    { key: 'matching-headings', title: 'Matching Headings' },
    { key: 'matching-information', title: 'Matching Information' },
    { key: 'matching-features', title: 'Matching Features' },
    { key: 'sentence-completion', title: 'Sentence Completion' },
    { key: 'summary-completion', title: 'Summary Completion' },
    { key: 'note-completion', title: 'Note/Table/Flow-chart Completion' },
    { key: 'multiple-choice', title: 'Multiple Choice Questions' },
    { key: 'short-answer', title: 'Short Answer Questions' },
    { key: 'academic-vocabulary', title: 'Academic Vocabulary Building' },
    { key: 'skimming-scanning', title: 'Skimming & Scanning Techniques' },
    { key: 'paraphrase-tracking', title: 'Paraphrase Recognition' },
    { key: 'time-management', title: 'Reading Time Management' },
    { key: 'trap-awareness', title: 'Common Traps & Distractors' },
    { key: 'inference-skills', title: 'Inference & Implication' },
    { key: 'text-structure', title: 'Understanding Text Structure' },
    { key: 'mock-tests', title: 'Mock Reading Tests' }
  ]
};

// Reading templates for all question types with rich tips, traps, and predictions
const readingTemplates = {
  'diagram-label-completion': {
    title: 'Diagram Label Completion',
    tips: [
      'Analyze the diagram to understand the process or object it represents.',
      'Scan the text for keywords related to the diagram.',
      'The answers are usually located in a specific section of the passage.',
      'Pay attention to the word limit for each label.',
      'Use the labels already provided to orient yourself in the text.'
    ],
    traps: [
      'Do not assume the answers will be in the same order as the labels on the diagram.',
      'Be careful with technical terms that may be paraphrased in the text.',
      'Do not use your own knowledge to label the diagram; use only the information from the text.'
    ],
    predictions: [
      'Diagram label completion questions often appear in passages about science or technology.',
      'Expect to label parts of a machine, a biological process, or a natural phenomenon.'
    ]
  },
  'author-attitude': {
    title: "Identifying Author's Attitude",
    tips: [
      'Look for words that express opinions, emotions, or judgments (e.g., "fortunately", "unfortunately", "surprisingly").',
      'Pay attention to the author\'s choice of adjectives and adverbs.',
      'Consider the overall tone of the passage: is it positive, negative, or neutral?',
      'Identify whether the author is presenting their own view or reporting the views of others.'
    ],
    traps: [
      'Do not confuse the author\'s attitude with the opinions of people quoted in the text.',
      'Be aware that the author\'s attitude may be subtle and not explicitly stated.',
      'Do not assume that the author agrees with everything they mention.'
    ],
    predictions: [
      'This skill is crucial for Yes/No/Not Given questions and some multiple-choice questions.',
      'Expect to find questions about the author\'s purpose, tone, or bias in argumentative passages.'
    ]
  },
  'main-idea': {
    title: 'Identifying Main Idea',
    tips: [
      'The main idea is the central point or message of a paragraph or the entire passage.',
      'Look for a topic sentence, which is often the first or last sentence of a paragraph.',
      'Ask yourself, "What is the author\'s primary purpose in this paragraph?".',
      'Distinguish between the main idea and supporting details or examples.'
    ],
    traps: [
      'Do not choose a detail or example as the main idea.',
      'Be careful with headings that are too broad or too narrow.',
      'Do not be misled by a single sentence; consider the paragraph as a whole.'
    ],
    predictions: [
      'This skill is essential for Matching Headings questions.',
      'Understanding the main idea of each paragraph helps you to follow the author\'s argument.'
    ]
  },
  'true-false-ng': {
    title: 'True/False/Not Given',
    tips: [
      'TRUE: The statement agrees with the information in the passage (exact match or paraphrase).',
      'FALSE: The statement contradicts the information in the passage (opposite meaning).',
      'NOT GIVEN: The information is not mentioned in the passage at all.',
      'Look for paraphrases and synonyms rather than exact word matches.',
      'Pay attention to qualifying words like "some," "all," "never," "always." ',
      'The statements usually follow the order of information in the passage.'
    ],
    traps: [
      'Don\'t use your general knowledge - stick only to what\'s in the passage.',
      'Don\'t confuse "Not Given" with "False" - if it\'s not mentioned, it\'s Not Given.',
      'Watch out for extreme words like "all," "never," "only" - they often signal False answers.',
      'Be careful with numbers and statistics - small changes can make statements false.',
      'Don\'t assume something is true just because it sounds logical.'
    ],
    predictions: [
      'Expect 5-6 True/False/Not Given questions per passage in Academic Reading.',
      'Questions usually cover factual information rather than opinions.',
      'Look for questions about research findings, historical facts, or processes.',
      'Some questions may test your understanding of cause and effect relationships.',
      'The most challenging questions often involve subtle paraphrasing.'
    ]
  },
  'yes-no-ng': {
    title: 'Yes/No/Not Given',
    tips: [
      'YES: The statement agrees with the writer\'s views or claims in the passage.',
      'NO: The statement contradicts the writer\'s views or claims in the passage.',
      'NOT GIVEN: The writer\'s view on this is not mentioned in the passage.',
      'Focus on the writer\'s opinions, beliefs, and arguments, not just facts.',
      'Look for opinion markers like "believe," "argue," "suggest," "claim." ',
      'Pay attention to the writer\'s tone and attitude toward different topics.'
    ],
    traps: [
      'Don\'t confuse facts with opinions - this question type is about the writer\'s views.',
      'Watch out for statements that seem factual but are actually the writer\'s opinion.',
      'Be careful with conditional language like "might," "could," "probably." ',
      'Don\'t assume the writer agrees with something just because it\'s mentioned.',
      'Multiple viewpoints may be presented - focus on what the writer personally believes.'
    ],
    predictions: [
      'These questions appear mainly in passages with argumentative or opinion-based content.',
      'Expect questions about the writer\'s stance on controversial topics.',
      'Look for questions testing your understanding of the writer\'s recommendations.',
      'Some questions may involve the writer\'s attitude toward research or studies.',
      'The writer\'s implicit views may be tested, not just explicit statements.'
    ]
  },
  'matching-headings': {
    title: 'Matching Headings',
    tips: [
      'Focus on the main idea of each paragraph, not the supporting details.',
      'Look for topic sentences, usually at the beginning or end of paragraphs.',
      'Identify key themes and concepts that summarize the paragraph\'s content.',
      'Read the headings first to understand what you\'re looking for.',
      'Cross out used headings to avoid confusion.',
      'Some headings may be distractors that don\'t match any paragraph.'
    ],
    traps: [
      'Don\'t choose a heading just because it contains words from the paragraph.',
      'Avoid headings that only cover part of the paragraph\'s content.',
      'Watch out for headings that are too general or too specific.',
      'Don\'t be misled by examples or minor details mentioned in passing.',
      'Be careful with similar-sounding headings that have different meanings.'
    ],
    predictions: [
      'Usually 5-7 paragraphs to match with 8-10 possible headings.',
      'One or two paragraphs may already have headings provided as examples.',
      'Extra headings are included as distractors.',
      'Questions test your ability to identify main ideas and themes.',
      'Paragraphs often follow a logical progression of ideas.'
    ]
  },
  'matching-information': {
    title: 'Matching Information',
    tips: [
      'Scan for specific information, details, or examples mentioned in the questions.',
      'Look for paraphrases and synonyms rather than exact word matches.',
      'Pay attention to names, dates, numbers, and specific facts.',
      'The information may be scattered throughout different parts of a paragraph.',
      'Some paragraphs may contain multiple pieces of matching information.',
      'Use paragraph letters (A, B, C, etc.) for your answers.'
    ],
    traps: [
      'Don\'t choose a paragraph just because it mentions similar topics.',
      'Make sure the specific information requested is actually in that paragraph.',
      'Watch out for information that seems relevant but doesn\'t match exactly.',
      'Be careful with numbers, dates, or statistics that might be slightly different.',
      'Don\'t confuse general topics with specific details.'
    ],
    predictions: [
      'Questions often ask about specific examples, research findings, or factual details.',
      'You may need to match descriptions of processes, events, or characteristics.',
      'Some questions test your ability to locate supporting evidence for claims.',
      'Information might be presented as case studies or specific instances.',
      'Multiple correct answers may come from the same paragraph.'
    ]
  },
  'matching-features': {
    title: 'Matching Features',
    tips: [
      'Identify the relationships between people, places, concepts, or characteristics.',
      'Look for specific attributions: who said what, who did what, what belongs where.',
      'Pay attention to linking words and phrases that show relationships.',
      'Scan for names, titles, or identifying features mentioned in the questions.',
      'The same person/place/concept may match with multiple features.',
      'Cross-reference information to ensure accurate matching.'
    ],
    traps: [
      'Don\'t assume relationships that aren\'t explicitly stated in the text.',
      'Make sure you\'re matching the right type of feature (opinion vs. action vs. characteristic).',
      'Watch out for similar names or concepts that might be confused.',
      'Be careful when multiple people or places are mentioned in the same paragraph.',
      'Don\'t match based on proximity alone - look for clear connections.'
    ],
    predictions: [
      'Common formats: match people to their opinions, discoveries, or characteristics.',
      'May involve matching places to their features or historical events.',
      'Could test relationships between concepts, theories, or research findings.',
      'Questions often involve expert opinions, research results, or historical facts.',
      'Some features may not be used, or some may be used more than once.'
    ]
  },
  'sentence-completion': {
    title: 'Sentence Completion',
    tips: [
      'Read the incomplete sentence carefully to understand what type of word is needed.',
      'Check the word limit (usually 1-3 words from the passage).',
      'Look for grammatical clues: nouns, verbs, adjectives, numbers, etc.',
      'The words must be taken exactly from the passage - no paraphrasing.',
      'Follow the order of information in the passage.',
      'Read around the gap to understand the context fully.'
    ],
    traps: [
      'Don\'t exceed the word limit - you\'ll be marked wrong even if the meaning is correct.',
      'Don\'t change the form of words from the passage (no plurals, tenses, etc.).',
      'Make sure your answer makes grammatical sense in the sentence.',
      'Don\'t choose words that fit grammatically but change the meaning.',
      'Watch out for misleading information that appears near the correct answer.'
    ],
    predictions: [
      'Questions often test key vocabulary, technical terms, or specific details.',
      'May focus on numbers, dates, names, or measurements.',
      'Could involve completing definitions, processes, or cause-effect relationships.',
      'Some gaps may require understanding of pronoun references.',
      'The completed sentences should summarize important information from the passage.'
    ]
  },
  'summary-completion': {
    title: 'Summary Completion',
    tips: [
      'Read the summary carefully to understand the overall meaning and flow.',
      'Identify what type of word is needed for each gap (noun, verb, adjective, etc.).',
      'Use the word list provided (if given) or take words from the passage.',
      'Check word limits and follow them exactly.',
      'The summary follows the same order as information in the passage.',
      'Look for paraphrases and synonyms of the summary language in the text.'
    ],
    traps: [
      'Don\'t choose words that fit grammatically but don\'t match the passage meaning.',
      'If using a word list, watch out for words that seem right but don\'t fit the context.',
      'Don\'t exceed word limits or use words not from the given options.',
      'Make sure the completed summary makes logical sense as a whole.',
      'Be careful with similar-looking words that have different meanings.'
    ],
    predictions: [
      'Summaries typically cover the main points or key processes from the passage.',
      'May focus on research findings, historical events, or scientific processes.',
      'Often includes cause-effect relationships or sequential information.',
      'Key vocabulary and technical terms are frequently tested.',
      'The summary may combine information from different parts of the passage.'
    ]
  },
  'note-completion': {
    title: 'Note/Table/Flow-chart Completion',
    tips: [
      'Study the structure of the notes/table/flow-chart to understand the organization.',
      'Identify what information is missing and what type of word is needed.',
      'Follow any arrows or logical flow in flow-charts and diagrams.',
      'Use headings and categories to locate relevant information in the passage.',
      'Pay attention to the relationship between different pieces of information.',
      'Check word limits and take words exactly from the passage.'
    ],
    traps: [
      'Don\'t ignore the logical structure of the diagram or table.',
      'Make sure your answers fit the format and style of the existing information.',
      'Don\'t confuse categories or mix up different types of information.',
      'Watch out for information that appears in the wrong section of the passage.',
      'Be careful with abbreviations or technical terms that might be paraphrased.'
    ],
    predictions: [
      'Often used for scientific processes, research methodologies, or classification systems.',
      'May involve historical timelines, comparison tables, or step-by-step procedures.',
      'Tables might compare different aspects of multiple subjects or concepts.',
      'Flow-charts typically show processes, cycles, or cause-effect relationships.',
      'Notes may summarize key points from different sections of the passage.'
    ]
  },
  'multiple-choice': {
    title: 'Multiple Choice Questions',
    tips: [
      'Read the question and options carefully before looking at the passage.',
      'Eliminate obviously wrong answers to increase your chances.',
      'Look for paraphrases of the correct answer in the passage.',
      'Pay attention to qualifying words like "mainly," "according to," "suggests." ',
      'The correct answer must be supported by evidence in the passage.',
      'For multiple-answer questions, check how many options to choose.'
    ],
    traps: [
      'Don\'t choose answers that are true in general but not mentioned in the passage.',
      'Watch out for options that are partly correct but miss key details.',
      'Be careful with extreme language in options (always, never, all, none).',
      'Don\'t be misled by options that use exact words from the passage incorrectly.',
      'Make sure you understand whether the question asks for one or multiple answers.'
    ],
    predictions: [
      'Questions often test main ideas, specific details, or the writer\'s attitude.',
      'May ask about purpose, opinion, implication, or reason.',
      'Some questions test your understanding of vocabulary in context.',
      'Could involve identifying the best title or summary for a section.',
      'Multiple-answer questions might ask for characteristics, examples, or factors.'
    ]
  },
  'short-answer': {
    title: 'Short Answer Questions',
    tips: [
      'Check the word limit carefully (usually 1-3 words from the passage).',
      'Use exact words from the passage - no paraphrasing allowed.',
      'Make sure your answer directly answers the question asked.',
      'Pay attention to question words: who, what, when, where, why, how.',
      'Follow the order of questions as they appear in the passage.',
      'Spelling must be correct - copy exactly from the passage.'
    ],
    traps: [
      'Don\'t exceed the word limit even if you want to give more complete information.',
      'Don\'t change the form of words (plurals, verb tenses, etc.) from the passage.',
      'Make sure you answer the specific question, not related information.',
      'Don\'t include extra words like articles (a, an, the) unless necessary.',
      'Be careful with questions that ask for specific numbers or dates.'
    ],
    predictions: [
      'Questions typically ask for factual information: names, places, times, numbers.',
      'May test understanding of specific details or definitions.',
      'Often focus on who did what, when something happened, or where events occurred.',
      'Could ask for reasons, methods, or characteristics.',
      'Answers are usually concrete nouns, proper nouns, or numerical information.'
    ]
  },
  'academic-vocabulary': {
    title: 'Academic Vocabulary Building',
    tips: [
      'Learn the Academic Word List (AWL) - 570 word families common in academic texts.',
      'Focus on collocations: how academic words combine with others.',
      'Study word families: different forms of the same root word.',
      'Learn synonyms and paraphrases commonly used in IELTS reading passages.',
      'Practice recognizing formal and academic tone in writing.',
      'Build topic-specific vocabulary clusters (science, economics, history, etc.).'
    ],
    traps: [
      'Don\'t assume familiar words have the same meaning in academic contexts.',
      'Watch out for false friends and similar-looking words with different meanings.',
      'Be careful with words that change meaning based on context or field of study.',
      'Don\'t ignore prefixes and suffixes that can change word meanings significantly.',
      'Avoid focusing only on individual words - understand phrases and expressions.'
    ],
    predictions: [
      'High-frequency academic vocabulary appears in most IELTS reading passages.',
      'You\'ll encounter formal synonyms for common words (e.g., "commence" for "begin").',
      'Technical vocabulary specific to passage topics will be crucial for understanding.',
      'Many questions test your ability to recognize paraphrases of academic terms.',
      'Understanding word families helps with multiple question types.'
    ]
  },
  'skimming-scanning': {
    title: 'Skimming & Scanning Techniques',
    tips: [
      'SKIMMING: Read quickly to get the main idea - focus on first/last sentences of paragraphs.',
      'SCANNING: Search for specific information like names, dates, numbers, or keywords.',
      'Use headings, subheadings, and topic sentences to guide your skimming.',
      'Don\'t read every word when scanning - let your eyes move quickly over the text.',
      'Practice switching between skimming for overview and scanning for details.',
      'Use your finger or a pen to guide your eyes when scanning for specific information.'
    ],
    traps: [
      'Don\'t get distracted by interesting details when you should be skimming for main ideas.',
      'Avoid reading too slowly when you should be scanning for specific information.',
      'Don\'t skip the question analysis - know what you\'re looking for before you start.',
      'Be careful not to miss information because you\'re moving too quickly.',
      'Don\'t confuse similar-looking words or numbers when scanning rapidly.'
    ],
    predictions: [
      'Skimming helps with matching headings and identifying main ideas.',
      'Scanning is essential for locating specific details in all question types.',
      'You\'ll need both skills within the 60-minute time limit.',
      'Effective skimming helps you understand passage structure and organization.',
      'Scanning skills are crucial for True/False/Not Given and matching questions.'
    ]
  },
  'paraphrase-tracking': {
    title: 'Paraphrase Recognition',
    tips: [
      'Learn to recognize when different words express the same meaning.',
      'Practice identifying synonyms, word form changes, and sentence restructuring.',
      'Look for concept paraphrases, not just individual word substitutions.',
      'Understand how complex ideas can be expressed in simpler terms or vice versa.',
      'Pay attention to how active/passive voice changes can paraphrase meaning.',
      'Notice how pronouns and references can replace specific nouns.'
    ],
    traps: [
      'Don\'t expect exact word matches between questions and passage text.',
      'Watch out for words that look similar but have different meanings.',
      'Be careful with partial paraphrases that miss key parts of the meaning.',
      'Don\'t assume paraphrases always make things simpler - they can be more complex.',
      'Avoid being misled by paraphrases that change the original meaning slightly.'
    ],
    predictions: [
      'Nearly all IELTS reading questions involve some form of paraphrasing.',
      'You\'ll encounter paraphrases in question stems and answer options.',
      'Paraphrasing is especially important in True/False/Not Given questions.',
      'Multiple choice options often paraphrase information from the passage.',
      'Understanding paraphrases is key to matching exercises and summary completion.'
    ]
  },
  'time-management': {
    title: 'Reading Time Management',
    tips: [
      'Allocate 20 minutes per passage (total 60 minutes for 3 passages).',
      'Spend 2-3 minutes initially skimming each passage for general understanding.',
      'Read questions before reading the passage in detail.',
      'Start with easier question types to build confidence and save time.',
      'Don\'t spend too long on any single difficult question - move on and return later.',
      'Leave 2-3 minutes at the end to transfer answers and check your answer sheet.'
    ],
    traps: [
      'Don\'t spend too much time reading the passage thoroughly before looking at questions.',
      'Avoid getting stuck on one difficult question and losing time for easier ones.',
      'Don\'t rush through questions just to finish - accuracy is more important than speed.',
      'Be careful not to run out of time for the third passage - it\'s often the most challenging.',
      'Don\'t forget to transfer your answers - there\'s no extra time given for this.'
    ],
    predictions: [
      'Time pressure increases significantly from passage 1 to passage 3.',
      'You\'ll need to balance thoroughness with efficiency throughout the test.',
      'Some questions require more time for careful analysis than others.',
      'Time management skills improve with regular practice under test conditions.',
      'The academic reading test requires sustained concentration for the full 60 minutes.'
    ]
  },
  'trap-awareness': {
    title: 'Common Traps & Distractors',
    tips: [
      'Be aware of words that appear in both questions and passage but with different meanings.',
      'Watch for information that\'s close to correct but has subtle differences.',
      'Pay attention to qualifying words that can change meaning (some vs. all, might vs. will).',
      'Look out for answers that are true in general but not according to the passage.',
      'Be careful with numbers, dates, and statistics that might be slightly modified.',
      'Notice when examples are confused with main points or generalizations.'
    ],
    traps: [
      'Don\'t choose answers just because they use words from the passage.',
      'Avoid options that are factually correct but not mentioned in the text.',
      'Be careful with extreme statements that use words like "always," "never," "all," "none." ',
      'Don\'t confuse the order of information or mix up cause and effect.',
      'Watch out for distractors that combine information from different parts of the passage.'
    ],
    predictions: [
      'Distractors often use vocabulary from the passage but in incorrect contexts.',
      'True/False/Not Given questions frequently include plausible but incorrect options.',
      'Multiple choice questions use attractive distractors that seem logical.',
      'Matching exercises include extra options designed to confuse test-takers.',
      'Understanding common trap patterns helps you avoid predictable mistakes.'
    ]
  },
  'inference-skills': {
    title: 'Inference & Implication',
    tips: [
      'Read between the lines to understand what the writer implies but doesn\'t state directly.',
      'Use context clues to infer meaning from surrounding information.',
      'Pay attention to the writer\'s tone and attitude toward different topics.',
      'Look for logical connections and relationships between ideas.',
      'Consider what can reasonably be concluded from the given information.',
      'Distinguish between what is explicitly stated and what is merely suggested.'
    ],
    traps: [
      'Don\'t make inferences that go too far beyond what the passage supports.',
      'Avoid using your own knowledge to make inferences not supported by the text.',
      'Be careful not to confuse strong implications with weak suggestions.',
      'Don\'t assume the writer agrees with all viewpoints presented in the passage.',
      'Watch out for inferences that contradict explicit information in the text.'
    ],
    predictions: [
      'Inference questions often ask about the writer\'s attitude, opinion, or purpose.',
      'You may need to infer relationships between different parts of the passage.',
      'Some questions test your ability to understand implied criticism or support.',
      'Inference skills are important for Yes/No/Not Given questions.',
      'You might need to infer the meaning of vocabulary from context.'
    ]
  },
  'text-structure': {
    title: 'Understanding Text Structure',
    tips: [
      'Identify common text patterns: problem-solution, cause-effect, comparison-contrast.',
      'Pay attention to discourse markers that signal relationships between ideas.',
      'Notice how paragraphs are organized and how they connect to each other.',
      'Understand the function of different parts: introduction, body, conclusion.',
      'Look for parallel structures and repeated patterns in organization.',
      'Use text structure to predict where specific information might be located.'
    ],
    traps: [
      'Don\'t assume all texts follow the same organizational pattern.',
      'Be careful not to misinterpret the relationship between different sections.',
      'Avoid getting confused by complex texts with multiple organizational patterns.',
      'Don\'t ignore important structural signals like headings and subheadings.',
      'Watch out for texts that present multiple viewpoints or arguments.'
    ],
    predictions: [
      'Understanding structure helps with matching headings and summary completion.',
      'Text organization affects how you approach different question types.',
      'Academic texts often follow predictable structural patterns.',
      'Recognizing structure helps you locate information more efficiently.',
      'Structure awareness improves your overall comprehension and reading speed.'
    ]
  },
  'mock-tests': {
    title: 'Mock Reading Tests',
    tips: [
      'Practice under realistic test conditions with strict time limits.',
      'Use official IELTS materials and reputable test preparation resources.',
      'Analyze your mistakes to identify patterns and areas for improvement.',
      'Practice all question types regularly, not just your strongest areas.',
      'Simulate test day conditions: no breaks, proper answer sheet, quiet environment.',
      'Track your progress over time and adjust your study strategy accordingly.'
    ],
    traps: [
      'Don\'t practice with materials that don\'t match real IELTS difficulty and style.',
      'Avoid focusing only on your weak areas and neglecting to maintain strong skills.',
      'Don\'t skip the analysis phase - understanding mistakes is crucial for improvement.',
      'Be careful not to develop bad habits during practice that you carry into the real test.',
      'Don\'t become overly dependent on practice test strategies that won\'t work in real conditions.'
    ],
    predictions: [
      'Regular mock tests help you develop time management and test stamina.',
      'You\'ll encounter question combinations and difficulty levels similar to the real test.',
      'Mock tests reveal your current level and help set realistic score goals.',
      'Practice tests help you develop effective strategies for different question types.',
      'Consistent practice leads to improved confidence and performance on test day.'
    ]
  }
};

// Export function to get topics for a reading category (for sidebar)
export function getReadingTopicsForCategory(categoryKey) {
  return readingCategoryTopics[categoryKey] || [];
}

// Export function for reading templates
export function getReadingTemplateForTopic(categoryKey, topicKey) {
  // categoryKey is ignored; topicKey is used to fetch the template
  return readingTemplates[topicKey] || null;
}
