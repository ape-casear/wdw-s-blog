<template>
  <div id="regist">
    <h1>{{msg}}</h1>
    <center>
      <table>
        <tr>
          <td><span class="label">username:</span></td>
          <td><input type="text" v-model="input_username" @blur="namecheck"  placeholder="请输入用户名……" style="width:140px"></td>
        </tr>
        <tr>
          <td><span class="label">password:</span></td>
          <td><input type="password" v-model="password"  @blur="passcheck" placeholder="8-16位数字及字母大小写" style="width:140px"></td>
        </tr>
        <tr>
          <td><span class="label">telephone:</span></td>
          <td> <input type="text" v-model="telephone"  @blur="telecheck" placeholder="如果你想填的话" style="width:140px"></td>
        </tr>
        <tr>
          <td></td>
          <td> <input type="submit" value="signup" @click="submit" :disabled="!(!check_name && !check_pass)"/></td>
        </tr>
      </table>
    </center>
    
  </div>
</template>

<script>
import bus from "../bus";
export default {
  name: 'Regist',
  data () {
    return {
      msg: 'Welcome to wdw\'s Vue.js App',
      input_username: '',
      password: '',
      telephone: '',
      check_name: true,
      check_pass: true
    }
  },
  methods: {
    submit: function () {
      console.log(this.input_username);
      this.$emit('userRegist', {name: this.input_username, password: this.password, telephone: this.telephone});
    },
    namecheck: function () {
      console.log('检验用户名')
      let reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){2,12}$"); 
      if(!reg.test(this.input_username)){
            this.$message({
              message: "请输入2-12位中文或字母数字",
              type: 'warning'
            })
            return;
      }
      this.$ajax.get('http://www.weidongwei.com:88/user/checkname/'+ this.input_username).then(
        (res)=>{
          if(res.data.code == 400){
            this.$message({
              message: "用户名已被注册",
              type: 'warning'
            })
          
          }else{
              this.check_name = false;  
              this.$message({
                message: "用户名检验通过",
                type: 'success'
              })
          }
        }
      )
      
    },
    passcheck: function(){
      let pass = this.password;
      let regex = /^[1-9a-zA-Z_0]{8,16}$/
      if(regex.test(pass)){
        this.$message({
          message: "密码验证通过",
          type: 'success'
        })
        this.check_pass = false;
      }else{
        this.$message({
          message: "密码格式错误",
          type: 'warning'
        })
        this.check_pass = true;
      }
    },
    telecheck: function () {
        let regex = /^1[1-90]{10}$/
        if(regex.test(this.telephone)){
          this.$message({
            message: "ok",
            type: 'success'
          })
        }else{
          this.$message({
            message: "no ok",
            type: 'warning'
          })
        }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  padding:20px;
  font-weight: normal;
}
#regist{
  height: 300px;
}
#regist .label{
  width: 100px;
}

</style>
