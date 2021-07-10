<template>
  <div>
    <!-- testing/Tabbar.vue  底部选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="shouye">
        首页
        <img slot="icon" v-if="selected=='shouye'" src="../assets/main_1.png" alt="">
        <img slot="icon" v-else src="../assets/main_0.png" alt="">
      </mt-tab-item>
      <mt-tab-item id="gouwuche">
        购物车
        <img slot="icon" v-if="selected=='gouwuche'" src="../assets/cart_1.png" alt="">
        <img slot="icon" v-else src="../assets/cart_0.png" alt="">
      </mt-tab-item>
      <mt-tab-item id="wode">
        我的
        <img slot="icon" v-if="selected=='wode'" src="../assets/me_1.png" alt="">
        <img slot="icon" v-else src="../assets/me_0.png" alt="">
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: 'shouye'
    }
  },
}
</script>