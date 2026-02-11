import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section fade-in">
        <div>
          <h1>HFS-VAE</h1>
          <h2>
            Hierarchical Feature-Splitting Variational Autoencoder
          </h2>
          <p>
            A next‑generation <strong>Network Intrusion Detection System</strong>
            engineered to deliver <strong>robust, interpretable, and
            enterprise‑scale anomaly detection</strong> using structured deep
            learning and hierarchical latent modeling.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section grid-2 slide-left">
        <div>
          <h3>About the Project</h3>
          <p>
            HFS‑VAE is a research‑oriented cybersecurity framework developed to
            address critical limitations in traditional intrusion detection
            systems such as poor interpretability, weak adversarial robustness,
            and limited scalability.
          </p>

          <p>
            Unlike conventional deep learning IDS models that operate as
            black‑box systems, HFS‑VAE introduces structured latent learning
            that allows security analysts to visualize, interpret, and localize
            anomalies within network traffic.
          </p>

          <p>
            Network traffic features are divided into semantic groups such as
            <strong> Flow Statistics</strong>,
            <strong> Packet Metrics</strong>, and
            <strong> Protocol Indicators</strong>, enabling modular
            representation learning and improved anomaly explainability.
          </p>
        </div>

        <div className="highlight-card slide-right">
          <h3>Key Contributions</h3>
          <ul>
            <li>Hierarchical Feature Splitting Architecture</li>
            <li>Parallel Variational Encoder Branches</li>
            <li>Latent Space Fusion & Disentanglement</li>
            <li>XGBoost‑based Classifier Fusion</li>
            <li>Distributional Loss for Latent Alignment</li>
            <li>Adversarial Robustness Regularization</li>
            <li>Visualization‑Driven Interpretability</li>
          </ul>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="methodology-section fade-in">
        <h2 className="section-title">Core Methodology</h2>

        <div className="grid-3">
          <div className="info-card">
            <h4>Feature Partitioning</h4>
            <p>
              Traffic attributes are grouped into semantic clusters allowing
              specialized encoders to learn domain‑specific representations.
            </p>
          </div>

          <div className="info-card">
            <h4>Distributional Loss Function</h4>
            <p>
              Aligns latent embeddings with Gaussian priors to enhance anomaly
              separation and density modeling.
            </p>
          </div>

          <div className="info-card">
            <h4>Latent Fusion</h4>
            <p>
              Multi‑branch embeddings are fused into a unified latent vector for
              robust intrusion classification.
            </p>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="architecture-section grid-2 slide-left">
        <div>
          <h3>System Architecture</h3>
          <p>
            The HFS‑VAE architecture consists of parallel encoder branches, each
            trained on a specific feature subset. The encoded latent vectors are
            concatenated and passed through a shared decoder for
            reconstruction.
          </p>

          <p>
            A hybrid detection pipeline is formed by integrating an
            <strong> XGBoost classifier</strong> on top of the fused latent
            embeddings, enabling supervised anomaly detection while preserving
            unsupervised representation learning.
          </p>
        </div>

        <div className="dataset-card slide-right">
          <h3>Robustness Mechanisms</h3>
          <ul>
            <li>Smoothness Regularization</li>
            <li>Latent Perturbation Stability</li>
            <li>Boundary Complexity Analysis</li>
            <li>Adversarial Noise Resistance</li>
          </ul>
        </div>
      </section>

      {/* DATASETS */}
      <section className="dataset-section grid-2 slide-left">
        <div>
          <h3>Datasets Used</h3>
          <ul>
            <li>
              <strong>CICIDS2017</strong> – Modern enterprise attack traffic
              including DDoS, Botnet, PortScan, and Infiltration.
            </li>
            <li>
              <strong>NSL‑KDD</strong> – Benchmark dataset for legacy intrusion
              detection evaluation.
            </li>
          </ul>

          <p>
            These datasets ensure validation across both contemporary and
            traditional network environments.
          </p>
        </div>

        <div className="dataset-card slide-right">
          <h3>Evaluation Metrics</h3>
          <ul>
            <li>Average Precision (AP)</li>
            <li>F1‑Score</li>
            <li>AUC‑ROC</li>
            <li>Reconstruction Loss</li>
            <li>MLE Density Scoring</li>
            <li>Latent Boundary Analysis</li>
          </ul>
        </div>
      </section>

      {/* RESULTS */}
      <section className="results-section fade-in">
        <h2 className="section-title">Performance Highlights</h2>

        <div className="grid-3">
          <div className="stat-card">
            <h3>0.8412</h3>
            <p>Average Precision</p>
          </div>

          <div className="stat-card">
            <h3>0.7463</h3>
            <p>F1‑Score</p>
          </div>

          <div className="stat-card">
            <h3>0.88</h3>
            <p>AUC‑ROC</p>
          </div>
        </div>

        <p className="results-text">
          Experimental evaluation demonstrates strong anomaly separation,
          extremely high precision, and interpretable latent clustering,
          validating HFS‑VAE as a practical enterprise cybersecurity solution.
        </p>
      </section>

      {/* FUTURE WORK */}
      <section className="future-section fade-in">
        <h2 className="section-title">Future Enhancements</h2>

        <div className="grid-3">
          <div className="info-card">
            <h4>Streaming IDS</h4>
            <p>Extend detection to real‑time network streams.</p>
          </div>

          <div className="info-card">
            <h4>IoT Deployment</h4>
            <p>Optimize model for edge and IoT environments.</p>
          </div>

          <div className="info-card">
            <h4>Attack Categorization</h4>
            <p>Enable fine‑grained multi‑class intrusion labeling.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 HFS‑VAE Research Project • Intelligent Cybersecurity Analytics</p>
      </footer>

    </div>
  );
}
