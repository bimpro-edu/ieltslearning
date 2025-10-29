import React from 'react';

export default function ExampleCard({ type, content }) {
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
}