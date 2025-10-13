import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Icons for different node types
const TargetIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#dc2626" strokeWidth="3"/>
    <circle cx="32" cy="32" r="20" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
    <circle cx="32" cy="32" r="12" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
    <circle cx="32" cy="32" r="4" fill="#dc2626"/>
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

const CheckIcon = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#059669" strokeWidth="3"/>
    <path d="M20 32l8 8 16-16" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Utility to strip markdown formatting
function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#+\s?(.*)/gm, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\!\[(.*?)\]\((.*?)\)/g, '')
    .replace(/^- /gm, '• ')
    .trim();
}

function removeVisual(text) {
  if (!text) return '';
  return text.replace(/\n?Visual:([\s\S]*)$/i, '').trim();
}

// Child map definition - must be defined before use
const getChildMap = () => {
  return {
    taskMasteryCenter: ["precisionTasks", "complexMatching", "advancedMCQ"],
    precisionTasks: ["tfngPrecision", "ynngPrecision", "completionPrecision"],
    complexMatching: ["headingMastery", "infoMatching", "featureMatching"],
    advancedMCQ: ["singleMCQ", "multiMCQ", "shortAnswer"],
  };
};

// Collapsible node component for parent nodes  
const CollapsibleNode = memo((props) => {
  const { id, data } = props;
  const { isExpanded, onToggle, hasChildren } = data;
  const showToggle = hasChildren;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(props.style || {}) }} className={props.className}>
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600, cursor: 'grab' }}>{data.label}</div>
      {showToggle && (
        <button
          style={{ 
            marginLeft: 8, 
            padding: '2px 10px', 
            borderRadius: 6, 
            border: '1px solid #1976d2', 
            background: isExpanded ? '#e3f2fd' : '#fff', 
            color: '#1976d2', 
            cursor: 'pointer', 
            fontSize: 14 
          }}
          onClick={e => { e.stopPropagation(); onToggle(id); }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const nodeTypes = { collapsible: CollapsibleNode };

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
  taskMasteryCenter: '#fef2f2', // light red
  precisionTasks: '#f87171', // red
  complexMatching: '#a855f7', // purple
  advancedMCQ: '#10b981', // green
  
  // Precision Tasks sub-nodes
  tfngPrecision: '#f87171', // red
  ynngPrecision: '#f87171', // red
  completionPrecision: '#f87171', // red
  
  // Complex Matching sub-nodes
  headingMastery: '#a855f7', // purple
  infoMatching: '#a855f7', // purple
  featureMatching: '#a855f7', // purple
  
  // Advanced MCQ sub-nodes
  singleMCQ: '#10b981', // green
  multiMCQ: '#10b981', // green
  shortAnswer: '#10b981', // green
};

// Detailed node information
const nodeDetails = {
  taskMasteryCenter: {
    title: "Task Type Mastery 2025",
    details: `Welcome to the final stage of your Reading journey: **Task Type Mastery**. This is where you evolve from a competent reader into a strategic test-taker, capable of dismantling any question type the IELTS throws at you.\n\n**Core Philosophy:**\nMastery isn't just about knowing *what* to do; it's about *automatically* deploying the most efficient strategy for each specific task. It's about seeing a question and instantly knowing its weaknesses and how to exploit them.\n\n**The Three Pillars of Mastery:**\n1.  **Precision Tasks:** These are black-and-white questions where accuracy is everything. Your goal is to master micro-reading skills to leave no room for error.\n    *   *T/F/NG & Y/N/NG:* Move beyond guessing to concrete evidence-based decisions.\n    *   *Completion:* Develop an instinct for grammatical and contextual prediction.\n\n2.  **Complex Matching:** These tasks test your ability to see the bigger picture and connect information across the text. Your goal is to become a master of synthesis and organization.\n    *   *Headings & Information:* Differentiate main ideas from details and track information flow.\n    *   *Features:* Create mental maps of who, what, where, and what they are associated with.\n\n3.  **Advanced Multiple Choice:** MCQs are designed to trick you with tempting distractors. Your goal is to become a master of elimination and evidence evaluation.\n    *   *Single & Multiple Answer:* Systematically dismantle options until only the truth remains.\n    *   *Short Answer:* Practice the art of concise, accurate information extraction.\n\n**Your Mastery Goals:**\n- **Instant Recognition:** Identify any question type and its required strategy in under 3 seconds.\n- **Flawless Execution:** Apply the chosen strategy with confidence and precision.\n- **Evidence-Based Confidence:** Never just *feel* an answer is right; *know* it by finding the proof.\n- **Time Dominance:** Allocate time not just per passage, but per question type, optimizing your 60 minutes for maximum points.\n\n**Mastery is achieved when you no longer fear any question type. Let's break them down, one by one.**`,
    icon: TargetIcon,
    bg: '#fef2f2',
  },
  
  precisionTasks: {
    title: "Precision Tasks",
    details: `This category is the domain of the detail-oriented reader. Precision tasks have **one, and only one, correct answer** based on the text. There is no room for interpretation, inference, or ambiguity. Your job is to become a detective, matching information with surgical precision.\n\n**The Precision Mindset:**\n- **Literal Matching:** You are looking for exact matches or undeniable paraphrases.\n- **No Assumptions:** If the text doesn't explicitly state it, you cannot assume it.\n- **Every Word Matters:** Small words like *all, some, always, often, never* can completely change the meaning. Pay close attention to them!\n- **High-Stakes Accuracy:** These questions are often seen as the most straightforward, but they are also the easiest to lose marks on due to carelessness.\n\n**Core Skills for Precision:**\n- **Micro-Reading:** The ability to slow down and analyze a single sentence, phrase, or even a single word for its exact meaning.\n- **Synonym & Paraphrase Recognition:** Identifying when different words convey the exact same meaning.\n- **Logical Acuity:** Understanding the difference between a direct contradiction (False/No) and a lack of information (Not Given).\n\n**The Tasks in this Category:**\n- **True/False/Not Given:** Matching factual statements to the text.\n- **Yes/No/Not Given:** Matching the author's views or opinions to the text.\n- **Completion Tasks:** Filling in gaps with exact words from the text.\n\n**Your goal is to approach these questions with a zero-error mentality. Click on a specific task to master the techniques.**`,
    icon: TargetIcon,
    bg: '#f87171',
  },

  tfngPrecision: {
    title: "True/False/Not Given Precision",
    details: `This task assesses your ability to distinguish between information that is stated, contradicted, or simply not present in the text. It's a test of pure, factual accuracy.\n\n**The Golden Rules:**\n- **TRUE:** Every single part of the statement must be directly confirmed by the text. This includes names, dates, quantities, causes, effects, and any qualifying words. A 99% match is not enough; it must be 100%.\n  *   *Example:* If the text says "*some* researchers believe..." and the statement says "*researchers* believe...", it is NOT TRUE. The word "some" is a vital qualifier.\n\n- **FALSE:** The text must directly contradict the statement. You should be able to underline the exact words in the passage that prove the statement is wrong. It's not enough for it to be different; it must be opposite.\n  *   *Example:* If the text says "the project was completed in 2020" and the statement says "the project finished in 2021", that is FALSE.\n
- **NOT GIVEN:** This is the trickiest. A statement is Not Given if there is simply no information about it in the passage. You cannot use your own knowledge, and you cannot make assumptions. If you find yourself thinking "well, it's *likely* that..." - stop. That's the path to a Not Given answer.\n  *   *Example:* If the text describes a scientist's research but never mentions their age, a statement about their age is NOT GIVEN.\n\n**Mastery-Level Analysis:**\n- **Qualifiers are Key:** Pay obsessive attention to words like *all, only, majority, sometimes, always, claim, suggest*. They are often the deciding factor between T, F, and NG.\n- **Cause vs. Correlation:** Does the text say A *caused* B, or just that A happened *and then* B happened? Don't assume a causal link unless it's explicitly stated.\n- **Don't Over-Interpret:** Stick to what the text says. T/F/NG is not a test of your inferential skills; it's a test of your matching skills.\n\n**The Foolproof Method:**\n1.  Read the statement and underline the key concepts.\n2.  Scan the passage to find the relevant section. Don't read the whole text first.\n3.  Compare the statement to the text, word by word. Look for an exact match (TRUE) or a direct contradiction (FALSE).\n4.  If you can't find any information to either confirm or contradict the statement after a thorough search, it must be NOT GIVEN. Don't be afraid to choose it.`,
    icon: TargetIcon,
    bg: '#f87171',
  },

  ynngPrecision: {
    title: "Yes/No/Not Given: Opinion Analysis",
    details: `This is the sibling of T/F/NG, but with a crucial twist. Instead of matching facts, you are matching **opinions, views, and claims**. The question is not "Is this statement true?" but rather "Does the author of the passage agree with this statement?"\n\n**The Core Distinction:**\n- **T/F/NG = Facts:** Deals with objective information. *Example: The Earth revolves around the Sun.*\n- **Y/N/NG = Opinions/Claims:** Deals with the author's subjective viewpoint. *Example: The government should invest more in space exploration.*\n\n**Decoding the Author's Stance:**\n- **YES (The author agrees):** The text explicitly shows the author shares the view in the statement. Look for direct statements of agreement or strong, positive evaluative language.\n  *   *Clue words:* 
`Fortunately`,
`correctly`,
`an impressive achievement`,
`I believe...`\n
- **NO (The author disagrees):** The text explicitly shows the author disagrees with the view. This could be a direct rebuttal or the use of critical, negative language.\n  *   *Clue words:* 
`Unfortunately`,
`mistakenly`,
`a disappointing result`,
`However, the evidence suggests otherwise...`\n
- **NOT GIVEN (The author's view is not mentioned):** The passage might discuss the topic, or even present the view, but it doesn't reveal the *author's* personal stance on it. This is common when the author is reporting the views of others.\n  *   *Trap:* The text says, "*Some scientists claim* that the policy is effective." The statement is "The policy is effective." The answer is NOT GIVEN, because the author is reporting what *scientists claim*, not stating their own view.\n\n**Mastering the Hunt for Opinion:**\n- **Whose voice is it?** Constantly ask yourself: Is this the author speaking, or are they quoting or reporting on someone else (e.g., 
`according to research`,
 
`critics argue`
)?\n- **Adjectives and Adverbs are Signals:** These words betray the author's feelings. 
`A *surprising* discovery`
 (author's view) vs. 
`The discovery was made in 2020`
 (fact).\n- **Modal Verbs show Certainty:** Pay attention to words like 
`might`,
 
`could`,
 
`should`,
 
`must`
. They reveal the strength and nature of the author's belief.\n\n**The Strategic Process:**\n1.  Identify the core opinion in the question statement.\n2.  Scan the text for keywords related to that opinion.\n3.  Once located, analyze the surrounding text. Is the author stating their own view or reporting someone else's?\n4.  Look for linguistic clues (adjectives, adverbs, reporting verbs) to determine if the author agrees (YES), disagrees (NO), or remains neutral (NOT GIVEN).`,
    icon: LightbulbIcon,
    bg: '#f87171',
  },

  completionPrecision: {
    title: "Completion Task Accuracy",
    details: `Completion tasks (summary, note, table, flow-chart, sentence) are a test of your ability to **extract precise information** and fit it into a grammatical structure. Your goal is to become a word-perfect surgeon.\n\n**The Two Pillars of Completion:**\n1.  **Grammatical Prediction:** Before you even look at the text, analyze the gap. What part of speech is needed? A noun? A verb? An adjective? Is it singular or plural? What verb tense is required? This prediction narrows down your search significantly.\n    *   *Example:* "The company's annual profits have _______ steadily." - You know you're looking for a verb in the past participle form (e.g., risen, grown, fallen).\n\n2.  **Exact Word Extraction:** You must use the **exact words** from the passage. You cannot change the word form (e.g., using "growth" when the text says "growing"). You must also strictly obey the word limit (e.g., "NO MORE THAN TWO WORDS AND/OR A NUMBER").\n\n**Mastery-Level Skills:**\n- **Word Limit Discipline:** This is non-negotiable. "a", "an", and "the" all count as words. Hyphenated words (e.g., "state-of-the-art") count as one. If the answer is "2.5 million", that can be one number.\n- **Contextual Understanding:** Read the sentence with the gap to understand the context. This helps you confirm that the word you've chosen makes logical sense.\n- **Scanning for Keywords:** Use keywords from the summary or sentence to locate the relevant information in the passage quickly.\n\n**The Completion Workflow:**\n1.  **Analyze the Gap:** Read the sentence with the blank and predict the type of word needed (noun, verb, etc.) and its likely meaning.\n2.  **Identify Keywords:** Choose keywords from the sentence to scan for in the passage.\n3.  **Locate and Extract:** Find the relevant section and identify the exact word(s) that fit the gap grammatically and contextually.\n4.  **Verify Word Limit:** Check that your answer complies with the instructions.\n5.  **Read the Completed Sentence:** Does it make perfect grammatical and logical sense? If yes, you're likely correct.`,
    icon: CheckIcon,
    bg: '#f87171',
  },

  complexMatching: {
    title: "Complex Matching Strategies",
    details: `Welcome to the next level of reading comprehension. Complex Matching tasks require you to connect different pieces of information, often across multiple paragraphs. These are not about finding a single word; they are about understanding **relationships and structures** within the text.\n\n**The Core Challenge:**\nUnlike precision tasks, matching tasks involve a degree of interpretation and synthesis. You need to see the forest, not just the trees. The language will almost always be paraphrased, so you are matching ideas, not words.\n\n**The Three Main Types:**\n- **Heading Matching:** You match a heading (a short summary sentence) to the correct paragraph or section. This tests your ability to identify the main idea of a paragraph and distinguish it from supporting details.\n- **Information Matching:** You find which paragraph contains specific pieces of information (e.g., a reason, a comparison, a problem). This tests your ability to scan for specific details that may be hidden anywhere in the text.\n- **Feature Matching:** You match a list of items (e.g., researchers, theories, companies) to a list of features or statements. This tests your ability to track multiple entities and their associated attributes throughout the passage.\n\n**The Mindset for Matching:**\n- **Think in Paraphrases:** The headings and information statements will use synonyms and different sentence structures from the text. Focus on matching the underlying meaning.\n- **Be Systematic:** Don't jump around randomly. Have a clear process for each matching type. For example, for heading matching, read the paragraph first, then find the heading. For information matching, read the questions first, then hunt for the answers.\n- **Manage Your Options:** As you use an option, cross it off (unless the instructions say you can use it more than once). This process of elimination is vital.\n\n**Click on a specific matching type to learn the detailed strategy for dominating it.**`,
    icon: LightbulbIcon,
    bg: '#a855f7',
  },

  headingMastery: {
    title: "Heading Matching Excellence",
    details: `Heading Matching is a test of your ability to identify the **main idea or purpose** of a paragraph. You are given a list of headings and a set of paragraphs, and you must match them correctly. The key is to distinguish the central theme from the supporting details.\n\n**The Core Skill: Main Idea vs. Details**\n- **Main Idea:** The central point the author is making in the paragraph. It's the "umbrella" that all other sentences in the paragraph fit under. It's often, but not always, introduced in the topic sentence (the first or second sentence).\n- **Supporting Details:** These are the examples, explanations, statistics, or elaborations that support the main idea. A common trap is to choose a heading that matches a detail, but not the overall theme.\n  *   *Example:* A paragraph might describe the migration patterns of monarch butterflies, mentioning their distinctive orange and black wings. A distractor heading might be "The Colors of a Butterfly," while the correct heading would be "A Long-Distance Journey."\n\n**The Skim-Reading Strategy:**\n1.  **Ignore the Headings (at first):** Reading the headings first can bias you. Instead, go to the first paragraph.\n2.  **Read the First and Last Sentences:** Read the first and last sentences of the paragraph carefully. They often contain the main idea or a summary.\n3.  **Skim the Middle:** Quickly skim the body of the paragraph to understand its general topic and purpose (e.g., is it giving an example, explaining a cause, presenting a problem?).\n4.  **Formulate Your Own Heading:** In your own words, what is this paragraph about? Create a simple heading in your mind.\n5.  **Match Your Heading:** Now, look at the list of official headings. Find the one that most closely matches the heading you created. This is your answer.\n\n**Advanced Tactics:**\n- **Beware of Keyword Matching:** Just because a heading contains a word that is also in the paragraph does not mean it's the correct heading. This is a common trap. Focus on the overall meaning.\n- **Process of Elimination:** If you match a heading, lightly cross it off the list (unless it can be used more than once). This narrows down your choices for later paragraphs.\n- **Handle the "List of Headings" Paragraph:** Sometimes a paragraph is just a list of examples (e.g., "There are three main types of renewable energy: solar, wind, and hydro."). The heading for this will be a general, categorizing one, like "Types of Renewable Energy."`,
    icon: TargetIcon,
    bg: '#a855f7',
  },

  infoMatching: {
    title: "Information Matching Strategies",
    details: `This task requires you to find the specific location of information in the text. You are given a list of statements and you must identify which paragraph contains the information in each statement. The information is usually a specific detail, not the main idea of the paragraph.\n\n**The Key Challenge: Hunting for Details**\nUnlike heading matching, you are not looking for the main idea. You are looking for a needle in a haystack—a specific piece of information that could be anywhere. The answer might be a single phrase or it could be synthesized from a couple of sentences within the paragraph.\n
**The Question-First Strategy:**\n1.  **Read the Questions First:** Carefully read the first statement you need to find. Underline the keywords and understand exactly what you are looking for (e.g., a reason, a comparison, a number, a problem).\n2.  **Transform Keywords:** Think of synonyms and paraphrases for your keywords. The text will not use the same words as the question.\n3.  **Scan the Entire Passage:** Start scanning the text from the beginning. You are not reading for deep understanding; you are hunting for the keywords or their paraphrases.\n4.  **Verify the Match:** When you find a potential match, slow down and read the surrounding sentences carefully. Does the text contain the exact information required by the statement? If yes, you've found your answer.\n5.  **Move to the Next Question:** Once you've found the location for one statement, move on to the next one and repeat the process.\n\n**Important Considerations:**\n- **Some Paragraphs May Not Be Used:** There may be paragraphs that do not contain any of the required information.\n- **Some Paragraphs May Be Used More Than Once:** The instructions will tell you if this is possible. Read them carefully!\n- **Don't Get Stuck:** If you can't find a piece of information after a reasonable amount of time, circle the question number, move on, and come back to it later. You may find it while looking for another answer.\n\n**This task rewards systematic scanning and a good understanding of paraphrase. It's a true test of your ability to navigate the text efficiently.**`,
    icon: CheckIcon,
    bg: '#a855f7',
  },

  featureMatching: {
    title: "Feature Matching Expertise",
    details: `Feature Matching asks you to connect a list of features (e.g., statements, opinions, findings) to a list of people, places, theories, or dates. It's a test of your ability to track multiple items and their relationships throughout a passage.\n\n**The Core Task: Connecting A to B**\nYour job is to build a map of relationships. For example, you might have a list of researchers (A, B, C) and a list of their discoveries (1, 2, 3, 4, 5). You need to match which researcher made which discovery.\n
**The Entity-First Strategy:**\n1.  **Identify the "Entities":** The list of names, places, or dates is your anchor. These are usually proper nouns and are easier to scan for than the features.\n2.  **Scan and Annotate:** Take the first entity from the list (e.g., "Researcher A"). Scan the entire passage for every mention of that name. When you find it, quickly read the surrounding text and make a brief note of what that researcher said or did.\n3.  **Repeat for All Entities:** Do this for all the entities in the list. You are creating a quick summary of what the passage says about each one.\n4.  **Answer the Questions:** Now, look at the list of features (the statements/opinions). Read the first feature, and then look at your annotated notes. Which entity does this feature match? Because you have already summarized the information, the matching process becomes much faster and more accurate.\n\n**Example:**\n- **Entities:** Darwin, Lamarck\n- **Features:** \n  1. Believed evolution happened through "natural selection".\n  2. Stated that traits acquired during a lifetime could be passed on.\n
*Your Process:* Scan for "Darwin," note "natural selection." Scan for "Lamarck," note "acquired traits." Now, matching the features is simple.\n\n**Key Advice:**\n- **The Answers Are Not in Order:** The features will be in a random order, but the information about a specific entity might be clustered in one or two paragraphs.\n- **Beware of Reported Speech:** The text might say, "Darwin disagreed with Lamarck's theory of acquired traits." Be careful to attribute the idea to the correct person (Lamarck, in this case).\n- **Some Entities May Be Used More Than Once:** Read the instructions carefully. If so, don't cross them off as you use them.`,
    icon: LightbulbIcon,
    bg: '#a855f7',
  },

  advancedMCQ: {
    title: "Advanced Multiple Choice",
    details: `Multiple Choice Questions (MCQs) are designed to be deceptive. They present you with several options, one of which is correct and the others—known as **distractors**—are designed to look correct. Your mission is to become a master of **distractor elimination**.\n\n**The Psychology of an MCQ:**\nThe test-makers create distractors that fall into predictable traps:\n- **The "True, but not in the text" trap:** The option is a factually correct statement, but it's not mentioned in the passage.\n- **The "Keyword match" trap:** The option contains words from the passage but misrepresents the meaning entirely.\n- **The "Partial truth" trap:** The option is partially correct but is either incomplete or contains một incorrect detail.\n- **The "Logical but wrong" trap:** The option seems to make sense and could be inferred, but it is not directly supported by the text.\n\n**The Elimination Mindset:**\nDo not search for the right answer. Instead, **search for the wrong answers and eliminate them**. For every option, your goal is to find a reason why it is incorrect. The last one standing is your answer. This is a more reliable and less stressful strategy.\n
**The Three MCQ Sub-Types:**\n- **Single Answer MCQ:** The classic "choose the one best answer" from a list of four options.\n- **Multiple Answer MCQ:** You must choose more than one correct answer from a longer list of options (e.g., "Choose the THREE factors mentioned...").\n- **Short Answer Questions:** These are like open-ended MCQs where you must find and write down the answer from the text, adhering to a strict word limit.\n\n**Mastering MCQs is about discipline and process. Click on a specific type to learn the elimination techniques for each.**`,
    icon: CheckIcon,
    bg: '#10b981',
  },

  singleMCQ: {
    title: "Single Answer MCQ Mastery",
    details: `In this task, your goal is to find the **one** option that is best supported by the text. The key is a systematic process of elimination, not a frantic search for the correct answer.\n\n**The Elimination Framework:**\nFor each option (A, B, C, D), ask yourself: "Is there any reason why this is definitively wrong?"\n1.  **Read the Question Stem:** Understand exactly what is being asked. Is it a detail question, a main idea question, or an inference question?\n2.  **Locate the Evidence:** Scan the passage to find the section that discusses the topic of the question.\n3.  **Analyze the Options (One by One):**\n    *   **Option A:** Compare it to the evidence in the text. Is it a perfect match? Is it directly contradicted? Is it not mentioned at all? If you find a reason to disqualify it, cross it out.\n    *   **Option B:** Repeat the process. Don't compare it to Option A. Compare it only to the text.\n    *   **Continue for all options.**\n\n**The Distractor Hit List (Why to Eliminate an Option):**\n- **It's Contradicted:** The text says the opposite.\n- **It's Not Mentioned:** The text doesn't contain this information.\n- **It's a Keyword Trap:** It uses words from the passage but twists the meaning.\n- **It's Too Extreme:** It uses absolute words like *always, never, all, only*, which are rarely correct.\n- **It's a Partial Truth:** Part of the option is correct, but another part is wrong or not mentioned.\n- **It's from the Wrong Part of the Text:** The information is true but doesn't answer the specific question asked.\n\n**The "Best Fit" Principle:**\nSometimes, you may eliminate two options easily, and be left with two that seem plausible. In this case, re-read the question. One option will answer the question more directly and completely than the other. One might be a secondary point, while the other is the main point. Choose the one that is the most direct and comprehensive answer to the specific question asked.\n\n**This methodical approach turns a guessing game into a logical process, dramatically increasing your accuracy.**`,
    icon: TargetIcon,
    bg: '#10b981',
  },

  multiMCQ: {
    title: "Multiple Answer MCQ Excellence",
    details: `This task requires you to select **more than one** correct answer from a list of options. For example, "Choose THREE reasons why..." or "Which TWO of the following are mentioned?".\n\n**The Core Strategy: Treat Each Option as a T/F/NG Question**\nDo not try to hold all the options in your head at once. Instead, isolate each option and treat it like a mini-True/False/Not Given question against the passage.\n
**The Systematic Evaluation Process:**\n1.  **Read the Instructions Carefully:** How many answers must you choose? Exactly two? Up to three? This is a critical first step.\n2.  **Isolate the First Option:** Take Option A and ignore all others.\n3.  **Find Evidence in the Text:** Scan the passage to see if you can find information that either supports or contradicts Option A.\n4.  **Make a Decision:**\n    *   If the text **supports** the option, put a checkmark (✓) next to it. It's a potential answer.\n    *   If the text **contradicts** the option, put an X next to it. It's definitely wrong.\n    *   If you **cannot find** the information, it's effectively "Not Given," so you can also put an X next to it.\n5.  **Repeat for All Options:** Go through the entire list (B, C, D, E, etc.) and evaluate each one independently against the text.\n6.  **Select Your Final Answers:** Once you have evaluated all the options, count your checkmarks. If you have the correct number of checkmarks, those are your answers. If you have too many, you need to re-evaluate them to find the "best" ones.\n\n**Common Traps:**\n- **The "One-Word-Off" Distractor:** An option might seem perfect, but one word makes it incorrect (e.g., "in the 19th century" when the text says "in the 18th century").\n- **The "Real-World Knowledge" Trap:** An option might be true in the real world, but if it's not mentioned in the passage, it's a wrong answer.\n- **The "Synonym Mismatch" Trap:** The option uses a word that seems like a synonym, but it has a slightly different meaning in the context.\n\n**This method is slower but far more accurate than trying to remember multiple options while scanning. It transforms a complex task into a series of simple, manageable decisions.**`,
    icon: CheckIcon,
    bg: '#10b981',
  },

  shortAnswer: {
    title: "Short Answer Excellence",
    details: `Short Answer questions require you to find answers to specific "Wh-" questions (Who, What, When, Where, Why, How) and write them using words taken directly from the passage. This task is a pure test of accurate information retrieval and attention to detail.\n\n**The Two Unbreakable Rules:**\n1.  **The Word Limit:** The instructions will state a word limit, such as "NO MORE THAN THREE WORDS AND/OR A NUMBER." This is the most important rule. Even one word over the limit will result in a zero for that question. Articles (a, an, the) count as words. A number can be written as a digit (e.g., 7) or words (e.g., seven) and counts as one word/number.\n2.  **Use Words From the Passage:** You must use the exact wording from the text. Do not change the form of the words or try to summarize the information.\n\n**The Question-First Approach:**\n1.  **Analyze the Question:** Identify the question word (Who, What, When, etc.). This tells you what kind of information you are looking for (a person, a place, a reason, a date, etc.). Underline the keywords in the question.\n2.  **Predict the Answer Type:** Based on the question, anticipate the form of the answer. If the question is "When...?. you're looking for a date or time. If it's "Who...?. you're looking for a name.\n3.  **Scan for Keywords:** Scan the passage for the keywords from the question (or their synonyms).\n4.  **Locate and Extract:** Once you find the relevant sentence, locate the precise words that answer the question. Be careful to only extract the words that are essential to answer the question directly.\n5.  **Check the Word Limit:** Count the words in your answer. Does it comply with the limit? If not, you need to shorten it by removing non-essential words (often adjectives or adverbs), but without changing the meaning or using words from outside the text.\n\n**Example:**\n- **Passage:** "The research project, which concluded in 2023, was led by the esteemed Dr. Evelyn Reed."
- **Question:** Who led the project?
- **Answer:** Dr. Evelyn Reed (3 words - CORRECT if limit is 3)
- **Answer:** Evelyn Reed (2 words - Also CORRECT)
- **Answer:** The esteemed Dr. Evelyn Reed (5 words - WRONG, exceeds limit)\n\n**This task is a gift if you are disciplined. Focus on the word limit and use only the text's language.**`,
    icon: LightbulbIcon,
    bg: '#10b981',
  },
};

// Node structure definition
const baseNodes = [
  // Center node
  { id: "taskMasteryCenter", data: { label: "Task Type Mastery" }, position: { x: 0, y: 0 }, draggable: true },
  
  // Main branches
  { id: "precisionTasks", type: "collapsible", data: { label: "Precision Tasks" }, position: { x: -300, y: 150 }, draggable: true },
  { id: "complexMatching", type: "collapsible", data: { label: "Complex Matching" }, position: { x: 0, y: 150 }, draggable: true },
  { id: "advancedMCQ", type: "collapsible", data: { label: "Advanced MCQ" }, position: { x: 300, y: 150 }, draggable: true },
  
  // Precision Tasks sub-nodes
  { id: "tfngPrecision", data: { label: "TFNG Precision" }, position: { x: -500, y: 250 }, draggable: true },
  { id: "ynngPrecision", data: { label: "Y/N/NG Mastery" }, position: { x: -300, y: 250 }, draggable: true },
  { id: "completionPrecision", data: { label: "Completion Accuracy" }, position: { x: -100, y: 250 }, draggable: true },
  
  // Complex Matching sub-nodes
  { id: "headingMastery", data: { label: "Heading Mastery" }, position: { x: -150, y: 250 }, draggable: true },
  { id: "infoMatching", data: { label: "Information Matching" }, position: { x: 0, y: 250 }, draggable: true },
  { id: "featureMatching", data: { label: "Feature Matching" }, position: { x: 150, y: 250 }, draggable: true },
  
  // Advanced MCQ sub-nodes
  { id: "singleMCQ", data: { label: "Single Answer MCQ" }, position: { x: 100, y: 250 }, draggable: true },
  { id: "multiMCQ", data: { label: "Multiple Answer MCQ" }, position: { x: 300, y: 250 }, draggable: true },
  { id: "shortAnswer", data: { label: "Short Answer Excellence" }, position: { x: 500, y: 250 }, draggable: true },
];

const initialEdges = [
  // Main branches from center
  { id: 'e-center-precision', source: 'taskMasteryCenter', target: 'precisionTasks' },
  { id: 'e-center-matching', source: 'taskMasteryCenter', target: 'complexMatching' },
  { id: 'e-center-mcq', source: 'taskMasteryCenter', target: 'advancedMCQ' },
  
  // Precision Tasks sub-branches
  { id: 'e-precision-tfng', source: 'precisionTasks', target: 'tfngPrecision' },
  { id: 'e-precision-ynng', source: 'precisionTasks', target: 'ynngPrecision' },
  { id: 'e-precision-completion', source: 'precisionTasks', target: 'completionPrecision' },
  
  // Complex Matching sub-branches
  { id: 'e-matching-heading', source: 'complexMatching', target: 'headingMastery' },
  { id: 'e-matching-info', source: 'complexMatching', target: 'infoMatching' },
  { id: 'e-matching-feature', source: 'complexMatching', target: 'featureMatching' },
  
  // Advanced MCQ sub-branches
  { id: 'e-mcq-single', source: 'advancedMCQ', target: 'singleMCQ' },
  { id: 'e-mcq-multi', source: 'advancedMCQ', target: 'multiMCQ' },
  { id: 'e-mcq-short', source: 'advancedMCQ', target: 'shortAnswer' },
];

// Collapsible logic
const COLLAPSIBLE_IDS = ["precisionTasks", "complexMatching", "advancedMCQ"];

const ReadingMindmapTaskMastery = ({ section = 'taskMastery' }) => {
  const [detached, setDetached] = useState(false);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(COLLAPSIBLE_IDS.map(id => [id, true])));
  const [modal, setModal] = useState(null);

  // Calculate visible nodes based on expanded state
  const childMapMain = useMemo(() => getChildMap(), []);
  
  // Calculate visible nodes with React useMemo for performance
  const visibleNodeIds = useMemo(() => {
    const visibleIds = new Set(["taskMasteryCenter"]);
    
    function addVisible(id) {
      visibleIds.add(id);
      if (expanded[id] && childMapMain[id]) {
        childMapMain[id].forEach(addVisible);
      }
    }
    
    childMapMain.taskMasteryCenter.forEach(addVisible);
    return visibleIds;
  }, [expanded, childMapMain]);

  // Handle toggle function
  const handleToggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Generate visible nodes with proper state
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
  }, [visibleNodeIds, expanded, childMapMain, handleToggle]);

  // Generate visible edges
  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [visibleNodeIds]);

  // Use React Flow's state hooks with initial values
  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  // Update nodes and edges when visibility changes
  useEffect(() => {
    setNodes(prevNodes => {
      // Only update if there's an actual change in visible nodes
      const prevNodeIds = new Set(prevNodes.map(n => n.id));
      const newNodeIds = new Set(visibleNodes.map(n => n.id));
      
      const nodesChanged = prevNodeIds.size !== newNodeIds.size || 
        [...prevNodeIds].some(id => !newNodeIds.has(id)) ||
        [...newNodeIds].some(id => !prevNodeIds.has(id));
      
      if (!nodesChanged) {
        // Just update the data without changing positions
        return prevNodes.map(prevNode => {
          const newNode = visibleNodes.find(n => n.id === prevNode.id);
          return newNode ? { ...newNode, position: prevNode.position, selected: prevNode.selected } : prevNode;
        });
      }
      
      // Nodes have changed, add/remove as needed
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

  // Custom node click handler to open info modal for leaf nodes
  const onNodeClick = useCallback((event, node) => {
    // Don't show modal for nodes that have children (parent nodes)
    const hasChildren = childMapMain[node.id] && childMapMain[node.id].length > 0;
    
    // Show modal if node has details and is not a parent node (or if it's a parent with content)
    if (nodeDetails[node.id] && !hasChildren) {
      setModal(node.id);
    } else if (nodeDetails[node.id] && hasChildren) {
      // For parent nodes, still show modal if they have content
      setModal(node.id);
    }
  }, [childMapMain]);

  const Mindmap = (
    <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes.map(n => ({
          ...n,
          draggable: true,
          style: {
            ...nodeBaseStyle,
            background: nodeBgColors[n.id] || nodeBaseStyle.background,
          },
        }))}
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
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow"
          onClick={() => setDetached(true)}
        >
          Detach (Full Screen)
        </button>
      </div>
      {Mindmap}
      {modal && nodeDetails[modal] && (
        <div style={{ 
          position: 'fixed', 
          left: 0, 
          bottom: 0, 
          width: '100vw', 
          height: 'auto', 
          background: 'rgba(255,255,255,0.98)', 
          zIndex: 2000, 
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
            {/* Visual on the left */}
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
            
            {/* Info on the right, horizontal layout, 2 columns */}
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
                    borderRadius: 7, 
                    padding: '8px 18px', 
                    fontWeight: 600, 
                    fontSize: 18, 
                    cursor: 'pointer', 
                    boxShadow: '0 2px 8px #0002', 
                    zIndex: 10 
                  }}
                >
                  Close
                </button>
              </div>
              <div style={{ 
                fontSize: 17, 
                color: '#333', 
                marginTop: 0, 
                whiteSpace: 'pre-wrap', 
                columnCount: 2, 
                columnGap: 40, 
                maxHeight: '480px', 
                overflowY: 'auto', 
                width: '100%' 
              }}>
                {stripMarkdown(removeVisual(nodeDetails[modal].details))}
              </div>
            </div>
          </div>
        </div>
      )}
      {detached && (
        <div style={{ 
          position: 'fixed', 
          zIndex: 1000, 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          background: 'rgba(30,40,60,0.92)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ 
            width: '90vw', 
            height: '90vh', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 4px 32px #0006', 
            position: 'relative', 
            padding: 24, 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <button
              onClick={() => setDetached(false)}
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 24, 
                zIndex: 10, 
                background: '#e53e3e', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 6, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer', 
                boxShadow: '0 2px 8px #0002' 
              }}
            >
              Close
            </button>
            <div style={{ flex: 1, minHeight: 0 }}>
              {Mindmap}
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default memo(ReadingMindmapTaskMastery);
