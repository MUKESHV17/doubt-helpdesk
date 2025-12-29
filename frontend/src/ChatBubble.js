import React from "react";

function ChatBubble({ message }) {
  const isStudent = message.sender === "student";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isStudent ? "flex-end" : "flex-start",
        marginBottom: "10px"
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: "14px",
          backgroundColor: isStudent ? "#4f46e5" : "#e5e7eb",
          color: isStudent ? "white" : "black"
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

export default ChatBubble;
