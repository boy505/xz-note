import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
Vue.prototype.moment  = moment
Vue.config.productionTip = false

// 安装配置MintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 安装配置axios
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
