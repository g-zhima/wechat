const express = require("express");
const ws = require("ws");
const path = require("path");
const webSocketsType = require("../constant/webSocketType");

const app = express();
const webSockets = new ws.Server({ port: 5899 });
// app.use(express.static(path.resolve(__dirname, "../../dist")));

/**
 * @type {Array<string>}} 用户列表
 */
let userList = [];

/**
 * @type {Array<string>} 消息列表
 */
let messageList = [];

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
const broadcastUserLogin = (username) => {
  broadcast({ type: 1, data: username });
};

/**
 * 广播用户列表
 */
const broadcastUserList = () => {
  broadcast({
    type: webSocketsType.USER_LIST,
    data: userList,
  });
};

/**
 * 广播消息列表
 */
const broadcastMessageList = () => {
  broadcast({
    type: webSocketsType.MESSAGE_LIST,
    data: messageList,
  });
};

/**
 * 广播最新消息
 */
const broadcastMessage = (data, type) => {
  broadcast({
    type: 11,
    data,
  });
};

webSockets.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    switch (type) {
      case webSocketsType.LOGIN:
        console.log("login", data);
        broadcastUserLogin(data);
        break;
      case webSocketsType.LOGOUT:
        console.log("logout");
        break;
      case webSocketsType.SEND_MESSAGE:
        console.log("send");
        broadcastMessage(data);
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
