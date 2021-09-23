import webSocketType from "../constant/webSocketType";

export class Ws {
  constructor(url) {
    this.ws = new WebSocket(url);
  }

  init() {
    this.ws.onopen = () => {
      console.log("open");
    };
    this.ws.onerror = (error) => {
      console.log("error", error);
    };
    this.ws.onmessage = (message) => {
      console.log("message", message);
      const { type, data } = JSON.parse(message.data);
      switch (type) {
        case webSocketType.LOGIN:
          console.log("user login");
          break;
      }
    };
    this.ws.onclose = () => {
      console.log("close");
    };
  }

  close() {
    this.ws.close();
  }

  send(data) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(data);
    }
  }
}
