import React from "react";
import "./Dataset.css";

export default function Dataset() {

  const downloadFile = (filePath) => {
    const fileURL = window.location.origin + filePath;
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <h2>Dataset Information</h2>

      <p>
        Our Intrusion Detection System is trained and evaluated using
        high‑quality, real‑world network traffic datasets. These datasets
        contain millions of flow records, multiple attack categories and
        detailed statistical features required for deep‑learning based
        anomaly detection using <strong>HFS‑VAE</strong>.
      </p>

      {/* WHY DATASETS */}
      <h3>🔬 Why These Datasets?</h3>
      <p>
        Our HFS‑VAE intrusion detection model is evaluated using two
        complementary datasets to ensure both <b>real‑world relevance</b>
        and <b>benchmark comparability</b>.
      </p>

      <ul>
        <li>
          <strong>CIC‑IDS 2017 — Modern Enterprise Traffic</strong><br />
          Contains realistic enterprise network behaviour with modern
          attacks including DDoS, Botnet, Web attacks, PortScan and
          Infiltration traffic.
        </li>

        <li>
          <strong>NSL‑KDD — Benchmark Dataset</strong><br />
          Used to validate generalization ability and compare results with
          prior intrusion detection research.
        </li>
      </ul>

      {/* PERFORMANCE */}
      <h3>📊 Model Performance</h3>
      <div className="results-grid">
        <div className="result-card">
          <h4>CICIDS2017 Results</h4>
          <p><b>Average Precision:</b> 0.8412</p>
          <p><b>F1 Score:</b> 0.7463</p>
          <p>Strong detection of modern enterprise attacks.</p>
        </div>

        <div className="result-card">
          <h4>NSL‑KDD Results</h4>
          <p><b>Average Precision:</b> 0.9234</p>
          <p><b>F1 Score:</b> 0.7371</p>
          <p>Excellent cross‑dataset generalization.</p>
        </div>
      </div>

      {/* ADVANCED EVALUATION */}
      <h3>🧪 Advanced Evaluation</h3>
      <ul>
        <li>PCA latent‑space visualization for anomaly separation</li>
        <li>Maximum Likelihood Estimation (MLE) density scoring</li>
        <li>Decision boundary complexity analysis</li>
        <li>Hierarchical feature‑splitting for interpretability</li>
      </ul>

      {/* OFFICIAL LINK */}
      <h3>🔗 Official Dataset Source</h3>
      <a
        className="dataset-link"
        href="https://www.unb.ca/cic/datasets/ids-2017.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        👉 Visit CIC‑IDS2017 Official Website
      </a>

      {/* DOWNLOAD CICIDS */}
      <h3>⬇ Download CICIDS2017 CSV Files</h3>
      <div className="download-grid">
        <button onClick={() => downloadFile("/datasets/cicids/Monday-WorkingHours.pcap_ISCX.csv")}>Monday Working Hours</button>
        <button onClick={() => downloadFile("/datasets/cicids/Tuesday-WorkingHours.pcap_ISCX(1).csv")}>Tuesday Working Hours</button>
        <button onClick={() => downloadFile("/datasets/cicids/Wednesday-workingHours.pcap_ISCX.csv")}>Wednesday Working Hours</button>
        <button onClick={() => downloadFile("/datasets/cicids/Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv")}>Thursday Web Attacks</button>
        <button onClick={() => downloadFile("/datasets/cicids/Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv")}>Thursday Infilteration</button>
        <button onClick={() => downloadFile("/datasets/cicids/Friday-WorkingHours-Morning.pcap_ISCX.csv")}>Friday Morning</button>
        <button onClick={() => downloadFile("/datasets/cicids/Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv")}>Friday PortScan</button>
        <button onClick={() => downloadFile("/datasets/cicids/Friday-WorkingHours-Afternoon-DDoS.pcap_ISCX(1).csv")}>Friday DDoS</button>
      </div>

      {/* NSL KDD */}
      <h3>⬇ Download NSL‑KDD Dataset</h3>
      <div className="download-grid">
        <button onClick={() => downloadFile("/datasets/nslkdd/NSL_KDD.csv")}>Download NSL_KDD.csv</button>
      </div>

      {/* CUSTOM DATASETS */}
      <h3>📌 Custom Dataset Support</h3>
      <p>
        Users can upload their own traffic CSV files via the Dashboard for
        real‑time intrusion detection. The system supports datasets with
        network flow features such as IPs, ports, packet statistics and
        protocol attributes.
      </p>
    </div>
  );
}
