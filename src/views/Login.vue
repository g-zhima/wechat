<template>
  <div class="login">
    <div class="input-box">
      <div class="welcome">吴聊</div>
      <div class="input">
        <input class="username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="btn">
        <button class="enter" @click="handleEnter">加入吴聊</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleEnter = () => {
  router.push({
    path: "/",
  });
};
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
