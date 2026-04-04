import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  socket = io("https://wilfredo-limitary-rosio.ngrok-free.dev", {
    transports: ["websocket"],
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;