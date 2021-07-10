<template>
  <div>
    <!-- testing/Swipe.vue  轮播图组件 -->
    <mt-swipe class="swipe" :style="{height: h}"
      :speed="200"
      :auto="3000"
      :showIndicators="false"
      :continuous="true"
      :defaultIndex="1">
      <mt-swipe-item>
        <img src="../assets/1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/3.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h: '211px'
    }
  },
  // 页面挂载完毕后，根据屏幕的宽度，计算轮播图的高度
  mounted(){
    let picWidth = 1242; // 图片宽
    let picHeight = 699; // 图片高
    let screenWidth = window.screen.width; // 屏幕宽
    let swipeHeight = 
        Math.floor((picHeight*screenWidth)/picWidth)+"px";
    this.h = swipeHeight;
  }
}
</script>

<style scoped>
.swipe {
  height: 211px;
}
.swipe img{
  width: 100vw;
}
</style>