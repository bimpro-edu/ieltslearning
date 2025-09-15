import React, { useState } from 'react';

export default function SkeletonFill({ exercise }) {
  const [answers, setAnswers] = useState(() => exercise.skeleton.map(() => ''));
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(i, v) {
    const newAnswers = [...answers];
    newAnswers[i] = v;
    setAnswers(newAnswers);
  }

  async function handleSubmit() {
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/exercises/${exercise.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-123', answers: answers }),
      });
      const result = await response.json();
      if (response.ok) {
        setFeedback(result.report);
      } else {
        throw new Error(result.detail || 'Failed to submit');
      }
    } catch (error) {
      setFeedback({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{exercise.title}</h2>
      <ol className="mt-4 space-y-4">
        {exercise.skeleton.map((s, i) => (
          <li key={i}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{s.prompt}</label>
            <textarea
              value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={s.hint || ''}
            />
          </li>
        ))}
      </ol>
      <div className="flex gap-2 mt-6">
        <button 
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Grading...' : 'Submit for Feedback'}
        </button>
      </div>
      {feedback && (
    <div className="mt-6 border-t pt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Feedback Report</h3>
        {feedback.error ? (
            <p className="text-red-600 bg-red-50 p-4 rounded-md">{feedback.error}</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">Overall Score</h4>
                    <p className="text-4xl font-bold text-blue-600">{feedback.score}<span className="text-2xl text-gray-500">/9.0</span></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow space-y-3">
                    <div className="flex justify-between"><span>Paragraphs:</span> <span className="font-semibold">{feedback.n_paragraphs}</span></div>
                    <div className="flex justify-between"><span>Transition Words:</span> <span className="font-semibold">{feedback.transitions_found}</span></div>
                    <div className="flex justify-between"><span>Avg. Sentence Length:</span> <span className="font-semibold">{feedback.avg_sentence_len}</span></div>
                    <div className="flex justify-between"><span>Sentence Length Variation:</span> <span className="font-semibold">{feedback.sentence_len_std_dev}</span></div>
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">Parts of Speech Analysis</h4>
                    <div className="flex flex-wrap gap-4">
                        {feedback.pos_counts && Object.entries(feedback.pos_counts).map(([pos, count]) => (
                            <div key={pos} className="text-center">
                                <p className="font-mono text-sm text-gray-500">{pos}</p>
                                <p className="font-bold text-xl">{count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
)}
    </div>
  );
}
