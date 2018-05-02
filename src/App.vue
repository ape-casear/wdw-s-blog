<template>
  <div id="app">
    <div name="header" >
      <img class="main_logo"   @click="click" src="./assets/logo.png">
      <span style="float:right">
        <ul class="mainbar">
          <li>
            <span  is="HeaderMenu"></span>
          </li>
          <li v-if="user.name==''">
            <router-link to="regist">regist</router-link>
          </li>
          <li v-if="user.name!=''" @userlogin="userLogin">
            <router-link to="userInfo">{{username}}</router-link>
          </li>
          <li>
            <router-link to="wdw">wdw</router-link>
          </li>
        </ul>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script >
import HeaderMenu from "./components/HeaderMenu";
import router from "./router/index";
import bus from "./bus.js";
export default {
  data () {
    return{
      isLogin:false,
      user:{name:'',age:0},
      username:''
    }
  },
  name: 'App',
  components: {
    HeaderMenu
  },
  methods: {
    userLogin: function (user) {
      console.log('userlogin 执行')
      this.username = user.name;
    
      sessionStorage.user = user;
      localStorage.user = JSON.stringify(user);
      this.user = user;
      console.log(this.user.name)
      window.location.reload();
      router.push({name:'FirstRouter'})
    },
    click: function() {
      this.username = this.username+"0";
      console.log(this.username)
    }
  },
  mounted: function(){
    //console.log(this.$options.methods.userLogin)
    console.log('mounted 执行')
    if( localStorage.user){
      try{
        let preUser = JSON.parse(localStorage.user)
        console.log(preUser)
        this.user = preUser;
      }catch(e){
        console.log(e)
        this.user = {name:'',age:0};
      }
    }
    this.username = this.user.name;
    bus.$on('userlogin',this.$options.methods.userLogin)
  }

 
}
</script>

<style>
.main_logo{
  width:30px;
  height: 30px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: default;
  color: #2c3e50;
 /*  margin-top: 60px; */
}
.mainbar > li {
  display: inline-block;
  margin: 0 10px;
}
</style>
