import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState("Me");

  const handleSend = (text) => {
    if (!text.trim()) return;
    const newMessage = {
      sender: activeUser,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
  };

  const users = ["Me", "Alice", "Bob"];

  return (
    <div className="flex h-screen">
      <Sidebar users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} activeUser={activeUser} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
