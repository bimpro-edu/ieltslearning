import React from 'react';

export default function Toolbar({ onAddNode, onExpandAll, onCollapseAll, onExport }) {
  return (
    <div className="flex items-center gap-3 bg-white border-b px-4 py-2 shadow-sm sticky top-0 z-10">
      <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={onAddNode}>Add Node</button>
      <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={onExpandAll}>Expand All</button>
      <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={onCollapseAll}>Collapse All</button>
      <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => onExport('png')}>Export PNG</button>
      <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => onExport('pdf')}>Export PDF</button>
    </div>
  );
}
