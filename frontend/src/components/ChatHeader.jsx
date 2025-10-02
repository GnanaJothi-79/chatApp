import React from "react";

export default function ChatHeader({ chat, onBack, isMobile }) {
  if (!chat) return null;
  return (
    <div className="chat-header">
      {isMobile && (
        <button className="back-btn" onClick={onBack}>
          ◀
        </button>
      )}
      <img src={chat.avatar} alt="avatar" />
      <span>{chat.name}</span>
    </div>
  );
}
