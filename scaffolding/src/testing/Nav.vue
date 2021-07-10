<template>
  <div>
    <!-- testing/Nav.vue -->
    <mt-navbar v-model="navactive">
      <mt-tab-item id="1">
        推荐
        <!-- <img slot="icon" src="../assets/cr.jpg" alt=""> -->
      </mt-tab-item>
      <mt-tab-item id="2">科技</mt-tab-item>
      <mt-tab-item id="3">数码</mt-tab-item>
      <mt-tab-item id="4">人文</mt-tab-item>
    </mt-navbar>
    <!-- 内容面板容器 -->
    <mt-tab-container v-model="navactive">
      <mt-tab-container-item id="1">选择了推荐</mt-tab-container-item>
      <mt-tab-container-item id="2">选择了科技</mt-tab-container-item>
      <mt-tab-container-item id="3">选择了数码</mt-tab-container-item>
      <mt-tab-container-item id="4">选择了人文</mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navactive: '1'
    }
  },
}
</script>