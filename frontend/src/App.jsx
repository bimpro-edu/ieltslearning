import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROUTES } from './constants/routes.js';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LessonsListPage from './pages/LessonsListPage';
import WritingPage from './pages/WritingPage';
import ListeningPage from './pages/ListeningPage';
import ListeningCategoryPage from './pages/listening/ListeningCategoryPage';
import ExercisePage from './pages/ExercisePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TeacherDashboard from './pages/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TaskPage from './pages/TaskPage'; // Import TaskPage
import ReadingPage from './pages/ReadingPage'; // Import ReadingPage
import ReadingCategoryPage from './pages/reading/ReadingCategoryPage';
import SkimmingPage from './pages/reading/SkimmingPage';
import ScanningPage from './pages/reading/ScanningPage';
import ParagraphStructurePage from './pages/reading/ParagraphStructurePage';

import ReadingLessonsListPage from './pages/ReadingLessonsListPage';
import Task2CategoryPage from './pages/task2/Task2CategoryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Core Routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          
          {/* Auth Routes */}
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.AUTH.TEACHER_DASHBOARD} element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
          
          {/* Reading Module */}
          <Route path={ROUTES.READING.HOME} element={<ReadingPage />} />
          <Route path="/reading/skimming" element={<SkimmingPage />} />
          <Route path="/reading/scanning" element={<ScanningPage />} />
          <Route path="/reading/paragraph-structure" element={<ParagraphStructurePage />} />
          {/* Redirect old skimming/scanning URLs to the new short URLs */}
          <Route path="/reading/core-reading-skills/skimming" element={<Navigate to="/reading/skimming" replace />} />
          <Route path="/reading/core-skills/skimming" element={<Navigate to="/reading/skimming" replace />} />
          <Route path="/reading/core-reading-skills/scanning" element={<Navigate to="/reading/scanning" replace />} />
          <Route path="/reading/core-skills/scanning" element={<Navigate to="/reading/scanning" replace />} />
          <Route path="/reading/core-reading-skills/paragraph-structure" element={<Navigate to="/reading/paragraph-structure" replace />} />
          <Route path="/reading/core-skills/paragraph-structure" element={<Navigate to="/reading/paragraph-structure" replace />} />
          <Route path="/reading/core-reading-skills/predicting" element={<Navigate to="/reading/predicting" replace />} />
          <Route path="/reading/:categoryKey/:topicKey" element={<ReadingCategoryPage />} />
          <Route path="/reading/:categoryKey" element={<ReadingCategoryPage />} />
          
          {/* Listening Module */}
          <Route path={ROUTES.LISTENING.HOME} element={<ListeningPage />} />
          <Route path="/listening/:categoryKey/:topicKey" element={<ListeningCategoryPage />} />
          <Route path="/listening/:categoryKey" element={<ListeningCategoryPage />} />
          
          {/* Task Routes */}
          <Route path={ROUTES.TASKS.WRITING} element={<WritingPage />} />
          <Route path={ROUTES.TASKS.LISTENING} element={<ListeningPage />} />
          <Route path={ROUTES.TASKS.READING} element={<ReadingPage />} />

          {/* Task 2 Writing Category Pages */}
          <Route path="/tasks/writing/task2/:categoryKey" element={<Task2CategoryPage />} />

          <Route path="/tasks/:taskType/:category/" element={<TaskPage />} />
          <Route path="/tasks/:taskType/:category/:subCategory" element={<TaskPage />} />
          
          {/* Exercise Routes */}
          <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
          
          {/* Legacy Routes */}
          <Route path="/lessons" element={<Navigate to={ROUTES.TASKS.WRITING} replace />} />
          <Route path="/lessons/:type/:lessonId" element={<LessonPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function AuthButtons() {
    const { isAuthenticated, logout } = useAuth();
    return isAuthenticated ? (
        <>
            <Link to={ROUTES.AUTH.TEACHER_DASHBOARD} className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Dashboard</Link>
            <button onClick={logout} className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Logout</button>
        </>
    ) : (
        <Link to={ROUTES.AUTH.LOGIN} className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Login</Link>
    );
}

export default App;