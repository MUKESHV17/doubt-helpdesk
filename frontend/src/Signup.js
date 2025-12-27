import React, { useState } from "react";
import axios from "axios";

function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const signup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup successful. Please login.");
      goToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <br />

      <select
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
      </select>

      <br />
      <button onClick={signup}>Create Account</button>

      <p>
        Already have an account?{" "}
        <button onClick={goToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Signup;
