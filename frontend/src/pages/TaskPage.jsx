import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IELTS from '../ielts-data';
import MindMapViewer from '../components/MindMapViewer';
import Sidebar from '../components/Sidebar';
import { loadTemplates } from '../utils/loadTemplates';
import Header from '../components/Header';
import Footer from '../components/Footer';

function getTaskData(taskType, category, subCategory) {
  if (taskType === 'task2') {
    // Capitalize first letter for Task2 data lookup (e.g., 'opinion' -> 'Opinion')
    const dataKey = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      data: IELTS.Task2[dataKey],
      title: `Task 2 - ${dataKey.replace(/([A-Z])/g, ' $1').trim()}`
    };
  }
  if (taskType === 'task1') {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const title = `Task 1 - ${formattedCategory} - ${subCategory.replace(/([A-Z])/g, ' $1').trim()}`;
    if (IELTS.Task1[formattedCategory] && IELTS.Task1[formattedCategory][subCategory]) {
      return { data: IELTS.Task1[formattedCategory][subCategory], title };
    }
    if (IELTS.Task1[formattedCategory] && IELTS.Task1[formattedCategory].Letter && IELTS.Task1[formattedCategory].Letter[subCategory]) {
      return { data: IELTS.Task1[formattedCategory].Letter[subCategory], title };
    }
  }
  return { data: null, title: 'Task Not Found' };
}

export default function TaskPage() {
  const { taskType, category, subCategory } = useParams();

  // Map route category to templateMap key
  const categoryKeyMap = {
    opinion: 'opinion',
    discussion: 'discussion',
    positivenegativedevelopment: 'positiveNegativeDevelopment',
    'positive-negative-development': 'positiveNegativeDevelopment',
    'positiveNegativeDevelopment': 'positiveNegativeDevelopment',
    // Add more mappings as needed
  };
  const normalizedCategory = categoryKeyMap[category?.toLowerCase()] || category;
  const { data: taskData, title } = getTaskData(taskType, normalizedCategory, subCategory);
  const [selectedMindMapIdx, setSelectedMindMapIdx] = useState(null); // null = template mode
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBand, setSelectedBand] = useState(7); // Default to Band 7
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [bandTemplates, setBandTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templateError, setTemplateError] = useState(null);

  // --- Task 1 Sidebar Topics ---
  const task1SidebarTopics = [
    { group: 'Graphs & Charts', topics: [
      'Line Graph', 'Bar Chart', 'Pie Chart', 'Table', 'Mixed Charts', 'Diagram with Trend Comparison'
    ]},
    { group: 'Processes & Diagrams', topics: [
      'Process Diagram', 'Cycle Diagram', 'Object / Mechanism Diagram'
    ]},
    { group: 'Maps & Spatial Representations', topics: [
      'Map', 'Multiple Maps', 'Plans / Floor Layouts'
    ]}
  ];
  const task1SidebarFlat = task1SidebarTopics.flatMap(g => g.topics.map(t => ({ group: g.group, topic: t })));


  // For Task 2, sidebar topics come directly from MindMapTopics (restoring original behavior)
  let sidebarTopics = [];
  if (taskType === 'task2') {
    sidebarTopics = (taskData?.MindMapTopics && Array.isArray(taskData.MindMapTopics)) ? taskData.MindMapTopics : [];
  } else {
    sidebarTopics = task1SidebarFlat;
  }

  // Band options
  const bandOptions = [5, 6, 7, 8];

  // Load templates dynamically
  useEffect(() => {
    setLoadingTemplates(true);
    setTemplateError(null);
    console.log('DEBUG: loadTemplates', { taskType, category: normalizedCategory, band: selectedBand });
    try {
      const templates = loadTemplates({ taskType, category: normalizedCategory, band: selectedBand });
      setBandTemplates(templates);
      setSelectedTemplateIdx(0);
      setLoadingTemplates(false);
    } catch (err) {
      setBandTemplates([]);
      setTemplateError('Failed to load templates.');
      setLoadingTemplates(false);
    }
  }, [taskType, normalizedCategory, selectedBand]);

  // Handlers
  const handleTopicSelect = (idx) => {
    setSelectedMindMapIdx(idx);
  };
  const handleBandChange = (e) => {
    setSelectedBand(Number(e.target.value));
    setSelectedTemplateIdx(0);
    setSelectedMindMapIdx(null);
  };
  const handleTemplateSelect = (idx) => {
    setSelectedMindMapIdx(null);
    setSelectedTemplateIdx(idx);
  };

  // Only show error for Task 1 if taskData is missing
  if (!taskData && taskType === 'task1') {
    return <div className="p-8 text-center text-red-500">Task data not found or is empty for this category.</div>;
  }

  // For Task 2, always show the sidebar if there are topics for the category
  const hasMindMap = sidebarTopics.length > 0;

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        {hasMindMap && (
          <Sidebar
            topics={sidebarTopics}
            selectedIdx={selectedMindMapIdx === null ? -1 : selectedMindMapIdx}
            onSelect={handleTopicSelect}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
            groupBy={taskType === 'task1' ? (t => t.group) : undefined}
            labelKey={taskType === 'task1' ? 'topic' : undefined}
          />
        )}
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Title */}
          <h1 className="text-2xl font-bold px-6 py-4 border-b bg-white sticky top-0 z-10">{title}</h1>
          <div className="overflow-y-auto flex-1 p-6">
            <div className="relative bg-white rounded-lg shadow-md" style={{ minHeight: 600 }}>
              {/* Band Dropdown and Template Tabs always sticky at the top of the canvas */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white border-b px-4 py-2 shadow-sm sticky top-0 z-20">
                <label className="font-semibold mr-2">Band:</label>
                <select
                  className="border rounded px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-primary-400"
                  value={selectedBand}
                  onChange={handleBandChange}
                >
                  {bandOptions.map(band => (
                    <option key={band} value={band}>{band === 8 ? 'Band 8+' : `Band ${band}`}</option>
                  ))}
                </select>
                <div className="flex gap-2 ml-4">
                  {bandTemplates.length > 0 ? (
                    bandTemplates.map((tpl, idx) => (
                      <button
                        key={tpl.name || idx}
                        className={`px-3 py-1 rounded ${selectedMindMapIdx === null && selectedTemplateIdx === idx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        onClick={() => handleTemplateSelect(idx)}
                      >
                        {tpl.name || `Template ${idx + 1}`}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No templates for this band/category.</span>
                  )}
                </div>
              </div>
              {/* Show template content or mind map */}
              {loadingTemplates ? (
                <div className="p-8 text-center text-gray-400">Loading templates...</div>
              ) : templateError ? (
                <div className="p-8 text-center text-red-500">{templateError}</div>
              ) : selectedMindMapIdx === null ? (
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-6">
                  {bandTemplates[selectedTemplateIdx] && Array.isArray(bandTemplates[selectedTemplateIdx].content) ? (
                    bandTemplates[selectedTemplateIdx].content.map((sentence, idx) => (
                      <div key={idx}>
                        <p className="text-gray-800 bg-gray-50 p-4 rounded whitespace-pre-wrap">{sentence}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-red-500">No template content available for this band.</div>
                  )}
                  {bandTemplates[selectedTemplateIdx]?.fullExample && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-blue-700 mb-2">Full Example</h3>
                      <pre className="bg-blue-50 text-blue-900 p-4 rounded whitespace-pre-wrap">{bandTemplates[selectedTemplateIdx].fullExample}</pre>
                    </div>
                  )}
                </div>
              ) : (
                // Mind Map view for Task 2: always show mind map for the selected topic (restored behavior)
                taskType === 'task2' ? (
                  <MindMapViewer mindMapData={sidebarTopics[selectedMindMapIdx]} />
                ) : (
                  <div className="flex items-center justify-center h-full text-lg text-gray-500">
                    <span>Show mind map, diagram, or sample for: <b>{sidebarTopics[selectedMindMapIdx]?.topic}</b></span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
