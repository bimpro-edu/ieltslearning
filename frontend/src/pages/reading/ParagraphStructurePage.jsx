import React, { useState, useEffect } from 'react';
import ReadingCategorySidebar from '../../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../../components/ReadingCategoryCanvas';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getParagraphStructureTopics } from '../../utils/paragraphStructureTemplates';

const CollapsibleSection = ({ title, children, type = 'tips' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const bgColors = {
    tips: 'bg-green-50',
    mistakes: 'bg-red-50',
    predictions: 'bg-blue-50'
  };

  const textColors = {
    tips: 'text-green-800',
    mistakes: 'text-red-800',
    predictions: 'text-blue-800'
  };

  return (
    <div className={`my-4 rounded-lg ${bgColors[type]}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 text-left font-semibold ${textColors[type]} flex justify-between items-center`}
      >
        <span>{title}</span>
        <span>{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

const ContentBlock = ({ item, index }) => {
  switch (item.type) {
    case 'h2':
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-red-600">{item.text}</h2>;
    case 'h3':
      return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-800">{item.text}</h3>;
    case 'p':
      return <p key={index} className="mb-4 text-gray-700">{item.text}</p>;
    case 'list':
      return (
        <ul key={index} className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
          {item.items.map((listItem, i) => (
            <li key={i}>{listItem}</li>
          ))}
        </ul>
      );
    case 'example':
      return (
        <div key={index} className="p-4 my-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="font-semibold mb-2 text-gray-800">[QUICK FOCUS]</p>
          <p className="text-gray-700">{item.text}</p>
        </div>
      );
    case 'tip':
      return (
        <CollapsibleSection title="▶ Tips" type="tips">
          <p className="text-gray-700">{item.text}</p>
        </CollapsibleSection>
      );
    default:
      return null;
  }
};

const Exercise = ({ exercise, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  switch (exercise.type) {
    case 'structure-identification':
    case 'paragraph-pattern':
      return (
        <div key={index} className="mb-6">
          <CollapsibleSection 
            title={`▶ ${exercise.title}`} 
            type="predictions"
          >
            {exercise.text && <p className="mb-4 text-gray-700">{exercise.text}</p>}
            <div className="space-y-6">
              {exercise.questions.map((q, i) => (
                <div key={i} className="space-y-3">
                  <p className="font-medium text-gray-800">{q.question}</p>
                  <button
                    onClick={() => setShowAnswer(prev => !prev)}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  {showAnswer && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-800">Answer:</p>
                      <p className="text-gray-700">{q.answer}</p>
                      {q.explanation && (
                        <p className="mt-2 text-gray-600">
                          <span className="font-medium">Explanation:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      );
    default:
      return null;
  }
};

export default function ParagraphStructurePage() {
  const categoryKey = 'paragraph-structure';
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const topics = getParagraphStructureTopics(categoryKey) || [];
    return topics.length > 0 ? topics[0].key : null;
  });

  // Keep selection valid if topics change
  useEffect(() => {
    const topics = getParagraphStructureTopics(categoryKey) || [];
    const found = topics.find(t => t.key === selectedTopic);
    if (!found && topics.length > 0) {
      setSelectedTopic(topics[0].key);
    }
  }, [selectedTopic]);

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Header />
      <div className="flex flex-1">
        <ReadingCategorySidebar
          categoryKey={categoryKey}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <main className="flex-1 p-6">
          <ReadingCategoryCanvas
            categoryKey={categoryKey}
            topicKey={selectedTopic}
            sectionTitle="Reading: Understanding Paragraph Structure"
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
