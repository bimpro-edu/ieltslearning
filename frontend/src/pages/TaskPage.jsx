import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import IELTS from '../ielts-data';
import MindMapViewer from '../components/MindMapViewer';
import Sidebar from '../components/Sidebar';

function getTaskData(taskType, category, subCategory) {
  if (taskType === 'task2') {
    return {
      data: IELTS.Task2[category],
      title: `Task 2 - ${category.replace(/([A-Z])/g, ' $1').trim()}`
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
  const { data: taskData, title } = getTaskData(taskType, category, subCategory);
  const [selectedMindMapIdx, setSelectedMindMapIdx] = useState(null); // null = template mode
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // --- Band/Template Data Structure Example (for both Task 1 and Task 2) ---
  // You should update your data source to match this structure for real data
  const bandTemplates = {
    5: [
      { name: 'Template A', content: [
        { key: 'Intro', value: 'Band 5 - Template A - Introduction example.' },
        { key: 'Body 1', value: 'Band 5 - Template A - Body 1.' },
        { key: 'Conclusion', value: 'Band 5 - Template A - Conclusion.' }
      ] },
      { name: 'Template B', content: [
        { key: 'Intro', value: 'Band 5 - Template B - Introduction.' },
        { key: 'Body 1', value: 'Band 5 - Template B - Body 1.' },
        { key: 'Conclusion', value: 'Band 5 - Template B - Conclusion.' }
      ] }
    ],
    6: [
      { name: 'Template A', content: [
        { key: 'Intro', value: 'Band 6 - Template A - Introduction.' },
        { key: 'Body 1', value: 'Band 6 - Template A - Body 1.' },
        { key: 'Conclusion', value: 'Band 6 - Template A - Conclusion.' }
      ] },
      { name: 'Template B', content: [
        { key: 'Intro', value: 'Band 6 - Template B - Introduction.' },
        { key: 'Body 1', value: 'Band 6 - Template B - Body 1.' },
        { key: 'Conclusion', value: 'Band 6 - Template B - Conclusion.' }
      ] }
    ],
    7: [
      { name: 'Template A', content: [
        { key: 'Intro', value: 'Band 7 - Template A - Introduction.' },
        { key: 'Body 1', value: 'Band 7 - Template A - Body 1.' },
        { key: 'Conclusion', value: 'Band 7 - Template A - Conclusion.' }
      ] },
      { name: 'Template B', content: [
        { key: 'Intro', value: 'Band 7 - Template B - Introduction.' },
        { key: 'Body 1', value: 'Band 7 - Template B - Body 1.' },
        { key: 'Conclusion', value: 'Band 7 - Template B - Conclusion.' }
      ] }
    ],
    8: [
      { name: 'Template A', content: [
        { key: 'Intro', value: 'Band 8 - Template A - Introduction.' },
        { key: 'Body 1', value: 'Band 8 - Template A - Body 1.' },
        { key: 'Conclusion', value: 'Band 8 - Template A - Conclusion.' }
      ] },
      { name: 'Template B', content: [
        { key: 'Intro', value: 'Band 8 - Template B - Introduction.' },
        { key: 'Body 1', value: 'Band 8 - Template B - Body 1.' },
        { key: 'Conclusion', value: 'Band 8 - Template B - Conclusion.' }
      ] }
    ]
  };
  const bandOptions = [5, 6, 7, 8];
  const [selectedBand, setSelectedBand] = useState(7); // Default to Band 7
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);

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
  // Flatten for sidebar
  const task1SidebarFlat = task1SidebarTopics.flatMap(g => g.topics.map(t => ({ group: g.group, topic: t })));

  // When a topic is selected, show mind map and hide template
  const handleTopicSelect = (idx) => {
    setSelectedMindMapIdx(idx);
  };

  // When a band is selected, reset template to first
  const handleBandChange = (e) => {
    setSelectedBand(Number(e.target.value));
    setSelectedTemplateIdx(0);
    setSelectedMindMapIdx(null);
  };

  // When a template is selected, show template and hide mind map
  const handleTemplateSelect = (idx) => {
    setSelectedMindMapIdx(null);
    setSelectedTemplateIdx(idx);
  };

  if (!taskData && taskType === 'task2') {
    return <div className="p-8 text-center text-red-500">Task data not found or is empty for this category.</div>;
  }
  const hasMindMap = taskType === 'task2'
    ? taskData && taskData.MindMapTopics && taskData.MindMapTopics.length > 0
    : true; // For Task 1, always show sidebar

  // Sidebar topics for Task 1 or Task 2
  const sidebarTopics = taskType === 'task2'
    ? (taskData?.MindMapTopics || []).map(t => t)
    : task1SidebarFlat;

  return (
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
          {hasMindMap && (
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
                  {bandTemplates[selectedBand].map((tpl, idx) => (
                    <button
                      key={tpl.name}
                      className={`px-3 py-1 rounded ${selectedMindMapIdx === null && selectedTemplateIdx === idx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      onClick={() => handleTemplateSelect(idx)}
                    >
        