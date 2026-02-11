import React, { useState } from "react";
import axios from "axios";
import "./UploadCSV.css";

export default function UploadCSV({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5001/predict_csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 0, // 🔥 allow long ML inference
        }
      );

      setResult(res.data);
      alert("✅ File analyzed successfully!");

    } catch (err) {
      console.error("Backend error:", err);

      // 👇 SHOW REAL BACKEND ERROR
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Unknown backend error";

      alert(`❌ Analysis failed:\n${msg}`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Network Flow CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {loading && (
        <div className="spinner">
          <div className="loading-circle"></div>
          <p>Analyzing traffic data… Please wait.</p>
        </div>
      )}
    </div>
  );
}
