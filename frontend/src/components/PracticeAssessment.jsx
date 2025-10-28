import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export function PracticeAssessment({ isOpen, onClose, studentAnswer, modelAnswer, exerciseType, topic, practiceTime }) {
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePractice = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const exampleFeedback = {
      score: 7.5,
      timing: practiceTime < 120 ? 'Good' : 'Too slow',
      strengths: [
        'Captured main ideas',
        'Good note organization',
        'Used appropriate abbreviations'
      ],
      weaknesses: [
        'Missed some numerical details',
        'Could improve speed',
        'Some key points missing'
      ],
      suggestions: [
        'Practice with more timed exercises',
        'Focus on capturing numbers accurately',
        'Develop a personal shorthand system'
      ]
    };
    
    setFeedback(exampleFeedback);
    setIsAnalyzing(false);
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Practice Assessment - {topic}
          </Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Your Notes</h3>
              <div className="p-3 bg-gray-50 rounded min-h-[200px] whitespace-pre-wrap">
                {studentAnswer || 'No notes taken'}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Model Notes</h3>
              <div className="p-3 bg-gray-50 rounded min-h-[200px] whitespace-pre-wrap">
                {modelAnswer}
              </div>
            </div>
          </div>

          {!feedback && !isAnalyzing && (
            <div className="text-center mb-6">
              <button
                onClick={analyzePractice}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Analyze Practice
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center mb-6">
              <div className="animate-pulse text-gray-600">
                Analyzing your practice...
              </div>
            </div>
          )}

          {feedback && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <span className="font-medium">Overall Score:</span>
                <span className="text-xl font-semibold text-blue-600">
                  {feedback.score}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <span className="font-medium">Timing:</span>
                <span className={feedback.timing === 'Good' ? 'text-green-600' : 'text-yellow-600'}>
                  {feedback.timing} ({Math.floor(practiceTime / 60)}:{(practiceTime % 60).toString().padStart(2, '0')})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700 flex items-center gap-1">
                    <CheckCircleIcon className="h-5 w-5" />
                    Strengths
                  </h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {feedback.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-gray-600">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-red-700 flex items-center gap-1">
                    <XCircleIcon className="h-5 w-5" />
                    Areas for Improvement
                  </h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {feedback.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm text-gray-600">{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Suggestions for Improvement
                </h4>
                <ul className="list-disc ml-5 space-y-1">
                  {feedback.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-sm text-gray-600">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}