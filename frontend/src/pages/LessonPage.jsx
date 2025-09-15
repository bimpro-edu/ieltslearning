import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then(res => res.json())
      .then(setLesson);
  }, [lessonId]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <div className="prose lg:prose-xl">
        {lesson.content.map((item, index) => {
          if (item.type === 'p') {
            return <p key={index}>{item.text}</p>;
          }
          if (item.type === 'example') {
            return (
              <div key={index} className={`p-4 my-4 border-l-4 ${item.band === '5' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
                <p className="font-semibold">Band {item.band} Example:</p>
                <p>{item.text}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
        <ul className="list-disc pl-5">
          {lesson.exercises.map(exerciseId => (
            <li key={exerciseId}>
              <Link to={`/exercises/${exerciseId}`} className="text-blue-600 hover:underline">
                {exerciseId}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
