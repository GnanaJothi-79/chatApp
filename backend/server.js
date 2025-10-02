// backend/server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// Allow frontend to connect (replace with your actual frontend URL)
app.use(cors({
  origin: "https://frontend-2mtmt1nug-gnana-jothis-projects.vercel.app",
  methods: ["GET", "POST"]
}));

// Create HTTP server
const server = createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "https://frontend-2mtmt1nug-gnana-jothis-projects.vercel.app",
    methods: ["GET", "POST"]
  }
});

// Test route to check backend
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Keep all messages in memory (replace with DB for persistence)
let chatMessages = {};

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Send initial chat messages
  socket.emit("initChats", chatMessages);

  // Listen for new messages
  socket.on("sendMessage", (msg) => {
    console.log("📩 Message received:", msg);
    const { chatId } = msg;
    if (!chatMessages[chatId]) chatMessages[chatId] = [];
    chatMessages[chatId].push(msg);

    // Broadcast message to all clients
    io.emit("receiveMessage", msg);
  });

  // Listen for message deletion
  socket.on("deleteMessage", ({ chatId, messageId }) => {
    if (chatMessages[chatId]) {
      chatMessages[chatId] = chatMessages[chatId].filter(m => m.id !== messageId);
      io.emit("messageDeleted", { chatId, messageId });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
