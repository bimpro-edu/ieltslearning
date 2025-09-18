import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthButtons() {
  const { isAuthenticated, logout } = useAuth();
  return isAuthenticated ? (
    <>
      <Link to="/teacher/dashboard" className="text-base font-medium text-body hover:text-primary-900 transition-colors duration-200">Dashboard</Link>
      <button onClick={logout} className="text-base font-medium text-body hover:text-primary-900 transition-colors duration-200">Logout</button>
    </>
  ) : (
    <Link to="/login" className="text-base font-medium text-body hover:text-primary-900 transition-colors duration-200">Login</Link>
  );
}

const Header = () => (
  <header className="bg-site-bg border-b border-border shadow-md sticky top-0 z-10">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200">
          IELTS Prep
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-base font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200">Tasks</Link>
          <AuthButtons />
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
