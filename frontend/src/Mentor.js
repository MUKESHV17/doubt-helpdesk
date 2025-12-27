import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";


function Mentor() {
  const [doubts, setDoubts] = useState([]);
  const [reply, setReply] = useState("");

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
      <h2>Mentor Dashboard</h2>

      {doubts.map(d => (
        <div key={d._id}>
          <h4>{d.title}</h4>
          <p>{d.description}</p>
          <input
            placeholder="Reply"
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
          <button onClick={() => sendReply(d._id)}>Send</button>
        </div>
      ))}
    </div>
  );
}

export default Mentor;
