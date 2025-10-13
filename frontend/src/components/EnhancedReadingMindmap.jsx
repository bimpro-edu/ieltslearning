import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Base style for nodes
const nodeBaseStyle = {
  border: '2px solid #90caf9',
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  minWidth: 200,
  minHeight: 40,
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
  vocabularyDensity: {
    title: "Vocabulary Density",
    details: "IELTS Reading passages are packed with challenging vocabulary, technical terms, and topic-specific words.\n\nKey Skills:\nRecognize synonyms and paraphrases\nBuild a strong Academic Word List (AWL) foundation\nUse context clues to infer meaning\nSkim for main ideas, scan for key terms\n\nStrategies:\nPractice reading science, history, and social science texts\nCreate personal vocabulary lists\nUse flashcards and spaced repetition\nReview word families and collocations\n\nCommon Pitfalls:\nIgnoring unfamiliar words\nFocusing only on word-for-word matches\n\nPro Tip:\nHighlight new words and review them regularly.",
    icon: BookIcon,
    bg: '#ffe0b2',
  },
  skimming: {
    title: "Skimming",
    details: "Purpose: Quickly grasp the main idea and structure of a passage.\n\nHow to do it:\n- Read the title, headings, and first sentences of paragraphs.\n- Look for repeated words and phrases.\n- Ignore details and focus on overall flow.\n\nWhen to use:\n- Before answering general questions.\n- To get a sense of the topic and tone.\n\nPro Tips:\n- Practice with news articles and academic texts.\n- Time yourself to improve speed.",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  scanning: {
    title: "Scanning",
    details: "Purpose: Find specific facts, dates, names, or numbers quickly.\n\nHow to do it:\n- Know what you’re looking for before you start.\n- Move your eyes rapidly down the page.\n- Use keywords from the question.\n\nWhen to use:\n- For fact-based questions.\n- When searching for names, numbers, or dates.\n\nPro Tips:\n- Practice with tables, lists, and factual texts.\n- Don’t read every word—focus only on the target info.",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  closeReading: {
    title: "Close Reading",
    details: "Purpose: Deeply understand meaning, make inferences, and analyze details.\n\nHow to do it:\n- Read sentences carefully, noting grammar and logic.\n- Look for qualifying words (some, most, all, never).\n- Pay attention to author’s tone and intention.\n\nWhen to use:\n- For True/False/Not Given, inference, and matching headings.\n- When questions require critical thinking.\n\nPro Tips:\n- Practice with complex passages.\n- Annotate or highlight key phrases.",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  tfng: {
    title: "True/False/Not Given (TFNG)",
    details: "Purpose: Decide if statements agree with, contradict, or are not mentioned in the text.\n\nHow to do it:\n- Read the statement and locate the relevant part of the text.\n- Compare meaning, not just words.\n- Watch for paraphrasing and synonyms.\n\nTips:\n- True: Statement matches the text.\n- False: Statement contradicts the text.\n- Not Given: Statement is not addressed in the text.\n\nPro Tips:\n- Practice with sample TFNG questions.\n- Be careful with extreme language (always, never).",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  ynng: {
    title: "Yes/No/Not Given (YNNG)",
    details: "Purpose: Similar to TFNG but used for opinions or claims.\n\nHow to do it:\n- Identify if the statement agrees, disagrees, or is not mentioned.\n- Focus on author’s opinion or claim.\n\nTips:\n- Yes: Statement agrees with the author.\n- No: Statement disagrees with the author.\n- Not Given: Statement is not addressed.\n\nPro Tips:\n- Practice with opinion-based texts.\n- Look for subtle differences in meaning.",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  matchingHeadings: {
    title: "Matching Headings",
    details: "Purpose: Match headings to paragraphs or sections based on main ideas.\n\nHow to do it:\n- Skim each paragraph for its main idea.\n- Compare with heading options.\n- Eliminate headings that don’t fit.\n\nTips:\n- Look for topic sentences.\n- Watch for paraphrased headings.\n\nPro Tips:\n- Practice with sample texts.\n- Don’t get distracted by details.",
    icon: BookIcon,
    bg: '#f8bbd0',
  },
  matchingInfo: {
    title: "Matching Information",
    details: "Purpose: Match specific information (e.g., a reason, a description, an example) to the correct paragraph in the text.\n\nHow to do it:\n- Read the information and understand what you are looking for.\n- Scan the text for keywords and paraphrases related to the information.\n- Read the relevant paragraph carefully to confirm the match.\n\nTips:\n- The information is not in order in the text.\n- Some paragraphs may not contain any matches, while others may contain more than one.",
    icon: BookIcon,
    bg: '#d1c4e9',
  },
  matchingFeatures: {
    title: "Matching Features",
    details: "Purpose: Match a list of features (e.g., opinions, theories, names) to the correct items in the text (e.g., people, places, concepts).\n\nHow to do it:\n- Identify the features and the items to be matched.\n- Scan the text for the items (which are often names and easier to find).\n- Once you find an item, read around it carefully to see which feature is mentioned.\n- The features are often paraphrased in the text.\n\nTips:\n- You may be able to use some items more than once.\n- Do the items you are most confident about first.\n\nPro Tips:\n- This is a scanning and close reading task. Scan for the names/items, then read carefully to match the feature.",
    icon: TargetIcon,
    bg: '#d1c4e9',
  },
  sentenceCompletion: {
    title: "Sentence Completion",
    details: "Purpose: Complete sentences using words from the text, focusing on grammar and meaning.\n\nHow to do it:\n- Read the sentence and locate the relevant part of the text.\n- Pay attention to word limits and instructions.\n- Ensure grammatical accuracy.\n\nTips:\n- Answers must fit grammatically.\n- Use only words from the passage if instructed.\n\nPro Tips:\n- Practice with sample completion tasks.\n- Review grammar rules.",
    icon: BookIcon,
    bg: '#b3e5fc',
  },
  summaryCompletion: {
    title: "Summary/Note/Table Completion",
    details: "Purpose: Fill in summaries, notes, or tables using information from the text.\n\nHow to do it:\n- Skim the summary/table for structure.\n- Scan the text for matching information.\n- Use keywords and context clues.\n\nTips:\n- Answers may be paraphrased.\n- Follow instructions carefully.\n\nPro Tips:\n- Practice with different formats.\n- Highlight key information in the passage.",
    icon: BookIcon,
    bg: '#b3e5fc',
  },
  mcq: {
    title: "Multiple Choice Questions (MCQs)",
    details: "Purpose: Choose the correct answer from several options based on the text.\n\nHow to do it:\n- Read all options before choosing.\n- Locate the relevant part of the text.\n- Eliminate clearly wrong answers.\n\nTips:\n- Watch for distractors.\n- Answers may be paraphrased.\n\nPro Tips:\n- Practice with MCQ samples.\n- Don’t rush—read carefully.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  shortAnswer: {
    title: "Short Answer Questions",
    details: "Purpose: Answer questions briefly using information from the text.\n\nHow to do it:\n- Read the question and locate the answer in the text.\n- Use only the required number of words.\n- Check spelling and grammar.\n\nTips:\n- Answers must come from the passage.\n- Follow word limits strictly.\n\nPro Tips:\n- Practice with sample short answer tasks.\n- Review common question types.",
    icon: BookIcon,
    bg: '#c8e6c9',
  },
  awl: {
    title: "Academic Word List (AWL)",
    details: "Purpose: Build strong academic vocabulary for IELTS Reading.\n\nHow to do it:\n- Study the AWL and learn word families.\n- Practice using words in context.\n- Review regularly and use flashcards.\n\nTips:\n- Focus on high-frequency academic words.\n- Group words by topic.\n\nPro Tips:\n- Use AWL resources and quizzes.\n- Track your progress over time.",
    icon: BookIcon,
    bg: '#fff9c4',
  },
  synonyms: {
    title: "Synonyms and Collocations",
    details: "Purpose: Recognize and use synonyms and collocations to understand and answer questions.\n\nHow to do it:\n- Identify synonyms in questions and text.\n- Learn common collocations for key words.\n- Practice paraphrasing sentences.\n\nTips:\n- Answers may use synonyms instead of exact words.\n- Collocations help with natural language use.\n\nPro Tips:\n- Build lists of synonyms and collocations.\n- Practice with paraphrasing exercises.",
    icon: BookIcon,
    bg: '#fff9c4',
  },
  topicClusters: {
    title: "Topic-based Clusters",
    details: "Purpose: Group vocabulary by topic (science, history, environment, society) for better retention and understanding.\n\nHow to do it:\n- Organize vocabulary into clusters by topic.\n- Use mindmaps and charts.\n- Practice with topic-based reading materials.\n\nTips:\n- Topic clusters help with context and meaning.\n- Review clusters before each practice session.\n\nPro Tips:\n- Create your own topic clusters.\n- Use them for revision and practice.",
    icon: BookIcon,
    bg: '#fff9c4',
  },
  // Task Mastery Parent Nodes
  identificationTasks: {
    title: "Identification Tasks",
    details: "These tasks require you to determine if information is present or correct in the passage. This includes True/False/Not Given and Yes/No/Not Given questions.\n\nKey Skill: Careful reading and understanding the difference between a statement being contradicted (False/No) and not being mentioned at all (Not Given).",
    icon: TargetIcon,
    bg: '#e1bee7',
  },
  matchingTasks: {
    title: "Matching Tasks",
    details: "In these tasks, you need to connect information from a list to different parts of the text. This includes matching headings to paragraphs, information to paragraphs, or features to items.\n\nKey Skill: Skimming for main ideas (for headings) and scanning for specific details (for information and features).",
    icon: TargetIcon,
    bg: '#d1c4e9',
  },
  completionTasks: {
    title: "Completion Tasks",
    details: "These tasks require you to fill in gaps in sentences, summaries, notes, or tables using words from the text.\n\nKey Skill: Attention to detail, grammar, and word limits. You must often use the exact words from the passage.",
    icon: TargetIcon,
    bg: '#b3e5fc',
  },
  choiceTasks: {
    title: "Choice & Answer Tasks",
    details: "These tasks present you with options or require you to find a specific piece of information to write as an answer. This includes Multiple Choice and Short Answer questions.\n\nKey Skill: Eliminating incorrect options (distractors) and locating specific information quickly.",
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
    const hasChildren = childMapMain[node.id] && childMapMain[node.id].length > 0;
    
    if (nodeDetails[node.id]) {
      setModal(node.id);
    }
  }, [childMapMain]);

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