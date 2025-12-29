import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "./socket";
import Navbar from "./Navbar";
import ChatBubble from "./ChatBubble";

function Student() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // conversations[doubtId] = [ { sender, text } ]
  const [conversations, setConversations] = useState({});

  const [mentorOnline, setMentorOnline] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  /* ============================
     SOCKET: Mentor Online Status
  ============================ */
  useEffect(() => {
    socket.on("mentor_status", (status) => {
      setMentorOnline(status);
    });

    return () => {
      socket.off("mentor_status");
    };
  }, []);

  /* ============================
     SOCKET: Mentor Reply
  ============================ */
  useEffect(() => {
    socket.on("mentor_reply", ({ doubtId, message }) => {
      setConversations((prev) => ({
        ...prev,
        [doubtId]: [
          ...(prev[doubtId] || []),
          { sender: "mentor", text: message }
        ]
      }));

      setNotifications((prev) => [
        "Mentor replied to your doubt ✅",
        ...prev
      ]);
    });

    return () => {
      socket.off("mentor_reply");
    };
  }, []);

  /* ============================
     ASK DOUBT
  ============================ */
  const askDoubt = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/doubts",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const doubtId = res.data.doubt._id;

    // join socket room
    socket.emit("join_doubt", doubtId);

    // create conversation for this doubt
    setConversations((prev) => ({
      ...prev,
      [doubtId]: [{ sender: "student", text: description }]
    }));

    // clear inputs
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <Navbar title="Student Dashboard" notifications={notifications} />

      <div className="container">
        {/* ASK DOUBT CARD */}
        <div className="card">
          <h3>
            Mentor Status:{" "}
            {mentorOnline ? (
              <span className="status-online">Online 🟢</span>
            ) : (
              <span className="status-offline">Offline 🔴</span>
            )}
          </h3>

          <input
            placeholder="Doubt Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe your doubt..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={askDoubt} disabled={!title || !description}>
            Ask Doubt
          </button>
        </div>

        {/* CONVERSATIONS */}
        {Object.entries(conversations).map(([doubtId, msgs]) => (
          <div key={doubtId} className="card">
            <h3>Conversation</h3>

            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {msgs.map((m, i) => (
                <ChatBubble key={i} message={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student;
