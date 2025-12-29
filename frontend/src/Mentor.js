import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import Navbar from "./Navbar";
import ChatBubble from "./ChatBubble";

function Mentor() {
  const [doubts, setDoubts] = useState([]);
  const [conversations, setConversations] = useState({});
  const [replyText, setReplyText] = useState({});
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  /* ============================
     ON LOAD: FETCH DOUBTS
  ============================ */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mentor/doubts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setDoubts(res.data);
      });
  }, [token]);

  /* ============================
     SOCKET: NEW DOUBT
  ============================ */
  useEffect(() => {
    socket.on("new_doubt", (doubt) => {
      setDoubts((prev) => [...prev, doubt]);

      setNotifications((prev) => [
        "New doubt received 📩",
        ...prev
      ]);
    });

    return () => {
      socket.off("new_doubt");
    };
  }, []);

  /* ============================
     SEND REPLY
  ============================ */
  const sendReply = async (doubtId) => {
    const message = replyText[doubtId];
    if (!message) return;

    await axios.post(
      `http://localhost:5000/api/mentor/reply/${doubtId}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // join room (safe even if already joined)
    socket.emit("join_doubt", doubtId);

    // update mentor UI
    setConversations((prev) => ({
      ...prev,
      [doubtId]: [
        ...(prev[doubtId] || []),
        { sender: "mentor", text: message }
      ]
    }));

    // clear textarea
    setReplyText((prev) => ({
      ...prev,
      [doubtId]: ""
    }));
  };

  return (
    <div>
      <Navbar title="Mentor Dashboard" notifications={notifications} />

      <div className="container">
        {doubts.length === 0 && (
          <div className="card">
            <p className="muted">No open doubts 🎉</p>
          </div>
        )}

        {doubts.map((doubt) => (
          <div key={doubt._id} className="card">
            <h3>{doubt.title}</h3>
            <p className="muted">{doubt.description}</p>

            {/* CHAT AREA */}
            <div
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                marginBottom: "10px"
              }}
            >
              {(conversations[doubt._id] || []).map((m, i) => (
                <ChatBubble key={i} message={m} />
              ))}
            </div>

            {/* REPLY BOX */}
            <textarea
              placeholder="Type your reply..."
              value={replyText[doubt._id] || ""}
              onChange={(e) =>
                setReplyText((prev) => ({
                  ...prev,
                  [doubt._id]: e.target.value
                }))
              }
            />

            <button onClick={() => sendReply(doubt._id)}>
              Send Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentor;
