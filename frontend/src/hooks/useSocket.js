import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // IMPORTANT: deployed backend URL, HTTPS
    const newSocket = io("https://chatapp-rl4i.onrender.com", {
      transports: ["websocket"],
      secure: true,    // enforce HTTPS
      reconnection: true,
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return socket;
}
