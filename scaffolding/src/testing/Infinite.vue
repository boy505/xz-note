<template>
  <div>
    <!--  Infinite.vue 无限滚动指令  -->
    <div v-infinite-scroll="loadMore"
         infinite-scroll-distance="40"
         infinite-scroll-disabled="busy"
         :infinite-scroll-immediate-check="true">
      <p v-for="(item,i) in n" :key="i"
         class="mp">这是一段话：{{i}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      busy: false,   // busy用于控制无限滚动是否禁用
      n: 10 
    }
  },
  methods:{
    loadMore(){  // 监听触底事件
      console.log('loadMore...');
      this.busy = true;  // 禁用无限滚动，防止重复调用
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "double-bounce"
      })
      window.setTimeout(()=>{
        this.n += 20;  // 一般情况下耗时，需要异步操作
        this.busy = false; // 响应已返回，重新启用无限滚动
        this.$indicator.close();
      } ,5000)
    }
  }
}
</script>
<style scoped> 
.mp {
  height: 40px; 
  line-height: 40px; text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>