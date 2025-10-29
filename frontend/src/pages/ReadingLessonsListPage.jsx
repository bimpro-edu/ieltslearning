import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LessonCard = ({ title, description, to }) => (
  <Link to={to || '#'} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:border-primary-500 hover:border-2">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-base flex-1">{description}</p>
  </Link>
);

const readingClusters = [
  {
    key: 'core-reading-skills',
    title: 'Core Reading Skills',
    color: 'bg-blue-50',
    lessons: [
      {
        key: 'predicting',
        title: 'Predicting Content',
        description: 'Before you read, look at the title, subtitle, and any images. For example, a title like "The Revolution in Urban Transport" suggests the text will discuss changes in city travel. This simple step prepares your mind for the topic.',
        to: '/reading/core-skills/predicting'
      },
      {
        key: 'skimming',
        title: 'Skimming for Gist',
        description: 'Read the first and last paragraphs, and the first sentence of all other paragraphs. This gives you a quick overview. For instance, in an article about climate change, skimming helps you quickly grasp the main arguments without getting lost in data.',
        to: '/reading/skimming'
      },
      {
        key: 'scanning',
        title: 'Scanning for Specific Information',
        description: 'To find a name like "Dr. Evans," let your eyes float across the lines, looking only for the capital E or the shape of the name. This is much faster than reading every word. Use it to find dates, numbers, and keywords from the question.',
        to: '/reading/core-skills/scanning'
      },
      {
        key: 'paragraph-structure',
        title: 'Understanding Paragraph Structure',
        description: "Most paragraphs have a topic sentence (the main idea) and supporting sentences (details, examples). Finding the topic sentence is key to understanding the paragraph's purpose, which is crucial for matching headings.",
        to: '/reading/core-skills/paragraph-structure'
      },
    ]
  },
  {
    key: 'question-types',
    title: 'Question Types & Strategies',
    color: 'bg-green-50',
    lessons: [
      {
        key: 'true-false-not-given',
        title: 'True/False/Not Given',
        description: "TRUE means the text agrees. FALSE means the text contradicts. NOT GIVEN means the information isn't there. Example: If the text says \"The project cost $5 million,\" a statement that it cost \"$6 million\" is FALSE. A statement that \"The project was successful\" is NOT GIVEN if the text doesn't mention success.",
        to: '/lessons/reading/true-false-not-given'
      },
      {
        key: 'matching-headings',
        title: 'Matching Headings',
        description: 'Read the headings first, then read the paragraphs one by one. After reading a paragraph, choose the heading that best summarizes its main idea. For example, a paragraph describing the effects of pollution on marine life might match the heading "The impact of pollution on underwater ecosystems.',
        to: '/lessons/reading/matching-headings'
      },
      {
        key: 'multiple-choice',
        title: 'Multiple Choice',
        description: 'Read the question and stem, then try to answer it in your own words before looking at the options. This helps you avoid tempting but incorrect distractors. Always check that your chosen option is supported by evidence in the text.',
        to: '/lessons/reading/multiple-choice'
      },
      {
        key: 'sentence-completion',
        title: 'Sentence Completion',
        description: 'The answers are usually in order in the passage. Pay attention to grammar; the completed sentence must be grammatically correct. For example, if the sentence requires a verb, make sure you choose a verb from the text.',
        to: '/lessons/reading/sentence-completion'
      },
      {
        key: 'summary-completion',
        title: 'Summary, Note, Table, Flow-chart Completion',
        description: 'This tests your ability to synthesize information. Skim the summary first to understand the general meaning. The answers often come from a specific section of the text and are usually in order.',
        to: '/lessons/reading/summary-completion'
      },
      {
        key: 'diagram-labelling',
        title: 'Diagram Label Completion',
        description: 'The answers are almost always in one concentrated part of the text. Use the labels you already understand to orient yourself. The description in the text will follow a logical sequence around the diagram.',
        to: '/lessons/reading/diagram-labelling'
      },
      {
        key: 'short-answer',
        title: 'Short-answer Questions',
        description: 'Pay strict attention to the word limit (e.g., "NO MORE THAN TWO WORDS"). Answers are found in the order they appear in the text. Use the keywords from the question to scan for the right information.',
        to: '/lessons/reading/short-answer'
      },
    ]
  },
  {
    key: 'advanced-skills',
    title: 'Advanced Reading Skills',
    color: 'bg-yellow-50',
    lessons: [
      {
        key: 'inference',
        title: 'Inference and Implied Meaning',
        description: "If an author describes a character as having \"trembling hands and a pale face\" before a presentation, you can infer the character is nervous, even if the word \"nervous\" is never used. This is about understanding the writer's suggestions.",
        to: '/lessons/reading/inference'
      },
      {
        key: 'author-purpose',
        title: "Identifying Author's Purpose, Tone, and Attitude",
        description: "Is the author trying to persuade you, inform you, or entertain you? Is their tone objective, critical, or supportive? Look at the choice of words (e.g., \"unfortunately,\" \"surprisingly\") to understand the author's viewpoint.",
        to: '/lessons/reading/author-purpose'
      },
      {
        key: 'argument',
        title: 'Following a Detailed Argument',
        description: 'An author might present a claim, support it with evidence, and then address counter-arguments. Break down complex sentences and identify linking words (e.g., "however," "therefore") to follow the logical flow of the argument.',
        to: '/lessons/reading/argument'
      },
    ]
  },
];

export default function ReadingLessonsListPage({ hideHeaderFooter }) {
  const [openClusterIdx, setOpenClusterIdx] = useState(0);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">IELTS Reading Lesson Library</h1>
          <div className="space-y-12">
            {readingClusters.map((cluster, idx) => {
              const clusterKey = cluster.key;
              return (
                <div key={cluster.title} className={`rounded-lg shadow ${cluster.color}`}>
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none text-left text-2xl font-semibold text-primary-700 hover:bg-opacity-80 transition"
                    onClick={() => setOpenClusterIdx(openClusterIdx === idx ? -1 : idx)}
                    aria-expanded={openClusterIdx === idx}
                  >
                    <span>{cluster.title}</span>
                    <span className="ml-4 text-xl">{openClusterIdx === idx ? '−' : '+'}</span>
                  </button>
                  {openClusterIdx === idx && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <LessonCard
                          key={clusterKey}
                          title={`Explore ${cluster.title}`}
                          description={`View all topics, tips, and mindmaps for ${cluster.title}.`}
                          to={`/reading/${clusterKey}`}
                        />
                        {cluster.lessons.map(lesson => (
                          <LessonCard key={lesson.key} title={lesson.title} description={lesson.description} to={`/reading/${clusterKey}/${lesson.key}`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}