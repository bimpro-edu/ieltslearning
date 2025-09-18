import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-2">
        {/* Core Skills Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center tracking-wide">Core Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow flex flex-col items-center p-6">
              <span className="text-4xl mb-2">🎧</span>
              <span className="font-bold text-lg mb-1">Listening</span>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs text-gray-500">40% done</span>
            </div>
            <div className="bg-white rounded-xl shadow flex flex-col items-center p-6">
              <span className="text-4xl mb-2">📖</span>
              <span className="font-bold text-lg mb-1">Reading</span>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-xs text-gray-500">30% done</span>
            </div>
            <div className="bg-white rounded-xl shadow flex flex-col items-center p-6">
              <span className="text-4xl mb-2">✍️</span>
              <span className="font-bold text-lg mb-1">Writing</span>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <span className="text-xs text-gray-500">50% done</span>
            </div>
            <div className="bg-white rounded-xl shadow flex flex-col items-center p-6">
              <span className="text-4xl mb-2">🎤</span>
              <span className="font-bold text-lg mb-1">Speaking</span>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-xs text-gray-500">25% done</span>
            </div>
          </div>
        </section>

        {/* Supportive Skills Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center tracking-wide">Supportive Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            <div className="flex flex-col gap-6 h-full" style={{ minHeight: '420px' }}>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between flex-1 min-h-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">📝</span>
                  <span className="font-bold text-lg">Grammar</span>
                </div>
                <div className="flex-1 flex items-center justify-center mb-3">
                  <div className="bg-green-50 rounded-lg px-4 py-2 text-sm text-green-700 font-mono">Saved 5 rules</div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Practice link</span>
                  <Link to="/tasks/grammar" className="text-primary-600 font-semibold hover:underline">Practice</Link>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between flex-1 min-h-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">💡</span>
                  <span className="font-bold text-lg">Tips & Strategies</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-between mb-3">
                  <div className="bg-yellow-50 rounded-lg px-4 py-2 text-sm text-yellow-700 font-mono flex-1">“Top 10 Band 7+ Tips”</div>
                  <div className="bg-yellow-50 rounded-lg px-4 py-2 text-sm text-yellow-700 font-mono flex-1">“Time Management Hacks”</div>
                </div>
                <div className="flex justify-end items-center text-xs text-gray-500">
                  <Link to="/resources/tips" className="text-primary-600 font-semibold hover:underline">See All Tips</Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-full" style={{ minHeight: '420px' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">🌥️</span>
                <span className="font-bold text-lg">Vocabulary</span>
              </div>
              <div className="flex-1 flex items-center justify-center mb-3">
                <div className="bg-blue-50 rounded-lg px-4 py-2 text-sm text-blue-700 font-mono">Word Cloud Preview</div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>20 words saved</span>
                <Link to="/tasks/vocabulary" className="text-primary-600 font-semibold hover:underline">Practice</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Zone Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center tracking-wide">Personalized Zone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📌</span>
                <span className="font-bold text-lg">Continue: Writing Task 2 – Cohesion Devices</span>
              </div>
              <div className="flex-1 flex items-center text-gray-600 text-sm mb-3">Pick up where you left off and boost your coherence score!</div>
              <div className="flex justify-end">
                <Link to="/tasks/task2/cohesion" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Resume</Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-base">My Word List (20)</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">Recently saved: <span className="font-mono text-primary-700">synthesize, mitigate, paradigm</span></div>
                <Link to="/tasks/vocabulary" className="text-primary-600 font-semibold text-xs hover:underline">View All</Link>
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">📒</span>
                  <span className="font-bold text-base">My Grammar Notes (5)</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">Recently saved: <span className="font-mono text-primary-700">Inversion, Conditionals</span></div>
                <Link to="/tasks/grammar" className="text-primary-600 font-semibold text-xs hover:underline">View All</Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
            <span className="text-2xl font-bold text-primary-700 mb-2 md:mb-0">🏆 Progress Dashboard:</span>
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Listening 40%</span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Reading 30%</span>
              <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">Writing 50%</span>
              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">Speaking 25%</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

