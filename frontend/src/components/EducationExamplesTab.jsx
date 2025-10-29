import React, { useState } from 'react';

const ExampleCard = ({ type, content }) => {
  const cardStyles = {
    tip: 'bg-green-100 border-green-500',
    trap: 'bg-red-100 border-red-500',
    prediction: 'bg-blue-100 border-blue-500'
  };

  const textStyles = {
    tip: 'text-green-800',
    trap: 'text-red-800',
    prediction: 'text-blue-800'
  };

  const titles = {
    tip: 'Tip',
    trap: 'Common Mistake',
    prediction: 'Prediction'
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${cardStyles[type]} mb-4`}>
      <h4 className={`font-bold ${textStyles[type]} mb-2`}>{titles[type]}</h4>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

const EducationExample = ({ example }) => {
  return (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Example</h3>
        <div className="prose max-w-none">
          {example.content}
        </div>
      </div>
      {example.tips.map((tip, index) => (
        <ExampleCard key={`tip-${index}`} type="tip" content={tip} />
      ))}
      {example.traps.map((trap, index) => (
        <ExampleCard key={`trap-${index}`} type="trap" content={trap} />
      ))}
      {example.predictions.map((prediction, index) => (
        <ExampleCard key={`prediction-${index}`} type="prediction" content={prediction} />
      ))}
    </div>
  );
};

export default function EducationExamplesTab({ examples }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex border-b mb-6">
        {examples.map((example, index) => (
          <button
            key={index}
            className={`px-6 py-2 font-semibold text-lg transition-colors duration-200 ${
              activeTab === index 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-primary'
            }`}
            onClick={() => setActiveTab(index)}
          >
            Example {index + 1}
          </button>
        ))}
      </div>
      
      <EducationExample example={examples[activeTab]} />
    </div>
  );
}