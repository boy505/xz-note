<template>
  <div>
    我是首页
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
  watch: {
    /** 监听selected的变化 一旦有变化 vue将会执行该方法
     * 并且传入两个参数：从 oldval 更改为 newval */
    selected(newval, oldval){
      console.log(`val1: ${newval}   val2: ${oldval}`);
      
      // this.$router.push('/'+newval)
      
      if(newval=='gouwuche'){
        this.$router.push('/gouwuche');
      }else if(newval=='wode'){
        this.$router.push('/wode');
      }
    }
  }
}
</script>