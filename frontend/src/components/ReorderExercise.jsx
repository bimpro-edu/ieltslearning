import React, { useState } from 'react';

export default function ReorderExercise({ exercise }) {
  const [items, setItems] = useState(exercise.scrambled_sentences.map((text, index) => ({ id: index, text })));
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const handleDragOver = (index) => {
    const draggedOverItem = items[index];
    if (draggedItem === draggedOverItem) {
      return;
    }
    let newItems = items.filter(item => item !== draggedItem);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  async function handleSubmit() {
    setLoading(true);
    setFeedback(null);
    const submittedOrder = items.map(item => item.id);
    try {
      const response = await fetch(`/api/exercises/${exercise.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-123', answers: submittedOrder }),
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
      <div className="my-4 p-4 bg-gray-50 rounded-md">
        <p className="text-gray-600">Drag and drop the sentences into the correct order.</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            onDragOver={() => handleDragOver(index)}
            className="p-3 bg-gray-100 rounded-md cursor-move border border-gray-200"
          >
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
            >
              {item.text}
            </div>
          </li>
        ))}
      </ul>
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
