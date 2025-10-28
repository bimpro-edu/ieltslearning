import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

function AuthButtons() {
  const { isAuthenticated, logout } = useAuth();
  return isAuthenticated ? (
    <>
      <Link to={ROUTES.AUTH.TEACHER_DASHBOARD} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Dashboard</Link>
      <button onClick={logout} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Logout</button>
    </>
  ) : (
    <Link to={ROUTES.AUTH.LOGIN} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Login</Link>
  );
}

const Header = () => (
  <header className="bg-footer-bg border-b border-border shadow-md sticky top-0 z-10">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-footer-brand hover:text-footer-link-hover transition-colors duration-200">
          IELTS Prep
        </Link>
        <div className="flex items-center space-x-4">
          <Link to={ROUTES.HOME} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Tasks</Link>
          <Link to={ROUTES.READING.CORE_SKILLS} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Reading</Link>
          <Link to={ROUTES.LISTENING.CORE_SKILLS} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Listening</Link>
          <Link to={ROUTES.WRITING.TASK1.ROOT} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Writing Task 1</Link>
          <Link to={ROUTES.WRITING.TASK2.ROOT} className="text-base font-medium text-footer-text hover:text-footer-link-hover transition-colors duration-200">Writing Task 2</Link>
          <AuthButtons />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
