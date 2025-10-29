import { useState } from "react";
import { getReadingTemplateForTopic } from "../utils/loadTemplates";

export default function ReadingCategoryCanvas({ categoryKey, topicKey }) {
  const [activeExample, setActiveExample] = useState(0);

  if (!topicKey) {
    return <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>;
  }

  const template = getReadingTemplateForTopic(categoryKey, topicKey);

  if (!template) {
    return <div className="text-gray-500 text-lg mt-12 text-center">No data available for this topic.</div>;
  }

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 min-h-[calc(100vh-2rem)]">
      <h2 className="text-3xl font-bold mb-6 text-primary">{template.title}</h2>
      
      {categoryKey === "predicting" ? (
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

          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">{template.examples[activeExample].title}</h3>
              <div className="prose max-w-none mb-4">{template.examples[activeExample].content}</div>
            </div>

            {template.examples[activeExample].tips && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-3">Tips</h4>
                <ul className="space-y-2">
                  {template.examples[activeExample].tips.map((tip, i) => (
                    <li key={i} className="flex text-green-800">
                      <span className="text-green-500 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {template.examples[activeExample].mistakes && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-600 mb-3">Common Mistakes</h4>
                <ul className="space-y-2">
                  {template.examples[activeExample].mistakes.map((mistake, i) => (
                    <li key={i} className="flex text-red-800">
                      <span className="text-red-500 mr-2">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {template.examples[activeExample].predictions && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Predictions</h4>
                <ul className="space-y-2">
                  {template.examples[activeExample].predictions.map((prediction, i) => (
                    <li key={i} className="flex text-blue-800">
                      <span className="text-blue-500 mr-2">•</span>
                      {prediction}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {template.tips && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-600 mb-3">Tips</h4>
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
          )}

          {template.traps && (
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-600 mb-3">Common Mistakes</h4>
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
          )}

          {template.predictions && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-3">Predictions</h4>
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
          )}
        </div>
      )}
    </div>
  );
}
