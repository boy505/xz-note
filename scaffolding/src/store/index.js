import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem('loginOk'), // 保存是否登录成功
    username: sessionStorage.getItem('username')
  },
  mutations: {
    loginOk(state,newname){
      state.islogin = true;
      state.username = newname;
    }
  },
  actions: {
  },
  modules: {
  }
})
