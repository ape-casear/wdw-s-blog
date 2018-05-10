<template>
  <div id="aside01">
      <div id="aside01_top">
          <img src="../assets/head.png" class="headPic"/>
          <span >ape-Caesar</span>
          <span class="add" @mouseover="showQRcode = !showQRcode" @mouseout="showQRcode = !showQRcode">加好友</span><br>
          <span><a href="http://www.tju.edu.cn/">天津大学</a></span>
          <img id="QRcode" src="../assets/head.png" :class="{showQRcode: showQRcode,notshowQRcode: !showQRcode}"/>
      </div>
      <div style="height:1px; width:100%; margin-top:30px; margin-bottom=20px; border-top:1px #888 solid"></div>
      <div id="aside01_bottom">
          <dl>
            <dt>BLOG</dt>
            <dd>21</dd>
          </dl>
          <dl>
            <dt>访问</dt>
            <dd>88</dd>
          </dl>
          <dl>
            <dt>评论</dt>
            <dd>12</dd>
          </dl>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          showQRcode: false,
      }
  },
  methods:{
    
  }
}
</script>

<style>
    .add{
        color:  rgb(216, 84, 84);
    }
    .showQRcode{
        display: block;
    }
    .notshowQRcode{
        display: none;
    }
    #QRcode{
        margin:0px;
        width: 200px;
        height: 200px;
        position: absolute;
        top: 20%; left: 45%;
        border-radius: 5%;
        z-index: 2;
    }
    #aside01_top > span {
        margin-top: 50px;
        margin:8%;
        position: relative;
    
    }
    .headPic{
        float:left;
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
    #aside01 {
        /* display: block; */
        margin-left:10px;
    }
    #aside01_bottom{
        display: flex;
        text-align: center;
        justify-content:center;
        /* align-items:center; */
    }
    #aside01_bottom > dl{ 
        display: block;
        align-self: auto;
        margin:9%;
    }
</style>

