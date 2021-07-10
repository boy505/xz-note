<template>
  <div>
    <!-- Register.vue -->    
    <mt-header title="注册">
      <mt-button icon="back" slot="left"></mt-button>
      <router-link to="/login" slot="right">
        登录
      </router-link>
    </mt-header>

    <mt-field
      type="text" 
      label="用户名"
      v-model="username"
      :state="usernameState"
      @blur.native.capture="checkUsername"
      placeholder='请输入用户名'></mt-field>
    <mt-field
      type="password" 
      label="密码"
      v-model="pwd"
      :state="pwdState"
      @blur.native.capture="checkPwd"
      placeholder='请输入密码'></mt-field>
    <mt-field
      type="password" 
      label="确认密码"
      v-model="repwd"
      :state="repwdState"
      @blur.native.capture="checkRepwd"
      placeholder='请再次输入密码'></mt-field>
    <mt-button type="primary" size="large"
      @click="checkForm">快速注册</mt-button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',  //username将于用户名文本框实现双向数据绑定
      usernameState: '',
      pwd: '',  
      pwdState: '',
      repwd: '',  
      repwdState: '',
    }
  },
  methods: {
    checkRepwd(){
      let reg = /^\d{6}$/;
      // this.pwdState = reg.test(this.pwd)?'success':'error';
      if(reg.test(this.repwd) && this.pwd==this.repwd){ // 验证成功
        this.repwdState = 'success'
        return true;
      }else{ // 验证失败
        this.repwdState = 'error'
        return false;
      }
    },

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
      if (this.checkUsername() 
        && this.checkPwd() && this.checkRepwd()){
        console.log('执行注册业务...');
        // 发送post请求，执行注册
        this.axios.post('/register', 
          `username=${this.username}&password=${this.pwd}`)
          .then(result=>{
          console.log(result);
          if(result.data.code==200){ // 注册成功
            // this.$toast用于弹出toast对话框
            // 当安装了MintUI，调用了Vue.use(MintUI)后，
            // 将会把Toast组件绑定到Vue.prototype，所以可以直接
            // 使用this.$toast来访问Toast。
            this.$toast({
              message: '注册成功',
              position: 'bottom',
              duration: 3000
            })
            this.$router.push('/login');
          }else if(result.data.code==201){ // 注册失败
            this.$toast({
              message: '该用户名已存在，请重新输入',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      }
    }
  }
}
</script>