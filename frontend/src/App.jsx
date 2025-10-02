import React, { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Welcome from "./components/Welcome";
import useSocket from "./hooks/useSocket";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");       // Final username
  const [tempName, setTempName] = useState("");       // Typing in input
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [chatMessages, setChatMessages] = useState({}); // messages per chat

  const socket = useSocket();

  // ✅ Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Listen for incoming messages from backend
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (msg) => {
      setChatMessages((prev) => {
        const prevMessages = prev[msg.chatId] || [];
        return { ...prev, [msg.chatId]: [...prevMessages, msg] };
      });
    });

    socket.on("messageDeleted", ({ chatId, messageId }) => {
      setChatMessages((prev) => {
        const prevMessages = prev[chatId] || [];
        return {
          ...prev,
          [chatId]: prevMessages.filter((m) => m.id !== messageId),
        };
      });
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, [socket]);

  // ✅ Dummy chat list (later you can load from backend)
  const chats = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  // ✅ Login screen before username is set
  if (!username) {
    return (
      <div className="login">
        <h2>Enter your name:</h2>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder="Type your name"
        />
        <button onClick={() => tempName && setUsername(tempName)}>Join</button>
      </div>
    );
  }

  // ✅ Main app UI
  return (
    <div className="app-container">
      {/* Chat list */}
      {(!isMobileView || !selectedChat) && (
        <ChatList
          chats={chats}
          onSelectChat={(chat) => setSelectedChat(chat)}
        />
      )}

      {/* Welcome message */}
      {(!isMobileView && !selectedChat) && <Welcome username={username} />}

      {/* Chat window */}
      {selectedChat && (
        <ChatWindow
          chat={selectedChat}
          messages={chatMessages[selectedChat.id] || []}
          socket={socket}
          username={username}
          onBack={() => setSelectedChat(null)}
          isMobile={isMobileView}
        />
      )}
    </div>
  );
}

export default App;
