import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindow = ({ messages, activeUser }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto border border-gray-300 flex flex-col">
      {messages.map((msg, idx) => (
        <Message key={idx} message={msg} isOwn={msg.sender === activeUser} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
