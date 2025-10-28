import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListeningCategorySidebar from '../../components/ListeningCategorySidebar';
import ListeningCategoryCanvas from '../../components/ListeningCategoryCanvas';

// This page renders the sidebar (topics) and canvas (mindmap/tips/traps) for a Listening category
export default function ListeningCategoryPage() {
  const { categoryKey, topicKey } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(topicKey || null);

  useEffect(() => {
    setSelectedTopic(topicKey || null);
  }, [topicKey]);

  return (
    <div className="flex min-h-screen bg-site-bg">
      <ListeningCategorySidebar categoryKey={categoryKey} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
      <main className="flex-1 p-6">
        <ListeningCategoryCanvas categoryKey={categoryKey} topicKey={selectedTopic} />
      </main>
    </div>
  );
}
