import React, { useState } from "react";

function ChatWindow({ chat, messages, socket, username, onBack, isMobile }) {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const msg = {
        id: Date.now(), // unique key for React
        sender: username,
        text: newMessage,
        chatId: chat.id,
      };
      socket.emit("sendMessage", msg);
      setNewMessage("");
    }
  };

  const deleteMessage = (id) => {
    socket.emit("deleteMessage", { chatId: chat.id, messageId: id });
  };

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        {isMobile && <button onClick={onBack}>⬅ Back</button>}
        <h3>{chat.name}</h3>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id} // ✅ unique key here
            className={`message ${msg.sender === username ? "me" : "other"}`}
          >
            <span className="sender">{msg.sender}:</span> {msg.text}
            {msg.sender === username && (
              <button onClick={() => deleteMessage(msg.id)}>❌</button>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
