import React, { useState } from "react";
import axios from "axios";
import Student from "./Student";
import Mentor from "./Mentor";
import Signup from "./Signup";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);


  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );
    setUser(res.data);
    localStorage.setItem("token", res.data.token);
  };

if (user?.role === "student") return <Student />;
if (user?.role === "mentor") return <Mentor />;

if (showSignup) {
  return <Signup goToLogin={() => setShowSignup(false)} />;
}


  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
<br />
<button onClick={() => setShowSignup(true)}>Sign Up</button>

    </div>
  );
}

export default Login;
