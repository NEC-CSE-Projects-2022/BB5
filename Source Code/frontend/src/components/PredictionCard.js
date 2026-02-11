import React from "react";

export default function PredictionCard({ result }) {
  if (!result) return null;

  const { total_flows, attacks, normal } = result;
  const attackRate = ((attacks / total_flows) * 100).toFixed(2);
  const isAttackHeavy = attacks > normal;

  return (
    <div
      style={{
        backgroundColor: isAttackHeavy ? "#dc2626" : "#16a34a",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        margin: "20px auto",
        maxWidth: "420px"
      }}
    >
      <h2 style={{ fontSize: "22px" }}>
        {isAttackHeavy ? "🚨 Malicious Traffic Detected" : "✅ Mostly Normal Traffic"}
      </h2>

      <p style={{ marginTop: "10px" }}>
        <strong>Total Flows:</strong> {total_flows}
      </p>

      <p>
        <strong>Attack Flows:</strong> {attacks}
      </p>

      <p>
        <strong>Normal Flows:</strong> {normal}
      </p>

      <p style={{ marginTop: "10px", fontSize: "16px" }}>
        <strong>Attack Rate:</strong> {attackRate}%
      </p>
    </div>
  );
}
