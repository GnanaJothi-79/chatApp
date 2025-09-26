import React from "react";

const Message = ({ message, isOwn }) => {
  return (
    <div
      className={`my-2 p-2 rounded-lg max-w-xs ${
        isOwn ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"
      }`}
    >
      <p>{message.text}</p>
      <div className="text-xs text-gray-700 mt-1">
        {message.sender} • {message.timestamp}
      </div>
    </div>
  );
};

export default Message;
