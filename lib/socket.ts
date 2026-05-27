import { io } from "socket.io-client";

const socketUrl = process.env.SOCKET_URL;

if (!socketUrl) {
  throw new Error("SOCKET_URL is not defined");
}

export const socket = io(socketUrl, {
  autoConnect: false,
});