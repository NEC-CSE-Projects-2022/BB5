import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartView({ result }) {
  if (!result) return null;

  const { total_flows = 0, normal = 0, attacks = 0 } = result;
  if (total_flows === 0) return null;

  const data = {
    labels: ["Normal Traffic", "Attack Traffic"],
    datasets: [
      {
        data: [normal, attacks],
        backgroundColor: ["#16a34a", "#dc2626"],
        hoverBackgroundColor: ["#22c55e", "#f87171"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb", // light text
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      className="chart-box"
      style={{
        width: "320px",
        margin: "30px auto",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "12px", color: "#f8fafc" }}>
        Traffic Distribution
      </h3>

      <Doughnut data={data} options={options} />

      <p style={{ marginTop: "12px", fontSize: "14px", color: "#cbd5f5" }}>
        Attack Rate:{" "}
        <strong style={{ color: "#f87171" }}>
          {((attacks / total_flows) * 100).toFixed(2)}%
        </strong>
      </p>
    </div>
  );
}
