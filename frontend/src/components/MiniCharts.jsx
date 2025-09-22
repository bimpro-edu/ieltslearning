export function StackedBarChart({ width = "100%", height = 480 }) {
  const data = {
    labels: ["2018", "2019", "2020", "2021"],
    datasets: [
      {
        label: "Online",
        data: [30, 40, 45, 60],
        backgroundColor: "#42a5f5",
        stack: 'Stack 0',
      },
      {
        label: "In-Store",
        data: [50, 35, 30, 20],
        backgroundColor: "#ffa726",
        stack: 'Stack 0',
      },
      {
        label: "Wholesale",
        data: [20, 25, 25, 20],
        backgroundColor: "#66bb6a",
        stack: 'Stack 0',
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, grid: { display: false }, beginAtZero: true },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export function MixedChart({ width = "100%", height = 520 }) {
  const data = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        type: 'bar',
        label: 'Bar',
        data: [12, 19, 3, 5],
        backgroundColor: '#42a5f5',
        borderRadius: 6,
      },
      {
        type: 'line',
        label: 'Line',
        data: [10, 15, 8, 12],
        borderColor: '#ab47bc',
        backgroundColor: 'rgba(171,71,188,0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 5,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
      <div style={{ marginTop: 32, width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Pie data={{
          labels: ["Red", "Blue", "Yellow"],
          datasets: [{
            label: "Pie Data",
            data: [30, 50, 20],
            backgroundColor: ["#ef5350", "#42a5f5", "#ffee58"],
            borderWidth: 2,
          }],
        }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} height={220} />
      </div>
    </div>
  );
}
import { Scatter } from "react-chartjs-2";

export function AreaChart({ width = "100%", height = 480 }) {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2001",
        data: [500, 800, 700, 900, 800, 900, 1000, 1100, 900, 1000, 1100, 1200],
        backgroundColor: "rgba(66, 165, 245, 0.5)",
        borderColor: "#1976d2",
        fill: true,
        pointRadius: 0,
        order: 1,
      },
      {
        label: "2002",
        data: [1000, 1200, 1100, 1300, 1200, 1300, 1400, 1500, 1300, 1400, 1500, 1600],
        backgroundColor: "rgba(239, 83, 80, 0.5)",
        borderColor: "#ef5350",
        fill: true,
        pointRadius: 0,
        order: 2,
      },
      {
        label: "2003",
        data: [2000, 2500, 2200, 2700, 2500, 2700, 3000, 3200, 2700, 3000, 3200, 3500],
        backgroundColor: "rgba(255, 238, 88, 0.5)",
        borderColor: "#ffee58",
        fill: true,
        pointRadius: 0,
        order: 3,
      },
      {
        label: "2004",
        data: [4000, 5000, 4500, 6000, 5500, 6000, 7000, 8000, 7000, 8000, 9000, 10000],
        backgroundColor: "rgba(126, 87, 194, 0.5)",
        borderColor: "#7e57c2",
        fill: true,
        pointRadius: 0,
        order: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } },
    elements: { point: { radius: 0 } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Line data={data} options={options} />
    </div>
  );
}

export function ProcessDiagram({ width = 320, height = 180 }) {
  // Simple SVG process diagram
  return (
    <svg width={width} height={height} viewBox="0 0 320 180">
      <rect x="20" y="60" width="60" height="40" rx="8" fill="#90caf9" />
      <rect x="120" y="60" width="60" height="40" rx="8" fill="#a5d6a7" />
      <rect x="220" y="60" width="60" height="40" rx="8" fill="#ffe082" />
      <text x="50" y="85" textAnchor="middle" fontSize="16" fill="#1565c0">Start</text>
      <text x="150" y="85" textAnchor="middle" fontSize="16" fill="#2e7d32">Step 2</text>
      <text x="250" y="85" textAnchor="middle" fontSize="16" fill="#f9a825">End</text>
      <polygon points="80,80 100,80 100,85 110,75 100,65 100,70 80,70" fill="#1976d2" />
      <polygon points="180,80 200,80 200,85 210,75 200,65 200,70 180,70" fill="#388e3c" />
    </svg>
  );
}

export function ScatterChart({ width = "100%", height = 480 }) {
  const data = {
    datasets: [
      {
        label: "Scatter Data",
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 3.5 },
          { x: 3, y: 2.8 },
          { x: 4, y: 4.2 },
          { x: 5, y: 3.1 },
        ],
        backgroundColor: "#ab47bc",
        pointRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: 'X' } },
      y: { grid: { display: false }, beginAtZero: true, title: { display: true, text: 'Y' } },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Scatter data={data} options={options} />
    </div>
  );
}

import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export function MiniLineChart({ width = "100%", height = 340 }) {
  const data = {
    labels: ["2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Trend",
        data: [60, 80, 70, 90, 100],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Line data={data} options={options} />
    </div>
  );
}

export function MiniBarChart({ width = "100%", height = 340 }) {
  const data = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Bar Data",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "#42a5f5",
          "#66bb6a",
          "#ffa726",
          "#ab47bc",
        ],
        borderRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true },
    },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export function MiniPieChart({ width = "100%", height = 400 }) {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Pie Data",
        data: [30, 50, 20],
        backgroundColor: ["#ef5350", "#42a5f5", "#ffee58"],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };
  return (
    <div style={{ width: width, height: height }}>
      <Pie data={data} options={options} />
    </div>
  );
}
