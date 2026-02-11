import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    const normalizedEmail = email.trim().toLowerCase();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (
      normalizedEmail === storedEmail &&
      password === storedPassword
    ) {
      setError("");
      alert("Login successful!");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        {/* LOGIN CARD */}
        <div className="login-card">

          <h2>HFS-VAE Portal Login</h2>
          <p className="sub-text">
            Access the Intrusion Detection Dashboard
          </p>

          {error && <div className="error-msg">{error}</div>}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <button className="login-btn" onClick={handleLogin}>
            Login to Dashboard
          </button>

        </div>

        {/* SIDE WELCOME PANEL */}
        <div className="welcome-panel">
          <h1>Welcome Back</h1>
          <p>
            Monitor cyber threats, visualize anomalies, and explore
            HFS-VAE intrusion detection analytics.
          </p>

          <button onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
