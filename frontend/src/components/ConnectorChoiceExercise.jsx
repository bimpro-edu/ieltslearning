import React, { useState } from 'react';

export default function ConnectorChoiceExercise({ exercise }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (selectedAnswer === null) {
      setFeedback({ feedback: "Please select an answer.", is_correct: false });
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/exercises/${exercise.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-123', answer: selectedAnswer }),
      });
      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      setFeedback({ feedback: 'An error occurred.', is_correct: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{exercise.title}</h2>
      <p className="text-lg my-4 p-4 bg-gray-50 rounded-md">{exercise.text.replace('______', '______')}</p>
      <div className="space-y-3">
        {exercise.choices.map((choice, index) => (
          <label key={index} className="flex items-center p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
            <input
              type="radio"
              name="connector-choice"
              value={choice}
              checked={selectedAnswer === choice}
              onChange={() => setSelectedAnswer(choice)}
              className="mr-3"
            />
            {choice}
          </label>
        ))}
      </div>
      <div className="flex gap-2 mt-6">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Answer'}
        </button>
      </div>
      {feedback && (
        <div className={`mt-4 p-3 rounded-md ${feedback.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p>{feedback.feedback}</p>
        </div>
      )}
    </div>
  );
}
