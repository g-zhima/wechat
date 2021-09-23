const express = require("express");
const ws = require("ws");
const path = require("path");
const webSocketsType = require("../constant/webSocketType");

const app = express();
// app.use(express.static(path.resolve(__dirname, "../../dist")));

const webSockets = new ws.Server({ port: 5899 });

// send 方法序列化 js 对象
const send = (ws, data) => {
  ws.send(JSON.stringify(data));
};

/**
 * 广播消息
 * @param {any} data 广播的内容
 */
const broadcast = (data) => {
  webSockets.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      send(client, data);
    }
  });
};

/**
 * 用户登录
 */
const userLogin = (username) => {
  broadcast({ type: 1, data: username });
};

webSockets.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    switch (type) {
      case webSocketsType.LOGIN:
        console.log("login", data);
        userLogin(data);
        break;
      case webSocketsType.LOGOUT:
        console.log("logout");
        break;
    }
  });
});

webSockets.on("error", () => {
  console.log("error");
});

webSockets.on("close", () => {
  console.log("close");
});

app.listen(3000, () => {
  console.log("App was running at http://localhost:3000");
});
