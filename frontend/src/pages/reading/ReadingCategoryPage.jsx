import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReadingCategorySidebar from '../../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../../components/ReadingCategoryCanvas';

// This page renders the sidebar (topics) and canvas (tips/traps/predictions) for a Reading category
export default function ReadingCategoryPage() {
  const { categoryKey } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="flex min-h-screen bg-site-bg">
      <ReadingCategorySidebar 
        categoryKey={categoryKey} 
        selectedTopic={selectedTopic} 
        setSelectedTopic={setSelectedTopic} 
      />
      <main className="flex-1 p-6">
        <ReadingCategoryCanvas 
          categoryKey={categoryKey} 
          topicKey={selectedTopic} 
        />
      </main>
    </div>
  );
}