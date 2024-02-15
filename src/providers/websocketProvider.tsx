"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const clientSocket = new WebSocket("ws://localhost:9090");

    clientSocket.addEventListener("open", () => {
      setIsConnected(true);
    });
    clientSocket.addEventListener("close", () => {
      setIsConnected(false);
    });

    setSocket(clientSocket);

    return () => {
      clientSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
