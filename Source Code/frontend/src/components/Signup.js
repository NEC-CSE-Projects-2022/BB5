import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reusing same CSS theme

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Store credentials
    localStorage.setItem("userEmail", normalizedEmail);
    localStorage.setItem("userPassword", password);

    setError("");
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        {/* SIGNUP CARD */}
        <div className="login-card">

          <h2>Create HFS-VAE Account</h2>
          <p className="sub-text">
            Register to access intrusion detection analytics
          </p>

          {error && <div className="error-msg">{error}</div>}

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button className="login-btn" onClick={handleSignup}>
            Create Account
          </button>

        </div>

        {/* SIDE PANEL */}
        <div className="welcome-panel">
          <h1>Join HFS-VAE</h1>
          <p>
            Create an account to explore anomaly detection,
            visualize cyber threats, and monitor enterprise
            network security insights.
          </p>

          <button onClick={() => navigate("/login")}>
            Already Registered? Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;
