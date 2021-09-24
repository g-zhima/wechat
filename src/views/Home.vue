<template>
  <div class="home">
    <div class="box">
      <div class="userlist">
        <div class="list-title">在线成员 (8)</div>
        <div class="list-user" v-for="item in 3" :key="item">
          <img src="../assets/avatar/avatar1.jpg" alt="avatar" />
          zhima{{ item }}
        </div>
      </div>
      <div class="chat">
        <div class="chat-title">吴聊 (8)</div>
        <div class="chat-main" ref="messageListEle">
          <Message username="博总">{{ loggingUser }}</Message>
          <Message self>可以,如果你想的话</Message>
          <Message self>静态页面搞好了</Message>
          <Message username="博总">6</Message>
          <Message username="博总">成了？</Message>
          <Message username="博总"
            >我是不是能通过这个把公司的基米发过去</Message
          >
          <Message self>早的呢</Message>
          <Message self>😔</Message>
          <Tip>xx加入了吴聊</Tip>
          <component
            v-for="item in messageList"
            :is="item.type"
            v-bind="item.props"
          >
            {{ item.slots }}
          </component>
        </div>
        <div class="chat-input">
          <div class="input-btns">
            <i class="iconfont icon-biaoqing"></i>
            <i class="iconfont icon-tupian"></i>
          </div>
          <div class="input-area">
            <textarea v-model="input" placeholder="请输入聊天内容"></textarea>
          </div>
          <div class="input-send">
            <span class="send-tip">按 CTRL + ENTER 发送</span>
            <button class="send-button" @click="handleSend">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw, reactive, ref } from "@vue/reactivity";
import { onMounted, inject, watch } from "@vue/runtime-core";
import Message from "../components/Message.vue";
import Tip from "../components/Tip.vue";
import { Ws } from "../uitls/WebSocket";
import useScrollToButtom from "../hooks/useScrollToButtom";
import webSocketType from "../constant/webSocketType";

/**
 * @typedef {{type: any, props: any, slots: any}} messageItem
 * @type {messageItem[]}
 */
const messageList = reactive([]);

/**
 * @type {Ws}
 */
const ws = inject("ws");
let loggingUser = ws.getloggingUser();
ws.$instance.addEventListener("message", (message) => {
  const { data, type } = JSON.parse(message.data);
  if (type === webSocketType.SEND_MESSAGE) {
    messageList.push({
      type: markRaw(Message),
      props: { username: "naizhu" },
      slots: data,
    });
  }
});

/**
 *
 */
const input = ref("");
const handleSend = () => {
  if (input.value.trim()) {
    ws.send(
      JSON.stringify({
        type: webSocketType.SEND_MESSAGE,
        data: input.value,
      })
    );
  } else alert("请输入内容");
};

/**
 * 组件挂载和更新时,将消息窗口滚动到最下面
 */
const messageListEle = ref(null);
onMounted(() => {
  useScrollToButtom(messageListEle.value);
});
watch(
  () => [...messageList],
  () => {
    console.log("effec");
    useScrollToButtom(messageListEle.value);
  }
);
</script>

<style scoped>
@font-face {
  font-family: "iconfont"; /* Project id 2827146 */
  src: url("//at.alicdn.com/t/font_2827146_jil5mj5uau.woff2?t=1632296358460")
      format("woff2"),
    url("//at.alicdn.com/t/font_2827146_jil5mj5uau.woff?t=1632296358460")
      format("woff"),
    url("//at.alicdn.com/t/font_2827146_jil5mj5uau.ttf?t=1632296358460")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-tupian:before {
  content: "\e603";
}

.icon-biaoqing:before {
  content: "\e615";
}

::-webkit-scrollbar-track-piece {
  background-color: #eee;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: #909090;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.box {
  display: flex;
  width: 800px;
  height: 600px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.userlist {
  width: 200px;
  background-color: #2e3238;
  padding: 0 20px;
  color: #fff;
  overflow: auto;
}

.list-title {
  position: absolute;
  background-color: #2e3238;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #292c33;
}

.list-user {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px 0;
  font-size: 12px;
}
.list-user:nth-child(2) {
  margin-top: 50px;
}
.list-user img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
}

.chat {
  width: 600px;
  height: 600px;
}

.chat-title {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #d5d5d5;
}

.chat-main {
  height: 370px;
  overflow: auto;
  border-bottom: 1px solid #d5d5d5;
  padding: 10px 20px;
}

.input-btns {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
}
.input-btns i {
  margin-right: 10px;
  color: #999;
  cursor: pointer;
}

.input-area {
  height: 90px;
  background-color: lightgreen;
}
.input-area textarea {
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;
  border: none;
  background-color: #eeeeee;
  padding: 0 10px;
  font-size: 14px;
  overflow: auto;
}

.input-send {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  margin-top: 10px;
}
.send-tip {
  color: #999;
  margin-right: 10px;
}
.send-button {
  padding: 3px 20px;
  background-color: #fff;
  border: 1px solid #c1c1c1;
  cursor: pointer;
}
</style>
