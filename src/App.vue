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
            <span  is="HeaderMenu"  :dataFromApp="toConponentData3" @closeOther="closeOther" ref="spider"></span>
          </li>
          <li>
            <span  is="HeaderMenu"   :dataFromApp="toConponentData2" @closeOther="closeOther" ref="game"></span>
          </li>
          <li v-if="user.name==''">
            <router-link to="regist">注册</router-link>
          </li>
          <li v-if="user.name==''">
            <router-link to="login">登录</router-link>
          </li>
          <li v-if="user.name!=''">
            你好:<router-link to="userInfo">{{username}}</router-link>
          </li>
          <li v-if="user.name=='wdw'">
            <router-link to="write">WRITE</router-link>
          </li>
        </ul>
      </span>
    </div>
    <header style=" background:url(./static/img/acfunBanner.jpg) no-repeat;">
    <!-- <header style=" background:url('./assets/acfunBanner.jpg') no-repeat;"> -->
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
          <router-view :toViewData="toViewData"  @login='userLogin'  @userRegist="userRegist"/>
        </div>
      </main>
      <div id="comment" v-if="showComment" >
        <div is="comment" :toCommentData="toCommentData" @add_reply="add_reply" @add_comment="add_comment"></div>
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
import jsSHA from "./lib/jsSHA/src/sha.js";
import qs from 'querystring';
export default {
  data () {
    return{
      isLogin:false,
      user:{name:'',age:0},
      username:'',
      toViewData:{},
      toConponentData1:{ main_lis: [{id:0,name:'bloglist'}],title: '博客'},
      toConponentData2:{ main_lis: [{id:0,name:'Snake'},{id:1,name:'Mineclear'}],title: '游戏'},
      toConponentData3:{ main_lis: [{id:0,name:'zhihu'},{id:1,name:'A'}],title: '爬虫'},
      showComment: false,
      toCommentData: {},
      toAside01Data: {},
      toAside02Data: {},
      toZhiHuDatas: []
    
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
    add_reply: function(data){
      data.author = this.username;
      console.log(data)
      data.comment_datatime = new Date().toLocaleString();
      
      //this.$ajax.post('http://localhost:88/comment',{ bloglistid, content, author, parent })
      for(let i=0; i< this.toCommentData.comments.length; i++){
        console.log(this.toCommentData.comments[i])
        if(this.toCommentData.comments[i].id == data.parent){
          this.toCommentData.comments[i].sub_comment.push(data)
          console.log('push')
        }
      }
    },
    add_comment: function(data){
      data.author = this.username;
      
      data.comment_datetime = new Date().toLocaleString();
      
      this.$ajax.post('http://www.weidongwei.com:88/comment/addcomment', 
             { bloglistid: data.bloglistid, comment: data.comment, author: data.author, parent: 0 },
             {
                withCredentials: true,
                transformRequest: [function (data) {
                  data = qs.stringify(data);
                  return data;
                }],     
              }
      ).then(res=>{console.log(res)}).catch(console.error.bind(console))
      this.toCommentData.comments.push(data)
    },
    userRegist: function (user) {
      console.log('userRegist 执行')
      let shaObj = new jsSHA("SHA-256","TEXT");
      shaObj.update(user.password+'wdwblog')
      this.username = user.name;
      user.password = shaObj.getHash("HEX");
      user.author = user.name;
      console.log(user)
      
      this.$ajax.post('http://www.weidongwei.com:88/user', user ).then(res=>{
        if(res.data.code != 0){
          this.$message.error("注册失败")
          return;
        }else{

          sessionStorage.user = user;
          localStorage.user = JSON.stringify(user);
          this.user = user;
          console.log(this.username)
          
          router.push({name:'FirstRouter'})
        }

      })
      
    },
    userLogin: function(user){
      console.log('userlogin 执行')
      let shaObj = new jsSHA("SHA-256","TEXT");
      shaObj.update(user.password+'wdwblog')
      this.username = user.name;
      user.password = shaObj.getHash("HEX");
      user.author = user.name;
      
      
      this.$ajax.post('http://www.weidongwei.com:88/user/login',user).then(res=>{

        if(res.data.code == 0){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          sessionStorage.user = user;
          localStorage.user = JSON.stringify(user);
          this.user = user;
          router.push({name:'FirstRouter'})
          
        }else{
          this.$message.error('登录失败')
        }
        
      })
    },
    logoclick: function() {
      
     console.log(this.toConponentData2)
     router.push({name:'SVG01'})
      
    },
    closeOther: function(event){
      let type;
      if(event.title == '游戏'){
        type = 'game'
      }else if(event.title == '博客'){
        type = 'blog'
      }else if(event.title == '爬虫'){
        type = 'spider'
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
  mounted:  function(){
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

    this.toAside02Data = {types:[{name:'nodejs', count: 0},{name: 'java', count: 0},{ name: '闲聊', count: 0}]}
    //初始化 aside01
    this.$ajax.get('http://www.weidongwei.com:88/webinfo').then(res=>this.toAside01Data = res.data).catch(console.error.bind(console))
    //this.$ajax.get('http://www.weidongwei.com:88/webinfo').then(res=>this.toAside01Data = res).catch(console.error.bind(console))
    //this.toAside01Data = result_aside01.data; 
    //this.toAside01Data = result_aside01;
  
  },
  watch: {
    $route: async function (newVal,val) {
      console.log(newVal)
      console.log(val)
      this.showComment = false;
      if(newVal.name===""){
        
      }else if(newVal.name==='BlogList'){
        let url = 'http://www.weidongwei.com:88/bloglist/'+ 0 +'?';
        if( newVal.query.type){
          url += 'type=' + newVal.query.type + "&";
        }
        if(newVal.query.sort_type){
          url += 'sort_type=' + newVal.query.sort_type + "&";
        }
        console.log(url)
        console.log(this.$route.params)
        let res = await this.$ajax.get(url);
        //let res = this.$ajax.get('www.baidu.com');
        this.toViewData = res.data.data.bloglist;
        
  
      }else if(newVal.name==='Blog'){
        //查询blog表 表结构为 {id,bloglistid,content}  从newVAL中得到blog的数据，并查表得到内容content,然后将blog数据通过toViewData传输过去
        console.log('-----')
        
        let bloglist_data = JSON.parse(newVal.params.json_str_data)
        this.$ajax.get('http://www.weidongwei.com:88/blog?bloglistid=' + bloglist_data.id ).then(res=>{
          bloglist_data.content = res.data.data.blog;
          console.log(res.data.data)
          this.toViewData = bloglist_data;
          
        })
        this.$ajax.get('http://www.weidongwei.com:88/comment/'+ bloglist_data.id ).then(res=>{
          this.toCommentData = {comments:res.data.data,  bloglistid: bloglist_data.id};

        });
        this.showComment = true;
      }else if(newVal.name === 'zhihu'){
        this.$ajax.get('http://www.weidongwei.com:88/zhihu').then(res=>this.toViewData = res.data)
        
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
