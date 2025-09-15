import React, { useState } from 'react';

export default function ParagraphImprovementExercise({ exercise }) {
  const [rewrittenParagraph, setRewrittenParagraph] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/exercises/${exercise.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ userId: 'user-123', rewritten_paragraph: rewrittenParagraph }),
      });
      const result = await response.json();
      if (response.ok) {
        setFeedback(result);
      } else {
        throw new Error(result.detail || 'Failed to submit');
      }
    } catch (error) {
      setFeedback({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  const renderReport = (report, title) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-4xl font-bold text-blue-600">{report.score}<span className="text-2xl text-gray-500">/9.0</span></p>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{exercise.title}</h2>
      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Original Paragraph:</h3>
        <p className="text-gray-700">{exercise.original_paragraph}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Your Improved Version:</h3>
        <textarea
          value={rewrittenParagraph}
          onChange={(e) => setRewrittenParagraph(e.target.value)}
          rows={8}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Rewrite the paragraph here..."
        />
      </div>
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
          <h3 className="text-xl font-bold mb-4 text-gray-900">Comparison Report</h3>
          {feedback.error ? (
            <p className="text-red-600 bg-red-50 p-4 rounded-md">{feedback.error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderReport(feedback.original_report, "Original Score")}
              {renderReport(feedback.rewritten_report, "Your Score")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
