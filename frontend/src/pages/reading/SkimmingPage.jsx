import React, { useState, useEffect } from 'react';
import ReadingCategorySidebar from '../../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../../components/ReadingCategoryCanvas';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getReadingTopicsForCategory } from '../../utils/readingTemplates';

// A lightweight page that renders the existing "skimming" topic
// (which lives under the `core-reading-skills` category) at the
// new canonical URL `/reading/skimming` while preserving the
// full sidebar behavior (select topics, highlight active one).
export default function SkimmingPage() {
  const categoryKey = 'core-reading-skills';
  const defaultTopic = 'education';
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic);

  // If the category topics change, ensure we keep a valid selection
  useEffect(() => {
    const topics = getReadingTopicsForCategory(categoryKey) || [];
    const found = topics.find(t => t.key === selectedTopic);
    if (!found && topics.length > 0) {
      setSelectedTopic(topics[0].key);
    }
  }, [selectedTopic]);

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      <Header />
      <div className="flex flex-1">
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
      <Footer />
    </div>
  );
}
