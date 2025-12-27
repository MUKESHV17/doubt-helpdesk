import React from "react";

function Notification({ message, clear }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#111827",
        color: "white",
        padding: "14px 18px",
        borderRadius: "8px",
        zIndex: 1000,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
      }}
      onClick={clear}
    >
      {message}
    </div>
  );
}

export default Notification;
