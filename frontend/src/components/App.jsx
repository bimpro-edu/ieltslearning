import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Task1Mindmap from "./Task1Mindmap";
import Task2Mindmap from "./Task2Mindmap";
import AdvancedWritingSkills from "./AdvancedWritingSkills";
import ListeningPage from "../pages/ListeningPage";

function App() {
  return (
    <Router>
      <div>
        {/* Add your navigation/menu here */}
        <Routes>
          <Route path="/task1" element={<Task1Mindmap />} />
          <Route path="/task2" element={<Task2Mindmap />} />
          {/* Add a route or section for AdvancedWritingSkills */}
          <Route path="/advanced-writing" element={<AdvancedWritingSkills />} />
          <Route path="/tasks/listening" element={<ListeningPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;