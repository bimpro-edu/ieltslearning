import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EducationExamplesTab from '../components/EducationExamplesTab';

export default function EducationExamplesPage() {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/education/education-examples')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch examples');
        return res.json();
      })
      .then(data => {
        setExamples(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Education Examples
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <EducationExamplesTab examples={examples} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}