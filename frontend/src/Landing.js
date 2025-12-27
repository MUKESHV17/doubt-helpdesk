import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="overlay">
        <h1>Real-Time Doubt Solving Platform</h1>
        <p>Get instant help from mentors. Learn smarter.</p>

        <div className="landing-buttons">
          <button onClick={() => navigate("/login")}>Sign In</button>
          <button className="secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
