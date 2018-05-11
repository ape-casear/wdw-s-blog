<template>
  <div id="app" style="min-height: 1000px" @click = "bodyclick">
    <div name="header" >
      <img class="main_logo"   @click="logoclick" src="./assets/logo.png">
      <span style="float:right; margin-top:30px; font-size:17px">
        <ul class="mainbar">
          <li>
            <span  is="HeaderMenu"  :dataFromApp="toConponentData1" @closeOther="closeOther" ref="blog"></span>
          </li>
          <li>
            <span  is="HeaderMenu"   :dataFromApp="toConponentData2" @closeOther="closeOther" ref="game"></span>
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
          <aside01 :toAside01Data="toAside01Data"></aside01>
        </div>
        <div class="aside-box">
          <aside02 :toAside02Data="toAside02Data"></aside02>
        </div>
        <div class="aside-box" style="padding:0px;">
          <aside03></aside03>
        </div>
      </aside>
      <main >
        <div id="router-view" >
          <router-view :toViewData="toViewData"/>
        </div>
      </main>
      <div id="comment" v-if="showComment" >
        <div is="comment" :toCommentData="toCommentData"></div>
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
import aside02 from "./components/aside02";
import aside03 from "./components/aside03";
import router from "./router/index";
import bus from "./bus.js";
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
      showComment: false,
      toCommentData: {},
      toAside01Data: {},
      toAside02Data: {}
    
    }
  },
  name: 'App',
  components: {
    HeaderMenu,
    aside01,
    aside02,
    aside03,
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
    closeOther: function(event){
      let type;
      if(event.title == '游戏'){
        type = 'game'
      }else if(event.title == '博客'){
        type = 'blog'
      }
      for(let key in this.$refs){
        if(key !== type){
           this.$refs[key].isShow = false;
        }
      }

    },
    bodyclick: function (event) {
      
      if(event.target.getAttribute('class') === 'headermenu'){
        
        return;
      }
      for(let key in this.$refs){
           this.$refs[key].isShow = false;
      }
    }
  },
  mounted: async function(){
    //console.log(this.$options.methods.userLogin)
    console.log('mounted 执行 初始化index页面')

    //初始化用户信息，localStrorage存储用户信息
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

    //注册登录事件
    bus.$on('userlogin',this.$options.methods.userLogin)

    //初始化 aside01
    /* let result_aside01 = await this.$ajax.get('aside01接口')
    this.toAside01Data = result_aside01.data; */
    this.toAside01Data = {blogs: 99, comments: 999999, visits: 99};
    this.toAside02Data = {types:[{name:'nodejs', count: 12},{name: 'java', count: 21},{ name: '闲聊', count: 5}]}
  },
  watch: {
    $route: async function (newVal,val) {
      console.log(newVal)
      console.log(val)
      this.showComment = false;
      if(newVal.name===""){
        
      }else if(newVal.name==='BlogList'){
        let url = 'http://localhost:8080/bloglist?';
        if( newVal.query.type){
          url += 'type=' + newVal.query.type + "&";
        }
        if(newVal.query.sorttype){
          url += 'sorttype=' + newVal.query.sorttype + "&";
        }
        console.log(url)
        console.log(this.$route.params)
        //let res = await this.$ajax.get('bloglist接口');
        //let res = this.$ajax.get('www.baidu.com');
        this.toViewData = [{id:0,title:'blog1',author:'wdw',pub_date:'2018-05-04',like:21,browse_count:2000},
              {id:1,title:'blog2',author:'wdw',pub_date:'2018-05-04',like:21.8,browse_count:2000},
              {id:2,title:'blog3',author:'wdw',pub_date:'2018-05-04',like:21,browse_count:2000}];
        
  
      }else if(newVal.name==='Blog'){
        //查询blog表 表结构为 {id,bloglistid,content}  从newVAL中得到blog的数据，并查表得到内容content,然后将blog数据通过toViewData传输过去
        console.log('-----')
        
       /*  let res = await request.get('blog接口');
            let comments = this.$ajax.get('comment接口')*/
        this.toCommentData = {comments:[{id:1, user: '独孤求败', comment: '丢你老谋', comment_datatime: '2018-05-09 12:32:11', floor: 1, sub_comment: 
                                          [{id:5,user: '令狐冲', comment: '日月神教，一统中原', comment_datatime: '2018-05-09 12:32:11', floor: 1},
                                          {id:4,user: '任盈盈', comment: '日月神教，一统中原', comment_datatime: '2018-05-09 12:32:11', floor: 2}]},
                              {id:2,user: '西门吹雪', comment: '丢你老谋', comment_datatime: '2018-05-09 12:32:11', floor: 2},
                              {id:3,user: '东方不败', comment: '丢你老谋', comment_datatime: '2018-05-09 12:32:11', floor: 3}]};
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
