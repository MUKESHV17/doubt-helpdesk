import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";
import Header from "./Header";
import Notification from "./Notification";


function Mentor() {
  const [doubts, setDoubts] = useState([]);
  const [reply, setReply] = useState("");
  const [notification, setNotification] = useState("");


  const token = localStorage.getItem("token");

 useEffect(() => {
  // 🔥 VERY IMPORTANT: tell backend mentor is online
  socket.emit("mentor_online");

  // load open doubts
  axios
    .get("http://localhost:5000/api/mentor/doubts", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setDoubts(res.data));

  const handleNewDoubt = (doubt) => {
  setDoubts(prev => [...prev, doubt]);
  setNotification("New doubt received 📩");
};


  socket.on("new_doubt", handleNewDoubt);

  // cleanup
  return () => {
    socket.off("new_doubt", handleNewDoubt);
  };
}, []);


  const sendReply = async (id) => {
    await axios.post(
      `http://localhost:5000/api/mentor/reply/${id}`,
      { message: reply },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    socket.emit("join_doubt", id);
    setReply("");
  };

  return (
    
  <div>
    <Notification
  message={notification}
  clear={() => setNotification("")}
/>

    <Header title="Mentor Dashboard" />

    <div className="container">
      {doubts.length === 0 && (
        <div className="card">
          <p className="muted">No open doubts 🎉</p>
        </div>
      )}

      {doubts.map(d => (
        <div className="card" key={d._id}>
          <h3>{d.title}</h3>
          <p className="muted">{d.description}</p>

          <textarea
            placeholder="Type your reply here..."
            value={reply}
            onChange={e => setReply(e.target.value)}
          />

          <button onClick={() => sendReply(d._id)} disabled={!reply}>
            Send Reply
          </button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Mentor;
