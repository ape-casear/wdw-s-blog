<template>
  <div id="app" style="min-height: 1000px">
    <div name="header" >
      <img class="main_logo"   @click="logoclick" src="./assets/logo.png">
      <span style="float:right; margin-top:30px">
        <ul class="mainbar">
          <li>
            <span  is="HeaderMenu" @click="close" :dataFromApp="toConponentData1"></span>
          </li>
          <li>
            <span  is="HeaderMenu"  @click="close"  :dataFromApp="toConponentData2"></span>
          </li>
          <li v-if="user.name==''">
            <router-link to="regist">登录</router-link>
          </li>
          <li v-if="user.name!=''" @userlogin="userLogin">
            你好:<router-link to="userInfo">{{username}}</router-link>
          </li>
          <li>
            <router-link to="wdw">wdw</router-link>
          </li>
        </ul>
      </span>
    </div>
    <header>
      <a href="javascript:void(0)"></a>
    </header>
    <div class="container">
      <aside style="width:25%; float:right; background-color: rgb(234, 244, 245); padding:0px; margin-right:1%">
        <div class="aside-box">
          <aside01></aside01>
        </div>
        <div class="aside-box">
          <h5>aside2</h5>
          <p>123455</p>
        </div>
      </aside>
      <main >
        <div id="router-view" >
          <router-view :toViewData="toViewData"/>
        </div>
      </main>
      <div id="comment" v-if="showComment" >
        <div is="comment"></div>
      </div>
    </div>
    <!-- <footer>
      <div id="footer">123123</div>
    </footer> -->
  </div>
</template>

<script >
import HeaderMenu from "./components/HeaderMenu";
import aside01 from "./components/aside01";
import router from "./router/index";
import bus from "./bus.js";
import request from "./lib/request";
import comment from "./components/Comment";
export default {
  data () {
    return{
      isLogin:false,
      user:{name:'',age:0},
      username:'',
      toViewData:{},
      toConponentData1:{main_lis: [{id:0,name:'blog'},{id:1,name:'bloglist'}],title: '博客'},
      toConponentData2:{ main_lis: [{id:0,name:'Snake'},{id:1,name:'Mineclear'}],title: '游戏'},
      showComment: false
    
    }
  },
  name: 'App',
  components: {
    HeaderMenu,
    aside01,
    comment
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
    logoclick: function() {
      
     console.log(this.toConponentData2)
     router.push({name:'Regist'})
      
    },
    close: function(event){
      console.log(event)
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
   
  },
  watch: {
    $route: function (newVal,val) {
      console.log(newVal)
      console.log(val)
      this.showComment = false;
      if(newVal.name===""){
        
      }else if(newVal.name==='BlogList'){
        
        this.toViewData = [{id:0,title:'blog1',author:'wdw',pub_date:'2018-05-04',like:21,browse_count:2000},
              {id:1,title:'blog2',author:'wdw',pub_date:'2018-05-04',like:21.8,browse_count:2000},
              {id:2,title:'blog3',author:'wdw',pub_date:'2018-05-04',like:21,browse_count:2000}];
        
        /* let res = request.get('bloglist接口');
        console.log(res) */
      }else if(newVal.name==='Blog'){
        //查询blog表 表结构为 {id,bloglistid,content}  从newVAL中得到blog的数据，并查表得到内容content,然后将blog数据通过toViewData传输过去
        console.log('-----')
        console.log(router.query)
       /*  let res = request.get('blog接口');*/

        this.toViewData = {}; 
        this.showComment = true;
      }
      
    }
  }
 
}
</script>

<style>
*{ padding:0; margin:0}
a{
      text-decoration: none;
      opacity: 0.5;
      color: black;
}
a:hover{
      /* background-color: rgb(241, 241, 231); */
      opacity: 1;
      cursor:pointer;
}
div header aside{
  display: block;
}
.aside-box{
    padding:8px;
    margin-bottom: 8px;
    background-color: #fff;
    -webkit-box-shadow:  0 5px 10px rgba(0, 0, 0, 0.2);
    box-shadow:  0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px

}
.container{
  margin-bottom: 70px;
}
.main_logo{
  width:100px;
  height: 50px;
  background-color: rgb(234, 244, 245);
}
#app {
  min-width:1200px;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: default;
  color: #2c3e50;
  background-color: rgb(234, 244, 245);
 /*  margin-top: 60px; */

}
#router-view{
  text-align: center;
}
.mainbar > li {
  display: inline-block;
  margin: 0 10px;
  
}
header{
  background:url(assets/acfunBanner.jpg) no-repeat;
 /*  background-size: 1920px auto; */
  width:100%;height:70px;
  background-size: 100%;
}
footer{
  margin-top:10px;
  height:50px;     
  width: 100%;
/*   position:fixed; bottom:0; */
  position: fixed; bottom: 0;
  background-color: powderblue;
}
main, #comment{
  width:72%;background-color: white; 
  border-radius: 5px; margin-left:1%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow:  0 5px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}
</style>
