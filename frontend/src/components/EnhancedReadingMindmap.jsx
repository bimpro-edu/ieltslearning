import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Base style for nodes
const nodeBaseStyle = {
  border: '1px solid #90caf9',
  borderRadius: 20,
  padding: '8px 16px',
  fontSize: 14,
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  minWidth: 160,
  maxWidth: 220,
  textAlign: 'center',
  cursor: 'pointer',
};

// Color map for node backgrounds
const nodeBgColors = {
  readingCenter: '#e3f2fd',
  foundations: '#f8bbd0',
  taskMastery: '#c5cae9',
  // Main branch colors
  readingSkills: '#c8e6c9', // green
  questionTypes: '#bbdefb', // light blue
  vocabulary: '#fff9c4', // light yellow
  purpose: '#fff9c4',
  format: '#c8e6c9',
  academicReading: '#c8e6c9',
  generalTraining: '#c8e6c9',
  challenges: '#ffe0b2',
  vocabularyDensity: '#ffe0b2',
  paraphrasing: '#ede7f6',
  timeManagement: '#fff8e1',
  trapAnswers: '#ffebee',
  // Task Mastery Parent Nodes
  identificationTasks: '#e1bee7',
  matchingTasks: '#d1c4e9',
  completionTasks: '#b3e5fc',
  choiceTasks: '#c8e6c9',
  // Some leaf-specific overrides (optional)
  skimming: '#e8f5e9',
  scanning: '#e8f5e9',
  closeReading: '#e8f5e9',
  tfng: '#e3f2fd',
  ynng: '#e3f2fd',
  matchingHeadings: '#e3f2fd',
};

// Icons for different node types
const BookIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="20" height="40" rx="4" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <rect x="36" y="12" width="20" height="40" rx="4" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
    <path d="M28 16H12M28 24H12M28 32H12M28 40H12" stroke="#1976d2" strokeWidth="2"/>
    <path d="M52 16H40M52 24H40M52 32H40M52 40H40" stroke="#1976d2" strokeWidth="2"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#1976d2" strokeWidth="3"/>
    <circle cx="32" cy="32" r="20" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
    <circle cx="32" cy="32" r="12" fill="#90caf9" stroke="#1976d2" strokeWidth="2"/>
    <circle cx="32" cy="32" r="4" fill="#1976d2"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="28" rx="18" ry="20" fill="#fffde7" stroke="#fbc02d" strokeWidth="2"/>
    <rect x="26" y="48" width="12" height="10" rx="3" fill="#fbc02d"/>
    <rect x="28" y="58" width="8" height="4" rx="2" fill="#ffe082"/>
    <path d="M32 8v6M16 16l4 4M48 16l-4 4" stroke="#fbc02d" strokeWidth="2"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff3cd" stroke="#ff9800" strokeWidth="3"/>
    <rect x="29" y="18" width="6" height="24" rx="3" fill="#ff9800"/>
    <rect x="29" y="46" width="6" height="6" rx="3" fill="#ff9800"/>
  </svg>
);

const nodeDetails = {
  // Foundations
  skimming: {
    title: "Skimming for Gist",
    details: "Purpose: To quickly get the main idea, overall theme, and structure of a passage without reading every word.\n\nHow to Skim:\n1. Read the title and any headings or subheadings.\n2. Read the first paragraph to understand the introduction.\n3. Read the first sentence of each subsequent paragraph (the topic sentence).\n4. Read the entire last paragraph to understand the conclusion.\n5. Let your eyes sweep over the rest of the text, looking for repeated keywords.\n\nWhen to Use: At the very beginning of a new passage to get oriented, and for questions asking about the main idea or a suitable title.",
    icon: BookIcon,
    bg: '#e8f5e9',
  },
  scanning: {
    title: "Scanning for Details",
    details: "Purpose: To find specific pieces of information like names, dates, numbers, or keywords quickly.\n\nHow to Scan:\n1. Know exactly what you are looking for. Identify the keyword in the question.\n2. Move your eyes rapidly down the page in a pattern (e.g., S-shape or zig-zag).\n3. Do not read sentences. You are only looking for the specific keyword(s).\n4. When you find a keyword, stop and read the surrounding sentences carefully to see if it's the information you need.\n\nWhen to Use: For fact-based questions, such as sentence completion, short-answer questions, and finding specific details.",
    icon: BookIcon,
    bg: '#e8f5e9',
  },
  closeReading: {
    title: "Close Reading for Meaning",
    details: "Purpose: To understand the precise meaning of a sentence or section, including the author's tone, opinion, and any subtle implications.\n\nHow to Read Closely:\n1. Read the sentence or phrase carefully, word by word.\n2. Pay attention to grammatical structure and connecting words (e.g., 'however', 'although', 'therefore').\n3. Notice qualifying words like 'some', 'most', 'all', 'never', as they are crucial for meaning.\n4. Identify synonyms and paraphrasing used by the author.\n\nWhen to Use: Essential for TFNG/YNNG questions, inference questions, and any question where you have located the information but need to understand it deeply.",
    icon: BookIcon,
    bg: '#e8f5e9',
  },

  // Task Mastery - Identification
  tfng: {
    title: "True/False/Not Given",
    details: "Purpose: To test your ability to identify and understand factual information in the text.\n\nStrategy:\n1. Read the statement and identify keywords.\n2. Scan the passage for the keywords or their synonyms.\n3. Once located, read the relevant sentences carefully.\n- TRUE: The passage confirms the statement.\n- FALSE: The passage contradicts the statement.\n- NOT GIVEN: You cannot find the information in the passage.\n\nCommon Pitfall: Confusing 'False' and 'Not Given'. It's 'False' only if the passage explicitly says the opposite. If it says nothing, it's 'Not Given'.\n\nPro Tip: Convert the statement into a question. If you can answer it with the text, it's True or False. If you can't, it's Not Given.",
    icon: BookIcon,
    bg: '#e1bee7',
  },
  ynng: {
    title: "Yes/No/Not Given",
    details: "Purpose: To test your ability to identify and understand the author's opinions, views, or claims.\n\nStrategy:\n1. Read the statement and identify the core opinion or claim.\n2. Scan the passage for the section where the author discusses this topic.\n3. Read carefully to understand the author's perspective.\n- YES: The author's view aligns with the statement.\n- NO: The author's view contradicts the statement.\n- NOT GIVEN: The author does not express this view.\n\nCommon Pitfall: Mistaking the views of other people mentioned in the text for the author's own view.\n\nPro Tip: Look for words that indicate opinion, such as 'believe', 'claim', 'argue', or adjectives that reveal the author's feelings.",
    icon: BookIcon,
    bg: '#e1bee7',
  },

  // Task Mastery - Matching
  matchingHeadings: {
    title: "Matching Headings",
    details: "Purpose: To test your ability to identify the main idea or topic of a paragraph.\n\nStrategy:\n1. Read the list of headings first to know your options.\n2. Read the first paragraph of the text, then go back to the list and see if a heading matches. If not, move on.\n3. For each paragraph, read it and summarize the main idea in your own words. Then, find the heading that best matches your summary.\n4. There are often more headings than paragraphs, so don't expect to use them all.\n\nCommon Pitfall: Matching based on a single keyword instead of the overall meaning of the paragraph.\n\nPro Tip: Do the paragraphs that have a clear topic sentence first. This can help you eliminate options and make subsequent matches easier.",
    icon: BookIcon,
    bg: '#d1c4e9',
  },
  matchingInfo: {
    title: "Matching Information",
    details: "Purpose: To test your ability to scan for specific details that are not necessarily the main idea of a paragraph.\n\nStrategy:\n1. Read the statements of information first and underline keywords.\n2. Choose the most unique-looking keyword from the first statement (e.g., a name, a date, a technical term).\n3. Scan the entire passage for that keyword. When you find it, read the surrounding sentences to see if it matches the full statement.\n4. The information is NOT in order in the text. You have to hunt for it.\n\nCommon Pitfall: Reading each paragraph from start to finish. This is a scanning task; you should be searching for specific information.\n\nPro Tip: Some paragraphs may be used more than once, and some may not be used at all. Read the instructions carefully.",
    icon: BookIcon,
    bg: '#d1c4e9',
  },
  matchingFeatures: {
    title: "Matching Features",
    details: "Purpose: To test your ability to link a list of features (e.g., theories, findings, characteristics) to a set of items (e.g., researchers, countries, time periods).\n\nStrategy:\n1. Identify the list of features and the set of items.\n2. Scan the passage for the items (e.g., names of researchers), as these are often easier to find than the features.\n3. When you find an item, read everything that is said about it in the passage.\n4. Match the information you read to one of the features in the list.\n\nCommon Pitfall: Assuming that the features for one item will be located in a single place in the text. Information can be spread across the passage.\n\nPro Tip: Do one item at a time. For example, scan the entire text for all mentions of 'Researcher A' and match all their features before moving to 'Researcher B'.",
    icon: TargetIcon,
    bg: '#d1c4e9',
  },

  // Task Mastery - Completion
  sentenceCompletion: {
    title: "Sentence Completion",
    details: "Purpose: To test your ability to find specific information and use it to complete a sentence grammatically and logically.\n\nStrategy:\n1. Read the incomplete sentence and predict the type of word needed (e.g., a noun, a verb, a number).\n2. Identify keywords in the sentence and scan the passage to locate the relevant section.\n3. Read the passage text carefully to find the exact word or words needed.\n4. Ensure your answer does not exceed the word limit (e.g., 'NO MORE THAN TWO WORDS').\n\nCommon Pitfall: The word in the passage needs to be changed to fit the grammar of the sentence. The answer must be taken EXACTLY from the text without changes.\n\nPro Tip: The answers usually appear in the same order in the text as the questions.",
    icon: BookIcon,
    bg: '#b3e5fc',
  },
  summaryCompletion: {
    title: "Summary/Note/Table Completion",
    details: "Purpose: To test your ability to get an overview of a section of the text and extract the key information.\n\nStrategy:\n1. Quickly read the summary to understand its general meaning and structure.\n2. Identify the type of information needed for the first gap (e.g., a date, a reason, an object).\n3. Scan the passage to find the section that the summary relates to.\n4. Read that section carefully to find the words to fill the gaps. Pay close attention to the word limit.\n\nCommon Pitfall: Getting lost in the passage. The summary provides a 'map' of the information, so use it to guide you.\n\nPro Tip: Sometimes the summary is based on a small part of the text (one or two paragraphs), and sometimes it covers the whole passage. Use keywords to locate the right section quickly.",
    icon: BookIcon,
    bg: '#b3e5fc',
  },

  // Task Mastery - Choice & Answer
  mcq: {
    title: "Multiple Choice Questions",
    details: "Purpose: To test your ability to understand specific points or the main idea and choose the correct answer from a list of options.\n\nStrategy:\n1. Read the question stem (the part before the options) and identify keywords.\n2. Scan the passage to locate the relevant information.\n3. Read that part of the passage carefully and form your own answer in your head before looking at the options.\n4. Compare your answer to the options (A, B, C, D) and choose the one that matches best.\n\nCommon Pitfall: Choosing an option because it contains keywords from the passage. These are often 'distractors'. The correct answer will paraphrase the information, not just repeat it.\n\nPro Tip: Always try to eliminate the obviously wrong answers first. This increases your chances of guessing correctly if you are unsure.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  shortAnswer: {
    title: "Short Answer Questions",
    details: "Purpose: To test your ability to find specific factual information and write it as a short answer.\n\nStrategy:\n1. Read the question and identify the 'question word' (e.g., Who, What, Where, When, Why) to know what kind of information to look for.\n2. Identify keywords and scan the passage to find them.\n3. Read the relevant sentence carefully to find the answer.\n4. Write your answer, making sure you obey the word limit (e.g., 'NO MORE THAN THREE WORDS AND/OR A NUMBER').\n\nCommon Pitfall: Writing too many words or copying information that is not essential to the answer.\n\nPro Tip: The answers almost always appear in order in the text. Use this to your advantage to locate the answers more quickly.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },

  // Task Mastery Parent Nodes
  identificationTasks: {
    title: "Identification Tasks",
    details: "Purpose: These tasks assess your ability to find specific information in a text and accurately determine if a statement agrees with the text, contradicts it, or is not mentioned at all.\n\nKey Difference:\n- True/False/Not Given: Used for factual information.\n- Yes/No/Not Given: Used for the author's opinions, views, or claims.\n\nCore Challenge: The main difficulty lies in distinguishing between 'False/No' (the text says the opposite) and 'Not Given' (the text doesn't provide this information).",
    icon: TargetIcon,
    bg: '#e1bee7',
  },
  matchingTasks: {
    title: "Matching Tasks",
    details: "Purpose: These tasks test your ability to connect different pieces of information. You might need to match headings to paragraphs, specific details to paragraphs, or features (e.g., theories, names) to items.\n\nTypes:\n- Matching Headings: Match a heading from a list to the correct paragraph.\n- Matching Information: Match a specific piece of information to a paragraph.\n- Matching Features: Match a list of features to items (e.g., researchers, theories).",
    icon: TargetIcon,
    bg: '#d1c4e9',
  },
  completionTasks: {
    title: "Completion Tasks",
    details: "Purpose: These tasks require you to fill in gaps in sentences, summaries, notes, or tables using words from the text.\n\nKey Skill: Attention to detail, grammar, and word limits. You must often use the exact words from the passage.\n\nCommon Feature: The answers are usually in order in the text, which helps you follow along.",
    icon: TargetIcon,
    bg: '#b3e5fc',
  },
  choiceTasks: {
    title: "Choice & Answer Tasks",
    details: "Purpose: These tasks present you with options or require you to find a specific piece of information to write as an answer. This includes Multiple Choice and Short Answer questions.\n\nKey Skill: Eliminating incorrect options (distractors) and locating specific information quickly.\n\nCommon Feature: The questions are usually in order in the text.",
    icon: TargetIcon,
    bg: '#c8e6c9',
  },
};

const mindmapData = {
  foundations: {
    baseNodes: [
      { id: "readingCenter", data: { label: "Reading Foundations" }, position: { x: 0, y: 0 }, draggable: true },
      { id: "foundations", type: "collapsible", data: { label: "Foundations" }, position: { x: 0, y: 150 }, draggable: true },
      { id: "readingSkills", type: "collapsible", data: { label: "Reading Skills" }, position: { x: -300, y: 300 }, draggable: true },
      { id: "questionTypes", type: "collapsible", data: { label: "Question Types" }, position: { x: 0, y: 300 }, draggable: true },
      { id: "vocabulary", type: "collapsible", data: { label: "Vocabulary" }, position: { x: 300, y: 300 }, draggable: true },
      { id: "skimming", data: { label: "Skimming" }, position: { x: -400, y: 450 }, draggable: true },
      { id: "scanning", data: { label: "Scanning" }, position: { x: -300, y: 450 }, draggable: true },
      { id: "closeReading", data: { label: "Close Reading" }, position: { x: -200, y: 450 }, draggable: true },
      { id: "tfng", data: { label: "TFNG" }, position: { x: -100, y: 450 }, draggable: true },
      { id: "ynng", data: { label: "YNNG" }, position: { x: 0, y: 450 }, draggable: true },
      { id: "matchingHeadings", data: { label: "Matching Headings" }, position: { x: 100, y: 450 }, draggable: true },
      { id: "matchingInfo", data: { label: "Matching Info" }, position: { x: 200, y: 450 }, draggable: true },
      { id: "sentenceCompletion", data: { label: "Sentence Completion" }, position: { x: 300, y: 450 }, draggable: true },
      { id: "summaryCompletion", data: { label: "Summary Completion" }, position: { x: 400, y: 450 }, draggable: true },
      { id: "mcq", data: { label: "MCQ" }, position: { x: 500, y: 450 }, draggable: true },
      { id: "shortAnswer", data: { label: "Short Answer" }, position: { x: 600, y: 450 }, draggable: true },
      { id: "awl", data: { label: "AWL" }, position: { x: 200, y: 600 }, draggable: true },
      { id: "synonyms", data: { label: "Synonyms" }, position: { x: 300, y: 600 }, draggable: true },
      { id: "topicClusters", data: { label: "Topic Clusters" }, position: { x: 400, y: 600 }, draggable: true },
    ],
    initialEdges: [
      { id: 'e-center-foundations', source: 'readingCenter', target: 'foundations' },
      { id: 'e-foundations-readingSkills', source: 'foundations', target: 'readingSkills' },
      { id: 'e-foundations-questionTypes', source: 'foundations', target: 'questionTypes' },
      { id: 'e-foundations-vocabulary', source: 'foundations', target: 'vocabulary' },
      { id: 'e-readingSkills-skimming', source: 'readingSkills', target: 'skimming' },
      { id: 'e-readingSkills-scanning', source: 'readingSkills', target: 'scanning' },
      { id: 'e-readingSkills-closeReading', source: 'readingSkills', target: 'closeReading' },
      { id: 'e-questionTypes-tfng', source: 'questionTypes', target: 'tfng' },
      { id: 'e-questionTypes-ynng', source: 'questionTypes', target: 'ynng' },
      { id: 'e-questionTypes-matchingHeadings', source: 'questionTypes', target: 'matchingHeadings' },
      { id: 'e-questionTypes-matchingInfo', source: 'questionTypes', target: 'matchingInfo' },
      { id: 'e-questionTypes-sentenceCompletion', source: 'questionTypes', target: 'sentenceCompletion' },
      { id: 'e-questionTypes-summaryCompletion', source: 'questionTypes', target: 'summaryCompletion' },
      { id: 'e-questionTypes-mcq', source: 'questionTypes', target: 'mcq' },
      { id: 'e-questionTypes-shortAnswer', source: 'questionTypes', target: 'shortAnswer' },
      { id: 'e-vocabulary-awl', source: 'vocabulary', target: 'awl' },
      { id: 'e-vocabulary-synonyms', source: 'vocabulary', target: 'synonyms' },
      { id: 'e-vocabulary-topicClusters', source: 'vocabulary', target: 'topicClusters' },
    ],
    childMap: {
      readingCenter: ["foundations"],
      foundations: ["readingSkills", "questionTypes", "vocabulary"],
      readingSkills: ["skimming", "scanning", "closeReading"],
      questionTypes: ["tfng", "ynng", "matchingHeadings", "matchingInfo", "sentenceCompletion", "summaryCompletion", "mcq", "shortAnswer"],
      vocabulary: ["awl", "synonyms", "topicClusters"],
    },
    collapsibleIds: ["foundations", "readingSkills", "questionTypes", "vocabulary"],
  },
  taskMastery: {
    baseNodes: [
      { id: "taskMasteryCenter", data: { label: "Task Mastery" }, position: { x: 0, y: 0 }, draggable: true },
      { id: "identificationTasks", type: "collapsible", data: { label: "Identification Tasks" }, position: { x: -200, y: 150 }, draggable: true },
      { id: "matchingTasks", type: "collapsible", data: { label: "Matching Tasks" }, position: { x: 200, y: 150 }, draggable: true },
      { id: "completionTasks", type: "collapsible", data: { label: "Completion Tasks" }, position: { x: -200, y: 450 }, draggable: true },
      { id: "choiceTasks", type: "collapsible", data: { label: "Choice & Answer Tasks" }, position: { x: 200, y: 450 }, draggable: true },
      { id: "tfng", data: { label: "True/False/Not Given" }, position: { x: -300, y: 300 }, draggable: true },
      { id: "ynng", data: { label: "Yes/No/Not Given" }, position: { x: -100, y: 300 }, draggable: true },
      { id: "matchingHeadings", data: { label: "Matching Headings" }, position: { x: 100, y: 300 }, draggable: true },
      { id: "matchingInfo", data: { label: "Matching Information" }, position: { x: 300, y: 300 }, draggable: true },
      { id: "matchingFeatures", data: { label: "Matching Features" }, position: { x: 500, y: 300 }, draggable: true },
      { id: "sentenceCompletion", data: { label: "Sentence Completion" }, position: { x: -300, y: 600 }, draggable: true },
      { id: "summaryCompletion", data: { label: "Summary/Note/Table Completion" }, position: { x: -100, y: 600 }, draggable: true },
      { id: "mcq", data: { label: "Multiple Choice Questions" }, position: { x: 100, y: 600 }, draggable: true },
      { id: "shortAnswer", data: { label: "Short Answer Questions" }, position: { x: 300, y: 600 }, draggable: true },
    ],
    initialEdges: [
      { id: 'e-center-identification', source: 'taskMasteryCenter', target: 'identificationTasks' },
      { id: 'e-center-matching', source: 'taskMasteryCenter', target: 'matchingTasks' },
      { id: 'e-center-completion', source: 'taskMasteryCenter', target: 'completionTasks' },
      { id: 'e-center-choice', source: 'taskMasteryCenter', target: 'choiceTasks' },
      { id: 'e-identification-tfng', source: 'identificationTasks', target: 'tfng' },
      { id: 'e-identification-ynng', source: 'identificationTasks', target: 'ynng' },
      { id: 'e-matching-headings', source: 'matchingTasks', target: 'matchingHeadings' },
      { id: 'e-matching-info', source: 'matchingTasks', target: 'matchingInfo' },
      { id: 'e-matching-features', source: 'matchingTasks', target: 'matchingFeatures' },
      { id: 'e-completion-sentence', source: 'completionTasks', target: 'sentenceCompletion' },
      { id: 'e-completion-summary', source: 'completionTasks', target: 'summaryCompletion' },
      { id: 'e-choice-mcq', source: 'choiceTasks', target: 'mcq' },
      { id: 'e-choice-shortAnswer', source: 'choiceTasks', target: 'shortAnswer' },
    ],
    childMap: {
      taskMasteryCenter: ["identificationTasks", "matchingTasks", "completionTasks", "choiceTasks"],
      identificationTasks: ["tfng", "ynng"],
      matchingTasks: ["matchingHeadings", "matchingInfo", "matchingFeatures"],
      completionTasks: ["sentenceCompletion", "summaryCompletion"],
      choiceTasks: ["mcq", "shortAnswer"],
    },
    collapsibleIds: ["identificationTasks", "matchingTasks", "completionTasks", "choiceTasks"],
  }
};

const CollapsibleNode = memo((props) => {
  const { id, data, style, className } = props;
  const { isExpanded, onToggle, hasChildren, label } = data;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(style || {}) }} className={className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{label}</div>
      {hasChildren && (
        <button
          style={{
            marginLeft: 8,
            padding: '2px 10px',
            borderRadius: 6,
            background: '#e3f2fd',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => onToggle(id)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const nodeTypes = { collapsible: CollapsibleNode };

const EnhancedReadingMindmap = ({ section = 'orientation' }) => {
  const allowed = new Set(['orientation', 'foundations', 'advanced', 'taskMastery']);
  if (!allowed.has(section) || !mindmapData[section]) return null;

  const { baseNodes, initialEdges, childMap: childMapMain, collapsibleIds: COLLAPSIBLE_IDS } = mindmapData[section];

  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const visibleNodeIds = useMemo(() => {
    const centerNodeId = baseNodes[0].id;
    const visibleIds = new Set([centerNodeId]);

    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }

    if (childMapMain[centerNodeId]) {
        childMapMain[centerNodeId].forEach(addVisible);
    }
    return visibleIds;
  }, [expanded, childMapMain, baseNodes]);

  const visibleNodes = useMemo(() => {
    return baseNodes
      .filter(n => visibleNodeIds.has(n.id))
      .map(n => {
        const hasChildren = childMapMain[n.id] && childMapMain[n.id].length > 0;
        return {
          ...n,
          type: hasChildren ? "collapsible" : undefined,
          data: {
            ...n.data,
            isExpanded: expanded[n.id] ?? true,
            onToggle: handleToggle,
            hasChildren: hasChildren,
          },
        };
      });
  }, [visibleNodeIds, expanded, childMapMain, handleToggle, baseNodes]);

  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds, initialEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  useEffect(() => {
    setNodes(prevNodes => {
      const prevNodeIds = new Set(prevNodes.map(n => n.id));
      const newNodeIds = new Set(visibleNodes.map(n => n.id));
      
      const nodesChanged = prevNodeIds.size !== newNodeIds.size || 
        [...prevNodeIds].some(id => !newNodeIds.has(id)) ||
        [...newNodeIds].some(id => !prevNodeIds.has(id));
      
      if (!nodesChanged) {
        return prevNodes.map(prevNode => {
          const newNode = visibleNodes.find(n => n.id === prevNode.id);
          return newNode ? { ...newNode, position: prevNode.position, selected: prevNode.selected } : prevNode;
        });
      }
      
      return visibleNodes.map(newNode => {
        const existingNode = prevNodes.find(n => n.id === newNode.id);
        return {
          ...newNode,
          position: existingNode ? existingNode.position : newNode.position,
          selected: existingNode ? existingNode.selected : false,
        };
      });
    });
    
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((event, node) => {
    if (nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, []);

  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes.map(n => {
          const findNearestAncestorWithColor = (childId) => {
            let current = childId;
            const parentOf = {};
            for (const [p, children] of Object.entries(childMapMain)) {
              children.forEach(c => { parentOf[c] = p; });
            }

            while (current) {
              const parent = parentOf[current];
              if (!parent) return null;
              if (nodeBgColors[parent]) return parent;
              current = parent;
            }
            return null;
          };

          const ancestorId = findNearestAncestorWithColor(n.id);
          const bg = nodeBgColors[n.id] || (ancestorId && nodeBgColors[ancestorId]) || nodeBaseStyle.background;

          return {
            ...n,
            draggable: true,
            style: {
              ...nodeBaseStyle,
              ...n.style,
              background: bg,
            },
          };
        })}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={{
          type: 'bezier',
          animated: true,
          style: { 
            stroke: '#90caf9',
            strokeWidth: 2
          },
          markerEnd: {
            type: 'arrowclosed',
            color: '#90caf9',
            width: 20,
            height: 20
          }
        }}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

  return (
    <>
      <div style={{position:'absolute',top:8,left:8,zIndex:9999,padding:'8px 16px',background:'#ffeb3b',color:'#222',fontWeight:700,borderRadius:8,fontSize:18,boxShadow:'0 2px 8px #0002'}}>EnhancedReadingMindmap Rendered: section = {section}</div>
      {!detached && (
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
            onClick={() => setDetached(true)}
          >
            Detach (Full Screen)
          </button>
        </div>
      )}
      {!detached && Mindmap}
      {detached && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.98)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 3100 }}>
            <button
              onClick={() => setDetached(false)}
              style={{
                background: '#e53e3e',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
              }}
            >
              Close Full Screen
            </button>
          </div>
          <div style={{ width: '90vw', height: '90vh', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0004', padding: 18, position: 'relative', zIndex: 3050 }}>
            {Mindmap}
          </div>
        </div>
      )}
      {modal && nodeDetails[modal] && (
        <div style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: 'auto',
          background: 'rgba(255,255,255,0.98)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          boxShadow: '0 -4px 32px #0003',
          padding: 0
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px #0004',
            padding: 28,
            minWidth: '900px',
            maxWidth: '1400px',
            width: '80vw',
            height: 'auto',
            minHeight: 260,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 32,
            position: 'relative',
            transition: 'all 0.3s ease-out'
          }}>
            <div style={{
              flex: '0 0 120px',
              maxWidth: 120,
              minWidth: 120,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}>
              {nodeDetails[modal].icon && (
                <div style={{
                  width: 90,
                  height: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: nodeDetails[modal].bg || '#e3f2fd',
                  borderRadius: 12
                }}>
                  {React.createElement(nodeDetails[modal].icon)}
                </div>
              )}
            </div>
            <div style={{
              flex: 1,
              minWidth: 320,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              wordBreak: 'break-word',
              height: '100%'
            }}>
              <div style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8
              }}>
                <div style={{
                  color: '#1976d2',
                  fontSize: 22,
                  fontWeight: 600
                }}>
                  {nodeDetails[modal].title}
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    background: '#e53e3e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #0002',
                    position: 'absolute',
                    right: 24,
                    zIndex: 10
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
                width: '100%',
                minHeight: 0,
                alignItems: 'flex-start',
                marginTop: 8
              }}>
                <div style={{ fontSize: 17, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                  {nodeDetails[modal].details.split(/\n\n/)[0]}
                </div>
                <div style={{ fontSize: 17, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                  {nodeDetails[modal].details.split(/\n\n/).slice(1).join('\n\n')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(EnhancedReadingMindmap);
