import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListeningCategorySidebar from '../../components/ListeningCategorySidebar';
import ListeningCategoryCanvas from '../../components/ListeningCategoryCanvas';

// This page renders the sidebar (topics) and canvas (mindmap/tips/traps) for a Listening category
export default function ListeningCategoryPage() {
  const { categoryKey } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="flex min-h-screen bg-site-bg">
      <ListeningCategorySidebar categoryKey={categoryKey} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
      <main className="flex-1 p-6">
        <ListeningCategoryCanvas categoryKey={categoryKey} topicKey={selectedTopic} />
      </main>
    </div>
  );
}
