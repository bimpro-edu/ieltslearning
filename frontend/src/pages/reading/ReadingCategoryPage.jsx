import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadingCategorySidebar from '../../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../../components/ReadingCategoryCanvas';
import { getReadingTopicsForCategory } from '../../utils/readingTemplates';

// This page renders the sidebar (topics) and canvas (tips/traps/predictions) for a Reading category
export default function ReadingCategoryPage() {
  const { categoryKey, topicKey } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(topicKey);

  useEffect(() => {
    if (!topicKey) {
      const topics = getReadingTopicsForCategory(categoryKey);
      if (topics && topics.length > 0) {
        setSelectedTopic(topics[0].key);
      }
    }
  }, [categoryKey, topicKey]);

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
