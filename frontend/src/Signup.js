import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const navigate = useNavigate();


  const signup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup successful. Please login.");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Sign Up</h2>

      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <select
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
      </select>

      <button onClick={signup}>Create Account</button>

      <div className="auth-link">
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  </div>
);

}

export default Signup;
