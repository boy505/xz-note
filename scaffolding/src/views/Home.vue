<template>
  <div>
    <!-- Header -->
    <mt-header title="学前端，到达内" fixed>
      <div slot="right" v-if = "$store.state.islogin">欢迎:{{ $store.state.username }}</div>
      <div slot="right" class="links" v-else>
        <router-link to="/register">注册</router-link>
        &nbsp;
        <router-link to="/login">登录</router-link>
      </div>
    </mt-header>

    <!-- 导航 -->
    <mt-navbar style="top:40px;" v-model="navactive" fixed>
      <mt-tab-item :id="item.id+''"
        v-for="(item, i) in category" :key="i">
        {{item.category_name}}
      </mt-tab-item>  
    </mt-navbar>

    <!-- 内容面板 -->
    <!-- <div style="overflow-y: scroll; position:fixed; top: 90px; left:0px; right:0px; bottom:55px;" -->
    <div style="margin-top: 90px; margin-bottom: 55px;"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="40"
      infinite-scroll-disabled="busy"
      :infinite-scroll-immediate-check="true">
      <!-- <mt-tab-container style="margin-top: 90px; margin-bottom: 55px;" v-model="navactive"> -->
      <!-- testing/Swipe.vue  轮播图组件 -->
      <mt-swipe class="swipe" :style="{height: h}"
        :speed="200"
        :auto="3000"
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

      <!-- 单一文章信息开始 -->
      <div class="articleItem"
        v-for="(item, i) in articles" :key="i">

        <router-link :to="`/article?id=${item.id}`">
          <!-- 文章标题开始 -->
          <div class="articleItem-header">{{item.subject}}</div>
          <!-- 文章标题结束 -->
          <!-- 文章图文信息开始 -->
          <div class="articleItem-wrapper">
            <!-- 文章图像开始  -->
            <div class="articleImg">
              <img v-if="item.image" :src="item.image" />
            </div>
            <!-- 文章图像结束 -->
            <!-- 文章简介开始 -->
            <div class="articleDes">
              {{item.description}}
            </div>
            <!-- 文章简介结束 -->
          </div>
          <!-- 文章图文信息结束 -->
        </router-link>
      </div>
      <!-- 单一文章信息结束 -->    
    </div>

    <!-- 底部选项卡 -->
    <mt-tabbar fixed v-model="selected">
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
      selected: 'home',
      h: '211px',
      category: [],   // 保存类别列表
      articles: [],    // 保存当前文章列表
      busy: false,
      page: 1   // 当前页码
    }
  },
  methods: {

    /** 通过cid与page，查询文章列表，通过回调方法返回结果  
     * cid: 类别id
     * page：页码
     * callback：回调方法，当拿到响应结果后立即调用，将传入
     * 刚查到的文章列表数据
     */
    loadArticles(cid, page, callback){
      this.$indicator.open('加载中...');
      this.axios.get(
        `/articles?cid=${cid}&page=${page}`).then(result=>{
        console.log(result);
        let articles = result.data.results;
        // 处理图片
        articles.forEach(item=>{
          if(item.image){
            item.image = require(`../assets/articles/${item.image}`)
          }
        })
        // 立即调用callback，执行后续任务
        callback(articles);
        this.$indicator.close();
      })
    },

    /** 加载更多 */
    loadMore(){
      this.page++;
      let cid = this.navactive;
      console.log(`loadMore...cid:${cid} page:${this.page}`)
      this.busy = true;
      // 发送http请求，获取当前类别下的下一页数据，更新列表
      this.loadArticles(cid, this.page, (list)=>{
        this.articles = [...this.articles, ...list];
        this.busy = false;
      });
    },

    /** 初始化轮播图 */
    initSwipe(){
      let picWidth = 1242; // 图片宽
      let picHeight = 699; // 图片高
      let screenWidth = window.screen.width; // 屏幕宽
      let swipeHeight = 
          Math.floor((picHeight*screenWidth)/picWidth)+"px";
      this.h = swipeHeight;
    },

    /** 加载类别列表 */
    loadCategory(){
      // 通过aixos发送请求，访问类别列表
      this.axios.get('/category').then(result=>{
        console.log(result);
        // result.data.results  => 返回类别对象数组
        this.category = result.data.results;
      })
    }
  },
  watch: {
    /** 监听顶部导航 */
    navactive(newval){
      // 滚动到顶部
      window.scrollTo(0,0);
      // newval 即是切换到的类别的类别id，可以作为cid发请求
      // console.log(newval);
      // 初始化页码
      this.page = 1;
      // 发请求 更新列表
      this.loadArticles(newval, 1, (list)=>{
        this.articles = list;
      });
    },

    /** 当改变底部选项卡selected的值后触发 */
    selected(newval){
      if(newval=='me'){
        this.$router.push('/me');
      }
    }
  },
  // 页面挂载完毕后，根据屏幕的宽度，计算轮播图的高度
  mounted(){
    // 初始化轮播图
    this.initSwipe();
    // 加载文章类别列表 更新页面导航
    this.loadCategory();
    // 加载UI类别下的文章列表
    this.loadArticles(1, 1, (list)=>{
      this.articles = list;
    })
  }
}
</script>

<style scoped>
.links a{
  color: white;
}
.swipe img{
  width:100%;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>