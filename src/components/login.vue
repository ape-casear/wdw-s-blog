<template>
  <div id="login">
    <h1>用户登录</h1>
    <center>
      <table>
        <tr>
          <td><span class="label">username:</span></td>
          <td><input type="text" v-model="input_username"   placeholder="请输入用户名……" style="width:140px"></td>
        </tr>
        <tr>
          <td><span class="label">password:</span></td>
          <td><input type="password" v-model="password"   placeholder=" :)" style="width:140px"></td>
        </tr>
    
        <tr>
          <td></td>
          <td> <input type="submit" value="login" @click="login" /></td>
        </tr>
      </table>
    </center>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
            password: '',
            input_username: '',
        }
    },
    methods: {
        login: function(){
            this.$emit('login',{name: this.input_username, password: this.password})
        }
    }
}
</script>

<style>
#login h1  h2 {
  padding:20px;
  font-weight: normal;
}
#login{
  height: 300px;
}
#login .label{
  width: 100px;
}
</style>

