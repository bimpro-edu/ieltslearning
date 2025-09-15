import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonFill from '../components/SkeletonFill';
import ReorderExercise from '../components/ReorderExercise'; 
import ConnectorChoiceExercise from '../components/ConnectorChoiceExercise';
import ParagraphImprovementExercise from '../components/ParagraphImprovementExercise';

export default function ExercisePage() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    fetch(`/api/exercises/${exerciseId}`)
      .then(res => res.json())
      .then(setExercise);
  }, [exerciseId]);

  if (!exercise) return <div>Loading...</div>;

  const renderExercise = () => {
    switch (exercise.type) {
      case 'skeleton_fill':
        return <SkeletonFill exercise={exercise} />;
      case 'reorder':
        return <ReorderExercise exercise={exercise} />;
      case 'connector_choice':
        return <ConnectorChoiceExercise exercise={exercise} />;
      case 'paragraph_improvement':
        return <ParagraphImprovementExercise exercise={exercise} />;
      default:
        return <p>Unknown exercise type.</p>;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {renderExercise()}
    </div>
  );
}
