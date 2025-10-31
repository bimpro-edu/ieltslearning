import { getListeningTopicsForCategory as _getListeningTopicsForCategory, getListeningTemplateForTopic as _getListeningTemplateForTopic } from './listeningTemplates';
import { predictingTopics } from './predictingTemplates';
import { skimmingTopics } from './skimmingTemplates';
import { scanningTopics } from './scanningTemplates';

// Export function to get topics for a listening category (for sidebar)
export function getListeningTopicsForCategory(categoryKey) {
  return _getListeningTopicsForCategory(categoryKey);
}

// Export function for loading writing templates (for TaskPage and others)
export function loadTemplates({ taskType, category, band }) {
  return templateMap[taskType]?.[category]?.[band] || [];
}

// Reading categories for the sidebar
export const readingCategories = [
  // Foundational Categories
  { key: 'predicting', title: 'Predicting Content' },
  { key: 'core-reading-skills', title: 'Core Reading Skills' },
  { key: 'advanced-skills', title: 'Advanced Reading Skills' },
  { key: 'question-types', title: 'Question Type Mastery' },
  
  // Academic Subject Areas
  { key: 'science-tech', title: 'Science & Technology' },
  { key: 'environment', title: 'Environment & Nature' },
  { key: 'society-culture', title: 'Society & Culture' },
  { key: 'health-medicine', title: 'Health & Medicine' },
  { key: 'arts-humanities', title: 'Arts & Humanities' },
  
  // Specialized Topics
  { key: 'business-economics', title: 'Business & Economics' },
  { key: 'education-research', title: 'Education & Research' },
  { key: 'global-issues', title: 'Global Issues' },
  { key: 'history-archaeology', title: 'History & Archaeology' },
  { key: 'urban-planning', title: 'Urban Development' }
];

// Topics for each category
const categoryTopics = {
  'predicting': [
    { key: 'education', title: 'Education' },
    { key: 'technology', title: 'Technology' },
    { key: 'environment', title: 'Environment' },
    { key: 'science', title: 'Science' },
    { key: 'health', title: 'Health' },
    { key: 'business', title: 'Business & Economy' },
    { key: 'society', title: 'Society & Culture' },
    { key: 'history', title: 'History' },
    { key: 'arts', title: 'Arts & Culture' },
    { key: 'global-issues', title: 'Global Issues' }
  ],

  'science-tech': [
    { key: 'robotics-automation', title: 'Robotics & Automation' },
    { key: 'biotechnology', title: 'Biotechnology' },
    { key: 'digital-innovation', title: 'Digital Innovation' },
    { key: 'space-exploration', title: 'Space Exploration' },
    { key: 'renewable-energy', title: 'Renewable Energy' }
  ],

  'environment': [
    { key: 'climate-change', title: 'Climate Change' },
    { key: 'biodiversity', title: 'Biodiversity & Ecosystems' },
    { key: 'sustainable-development', title: 'Sustainable Development' },
    { key: 'conservation', title: 'Conservation' },
    { key: 'environmental-policy', title: 'Environmental Policy' }
  ],

  'society-culture': [
    { key: 'cultural-diversity', title: 'Cultural Diversity' },
    { key: 'social-change', title: 'Social Change' },
    { key: 'migration-identity', title: 'Migration & Identity' },
    { key: 'traditions', title: 'Traditions & Customs' },
    { key: 'language-society', title: 'Language & Society' }
  ],

  'health-medicine': [
    { key: 'medical-research', title: 'Medical Research' },
    { key: 'public-health', title: 'Public Health' },
    { key: 'mental-health', title: 'Mental Health' },
    { key: 'nutrition', title: 'Nutrition & Diet' },
    { key: 'healthcare-systems', title: 'Healthcare Systems' }
  ],

  'arts-humanities': [
    { key: 'art-history', title: 'Art History' },
    { key: 'literature', title: 'Literature' },
    { key: 'archaeology', title: 'Archaeology' },
    { key: 'philosophy', title: 'Philosophy' },
    { key: 'performing-arts', title: 'Performing Arts' }
  ],

  'business-economics': [
    { key: 'global-economy', title: 'Global Economy' },
    { key: 'business-innovation', title: 'Business Innovation' },
    { key: 'market-trends', title: 'Market Trends' },
    { key: 'economic-policy', title: 'Economic Policy' },
    { key: 'entrepreneurship', title: 'Entrepreneurship' }
  ],

  'education-research': [
    { key: 'learning-methods', title: 'Learning Methods' },
    { key: 'educational-technology', title: 'Educational Technology' },
    { key: 'academic-research', title: 'Academic Research' },
    { key: 'higher-education', title: 'Higher Education' },
    { key: 'lifelong-learning', title: 'Lifelong Learning' }
  ],

  'global-issues': [
    { key: 'sustainability', title: 'Sustainability' },
    { key: 'global-health', title: 'Global Health' },
    { key: 'international-relations', title: 'International Relations' },
    { key: 'human-rights', title: 'Human Rights' },
    { key: 'poverty-development', title: 'Poverty & Development' }
  ],

  'history-archaeology': [
    { key: 'ancient-civilizations', title: 'Ancient Civilizations' },
    { key: 'historical-discoveries', title: 'Historical Discoveries' },
    { key: 'cultural-heritage', title: 'Cultural Heritage' },
    { key: 'world-history', title: 'World History' },
    { key: 'archaeological-finds', title: 'Archaeological Finds' }
  ],

  'urban-planning': [
    { key: 'smart-cities', title: 'Smart Cities' },
    { key: 'transportation', title: 'Transportation' },
    { key: 'urban-design', title: 'Urban Design' },
    { key: 'housing', title: 'Housing & Architecture' },
    { key: 'sustainability-planning', title: 'Sustainable Planning' }
  ],

  'core-reading-skills': [
    // Subject-style topics (copied from Predicting category to appear on Skimming page)
    { key: 'education', title: 'Education' },
    { key: 'technology', title: 'Technology' },
    { key: 'science', title: 'Science' },
    { key: 'environment', title: 'Environment' },
    { key: 'health', title: 'Health' },
    { key: 'business', title: 'Business & Economy' },
    { key: 'society', title: 'Society & Culture' },
    { key: 'history', title: 'History' },
    { key: 'arts', title: 'Arts & Culture' },
    { key: 'global-issues', title: 'Global Issues' }
  ]
};

// Export function to get all reading categories
export function getReadingCategories() {
  return readingCategories;
}

// Export function to get topics for a reading category
export function getReadingTopicsForCategory(categoryKey) {
  return categoryTopics[categoryKey] || [];
}

// Export function to get template for a specific topic
export function getReadingTemplateForTopic(categoryKey, topicKey) {
  // If the caller explicitly requests scanning variants (special category key), return scanning templates
  if (categoryKey === 'core-reading-skills-scanning' && scanningTopics && scanningTopics[topicKey]) {
    return scanningTopics[topicKey];
  }

  // First check category-specific skimming templates (default for core-reading-skills)
  if (categoryKey === 'core-reading-skills' && skimmingTopics && skimmingTopics[topicKey]) {
    return skimmingTopics[topicKey];
  }
  
  if (categoryKey === 'predicting' && predictingTopics && predictingTopics[topicKey]) {
    return predictingTopics[topicKey];
  }

  // Fall back to general reading templates
  return readingTemplates[topicKey] || null;
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

// Import order: first imports go at the top of the file

// Reading templates for all question types with rich tips, traps, and predictions
const readingTemplates = {
  'diagram-label-completion': {
    title: 'Diagram Label Completion',
    tips: [
      { statement: 'Analyze the diagram to understand the process or object it represents.', example: 'If it\'s a diagram of a water cycle, trace the arrows to see the flow from evaporation to condensation.' },
      { statement: 'Scan the text for keywords related to the diagram.', example: 'Look for words from the diagram like "turbine," "generator," or "reservoir."' },
      { statement: 'The answers are usually located in a specific section of the passage.', example: 'A paragraph describing how a machine works will likely contain the answers for labeling that machine.' },
      { statement: 'Pay attention to the word limit for each label.', example: 'If the limit is "NO MORE THAN TWO WORDS," then "a large wheel" is incorrect, but "large wheel" might be correct.' },
      { statement: 'Use the labels already provided to orient yourself in the text.', example: 'If "piston" is already labeled, find the word "piston" in the text and read around it for clues to other labels.' }
    ],
    traps: [
      { statement: 'Do not assume the answers will be in the same order as the labels on the diagram.', example: 'The text might describe the function of part C before it describes part A.' },
      { statement: 'Be careful with technical terms that may be paraphrased in the text.', example: 'The diagram might say "screen," but the text could describe it as a "digital display."' },
      { statement: 'Do not use your own knowledge to label the diagram; use only the information from the text.', example: 'Even if you know a part is called a "gasket," if the text calls it a "seal," you must use the word "seal."' }
    ],
    predictions: [
      { statement: 'Diagram label completion questions often appear in passages about science or technology.', example: 'Passages about biology, engineering, or environmental science are common sources.' },
      { statement: 'Expect to label parts of a machine, a biological process, or a natural phenomenon.', example: 'You might be asked to label the parts of a plant, the stages of a chemical reaction, or the components of a simple engine.' }
    ]
  },
  'author-attitude': {
    title: "Identifying Author's Attitude",
    tips: [
      { statement: 'Look for words that express opinions, emotions, or judgments.', example: 'Words like "fortunately," "unfortunately," "surprisingly," or "predictably" indicate the author\'s viewpoint.' },
      { statement: "Pay attention to the author's choice of adjectives and adverbs.", example: 'An author who describes a new policy as "a reckless and ill-conceived plan" has a negative attitude.' },
      { statement: 'Consider the overall tone of the passage.', example: 'Is the language generally positive ("a significant breakthrough"), negative ("a disastrous setback"), or neutral ("the study found that...")?' },
      { statement: 'Identify whether the author is presenting their own view or reporting the views of others.', example: 'Does the author say "I believe..." or "Some experts argue...?" The latter is reporting, not the author\'s own attitude.' }
    ],
    traps: [
      { statement: 'Do not confuse the author\'s attitude with the opinions of people quoted in the text.', example: 'The text might say, "Dr. Smith argues that the theory is flawed," but the author might later write, "However, Dr. Smith\'s argument is not supported by the data."' },
      { statement: 'Be aware that the author\'s attitude may be subtle and not explicitly stated.', example: 'The author might show a negative attitude by only presenting negative examples or by using slightly negative words.' },
      { statement: 'Do not assume that the author agrees with everything they mention.', example: 'An author might mention a popular belief only to then debunk it with evidence.' }
    ],
    predictions: [
      { statement: 'This skill is crucial for Yes/No/Not Given questions and some multiple-choice questions.', example: 'A "Yes/No/Not Given" question might ask if the author agrees with a certain statement.' },
      { statement: 'Expect to find questions about the author\'s purpose, tone, or bias in argumentative passages.', example: 'Passages that discuss social issues, scientific controversies, or historical interpretations are likely to have such questions.' }
    ]
  },
  'main-idea': {
    title: 'Identifying Main Idea',
    tips: [
      { statement: 'The main idea is the central point or message of a paragraph or the entire passage.', example: 'If a paragraph discusses the causes of deforestation, the main idea is not just "trees," but "the primary causes of deforestation."' },
      { statement: 'Look for a topic sentence, which is often the first or last sentence of a paragraph.', example: 'A paragraph starting with "The Industrial Revolution had several significant impacts on society" is likely about those impacts.' },
      { statement: 'Ask yourself, "What is the author\'s primary purpose in this paragraph?".', example: 'Is the author trying to explain a concept, argue a point, or provide a history?' },
      { statement: 'Distinguish between the main idea and supporting details or examples.', example: 'If the main idea is "cities are becoming overcrowded," a supporting detail might be "the population of London has grown by 1 million people in the last decade."' }
    ],
    traps: [
      { statement: 'Do not choose a detail or example as the main idea.', example: 'If a paragraph is about the benefits of exercise, "swimming" is a detail, not the main idea.' },
      { statement: 'Be careful with headings that are too broad or too narrow.', example: 'For a paragraph about the invention of the telephone, "Communication" is too broad, and "Alexander Graham Bell" is too narrow.' },
      { statement: 'Do not be misled by a single sentence; consider the paragraph as a whole.', example: 'A paragraph might start with a counter-argument before presenting the main idea.' }
    ],
    predictions: [
      { statement: 'This skill is essential for Matching Headings questions.', example: 'Each heading is the main idea of a paragraph.' },
      { statement: 'Understanding the main idea of each paragraph helps you to follow the author\'s argument.', example: 'It allows you to create a mental map of the passage, making it easier to find information.' }
    ]
  },
  'true-false-ng': {
    title: 'True/False/Not Given',
    tips: [
      { statement: 'TRUE: The statement agrees with the information in the passage (exact match or paraphrase).', example: 'If the text says "The population of the city is 5 million," the statement "Five million people live in the city" is TRUE.' },
      { statement: 'FALSE: The statement contradicts the information in the passage (opposite meaning).', example: 'If the text says "The car is blue," the statement "The car is red" is FALSE.' },
      { statement: 'NOT GIVEN: The information is not mentioned in the passage at all.', example: 'If the text says "The car is blue," the statement "The car is fast" is NOT GIVEN.' },
      { statement: 'Look for paraphrases and synonyms rather than exact word matches.', example: 'The question might say "yearly," while the text says "annual."' },
      { statement: 'Pay attention to qualifying words like "some," "all," "never," "always."', example: 'If the text says "Some students find the exam difficult," the statement "All students find the exam difficult" is FALSE.' },
      { statement: 'The statements usually follow the order of information in the passage.', example: 'The answer to question 2 will usually be found after the answer to question 1 in the text.' }
    ],
    traps: [
      { statement: 'Don\'t use your general knowledge - stick only to what\'s in the passage.', example: 'Even if you know that Paris is the capital of France, if the text doesn\'t say it, you can\'t use that information.' },
      { statement: 'Don\'t confuse "Not Given" with "False" - if it\'s not mentioned, it\'s Not Given.', example: 'If the text says "The man was wearing a hat," the statement "The man was wearing a blue hat" is NOT GIVEN, not FALSE.' },
      { statement: 'Watch out for extreme words like "all," "never," "only" - they often signal False answers.', example: 'A statement with "never" is false if the text says it happens "rarely."' },
      { statement: 'Be careful with numbers and statistics - small changes can make statements false.', example: 'If the text says "over 50%," the statement "exactly 50%" is FALSE.' },
      { statement: 'Don\'t assume something is true just because it sounds logical.', example: 'Even if it\'s logical that a company wants to make a profit, if the text doesn\'t state it, you can\'t assume it.' }
    ],
    predictions: [
      { statement: 'Expect 5-6 True/False/Not Given questions per passage in Academic Reading.', example: 'This is one of the most common question types.' },
      { statement: 'Questions usually cover factual information rather than opinions.', example: 'You will be asked about what the text says, not what the author thinks.' },
      { statement: 'Look for questions about research findings, historical facts, or processes.', example: 'These types of passages are common in the Academic Reading test.' },
      { statement: 'Some questions may test your understanding of cause and effect relationships.', example: 'A question might ask if A caused B.' },
      { statement: 'The most challenging questions often involve subtle paraphrasing.', example: 'The question might use a completely different sentence structure and vocabulary to express the same idea.' }
    ]
  },
  'yes-no-ng': {
    title: 'Yes/No/Not Given',
    tips: [
        { statement: 'YES: The statement agrees with the writer\'s views or claims in the passage.', example: 'If the author writes "I believe that space exploration is a waste of money," the statement "The author is against space exploration" is YES.' },
        { statement: 'NO: The statement contradicts the writer\'s views or claims in the passage.', example: 'If the author writes "I believe that space exploration is a vital investment," the statement "The author is against space exploration" is NO.' },
        { statement: 'NOT GIVEN: The writer\'s view on this is not mentioned in the passage.', example: 'If the author only describes the history of space exploration, the statement "The author is against space exploration" is NOT GIVEN.' },
        { statement: 'Focus on the writer\'s opinions, beliefs, and arguments, not just facts.', example: 'This question type is about the author\'s perspective.' },
        { statement: 'Look for opinion markers like "believe," "argue," "suggest," "claim."', example: 'These words indicate the author\'s opinion.' },
        { statement: 'Pay attention to the writer\'s tone and attitude toward different topics.', example: 'Is the author\'s language positive, negative, or neutral?' }
    ],
    traps: [
        { statement: 'Don\'t confuse facts with opinions - this question type is about the writer\'s views.', example: 'A statement might be factually true but not represent the author\'s opinion.' },
        { statement: 'Watch out for statements that seem factual but are actually the writer\'s opinion.', example: 'The author might present an opinion as a fact.' },
        { statement: 'Be careful with conditional language like "might," "could," "probably."', example: 'These words make a statement less certain and can affect whether it\'s a direct contradiction.' },
        { statement: 'Don\'t assume the writer agrees with something just because it\'s mentioned.', example: 'The author might mention another person\'s opinion without agreeing with it.' },
        { statement: 'Multiple viewpoints may be presented - focus on what the writer personally believes.', example: 'The passage might contain several different opinions, but the question is about the author\'s.' }
    ],
    predictions: [
        { statement: 'These questions appear mainly in passages with argumentative or opinion-based content.', example: 'Passages from newspapers, magazines, or academic journals often have this question type.' },
        { statement: 'Expect questions about the writer\'s stance on controversial topics.', example: 'Topics like climate change, education, or technology are common.' },
        { statement: 'Look for questions testing your understanding of the writer\'s recommendations.', example: 'The author might suggest a course of action, and a question might ask if they support it.' },
        { statement: 'Some questions may involve the writer\'s attitude toward research or studies.', example: 'The author might express skepticism or support for a particular study.' },
        { statement: 'The writer\'s implicit views may be tested, not just explicit statements.', example: 'You might have to infer the author\'s opinion from their choice of words.' }
    ]
  },
  'matching-headings': {
    title: 'Matching Headings',
    tips: [
        { statement: 'Focus on the main idea of each paragraph, not the supporting details.', example: 'A paragraph might contain many details, but you need to find the one sentence that summarizes the whole paragraph.' },
        { statement: 'Look for topic sentences, usually at the beginning or end of paragraphs.', example: 'The first sentence often introduces the main idea.' },
        { statement: 'Identify key themes and concepts that summarize the paragraph\'s content.', example: 'What is the one thing the author is trying to say in this paragraph?' },
        { statement: 'Read the headings first to understand what you\'re looking for.', example: 'This will help you to read the paragraphs with a purpose.' },
        { statement: 'Cross out used headings to avoid confusion.', example: 'This will help you to narrow down the options for the remaining paragraphs.' },
        { statement: 'Some headings may be distractors that don\'t match any paragraph.', example: 'There are usually more headings than paragraphs.' }
    ],
    traps: [
        { statement: 'Don\'t choose a heading just because it contains words from the paragraph.', example: 'The heading might use the same words but have a different meaning.' },
        { statement: 'Avoid headings that only cover part of the paragraph\'s content.', example: 'The heading must summarize the entire paragraph, not just one sentence.' },
        { statement: 'Watch out for headings that are too general or too specific.', example: 'The heading should be a good summary of the paragraph, not too broad or too narrow.' },
        { statement: 'Don\'t be misled by examples or minor details mentioned in passing.', example: 'Focus on the main idea, not the supporting details.' },
        { statement: 'Be careful with similar-sounding headings that have different meanings.', example: 'Read the headings carefully to understand the subtle differences between them.' }
    ],
    predictions: [
        { statement: 'Usually 5-7 paragraphs to match with 8-10 possible headings.', example: 'This means there will be extra headings that you don\'t need to use.' },
        { statement: 'One or two paragraphs may already have headings provided as examples.', example: 'This can help you to understand how to do the task.' },
        { statement: 'Extra headings are included as distractors.', example: 'These are headings that don\'t match any of the paragraphs.' },
        { statement: 'Questions test your ability to identify main ideas and themes.', example: 'This is a test of your overall understanding of the passage.' },
        { statement: 'Paragraphs often follow a logical progression of ideas.', example: 'This can help you to predict the content of the next paragraph.' }
    ]
  },
  'matching-information': {
    title: 'Matching Information',
    tips: [
        { statement: 'Scan for specific information, details, or examples mentioned in the questions.', example: 'If the question asks for a reason, scan the text for words like "because," "since," or "as a result of."' },
        { statement: 'Look for paraphrases and synonyms rather than exact word matches.', example: 'The question might say "a reason," while the text says "the cause."' },
        { statement: 'Pay attention to names, dates, numbers, and specific facts.', example: 'These are easy to scan for and can help you to locate the information quickly.' },
        { statement: 'The information may be scattered throughout different parts of a paragraph.', example: 'You might need to read the entire paragraph carefully to find the answer.' },
        { statement: 'Some paragraphs may contain multiple pieces of matching information.', example: 'You might be able to use the same paragraph for more than one question.' },
        { statement: 'Use paragraph letters (A, B, C, etc.) for your answers.', example: 'Make sure you write the correct letter on your answer sheet.' }
    ],
    traps: [
        { statement: 'Don\'t choose a paragraph just because it mentions similar topics.', example: 'The paragraph might be about the right topic, but it might not contain the specific information you\'re looking for.' },
        { statement: 'Make sure the specific information requested is actually in that paragraph.', example: 'Read the paragraph carefully to confirm that the information is there.' },
        { statement: 'Watch out for information that seems relevant but doesn\'t match exactly.', example: 'The information might be slightly different from what is asked in the question.' },
        { statement: 'Be careful with numbers, dates, or statistics that might be slightly different.', example: 'The question might ask for a specific number, and the text might give a range.' },
        { statement: 'Don\'t confuse general topics with specific details.', example: 'The question is asking for a specific piece of information, not a general idea.' }
    ],
    predictions: [
        { statement: 'Questions often ask about specific examples, research findings, or factual details.', example: 'These are the types of information that are easy to find in a passage.' },
        { statement: 'You may need to match descriptions of processes, events, or characteristics.', example: 'The question might ask you to find a description of how something works.' },
        { statement: 'Some questions test your ability to locate supporting evidence for claims.', example: 'The question might ask you to find the evidence that supports a particular statement.' },
        { statement: 'Information might be presented as case studies or specific instances.', example: 'The passage might describe a particular person or event to illustrate a point.' },
        { statement: 'Multiple correct answers may come from the same paragraph.', example: 'You might be able to use the same paragraph for more than one question.' }
    ]
  },
  'matching-features': {
    title: 'Matching Features',
    tips: [
        { statement: 'Identify the relationships between people, places, concepts, or characteristics.', example: 'The question might ask you to match a person to their opinion.' },
        { statement: 'Look for specific attributions: who said what, who did what, what belongs where.', example: 'Scan the text for names of people and the opinions they express.' },
        { statement: 'Pay attention to linking words and phrases that show relationships.', example: 'Words like "argues," "suggests," or "believes" can link a person to their opinion.' },
        { statement: 'Scan for names, titles, or identifying features mentioned in the questions.', example: 'This will help you to locate the relevant information quickly.' },
        { statement: 'The same person/place/concept may match with multiple features.', example: 'You might be able to use the same person for more than one question.' },
        { statement: 'Cross-reference information to ensure accurate matching.', example: 'Read the relevant sentences carefully to make sure you have made the correct match.' }
    ],
    traps: [
        { statement: 'Don\'t assume relationships that aren\'t explicitly stated in the text.', example: 'Just because two people are mentioned in the same paragraph doesn\'t mean they agree.' },
        { statement: 'Make sure you\'re matching the right type of feature (opinion vs. action vs. characteristic).', example: 'The question might ask for an opinion, but you might find an action.' },
        { statement: 'Watch out for similar names or concepts that might be confused.', example: 'Read the names carefully to make sure you are matching the correct person.' },
        { statement: 'Be careful when multiple people or places are mentioned in the same paragraph.', example: 'Read the sentences carefully to see who is being referred to.' },
        { statement: 'Don\'t match based on proximity alone - look for clear connections.', example: 'The names and features might be close to each other in the text but not related.' }
    ],
    predictions: [
        { statement: 'Common formats: match people to their opinions, discoveries, or characteristics.', example: 'This is a very common format for this question type.' },
        { statement: 'May involve matching places to their features or historical events.', example: 'You might be asked to match a city to its famous landmark.' },
        { statement: 'Could test relationships between concepts, theories, or research findings.', example: 'You might be asked to match a theory to the person who proposed it.' },
        { statement: 'Questions often involve expert opinions, research results, or historical facts.', example: 'These are the types of information that are often tested in this question type.' },
        { statement: 'Some features may not be used, or some may be used more than once.', example: 'There might be more features than people, or vice versa.' }
    ]
  },
  'sentence-completion': {
    title: 'Sentence Completion',
    tips: [
        { statement: 'Read the incomplete sentence carefully to understand what type of word is needed.', example: 'Do you need a noun, a verb, or an adjective?' },
        { statement: 'Check the word limit (usually 1-3 words from the passage).', example: 'If the limit is one word, you must write only one word.' },
        { statement: 'Look for grammatical clues: nouns, verbs, adjectives, numbers, etc.', example: 'The words around the gap can help you to determine the type of word you need.' },
        { statement: 'The words must be taken exactly from the passage - no paraphrasing.', example: 'You cannot change the form of the word.' },
        { statement: 'Follow the order of information in the passage.', example: 'The answer to question 2 will be after the answer to question 1.' },
        { statement: 'Read around the gap to understand the context fully.', example: 'The sentence should make sense with the word you have chosen.' }
    ],
    traps: [
        { statement: 'Don\'t exceed the word limit - you\'ll be marked wrong even if the meaning is correct.', example: 'If the limit is two words, "a beautiful house" is wrong.' },
        { statement: 'Don\'t change the form of words from the passage (no plurals, tenses, etc.).', example: 'If the text says "developing," you cannot write "development."' },
        { statement: 'Make sure your answer makes grammatical sense in the sentence.', example: 'The sentence must be grammatically correct after you have filled in the gap.' },
        { statement: 'Don\'t choose words that fit grammatically but change the meaning.', example: 'The word might fit in the sentence, but it might not be what the author meant.' },
        { statement: 'Watch out for misleading information that appears near the correct answer.', example: 'The correct answer might be in a different sentence.' }
    ],
    predictions: [
        { statement: 'Questions often test key vocabulary, technical terms, or specific details.', example: 'This is a test of your vocabulary and your ability to find specific information.' },
        { statement: 'May focus on numbers, dates, names, or measurements.', example: 'These are easy to scan for.' },
        { statement: 'Could involve completing definitions, processes, or cause-effect relationships.', example: 'You might be asked to complete a sentence that defines a key term.' },
        { statement: 'Some gaps may require understanding of pronoun references.', example: 'You might need to know what "it" or "they" refers to.' },
        { statement: 'The completed sentences should summarize important information from the passage.', example: 'This is a test of your ability to understand the main points of the passage.' }
    ]
  },
  'summary-completion': {
    title: 'Summary Completion',
    tips: [
        { statement: 'Read the summary carefully to understand the overall meaning and flow.', example: 'This will help you to predict the type of word you need for each gap.' },
        { statement: 'Identify what type of word is needed for each gap (noun, verb, adjective, etc.).', example: 'This will help you to scan for the correct word.' },
        { statement: 'Use the word list provided (if given) or take words from the passage.', example: 'Read the instructions carefully to see if you need to use the words from the box.' },
        { statement: 'Check word limits and follow them exactly.', example: 'If the limit is one word, you must write only one word.' },
        { statement: 'The summary follows the same order as information in the passage.', example: 'The answer to question 2 will be after the answer to question 1.' },
        { statement: 'Look for paraphrases and synonyms of the summary language in the text.', example: 'The summary will use different words to express the same ideas.' }
    ],
    traps: [
        { statement: 'Don\'t choose words that fit grammatically but don\'t match the passage meaning.', example: 'The word might fit in the sentence, but it might not be what the author meant.' },
        { statement: 'If using a word list, watch out for words that seem right but don\'t fit the context.', example: 'There might be words in the box that are designed to distract you.' },
        { statement: 'Don\'t exceed word limits or use words not from the given options.', example: 'You will be marked wrong if you do.' },
        { statement: 'Make sure the completed summary makes logical sense as a whole.', example: 'Read the summary again after you have filled in the gaps to check that it makes sense.' },
        { statement: 'Be careful with similar-looking words that have different meanings.', example: 'Read the words carefully to make sure you have chosen the correct one.' }
    ],
    predictions: [
        { statement: 'Summaries typically cover the main points or key processes from the passage.', example: 'This is a test of your ability to understand the main ideas of the passage.' },
        { statement: 'May focus on research findings, historical events, or scientific processes.', example: 'These are common topics for summaries.' },
        { statement: 'Often includes cause-effect relationships or sequential information.', example: 'The summary might describe how something happened or why it happened.' },
        { statement: 'Key vocabulary and technical terms are frequently tested.', example: 'This is a test of your vocabulary.' },
        { statement: 'The summary may combine information from different parts of the passage.', example: 'You might need to read several paragraphs to find the answers.' }
    ]
  },
  'note-completion': {
    title: 'Note/Table/Flow-chart Completion',
    tips: [
        { statement: 'Study the structure of the notes/table/flow-chart to understand the organization.', example: 'This will help you to predict the type of information you need.' },
        { statement: 'Identify what information is missing and what type of word is needed.', example: 'Do you need a name, a date, a number, or a reason?' },
        { statement: 'Follow any arrows or logical flow in flow-charts and diagrams.', example: 'This will help you to understand the order of the information.' },
        { statement: 'Use headings and categories to locate relevant information in the passage.', example: 'This will help you to find the information quickly.' },
        { statement: 'Pay attention to the relationship between different pieces of information.', example: 'The information in the table might be related in a certain way.' },
        { statement: 'Check word limits and take words exactly from the passage.', example: 'You cannot change the form of the word.' }
    ],
    traps: [
        { statement: 'Don\'t ignore the logical structure of the diagram or table.', example: 'The information is organized in a certain way for a reason.' },
        { statement: 'Make sure your answers fit the format and style of the existing information.', example: 'If the other answers are nouns, your answer should probably be a noun too.' },
        { statement: 'Don\'t confuse categories or mix up different types of information.', example: 'Make sure you are putting the right information in the right place.' },
        { statement: 'Watch out for information that appears in the wrong section of the passage.', example: 'The answer might be in a different paragraph from where you expect it.' },
        { statement: 'Be careful with abbreviations or technical terms that might be paraphrased.', example: 'The text might use a different word to refer to the same thing.' }
    ],
    predictions: [
        { statement: 'Often used for scientific processes, research methodologies, or classification systems.', example: 'These are topics that are well-suited to this question type.' },
        { statement: 'May involve historical timelines, comparison tables, or step-by-step procedures.', example: 'These are all ways of organizing information that can be tested with this question type.' },
        { statement: 'Tables might compare different aspects of multiple subjects or concepts.', example: 'You might be asked to compare two different types of animals.' },
        { statement: 'Flow-charts typically show processes, cycles, or cause-effect relationships.', example: 'You might be asked to complete a flow-chart that shows how a machine works.' },
        { statement: 'Notes may summarize key points from different sections of the passage.', example: 'This is a test of your ability to identify the main ideas.' }
    ]
  },
  'multiple-choice': {
    title: 'Multiple Choice Questions',
    tips: [
        { statement: 'Read the question and options carefully before looking at the passage.', example: 'This will help you to know what you are looking for.' },
        { statement: 'Eliminate obviously wrong answers to increase your chances.', example: 'This will help you to focus on the most likely answers.' },
        { statement: 'Look for paraphrases of the correct answer in the passage.', example: 'The correct answer will probably not use the exact same words as the passage.' },
        { statement: 'Pay attention to qualifying words like "mainly," "according to," "suggests."', example: 'These words can change the meaning of the question.' },
        { statement: 'The correct answer must be supported by evidence in the passage.', example: 'You must be able to find the answer in the text.' },
        { statement: 'For multiple-answer questions, check how many options to choose.', example: 'The instructions will tell you how many answers to choose.' }
    ],
    traps: [
        { statement: 'Don\'t choose answers that are true in general but not mentioned in the passage.', example: 'The answer must be based only on the information in the passage.' },
        { statement: 'Watch out for options that are partly correct but miss key details.', example: 'The correct answer must be completely correct.' },
        { statement: 'Be careful with extreme language in options (always, never, all, none).', example: 'These words are often used in incorrect options.' },
        { statement: 'Don\'t be misled by options that use exact words from the passage incorrectly.', example: 'The words might be from the passage, but the meaning might be different.' },
        { statement: 'Make sure you understand whether the question asks for one or multiple answers.', example: 'Read the instructions carefully.' }
    ],
    predictions: [
        { statement: 'Questions often test main ideas, specific details, or the writer\'s attitude.', example: 'These are the three main things that are tested in the reading section.' },
        { statement: 'May ask about purpose, opinion, implication, or reason.', example: 'These are all things that you might be asked about.' },
        { statement: 'Some questions test your understanding of vocabulary in context.', example: 'You might be asked to choose the best definition for a word.' },
        { statement: 'Could involve identifying the best title or summary for a section.', example: 'This is a test of your ability to understand the main idea.' },
        { statement: 'Multiple-answer questions might ask for characteristics, examples, or factors.', example: 'You might be asked to choose two reasons why something happened.' }
    ]
  },
  'short-answer': {
    title: 'Short Answer Questions',
    tips: [
        { statement: 'Check the word limit carefully (usually 1-3 words from the passage).', example: 'If the limit is two words, you cannot write three.' },
        { statement: 'Use exact words from the passage - no paraphrasing allowed.', example: 'You must copy the words exactly as they appear in the passage.' },
        { statement: 'Make sure your answer directly answers the question asked.', example: 'Don\'t write extra information that is not asked for.' },
        { statement: 'Pay attention to question words: who, what, when, where, why, how.', example: 'These words tell you what kind of information to look for.' },
        { statement: 'Follow the order of questions as they appear in the passage.', example: 'The answer to question 2 will be after the answer to question 1.' },
        { statement: 'Spelling must be correct - copy exactly from the passage.', example: 'You will lose marks for spelling mistakes.' }
    ],
    traps: [
        { statement: 'Don\'t exceed the word limit even if you want to give more complete information.', example: 'You will be marked wrong if you do.' },
        { statement: 'Don\'t change the form of words (plurals, verb tenses, etc.) from the passage.', example: 'If the text says "running," you cannot write "run."' },
        { statement: 'Make sure you answer the specific question, not related information.', example: 'Don\'t write extra information that is not asked for.' },
        { statement: 'Don\'t include extra words like articles (a, an, the) unless necessary.', example: 'If the answer is "red car," don\'t write "a red car."' },
        { statement: 'Be careful with questions that ask for specific numbers or dates.', example: 'Make sure you copy them correctly.' }
    ],
    predictions: [
        { statement: 'Questions typically ask for factual information: names, places, times, numbers.', example: 'These are the types of information that are easy to find in a passage.' },
        { statement: 'May test understanding of specific details or definitions.', example: 'You might be asked to find the definition of a key term.' },
        { statement: 'Often focus on who did what, when something happened, or where events occurred.', example: 'These are all things that you might be asked about.' },
        { statement: 'Could ask for reasons, methods, or characteristics.', example: 'You might be asked to explain why something happened.' },
        { statement: 'Answers are usually concrete nouns, proper nouns, or numerical information.', example: 'These are the types of words that are often used in short-answer questions.' }
    ]
  },
  'academic-vocabulary': {
    title: 'Academic Vocabulary Building',
    tips: [
        { statement: 'Learn the Academic Word List (AWL) - 570 word families common in academic texts.', example: 'This will help you to understand the vocabulary in the reading passages.' },
        { statement: 'Focus on collocations: how academic words combine with others.', example: 'For example, we say "a significant impact," not "a big impact."' },
        { statement: 'Study word families: different forms of the same root word.', example: 'For example, "analyze," "analysis," "analytical."' },
        { statement: 'Learn synonyms and paraphrases commonly used in IELTS reading passages.', example: 'This will help you to recognize paraphrasing in the questions.' },
        { statement: 'Practice recognizing formal and academic tone in writing.', example: 'This will help you to understand the author\'s attitude.' },
        { statement: 'Build topic-specific vocabulary clusters (science, economics, history, etc.).', example: 'This will help you to understand the vocabulary in passages on different topics.' }
    ],
    traps: [
        { statement: 'Don\'t assume familiar words have the same meaning in academic contexts.', example: 'The word "issue" can mean "a problem" or "to publish."' },
        { statement: 'Watch out for false friends and similar-looking words with different meanings.', example: '"Actual" in English means "real," but in some other languages it means "current."' },
        { statement: 'Be careful with words that change meaning based on context or field of study.', example: 'The word "stress" has a different meaning in psychology and engineering.' },
        { statement: 'Don\'t ignore prefixes and suffixes that can change word meanings significantly.', example: 'The prefix "un-" can make a word negative.' },
        { statement: 'Avoid focusing only on individual words - understand phrases and expressions.', example: 'You need to understand the meaning of the whole phrase, not just the individual words.' }
    ],
    predictions: [
        { statement: 'High-frequency academic vocabulary appears in most IELTS reading passages.', example: 'You will see words from the AWL in almost every passage.' },
        { statement: 'You\'ll encounter formal synonyms for common words (e.g., "commence" for "begin").', example: 'This is a feature of academic writing.' },
        { statement: 'Technical vocabulary specific to passage topics will be crucial for understanding.', example: 'If the passage is about biology, you will need to know some biology vocabulary.' },
        { statement: 'Many questions test your ability to recognize paraphrases of academic terms.', example: 'This is a key skill for the reading test.' },
        { statement: 'Understanding word families helps with multiple question types.', example: 'If you know the word "analyze," you can probably understand "analysis" and "analytical."' }
    ]
  },
  'skimming-scanning': {
    title: 'Skimming & Scanning Techniques',
    tips: [
        { statement: 'SKIMMING: Read quickly to get the main idea - focus on first/last sentences of paragraphs.', example: 'This will give you a general idea of what the passage is about.' },
        { statement: 'SCANNING: Search for specific information like names, dates, numbers, or keywords.', example: 'This will help you to find the answers to specific questions quickly.' },
        { statement: 'Use headings, subheadings, and topic sentences to guide your skimming.', example: 'These will help you to understand the structure of the passage.' },
        { statement: 'Don\'t read every word when scanning - let your eyes move quickly over the text.', example: 'You are looking for specific words, not trying to understand the whole passage.' },
        { statement: 'Practice switching between skimming for overview and scanning for details.', example: 'You will need to use both skills in the reading test.' },
        { statement: 'Use your finger or a pen to guide your eyes when scanning for specific information.', example: 'This can help you to focus and scan more quickly.' }
    ],
    traps: [
        { statement: 'Don\'t get distracted by interesting details when you should be skimming for main ideas.', example: 'You are trying to get a general idea of the passage, not learn everything about the topic.' },
        { statement: 'Avoid reading too slowly when you should be scanning for specific information.', example: 'You will run out of time if you read every word.' },
        { statement: 'Don\'t skip the question analysis - know what you\'re looking for before you start.', example: 'You need to know what you are looking for before you can find it.' },
        { statement: 'Be careful not to miss information because you\'re moving too quickly.', example: 'You need to find a balance between speed and accuracy.' },
        { statement: 'Don\'t confuse similar-looking words or numbers when scanning rapidly.', example: 'Read carefully to make sure you have found the correct information.' }
    ],
    predictions: [
        { statement: 'Skimming helps with matching headings and identifying main ideas.', example: 'These question types require you to have a general understanding of the passage.' },
        { statement: 'Scanning is essential for locating specific details in all question types.', example: 'You will need to scan for specific information in almost every question.' },
        { statement: 'You\'ll need both skills within the 60-minute time limit.', example: 'You need to be able to switch between skimming and scanning quickly and efficiently.' },
        { statement: 'Effective skimming helps you understand passage structure and organization.', example: 'This will help you to find information more easily.' },
        { statement: 'Scanning skills are crucial for True/False/Not Given and matching questions.', example: 'These question types require you to find specific information in the passage.' }
    ]
  },
  'paraphrase-tracking': {
    title: 'Paraphrase Recognition',
    tips: [
        { statement: 'Learn to recognize when different words express the same meaning.', example: 'For example, "yearly," "annually," and "every year" all mean the same thing.' },
        { statement: 'Practice identifying synonyms, word form changes, and sentence restructuring.', example: 'This will help you to recognize paraphrasing in the questions.' },
        { statement: 'Look for concept paraphrases, not just individual word substitutions.', example: 'The question might use a completely different sentence structure to express the same idea.' },
        { statement: 'Understand how complex ideas can be expressed in simpler terms or vice versa.', example: 'The passage might use complex language, while the question uses simpler language.' },
        { statement: 'Pay attention to how active/passive voice changes can paraphrase meaning.', example: 'For example, "The house was built by John" is a paraphrase of "John built the house."' },
        { statement: 'Notice how pronouns and references can replace specific nouns.', example: 'The passage might say "The man," and the question might say "he."' }
    ],
    traps: [
        { statement: 'Don\'t expect exact word matches between questions and passage text.', example: 'The questions will almost always use paraphrasing.' },
        { statement: 'Watch out for words that look similar but have different meanings.', example: 'For example, "affect" and "effect."' },
        { statement: 'Be careful with partial paraphrases that miss key parts of the meaning.', example: 'The paraphrase might be mostly correct, but one word might change the meaning.' },
        { statement: 'Don\'t assume paraphrases always make things simpler - they can be more complex.', example: 'The question might use more complex language than the passage.' },
        { statement: 'Avoid being misled by paraphrases that change the original meaning slightly.', example: 'The paraphrase might be very similar to the original, but with a small change that makes it incorrect.' }
    ],
    predictions: [
        { statement: 'Nearly all IELTS reading questions involve some form of paraphrasing.', example: 'This is a key skill for the reading test.' },
        { statement: 'You\'ll encounter paraphrases in question stems and answer options.', example: 'You need to be able to recognize paraphrasing in both the questions and the answers.' },
        { statement: 'Paraphrasing is especially important in True/False/Not Given questions.', example: 'You need to be able to tell if a statement is a paraphrase of the information in the passage.' },
        { statement: 'Multiple choice options often paraphrase information from the passage.', example: 'You need to be able to recognize which option is the best paraphrase.' },
        { statement: 'Understanding paraphrases is key to matching exercises and summary completion.', example: 'These question types require you to match paraphrased information.' }
    ]
  },
  'time-management': {
    title: 'Reading Time Management',
    tips: [
        { statement: 'Allocate 20 minutes per passage (total 60 minutes for 3 passages).', example: 'This will give you enough time to answer all the questions.' },
        { statement: 'Spend 2-3 minutes initially skimming each passage for general understanding.', example: 'This will help you to get a general idea of what the passage is about.' },
        { statement: 'Read questions before reading the passage in detail.', example: 'This will help you to know what you are looking for.' },
        { statement: 'Start with easier question types to build confidence and save time.', example: 'This will help you to get some marks on the board early on.' },
        { statement: 'Don\'t spend too long on any single difficult question - move on and return later.', example: 'It\'s better to answer all the easy questions first.' },
        { statement: 'Leave 2-3 minutes at the end to transfer answers and check your answer sheet.', example: 'You don\'t want to lose marks because you ran out of time to transfer your answers.' }
    ],
    traps: [
        { statement: 'Don\'t spend too much time reading the passage thoroughly before looking at questions.', example: 'You will run out of time if you do.' },
        { statement: 'Avoid getting stuck on one difficult question and losing time for easier ones.', example: 'It\'s better to make a guess and move on.' },
        { statement: 'Don\'t rush through questions just to finish - accuracy is more important than speed.', example: 'It\'s better to answer fewer questions correctly than to answer all the questions incorrectly.' },
        { statement: 'Be careful not to run out of time for the third passage - it\'s often the most challenging.', example: 'Make sure you leave enough time for the last passage.' },
        { statement: 'Don\'t forget to transfer your answers - there\'s no extra time given for this.', example: 'You must transfer your answers to the answer sheet within the 60 minutes.' }
    ],
    predictions: [
        { statement: 'Time pressure increases significantly from passage 1 to passage 3.', example: 'The passages get harder, and you have less time per question.' },
        { statement: 'You\'ll need to balance thoroughness with efficiency throughout the test.', example: 'You need to be able to read quickly but also accurately.' },
        { statement: 'Some questions require more time for careful analysis than others.', example: 'You need to be able to recognize which questions will take more time.' },
        { statement: 'Time management skills improve with regular practice under test conditions.', example: 'The more you practice, the better you will get at managing your time.' },
        { statement: 'The academic reading test requires sustained concentration for the full 60 minutes.', example: 'You need to be able to focus for the whole hour.' }
    ]
  },
  'trap-awareness': {
    title: 'Common Traps & Distractors',
    tips: [
        { statement: 'Be aware of words that appear in both questions and passage but with different meanings.', example: 'The word "issue" can mean "a problem" or "to publish."' },
        { statement: 'Watch for information that\'s close to correct but has subtle differences.', example: 'The question might ask for a specific number, and the text might give a range.' },
        { statement: 'Pay attention to qualifying words that can change meaning (some vs. all, might vs. will).', example: 'If the text says "some people," the answer "all people" is incorrect.' },
        { statement: 'Look out for answers that are true in general but not according to the passage.', example: 'The answer must be based only on the information in the passage.' },
        { statement: 'Be careful with numbers, dates, and statistics that might be slightly modified.', example: 'The question might ask for a specific date, and the text might give a different date.' },
        { statement: 'Notice when examples are confused with main points or generalizations.', example: 'The question might ask for the main idea, but the answer option might be an example.' }
    ],
    traps: [
        { statement: 'Don\'t choose answers just because they use words from the passage.', example: 'The words might be from the passage, but the meaning might be different.' },
        { statement: 'Avoid options that are factually correct but not mentioned in the text.', example: 'The answer must be based only on the information in the passage.' },
        { statement: 'Be careful with extreme statements that use words like "always," "never," "all," "none."', example: 'These words are often used in incorrect options.' },
        { statement: 'Don\'t confuse the order of information or mix up cause and effect.', example: 'The text might describe the effect before the cause.' },
        { statement: 'Watch out for distractors that combine information from different parts of the passage.', example: 'The correct answer will usually come from one part of the passage.' }
    ],
    predictions: [
        { statement: 'Distractors often use vocabulary from the passage but in incorrect contexts.', example: 'The words might be from the passage, but the meaning might be different.' },
        { statement: 'True/False/Not Given questions frequently include plausible but incorrect options.', example: 'You need to be careful to distinguish between "False" and "Not Given."' },
        { statement: 'Multiple choice questions use attractive distractors that seem logical.', example: 'You need to read the options carefully to make sure you are not being tricked.' },
        { statement: 'Matching exercises include extra options designed to confuse test-takers.', example: 'There are usually more options than questions.' },
        { statement: 'Understanding common trap patterns helps you avoid predictable mistakes.', example: 'The more you practice, the better you will get at recognizing traps.' }
    ]
  },
  'inference-skills': {
    title: 'Inference & Implication',
    tips: [
        { statement: 'Read between the lines to understand what the writer implies but doesn\'t state directly.', example: 'If the author describes a room as "dark and dusty," you can infer that it has not been used for a long time.' },
        { statement: 'Use context clues to infer meaning from surrounding information.', example: 'If you don\'t know the meaning of a word, you can try to guess it from the context.' },
        { statement: 'Pay attention to the writer\'s tone and attitude toward different topics.', example: 'Is the author\'s language positive, negative, or neutral?' },
        { statement: 'Look for logical connections and relationships between ideas.', example: 'If the author presents a problem, they might then suggest a solution.' },
        { statement: 'Consider what can reasonably be concluded from the given information.', example: 'Don\'t make wild guesses that are not supported by the text.' },
        { statement: 'Distinguish between what is explicitly stated and what is merely suggested.', example: 'The answer to an inference question will not be directly stated in the text.' }
    ],
    traps: [
        { statement: 'Don\'t make inferences that go too far beyond what the passage supports.', example: 'Your inference must be based on the information in the passage.' },
        { statement: 'Avoid using your own knowledge to make inferences not supported by the text.', example: 'The answer must be based only on the information in the passage.' },
        { statement: 'Be careful not to confuse strong implications with weak suggestions.', example: 'The author might suggest something, but not state it directly.' },
        { statement: 'Don\'t assume the writer agrees with all viewpoints presented in the passage.', example: 'The author might present another person\'s opinion without agreeing with it.' },
        { statement: 'Watch out for inferences that contradict explicit information in the text.', example: 'Your inference cannot contradict what is stated in the passage.' }
    ],
    predictions: [
        { statement: 'Inference questions often ask about the writer\'s attitude, opinion, or purpose.', example: 'These are all things that you might be asked to infer.' },
        { statement: 'You may need to infer relationships between different parts of the passage.', example: 'You might be asked to infer the relationship between two people or two events.' },
        { statement: 'Some questions test your ability to understand implied criticism or support.', example: 'The author might not directly criticize something, but you can infer their criticism from their choice of words.' },
        { statement: 'Inference skills are important for Yes/No/Not Given questions.', example: 'You might need to infer the author\'s opinion to answer a Yes/No/Not Given question.' },
        { statement: 'You might need to infer the meaning of vocabulary from context.', example: 'If you don\'t know the meaning of a word, you can try to guess it from the context.' }
    ]
  },
  'text-structure': {
    title: 'Understanding Text Structure',
    tips: [
        { statement: 'Identify common text patterns: problem-solution, cause-effect, comparison-contrast.', example: 'This will help you to understand how the passage is organized.' },
        { statement: 'Pay attention to discourse markers that signal relationships between ideas.', example: 'Words like "however," "therefore," and "in addition" can help you to understand the structure of the passage.' },
        { statement: 'Notice how paragraphs are organized and how they connect to each other.', example: 'This will help you to follow the author\'s argument.' },
        { statement: 'Understand the function of different parts: introduction, body, conclusion.', example: 'This will help you to understand the purpose of each part of the passage.' },
        { statement: 'Look for parallel structures and repeated patterns in organization.', example: 'This can help you to understand the main points of the passage.' },
        { statement: 'Use text structure to predict where specific information might be located.', example: 'If you know the structure of the passage, you can predict where to find the information you are looking for.' }
    ],
    traps: [
        { statement: 'Don\'t assume all texts follow the same organizational pattern.', example: 'There are many different ways to organize a text.' },
        { statement: 'Be careful not to misinterpret the relationship between different sections.', example: 'Make sure you understand how the different parts of the passage are related to each other.' },
        { statement: 'Avoid getting confused by complex texts with multiple organizational patterns.', example: 'Some passages might have more than one type of organization.' },
        { statement: 'Don\'t ignore important structural signals like headings and subheadings.', example: 'These can help you to understand the structure of the passage.' },
        { statement: 'Watch out for texts that present multiple viewpoints or arguments.', example: 'You need to be able to distinguish between the different viewpoints.' }
    ],
    predictions: [
        { statement: 'Understanding structure helps with matching headings and summary completion.', example: 'These question types require you to have a good understanding of the structure of the passage.' },
        { statement: 'Text organization affects how you approach different question types.', example: 'You need to use a different approach for each question type.' },
        { statement: 'Academic texts often follow predictable structural patterns.', example: 'This can help you to predict the structure of the passage.' },
        { statement: 'Recognizing structure helps you locate information more efficiently.', example: 'If you know the structure of the passage, you can find the information you are looking for more quickly.' },
        { statement: 'Structure awareness improves your overall comprehension and reading speed.', example: 'The better you understand the structure of the passage, the faster you will be able to read it.' }
    ]
  },
  'mock-tests': {
    title: 'Mock Reading Tests',
    tips: [
        { statement: 'Practice under realistic test conditions with strict time limits.', example: 'This will help you to get used to the pressure of the real test.' },
        { statement: 'Use official IELTS materials and reputable test preparation resources.', example: 'This will ensure that you are practicing with realistic materials.' },
        { statement: 'Analyze your mistakes to identify patterns and areas for improvement.', example: 'This will help you to focus your studies on the areas where you need the most help.' },
        { statement: 'Practice all question types regularly, not just your strongest areas.', example: 'You need to be prepared for all the different question types.' },
        { statement: 'Simulate test day conditions: no breaks, proper answer sheet, quiet environment.', example: 'This will help you to get used to the conditions of the real test.' },
        { statement: 'Track your progress over time and adjust your study strategy accordingly.', example: 'This will help you to see how you are improving and what you need to work on.' }
    ],
    traps: [
        { statement: 'Don\'t practice with materials that don\'t match real IELTS difficulty and style.', example: 'This will give you a false sense of security.' },
        { statement: 'Avoid focusing only on your weak areas and neglecting to maintain strong skills.', example: 'You need to practice all the skills to do well on the test.' },
        { statement: 'Don\'t skip the analysis phase - understanding mistakes is crucial for improvement.', example: 'You need to know why you made a mistake to avoid making it again.' },
        { statement: 'Be careful not to develop bad habits during practice that you carry into the real test.', example: 'For example, don\'t get into the habit of spending too much time on one question.' },
        { statement: 'Don\'t become overly dependent on practice test strategies that won\'t work in real conditions.', example: 'You need to be flexible and able to adapt to different situations.' }
    ],
    predictions: [
        { statement: 'Regular mock tests help you develop time management and test stamina.', example: 'The more you practice, the better you will get at managing your time and staying focused for the whole test.' },
        { statement: 'You\'ll encounter question combinations and difficulty levels similar to the real test.', example: 'This will help you to be prepared for anything on test day.' },
        { statement: 'Mock tests reveal your current level and help set realistic score goals.', example: 'This will help you to know what you need to do to get the score you want.' },
        { statement: 'Practice tests help you develop effective strategies for different question types.', example: 'You will learn which strategies work best for you.' },
        { statement: 'Consistent practice leads to improved confidence and performance on test day.', example: 'The more you practice, the more confident you will be on test day.' }
    ]
  }
};

// No need to redefine these functions as they are already defined above