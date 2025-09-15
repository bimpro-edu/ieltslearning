import React from 'react';

export default function Sidebar({ topics, selectedIdx, onSelect, collapsed, onToggleCollapse }) {
  return (
    <div className={`h-full bg-white border-r shadow-md flex flex-col transition-all duration-300 ${collapsed ? 'w-12' : 'w-64'}`}
         style={{ minWidth: collapsed ? 48 : 256 }}>
      <button
        className="p-2 focus:outline-none hover:bg-gray-100 border-b"
        onClick={onToggleCollapse}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        <span className="material-icons text-gray-600">{collapsed ? 'chevron_right' : 'chevron_left'}</span>
      </button>
      <div className={`flex-1 overflow-y-auto ${collapsed ? 'hidden' : ''}`}
           style={{ scrollbarWidth: 'thin' }}>
        {topics.map((topic, idx) => (
          <button
            key={topic.topic}
            className={`block w-full text-left px-4 py-2 border-b hover:bg-blue-50 transition-colors ${selectedIdx === idx ? 'bg-blue-100 font-bold text-blue-700' : 'text-gray-800'}`}
            onClick={() => onSelect(idx)}
          >
            {topic.topic}
          </button>
        ))}
      </div>
    </div>
  );
}
