import React from "react";

const Sidebar = ({ users, activeUser, setActiveUser }) => {
  return (
    <div className="w-1/4 border-r border-gray-300 p-4">
      <h2 className="font-bold mb-2">Users</h2>
      {users.map((user) => (
        <div
          key={user}
          className={`p-2 cursor-pointer rounded ${
            activeUser === user ? "bg-blue-200" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveUser(user)}
        >
          {user}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
