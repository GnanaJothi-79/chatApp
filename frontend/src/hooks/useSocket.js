import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Use backend URL from environment variable
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"], // ensures WebSocket connection
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.disconnect();
  }, []);

  return socket;
}
