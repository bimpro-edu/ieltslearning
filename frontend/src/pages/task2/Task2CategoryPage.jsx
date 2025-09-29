import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Task2CategorySidebar';
import Canvas from '../../components/Task2CategoryCanvas';

// This page renders the sidebar (topics) and canvas (mindmap/tips/traps) for a Task 2 category
export default function Task2CategoryPage() {
  const { categoryKey } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="flex min-h-screen bg-site-bg">
      <Sidebar categoryKey={categoryKey} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
      <main className="flex-1 p-6">
        <Canvas categoryKey={categoryKey} topicKey={selectedTopic} />
      </main>
    </div>
  );
}
