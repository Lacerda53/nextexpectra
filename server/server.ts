import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  addTrailingSlash: false,
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("event", (message) => {
    io.emit("event", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(9090, () => {
  console.log("WebSocket server listening on port 9090");
});
