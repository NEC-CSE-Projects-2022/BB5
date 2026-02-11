import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5001";

export default function UploadForm({ setResult, setCsvSummary }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle manual field input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle CSV file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // -------------------------------
  // 🔹 Single-flow prediction
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/predict`,
        formData,
        { timeout: 10000 } // short timeout for single flow
      );

      setResult(res.data);

    } catch (err) {
      console.error("Single prediction error:", err);
      alert(
        err.response?.data?.error ||
        "❌ Single prediction failed. Check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 🔹 CSV batch prediction
  // -------------------------------
  const handleCsvUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const csvForm = new FormData();
    csvForm.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/predict_csv`,
        csvForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 0, // 🔥 allow long ML jobs
        }
      );

      setCsvSummary(res.data);

    } catch (err) {
      console.error("CSV prediction error:", err);
      alert(
        err.response?.data?.error ||
        "❌ CSV analysis failed. Check backend logs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        margin: "30px auto",
        maxWidth: "550px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        🔍 Network Flow Detection
      </h2>

      {/* ---------------- Single Flow ---------------- */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          name="Flow_Duration"
          type="number"
          placeholder="Flow Duration"
          onChange={handleChange}
        />
        <input
          name="Total_Fwd_Packets"
          type="number"
          placeholder="Total Fwd Packets"
          onChange={handleChange}
        />
        <input
          name="Total_Bwd_Packets"
          type="number"
          placeholder="Total Bwd Packets"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Predict Single Flow"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* ---------------- CSV Upload ---------------- */}
      <form onSubmit={handleCsvUpload} style={{ textAlign: "center" }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginLeft: "10px",
            backgroundColor: "#10b981",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </form>
    </div>
  );
}
