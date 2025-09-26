import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex p-3 border-t border-gray-300">
      <input
        className="flex-1 border rounded px-2 py-1"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="ml-2 px-4 bg-blue-500 text-white rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
