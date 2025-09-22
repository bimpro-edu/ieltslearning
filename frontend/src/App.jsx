import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LessonsListPage from './pages/LessonsListPage';
import WritingPage from './pages/WritingPage';
import ExercisePage from './pages/ExercisePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TeacherDashboard from './pages/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TaskPage from './pages/TaskPage'; // Import TaskPage

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<Navigate to="/tasks/writing" replace />} />
          <Route path="/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/tasks/writing" element={<WritingPage />} />
          <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
          {/* New Task Routes */}
          <Route path="/tasks/:taskType/:category/" element={<TaskPage />} />
          <Route path="/tasks/:taskType/:category/:subCategory" element={<TaskPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function AuthButtons() {
    const { isAuthenticated, logout } = useAuth();
    return isAuthenticated ? (
        <>
            <Link to="/teacher/dashboard" className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Dashboard</Link> {/* Changed text-gray-500 and hover */}
            <button onClick={logout} className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Logout</button> {/* Changed text-gray-500 and hover */}
        </>
    ) : (
        <Link to="/login" className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Login</Link> 
    );
}

export default App;