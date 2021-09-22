<template>
  <div class="message" :class="self ? 'self' : ''">
    <div class="avatar">
      <img src="../assets/avatar/avatar1.jpg" alt="avatar" />
    </div>
    <div class="text">
      <div v-if="!self" class="username">{{ username }}</div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: String,
  self: Boolean,
});
</script>

<style scoped>
.message {
  display: flex;
  font-size: 14px;
  margin: 10px 0;
}

.message.self {
  flex-direction: row-reverse;
}

.avatar img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.self .avatar img {
  margin-right: 0;
  margin-left: 10px;
}

.text .username {
  color: #999;
  margin-bottom: 5px;
}

.text .content {
  position: relative;
  padding: 10px 13px;
  background-color: #fff;
}
.text .content::before {
  content: "";
  position: absolute;
  left: -8px;
  top: 7px;
  display: inline-block;
  border-style: solid;
  border-width: 5px 8.7px 5px 0;
  border-color: transparent #fff transparent transparent;
}
.self .text .content::before {
  left: unset;
  right: -8px;
  border-style: solid;
  border-width: 5px 0 5px 8.7px;
  border-color: transparent transparent transparent #fff;
}
</style>
