import React from "react";

const chats = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
];

export default function ChatList({ onSelectChat }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          <img src={chat.avatar} alt="avatar" />
          <span>{chat.name}</span>
        </div>
      ))}
    </div>
  );
}
