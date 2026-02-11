import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "./Dashboard.css";

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = ({ result }) => {
  if (!result) return null;

  const { total_flows = 0, normal = 0, attacks = 0 } = result;

  const attackRate =
    total_flows > 0 ? ((attacks / total_flows) * 100).toFixed(2) : 0;

  // Risk level
  let riskLevel = "Low";
  if (attackRate > 30) riskLevel = "High";
  else if (attackRate > 10) riskLevel = "Medium";

  /* -------------------- PIE CHART -------------------- */
  const pieData = {
    labels: ["Normal", "Attack"],
    datasets: [
      {
        data: [normal, attacks],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverBackgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb",
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#f8fafc",
        bodyColor: "#e5e7eb",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
  };

  /* -------------------- BAR CHART -------------------- */
  const barData = {
    labels: ["Total Flows", "Normal", "Attacks"],
    datasets: [
      {
        label: "Flow Count",
        data: [total_flows, normal, attacks],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Network Flow Overview",
        color: "#f8fafc",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#f8fafc",
        bodyColor: "#e5e7eb",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#e5e7eb" },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "#e5e7eb" },
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card total">
          <h3>Total Flows</h3>
          <p>{total_flows}</p>
        </div>

        <div className="card normal">
          <h3>Normal</h3>
          <p>{normal}</p>
        </div>

        <div className="card attacks">
          <h3>Attacks</h3>
          <p>{attacks}</p>
        </div>

        <div className={`card risk ${riskLevel.toLowerCase()}`}>
          <h3>Risk Level</h3>
          <p>{riskLevel}</p>
          <small>{attackRate}% attack rate</small>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-box">
          <h3>Traffic Distribution</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="chart-box">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
