import React, { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ReadingCategorySidebar from '../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../components/ReadingCategoryCanvas';
import ReadingRoadmapFlow from '../components/ReadingRoadmapFlow';
import ReadingMindmap from '../components/ReadingMindmap';

const roadmap = [
	{
		title: 'Orientation',
		items: [
			'Purpose of Reading Module: Assess ability to understand academic texts, locate information, and process paraphrased details under time pressure.',
			'Format:',
			'  - Academic Reading: 3 long passages (~900 words each), 40 questions, 60 minutes.',
			'  - General Training Reading: Shorter, workplace & social texts + 1 long passage.',
			'Key Challenges:',
			'  - Vocabulary density',
			'  - Paraphrasing & synonyms',
			'  - Time management (20 min per passage guideline)',
			'  - Trap answers & distractors',
		],
	},
	{
		title: 'Foundations',
		items: [
			'Reading Skills:',
			'  - Skimming: Grabbing main idea quickly.',
			'  - Scanning: Locating specific facts (dates, names, numbers).',
			'  - Close Reading: For True/False/Not Given, inference, matching headings.',
			'Understanding Question Types:',
			'  - True/False/Not Given (TFNG)',
			'  - Yes/No/Not Given (YNNG)',
			'  - Matching headings',
			'  - Matching information/features',
			'  - Sentence completion',
			'  - Summary/Note/Table completion',
			'  - Multiple Choice Questions (MCQs)',
			'  - Short answer questions',
			'Building Vocabulary for Reading:',
			'  - Academic Word List (AWL)',
			'  - Synonyms and collocations',
			'  - Topic-based clusters (science, history, environment, society)',
		],
	},
	{
		title: 'Task Mastery (Step-by-Step Strategy per Question Type)',
		items: [
			'True/False/Not Given:',
			'  - Look for factual statements; beware of paraphrasing.',
			'  - Trap: assuming your knowledge — always stick to text.',
			'Matching Headings:',
			'  - Focus on main idea of each paragraph, not details.',
			'Summary/Note/Table Completion:',
			'  - Predict grammar & type of missing word (noun, verb, adj).',
			'  - Watch word limit (one word / two words).',
			'Multiple Choice:',
			'  - Eliminate wrong answers by spotting subtle differences.',
			'Matching Information/Features:',
			'  - Match details to paragraphs (look for synonyms, not exact matches).',
			'Short Answers:',
			'  - Write concise; spelling errors = wrong.',
		],
	},
	{
		title: 'Advanced Reading Skills',
		items: [
			'Paraphrase tracking: Spotting equivalent expressions.',
			'Inference skills: Reading beyond literal meaning.',
			'Time Management:',
			'  - 20 min per passage guideline.',
			'  - Move on if stuck, return later.',
			'Trap Awareness:',
			'  - Similar words ≠ correct answer.',
			'  - “Extreme” words often signal incorrect distractors.',
		],
	},
];

function RoadmapMindmapAccordion() {
	const [open, setOpen] = useState(0);
	const sections = [
		{ title: 'Orientation', key: 'orientation' },
		{ title: 'Foundations', key: 'foundations' },
		{ title: 'Task Mastery', key: 'mastery' },
		{ title: 'Advanced Skills', key: 'advanced' },
	];
	return (
		<div className="w-full max-w-4xl mx-auto mt-8">
			{sections.map((section, idx) => (
				<div key={section.title} className="mb-4">
					<button
						className={`w-full text-left px-6 py-4 rounded-t-lg font-bold text-lg bg-primary-50 border border-primary-200 focus:outline-none ${
							open === idx ? 'bg-primary-100' : ''
						}`}
						onClick={() => setOpen(open === idx ? -1 : idx)}
					>
						{section.title}
					</button>
					{open === idx && (
						<div className="bg-white border-x border-b border-primary-200 px-8 py-4 rounded-b-lg">
							<ReadingMindmap section={section.key} />
						</div>
					)}
				</div>
			))}
		</div>
	);
}

const ReadingPage = () => {
	const [tab, setTab] = useState(0);
	const [selectedTopic, setSelectedTopic] = useState(null);
	return (
		<>
			<Header />
			<div className="w-full max-w-6xl mx-auto px-2 py-8 flex">
				{tab === 1 && (
					<ReadingCategorySidebar
						selected={selectedTopic}
						onSelect={setSelectedTopic}
					/>
				)}
				<div
					className={`flex-1 bg-white rounded-xl shadow p-6 min-h-[400px]${
						tab === 1 ? ' ml-4' : ''
					}`}
				>
					<h1 className="text-3xl font-extrabold text-primary-700 mb-8 text-center">
						IELTS Reading Course
					</h1>
					<div className="flex justify-center mb-8">
						<button
							className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${
								tab === 0
									? 'border-primary-600 text-primary-700 bg-primary-50'
									: 'border-transparent text-gray-500 bg-white hover:bg-primary-50'
							}`}
							onClick={() => setTab(0)}
						>
							Guided Course Roadmap
						</button>
						<button
							className={`px-6 py-2 rounded-t-lg font-semibold text-lg border-b-2 transition-colors duration-200 ${
								tab === 1
									? 'border-primary-600 text-primary-700 bg-primary-50'
									: 'border-transparent text-gray-500 bg-white hover:bg-primary-50'
							}`}
							onClick={() => setTab(1)}
						>
							Lesson Library
						</button>
					</div>
					<div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
						{tab === 0 ? <RoadmapMindmapAccordion /> : <ReadingCategoryCanvas topicKey={selectedTopic} />}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ReadingPage;
