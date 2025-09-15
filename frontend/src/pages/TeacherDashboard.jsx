import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions?unreviewed=true', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setSubmissions(data);
        }
      } catch (error) {
        console.error('Failed to fetch submissions', error);
      }
    };
    if (token) {
      fetchSubmissions();
    }
  }, [token]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Unreviewed Submissions</h2>
      <div className="space-y-4 bg-white p-4 rounded-lg shadow">
        {submissions.length > 0 ? submissions.map(sub => (
          <div key={sub.id} className="p-4 border rounded-lg shadow-sm">
            <p className="font-semibold"><strong>Exercise:</strong> {sub.exercise_id}</p>
            <p><strong>User ID:</strong> {sub.user_id}</p>
            <div className="mt-2 p-3 bg-gray-50 rounded">
              <p className="font-semibold">Content:</p>
              <pre className="whitespace-pre-wrap font-sans text-sm">{sub.content}</pre>
            </div>
            <div className="mt-2 p-3 bg-gray-50 rounded">
              <p className="font-semibold">Grader Report:</p>
              <pre className="whitespace-pre-wrap font-mono text-xs">{JSON.stringify(JSON.parse(sub.report), null, 2)}</pre>
            </div>
          </div>
        )) : <p>No unreviewed submissions.</p>}
      </div>
    </div>
  );
}
