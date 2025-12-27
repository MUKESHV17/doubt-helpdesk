import React, { useState } from "react";
import axios from "axios";
import Student from "./Student";
import Mentor from "./Mentor";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();


  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );
    if (res.data.role === "student") navigate("/student");
    if (res.data.role === "mentor") navigate("/mentor");

    localStorage.setItem("token", res.data.token);
  };



if (showSignup) {
  return <Signup goToLogin={() => setShowSignup(false)} />;
}


  return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Sign In</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Sign In</button>

      <div className="auth-link">
        New to platform?{" "}
        <button onClick={() => navigate("/signup")}>
          Sign up now
        </button>
      </div>
    </div>
  </div>
);

}

export default Login;
