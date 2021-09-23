<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { Ws } from "./uitls/WebSocket";
import { provide } from "@vue/runtime-core";

const ws = new Ws("ws://localhost:5899");
ws.init();
provide("ws", ws);
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
  margin-right: 2px;
}
::-webkit-scrollbar:horizontal {
  height: 10px;
  margin-bottom: 2px;
}
::-webkit-scrollbar-track-piece {
  background-color: #2e3238;
}
::-webkit-scrollbar-thumb {
  width: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb:hover {
  background: #909090;
}

.app {
  width: 100%;
  height: 100vh;
  background-image: url(./assets/bg.jpg);
  background-size: 100%;
}
</style>
