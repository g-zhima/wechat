<template>
  <div class="login">
    <div class="input-box">
      <div class="welcome">吴聊</div>
      <div class="input">
        <input
          v-model="inputName"
          class="username"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="btn">
        <button class="enter" @click="handleEnter">加入吴聊</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { Ws } from "../uitls/WebSocket";
import webSocketType from "../constant/webSocketType";

let inputName = ref("");

/**
 * @type {Ws}
 */
const ws = inject("ws");

const router = useRouter();
const pushToHome = () => {
  router.push({
    path: "/",
  });
};

/**
 * 判断去除空格后的用户名是否为空,
 * 不为空的情况下将输入的用户名存入 localStorage 中并跳转到 Home 页面
 */
const handleEnter = () => {
  if (inputName.value.trim()) {
    ws.send(
      JSON.stringify({
        type: webSocketType.LOGIN,
        data: inputName.value,
      })
    );
    localStorage.setItem("username", inputName.value);
    pushToHome();
  } else {
    inputName.value = "";
    alert("请输入正确的用户名");
  }
};

/**
 * 进入 Login 页面后获取 localStorage 中的 username 值,
 * 如果 username 不为空,说明用户未登出, 直接跳转到 Home 页
 */
const username = localStorage.getItem("username");
if (username) pushToHome();
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.input-box {
  width: 380px;
  height: 340px;
  background-color: #fff;
  border-radius: 5px;
}

.welcome {
  margin: 30px 0 30px 0;
  text-align: center;
  font-family: serif;
  font-weight: bold;
  font-size: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid #d5d5d5;
}

.input {
  width: 268px;
  height: 40px;
  margin: 0 auto 30px auto;
}
.input .username {
  width: 100%;
  height: 100%;
  outline: none;
  border: 1px solid #ddd;
  padding: 0 10px;
  line-height: 40px;
  border-radius: 2px;
  font-size: 18px;
}
.input .username:focus {
  border: 3px solid hotpink;
}

.btn {
  width: 268px;
  height: 40px;
  margin: 0 auto 30px auto;
}
.btn .enter {
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #fff;
  background-color: pink;
  outline: none;
  border: none;
  border-radius: 2px;
}
.btn .enter:hover {
  background-color: lightpink;
  border: 3px solid hotpink;
}
</style>
