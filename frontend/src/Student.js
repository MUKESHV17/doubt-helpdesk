import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "./socket";
import Header from "./Header";


function Student() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const [mentorOnline, setMentorOnline] = useState(false);


  const token = localStorage.getItem("token");

 useEffect(() => {
  const handleReply = (msg) => {
    setMessages(prev => [...prev, msg.message]);
  };

  socket.on("mentor_reply", handleReply);

  return () => {
    socket.off("mentor_reply", handleReply);
  };
}, []);
useEffect(() => {
  const handleMentorStatus = (status) => {
    setMentorOnline(status);
  };

  socket.on("mentor_status", handleMentorStatus);

  return () => {
    socket.off("mentor_status", handleMentorStatus);
  };
}, []);



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

    // join socket room
    socket.emit("join_doubt", res.data.doubt._id);
  };

  return (
  <div>
    <Header title="Student Dashboard" />

    <div className="container">
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
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe your doubt..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button onClick={askDoubt} disabled={!title || !description}>
          Ask Doubt
        </button>
      </div>

      <div className="card">
        <h3>Replies</h3>
        {messages.length === 0 && (
          <p className="muted">No replies yet</p>
        )}
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  </div>
);

}

export default Student;

