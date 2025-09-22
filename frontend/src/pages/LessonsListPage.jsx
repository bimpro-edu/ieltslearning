import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IELTS from '../ielts-data'; // Import the new data

// Helper component for styling cards
const TaskCard = ({ title, to }) => (
  <Link to={to} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:border-primary-500 hover:border-2"> {/* Added hover:border-primary-500 hover:border-2 and transition-all duration-200 */}
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  </Link>
);

export default function LessonsListPage({ hideHeaderFooter }) {
  // --- Task 2 Category Structure ---
  const task2Clusters = [
    {
      title: 'Opinion-Based',
      color: 'bg-blue-50',
      categories: [
        { key: 'Opinion', label: 'Opinion (Agree/Disagree)' },
        { key: 'Discussion', label: 'Discussion (Both views + opinion)' },
        { key: 'PositiveNegativeDevelopment', label: 'Positive/Negative Development' },
        { key: 'Justification', label: 'Justification Type (why you support one view)' },
        { key: 'CriticalReview', label: 'Critical Review of a Claim (challenge assumptions)' },
        { key: 'Evaluative', label: 'Evaluative (To what extent is X true?)' },
      ]
    },
    {
      title: 'Comparison & Balance',
      color: 'bg-green-50',
      categories: [
        { key: 'AdvantageDisadvantage', label: 'Advantage–Disadvantage' },
        { key: 'CompareContrast', label: 'Compare & Contrast (two systems, trends, methods)' },
        { key: 'BalancedWeighing', label: 'Balanced Weighing (arguments are equally strong)' },
        { key: 'PriorityRanking', label: 'Priority / Ranking (which is more important?)' },
        { key: 'ComparativeOverTime', label: 'Comparative Over Time (past vs. present/future)' },
      ]
    },
    {
      title: 'Problem–Cause–Solution',
      color: 'bg-yellow-50',
      categories: [
        { key: 'ProblemSolution', label: 'Problem–Solution' },
        { key: 'CauseEffect', label: 'Cause–Effect' },
        { key: 'CauseSolution', label: 'Cause–Solution' },
        { key: 'EvaluationOfSolutions', label: 'Evaluation of Solutions (choose best option)' },
        { key: 'BestWay', label: '“Best Way” Questions (most effective method)' },
        { key: 'PolicyRecommendation', label: 'Policy / Recommendation (what gov./individuals should do)' },
      ]
    },
    {
      title: 'Question-Based / Mixed',
      color: 'bg-purple-50',
      categories: [
        { key: 'DoubleQuestion', label: 'Double Question / Direct Questions' },
        { key: 'MixedType', label: 'Mixed Type (hybrid: e.g., discuss + opinion)' },
        { key: 'Conditional', label: 'Conditional / “If…then…” (hypothetical scenarios)' },
        { key: 'RoleBased', label: 'Role-Based (govt vs. individual responsibility)' },
        { key: 'MixedDimension', label: 'Mixed Dimension (look at 2 lenses, e.g., economic + environmental)' },
      ]
    },
    {
      title: 'Trend / Future-Oriented',
      color: 'bg-pink-50',
      categories: [
        { key: 'TrendAnalysis', label: 'Trend Analysis (describe + analyze social/tech trend)' },
        { key: 'Prediction', label: 'Prediction / Future-Oriented (what will happen, what should happen)' },
        { key: 'HypotheticalFuture', label: 'Hypothetical Future (what if X continues/worsens?)' },
        { key: 'GeneralToSpecific', label: 'General Statements → Specific Impacts (broad ideas applied to life)' },
        { key: 'CulturalEthical', label: 'Cultural / Ethical Perspective (moral, societal values dimension)' },
      ]
    }
  ];

  // --- Task 1 Academic Grouped Structure ---
  const task1AcademicClusters = [
    {
      title: 'A. Graphs & Charts (Data Representation)',
      color: 'bg-blue-50',
      types: [
        { key: 'LineGraph', label: 'Line Graph' },
        { key: 'BarChart', label: 'Bar Chart' },
        { key: 'PieChart', label: 'Pie Chart' },
        { key: 'Table', label: 'Table' },
        { key: 'MixedCharts', label: 'Mixed Charts (e.g., table + line graph, bar + pie)' },
        { key: 'DiagramWithTrend', label: 'Diagram with Trend Comparison' }
      ]
    },
    {
      title: 'B. Processes & Diagrams (Visual Explanations)',
      color: 'bg-green-50',
      types: [
        { key: 'ProcessDiagram', label: 'Process Diagram' },
        { key: 'CycleDiagram', label: 'Cycle Diagram (e.g., water cycle, life cycle)' },
        { key: 'ObjectDiagram', label: 'Object / Mechanism Diagram (how something works)' }
      ]
    },
    {
      title: 'C. Maps & Spatial Representations',
      color: 'bg-yellow-50',
      types: [
        { key: 'Map', label: 'Map' },
        { key: 'MultipleMaps', label: 'Multiple Maps (Over Time)' },
        { key: 'PlansLayouts', label: 'Plans / Floor Layouts' }
      ]
    }
  ];

  const [openClusterIdx, setOpenClusterIdx] = useState(0); // Accordion: first open by default (Task 2)
  const [openTask1Idx, setOpenTask1Idx] = useState(0); // Accordion: first open by default (Task 1)

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">IELTS Writing Tasks</h1>

        <div className="space-y-12">
          {/* --- Task 2 --- */}
          <div>
            <h2 className="text-3xl font-semibold mb-6 pb-3 border-b-2 border-primary-500">Writing Task 2 Categories (Grouped for Easy Navigation)</h2>
            <div className="space-y-4">
              {task2Clusters.map((cluster, idx) => (
                <div key={cluster.title} className={`rounded-lg shadow ${cluster.color}`}> {/* Colored group */}
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none text-left text-2xl font-semibold text-primary-700 hover:bg-opacity-80 transition"
                    onClick={() => setOpenClusterIdx(openClusterIdx === idx ? -1 : idx)}
                    aria-expanded={openClusterIdx === idx}
                  >
                    <span>{cluster.title}</span>
                    <span className="ml-4 text-xl">{openClusterIdx === idx ? '−' : '+'}</span>
                  </button>
                  {openClusterIdx === idx && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-6">
                      {cluster.categories.map(cat => (
                        <TaskCard key={cat.key} title={cat.label} to={`/tasks/task2/${cat.key}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- Task 1 --- */}
          <div>
            <h2 className="text-3xl font-semibold mb-6 pb-3 border-b-2 border-primary-600">Writing Task 1 (Academic Only, Grouped)</h2>
            <div className="space-y-4">
              {task1AcademicClusters.map((cluster, idx) => (
                <div key={cluster.title} className={`rounded-lg shadow ${cluster.color}`}> {/* Colored group */}
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none text-left text-2xl font-semibold text-primary-700 hover:bg-opacity-80 transition"
                    onClick={() => setOpenTask1Idx(openTask1Idx === idx ? -1 : idx)}
                    aria-expanded={openTask1Idx === idx}
                  >
                    <span>{cluster.title}</span>
                    <span className="ml-4 text-xl">{openTask1Idx === idx ? '−' : '+'}</span>
                  </button>
                  {openTask1Idx === idx && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-6">
                      {cluster.types.map(type => (
                        <TaskCard key={type.key} title={type.label} to={`/tasks/task1/academic/${type.key}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  {!hideHeaderFooter && <Footer />}
    </>
  );
}

