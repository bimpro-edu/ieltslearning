import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full bg-footer-bg text-footer-text mt-16 py-8 px-4 border-t border-border">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex flex-wrap gap-6 text-sm font-semibold mb-4 md:mb-0">
        <Link to="/about" className="hover:underline text-footer-link hover:text-footer-link-hover">About</Link>
        <Link to="/contact" className="hover:underline text-footer-link hover:text-footer-link-hover">Contact</Link>
        <Link to="/resources" className="hover:underline text-footer-link hover:text-footer-link-hover">Resources</Link>
        <Link to="/mock-tests" className="hover:underline text-footer-link hover:text-footer-link-hover">Mock Tests</Link>
        <Link to="/support" className="hover:underline text-footer-link hover:text-footer-link-hover">Support</Link>
      </div>
      <div className="text-center flex-1">
        <span className="italic text-lg font-medium text-footer-quote">“Every step brings you closer to Band 9 🚀”</span>
      </div>
      <div className="text-right text-xs text-footer-meta">
        <span className="font-bold text-footer-brand">RMIT ENGLISH</span><br/>
        <span>Designed &amp; Copyright &copy; {new Date().getFullYear()} AndyPhung</span>
      </div>
    </div>
  </footer>
);

export default Footer;
