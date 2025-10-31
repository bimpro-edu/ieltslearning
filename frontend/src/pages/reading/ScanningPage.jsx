import React, { useState, useEffect } from 'react';
import ReadingCategorySidebar from '../../components/ReadingCategorySidebar';
import ReadingCategoryCanvas from '../../components/ReadingCategoryCanvas';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getReadingTopicsForCategory } from '../../utils/readingTemplates';

// A lightweight page that renders the general Scanning tips at the
// new canonical URL `/reading/scanning` while preserving the
// full sidebar behavior (select topics, highlight active one).
export default function ScanningPage() {
  // Use a special category key so the template loader can return scanning-specific topics
  const categoryKey = 'core-reading-skills-scanning';
  // For sidebar we use the standard core-reading-skills topics (subjects)
  const sidebarCategory = 'core-reading-skills';
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const topics = getReadingTopicsForCategory(sidebarCategory) || [];
    return topics.length > 0 ? topics[0].key : null;
  });

  // Keep selection valid if topics change
  useEffect(() => {
    const topics = getReadingTopicsForCategory(sidebarCategory) || [];
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
          categoryKey={sidebarCategory}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <main className="flex-1 p-6">
          {/* Show scanning examples for the selected subject topic */}
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
