import { WebSocketServer } from "ws";

function server() {
  const wss = new WebSocketServer({ port: 9090 });

  wss.on("connection", (ws) => {
    ws.on("close", (close) => {
      console.error(close);

      setTimeout(() => {
        server();
      }, 1000);
    });
    ws.on("error", (error) => {
      console.error(error);
      wss.close();
    });

    ws.on("message", (data, isBinary) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });

    ws.send("Connected");
  });
}

server();
