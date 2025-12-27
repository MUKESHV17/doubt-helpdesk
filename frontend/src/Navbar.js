import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Navbar({ title, notifications = [] }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="navbar">
    <h2 className="logo">{title}</h2>

    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <NotificationBell notifications={notifications} />
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  </div>
);

}

export default Navbar;
