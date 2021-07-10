<template>
  <div>
    <!-- Register.vue -->    
    <mt-header title="登录">
      <mt-button icon="back" slot="left"></mt-button>
      <router-link to="/register" slot="right">
        免费注册
      </router-link>
    </mt-header>

    <mt-field
      type="text" 
      label="用户名"
      v-model="username"
      :state="usernameState"
      placeholder='请输入用户名'></mt-field>
    <mt-field
      type="password" 
      label="密码"
      v-model="pwd"
      :state="pwdState"
      placeholder='请输入密码'></mt-field>

    <mt-button type="primary" size="large"
      @click="checkForm">登录</mt-button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',  //username将于用户名文本框实现双向数据绑定
      usernameState: '',
      pwd: '',  
      pwdState: ''
    }
  },
  methods: {
    checkPwd(){
      let reg = /^\d{6}$/;
      // this.pwdState = reg.test(this.pwd)?'success':'error';
      if(reg.test(this.pwd)){ // 验证成功
        this.pwdState = 'success'
        return true;
      }else{ // 验证失败
        this.pwdState = 'error'
        return false;
      }
    },

    // 定义方法，验证用户名
    checkUsername(){
      // 验证用户名  要求单词字符6~15位 [A-Za-z0-9_]
      let reg = /^\w{6,15}$/;
      if(reg.test(this.username)){ // 验证成功
        this.usernameState = 'success'
        return true;
      }else{ // 验证失败
        this.usernameState = 'error'
        return false;
      }
    },

    // 点击快速注册之后执行，验证表单
    checkForm(){
      if (this.checkUsername() && this.checkPwd()){
        console.log('执行登录业务...');

        // 发送post请求，执行登录
        this.axios.post('/login', 
          `username=${this.username}&password=${this.pwd}`)
          .then(result=>{
          console.log(result);
          if(result.data.code==200){
            this.$toast({
              message:'登录成功',
              position: 'bottom',
              duration: 3000
            })
            // 既然登录成功，那就需要更新vuex中的信息
            let un = result.data.result.username
            this.$store.commit('loginOk',un)
            // 不仅需要更新Vuex，还需要把数据存入webstorage
            sessionStorage.setItem('loginOk','true')
            sessionStorage.setItem('username',un)
            this.$router.push('/');
          }else if(result.data.code==201){
            this.$toast({
              message:'账号密码输入错误',
              position: 'bottom',
              duration: 3000
            });
          }
        })
      }
    }
  }
}
</script>