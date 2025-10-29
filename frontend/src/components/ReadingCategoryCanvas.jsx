import React, { useState, useEffect, useRef } from "react";
import { getReadingTemplateForTopic } from "../utils/readingTemplates";

export default function ReadingCategoryCanvas({ categoryKey, topicKey }) {
  const [activeExample, setActiveExample] = useState(0);
  const [expandAll, setExpandAll] = useState(false);
  const containerRef = useRef(null);

  // Reset activeExample when topic changes
  useEffect(() => {
    setActiveExample(0);
    setExpandAll(false);
  }, [topicKey]);

  // Toggle details open state inside the canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const details = containerRef.current.querySelectorAll('details');
    details.forEach(d => {
      try { d.open = expandAll; } catch (e) { /* ignore */ }
    });
  }, [expandAll, topicKey, activeExample]);

  if (!topicKey) {
    return <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>;
  }

  const template = getReadingTemplateForTopic(categoryKey, topicKey);

  // Early return if no template
  if (!template) {
    return <div className="text-gray-500 text-lg mt-12 text-center">No data available for this topic.</div>;
  }

  // If the template provides examples (e.g., predicting templates), ensure bounds and compute currentExample
  if (template.examples && Array.isArray(template.examples) && template.examples.length > 0) {
    // Keep activeExample within bounds
    const safeActiveExample = Math.min(activeExample, template.examples.length - 1);
    if (safeActiveExample !== activeExample) {
      setActiveExample(safeActiveExample);
    }
  }

  // Get the current example safely
  const currentExample = template.examples && template.examples.length > 0 ? template.examples[activeExample] : null;

  return (
    <div ref={containerRef} className="bg-gray-50 rounded-xl shadow-lg p-6 min-h-[calc(100vh-2rem)]">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-3xl font-bold text-primary">{template.title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpandAll(prev => !prev)}
            className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 focus:outline-none"
            aria-pressed={expandAll}
          >
            <svg className={`w-4 h-4 mr-2 transform ${expandAll ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
            {expandAll ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
      </div>
      {template.examples ? (
        <div className="space-y-6">
          <div className="flex space-x-1 rounded-lg bg-gray-200 p-1">
            {template.examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 ${
                  activeExample === index 
                    ? "bg-primary text-white shadow" 
                    : "text-gray-600 hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {currentExample && (
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">{currentExample.title}</h3>
                <div className="prose max-w-none mb-4">{currentExample.content}</div>
              </div>

              {currentExample.tips && (
                <details className="border border-green-100 rounded-lg bg-green-50">
                  <summary className="cursor-pointer p-3 font-semibold text-green-700">Tips</summary>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {currentExample.tips.map((tip, i) => (
                        <li key={i} className="flex text-green-800">
                          <span className="text-green-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}

              {currentExample.mistakes && (
                <details className="border border-red-100 rounded-lg bg-red-50">
                  <summary className="cursor-pointer p-3 font-semibold text-red-700">Common Mistakes</summary>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {currentExample.mistakes.map((mistake, i) => (
                        <li key={i} className="flex text-red-800">
                          <span className="text-red-500 mr-2">•</span>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}

              {currentExample.predictions && (
                <details className="border border-blue-100 rounded-lg bg-blue-50">
                  <summary className="cursor-pointer p-3 font-semibold text-blue-700">Predictions</summary>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {currentExample.predictions.map((prediction, i) => (
                        <li key={i} className="flex text-blue-800">
                          <span className="text-blue-500 mr-2">•</span>
                          {prediction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {template.tips && (
            <details className="border border-green-100 rounded-lg bg-green-50">
              <summary className="cursor-pointer p-3 font-semibold text-green-700">Tips</summary>
              <div className="p-4">
                <ul className="space-y-2">
                  {template.tips.map((tip, i) => (
                    <li key={i} className="flex text-green-800">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        {typeof tip === "string" ? tip : tip.statement}
                        {tip.example && (
                          <p className="text-sm text-gray-500 ml-4 italic">
                            e.g., {tip.example}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}

          {template.traps && (
            <details className="border border-red-100 rounded-lg bg-red-50">
              <summary className="cursor-pointer p-3 font-semibold text-red-700">Common Mistakes</summary>
              <div className="p-4">
                <ul className="space-y-2">
                  {template.traps.map((trap, i) => (
                    <li key={i} className="flex text-red-800">
                      <span className="text-red-500 mr-2">•</span>
                      <div>
                        {typeof trap === "string" ? trap : trap.statement}
                        {trap.example && (
                          <p className="text-sm text-gray-500 ml-4 italic">
                            e.g., {trap.example}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}

          {template.predictions && (
            <details className="border border-blue-100 rounded-lg bg-blue-50">
              <summary className="cursor-pointer p-3 font-semibold text-blue-700">Predictions</summary>
              <div className="p-4">
                <ul className="space-y-2">
                  {template.predictions.map((p, i) => (
                    <li key={i} className="flex text-blue-800">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        {typeof p === "string" ? p : p.statement}
                        {p.example && (
                          <p className="text-sm text-gray-500 ml-4 italic">
                            e.g., {p.example}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}