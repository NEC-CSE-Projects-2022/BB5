import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Dataset from "./components/Dataset";

function App() {
  const [result, setResult] = useState(null);

  return (
    <Router>
      <MainContent result={result} setResult={setResult} />
    </Router>
  );
}

function MainContent({ result, setResult }) {
  const location = useLocation();

  // Hide Navbar on auth pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/dataset" element={<Dataset />} />

        <Route
          path="/dashboard"
          element={
            <>
              <UploadCSV setResult={setResult} />
              <Dashboard result={result} />
            </>
          }
        />

        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
