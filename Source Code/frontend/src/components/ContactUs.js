import React, { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📨 Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="page-container">

      {/* ================= PROJECT INFO ================= */}
      <h2>Research & Contact</h2>
      <p className="center-text">
        This platform demonstrates our research on an advanced deep-learning
        Intrusion Detection System based on the <b>HFS-VAE</b> architecture.
      </p>

      <div className="info-grid">

        <div className="info-card">
          <h3>🎯 Research Objective</h3>
          <p>
            Our goal is to build an intelligent and interpretable network
            intrusion detection system capable of identifying modern cyber
            attacks in real-time enterprise environments.
          </p>
        </div>

        <div className="info-card">
          <h3>🔬 Research Contributions</h3>
          <ul>
            <li>Hierarchical Feature-Splitting VAE</li>
            <li>Latent-space anomaly detection</li>
            <li>MLE-based density scoring</li>
            <li>XGBoost classifier fusion</li>
            <li>Interactive web deployment</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🏫 Project Domain</h3>
          <p>
            Artificial Intelligence • Cyber Security • Deep Learning •
            Network Traffic Analysis • Explainable AI.
          </p>
        </div>

      </div>

      {/* ================= TEAM ================= */}
      <h2 style={{marginTop:"80px"}}>Research Team</h2>

      <div className="team-grid">

        <div className="team-card">
          <img src="/team/member1.png" alt="Researcher"/>
          <h3>Researcher 1</h3>
          <p>Deep Learning & IDS Research</p>
          <span>HFS-VAE Model Development</span>
        </div>

        <div className="team-card">
          <img src="/team/member2.jpeg" alt="Researcher"/>
          <h3>Researcher 2</h3>
          <p>Machine Learning & Data Engineering</p>
          <span>Dataset Processing & Training</span>
        </div>

        <div className="team-card">
          <img src="/team/member3.jpeg" alt="Researcher"/>
          <h3>Researcher 3</h3>
          <p>Cyber Security Analyst</p>
          <span>Evaluation & Testing</span>
        </div>

        <div className="team-card">
          <img src="/team/member4.jpeg" alt="Researcher"/>
          <h3>Researcher 4</h3>
          <p>Frontend & Deployment</p>
          <span>Web Application Development</span>
        </div>

      </div>

      {/* ================= CONTACT INFO ================= */}
      <h2 style={{marginTop:"80px"}}>Get In Touch</h2>

      <div className="contact-cards">

        <div className="contact-card">
          <h4>Email</h4>
          <p>shaikthaheer752@gmail.com</p>
        </div>

        <div className="contact-card">
          <h4>Project Type</h4>
          <p>Academic Research Project</p>
        </div>

        <div className="contact-card">
          <h4>Focus Area</h4>
          <p>AI Powered Intrusion Detection</p>
        </div>

      </div>

      {/* ================= FORM ================= */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>

    </div>
  );
}
