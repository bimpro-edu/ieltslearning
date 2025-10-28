import React, { useState, useEffect } from 'react';
import { getListeningTemplateForTopic } from '../utils/listeningTemplates';
import ListeningMindmap from './ListeningMindmap';
import { PracticeAssessment } from './PracticeAssessment';
import { PlayCircleIcon, PauseCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ListeningCategoryCanvas({ categoryKey, topicKey }) {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [practiceText, setPracticeText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [practiceInterval, setPracticeInterval] = useState(null);

  if (!topicKey) {
    return <div className="text-gray-500 text-lg mt-12 text-center">Select a topic to view details.</div>;
  }

  const template = getListeningTemplateForTopic(categoryKey, topicKey);

  if (!template || template.title === 'No data') {
    return <div className="text-gray-500 text-lg mt-12 text-center">No data available for this topic.</div>;
  }

  const handleTemplateChange = (index) => {
    setTemplateIndex(index);
  };

  useEffect(() => {
    // Cleanup audio and timer on unmount
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (practiceInterval) {
        clearInterval(practiceInterval);
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!template.audioUrl) return;

    if (!currentAudio) {
      const audio = new Audio(template.audioUrl);
      setCurrentAudio(audio);
      await audio.play();
      setIsPlaying(true);

      // Start practice timer when audio starts
      const interval = setInterval(() => {
        setPracticeTimer(prev => prev + 1);
      }, 1000);
      setPracticeInterval(interval);
    } else {
      if (isPlaying) {
        currentAudio.pause();
        if (practiceInterval) {
          clearInterval(practiceInterval);
          setPracticeInterval(null);
        }
      } else {
        await currentAudio.play();
        const interval = setInterval(() => {
          setPracticeTimer(prev => prev + 1);
        }, 1000);
        setPracticeInterval(interval);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetPractice = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
    setPracticeTimer(0);
    setPracticeText('');
    if (practiceInterval) {
      clearInterval(practiceInterval);
      setPracticeInterval(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
      {/* Top: Template selector buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-3 sm:mb-0">{template.title}</h2>
        <div className="flex flex-wrap gap-2">
          {template.templates && template.templates.map((t, index) => (
            <button
              key={index}
              onClick={() => handleTemplateChange(index)}
              className={`px-3 py-1 rounded ${templateIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mindmap prominently under the template buttons */}
      {template.mindmap && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-700">Mind Map</h3>
          {/* Use existing mindmap component if available, otherwise render a simple fallback */}
          <ListeningMindmap data={template.mindmap} />
        </div>
      )}

      {/* Template content */}
      {template.templates && template.templates[templateIndex] && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-700">Practice Session</h3>
            <div className="flex gap-2">
              {template.audioUrl && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAudio}
                    className="inline-flex items-center px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                  >
                    {isPlaying ? (
                      <PauseCircleIcon className="h-5 w-5 mr-1" />
                    ) : (
                      <PlayCircleIcon className="h-5 w-5 mr-1" />
                    )}
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </button>
                  <span className="text-sm font-mono">{formatTime(practiceTimer)}</span>
                  <button
                    onClick={resetPractice}
                    className="inline-flex items-center px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
              <button
                onClick={() => setPracticeOpen(p => !p)}
                className="px-3 py-1 rounded bg-primary-100 text-primary-800 hover:bg-primary-200 text-sm"
              >
                {practiceOpen ? 'Close Practice' : 'Open Practice'}
              </button>
              <button
                onClick={() => setAssessmentOpen(true)}
                className="px-3 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 text-sm"
              >
                Assessment
              </button>
            </div>
          </div>

          <div className="prose lg:prose-xl mb-4">
            <div className="whitespace-pre-wrap">{template.templates[templateIndex].content}</div>
          </div>

          {practiceOpen && (
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Practice Instructions</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Listen to the audio and take notes in the space below</li>
                  <li>• Focus on key information and important details</li>
                  <li>• Use abbreviations and symbols for faster note-taking</li>
                  <li>• Review your notes against the template after listening</li>
                </ul>
              </div>

              <textarea
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
                placeholder="Take your notes here as you listen..."
                className="w-full p-4 border rounded-lg resize-y min-h-[200px] font-mono text-sm"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(practiceText)}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm flex items-center"
                >
                  Copy Notes
                </button>
                <button
                  onClick={resetPractice}
                  className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm flex items-center"
                >
                  Reset Practice
                </button>
                <button
                  onClick={() => { setPracticeText(''); setPracticeOpen(false); }}
                  className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm flex items-center"
                >
                  Clear & Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips, Traps, Predictions */}
      {template.tips && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary-700">Tips</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-gray-700">
            {template.tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}

      {template.traps && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-700">Traps</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-red-700">
            {template.traps.map((trap, i) => <li key={i}>{trap}</li>)}
          </ul>
        </div>
      )}

      {template.predictions && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Predictions</h3>
          <ul className="list-disc ml-6 space-y-1 text-base text-blue-700">
            {template.predictions.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* Assessment Modal */}
      {assessmentOpen && (
        <PracticeAssessment
          isOpen={assessmentOpen}
          onClose={() => setAssessmentOpen(false)}
          studentAnswer={practiceText}
          modelAnswer={template.templates[templateIndex].content}
          exerciseType="listening"
          topic={topicKey}
          practiceTime={practiceTimer}
        />
      )}
    </div>
  );
}
