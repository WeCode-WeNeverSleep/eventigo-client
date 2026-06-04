import { io } from "socket.io-client";

export const createSocket = (socketUrl: string) =>
  io(socketUrl, { autoConnect: false });
