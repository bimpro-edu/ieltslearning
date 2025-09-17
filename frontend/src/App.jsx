import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LessonsListPage from './pages/LessonsListPage';
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
        <div className="bg-gray-100 font-sans text-gray-800 min-h-screen"> {/* Changed bg-gray-50 to bg-gray-100 */}
          <header className="bg-white shadow-md sticky top-0 z-10"> {/* Changed shadow-sm to shadow-md */}
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200"> {/* Changed text-blue-600 */}
                  IELTS Prep
                </Link>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Tasks</Link> {/* Changed text-gray-500 and hover */}
                  <AuthButtons />
                </div>
              </div>
            </nav>
          </header>
          <main className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lessons" element={<LessonsListPage />} />
                <Route path="/lessons/:lessonId" element={<LessonPage />} />
                <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
                
                {/* New Task Routes */}
                <Route path="/tasks/:taskType/:category/" element={<TaskPage />} />
                <Route path="/tasks/:taskType/:category/:subCategory" element={<TaskPage />} />
              </Routes>
            </div>
          </main>
        </div>
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