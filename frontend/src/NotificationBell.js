import React, { useState } from "react";

function NotificationBell({ notifications }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "20px",
          cursor: "pointer"
        }}
      >
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              background: "red",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              marginLeft: "6px"
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "30px",
            background: "white",
            color: "black",
            width: "250px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            padding: "10px"
          }}
        >
          <h4>Notifications</h4>
          {notifications.length === 0 && <p>No notifications</p>}
          {notifications.map((n, i) => (
            <p key={i} style={{ fontSize: "14px" }}>
              {n}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
