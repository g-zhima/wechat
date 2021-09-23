import webSocketType from "../constant/webSocketType";
import { reactive, ref } from "@vue/reactivity";

export class Ws {
  loggingUser = ref("");

  constructor(url) {
    this.ws = new WebSocket(url);
    this.$instance = this.ws;
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
          this._userLogin(data);
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

  _userLogin(username) {
    this.loggingUser.value = username;
  }
  getloggingUser() {
    return this.loggingUser;
  }
}
