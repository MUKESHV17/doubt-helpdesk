import React from "react";

function Header({ title }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "30px"
      }}
    >
      <h2 style={{ margin: 0 }}>{title}</h2>
    </div>
  );
}

export default Header;
