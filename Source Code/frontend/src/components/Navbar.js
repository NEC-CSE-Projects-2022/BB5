import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1>HFS-VAE Network Intrusion Detection</h1>

      <div className="nav-links">
        <Link
          to="/home"
          className={location.pathname === "/home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/dataset"
          className={location.pathname === "/dataset" ? "active" : ""}
        >
          Dataset
        </Link>

        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          Contact Us
        </Link>

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
