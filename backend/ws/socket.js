const WebSocket = require("ws");
const { Subscriber } = require("../shared/redis");

module.exports = () => {
  const wss = new WebSocket.Server({ port: 5003 });

  console.log("WebSocket server running on ws://localhost:5002");

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "WELCOME", message: "Connected" }));

    ws.on("message", (data) => {
      const msg = JSON.parse(data);
      if (msg.type === "BROADCAST") {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "CLIENT_BROADCAST", payload: msg.payload }));
          }
        });
      }
    });
  });

  Subscriber.subscribe("appointment:new", (msg) => {
    const data = JSON.parse(msg);
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(JSON.stringify({ type: "APPOINTMENT_NEW", data }));
      }
    });
  });

  Subscriber.subscribe("appointment:status", (msg) => {
    const data = JSON.parse(msg);
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(JSON.stringify({ type: "APPOINTMENT_STATUS", data }));
      }
    });
  });

  return wss;
};
