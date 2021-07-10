<template>
  <div>
    <!-- Header -->
    <mt-header title="我的个人信息" fixed>
    </mt-header>

    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        首页
        <img slot="icon" v-if="selected=='home'" 
            src="../assets/main_1.png" alt="">
        <img v-else slot="icon" src="../assets/main_0.png" alt="">
      </mt-tab-item>
      <mt-tab-item id="me">
        我的
        <img slot="icon" v-if="selected=='me'" 
            src="../assets/me_1.png" alt="">
        <img v-else slot="icon" src="../assets/me_0.png" alt="">
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>
<script>
export default {
  data() {
    return {
      navactive: '1',
      selected: 'me'
    }
  },
  watch: {
    /** 当改变底部选项卡selected的值后触发 */
    selected(newval){
      if(newval=='home'){
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
  .links a{
    color: white;
  }
</style>