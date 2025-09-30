import React, { useState } from 'react';
import { getReadingTemplateForTopic } from '../utils/loadTemplates';

export default function ReadingCategoryCanvas({ categoryKey = 'core-reading-skills', topicKey }) {
  const [tab, setTab] = useState('tips');
  const template = getReadingTemplateForTopic(categoryKey, topicKey);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Reading Topic</h3>
          <p className="text-gray-500 max-w-md">
            Choose a topic from the sidebar to explore comprehensive tips, common traps, and strategic predictions for IELTS Reading success.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with topic title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{template.title}</h1>
        <p className="text-gray-600">Master this essential IELTS Reading skill with targeted strategies</p>
      </div>

      {/* Tab navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
        <button 
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
            tab === 'tips' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-white'
          }`} 
          onClick={() => setTab('tips')}
        >
          💡 Tips
        </button>
        <button 
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
            tab === 'traps' 
              ? 'bg-red-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-red-500 hover:bg-white'
          }`} 
          onClick={() => setTab('traps')}
        >
          ⚠️ Traps
        </button>
        <button 
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
            tab === 'predictions' 
              ? 'bg-green-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-green-500 hover:bg-white'
          }`} 
          onClick={() => setTab('predictions')}
        >
          🔮 Predictions
        </button>
      </div>

      {/* Content sections */}
      {tab === 'tips' && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">💡</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900">Strategic Tips</h3>
          </div>
          <div className="space-y-3">
            {template.tips.map((tip, i) => (
              <div key={i} className="flex items-start space-x-3 bg-white bg-opacity-70 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-800 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'traps' && (
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-red-900">Common Traps & Pitfalls</h3>
          </div>
          <div className="space-y-3">
            {template.traps.map((trap, i) => (
              <div key={i} className="flex items-start space-x-3 bg-white bg-opacity-70 rounded-lg p-4">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  !
                </div>
                <p className="text-gray-800 leading-relaxed">{trap}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'predictions' && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">🔮</span>
            </div>
            <h3 className="text-xl font-bold text-green-900">What to Expect</h3>
          </div>
          <div className="space-y-3">
            {template.predictions.map((prediction, i) => (
              <div key={i} className="flex items-start space-x-3 bg-white bg-opacity-70 rounded-lg p-4">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ✓
                </div>
                <p className="text-gray-800 leading-relaxed">{prediction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
