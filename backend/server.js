// backend/server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend port (Vite default)
    methods: ["GET", "POST"],
  },
});

// Simple backend test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log("📩 Message:", msg);
    io.emit("receiveMessage", msg); // broadcast to everyone
  });

  socket.on("deleteMessage", ({ chatId, messageId }) => {
    io.emit("messageDeleted", { chatId, messageId });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));

