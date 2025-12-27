const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const doubtRoutes = require("./routes/doubtRoutes");
const mentorRoutes = require("./routes/mentorRoutes");



require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/mentor", mentorRoutes);




// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB running 🚀");
});


// setup server with socket.io

const http = require("http");
const { Server } = require("socket.io");

// create http server
const server = http.createServer(app);

// socket.io server
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

// socket connection
const onlineMentors = new Set();


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // mentor comes online
 socket.on("mentor_online", () => {
  onlineMentors.add(socket.id);
  io.emit("mentor_status", onlineMentors.size > 0);
});


  // join doubt room
  socket.on("join_doubt", (doubtId) => {
    socket.join(doubtId);
  });

  socket.on("disconnect", () => {
  onlineMentors.delete(socket.id);
  io.emit("mentor_status", onlineMentors.size > 0);
});

});


// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
